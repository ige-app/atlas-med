import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = path => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const questions = read("data/questoes.json");
const indices = read("data/indices.json");
const sources = read("data/provas.json");
const banks = new Set(["USP", "UNESP", "UNIFESP", "ENAMED", "ENARE", "NIEPAEM"]);
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
  if (!["A", "B", "C", "D", "E", "ANULADA", "EXCLUIDA"].includes(q.gabarito)) fail("índice: gabarito inválido em " + q.id);
  if (!/^https:\/\//.test(q.gabarito_url || "")) fail("índice: fonte do gabarito inválida em " + q.id);
  if (q.modo_resolucao === "pdf" && (!/^https:\/\//.test(q.pdf_url || "") || ![4, 5].includes(q.alternativas_quantidade))) fail("índice: visualização PDF incompleta em " + q.id);
  if (q.conteudo_reproduzido !== false) fail("índice: texto não autorizado marcado como reproduzido em " + q.id);
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

for (const s of sources) {
  if (!banks.has(s.instituicao)) fail("fonte: banca inválida em " + s.id);
  if (!s.titulo || !/^https:\/\//.test(s.url || "")) fail("fonte: URL/título inválido em " + s.id);
}
if (errors.length) {
  console.error("Falha na validação do Atlas Med:\n" + errors.map(x => "• " + x).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Dados válidos:", sources.length, "fontes,", indices.length, "questões indexadas,", questions.length, "questões com texto autorizado.");
}
