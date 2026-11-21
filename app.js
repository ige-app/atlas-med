"use strict";
const $=id=>document.getElementById(id);
const BANKS=["ENAMED","USP","UNESP","NIEPAEM","UNIFESP"];
const pendingModule="Acesso direto — classificação pendente";
const MODULES=["Ginecologia","Obstetrícia","Oftalmologia","Cardiologia","Neurologia","Pediatria","Neonatologia","Cirurgia Geral","Clínica Médica","Pneumologia","Nefrologia","Endocrinologia","Gastroenterologia","Hematologia","Geriatria","Genética Médica","Mastologia","Anestesiologia","Cirurgia Vascular","Cirurgia Pediátrica","Neurocirurgia","Infectologia","Reumatologia","Dermatologia","Psiquiatria","Ortopedia","Urologia","Otorrinolaringologia","Medicina de Família e Comunidade","Saúde Coletiva","Emergências","Outros",pendingModule];
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validURL=u=>{try{let a=new URL(u);return a.protocol==="https:"?a.href:"#"}catch{return"#"}};
let questions=[],sources=[],indices=[],mod="",active=null,choice="",pdfActive=null,pdfChoice="",readerSource="official",progress={},commentActive=null,localCommentUrls={},localQuestionUrls={},commentChoice="";
function scoreable(q){return /^[A-E]$/.test(q.gabarito||"") && (["pdf","pdf-local"].includes(q.modo_resolucao) || Boolean(q.enunciado&&Array.isArray(q.alternativas)))}
function answerMatches(q,letter){return q.gabarito===letter||(Array.isArray(q.gabaritos_aceitos)&&q.gabaritos_aceitos.includes(letter));}
function displayAnswer(q){return Array.isArray(q.gabaritos_aceitos)&&q.gabaritos_aceitos.length>1?q.gabaritos_aceitos.join(" ou "):q.gabarito;}
function semesterOf(q){if(q.semestre)return String(q.semestre);let m=String(q.edicao||q.caderno||"").match(/20\d{2}\.([12])/);return m?m[1]:"";}
const progressKey="atlas-med-progress";
try{progress=JSON.parse(localStorage.getItem(progressKey)||"{}")||{}}catch{progress={}}
const save=()=>{try{localStorage.setItem(progressKey,JSON.stringify(progress))}catch{}};
const select=(id,values,keep=true)=>{let x=$(id),old=keep?x.value:"";x.innerHTML=(id==="start"||id==="end"?"":"<option value=''>Todos</option>")+values.map(v=>'<option value="'+safe(v)+'">'+safe(v)+'</option>').join("");if(values.map(String).includes(old))x.value=old};
const bankChoices=()=>$("bank-choices").querySelectorAll("input");
function selectedBanks(){
 return new Set([...bankChoices()].filter(input=>input.checked).map(input=>input.value));
}
function updateBankPicker(){
 const selected=selectedBanks();
 const all=$("bank-all");
 all.checked=selected.size===BANKS.length;
 all.indeterminate=selected.size>0&&!all.checked;
 const label=all.checked?"Todas":selected.size===0?"Nenhuma":selected.size===1?[...selected][0]:selected.size+" selecionadas";
 $("bank-label").textContent="Banca · "+label;
}
function setAllBanks(checked){
 for(const input of bankChoices())input.checked=checked;
}
function bootFilters(){$("bank-choices").innerHTML=BANKS.map(bank=>'<label><input type="checkbox" value="'+safe(bank)+'" checked> '+safe(bank)+'</label>').join("");updateBankPicker();select("source-bank",BANKS);select("source-year",Array.from({length:10},(_,i)=>2017+i));for(const id of ["start","end"])select(id,Array.from({length:10},(_,i)=>2017+i));$("start").value="2017";$("end").value="2026"}
function currentIndex(){
  const start=+ $("start").value,end=+ $("end").value,sem=$("semester").value,topic=$("topic").value,subtopic=$("subtopic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;
  const banks=selectedBanks();
  return indices.filter(q=>{
    const p=progress[q.id]||{};
    if(!banks.has(q.instituicao)||(mod&&q.modulo!==mod)||q.ano<start||q.ano>end||(sem&&semesterOf(q)!==sem)||(topic&&topicOf(q)!==topic)||(subtopic&&!matchesSubtopic(q,subtopic)))return false;
    if(search&&![q.resumo,topicOf(q),q.tema,q.subtema,q.modulo,q.comentario_resumido].join(" ").toLocaleLowerCase("pt-BR").includes(search))return false;
    if(status==="pending"&&(!scoreable(q)||p.answer))return false;
    if(status==="wrong"&&(!p.answer||answerMatches(q,p.answer)))return false;
    if(status==="starred"&&!p.starred)return false;
    return true;
  }).sort((a,b)=>b.ano-a.ano||(Number(semesterOf(b))||0)-(Number(semesterOf(a))||0)||a.instituicao.localeCompare(b.instituicao)||a.numero-b.numero);
}
function current(){let start=+$("start").value,end=+$("end").value,sem=$("semester").value,topic=$("topic").value,subtopic=$("subtopic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;const banks=selectedBanks();return questions.filter(q=>banks.has(q.instituicao)&&(!mod||q.modulo===mod)&&q.ano>=start&&q.ano<=end&&(!sem||semesterOf(q)===sem)&&(!topic||topicOf(q)===topic)&&(!subtopic||matchesSubtopic(q,subtopic))&&(!search||[q.enunciado,topicOf(q),q.tema,q.subtema,q.modulo].join(" ").toLocaleLowerCase("pt-BR").includes(search))&&(!status||(status==="pending"?!progress[q.id]?.answer:status==="wrong"?progress[q.id]?.answer&&progress[q.id].answer!==q.gabarito:progress[q.id]?.starred)));}
const moduleName=m=>m===pendingModule?"Classificação pendente":m;
const alphabeticalModules=MODULES.filter(m=>m!==pendingModule).sort((a,b)=>a.localeCompare(b,"pt-BR")).concat(pendingModule);
function modules(){
 const search=normalizeTopic($("module-search").value);
 const counts=new Map();
 for(const q of [...questions,...indices])counts.set(q.modulo,(counts.get(q.modulo)||0)+1);
 const button=(m,label)=>'<button class="module-btn '+(mod===m?"selected":"")+'" aria-pressed="'+(mod===m)+'" data-module="'+safe(m)+'">'+safe(label)+'</button>';
 $("modules").innerHTML=button("","Todos os módulos")+alphabeticalModules
  .filter(m=>normalizeTopic(m).includes(search))
  .map(m=>button(m,moduleName(m)+" ("+(counts.get(m)||0)+")")).join("");
}
function updateModuleLink(){
 const url=new URL(location.href);
 if(mod===pendingModule)url.searchParams.set("modulo","pendentes");
 else url.searchParams.delete("modulo");
 if(url.href!==location.href)history.replaceState(history.state,"",url);
}
function clearFilters(){
 setAllBanks(true);
 updateBankPicker();
 $("start").value="2017";
 $("end").value="2026";
 for(const id of ["semester","search","status","topic","subtopic"])$(id).value="";
}
function chooseModule(next){
 mod=next;
 if(mod===pendingModule)clearFilters();
 else $("topic").value=$("subtopic").value="";
 updateModuleLink();
 render();
 if(mod===pendingModule&&compactQuiz())$("selection").scrollIntoView({block:"start"});
}
const alphabetical=(a,b)=>a.localeCompare(b,"pt-BR");
function matchesSubtopic(q,value){
 return subtopicsOf(q).some(name=>normalizeTopic(name)===normalizeTopic(value));
}
function topics(){
 const scoped=[...questions,...indices].filter(q=>!mod||q.modulo===mod);
 select("topic",[...new Set(scoped.map(topicOf).filter(Boolean))].sort(alphabetical));
 updateSubtopics(scoped);
}
function updateSubtopics(scoped=[...questions,...indices].filter(q=>!mod||q.modulo===mod)){
 const selected=$("topic").value;
 const subtopics=new Map();
 if(selected){
  for(const q of scoped.filter(q=>topicOf(q)===selected)){
   for(const item of subtopicsOf(q))subtopics.set(normalizeTopic(item),item);
  }
 }
 select("subtopic",[...subtopics.values()].sort(alphabetical));
 $("subtopic-filter").hidden=!subtopics.size;
}
function metrics(){
  const attempts=[...questions,...indices].filter(q=>scoreable(q)&&progress[q.id]?.answer);
  $("count").textContent=indices.filter(q=>scoreable(q)&&["pdf","pdf-local"].includes(q.modo_resolucao)).length;
  $("indexed-count").textContent=indices.length;
  $("sources-count").textContent=sources.length;
  $("solved-count").textContent=attempts.length;
}
function renderIndex(){
  const items=currentIndex(),root=$("indexed");
  root.innerHTML=items.length?items.map(q=>{
    const p=progress[q.id]||{},hasReader=q.modo_resolucao==="pdf",commentOnly=["comentario","pdf-local"].includes(q.modo_resolucao),graded=scoreable(q),answered=Boolean(p.answer);
    const state=graded?(answered?(answerMatches(q,p.answer)?"✓ Acertou":"✕ Errou"):"Não resolvida"):commentOnly?"Gabarito comentado":q.gabarito==="PENDENTE"?"Gabarito indisponível":q.gabarito==="ANULADA"?"Anulada":"Excluída da pontuação";
    const favored='<button data-pdf-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button>';
    const controls=hasReader?'<button data-pdf-open="'+safe(q.id)+'">'+(graded?"Abrir e responder":"Consultar sem pontuação")+'</button> '+favored:commentOnly?'<button data-comment-open="'+safe(q.id)+'">'+(q.modo_resolucao==="pdf-local"?"Abrir e responder":"Ver gabarito e comentário")+'</button> '+favored:'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Abrir no caderno original ↗</a>';
    const description=commentOnly?"Questão real do NIEPAEM: leia o caso e as quatro alternativas no caderno original, responda e consulte o comentário resumido.":safe(q.enunciado_parafraseado||q.resumo||"").slice(0,230);
    return '<article class="question index"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+(semesterOf(q)?"."+safe(semesterOf(q)):"")+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span><span class="tag">'+safe(state)+'</span></div><h3>'+safe(q.tema)+'</h3><p>'+description+'</p>'+(commentOnly?'<p class="muted">Área original: '+safe(q.categoria_origem)+(q.pagina_prova?' · Caderno, página '+safe(q.pagina_prova):'')+' · Gabarito comentado, página '+safe(q.comentario_pagina)+'</p>':'<p class="muted">'+safe(q.caderno)+(q.fonte_formato==="Scribd HTML"?" · Documento externo":q.pagina?" · Página "+safe(q.pagina)+" do PDF":"")+'</p>')+'<div class="quiz-actions">'+controls+'</div></article>';
  }).join(""):'<div class="empty">Nenhuma questão corresponde aos filtros. Consulte o acervo para localizar outras provas.</div>';
}
function renderQuestions(){let list=current();$("selection").textContent=mod===pendingModule?currentIndex().length+" questões com classificação pendente. Selecione uma para abrir.":currentIndex().length+" questões oficiais"+(mod?" em "+mod:"")+".";const root=$("questions");root.previousElementSibling.classList.toggle("hidden",!list.length);root.classList.toggle("hidden",!list.length);root.innerHTML=list.length?list.map(q=>{let p=progress[q.id]||{};return '<article class="question"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">'+safe(q.tema)+'</span></div><h3>'+safe(q.enunciado).slice(0,185)+(q.enunciado.length>185?"…":"")+'</h3><p class="muted">'+(q.numero?"Questão "+safe(q.numero)+" · ":"")+(p.answer?"Respondida: "+safe(p.answer):"Não resolvida")+'</p><button data-open="'+safe(q.id)+'">Resolver questão</button> <button data-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button></article>'}).join(""):'';}
function renderSources(){let bank=$("source-bank").value,year=$("source-year").value;let list=sources.filter(s=>(!bank||s.instituicao===bank)&&(!year||String(s.ano)===year));$("sources").innerHTML=list.length?list.map(s=>'<article class="source"><div><span class="tag">'+safe(s.instituicao)+'</span><span class="tag">'+safe(s.ano??"acervo geral")+'</span></div><h3>'+safe(s.titulo)+'</h3><p>'+safe(s.observacao)+'</p><p class="muted">Status: '+safe(s.status||"referência catalogada")+'.</p><a href="'+safe(validURL(s.url))+'" target="_blank" rel="noopener noreferrer">Abrir portal de origem ↗</a></article>').join(""):'<div class="empty">Nenhuma fonte cadastrada neste filtro. Isso não significa que a prova não exista.</div>';}
function renderPerformance(){
  const attempted=[...questions,...indices].filter(q=>scoreable(q)&&progress[q.id]?.answer);
  const correct=attempted.filter(q=>answerMatches(q,progress[q.id].answer)).length,errors=attempted.length-correct;
  const byModule=alphabeticalModules.map(m=>({m,q:attempted.filter(q=>q.modulo===m)})).filter(x=>x.q.length);
  $("performance").innerHTML='<h3>Resumo</h3><p>Resolvidas: <b>'+attempted.length+'</b> · Acertos: <b>'+correct+'</b> · Erros: <b>'+errors+'</b> · Aproveitamento: <b>'+(attempted.length?Math.round(correct/attempted.length*100)+"%":"—")+'</b></p><p class="muted">Questões anuladas e excluídas não entram nas estatísticas. Seu desempenho fica salvo apenas neste navegador.</p><h3>Por módulo</h3>'+(byModule.length?byModule.map(({m,q})=>'<p>'+safe(moduleName(m))+': '+q.filter(x=>answerMatches(x,progress[x.id].answer)).length+'/'+q.length+' corretas</p>').join(""):'<p class="muted">Ainda não há respostas registradas.</p>');
}
function render(){modules();topics();metrics();renderIndex();renderQuestions();renderSources();renderPerformance();}
const compactQuiz=()=>window.matchMedia("(max-width: 790px)").matches;
let quizTrigger=null;

function showQuiz(){
 const dialog=$("quiz");
 quizTrigger=document.activeElement;
 dialog.scrollTop=0;
 if(!compactQuiz()&&typeof dialog.showModal==="function"){
  dialog.showModal();
  return;
 }
 document.body.classList.add("quiz-open");
 for(const region of document.querySelectorAll("body > header, body > main, body > footer"))region.inert=true;
 dialog.setAttribute("aria-modal","true");
 dialog.setAttribute("open","");
 $("close-quiz-top").focus();
}

function closeQuiz(){
 const dialog=$("quiz");
 if(!document.body.classList.contains("quiz-open")){
  dialog.close();
  return;
 }
 dialog.removeAttribute("open");
 dialog.removeAttribute("aria-modal");
 document.body.classList.remove("quiz-open");
 for(const region of document.querySelectorAll("body > header, body > main, body > footer"))region.inert=false;
 quizTrigger?.focus();
}

document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&document.body.classList.contains("quiz-open"))closeQuiz();
});

const authorModeKey="atlas-med-personal-mode";
const authorLinkHash="e1883c04d10ccd19496e6302405411c5c83c8d4ec899dd1d4e36b17795e4e921";
let personalMode=false;

async function initPersonalMode(){
 try{
  personalMode=localStorage.getItem(authorModeKey)==="1";
  const key=new URLSearchParams(location.hash.slice(1)).get("pessoal");
  if(!key||!/^[a-f0-9]{48}$/.test(key))return;
  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(key));
  const hash=Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,"0")).join("");
  if(hash!==authorLinkHash)return;
  localStorage.setItem(authorModeKey,"1");
  personalMode=true;
  history.replaceState(null,"",location.pathname+location.search);
 }catch{
  // Reading questions remains available when local storage is disabled.
 }
}

window.addEventListener("hashchange",initPersonalMode);

function topicNoteKey(topic){
 return "atlas-med-topic-note:"+topic.normalize("NFC").toLocaleLowerCase("pt-BR");
}

function renderTopicReview(q){
 const topic=topicOf(q);
 if(!topic)return "";
 const lesson=Object.hasOwn(topicReviewLessons,topic)?topicReviewLessons[topic]:null;
 const review=Object.hasOwn(clinicalTopicReviews,topic)?clinicalTopicReviews[topic]:null;
 const detail=topicDetails.get(topic);
 const subtopics=[...(detail?.subtopics.values()||[])].sort(alphabetical);
 const questionSubtopics=subtopicsOf(q);
 const list=subtopics.length?'<details><summary>Subassuntos deste tema ('+subtopics.length+')</summary><ul>'+
  subtopics.map(name=>'<li>'+safe(name)+'</li>').join("")+'</ul></details>':"";
 const sourceLinks=lesson?lesson.sources.map(([label,url])=>'<li><a href="'+safe(validURL(url))+'" target="_blank" rel="noopener noreferrer">'+safe(label)+'</a></li>').join(""):"";
 const body=lesson?'<p>'+safe(lesson.overview)+'</p><h4>O que as questões cobram</h4>'+
  lesson.points.map(([title,text])=>'<p><b>'+safe(title)+'</b><br>'+safe(text)+'</p>').join("")+
  '<details><summary>Referências</summary><ul>'+sourceLinks+'</ul></details>':review?'<p>'+safe(review.text)+'</p><p><a href="'+safe(review.link)+'" target="_blank" rel="noopener noreferrer">'+safe(review.source)+'</a></p>':
  '<p class="muted">Questões deste assunto no banco: '+(detail?.count||1)+'. '+(subtopics.length?'Consulte os subassuntos para orientar a revisão.':'Revise o conceito central de '+safe(topic)+'.')+'</p>';
 return '<section class="feedback"><h3>'+ (lesson||review?"Resumo geral · ":"Roteiro de revisão · ")+safe(topic)+'</h3>'+
  (questionSubtopics.length?'<p><b>Subassuntos desta questão</b><br>'+safe(questionSubtopics.join(" · "))+'</p>':'')+body+list+'</section>';
}

function loadTopicNote(topic){
 const saved=localStorage.getItem(topicNoteKey(topic));
 if(saved!==null)return saved;
 const previous=new Map();
 for(const name of topicDetails.get(topic)?.aliases||[]){
  const note=localStorage.getItem(topicNoteKey(name));
  if(note&&!previous.has(note))previous.set(note,name);
 }
 if(previous.size<=1)return previous.keys().next().value||"";
 return [...previous].map(([note,name])=>name+"\n"+note).join("\n\n");
}

const noteKey=id=>"atlas-med-note:"+id;

const backupFormat="atlas-med-backup";
const isNoteKey=key=>key.startsWith("atlas-med-note:")||key.startsWith("atlas-med-topic-note:");
const isRecord=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);

function exportStudyBackup(){
 try{
  const notes=Object.create(null);
  if(personalMode){
   for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&isNoteKey(key))notes[key]=localStorage.getItem(key);
   }
  }
  const content=JSON.stringify({format:backupFormat,version:1,progress,notes});
  const url=URL.createObjectURL(new Blob([content],{type:"application/json"}));
  const link=document.createElement("a");
  link.href=url;
  link.download="atlas-med-"+new Date().toISOString().slice(0,10)+".json";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
  $("backup-status").textContent="Arquivo preparado. Abra o Atlas Med no outro aparelho para importar.";
 }catch{
  $("backup-status").textContent="Não foi possível exportar os dados deste navegador.";
 }
}

function mergeStudyBackup(backup){
 if(!isRecord(backup)||backup.format!==backupFormat||backup.version!==1||
    !isRecord(backup.progress)||!isRecord(backup.notes))throw Error("Arquivo inválido. Selecione um arquivo exportado pelo Atlas Med.");
 const merged=Object.assign(Object.create(null),progress);
 const notes=Object.entries(backup.notes);
 if(notes.some(([key,value])=>!isNoteKey(key)||typeof value!=="string"))throw Error("O arquivo contém anotações inválidas.");
 let conflicts=0;
 for(const [id,entry] of Object.entries(backup.progress)){
  if(!id||!isRecord(entry)||(Object.hasOwn(entry,"answer")&&(typeof entry.answer!=="string"||!/^[A-E]$/.test(entry.answer)))||
     (Object.hasOwn(entry,"starred")&&typeof entry.starred!=="boolean"))throw Error("O arquivo contém respostas ou favoritos inválidos.");
  const local=merged[id]||{};
  const next={...local};
  for(const field of ["answer","starred"]){
   if(!Object.hasOwn(entry,field))continue;
   if(!Object.hasOwn(local,field))next[field]=entry[field];
   else if(local[field]!==entry[field])conflicts++;
  }
  merged[id]=next;
 }
 const additions=[];
 if(personalMode){
  for(const [key,value] of notes){
   const local=localStorage.getItem(key);
   if(local===null)additions.push([key,value]);
   else if(local!==value)conflicts++;
  }
 }
 const previousProgress=localStorage.getItem(progressKey);
 const savedNotes=[];
 try{
  localStorage.setItem(progressKey,JSON.stringify(merged));
  for(const [key,value] of additions){
   localStorage.setItem(key,value);
   savedNotes.push(key);
  }
 }catch{
  for(const key of savedNotes)localStorage.removeItem(key);
  if(previousProgress===null)localStorage.removeItem(progressKey);
  else localStorage.setItem(progressKey,previousProgress);
  throw Error("Não foi possível salvar a importação neste navegador.");
 }
 progress=merged;
 const preserved=conflicts?" Os dados deste aparelho foram mantidos onde havia diferenças.":"";
 const skipped=notes.length&&!personalMode?" Para importar as anotações, ative seu modo pessoal neste aparelho e importe o arquivo novamente.":"";
 return "Importação concluída."+preserved+skipped;
}

$("export-study").addEventListener("click",exportStudyBackup);
$("import-study").addEventListener("click",()=>$("backup-file").click());
$("backup-file").addEventListener("change",async event=>{
 const file=event.target.files?.[0];
 event.target.value="";
 if(!file)return;
 const status=$("backup-status");
 try{
  if(file.size>16*1024*1024)throw Error("O arquivo excede o limite de 16 MB.");
  let data;
  try{data=JSON.parse(await file.text());}
  catch{throw Error("Selecione um arquivo JSON exportado pelo Atlas Med.");}
  status.textContent=mergeStudyBackup(data);
  render();
 }catch(error){
  status.textContent=error.message;
 }
});


function renderQuestionNote(q){
 if(!personalMode)return "";
 const topic=topicOf(q);
 const hasTopic=topic&&q.modulo!==pendingModule;
 let note="",topicNote="";
 try{
  note=localStorage.getItem(noteKey(q.id))||"";
  if(hasTopic)topicNote=loadTopicNote(topic);
 }catch{}
 const topicEditor=hasTopic?'<label for="topic-note">Meu resumo · '+safe(topic)+'</label>'+
  '<textarea id="topic-note" rows="4" data-topic="'+safe(topic)+'" aria-describedby="topic-note-hint topic-note-status" placeholder="Escreva um resumo para rever em todas as questões deste assunto…">\n'+safe(topicNote)+'</textarea>'+
  '<p id="topic-note-hint" class="muted">Vinculado ao assunto e salvo neste navegador.</p><p id="topic-note-status" class="muted" role="status"></p>':"";
 return '<section class="question-note">'+
  '<label for="question-note">Minhas anotações</label>'+
  '<textarea id="question-note" data-question-id="'+safe(q.id)+'" rows="4" aria-describedby="question-note-hint question-note-status" placeholder="Escreva o que quer lembrar desta questão…">\n'+safe(note)+'</textarea>'+
  '<p id="question-note-hint" class="muted">Salvamento automático neste navegador.</p>'+
  '<p id="question-note-status" class="muted" role="status"></p>'+topicEditor+
  '</section>';
}

$("quiz-body").addEventListener("input",event=>{
 const field=event.target;
 if(!personalMode||!["question-note","topic-note"].includes(field.id))return;
 const topic=field.id==="topic-note";
 const status=$(field.id+"-status");
 try{
  const key=topic?topicNoteKey(field.dataset.topic):noteKey(field.dataset.questionId);
  if(topic||field.value.trim())localStorage.setItem(key,field.value);
  else localStorage.removeItem(key);
  status.textContent=field.value.trim()?(topic?"Resumo salvo para este assunto.":"Anotação salva."):"Campo vazio.";
 }catch{
  status.textContent="Não foi possível salvar. Copie a anotação antes de fechar.";
 }
});

function renderComment(q){
 const sem=q.semestre,privatePdf=window.NIEPAEMPdf||null,info=privatePdf?.info(sem),book=info?.url||localQuestionUrls[sem],commentUrl=localCommentUrls[sem];
 const interactive=q.modo_resolucao==="pdf-local",p=progress[q.id]||{},answered=Boolean(p.answer);
 const transcript=privatePdf?.getQuestion(sem,q.numero)||null;
 const textReady=Boolean(transcript?.statement),optionsReady=Boolean(transcript?.options?.length===4);
 const pdfFileName="TP_NIEPAEM_2026."+sem+"_PROVA.pdf";
 const bookFrame=book?(compactQuiz()?mobilePdfReader(book,q.pagina_prova):'<iframe title="Caderno original NIEPAEM 2026.'+safe(sem)+' — questão '+safe(q.numero)+'" src="'+safe(book+"#page="+q.pagina_prova+"&zoom=110")+'"></iframe>'):"";
 const bookView=book?'<div class="local-pdf">'+bookFrame+'<p><a href="'+safe(book+"#page="+q.pagina_prova)+'" target="_blank" rel="noopener noreferrer">Abrir o caderno em outra aba ↗</a></p></div>':'<div class="empty"><b>Caderno ainda não carregado</b><p>Selecione o arquivo '+safe(pdfFileName)+' uma vez. Ele será guardado apenas neste navegador.</p></div>';
 const navigable=currentIndex().filter(x=>x.modo_resolucao==="pdf-local"&&x.semestre===sem);
 const loc=navigable.findIndex(x=>x.id===q.id),prev=loc>0?navigable[loc-1]:null,next=loc>=0&&loc<navigable.length-1?navigable[loc+1]:null;
 const navigate='<div class="quiz-actions"><button data-comment-navigate="-1" '+(!prev?"disabled":"")+'>← Anterior</button><button data-comment-navigate="1" '+(!next?"disabled":"")+'>Próxima →</button></div>';
 const input='<label for="question-pdf-file" class="file-instruction">'+(book?"Substituir caderno deste semestre":"Carregar o caderno de questões (somente uma vez)")+'</label><input type="file" id="question-pdf-file" accept="application/pdf,.pdf" /><p class="muted">O arquivo é salvo localmente no navegador e não é enviado ao GitHub.</p>'+(book?'<button id="forget-private-pdf" class="secondary">Apagar cópia privada deste navegador</button>':'');
 const status=info?.status==="loading"?'<p class="muted"><b>Extraindo o texto do PDF...</b> As questões aparecerão automaticamente após a leitura.</p>':info?.status==="error"?'<p class="muted">Não foi possível transcrever automaticamente: '+safe(info.error)+'. O PDF original continua disponível no painel do caderno.</p>':'';
 const figureNote='<p class="muted">Para interpretar imagens, ECG, radiografias e gráficos, consulte também a figura no PDF original. A transcrição automática pode alterar a formatação de tabelas.</p>';
 const questionHtml=textReady?'<div class="reader-reworded"><span class="tag">Enunciado original lido do PDF local</span><p>'+safe(transcript.statement)+'</p></div>'+figureNote:book?status+'<p class="muted">O texto ainda não foi identificado com segurança. Utilize o caderno original para responder.</p>':'<p>Carregue o caderno para mostrar o enunciado e as alternativas em texto.</p>';
 const letterButtons="ABCD".split("").map((letter,i)=>{
  const colored=answered?(answerMatches(q,letter)?"correct":letter===p.answer?"wrong":""):(commentChoice===letter?"chosen":"");
  const option=optionsReady?'<span>'+safe(transcript.options[i])+'</span>':"";
  return '<button class="choice answer-letter '+colored+'" data-comment-choice="'+letter+'" '+(answered?"disabled":"")+'><b>'+letter+'</b>'+option+'</button>';
 }).join("");
 const submit=answered?'<div class="feedback"><h3>'+(answerMatches(q,p.answer)?"✓ Você acertou":"✕ Você errou")+'</h3><p>Você marcou <b>'+safe(p.answer)+'</b>. Gabarito da banca: <b>'+safe(q.gabarito)+'</b>.</p>'+(studyNotes[q.id]?'</div>'+renderStudy(q):'<b>Comentário resumido</b><p>'+safe(q.comentario_resumido)+'</p></div>')+'<button id="comment-retry">Responder novamente</button>':'<div class="'+(optionsReady?"answer-list":"answer-grid")+'">'+letterButtons+'</div><button id="comment-submit" '+(!commentChoice?"disabled":"")+'>Corrigir resposta</button><p class="muted">A letra correta e a explicação aparecem após a resposta.</p>';
 const commentFile='<label class="file-instruction" for="comment-pdf-file">Carregar PDF da resolução original da banca (opcional)</label><input type="file" id="comment-pdf-file" accept="application/pdf,.pdf" />';
 const commentLink=commentUrl?commentUrl+"#page="+q.comentario_pagina:"";
 const commentFrame=commentLink?'<div class="local-pdf">'+(compactQuiz()?mobilePdfReader(commentUrl,q.comentario_pagina)+'<p><a href="'+safe(commentLink)+'" target="_blank" rel="noopener noreferrer">Abrir resolução em outra aba ↗</a></p>':'<iframe title="Gabarito comentado NIEPAEM '+safe(sem)+'" src="'+safe(commentLink+"&zoom=110")+'"></iframe>')+'</div>':"";
 const right=interactive?'<div class="reader-answer"><span class="tag">'+safe(q.modulo)+'</span><span class="tag">NIEPAEM 2026.'+safe(sem)+' · Questão '+safe(q.numero)+'</span><h2>'+safe(q.tema)+'</h2>'+questionHtml+submit+(answered?'<h3>Resolução original</h3>'+commentFile+commentFrame+renderTopicReview(q)+renderQuestionNote(q):'')+'</div>':'<div><h2>'+safe(q.tema)+'</h2><div class="feedback"><b>Gabarito: '+safe(q.gabarito)+'</b><p>'+safe(q.comentario_resumido)+'</p></div>'+commentFile+commentFrame+renderTopicReview(q)+renderQuestionNote(q)+'</div>';
 const left=interactive?'<div class="reader-pdf"><div class="reader-links"><b>Caderno NIEPAEM 2026.'+safe(sem)+' · página '+safe(q.pagina_prova)+'</b>'+navigate+'</div>'+input+bookView+'</div>':'<div><p>Documento de referência.</p></div>';
 $("quiz-body").innerHTML='<div class="comment-view local-quiz">'+left+right+'</div>';
}

function openComment(id){
  const q=indices.find(x=>x.id===id&&["comentario","pdf-local"].includes(x.modo_resolucao));
  if(!q)return;
  commentActive=q;commentChoice="";pdfActive=null;active=null;
  $("quiz").classList.remove("pdf-dialog");
  $("quiz").classList.add("comment-dialog");
  renderComment(q);
  showQuiz();
  if(window.NIEPAEMPdf)window.NIEPAEMPdf.restore(q.semestre).catch(()=>null);
}
function openPdf(id){
  pdfActive=indices.find(q=>q.id===id&&q.modo_resolucao==="pdf");
  if(!pdfActive)return;
  pdfChoice="";readerSource="official";
  $("quiz").classList.remove("comment-dialog");$("quiz").classList.add("pdf-dialog");
  drawPdf();
  showQuiz();
}
const commentedExams={
 "ENAMED 2025":["MedVetor","https://medvetor.com.br/provas/enamed-2025"],
 "ENAMED 2026":["MedVetor","https://medvetor.com.br/provas/enamed-2026"],
 "UNESP 2025":["MedVetor","https://medvetor.com.br/provas/unesp-2025"],
 "UNESP 2026":["MedVetor","https://medvetor.com.br/provas/unesp-2026"],
 "USP 2023":["MedCof","https://lp.grupomedcof.com.br/wp-content/uploads/2023/12/USP-Prova-Comentada-novo.pdf"],
 "USP 2024":["MedVetor (assinatura)","https://medvetor.com.br/provas/usp-sp-2024"],
 "USP 2025":["MedCof","https://lp.grupomedcof.com.br/PROVA_COMENTADA_2025_USP-SP.pdf"],
 "USP 2026":["MedVetor","https://medvetor.com.br/provas/usp-sp-2026"],
 "UNIFESP 2025":["MedVetor","https://medvetor.com.br/provas/unifesp-2025"],
 "UNIFESP 2026":["MedVetor","https://medvetor.com.br/provas/unifesp-2026"],
};
const studyNotes={
  "niepaem-2026-2-q070": {
    comentario_resumido: "B. Ceratite bacteriana. A pista decisiva é o infiltrado branco focal na córnea com edema ao redor. Dor intensa, fotofobia e visão embaçada reforçam o acometimento corneano. Dormir com lentes de contato aumenta o risco de ceratite infecciosa.",
    estudo_alternativas: [
      "A · Conjuntivite bacteriana costuma cursar com secreção mucopurulenta. Dor intensa, fotofobia e infiltrado corneano focal apontam para ceratite.",
      "C · Episclerite costuma causar vermelhidão setorial e desconforto leve, com visão preservada.",
      "D · Conjuntivite alérgica tem prurido como sintoma predominante e costuma ser bilateral."
    ],
    estudo_revisar: "Em usuários de lentes de contato, olho vermelho doloroso com fotofobia ou piora da visão pede avaliação oftalmológica urgente. O exame com lâmpada de fenda identifica o infiltrado, e a fluoresceína ajuda a detectar um defeito epitelial associado.",
    estudo_referencia_nome: "American Academy of Ophthalmology · Diretriz de ceratite bacteriana",
    estudo_referencia_url: "https://www.guidelinecentral.com/guideline/10669/"
  },
  "enamed-2025-c01-q001": {
    "comentario_resumido": "A fração de ejeção de 38% identifica insuficiência cardíaca com fração de ejeção reduzida. Entre as opções, a espironolactona acrescenta benefício prognóstico por bloquear o receptor mineralocorticoide.",
    "estudo_revisar": "Revise os quatro pilares da terapia com benefício prognóstico na ICFEr. Para iniciar um antagonista mineralocorticoide em paciente sintomático, confira se a taxa de filtração glomerular é superior a 30 mL/min/1,73 m² e se o potássio é inferior a 5,0 mEq/L. Monitore ambos após o início.",
    "estudo_referencia_nome": "Diretriz AHA/ACC/HFSA de insuficiência cardíaca",
    "estudo_referencia_url": "https://professional.heart.org/en/-/media/832EA0F4E73948848612F228F7FA2D35.pdf"
  },
  "enamed-2025-c01-q004": {
    "comentario_resumido": "A combinação de dismenorreia progressiva e dispareunia profunda favorece endometriose. Dor à mobilização do colo pode ocorrer em outras condições pélvicas e, isoladamente, não define o diagnóstico.",
    "estudo_revisar": "Revise o padrão cíclico, a disquesia e a infertilidade como outras pistas. Ultrassonografia ou ressonância podem ajudar na investigação. Imagem normal não exclui endometriose superficial.",
    "estudo_referencia_nome": "Diretriz ESHRE de endometriose",
    "estudo_referencia_url": "https://www.eshre.eu/-/media/sitecore-files/Guidelines/Endometriosis/ESHRE-GUIDELINE-ENDOMETRIOSIS-2022_2.pdf"
  },
  "enamed-2025-c01-q005": {
    "comentario_resumido": "A inoculação por arranhadura de gato, seguida de úlcera na mão e nódulos ao longo da drenagem linfática, favorece esporotricose linfocutânea. O itraconazol é a opção apresentada para essa forma.",
    "estudo_revisar": "Revise a diferença entre lesão cutânea fixa e forma linfocutânea, a confirmação por cultura e as indicações de anfotericina B nas formas graves. O tempo de tratamento depende da resposta clínica.",
    "estudo_referencia_nome": "Ministério da Saúde · Esporotricose humana",
    "estudo_referencia_url": "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/e/esporotricose-humana"
  }
};
function renderStudy(q){
 const note=studyNotes[q.id]||q;
 const exam=q.resolucao_comentada||commentedExams[q.instituicao+" "+q.ano];
 const reference=validURL(note.estudo_referencia_url);
 if(!note.comentario_resumido&&!exam)return "";
 return '<section class="feedback"><h3>Resolução e revisão</h3>'+
  (note.comentario_resumido?'<p>'+safe(note.comentario_resumido)+'</p>':'')+
  (note.estudo_alternativas?'<h4>Por que as outras alternativas estão incorretas</h4><ul>'+note.estudo_alternativas.map(text=>'<li>'+safe(text)+'</li>').join("")+'</ul>':'')+
  (note.estudo_revisar?'<h4>O que revisar</h4><p>'+safe(note.estudo_revisar)+'</p>':'')+
  (reference!=="#" ? '<p><a href="'+safe(reference)+'" target="_blank" rel="noopener noreferrer">'+safe(note.estudo_referencia_nome)+'</a></p>':'')+
  (exam?'<p><a href="'+safe(exam[1])+'" target="_blank" rel="noopener noreferrer">Ver prova comentada · '+safe(exam[0])+'</a></p><p class="muted">'+(q.pagina_comentario?'Confira o comentário e use o gabarito do Atlas Med para as respostas retificadas.':'Procure a questão '+safe(q.numero)+' na fonte e compare o enunciado. A cobertura e a ordem das questões podem variar conforme o caderno.')+'</p>':'')+
  '</section>';
}
function drawPdf(){
 const q=pdfActive,p=progress[q.id]||{},graded=scoreable(q),answered=Boolean(p.answer),n=q.alternativas_quantidade||4;
 const official=validURL(q.pdf_url || q.fonte_url),strategy=validURL(q.resolucao_pdf_url),checked=validURL(q.resolucao_verificada_url),mirror=validURL(q.pdf_espelho_url);
 const outside=q.instituicao==="NIEPAEM";
 const isUNESP=q.instituicao==="UNESP";
 const isUNIFESP=q.instituicao==="UNIFESP";
 const isUSP=q.instituicao==="USP";
 const sources=[{id:"official",name:isUSP?"Caderno USP / Fuvest":isUNESP?"Caderno UNESP / Vunesp":isUNIFESP?"Caderno UNIFESP / Medway":outside?"Prova NIEPAEM (arquivo externo)":"Caderno do Inep",url:official,page:q.fonte_formato==="Scribd HTML"?null:q.pagina}];
 if(strategy!=="#")sources.push({id:"strategy",name:"Estratégia MED",url:strategy,page:null});
 if(checked!=="#")sources.push({id:"verified",name:outside?"Gabarito comentado NIEPAEM":"Correção verificada",url:checked,page:q.pagina_resolucao||null});
 const selected=sources.find(x=>x.id===readerSource)||sources[0];
 const viewLink=selected.url+(selected.page?"#page="+encodeURIComponent(selected.page)+"&zoom=110":"");
 const controls=sources.map(x=>'<button class="reader-tab '+(selected.id===x.id?"active":"")+'" data-reader-source="'+safe(x.id)+'">'+safe(x.name)+'</button>').join("");
 const canTranscribe=Boolean(transcriptCadernos[q.instituicao+" "+q.ano]);
 const withOptions=Boolean(Array.isArray(q.alternativas_parafraseadas)&&q.alternativas_parafraseadas.length===n);
 const buttons=Array.from({length:n},(_,i)=>{
   const letter="ABCDE"[i],state=answered?(answerMatches(q,letter)?"correct":letter===p.answer?"wrong":""):(pdfChoice===letter?"chosen":"");
   return '<button class="choice answer-letter '+state+'" data-pdf-choice="'+letter+'" '+(answered?"disabled":"")+'><b>'+letter+'</b>'+(withOptions?'<span>'+safe(q.alternativas_parafraseadas[i])+'</span>':canTranscribe?'<span class="transcribed-option"></span>':"")+'</button>';
 }).join("");
 const pre=String(q.gabarito_status||"").includes("PRELIMINAR");
 const archivedSelection=q.ano<2025&&(isUNESP||isUNIFESP);
 const revision=validURL(q.revisao_url);
 const revisionLink=revision==="#"?"":'<p><a href="'+safe(revision)+'" target="_blank" rel="noopener noreferrer">Consultar decisões de recursos da COREME</a></p>';
 const answerLabel=archivedSelection?(isUNESP?"Gabarito preliminar da FMB":"Gabarito Medway com decisões de recursos da COREME"):isUNIFESP?"Gabarito consolidado de fonte secundária (conferir com a banca)":isUSP?(q.ano!==2025?"Gabarito oficial retificado da Fuvest":"Gabarito oficial da Fuvest"):isUNESP?(q.ano===2025?"Gabarito com retificações oficiais":"Gabarito divulgado em fonte secundária"):outside?"Gabarito comentado de fonte secundária":pre?"Gabarito preliminar do Inep":"Gabarito definitivo";
 const summary=renderStudy(q);
 const feedback=graded?(answered?'<div class="feedback"><b>'+(answerMatches(q,p.answer)?"✓ Acertou":"✕ Errou")+'</b><p>Você marcou '+safe(p.answer)+'. '+safe(answerLabel)+': <b>'+safe(displayAnswer(q))+'</b>.</p>'+(pre&&!archivedSelection?'<p><b>Atenção:</b> resultado sujeito a recurso e alteração até publicação do gabarito definitivo.</p>':'')+'<a href="'+safe(validURL(q.gabarito_url))+'" target="_blank" rel="noopener noreferrer">Consultar a fonte do gabarito ↗</a></div>'+summary+'<button id="pdf-retry">Responder novamente</button>':'<div class="'+(withOptions?"answer-list":"answer-grid")+'">'+buttons+'</div><button id="pdf-submit" disabled>Corrigir resposta</button>'):'<div class="feedback"><b>'+safe(q.gabarito==="ANULADA"?"Questão anulada":"Questão excluída")+'</b><p>Ela não participa das estatísticas de acertos.</p></div>'+summary;
 const instruction=(isUSP||isUNESP||isUNIFESP)&&!withOptions?'<p class="muted"><b>Alternativas A–D:</b> '+(canTranscribe?'use <b>Ler questão em texto</b> ou consulte o PDF.':'consulte o caderno original.')+'</p>':"";
 const sourceWarning=archivedSelection?(isUNESP?'<p class="muted">Correção pelo gabarito preliminar divulgado pela FMB. A pontuação pode mudar com a revisão de recursos.</p>':'<p class="muted">Correção pelo gabarito da Medway, atualizado com as decisões oficiais de recursos da COREME.</p>'+revisionLink):isUNIFESP?'<p class="muted"><b>UNIFESP:</b> caderno reformatado pela Medway. Correção baseada em fontes secundárias, com divergências entre versões. Questões marcadas como anuladas não são pontuadas.</p>'+(q.anotacao_gabarito&&q.anotacao_gabarito.trim()?'<p class="muted">'+safe(q.anotacao_gabarito)+'</p>':'')+(q.status_classificacao==="Classificação individual pendente"?'<p class="muted">Classificação temática individual ainda pendente.</p>':''):isUSP?(q.ano<2025?'<p class="muted">Gabarito retificado da Fuvest. As questões anuladas ficam fora da pontuação e as duplas respostas são aceitas conforme a banca.</p>':q.ano===2026?'<p class="muted"><b>USP 2026:</b> gabarito da Fuvest retificado em 15/12/2025; as questões 54 e 120 foram anuladas.</p>':'<p class="muted"><b>USP 2025:</b> respostas conferidas no gabarito A1 da Fuvest, publicado em 01/12/2024.</p>')+(q.status_classificacao==="Classificação individual pendente"?'<p class="muted"><b>Módulo a revisar:</b> o assunto específico desta questão ainda não foi conferido; não foi atribuído por suposição.</p>':''):isUNESP?(q.ano===2026?'<p class="muted"><b>Fonte do gabarito:</b> MedCalcApp; falta validação direta na área restrita da Vunesp.</p>':'<p class="muted"><b>Gabarito corrigido após recursos:</b> quatro anulações e seis mudanças de letra já incorporadas.</p>'):"";
 const question=q.enunciado_parafraseado?'<div class="reader-reworded"><span class="tag">Redação editorial da questão real</span><p>'+safe(q.enunciado_parafraseado)+'</p></div><p class="muted">A redação foi adaptada. Para conferir o enunciado original, as imagens e as tabelas, consulte o caderno original.</p>':'<p>'+safe(q.resumo)+'</p>';
 const note=archivedSelection?"Confira o número da questão no caderno.":isUNIFESP?"Prova de acesso direto da UNIFESP, caderno reproduzido pela Medway. Gabarito de fonte secundária, sujeito a divergências entre versões.":isUSP?"Caderno oficial da Fuvest. Gabarito da banca é utilizado na correção; variantes A2/AD2 e A3/AD3 não estão duplicadas neste banco.":isUNESP?"Caderno real de acesso direto da UNESP. A página indicada é aproximada até revisão específica; utilize a busca do PDF para encontrar QUESTÃO "+String(q.numero).padStart(2,"0")+". As alternativas aparecem integralmente no documento. Em 2025, anuladas e retificações oficiais estão consideradas; em 2026, o gabarito ainda depende de conferência diretamente na Vunesp.":outside?"Arquivo NIEPAEM disponibilizado por terceiros no Scribd; o acesso pode exigir login e impedir a incorporação. Use Abrir em outra aba para consultar a prova ou o gabarito comentado.":selected.id==="strategy"?"PDF comentado indicado no portal do Estratégia MED. A exibição depende das permissões do servidor; esta versão ainda não pôde ser auditada integralmente pelo Atlas Med.":selected.id==="verified"?"Correção comentada publicada pelo OsceLabs, com gabarito preliminar. Os comentários exibidos no painel foram escritos separadamente.":"Caderno oficial de prova. A correção de cursinhos não substitui o gabarito do Inep.";
 const transcriptQuestion=selected.id==="official"&&canTranscribe?q:null;
 const transcriptReader=transcriptQuestion?mobilePdfReader(selected.url,selected.page,transcriptQuestion):"";
 const frame=compactQuiz()?(q.fonte_formato==="Scribd HTML"?"":transcriptReader||mobilePdfReader(selected.url,selected.page)):transcriptReader+'<iframe src="'+safe(viewLink)+'" title="Documento de '+safe(selected.name)+'" loading="lazy" referrerpolicy="no-referrer"></iframe>';
 $("quiz-body").innerHTML='<div class="reader-layout"><div class="reader-pdf"><div class="reader-links"><b>'+safe(q.instituicao)+' '+safe(q.ano)+' · '+safe(q.caderno)+' · Questão '+safe(q.numero)+'</b><a href="'+safe(viewLink)+'" target="_blank" rel="noopener noreferrer">Abrir PDF em outra aba ↗</a></div><div class="reader-tabs">'+controls+'</div>'+(compactQuiz()?'<p><a href="'+safe(viewLink)+'">Abrir documento nesta aba</a></p>':'')+frame+'<p class="muted">'+safe(note)+'</p>'+(selected.id==="official"&&mirror!=="#"?'<a href="'+safe(mirror)+'#page='+safe(q.pagina)+'" target="_blank" rel="noopener noreferrer">Espelho do caderno caso o Inep não carregue ↗</a>':'')+'</div><div class="reader-answer"><div><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span>'+(pre?'<span class="tag" style="background:#fff2cc;color:#805300">Gabarito preliminar</span>':'')+'</div><h2>'+safe(q.tema)+'</h2>'+question+(canTranscribe?pdfTranscriptBox:'')+instruction+sourceWarning+(pre?'<p class="muted">Resposta baseada no gabarito de setembro de 2026, sujeito a alterações.</p>':'')+feedback+(answered||!graded?renderTopicReview(q)+renderQuestionNote(q):'')+'</div></div>';
 if(transcriptQuestion)showPdfTranscript($("quiz-body").querySelector("[data-transcript-bank]"));
}
function openQuiz(id){$("quiz").classList.remove("pdf-dialog");pdfActive=null;active=questions.find(q=>q.id===id);if(!active)return;choice=progress[id]?.answer||"";drawQuiz();showQuiz();}
function drawQuiz(){let q=active,p=progress[q.id]||{},answered=Boolean(p.answer);$("quiz-body").innerHTML='<span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><h2>'+safe(q.tema)+'</h2><p>'+safe(q.enunciado)+'</p>'+q.alternativas.map((a,i)=>{let l="ABCDE"[i],cls=answered?(l===q.gabarito?"correct":l===p.answer?"wrong":""):choice===l?"chosen":"";return '<button class="choice '+cls+'" data-choice="'+l+'" '+(answered?"disabled":"")+'> <b>'+l+'.</b> '+safe(a)+'</button>'}).join("")+(answered?'<div class="feedback"><b>Gabarito: '+safe(q.gabarito)+'</b><p>'+safe(q.comentario||"Confira a fonte oficial.")+'</p></div>'+renderTopicReview(q)+renderQuestionNote(q):"")+'<div class="quiz-actions">'+(answered?'<button id="retry">Responder novamente</button>':'<button id="submit" '+(!choice||!q.gabarito||q.gabarito==="ANULADA"?"disabled":"")+'>Confirmar resposta</button>')+(q.fonte_url?'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Fonte original ↗</a>':"")+'</div>';}
function switchView(v){document.querySelectorAll(".view").forEach(e=>e.classList.toggle("hidden",e.id!=="view-"+v));document.querySelectorAll("[data-view]").forEach(e=>e.classList.toggle("active",e.dataset.view===v));}
document.addEventListener("niepaem-pdf-updated",e=>{
 if(commentActive&&commentActive.semestre===e.detail.semester&&commentActive.modo_resolucao==="pdf-local")renderComment(commentActive);
});
document.addEventListener("change",async e=>{
  const id=e.target.id;
  if(!["comment-pdf-file","question-pdf-file"].includes(id)||!commentActive)return;
  const file=e.target.files?.[0];if(!file)return;
  if(!(/\.pdf$/i.test(file.name)||file.type==="application/pdf")){alert("Selecione um arquivo PDF.");return}
  if(file.size>40*1024*1024){alert("O PDF ultrapassa 40 MB.");return}
  const sem=commentActive.semestre;
  const matchesSemester=String(file.name).match(/2026[._-]([12])/);
  if(matchesSemester&&Number(matchesSemester[1])!==sem){alert("Selecione o arquivo de 2026."+sem+".");return}
  if(id==="question-pdf-file"&&window.NIEPAEMPdf){
    try{await window.NIEPAEMPdf.attach(sem,file,true)}catch(err){alert("Não foi possível abrir o PDF: "+err.message)}
    return;
  }
  const storage=id==="question-pdf-file"?localQuestionUrls:localCommentUrls;
  if(storage[sem])URL.revokeObjectURL(storage[sem]);
  storage[sem]=URL.createObjectURL(file);
  renderComment(commentActive);
});
document.addEventListener("click",e=>{let btn=e.target.closest?.("button");if(!btn)return;if(btn.dataset.view)switchView(btn.dataset.view);if(btn.hasAttribute("data-module"))chooseModule(btn.dataset.module);if(btn.dataset.open)openQuiz(btn.dataset.open);if(btn.dataset.pdfOpen)openPdf(btn.dataset.pdfOpen);if(btn.dataset.commentOpen)openComment(btn.dataset.commentOpen);if(btn.id==="forget-private-pdf"&&commentActive&&window.NIEPAEMPdf&&confirm("Apagar a cópia do caderno armazenada neste navegador?"))window.NIEPAEMPdf.forget(commentActive.semestre).catch(()=>{});if(btn.dataset.commentChoice&&commentActive&&commentActive.modo_resolucao==="pdf-local"&&!progress[commentActive.id]?.answer){commentChoice=btn.dataset.commentChoice;document.querySelectorAll("[data-comment-choice]").forEach(x=>x.classList.toggle("chosen",x.dataset.commentChoice===commentChoice));const submit=$("comment-submit");if(submit)submit.disabled=false;}if(btn.id==="comment-submit"&&commentActive&&commentChoice&&commentActive.modo_resolucao==="pdf-local"){progress[commentActive.id]={...(progress[commentActive.id]||{}),answer:commentChoice};save();renderComment(commentActive);render();}if(btn.id==="comment-retry"&&commentActive){delete progress[commentActive.id]?.answer;save();commentChoice="";renderComment(commentActive);render();}if(btn.dataset.commentNavigate&&commentActive){const list=currentIndex().filter(q=>q.modo_resolucao==="pdf-local"&&q.semestre===commentActive.semestre),at=list.findIndex(q=>q.id===commentActive.id),next=list[at+Number(btn.dataset.commentNavigate)];if(next){commentActive=next;commentChoice="";renderComment(next);}}if(btn.dataset.readerSource&&pdfActive){readerSource=btn.dataset.readerSource;drawPdf();}if(btn.dataset.pdfStar){let id=btn.dataset.pdfStar;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.pdfChoice&&pdfActive&&!progress[pdfActive.id]?.answer){pdfChoice=btn.dataset.pdfChoice;document.querySelectorAll("[data-pdf-choice]").forEach(x=>x.classList.toggle("chosen",x.dataset.pdfChoice===pdfChoice));let submit=$("pdf-submit");if(submit)submit.disabled=false;}if(btn.id==="pdf-submit"&&pdfActive&&pdfChoice&&scoreable(pdfActive)){progress[pdfActive.id]={...(progress[pdfActive.id]||{}),answer:pdfChoice};save();drawPdf();render()}if(btn.id==="pdf-retry"&&pdfActive){delete progress[pdfActive.id]?.answer;save();pdfChoice="";drawPdf();render()}if(btn.dataset.star){let id=btn.dataset.star;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.choice&&active&&!progress[active.id]?.answer){choice=btn.dataset.choice;drawQuiz()}if(btn.id==="submit"&&choice&&active){progress[active.id]={...(progress[active.id]||{}),answer:choice};save();drawQuiz();render()}if(btn.id==="retry"&&active){delete progress[active.id]?.answer;save();choice="";drawQuiz();render()}if(btn.id==="close-quiz"||btn.id==="close-quiz-top")closeQuiz();if(btn.id==="clear"){mod="";clearFilters();updateModuleLink();render()}if(btn.id==="reset-progress"&&confirm("Apagar todas as respostas e favoritos neste navegador?")){progress={};save();render()}});
$("bank-options").addEventListener("change",event=>{
 if(event.target.id==="bank-all")setAllBanks(event.target.checked);
 updateBankPicker();
 renderIndex();
 renderQuestions();
});
["start","end","semester","subtopic","status","search"].forEach(id=>$(id).addEventListener("input",()=>{renderIndex();renderQuestions()}));
$("topic").addEventListener("change",()=>{
 $("subtopic").value="";
 updateSubtopics();
 renderIndex();
 renderQuestions();
});
["source-bank","source-year"].forEach(id=>$(id).addEventListener("change",renderSources));
$("module-search").addEventListener("input",modules);
function archivedUspQuestions(archive, existing){
 const prior = new Map(existing.filter(q=>q.instituicao==="USP"&&q.ano===2024).map(q=>[q.numero,q]));
 return Object.entries(archive).flatMap(([year,exam])=>exam.questoes.map(([pagina,answer],index)=>{
  const ano=Number(year),numero=index+1;
  const previous=ano===2024?prior.get(numero):null;
  const gabaritos_aceitos=/^[A-D]{2}$/.test(answer)?[...answer]:undefined;
  const gabarito=gabaritos_aceitos?gabaritos_aceitos[0]:answer;
  return {
   id:previous?.id||"usp-"+year+"-"+(ano===2024?"a1":"a")+"-q"+String(numero).padStart(3,"0"),
   instituicao:"USP",ano,numero,pagina,caderno:exam.caderno,
   modulo:previous?.modulo||pendingModule,
   tema:previous?.tema||"Assunto específico pendente de identificação",
   subtema:previous?.subtema||"",
   resumo:previous?.resumo||"Questão "+numero+" de acesso direto da USP "+year+".",
   fonte_url:exam.pdf_url+"#page="+pagina,pdf_url:exam.pdf_url,gabarito_url:exam.gabarito_url,
   gabarito,gabaritos_aceitos,modo_resolucao:"pdf",alternativas_quantidade:4,conteudo_reproduzido:false,
  };
 }));
}
function archivedResidencyQuestions(exams) {
 return exams.flatMap(exam=>exam.questoes.map(([pagina,key,pagina_comentario],index)=>{
  const {instituicao,ano,caderno,pdf_url,gabarito_url,revisao_url,resolucao}=exam;
  const numero=index+1;
  const gabaritos_aceitos=/^[A-D]{2}$/.test(key)?[...key]:undefined;
  const gabarito=gabaritos_aceitos?.[0]||key;
  const resolucao_comentada=[resolucao[0],resolucao[1]+(pagina_comentario?"#page="+pagina_comentario:"")];
  return {
   id:instituicao.toLowerCase()+"-"+ano+"-ad-q"+String(numero).padStart(3,"0"),
   instituicao,ano,caderno,numero,pagina,pdf_url,gabarito_url,revisao_url,pagina_comentario,
   resolucao_comentada,gabarito,gabaritos_aceitos,
   gabarito_status:revisao_url?"COM REVISÃO DE RECURSOS":"PRELIMINAR",
   modulo:pendingModule,
   tema:"Assunto específico pendente de identificação",
   resumo:"Questão "+numero+" de acesso direto da "+instituicao+" "+ano+".",
   fonte_url:pdf_url+"#page="+pagina,modo_resolucao:"pdf",alternativas_quantidade:4,
  };
 }));
}
async function load(){bootFilters();if(new URLSearchParams(location.search).get("modulo")==="pendentes")mod=pendingModule;await initPersonalMode();try{let responses=await Promise.all([fetch("data/questoes.json"),fetch("data/provas.json"),fetch("data/indices.json"),fetch("data/niepaem-2026-1.json"),fetch("data/niepaem-2026-2.json"),fetch("data/unifesp-2025.json"),fetch("data/unifesp-2026.json"),fetch("data/classificacao.json"),fetch("data/usp-2023-2024.json"),fetch("data/unesp-unifesp-2023-2024.json")]);if(responses.some(r=>!r.ok))throw Error("Não foi possível carregar o acervo.");let data=await Promise.all(responses.map(r=>r.json()));[questions,sources,indices]=data.slice(0,3);const archived=archivedUspQuestions(data[8],indices);indices=[...indices.filter(q=>q.instituicao!=="USP"||q.ano!==2024),...archived,...archivedResidencyQuestions(data[9]),...data[3],...data[4],...data[5],...data[6]].map(q=>{
 const classification=data[7][q.id];
 if(!classification)return q;
 const [modulo,tema,pagina]=classification;
 return {...q,modulo,tema,pagina,subtema:"",resumo:tema,pagina_estimativa:false,status_classificacao:"Classificada pelo caderno"};
 });if(!Array.isArray(questions)||!Array.isArray(sources)||!Array.isArray(indices))throw Error("O acervo deve conter listas JSON.");questions=questions.filter(q=>q.id&&q.modulo&&q.enunciado&&Array.isArray(q.alternativas));}catch(e){console.error(e);$("questions").innerHTML='<p class="empty">Falha ao carregar o banco. Publique em servidor HTTP e confira os arquivos de dados.</p>';return;}indexTopics([...questions,...indices]);render();}
load();
