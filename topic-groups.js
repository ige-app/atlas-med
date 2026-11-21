"use strict";

// Match clinical concepts on the existing subject labels, keeping the original labels as subtopics.
const groupedTopics = [
 ["Ceratite", /\b(?:ceratites?|queratites?)\b/],
 ["Glaucoma", /\bglaucomas?\b/],
 ["Vias lacrimais", /obstrucao.*(?:via lacrimal|ducto nasolacrimal)/],
 ["Asma", /\basma\b|\basmatica\b/],
 ["DPOC", /\bdpoc\b|doenca pulmonar obstrutiva cronica/],
 ["Bronquiolite", /\bbronquiolite\b/],
 ["Pneumonia", /\bpneumoni[ae]s?\b|\bpneumonic[ao]\b/],
 ["Derrame pleural", /derrame pleural|empiema pleural/],
 ["Pneumotórax", /\bpneumotorax\b/],
 ["Hipertensão arterial pulmonar", /hipertensao arterial pulmonar/],
 ["Hipertensão na gestação", /pre-eclampsia|eclampsia|hipertensao na gestacao|anti-hipertensivos na gestacao/],
 ["Hipertensão arterial", /\bhipertensao\b|emergencia hipertensiva|afericao da pressao arterial|afericao de pressao arterial/],
 ["Insuficiência cardíaca", /insuficiencia cardiaca|congestao na insuficiencia/],
 ["Síndrome coronariana aguda", /sindrome coronariana|infarto agudo do miocardio/],
 ["Fibrilação e flutter atrial", /fibrilacao atrial|flutter atrial/],
 ["Estenose aórtica", /estenose aortica/],
 ["Diabetes na gestação", /diabetes (?:mellitus )?(?:gestacional|pre-gestacional)|controle glicemico na gestacao|diabetes.*(?:puerperio|pos-parto)|rastreamento pre-natal.*diabetes/],
 ["Diabetes mellitus", /\bdiabetes\b|cetoacidose diabetica|neuropatia diabetica/],
 ["Hipertireoidismo", /hipertireoidismo|hipertiroidismo|doenca de graves|crise tireotoxica/],
 ["Hipotireoidismo", /hipotireoidismo|hipotiroidismo/],
 ["Doença renal crônica", /doenca renal cronica|nefroprotecao/],
 ["Lesão renal aguda", /(?:lesao|injuria|insuficiencia) renal aguda/],
 ["Distúrbios do sódio", /hiponatremia|hipernatremia|hipernatremica/],
 ["Potássio", /hipocalemia|hiperpotassemia|hipercalemia|reposicao de potassio/],
 ["Síndrome nefrótica", /sindrome nefrotica/],
 ["Anemia ferropriva", /anemia ferropriva|deficiencia de ferro/],
 ["Doença falciforme", /falciforme|\bhbs\b/],
 ["Dengue", /\bdengue\b/],
 ["Tuberculose", /\btuberculose\b/],
 ["Infecção pelo HIV", /\bhiv\b|profilaxia pre-exposicao|profilaxia pos-exposicao/],
 ["Sífilis", /\bsifilis\b/],
 ["Infecção urinária", /infeccao urinaria|\bcistite\b|pielonefrite/],
 ["Hanseníase", /\bhanseniase\b|reacao hansenica/],
 ["Sepse", /\bsepse\b|choque septico/],
 ["Anafilaxia", /\banafilaxia\b|reacao anafilatica/],
 ["Traumatismo cranioencefálico", /traumatismo cranioencefalico|trauma craniano|\btce\b/],
 ["Acidente vascular cerebral", /acidente vascular cerebral|\bavc\b|deficit focal e suspeita/],
 ["Hemorragia subaracnóidea", /hemorragia subaracnoidea/],
 ["Doença de Parkinson", /\bparkinson\b|parkinsonismo/],
 ["Delirium", /\bdelirium\b/],
 ["Endometriose", /\bendometriose\b/],
 ["Contracepção", /contracep[cpt]|anticoncepcional|metodo contraceptivo/],
 ["Amenorreia", /amenorreia/],
 ["Climatério e menopausa", /climaterio|sindrome geniturinaria da menopausa|fogachos|sintomas vasomotores/],
 ["Rastreamento do câncer do colo uterino", /rastreamento cervical|rastreio colpocitologico|rastreamento.*(?:\bcolo\b|cervical)|citologia cervical/],
 ["Prolapso genital", /prolapso genital|\bpop-q\b/],
 ["Incontinência urinária", /incontinencia urinaria|bexiga hiperativa/],
 ["Hemorragia pós-parto", /hemorragia (?:pos-parto|puerperal)|atonia uterina/],
 ["Cardiotocografia", /cardiotocografia|monitorizacao fetal intraparto/],
 ["Prematuridade", /colo curto|insuficiencia cervic|insuficiencia istmocervical|trabalho de parto prematuro|cerclagem/],
 ["Gestação ectópica", /gestacao ectopica|gravidez ectopica/],
 ["Reanimação neonatal", /reanimacao neonatal/],
 ["Icterícia neonatal", /ictericia neonatal|ictericia fisiologica neonatal|ictericia associada a amamentacao|avaliacao de ictericia e indicacao de fototerapia/],
 ["Desenvolvimento infantil", /desenvolvimento infantil|atraso de fala/],
 ["Alergia alimentar", /alergia alimentar|alergia a proteina do leite/],
 ["Apendicite", /\bapendicite\b/],
 ["Pancreatite", /\bpancreatite\b/],
 ["Colelitíase e coledocolitíase", /colelitiase|coledocolitiase|colecistite/],
 ["Obstrução intestinal", /obstrucao intestinal|suboclusao intestinal/],
 ["Hérnias da parede abdominal", /hernia (?:inguinal|umbilical|femoral|estrangulada)/],
 ["Hemorragia digestiva", /hemorragia digestiva/],
 ["Refluxo gastroesofágico", /refluxo gastroesofagico/],
 ["Doença inflamatória intestinal", /doenca inflamatoria intestinal|doenca de crohn|retocolite ulcerativa/],
 ["Litíase urinária", /litiase renal|calculo renal|colica renal/],
 ["Artrite reumatoide", /artrite reumatoide|anti-ccp/],
 ["Osteoporose", /osteoporose/],
 ["Lombalgia", /lombalgia|cronificacao da dor lombar/],
 ["Transtorno bipolar", /transtorno bipolar/],
 ["Transtornos depressivos", /\bdepressao\b|\bdepressiv[ao]s?\b/],
 ["Tabagismo", /tabagismo|cessacao.*tabaco|parar de fumar/],
 ["Rastreamento do câncer de mama", /rastreamento.*cancer de mama|rastreamento mamografico/],
 ["Violência e notificação", /notificacao.*violencia|violencia.*notificacao|suspeita de violencia infantil/],
 ["Testes diagnósticos", /testes? diagnosticos?|sensibilidade e especificidade|curva roc|valor preditivo/],
 ["Delineamentos epidemiológicos", /estudo (?:caso-controle|ecologico|transversal|de coorte)|delineamento epidemiologico|ensaio clinico randomizado/],
 ["Medidas de associação", /odds ratio|risco relativo|razoes de risco|medidas? de associacao|fracao atribuivel/],
 ["Controle social no SUS", /conselho municipal de saude|controle social/],
];

function normalizeTopic(text){
 return String(text||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").trim();
}

function groupedTopicOf(q){
 if(q.modulo==="Acesso direto — classificação pendente")return "";
 const match=groupedTopics.find(([,pattern])=>pattern.test(normalizeTopic(q.tema)));
 return match?.[0]||q.tema||"";
}

const topicLabels=new Map();
const topicDetails=new Map();

function topicOf(q){
 const topic=groupedTopicOf(q);
 return topicLabels.get(normalizeTopic(topic))||topic;
}

function subtopicsOf(q){
 const topic=normalizeTopic(topicOf(q));
 const parts=[q.tema,q.subtema].filter(part=>part&&normalizeTopic(part)!==topic);
 return parts.filter((part,index)=>parts.findIndex(other=>normalizeTopic(other)===normalizeTopic(part))===index);
}

function indexTopics(questions){
 topicLabels.clear();
 topicDetails.clear();
 for(const q of questions){
  const topic=groupedTopicOf(q);
  if(topic&&!topicLabels.has(normalizeTopic(topic)))topicLabels.set(normalizeTopic(topic),topic);
 }
 for(const q of questions){
  const topic=topicOf(q);
  if(!topic)continue;
  if(!topicDetails.has(topic))topicDetails.set(topic,{subtopics:new Map(),aliases:new Set(),count:0});
  const details=topicDetails.get(topic);
  details.count++;
  for(const item of subtopicsOf(q)){
   const key=normalizeTopic(item);
   if(!details.subtopics.has(key))details.subtopics.set(key,item);
  }
  if(q.tema)details.aliases.add(q.tema);
 }
}

const clinicalTopicReviews={
 "DPOC":{
  text:"Suspeite de DPOC diante de dispneia persistente, tosse ou expectoração crônica, especialmente após exposição a tabaco ou outros irritantes. O GOLD confirma obstrução persistente pela relação VEF1/CVF pós-broncodilatador menor que 0,70, interpretada no contexto clínico. Para a prova, diferencie diagnóstico, avaliação de sintomas e manejo das exacerbações.",
  link:"https://goldcopd.org/wp-content/uploads/2025/11/GOLD-REPORT-2026-v1.2-20Nov2025_WMV.pdf",source:"GOLD"
 },
 "Pneumonia":{
  text:"Tosse, febre, dispneia e achados focais podem sugerir pneumonia. Na avaliação de adultos com pneumonia adquirida na comunidade, combine o julgamento clínico com escores de gravidade como CRB-65 ou CURB-65, conforme o cenário. Hipoxemia, instabilidade e complicações como derrame pleural podem modificar a conduta. Os escores de adultos não devem ser aplicados à criança.",
  link:"https://www.nice.org.uk/guidance/ng250/chapter/recommendations",source:"NICE"
 },
 "Diabetes mellitus":{
  text:"Fora da gestação, os critérios de diabetes incluem glicemia de jejum de pelo menos 126 mg/dL, HbA1c de pelo menos 6,5% ou glicemia de pelo menos 200 mg/dL duas horas após 75 g de glicose. Glicemia casual de pelo menos 200 mg/dL com sintomas clássicos também permite diagnóstico. Sem hiperglicemia inequívoca, confirme o resultado. Separe critérios diagnósticos das metas de seguimento.",
  link:"https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis",source:"NIDDK"
 },
 "Tuberculose":{
  text:"Tosse persistente, febre vespertina, sudorese noturna e emagrecimento orientam a suspeita de tuberculose pulmonar. Revise o papel do teste rápido molecular, da baciloscopia e da cultura, e a diferença entre doença ativa e infecção latente. A investigação dos contatos é parte do controle de transmissão.",
  link:"https://www.gov.br/saude/pt-br/assuntos/saude-de-a-z/a/t/tuberculose",source:"Ministério da Saúde"
 },
 "Testes diagnósticos":{
  text:"Sensibilidade é a proporção de testes positivos entre pessoas com a doença. Especificidade é a proporção de testes negativos entre pessoas sem a doença. Os valores preditivos respondem à pergunta inversa, a partir do resultado do teste, e variam com a prevalência. Em uma tabela 2 × 2, identifique o denominador antes de calcular.",
  link:"https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_metodologicas_estudos_acuracia_diagnostica.pdf",source:"Ministério da Saúde"
 },
 "Asma":{
  text:"A asma costuma causar episódios de sibilância, dispneia, aperto no peito ou tosse, com variação ao longo do tempo. O diagnóstico combina esse padrão com evidência de limitação variável do fluxo expiratório. Para as questões, separe confirmação diagnóstica, controle no seguimento e avaliação da gravidade das exacerbações.",
  link:"https://www.ginasthma.org/wp-content/uploads/2023/05/GINA-2023-Full-Report-2023-WMS.pdf",source:"GINA"
 },
 "Dengue":{
  text:"A dengue tem fases febril, crítica e de recuperação. A fase crítica pode começar justamente quando a febre baixa. Dor abdominal intensa e contínua, vômitos persistentes, sangramento de mucosa e sinais de extravasamento plasmático são pistas de gravidade. Estude os sinais de alarme, a classificação de risco e a escolha do exame conforme o dia dos sintomas.",
  link:"https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2024/nota-tecnica-no-20-2024-cgarb-dedt-svsa-ms",source:"Ministério da Saúde"
 },
 "Insuficiência cardíaca":{
  text:"Separe dois problemas nas questões: congestão e perfusão. Ortopneia, estertores, pressão venosa jugular elevada e edema ajudam a reconhecer congestão. A fração de ejeção auxilia na classificação, e o ecocardiograma também avalia estrutura e função. Revise os perfis de descompensação e a diferença entre aliviar sintomas e melhorar prognóstico.",
  link:"https://www.jacc.org/doi/full/10.1016/j.jacc.2021.12.012",source:"AHA, ACC e HFSA"
 },
 "Endometriose":{
  text:"Dismenorreia, dispareunia profunda, disquesia e infertilidade levantam suspeita de endometriose. A investigação considera a história, o exame e a imagem. Ultrassom ou ressonância normais podem ocorrer em doença superficial. Nas questões terapêuticas, observe se o objetivo é controlar a dor ou favorecer uma gestação.",
  link:"https://www.eshre.eu/-/media/sitecore-files/Guidelines/Endometriosis/ESHRE-GUIDELINE-ENDOMETRIOSIS-2022_2.pdf",source:"ESHRE"
 },
 "Doença renal crônica":{
  text:"A doença renal crônica exige alteração da estrutura ou da função renal por pelo menos três meses. A classificação usa causa, taxa de filtração glomerular e albuminúria. Ao interpretar um caso, confirme a persistência e avalie albuminúria e fatores de risco junto da creatinina.",
  link:"https://kdigo.org/wp-content/uploads/2017/02/KDIGO-2024-CKD-Guideline-Executive-Summary.pdf",source:"KDIGO"
 },
 "Delineamentos epidemiológicos":{
  text:"No estudo transversal, exposição e desfecho são observados em um recorte, útil para estimar prevalência. Na coorte, os grupos são acompanhados para comparar a ocorrência do desfecho. No caso-controle, a seleção começa pelo desfecho, e compara-se a exposição anterior. Em ensaios randomizados, o investigador sorteia a intervenção. Reconheça primeiro como os participantes foram selecionados.",
  link:"https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html",source:"CDC"
 },
 "Medidas de associação":{
  text:"O risco relativo compara o risco nos expostos com o risco nos não expostos. O odds ratio compara chances e é a medida típica de estudos caso-controle. Para essas razões, o valor nulo é 1. Ao interpretar o intervalo de confiança, considere também precisão, viés e confundimento.",
  link:"https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html",source:"CDC"
 }
};
