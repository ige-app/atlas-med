"use strict";

function readQuestionText(pages, bank, count) {
  const fragments = [];
  const markers = [];
  let length = 0;
  for (const content of pages) {
    const items = content.items.filter(item=>item.str!==undefined && item.transform[5]>30 &&
      (bank!=="USP" || item.transform[5]<805));
    const columns = bank==="UNESP" ?
      [items.filter(item=>item.transform[4]<295),items.filter(item=>item.transform[4]>=295)] : [items];
    for (const column of columns) {
      for (const [i,item] of column.entries()) {
        const rest = column[i+1]?.str || "";
        const number = bank==="USP" && item.str==="{" ? rest :
          bank==="UNESP" && item.str==="QUESTÃO" ? column[i+2]?.str :
          bank==="UNIFESP" ? item.str.match(/^QUESTÃO\s+(\d+)\./i)?.[1] : null;
        if (/^\d{1,3}$/.test(number||"")) {
          markers.push({number:Number(number),offset:length});
        }
        const fragment = item.str+(item.hasEOL?"\n":"");
        fragments.push(fragment);
        length+=fragment.length;
      }
      fragments.push("\n");
      length++;
    }
  }
  if (markers.length!==count || markers.some((marker,i)=>marker.number!==i+1)) {
    throw new Error("A numeração do caderno não corresponde à edição selecionada.");
  }

  const clean = text=>text.replace(/^UNIFESP[^\n]*Objetiva[^\n]*\n/gmi,"").trim();
  const whole = fragments.join("");
  const shared = new Map();
  const result = {};
  for (const [i,marker] of markers.entries()) {
    let block = whole.slice(marker.offset,markers[i+1]?.offset).replace(/^(?:\{\s*\d+\s*\}|QUESTÃO\s+\d+\.?)/i,"");
    {
      const common = block.match(/(?:TEXTO (?:PARA|COMUM)|LEIA O TEXTO A SEGUIR PARA RESPONDER [ÀA]S)[^\n]*QUEST[ÕO]ES\s+(?:DE\s+)?(\d+)\s+(?:E|A)\s+(\d+)[^\n]*\n([\s\S]*)$/i);
      if (common) {
        if (Number(common[1])===marker.number+1 && Number(common[2])-Number(common[1])<=4) {
          for (let n=Number(common[1]);n<=Number(common[2]);n++) shared.set(n,clean(common[3]));
        }
        block=block.slice(0,common.index);
      }
      if(bank==="USP") block=block.split(/#{3,}/)[0];
    }
    if (i===markers.length-1) block=block.split(/\n\s*(?:GABARITO|RASCUNHO|A1\s*$)/i)[0];
    if (bank==="UNIFESP" && i===markers.length-1) block=block.split(/\n\s*1\.\s*A\s+B\s+C\s+D/)[0];
    const options = [...block.matchAll(bank==="UNIFESP" ? /^\s*([A-D])\.\s*/gm : /^\s*\(([A-D])\)\s*/gm)];
    const complete = options.map(option=>option[1]).join("")==="ABCD";
    const statement = clean(block.slice(0,options[0]?.index));
    if (!statement) continue;
    const optionText = complete ? options.map((option,j)=>clean(block.slice(option.index+option[0].length,options[j+1]?.index))) : [];
    result[marker.number]={
      statement,
      context:shared.get(marker.number)||"",
      options:optionText,
    };
  }
  return result;
}

const downloadedTranscripts = new Map();

const transcriptCadernos = {
  "USP 2025": "673e6e52dfbaa184eae9e1b2016f1bc3ab95069f8f0cf491179656b33907a2df",
  "USP 2026": "f6200fdcb65fbf8fdc4e3676331cb709e12138e480083e4e2f1b96266cdc0127",
  "UNESP 2025": "99958fda3c858d784a940107cd7cf048c233afe094dba53156fc6d15435b3fb4",
  "UNESP 2026": "5a5a3683344bea32faab402f8814b63b0137dd20c4d5e2869e89635bd79696b6",
  "UNIFESP 2025": "ecda9958497646ec25668013e939bf6f6e8991489bb68b31ffc9dfc22a6a7926",
  "UNIFESP 2026": "30b2bfa2e1b2e27b464e650c0f45a33fcf16a9891a90333e4797df75124b391a",
};

function pdfTranscriptFields(question) {
  const hash=transcriptCadernos[question.instituicao+" "+question.ano];
  if(!hash) return "";
  const count=question.instituicao==="USP"?120:100;
  return ' data-transcript-bank="'+safe(question.instituicao)+'" data-transcript-count="'+count+
    '" data-transcript-number="'+safe(question.numero)+'" data-transcript-hash="'+hash+'"';
}

const pdfTranscriptBox = '<section class="pdf-transcript" hidden>'+
  '<h3>Enunciado do caderno</h3><div class="transcribed-context"></div>'+
  '<p class="transcribed-statement"></p>'+
  '<p class="muted">Texto extraído automaticamente. Consulte o PDF para figuras, tabelas e a formatação original.</p>'+
  '<ol type="A" hidden><li></li><li></li><li></li><li></li></ol></section>';

async function pdfMatchesCaderno(reader, bytes) {
  if(!reader.dataset.transcriptHash) return true;
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,"0")).join("")===reader.dataset.transcriptHash;
}

async function preparePdfTranscript(reader, doc, matchesCaderno) {
  const bank=reader.dataset.transcriptBank;
  if(!bank) return;
  const status=reader.querySelector(".pdf-transcript-status");
  status.textContent="Lendo enunciado e alternativas…";
  try {
    if(!matchesCaderno) {
      status.textContent="Para transcrever, selecione o PDF exato do link do caderno desta prova.";
      return;
    }
    const pages=[];
    for(let number=1;number<=doc.numPages;number++){
      if(!reader.isConnected) return;
      const page=await doc.getPage(number);
      pages.push(await page.getTextContent());
      page.cleanup();
    }
    const entries=readQuestionText(pages,bank,Number(reader.dataset.transcriptCount));
    downloadedTranscripts.set(reader.dataset.pdfUrl,entries);
    if(reader.isConnected) showPdfTranscript(reader);
  } catch {
    status.textContent="A transcrição deste caderno não pôde ser conferida. Consulte a página do PDF.";
  }
}

function showPdfTranscript(reader) {
  const layout=reader.closest(".reader-layout");
  const box=layout?.querySelector(".pdf-transcript");
  const transcript=downloadedTranscripts.get(reader.dataset.pdfUrl)?.[reader.dataset.transcriptNumber];
  if(!box||!transcript) return;
  box.hidden=false;
  box.querySelector(".transcribed-context").textContent=transcript.context;
  box.querySelector(".transcribed-statement").textContent=transcript.statement;
  const buttons=layout.querySelectorAll("[data-pdf-choice]");
  if(transcript.options.length){
    buttons[0]?.parentElement.classList.replace("answer-grid","answer-list");
    transcript.options.forEach((option,index)=>{
      const target=buttons[index]?.querySelector(".transcribed-option")||box.querySelectorAll("li")[index];
      if(target) target.textContent=option||"Veja a imagem da alternativa no PDF.";
    });
    box.querySelector("ol").hidden=buttons.length>0;
  }
  const status=reader.querySelector(".pdf-transcript-status");
  status.textContent=transcript.options.length ? "Enunciado exibido na questão." : "As alternativas desta questão devem ser consultadas no PDF.";
}
