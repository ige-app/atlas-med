"use strict";
const $=id=>document.getElementById(id);
const BANKS=["ENAMED","USP","UNESP","NIEPAEM","UNIFESP"];
const MODULES=["Ginecologia","Obstetrícia","Oftalmologia","Cardiologia","Neurologia","Pediatria","Neonatologia","Cirurgia Geral","Clínica Médica","Pneumologia","Nefrologia","Endocrinologia","Gastroenterologia","Hematologia","Geriatria","Genética Médica","Mastologia","Anestesiologia","Cirurgia Vascular","Cirurgia Pediátrica","Neurocirurgia","Infectologia","Reumatologia","Dermatologia","Psiquiatria","Ortopedia","Urologia","Otorrinolaringologia","Medicina de Família e Comunidade","Saúde Coletiva","Emergências","Acesso direto — classificação pendente","Outros"];
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validURL=u=>{try{let a=new URL(u);return a.protocol==="https:"?a.href:"#"}catch{return"#"}};
let questions=[],sources=[],indices=[],mod="",active=null,choice="",pdfActive=null,pdfChoice="",readerSource="official",progress={},commentActive=null,localCommentUrls={},localQuestionUrls={},commentChoice="";
function scoreable(q){return /^[A-E]$/.test(q.gabarito||"") && (["pdf","pdf-local"].includes(q.modo_resolucao) || Boolean(q.enunciado&&Array.isArray(q.alternativas)))}
function semesterOf(q){if(q.semestre)return String(q.semestre);let m=String(q.edicao||q.caderno||"").match(/20\d{2}\.([12])/);return m?m[1]:"";}
try{progress=JSON.parse(localStorage.getItem("atlas-med-progress")||"{}")||{}}catch{progress={}}
const save=()=>{try{localStorage.setItem("atlas-med-progress",JSON.stringify(progress))}catch{}};
const select=(id,values,keep=true)=>{let x=$(id),old=keep?x.value:"";x.innerHTML=(id==="start"||id==="end"?"":"<option value=''>Todos</option>")+values.map(v=>'<option value="'+safe(v)+'">'+safe(v)+'</option>').join("");if(values.map(String).includes(old))x.value=old};
function bootFilters(){select("bank",BANKS);select("source-bank",BANKS);select("source-year",Array.from({length:10},(_,i)=>2017+i));for(const id of ["start","end"])select(id,Array.from({length:10},(_,i)=>2017+i));$("start").value="2017";$("end").value="2026"}
function currentIndex(){
  const bank=$("bank").value,start=+ $("start").value,end=+ $("end").value,sem=$("semester").value,topic=$("topic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;
  return indices.filter(q=>{
    const p=progress[q.id]||{};
    if((mod&&q.modulo!==mod)||(bank&&q.instituicao!==bank)||q.ano<start||q.ano>end||(sem&&semesterOf(q)!==sem)||(topic&&q.tema!==topic))return false;
    if(search&&![q.resumo,q.tema,q.subtema,q.modulo,q.comentario_resumido].join(" ").toLocaleLowerCase("pt-BR").includes(search))return false;
    if(status==="pending"&&(!scoreable(q)||p.answer))return false;
    if(status==="wrong"&&(!p.answer||p.answer===q.gabarito))return false;
    if(status==="starred"&&!p.starred)return false;
    return true;
  }).sort((a,b)=>b.ano-a.ano||(Number(semesterOf(b))||0)-(Number(semesterOf(a))||0)||a.instituicao.localeCompare(b.instituicao)||a.numero-b.numero);
}
function current(){let bank=$("bank").value,start=+$("start").value,end=+$("end").value,sem=$("semester").value,topic=$("topic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;return questions.filter(q=>(!mod||q.modulo===mod)&&(!bank||q.instituicao===bank)&&q.ano>=start&&q.ano<=end&&(!sem||semesterOf(q)===sem)&&(!topic||q.tema===topic)&&(!search||[q.enunciado,q.tema,q.subtema,q.modulo].join(" ").toLocaleLowerCase("pt-BR").includes(search))&&(!status||(status==="pending"?!progress[q.id]?.answer:status==="wrong"?progress[q.id]?.answer&&progress[q.id].answer!==q.gabarito:progress[q.id]?.starred)));}
function modules(){let s=$("module-search").value.toLocaleLowerCase("pt-BR");$("modules").innerHTML='<button class="module-btn '+(!mod?"selected":"")+'" data-module="">Todos os módulos</button>'+MODULES.filter(m=>m.toLocaleLowerCase("pt-BR").includes(s)).map(m=>'<button class="module-btn '+(mod===m?"selected":"")+'" data-module="'+safe(m)+'">'+safe(m)+' ('+(questions.filter(q=>q.modulo===m).length+indices.filter(q=>q.modulo===m).length)+')</button>').join("");}
function topics(){let prev=$("topic").value;let set=[...new Set([...questions,...indices].filter(q=>!mod||q.modulo===mod).map(q=>q.tema).filter(Boolean))].sort();select("topic",set,false);if(set.includes(prev))$("topic").value=prev;}
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
    const state=graded?(answered?(p.answer===q.gabarito?"✓ Acertou":"✕ Errou"):"Não resolvida"):commentOnly?"Gabarito comentado":q.gabarito==="PENDENTE"?"Gabarito indisponível":q.gabarito==="ANULADA"?"Anulada":"Excluída da pontuação";
    const favored='<button data-pdf-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button>';
    const controls=hasReader?'<button data-pdf-open="'+safe(q.id)+'">'+(graded?"Abrir e responder":"Consultar sem pontuação")+'</button> '+favored:commentOnly?'<button data-comment-open="'+safe(q.id)+'">'+(q.modo_resolucao==="pdf-local"?"Abrir e responder":"Ver gabarito e comentário")+'</button> '+favored:'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Abrir no caderno original ↗</a>';
    const description=commentOnly?"Questão real do NIEPAEM: leia o caso e as quatro alternativas no caderno original, responda e consulte o comentário resumido.":safe(q.enunciado_parafraseado||q.resumo||"").slice(0,230);
    return '<article class="question index"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+(semesterOf(q)?"."+safe(semesterOf(q)):"")+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span><span class="tag">'+safe(state)+'</span></div><h3>'+safe(q.tema)+'</h3><p>'+description+'</p>'+(commentOnly?'<p class="muted">Área original: '+safe(q.categoria_origem)+(q.pagina_prova?' · Caderno, página '+safe(q.pagina_prova):'')+' · Gabarito comentado, página '+safe(q.comentario_pagina)+'</p>':'<p class="muted">'+safe(q.caderno)+(q.fonte_formato==="Scribd HTML"?" · Documento externo":q.pagina?" · Página "+safe(q.pagina)+" do PDF":"")+'</p>')+'<div class="quiz-actions">'+controls+'</div></article>';
  }).join(""):'<div class="empty">Nenhuma questão corresponde aos filtros. Consulte o acervo para localizar outras provas.</div>';
}
function renderQuestions(){let list=current();$("selection").textContent=currentIndex().length+" questão(ões) oficiais classificadas"+(mod?" em "+mod:"")+".";const root=$("questions");root.previousElementSibling.classList.toggle("hidden",!list.length);root.classList.toggle("hidden",!list.length);root.innerHTML=list.length?list.map(q=>{let p=progress[q.id]||{};return '<article class="question"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">'+safe(q.tema)+'</span></div><h3>'+safe(q.enunciado).slice(0,185)+(q.enunciado.length>185?"…":"")+'</h3><p class="muted">'+(q.numero?"Questão "+safe(q.numero)+" · ":"")+(p.answer?"Respondida: "+safe(p.answer):"Não resolvida")+'</p><button data-open="'+safe(q.id)+'">Resolver questão</button> <button data-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button></article>'}).join(""):'';}
function renderSources(){let bank=$("source-bank").value,year=$("source-year").value;let list=sources.filter(s=>(!bank||s.instituicao===bank)&&(!year||String(s.ano)===year));$("sources").innerHTML=list.length?list.map(s=>'<article class="source"><div><span class="tag">'+safe(s.instituicao)+'</span><span class="tag">'+safe(s.ano??"acervo geral")+'</span></div><h3>'+safe(s.titulo)+'</h3><p>'+safe(s.observacao)+'</p><p class="muted">Status: '+safe(s.status||"referência catalogada")+'.</p><a href="'+safe(validURL(s.url))+'" target="_blank" rel="noopener noreferrer">Abrir portal de origem ↗</a></article>').join(""):'<div class="empty">Nenhuma fonte cadastrada neste filtro. Isso não significa que a prova não exista.</div>';}
function renderPerformance(){
  const attempted=[...questions,...indices].filter(q=>scoreable(q)&&progress[q.id]?.answer);
  const correct=attempted.filter(q=>progress[q.id].answer===q.gabarito).length,errors=attempted.length-correct;
  const byModule=MODULES.map(m=>({m,q:attempted.filter(q=>q.modulo===m)})).filter(x=>x.q.length);
  $("performance").innerHTML='<h3>Resumo</h3><p>Resolvidas: <b>'+attempted.length+'</b> · Acertos: <b>'+correct+'</b> · Erros: <b>'+errors+'</b> · Aproveitamento: <b>'+(attempted.length?Math.round(correct/attempted.length*100)+"%":"—")+'</b></p><p class="muted">Questões anuladas e excluídas não entram nas estatísticas. Seu desempenho fica salvo apenas neste navegador.</p><h3>Por módulo</h3>'+(byModule.length?byModule.map(({m,q})=>'<p>'+safe(m)+': '+q.filter(x=>progress[x.id].answer===x.gabarito).length+'/'+q.length+' corretas</p>').join(""):'<p class="muted">Ainda não há respostas registradas.</p>');
}
function render(){modules();topics();metrics();renderIndex();renderQuestions();renderSources();renderPerformance();}
function renderComment(q){
 const sem=q.semestre,privatePdf=window.NIEPAEMPdf||null,info=privatePdf?.info(sem),book=info?.url||localQuestionUrls[sem],commentUrl=localCommentUrls[sem];
 const interactive=q.modo_resolucao==="pdf-local",p=progress[q.id]||{},answered=Boolean(p.answer);
 const transcript=privatePdf?.getQuestion(sem,q.numero)||null;
 const textReady=Boolean(transcript?.statement),optionsReady=Boolean(transcript?.options?.length===4);
 const pdfFileName="TP_NIEPAEM_2026."+sem+"_PROVA.pdf";
 const bookView=book?'<div class="local-pdf"><iframe title="Caderno original NIEPAEM 2026.'+safe(sem)+' — questão '+safe(q.numero)+'" src="'+safe(book+"#page="+q.pagina_prova+"&zoom=110")+'"></iframe><p><a href="'+safe(book+"#page="+q.pagina_prova)+'" target="_blank" rel="noopener noreferrer">Abrir o caderno em outra aba ↗</a></p></div>':'<div class="empty"><b>Caderno ainda não carregado</b><p>Selecione o arquivo '+safe(pdfFileName)+' uma vez. Ele será guardado apenas neste navegador.</p></div>';
 const navigable=currentIndex().filter(x=>x.modo_resolucao==="pdf-local"&&x.semestre===sem);
 const loc=navigable.findIndex(x=>x.id===q.id),prev=loc>0?navigable[loc-1]:null,next=loc>=0&&loc<navigable.length-1?navigable[loc+1]:null;
 const navigate='<div class="quiz-actions"><button data-comment-navigate="-1" '+(!prev?"disabled":"")+'>← Anterior</button><button data-comment-navigate="1" '+(!next?"disabled":"")+'>Próxima →</button></div>';
 const input='<label for="question-pdf-file" class="file-instruction">'+(book?"Substituir caderno deste semestre":"Carregar o caderno de questões (somente uma vez)")+'</label><input type="file" id="question-pdf-file" accept="application/pdf,.pdf" /><p class="muted">O arquivo é salvo localmente no navegador e não é enviado ao GitHub.</p>'+(book?'<button id="forget-private-pdf" class="secondary">Apagar cópia privada deste navegador</button>':'');
 const status=info?.status==="loading"?'<p class="muted"><b>Extraindo o texto do PDF...</b> As questões aparecerão automaticamente após a leitura.</p>':info?.status==="error"?'<p class="muted">Não foi possível transcrever automaticamente: '+safe(info.error)+'. O PDF original continua disponível no painel ao lado.</p>':'';
 const figureNote='<p class="muted">Para interpretar imagens, ECG, radiografias e gráficos, consulte também a figura no PDF original ao lado. A transcrição automática pode alterar a formatação de tabelas.</p>';
 const questionHtml=textReady?'<div class="reader-reworded"><span class="tag">Enunciado original lido do PDF local</span><p>'+safe(transcript.statement)+'</p></div>'+figureNote:book?status+'<p class="muted">O texto ainda não foi identificado com segurança. Utilize o caderno original ao lado para responder.</p>':'<p>Carregue o caderno para mostrar o enunciado e as alternativas em texto.</p>';
 const letterButtons="ABCD".split("").map((letter,i)=>{
  const colored=answered?(letter===q.gabarito?"correct":letter===p.answer?"wrong":""):(commentChoice===letter?"chosen":"");
  const option=optionsReady?'<span>'+safe(transcript.options[i])+'</span>':"";
  return '<button class="choice answer-letter '+colored+'" data-comment-choice="'+letter+'" '+(answered?"disabled":"")+'><b>'+letter+'</b>'+option+'</button>';
 }).join("");
 const submit=answered?'<div class="feedback"><h3>'+(p.answer===q.gabarito?"✓ Você acertou":"✕ Você errou")+'</h3><p>Você marcou <b>'+safe(p.answer)+'</b>. Gabarito da banca: <b>'+safe(q.gabarito)+'</b>.</p><b>Comentário resumido</b><p>'+safe(q.comentario_resumido)+'</p></div><button id="comment-retry">Responder novamente</button>':'<div class="'+(optionsReady?"answer-list":"answer-grid")+'">'+letterButtons+'</div><button id="comment-submit" '+(!commentChoice?"disabled":"")+'>Corrigir resposta</button><p class="muted">A letra correta e a explicação aparecem após a resposta.</p>';
 const commentFile='<label class="file-instruction" for="comment-pdf-file">Carregar PDF da resolução original da banca (opcional)</label><input type="file" id="comment-pdf-file" accept="application/pdf,.pdf" />';
 const commentFrame=commentUrl?'<div class="local-pdf"><iframe title="Gabarito comentado NIEPAEM '+safe(sem)+'" src="'+safe(commentUrl+"#page="+q.comentario_pagina+"&zoom=110")+'"></iframe></div>':'';
 const right=interactive?'<div class="reader-answer"><span class="tag">'+safe(q.modulo)+'</span><span class="tag">NIEPAEM 2026.'+safe(sem)+' · Questão '+safe(q.numero)+'</span><h2>'+safe(q.tema)+'</h2>'+questionHtml+submit+(answered?'<h3>Resolução original</h3>'+commentFile+commentFrame:'')+'</div>':'<div><h2>'+safe(q.tema)+'</h2><div class="feedback"><b>Gabarito: '+safe(q.gabarito)+'</b><p>'+safe(q.comentario_resumido)+'</p></div>'+commentFile+commentFrame+'</div>';
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
  $("quiz").showModal();
  if(window.NIEPAEMPdf)window.NIEPAEMPdf.restore(q.semestre).catch(()=>null);
}
function openPdf(id){
  pdfActive=indices.find(q=>q.id===id&&q.modo_resolucao==="pdf");
  if(!pdfActive)return;
  pdfChoice="";readerSource="official";
  $("quiz").classList.remove("comment-dialog");$("quiz").classList.add("pdf-dialog");
  drawPdf();
  $("quiz").showModal();
}
function drawPdf(){
 const q=pdfActive,p=progress[q.id]||{},graded=scoreable(q),answered=Boolean(p.answer),n=q.alternativas_quantidade||4;
 const official=validURL(q.pdf_url || q.fonte_url),strategy=validURL(q.resolucao_pdf_url),checked=validURL(q.resolucao_verificada_url),mirror=validURL(q.pdf_espelho_url);
 const outside=q.instituicao==="NIEPAEM";
 const isUNESP=q.instituicao==="UNESP";
 const isUSP=q.instituicao==="USP";
 const sources=[{id:"official",name:isUSP?"Caderno USP / Fuvest":isUNESP?"Caderno UNESP / Vunesp":outside?"Prova NIEPAEM (arquivo externo)":"Caderno do Inep",url:official,page:q.fonte_formato==="Scribd HTML"?null:q.pagina}];
 if(strategy!=="#")sources.push({id:"strategy",name:"Estratégia MED",url:strategy,page:null});
 if(checked!=="#")sources.push({id:"verified",name:outside?"Gabarito comentado NIEPAEM":"Correção verificada",url:checked,page:q.pagina_resolucao||null});
 const selected=sources.find(x=>x.id===readerSource)||sources[0];
 const viewLink=selected.url+(selected.page?"#page="+encodeURIComponent(selected.page)+"&zoom=110":"");
 const controls=sources.map(x=>'<button class="reader-tab '+(selected.id===x.id?"active":"")+'" data-reader-source="'+safe(x.id)+'">'+safe(x.name)+'</button>').join("");
 const withOptions=Boolean(Array.isArray(q.alternativas_parafraseadas)&&q.alternativas_parafraseadas.length===n);
 const buttons=Array.from({length:n},(_,i)=>{
   const letter="ABCDE"[i],state=answered?(letter===q.gabarito?"correct":letter===p.answer?"wrong":""):(pdfChoice===letter?"chosen":"");
   return '<button class="choice answer-letter '+state+'" data-pdf-choice="'+letter+'" '+(answered?"disabled":"")+'><b>'+letter+'</b>'+(withOptions?'<span>'+safe(q.alternativas_parafraseadas[i])+'</span>':"")+'</button>';
 }).join("");
 const pre=String(q.gabarito_status||"").includes("PRELIMINAR");
 const answerLabel=isUSP?(q.ano===2026?"Gabarito oficial retificado da Fuvest":"Gabarito oficial da Fuvest"):isUNESP?(q.ano===2025?"Gabarito com retificações oficiais":"Gabarito divulgado em fonte secundária"):outside?"Gabarito comentado de fonte secundária":pre?"Gabarito preliminar do Inep":"Gabarito definitivo";
 const summary=q.comentario_resumido?'<div class="feedback"><b>Explicação resumida do Atlas Med</b><p>'+safe(q.comentario_resumido)+'</p><p class="muted">Síntese editorial original baseada em fontes identificadas; não é transcrição de correções externas.</p></div>':"";
 const feedback=graded?(answered?'<div class="feedback"><b>'+(p.answer===q.gabarito?"✓ Acertou":"✕ Errou")+'</b><p>Você marcou '+safe(p.answer)+'. '+safe(answerLabel)+': <b>'+safe(q.gabarito)+'</b>.</p>'+(pre?'<p><b>Atenção:</b> resultado sujeito a recurso e alteração até publicação do gabarito definitivo.</p>':'')+'<a href="'+safe(validURL(q.gabarito_url))+'" target="_blank" rel="noopener noreferrer">Consultar a fonte do gabarito ↗</a></div>'+summary+'<button id="pdf-retry">Responder novamente</button>':'<div class="'+(withOptions?"answer-list":"answer-grid")+'">'+buttons+'</div><button id="pdf-submit" disabled>Corrigir resposta</button>'):'<div class="feedback"><b>'+safe(q.gabarito==="ANULADA"?"Questão anulada":"Questão excluída")+'</b><p>Ela não participa das estatísticas de acertos.</p></div>';
 const instruction=(isUSP||isUNESP)&&!withOptions?'<p class="muted"><b>Alternativas A–D:</b> leia as opções no PDF à esquerda e depois marque a letra abaixo. A página inicial é estimada; procure o número da questão dentro do PDF se necessário.</p>':"";
 const sourceWarning=isUSP?(q.ano===2026?'<p class="muted"><b>USP 2026:</b> gabarito da Fuvest retificado em 15/12/2025; as questões 54 e 120 foram anuladas.</p>':'<p class="muted"><b>USP 2025:</b> respostas conferidas no gabarito A1 da Fuvest, publicado em 01/12/2024.</p>')+(q.status_classificacao==="Classificação individual pendente"?'<p class="muted"><b>Módulo a revisar:</b> o assunto específico desta questão ainda não foi conferido; não foi atribuído por suposição.</p>':''):isUNESP?(q.ano===2026?'<p class="muted"><b>Fonte do gabarito:</b> MedCalcApp; falta validação direta na área restrita da Vunesp.</p>':'<p class="muted"><b>Gabarito corrigido após recursos:</b> quatro anulações e seis mudanças de letra já incorporadas.</p>'):"";
 const question=q.enunciado_parafraseado?'<div class="reader-reworded"><span class="tag">Redação editorial da questão real</span><p>'+safe(q.enunciado_parafraseado)+'</p></div><p class="muted">A redação foi adaptada. Para conferir o enunciado original, as imagens e as tabelas, consulte a fonte ao lado.</p>':'<p>'+safe(q.resumo)+'</p>';
 const note=isUSP?"Caderno oficial da Fuvest. A localização inicial da questão no PDF é aproximada; procure o número da pergunta. Gabarito da banca é utilizado na correção; variantes A2/AD2 e A3/AD3 não estão duplicadas neste banco.":isUNESP?"Caderno real de acesso direto da UNESP. A página indicada é aproximada até revisão específica; utilize a busca do PDF para encontrar QUESTÃO "+String(q.numero).padStart(2,"0")+". As alternativas aparecem integralmente no documento. Em 2025, anuladas e retificações oficiais estão consideradas; em 2026, o gabarito ainda depende de conferência diretamente na Vunesp.":outside?"Arquivo NIEPAEM disponibilizado por terceiros no Scribd; o acesso pode exigir login e impedir a incorporação. Use Abrir em outra aba para consultar a prova ou o gabarito comentado.":selected.id==="strategy"?"PDF comentado indicado no portal do Estratégia MED. A exibição depende das permissões do servidor; esta versão ainda não pôde ser auditada integralmente pelo Atlas Med.":selected.id==="verified"?"Correção comentada publicada pelo OsceLabs, com gabarito preliminar. Os comentários exibidos no painel foram escritos separadamente.":"Caderno oficial de prova. A correção de cursinhos não substitui o gabarito do Inep.";
 $("quiz-body").innerHTML='<div class="reader-layout"><div class="reader-pdf"><div class="reader-links"><b>'+safe(q.instituicao)+' '+safe(q.ano)+' · '+safe(q.caderno)+' · Questão '+safe(q.numero)+'</b><a href="'+safe(viewLink)+'" target="_blank" rel="noopener noreferrer">Abrir PDF em outra aba ↗</a></div><div class="reader-tabs">'+controls+'</div><iframe src="'+safe(viewLink)+'" title="Documento de '+safe(selected.name)+'" loading="lazy" referrerpolicy="no-referrer"></iframe><p class="muted">'+safe(note)+'</p>'+(selected.id==="official"&&mirror!=="#"?'<a href="'+safe(mirror)+'#page='+safe(q.pagina)+'" target="_blank" rel="noopener noreferrer">Espelho do caderno caso o Inep não carregue ↗</a>':'')+'</div><div class="reader-answer"><div><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span>'+(pre?'<span class="tag" style="background:#fff2cc;color:#805300">Gabarito preliminar</span>':'')+'</div><h2>'+safe(q.tema)+'</h2>'+question+instruction+sourceWarning+(pre?'<p class="muted">Resposta baseada no gabarito de setembro de 2026, sujeito a alterações.</p>':'')+feedback+'</div></div>';
}
function openQuiz(id){$("quiz").classList.remove("pdf-dialog");pdfActive=null;active=questions.find(q=>q.id===id);if(!active)return;choice=progress[id]?.answer||"";drawQuiz();$("quiz").showModal();}
function drawQuiz(){let q=active,p=progress[q.id]||{},answered=Boolean(p.answer);$("quiz-body").innerHTML='<span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><h2>'+safe(q.tema)+'</h2><p>'+safe(q.enunciado)+'</p>'+q.alternativas.map((a,i)=>{let l="ABCDE"[i],cls=answered?(l===q.gabarito?"correct":l===p.answer?"wrong":""):choice===l?"chosen":"";return '<button class="choice '+cls+'" data-choice="'+l+'" '+(answered?"disabled":"")+'> <b>'+l+'.</b> '+safe(a)+'</button>'}).join("")+(answered?'<div class="feedback"><b>Gabarito: '+safe(q.gabarito)+'</b><p>'+safe(q.comentario||"Confira a fonte oficial.")+'</p></div>':"")+'<div class="quiz-actions">'+(answered?'<button id="retry">Responder novamente</button>':'<button id="submit" '+(!choice||!q.gabarito||q.gabarito==="ANULADA"?"disabled":"")+'>Confirmar resposta</button>')+(q.fonte_url?'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Fonte original ↗</a>':"")+'</div>';}
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
document.addEventListener("click",e=>{let btn=e.target.closest("button");if(!btn)return;if(btn.dataset.view)switchView(btn.dataset.view);if(btn.hasAttribute("data-module")){mod=btn.dataset.module;$("topic").value="";render()}if(btn.dataset.open)openQuiz(btn.dataset.open);if(btn.dataset.pdfOpen)openPdf(btn.dataset.pdfOpen);if(btn.dataset.commentOpen)openComment(btn.dataset.commentOpen);if(btn.id==="forget-private-pdf"&&commentActive&&window.NIEPAEMPdf&&confirm("Apagar a cópia do caderno armazenada neste navegador?"))window.NIEPAEMPdf.forget(commentActive.semestre).catch(()=>{});if(btn.dataset.commentChoice&&commentActive&&commentActive.modo_resolucao==="pdf-local"&&!progress[commentActive.id]?.answer){commentChoice=btn.dataset.commentChoice;document.querySelectorAll("[data-comment-choice]").forEach(x=>x.classList.toggle("chosen",x.dataset.commentChoice===commentChoice));const submit=$("comment-submit");if(submit)submit.disabled=false;}if(btn.id==="comment-submit"&&commentActive&&commentChoice&&commentActive.modo_resolucao==="pdf-local"){progress[commentActive.id]={...(progress[commentActive.id]||{}),answer:commentChoice};save();renderComment(commentActive);render();}if(btn.id==="comment-retry"&&commentActive){delete progress[commentActive.id]?.answer;save();commentChoice="";renderComment(commentActive);render();}if(btn.dataset.commentNavigate&&commentActive){const list=currentIndex().filter(q=>q.modo_resolucao==="pdf-local"&&q.semestre===commentActive.semestre),at=list.findIndex(q=>q.id===commentActive.id),next=list[at+Number(btn.dataset.commentNavigate)];if(next){commentActive=next;commentChoice="";renderComment(next);}}if(btn.dataset.readerSource&&pdfActive){readerSource=btn.dataset.readerSource;drawPdf();}if(btn.dataset.pdfStar){let id=btn.dataset.pdfStar;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.pdfChoice&&pdfActive&&!progress[pdfActive.id]?.answer){pdfChoice=btn.dataset.pdfChoice;document.querySelectorAll("[data-pdf-choice]").forEach(x=>x.classList.toggle("chosen",x.dataset.pdfChoice===pdfChoice));let submit=$("pdf-submit");if(submit)submit.disabled=false;}if(btn.id==="pdf-submit"&&pdfActive&&pdfChoice&&scoreable(pdfActive)){progress[pdfActive.id]={...(progress[pdfActive.id]||{}),answer:pdfChoice};save();drawPdf();render()}if(btn.id==="pdf-retry"&&pdfActive){delete progress[pdfActive.id]?.answer;save();pdfChoice="";drawPdf();render()}if(btn.dataset.star){let id=btn.dataset.star;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.choice&&active&&!progress[active.id]?.answer){choice=btn.dataset.choice;drawQuiz()}if(btn.id==="submit"&&choice&&active){progress[active.id]={...(progress[active.id]||{}),answer:choice};save();drawQuiz();render()}if(btn.id==="retry"&&active){delete progress[active.id]?.answer;save();choice="";drawQuiz();render()}if(btn.id==="close-quiz"||btn.id==="close-quiz-top")$("quiz").close();if(btn.id==="clear"){mod="";$("semester").value="";$("bank").value="";$("start").value="2017";$("end").value="2026";$("search").value="";$("status").value="";$("topic").value="";render()}if(btn.id==="reset-progress"&&confirm("Apagar todas as respostas e favoritos neste navegador?")){progress={};save();render()}});
["bank","start","end","semester","topic","status","search"].forEach(id=>$(id).addEventListener("input",()=>{renderIndex();renderQuestions()}));
["source-bank","source-year"].forEach(id=>$(id).addEventListener("change",renderSources));
$("module-search").addEventListener("input",modules);
async function load(){bootFilters();try{let responses=await Promise.all([fetch("data/questoes.json"),fetch("data/provas.json"),fetch("data/indices.json"),fetch("data/niepaem-2026-1.json"),fetch("data/niepaem-2026-2.json")]);if(responses.some(r=>!r.ok))throw Error("Não foi possível carregar o acervo.");let data=await Promise.all(responses.map(r=>r.json()));[questions,sources,indices]=data.slice(0,3);indices=[...indices,...data[3],...data[4]];if(!Array.isArray(questions)||!Array.isArray(sources)||!Array.isArray(indices))throw Error("O acervo deve conter listas JSON.");questions=questions.filter(q=>q.id&&q.modulo&&q.enunciado&&Array.isArray(q.alternativas));}catch(e){console.error(e);$("questions").innerHTML='<p class="empty">Falha ao carregar o banco. Publique em servidor HTTP e confira os arquivos de dados.</p>';return;}render();}
load();
