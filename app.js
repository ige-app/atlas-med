"use strict";
const $=id=>document.getElementById(id);
const BANKS=["ENAMED","ENARE","USP","UNESP","NIEPAEM","UNIFESP"];
const MODULES=["Ginecologia","Obstetrícia","Oftalmologia","Cardiologia","Neurologia","Pediatria","Neonatologia","Cirurgia Geral","Clínica Médica","Pneumologia","Nefrologia","Endocrinologia","Gastroenterologia","Hematologia","Infectologia","Reumatologia","Dermatologia","Psiquiatria","Ortopedia","Urologia","Otorrinolaringologia","Medicina de Família e Comunidade","Saúde Coletiva","Emergências","Outros"];
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validURL=u=>{try{let a=new URL(u);return a.protocol==="https:"?a.href:"#"}catch{return"#"}};
let questions=[],sources=[],indices=[],mod="",active=null,choice="",pdfActive=null,pdfChoice="",progress={};
function scoreable(q){return /^[A-E]$/.test(q.gabarito||"")}
try{progress=JSON.parse(localStorage.getItem("atlas-med-progress")||"{}")||{}}catch{progress={}}
const save=()=>{try{localStorage.setItem("atlas-med-progress",JSON.stringify(progress))}catch{}};
const select=(id,values,keep=true)=>{let x=$(id),old=keep?x.value:"";x.innerHTML=(id==="start"||id==="end"?"":"<option value=''>Todos</option>")+values.map(v=>'<option value="'+safe(v)+'">'+safe(v)+'</option>').join("");if(values.map(String).includes(old))x.value=old};
function bootFilters(){select("bank",BANKS);select("source-bank",BANKS);select("source-year",Array.from({length:10},(_,i)=>2017+i));for(const id of ["start","end"])select(id,Array.from({length:10},(_,i)=>2017+i));$("start").value="2017";$("end").value="2026"}
function currentIndex(){
  const bank=$("bank").value,start=+ $("start").value,end=+ $("end").value,topic=$("topic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;
  return indices.filter(q=>{
    const p=progress[q.id]||{};
    if(mod&&q.modulo!==mod||bank&&q.instituicao!==bank||q.ano<start||q.ano>end||topic&&q.tema!==topic)return false;
    if(search&&![q.resumo,q.tema,q.subtema,q.modulo].join(" ").toLocaleLowerCase("pt-BR").includes(search))return false;
    if(status==="pending"&&(!scoreable(q)||p.answer))return false;
    if(status==="wrong"&&(!p.answer||p.answer===q.gabarito))return false;
    if(status==="starred"&&!p.starred)return false;
    return true;
  }).sort((a,b)=>b.ano-a.ano||a.instituicao.localeCompare(b.instituicao)||a.numero-b.numero);
}
function current(){let bank=$("bank").value,start=+$("start").value,end=+$("end").value,topic=$("topic").value,search=$("search").value.trim().toLocaleLowerCase("pt-BR"),status=$("status").value;return questions.filter(q=>(!mod||q.modulo===mod)&&(!bank||q.instituicao===bank)&&q.ano>=start&&q.ano<=end&&(!topic||q.tema===topic)&&(!search||[q.enunciado,q.tema,q.subtema,q.modulo].join(" ").toLocaleLowerCase("pt-BR").includes(search))&&(!status||(status==="pending"?!progress[q.id]?.answer:status==="wrong"?progress[q.id]?.answer&&progress[q.id].answer!==q.gabarito:progress[q.id]?.starred)));}
function modules(){let s=$("module-search").value.toLocaleLowerCase("pt-BR");$("modules").innerHTML='<button class="module-btn '+(!mod?"selected":"")+'" data-module="">Todos os módulos</button>'+MODULES.filter(m=>m.toLocaleLowerCase("pt-BR").includes(s)).map(m=>'<button class="module-btn '+(mod===m?"selected":"")+'" data-module="'+safe(m)+'">'+safe(m)+' ('+(questions.filter(q=>q.modulo===m).length+indices.filter(q=>q.modulo===m).length)+')</button>').join("");}
function topics(){let prev=$("topic").value;let set=[...new Set([...questions,...indices].filter(q=>!mod||q.modulo===mod).map(q=>q.tema).filter(Boolean))].sort();select("topic",set,false);if(set.includes(prev))$("topic").value=prev;}
function metrics(){
  const attempts=[...questions,...indices].filter(q=>scoreable(q)&&progress[q.id]?.answer);
  $("count").textContent=questions.length;
  $("indexed-count").textContent=indices.length;
  $("sources-count").textContent=sources.length;
  $("solved-count").textContent=attempts.length;
}
function renderIndex(){
  const items=currentIndex(),root=$("indexed");
  root.innerHTML=items.length?items.map(q=>{
    const p=progress[q.id]||{},hasReader=q.modo_resolucao==="pdf",graded=scoreable(q),answered=Boolean(p.answer);
    const state=graded?(answered?(p.answer===q.gabarito?"✓ Acertou":"✕ Errou"):"Não resolvida"):(q.gabarito==="ANULADA"?"Anulada":"Excluída da pontuação");
    const controls=hasReader?'<button data-pdf-open="'+safe(q.id)+'">'+(graded?"Abrir e responder":"Consultar sem pontuação")+'</button> <button data-pdf-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button>':'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Abrir no caderno original ↗</a>';
    return '<article class="question index"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span><span class="tag">'+safe(state)+'</span></div><h3>'+safe(q.tema)+'</h3><p><b>'+safe(q.subtema)+'</b> · '+safe(q.resumo)+'</p><p class="muted">'+safe(q.caderno)+' · Página '+safe(q.pagina)+' do PDF</p><div class="quiz-actions">'+controls+'</div></article>';
  }).join(""):'<div class="empty">Nenhuma questão classificada corresponde a este filtro. Consulte o acervo de provas para acessar as edições ainda não indexadas.</div>';
}
function renderQuestions(){let list=current();$("selection").textContent=currentIndex().length+" questão(ões) oficiais classificadas"+(mod?" em "+mod:"")+".";const root=$("questions");root.previousElementSibling.classList.toggle("hidden",!list.length);root.innerHTML=list.length?list.map(q=>{let p=progress[q.id]||{};return '<article class="question"><div><span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><span class="tag">'+safe(q.tema)+'</span></div><h3>'+safe(q.enunciado).slice(0,185)+(q.enunciado.length>185?"…":"")+'</h3><p class="muted">'+(q.numero?"Questão "+safe(q.numero)+" · ":"")+(p.answer?"Respondida: "+safe(p.answer):"Não resolvida")+'</p><button data-open="'+safe(q.id)+'">Resolver questão</button> <button data-star="'+safe(q.id)+'">'+(p.starred?"★ Favorita":"☆ Favoritar")+'</button></article>'}).join(""):'<div class="empty"><h3>Ainda não há questões reproduzidas para resolver aqui</h3><p>As questões já identificadas por tema estão acima, com acesso ao caderno oficial. A resolução integrada depende de gabarito conferido e autorização de reprodução.</p></div>';}
function renderSources(){let bank=$("source-bank").value,year=$("source-year").value;let list=sources.filter(s=>(!bank||s.instituicao===bank)&&(!year||String(s.ano)===year));$("sources").innerHTML=list.length?list.map(s=>'<article class="source"><div><span class="tag">'+safe(s.instituicao)+'</span><span class="tag">'+safe(s.ano??"acervo geral")+'</span></div><h3>'+safe(s.titulo)+'</h3><p>'+safe(s.observacao)+'</p><p class="muted">Status: '+safe(s.status||"referência catalogada")+'.</p><a href="'+safe(validURL(s.url))+'" target="_blank" rel="noopener noreferrer">Abrir portal de origem ↗</a></article>').join(""):'<div class="empty">Nenhuma fonte cadastrada neste filtro. Isso não significa que a prova não exista.</div>';}
function renderPerformance(){
  const attempted=[...questions,...indices].filter(q=>scoreable(q)&&progress[q.id]?.answer);
  const correct=attempted.filter(q=>progress[q.id].answer===q.gabarito).length,errors=attempted.length-correct;
  const byModule=MODULES.map(m=>({m,q:attempted.filter(q=>q.modulo===m)})).filter(x=>x.q.length);
  $("performance").innerHTML='<h3>Resumo</h3><p>Resolvidas: <b>'+attempted.length+'</b> · Acertos: <b>'+correct+'</b> · Erros: <b>'+errors+'</b> · Aproveitamento: <b>'+(attempted.length?Math.round(correct/attempted.length*100)+"%":"—")+'</b></p><p class="muted">Questões anuladas e excluídas não entram nas estatísticas. Seu desempenho fica salvo apenas neste navegador.</p><h3>Por módulo</h3>'+(byModule.length?byModule.map(({m,q})=>'<p>'+safe(m)+': '+q.filter(x=>progress[x.id].answer===x.gabarito).length+'/'+q.length+' corretas</p>').join(""):'<p class="muted">Ainda não há respostas registradas.</p>');
}
function render(){modules();topics();metrics();renderIndex();renderQuestions();renderSources();renderPerformance();}
function openPdf(id){
  pdfActive=indices.find(q=>q.id===id&&q.modo_resolucao==="pdf");
  if(!pdfActive)return;
  pdfChoice="";
  $("quiz").classList.add("pdf-dialog");
  drawPdf();
  $("quiz").showModal();
}
function drawPdf(){
  const q=pdfActive,p=progress[q.id]||{},graded=scoreable(q),answered=Boolean(p.answer),n=q.alternativas_quantidade||4;
  const url=validURL(q.pdf_url || q.fonte_url),pdfPage=url+"#page="+encodeURIComponent(q.pagina)+"&zoom=110";
  const reworded=Boolean(q.enunciado_parafraseado&&Array.isArray(q.alternativas_parafraseadas)&&q.alternativas_parafraseadas.length===n);
  const buttons=Array.from({length:n},(_,i)=>{
    const letter="ABCDE"[i],state=answered?(letter===q.gabarito?"correct":letter===p.answer?"wrong":""):(pdfChoice===letter?"chosen":"");
    const option=reworded?'<span>'+safe(q.alternativas_parafraseadas[i])+'</span>':"";
    return '<button class="choice answer-letter '+state+'" data-pdf-choice="'+letter+'" '+(answered?'disabled':'')+'><b>'+letter+'</b>'+option+'</button>';
  }).join("");
  const question=reworded?'<div class="reader-reworded"><span class="tag">Redação resumida baseada na questão real</span><p>'+safe(q.enunciado_parafraseado)+'</p></div><p class="muted">Os detalhes completos estão no PDF oficial à esquerda.</p>':'<p>'+safe(q.resumo)+'</p><p>Leia o enunciado e as alternativas no <b>caderno oficial à esquerda</b>. Depois, escolha a letra da sua resposta.</p>';
  const answer=graded?'<div class="'+(reworded?"answer-list":"answer-grid")+'">'+buttons+'</div>'+(answered?'<div class="feedback"><b>'+(p.answer===q.gabarito?"✓ Resposta correta":"✕ Resposta incorreta")+'</b><p>Você marcou '+safe(p.answer)+'. Gabarito definitivo: <b>'+safe(q.gabarito)+'</b>.</p><a href="'+safe(validURL(q.gabarito_url))+'" target="_blank" rel="noopener noreferrer">Conferir gabarito oficial ↗</a></div><button id="pdf-retry">Responder novamente</button>':'<button id="pdf-submit" disabled>Corrigir resposta</button>'):'<div class="feedback"><b>'+safe(q.gabarito==="ANULADA"?"Questão anulada":"Questão excluída")+'</b><p>Ela não será contabilizada nas estatísticas de acerto.</p><a href="'+safe(validURL(q.gabarito_url))+'" target="_blank" rel="noopener noreferrer">Consultar gabarito definitivo ↗</a></div>';
  $("quiz-body").innerHTML='<div class="reader-layout"><div class="reader-pdf"><div class="reader-links"><b>'+safe(q.instituicao)+' '+safe(q.ano)+' · '+safe(q.caderno)+' · Pág. '+safe(q.pagina)+'</b><a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Abrir PDF em outra aba ↗</a></div><iframe src="'+safe(pdfPage)+'" title="Caderno oficial na página da questão '+safe(q.numero)+'" loading="lazy"></iframe><p class="muted">Se o PDF não carregar aqui, abra-o em outra aba.</p></div><div class="reader-answer"><div><span class="tag">'+safe(q.modulo)+'</span><span class="tag">Questão '+safe(q.numero)+'</span></div><h2>'+safe(q.tema)+'</h2>'+question+answer+'</div></div>';
}
function openQuiz(id){$("quiz").classList.remove("pdf-dialog");pdfActive=null;active=questions.find(q=>q.id===id);if(!active)return;choice=progress[id]?.answer||"";drawQuiz();$("quiz").showModal();}
function drawQuiz(){let q=active,p=progress[q.id]||{},answered=Boolean(p.answer);$("quiz-body").innerHTML='<span class="tag">'+safe(q.instituicao)+' · '+safe(q.ano)+'</span><span class="tag">'+safe(q.modulo)+'</span><h2>'+safe(q.tema)+'</h2><p>'+safe(q.enunciado)+'</p>'+q.alternativas.map((a,i)=>{let l="ABCDE"[i],cls=answered?(l===q.gabarito?"correct":l===p.answer?"wrong":""):choice===l?"chosen":"";return '<button class="choice '+cls+'" data-choice="'+l+'" '+(answered?"disabled":"")+'> <b>'+l+'.</b> '+safe(a)+'</button>'}).join("")+(answered?'<div class="feedback"><b>Gabarito: '+safe(q.gabarito)+'</b><p>'+safe(q.comentario||"Confira a fonte oficial.")+'</p></div>':"")+'<div class="quiz-actions">'+(answered?'<button id="retry">Responder novamente</button>':'<button id="submit" '+(!choice||!q.gabarito||q.gabarito==="ANULADA"?"disabled":"")+'>Confirmar resposta</button>')+(q.fonte_url?'<a href="'+safe(validURL(q.fonte_url))+'" target="_blank" rel="noopener noreferrer">Fonte original ↗</a>':"")+'</div>';}
function switchView(v){document.querySelectorAll(".view").forEach(e=>e.classList.toggle("hidden",e.id!=="view-"+v));document.querySelectorAll("[data-view]").forEach(e=>e.classList.toggle("active",e.dataset.view===v));}
document.addEventListener("click",e=>{let btn=e.target.closest("button");if(!btn)return;if(btn.dataset.view)switchView(btn.dataset.view);if(btn.hasAttribute("data-module")){mod=btn.dataset.module;$("topic").value="";render()}if(btn.dataset.open)openQuiz(btn.dataset.open);if(btn.dataset.pdfOpen)openPdf(btn.dataset.pdfOpen);if(btn.dataset.pdfStar){let id=btn.dataset.pdfStar;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.pdfChoice&&pdfActive&&!progress[pdfActive.id]?.answer){pdfChoice=btn.dataset.pdfChoice;document.querySelectorAll("[data-pdf-choice]").forEach(x=>x.classList.toggle("chosen",x.dataset.pdfChoice===pdfChoice));let submit=$("pdf-submit");if(submit)submit.disabled=false;}if(btn.id==="pdf-submit"&&pdfActive&&pdfChoice&&scoreable(pdfActive)){progress[pdfActive.id]={...(progress[pdfActive.id]||{}),answer:pdfChoice};save();drawPdf();render()}if(btn.id==="pdf-retry"&&pdfActive){delete progress[pdfActive.id]?.answer;save();pdfChoice="";drawPdf();render()}if(btn.dataset.star){let id=btn.dataset.star;progress[id]={...(progress[id]||{}),starred:!progress[id]?.starred};save();render()}if(btn.dataset.choice&&active&&!progress[active.id]?.answer){choice=btn.dataset.choice;drawQuiz()}if(btn.id==="submit"&&choice&&active){progress[active.id]={...(progress[active.id]||{}),answer:choice};save();drawQuiz();render()}if(btn.id==="retry"&&active){delete progress[active.id]?.answer;save();choice="";drawQuiz();render()}if(btn.id==="close-quiz")$("quiz").close();if(btn.id==="clear"){mod="";$("bank").value="";$("start").value="2017";$("end").value="2026";$("search").value="";$("status").value="";$("topic").value="";render()}if(btn.id==="reset-progress"&&confirm("Apagar todas as respostas e favoritos neste navegador?")){progress={};save();render()}});
["bank","start","end","topic","status","search"].forEach(id=>$(id).addEventListener("input",()=>{renderIndex();renderQuestions()}));
["source-bank","source-year"].forEach(id=>$(id).addEventListener("change",renderSources));
$("module-search").addEventListener("input",modules);
async function load(){bootFilters();try{let responses=await Promise.all([fetch("data/questoes.json"),fetch("data/provas.json"),fetch("data/indices.json")]);if(responses.some(r=>!r.ok))throw Error("Não foi possível carregar o acervo.");[questions,sources,indices]=await Promise.all(responses.map(r=>r.json()));if(!Array.isArray(questions)||!Array.isArray(sources)||!Array.isArray(indices))throw Error("O acervo deve conter listas JSON.");questions=questions.filter(q=>q.id&&q.modulo&&q.enunciado&&Array.isArray(q.alternativas));}catch(e){console.error(e);$("questions").innerHTML='<p class="empty">Falha ao carregar o banco. Publique em servidor HTTP e confira os arquivos de dados.</p>';return;}render();}
load();
