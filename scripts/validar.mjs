import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = path => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const questions = read("data/questoes.json");
const indices = read("data/indices.json");
const sources = read("data/provas.json");
const niepaem1 = read("data/niepaem-2026-1.json");
const niepaem2 = read("data/niepaem-2026-2.json");
const unifesp2025 = read("data/unifesp-2025.json");
const unifesp2026 = read("data/unifesp-2026.json");
const banks = new Set(["USP", "UNESP", "UNIFESP", "ENAMED", "NIEPAEM"]);
const errors = [];
const fail = msg => errors.push(msg);
const unique = (list, field, name) => {
  const ids = list.map(x => x[field]);
  if (ids.some(x => !x)) fail(name + ": existe registro sem " + field);
  if (new Set(ids).size !== ids.length) fail(name + ": " + field + " duplicado");
};
for (const [name, list] of [["questoes", questions], ["indices", indices], ["fontes", sources]]) {
  if (!Array.isArray(list)) fail(name + " deve ser uma lista");
  else unique(list, "id", name);
}
function validateMetadata(x, name) {
  if (!banks.has(x.instituicao)) fail(name + ": banca inválida em " + x.id);
  if (!x.modulo || !x.tema) fail(name + ": módulo/tema ausente em " + x.id);
  if (!Number.isInteger(x.ano) || x.ano < 2017 || x.ano > 2026) fail(name + ": ano fora da janela em " + x.id);
}
for (const q of indices) {
  validateMetadata(q, "índice");
  if (!Number.isInteger(q.numero) || q.numero < 1) fail("índice: número inválido em " + q.id);
  if (!Number.isInteger(q.pagina) || q.pagina < 1) fail("índice: página inválida em " + q.id);
  if (!q.resumo || !q.subtema) fail("índice: classificação incompleta em " + q.id);
  if (!/^https:\/\//.test(q.fonte_url || "")) fail("índice: fonte URL inválida em " + q.id);
  if (!["A", "B", "C", "D", "E", "ANULADA", "EXCLUIDA"].includes(q.gabarito) && !(q.instituicao === "NIEPAEM" && q.gabarito === "PENDENTE" && q.modo_resolucao === "link")) fail("índice: gabarito inválido em " + q.id);
  if (q.gabarito !== "PENDENTE" && !/^https:\/\//.test(q.gabarito_url || "")) fail("índice: fonte do gabarito inválida em " + q.id);
  if (q.modo_resolucao === "pdf" && (!/^https:\/\//.test(q.pdf_url || "") || ![4, 5].includes(q.alternativas_quantidade))) fail("índice: visualização PDF incompleta em " + q.id);
  if (q.conteudo_reproduzido !== false) fail("índice: texto não autorizado marcado como reproduzido em " + q.id);
  if (q.instituicao==="NIEPAEM" && q.gabarito==="PENDENTE" && q.modo_resolucao!=="link") fail("NIEPAEM pendente não pode ser pontuável: "+q.id);
}
for (const q of questions) {
  validateMetadata(q, "questão");
  if (!q.enunciado || !Array.isArray(q.alternativas) || q.alternativas.length < 2) fail("questão: alternativas incompletas em " + q.id);
  if (!["A", "B", "C", "D", "E", "ANULADA"].includes(q.gabarito)) fail("questão: gabarito inválido em " + q.id);
  if (!q.fonte_url) fail("questão: falta fonte em " + q.id);
  if (q.reproducao_autorizada !== true) fail("questão: publicação integral sem autorização documentada em " + q.id);
}

const enamed2025=indices.filter(q=>q.instituicao==="ENAMED"&&q.ano===2025&&q.caderno==="Caderno 01");
const indexedNumbers=enamed2025.map(q=>q.numero).sort((a,b)=>a-b);
if(enamed2025.length!==100 || indexedNumbers.some((n,i)=>n!==i+1)) fail("ENAMED 2025: devem existir 100 números distintos de 1 a 100");
const scored=enamed2025.filter(q=>/^[A-D]$/.test(q.gabarito)).length;
const invalid=enamed2025.filter(q=>["ANULADA","EXCLUIDA"].includes(q.gabarito)).length;
if(scored!==90 || invalid!==10) fail("ENAMED 2025: esperado 90 válidas e 10 anuladas/excluídas");
for(const q of enamed2025){
  if(typeof q.enunciado_parafraseado!=="string"||q.enunciado_parafraseado.length<60) fail("ENAMED 2025: falta enunciado editorial em "+q.id);
  if(!Array.isArray(q.alternativas_parafraseadas)||q.alternativas_parafraseadas.length!==4||q.alternativas_parafraseadas.some(a=>typeof a!=="string"||a.trim().length<2))fail("ENAMED 2025: faltam quatro alternativas editoriais em "+q.id);
  if(q.modo_resolucao!=="pdf"||q.conteudo_reproduzido!==false)fail("ENAMED 2025: formato/editorial incorreto em "+q.id);
}


const enamed2026=indices.filter(q=>q.instituicao==="ENAMED"&&q.ano===2026&&q.caderno==="Caderno 01");
const numbers2026=enamed2026.map(q=>q.numero).sort((a,b)=>a-b);
if(enamed2026.length!==100||numbers2026.some((n,i)=>n!==i+1))fail("ENAMED 2026: devem existir as 100 questões de 1 a 100");
for(const q of enamed2026){
 if(q.modo_resolucao!=="pdf")fail("ENAMED 2026: PDF ausente "+q.id);
 if(!q.gabarito_status?.includes("PRELIMINAR"))fail("ENAMED 2026: gabarito sem alerta provisório "+q.id);
 if(!q.enunciado_parafraseado || !q.comentario_resumido || q.alternativas_parafraseadas?.length!==4)fail("ENAMED 2026: texto, alternativas ou comentário ausentes "+q.id);
 if(!q.resolucao_pdf_url || !q.resolucao_verificada_url)fail("ENAMED 2026: PDF de correção ausente "+q.id);
}


// As duas provas de acesso direto da UNESP têm 100 itens. O gabarito de 2025 já
// inclui as retificações da FMB publicadas em 06/12/2024.
for(const year of [2025,2026]){
  const rows=indices.filter(q=>q.instituicao==="UNESP"&&q.ano===year&&q.tipo==="Residência de acesso direto");
  const nums=rows.map(q=>q.numero).sort((a,b)=>a-b);
  if(rows.length!==100||nums.some((n,i)=>n!==i+1))fail("UNESP "+year+": esperado caderno de 100 questões sem lacunas");
  for(const q of rows){
    if(q.modo_resolucao!=="pdf"||q.alternativas_quantidade!==4||!q.pdf_url||!q.gabarito_url)fail("UNESP "+year+": falta modo de resposta PDF em "+q.id);
    if(q.conteudo_reproduzido!==false)fail("UNESP "+year+": não publicar transcrição sem licença "+q.id);
    if(q.pagina_estimativa!==true)fail("UNESP "+year+": marcar páginas aproximadas "+q.id);
  }
}
const u25=indices.filter(q=>q.instituicao==="UNESP"&&q.ano===2025&&q.tipo==="Residência de acesso direto");
if(u25.filter(q=>q.gabarito==="ANULADA").length!==4)fail("UNESP 2025: quatro anulações esperadas");
for(const n of [8,10,54,79])if(u25.find(q=>q.numero===n)?.gabarito!=="ANULADA")fail("UNESP 2025: questão anulada "+n);
for(const [n,g] of [[55,"A"],[56,"C"],[67,"B"],[70,"D"],[73,"C"],[75,"C"]]){
  if(u25.find(q=>q.numero===n)?.gabarito!==g)fail("UNESP 2025: alteração pós-recurso não aplicada, questão "+n);
}
const u26=indices.filter(q=>q.instituicao==="UNESP"&&q.ano===2026&&q.tipo==="Residência de acesso direto");
if(u26.some(q=>!/^[A-D]$/.test(q.gabarito)||!q.gabarito_status?.includes("FONTE SECUNDÁRIA")))fail("UNESP 2026: gabarito de fonte secundária precisa ser identificado");


for(const [year,code,expectedScorable] of [[2025,"A1",120],[2026,"AD1",118]]){
 const rows=indices.filter(q=>q.instituicao==="USP"&&q.ano===year&&q.caderno==="Áreas Básicas e Acesso Direto — "+code);
 const nums=rows.map(q=>q.numero).sort((a,b)=>a-b);
 if(rows.length!==120||nums.some((v,i)=>v!==i+1))fail("USP "+year+" "+code+": deve ter 120 números distintos 1–120");
 if(rows.filter(q=>/^[A-D]$/.test(q.gabarito)).length!==expectedScorable)fail("USP "+year+" "+code+": quantidade pontuável incorreta");
 for(const q of rows){
  if(q.tipo!=="Residência de acesso direto"||q.modo_resolucao!=="pdf"||q.alternativas_quantidade!==4)fail("USP "+year+": caderno ou modo inválido: "+q.id);
  if(!q.fonte_url||!q.pdf_url||!q.gabarito_url||!q.pdf_espelho_url)fail("USP "+year+": links insuficientes: "+q.id);
  if(q.conteudo_reproduzido!==false||q.pagina_estimativa!==true)fail("USP "+year+": aviso de origem e de página necessário: "+q.id);
  if(q.modulo==="Acesso direto — classificação pendente"&&q.status_classificacao!=="Classificação individual pendente")fail("USP "+year+": questão sem classificação não identificada: "+q.id);
 }
}
const ad1=indices.filter(q=>q.instituicao==="USP"&&q.ano===2026&&q.caderno==="Áreas Básicas e Acesso Direto — AD1");
if(ad1.filter(q=>q.gabarito==="ANULADA").map(q=>q.numero).join(",")!=="54,120")fail("USP 2026: anuladas do gabarito retificado devem ser 54 e 120");
for(const [n,letter] of [[109,"B"],[110,"C"],[114,"A"]]){
 if(ad1.find(q=>q.numero===n)?.gabarito!==letter)fail("USP 2026: retificação não aplicada na questão "+n);
}

const seen=new Set(indices.map(x=>x.id));

for(const [year,rows,annulled,scoreTotal] of [[2025,unifesp2025,[42,60],98],[2026,unifesp2026,[53,55,100],97]]){
 if(!Array.isArray(rows)||rows.length!==100)fail("UNIFESP "+year+": são necessárias 100 questões");
 const nums=rows.map(q=>q.numero).sort((a,b)=>a-b);
 if(nums.some((n,i)=>n!==i+1))fail("UNIFESP "+year+": numeração fora de 1–100");
 const marks=rows.filter(q=>q.gabarito==="ANULADA").map(q=>q.numero);
 if(marks.join(",")!==annulled.join(","))fail("UNIFESP "+year+": revisar questões sem pontuação");
 if(rows.filter(q=>/^[A-D]$/.test(q.gabarito)).length!==scoreTotal)fail("UNIFESP "+year+": total pontuável inconsistente");
 for(const q of rows){
  validateMetadata(q,"UNIFESP "+year);
  if(seen.has(q.id))fail("UNIFESP "+year+": ID duplicado em "+q.id);
  seen.add(q.id);
  if(q.instituicao!=="UNIFESP"||q.ano!==year||q.tipo!=="Residência de acesso direto"||q.modo_resolucao!=="pdf")fail("UNIFESP "+year+": modalidade errada em "+q.id);
  if(!q.pdf_url||!q.gabarito_url||q.alternativas_quantidade!==4||q.pagina_estimativa!==true)fail("UNIFESP "+year+": PDF/gabarito sem referência em "+q.id);
  if(q.conteudo_reproduzido!==false||!q.modulo||!q.tema||!q.resumo)fail("UNIFESP "+year+": metadados incompletos em "+q.id);
  if(!["A","B","C","D","ANULADA"].includes(q.gabarito))fail("UNIFESP "+year+": letra inválida em "+q.id);
 }
}
const double78=unifesp2025.find(q=>q.numero===78);
if(double78?.gabarito!=="D"||double78.gabaritos_aceitos?.join(",")!=="B,D")fail("UNIFESP 2025: dupla resposta da questão 78 não foi registrada");

for(const [sem,entries] of [[1,niepaem1],[2,niepaem2]]){
 if(!Array.isArray(entries)||entries.length!==120)fail("NIEPAEM 2026."+sem+": esperado 120 registros");
 const nums=entries.map(x=>x.numero).sort((a,b)=>a-b);
 if(nums.some((n,i)=>n!==i+1))fail("NIEPAEM 2026."+sem+": números incompletos ou duplicados");
 for(const q of entries){
   validateMetadata(q,"NIEPAEM 2026."+sem);
   if(seen.has(q.id))fail("ID duplicado no acervo completo: "+q.id);
   seen.add(q.id);
   if(q.semestre!==sem||q.edicao!=="NIEPAEM 2026."+sem)fail("Semestre incorreto "+q.id);
   if(!["GO","SC","CM","CIR","PED"].includes(q.categoria_origem))fail("Área original inválida "+q.id);
   if(!/^[A-D]$/.test(q.gabarito))fail("Gabarito inválido "+q.id);
   if(!q.tema||!q.modulo||!q.comentario_resumido||q.comentario_resumido.length<30)fail("Sem classificação ou comentário "+q.id);
   if(q.modo_resolucao!=="pdf-local"||q.resolucao_interativa_local!==true||q.enunciado_disponivel!==false||q.alternativas_disponiveis!==false)fail("Modo de prova PDF local inconsistente "+q.id);
   if(q.conteudo_reproduzido!==false||!q.comentario_pagina||!q.arquivo_origem||!Number.isInteger(q.pagina_prova)||!q.arquivo_prova)fail("Fonte do gabarito ou página do caderno não registrada "+q.id);
 }
}

for (const s of sources) {
  if (!banks.has(s.instituicao)) fail("fonte: banca inválida em " + s.id);
  if (!s.titulo || !/^https:\/\//.test(s.url || "")) fail("fonte: URL/título inválido em " + s.id);
}
const archivedUsp = read("data/usp-2023-2024.json");
for (const [year, annulled, multiple] of [
  [2023, [23, 35, 92], [60]],
  [2024, [55, 79, 110], [53, 56, 65, 68, 69]],
]) {
  const exam = archivedUsp[year];
  if (!exam?.caderno || !/^https:\/\//.test(exam.pdf_url) || !/^https:\/\//.test(exam.gabarito_url) ||
      exam.questoes?.length !== 120) {
    fail("USP " + year + ": esperado caderno completo com gabarito");
    continue;
  }
  const actualAnnulled = [];
  const actualMultiple = [];
  for (const [index, [page, key]] of exam.questoes.entries()) {
    if (!Number.isInteger(page) || page < 1 || (index && page < exam.questoes[index-1][0])) {
      fail("USP " + year + ": página inválida para questão " + (index+1));
    }
    if (key === "ANULADA") actualAnnulled.push(index+1);
    else if (/^[A-D]{2}$/.test(key) && key[0] !== key[1]) actualMultiple.push(index+1);
    else if (!/^[A-D]$/.test(key)) fail("USP " + year + ": gabarito inválido na questão " + (index+1));
  }
  if (String(actualAnnulled) !== String(annulled) || String(actualMultiple) !== String(multiple)) {
    fail("USP " + year + ": anulações ou duplas respostas divergentes");
  }
}
const classification = read("data/classificacao.json");
const catalog = [...indices, ...unifesp2025, ...unifesp2026];
const pendingClassification = new Set(catalog.filter(q => q.modulo === "Acesso direto — classificação pendente").map(q => q.id));
for (const [id, entry] of Object.entries(classification)) {
  if (!pendingClassification.delete(id)) fail("Classificação sem registro pendente: " + id);
  if (!Array.isArray(entry) || entry.length !== 3 || !entry[0]?.trim() || !entry[1]?.trim() ||
      !Number.isInteger(entry[2]) || entry[2] < 1) fail("Classificação inválida: " + id);
}
if (pendingClassification.size) fail("Questões sem classificação: " + [...pendingClassification].join(", "));
if (errors.length) {
  console.error("Falha na validação do Atlas Med:\n" + errors.map(x => "• " + x).join("\n"));
  process.exitCode = 1;
} else {
  const archiveCount = Object.values(archivedUsp).reduce((total, exam) => total + exam.questoes.length, 0);
  const legacyCount = indices.filter(q => q.instituicao === "USP" && q.ano === 2024).length;
  console.log("Dados válidos:", sources.length, "fontes,", seen.size + archiveCount - legacyCount, "questões indexadas,", questions.length, "questões com texto autorizado.");
}
