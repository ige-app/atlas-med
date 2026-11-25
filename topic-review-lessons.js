"use strict";

const topicReviewLessons = {
  "Hipocalcemia e hipoparatireoidismo": {
    overview: "O PTH mantém o cálcio sérico ao estimular a reabsorção renal de cálcio, a ativação renal de vitamina D e a mobilização óssea de cálcio; também aumenta a excreção renal de fosfato. Após tireoidectomia total ou esvaziamento cervical, lesão, remoção ou desvascularização das paratireoides pode reduzir o PTH, ocasionando hipocalcemia e hiperexcitabilidade neuromuscular.",
    points: [
      ["Fundamentos e fisiopatologia", "O cálcio ionizado é a fração biologicamente ativa. Sua queda facilita a geração de potenciais de ação e pode causar parestesias, câimbras, espasmos carpopedais, tetania e convulsões. O hipoparatireoidismo costuma associar cálcio baixo, fósforo elevado e PTH baixo ou inadequadamente normal. Avalie também magnésio, albumina, vitamina D e função renal."],
      ["Semiologia: Trousseau e Chvostek", "Trousseau é espasmo carpopedal após insuflação do manguito acima da pressão sistólica por cerca de três minutos. Chvostek é contração facial após percussão na região do nervo facial; é menos específico e pode ocorrer sem hipocalcemia. Após tireoidectomia recente, esses sinais favorecem hipocalcemia por comprometimento das paratireoides."],
      ["Diagnósticos diferenciais e exames", "Hipercalcemia tende a causar fraqueza, constipação, poliúria e QT encurtado, não tetania típica. Hipomagnesemia grave pode causar hipocalcemia por prejudicar secreção/ação do PTH. Solicite cálcio ionizado, magnésio, fósforo, PTH, creatinina e ECG conforme o quadro. Hipocalcemia pode prolongar o QT."],
      ["Tratamento e prevenção", "Hipocalcemia aguda com tetania grave, convulsões, laringoespasmo ou alterações cardíacas pode exigir gluconato de cálcio IV com monitorização. Para formas leves ou crônicas, considere cálcio oral e calcitriol conforme indicação, corrigindo magnésio baixo. Hipoparatireoidismo pós-cirúrgico persistente por mais de 12 meses é considerado crônico nas diretrizes internacionais de 2022."],
      ["Aplicação às provas", "Na questão 5 do NIEPAEM 2026.1, a relação entre tireoidectomia total, espasmo com manguito e Chvostek sugere hipocalcemia. Distinguir dos riscos de hematoma cervical, lesão do nervo laríngeo recorrente e outras complicações pós-operatórias."]
    ],
    sources: [
      ["SBEM · Position statement sobre hipoparatireoidismo (2018)", "https://pubmed.ncbi.nlm.nih.gov/?term=Diagnosis+and+treatment+of+hypoparathyroidism+Brazilian+Society"],
      ["International Task Force · Hipoparatireoidismo (2022)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10118814/"],
      ["Ministério da Saúde · PCDT", "https://www.gov.br/conitec/pt-br"]
    ]
  },
 Ceratite: {
  overview: "Ceratite é inflamação da córnea e pode ter causa infecciosa ou não infecciosa. Dor ocular, fotofobia e queda da visão justificam examinar a córnea na lâmpada de fenda. Na ceratite infecciosa, um infiltrado focal pode vir acompanhado de defeito epitelial que cora com fluoresceína.",
  points: [
   ["Lentes de contato e ceratite bacteriana", "Dormir com lentes eleva o risco de infecção corneana. No caso do NIEPAEM 2026.2, dor intensa, fotofobia, visão embaçada e infiltrado branco paracentral com edema apontam para ceratite bacteriana, alternativa B. Pseudomonas é um agente importante nesse contexto, mas os achados do caso não identificam a espécie."],
   ["Conjuntivite e episclerite nas alternativas", "Na conjuntivite bacteriana costuma predominar secreção mucopurulenta. Na alérgica, prurido, frequentemente bilateral. A episclerite geralmente causa vermelhidão setorial e desconforto leve com visão preservada. O infiltrado focal na córnea e a queda de acuidade visual são os achados que orientam a resposta."],
   ["Outras causas e avaliação", "Uma lesão dendrítica sugere herpes simples. Trauma com vegetais e contato de lentes com água levantam suspeita de fungos e Acanthamoeba, respectivamente. Suspeita de ceratite infecciosa requer suspender as lentes e avaliação oftalmológica urgente. O tamanho, a localização, a profundidade e a aparência do infiltrado orientam a investigação microbiológica."]
  ],
  sources: [
   ["American Academy of Ophthalmology · Diretriz de ceratite bacteriana", "https://www.guidelinecentral.com/guideline/10669/"],
   ["CDC · Ceratite bacteriana e lentes de contato", "https://www.cdc.gov/contact-lenses/causes/what-causes-contact-lens-related-bacterial-keratitis.html"]
  ]
 },
 Glaucoma: {
  overview: "Glaucoma é uma neuropatia óptica progressiva que pode comprometer o campo visual. A pressão intraocular é um fator de risco modificável. A avaliação combina exame do nervo óptico, tonometria, campo visual e gonioscopia para caracterizar o ângulo da câmara anterior.",
  points: [
   ["Fechamento agudo do ângulo", "Dor intensa e de início súbito, olho vermelho, visão turva ou halos, cefaleia e náuseas apontam para fechamento agudo do ângulo. Edema corneano e pupila em média midríase pouco reativa reforçam a hipótese. É uma urgência oftalmológica."],
   ["Glaucoma congênito", "Em lactente, pense na tríade de lacrimejamento, fotofobia e blefaroespasmo. Aumento do diâmetro da córnea, edema corneano e buftalmo são pistas importantes. Compare com a obstrução do ducto nasolacrimal, que costuma causar lacrimejamento e secreção com córnea de aspecto normal."],
   ["Glaucoma primário de ângulo aberto", "É frequentemente assintomático no início. A lesão do nervo óptico e a perda progressiva do campo visual orientam o diagnóstico e o seguimento. Pressão intraocular elevada sem dano detectado corresponde a hipertensão ocular, enquanto o glaucoma pode ocorrer mesmo com pressão dentro da faixa usual."]
  ],
  sources: [
   ["National Eye Institute · Tipos de glaucoma", "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/glaucoma"],
   ["American Academy of Ophthalmology · Glaucoma congênito primário", "https://www.aao.org/eyenet/article/diagnosis-treatment-of-primary-congenital-glaucoma"]
  ]
 },
 "Diabetes mellitus": {
  overview: "Diabetes mellitus é hiperglicemia crônica por deficiência de secreção de insulina, resistência à sua ação ou ambas. No tipo 1, a perda de células beta exige reposição de insulina. No tipo 2, a resistência à insulina se combina com perda progressiva da capacidade secretória. Separe, na prova, critérios diagnósticos, tratamento crônico, complicações e emergências.",
  points: [
   ["Confirmar o diagnóstico", "Fora da gestação, os critérios usuais incluem jejum ≥126 mg/dL, HbA1c ≥6,5% ou glicemia ≥200 mg/dL duas horas após 75 g de glicose. Glicemia casual ≥200 mg/dL estabelece o diagnóstico quando há sintomas clássicos ou crise hiperglicêmica. Sem quadro inequívoco, confirme. Hiperglicemia em internação pode refletir estresse. Anemia, transfusão recente e alterações da sobrevida das hemácias podem tornar a HbA1c pouco confiável, favorecendo testes de glicose plasmática."],
   ["Insulina e tratamento crônico", "No tipo 1, a lógica do esquema basal-bolus é cobrir a produção hepática entre refeições e a elevação de glicose com a alimentação. No tipo 2, quando a banca escolhe iniciar NPH à noite, a glicemia de jejum orienta o ajuste da dose basal. Considere risco de hipoglicemia com sulfonilureias e avalie a função renal e a dose ao interpretar se metformina, iSGLT2 e bloqueio do sistema renina-angiotensina devem ser mantidos."],
   ["Cetoacidose, estado hiperosmolar e hiperglicemia isolada", "Cetoacidose exige cetose e acidose metabólica. No estado hiperosmolar predominam desidratação e hiperosmolaridade, em geral com pouca cetose. Uma glicemia muito elevada, isoladamente, não confirma nenhum dos dois. Na cetoacidose, comece pela avaliação e reposição volêmica e acompanhe o potássio. Hipocalemia importante exige reposição antes da insulina. Bicarbonato não é rotina. Em crianças, siga protocolo pediátrico e vigie sinais de lesão cerebral."],
   ["Neuropatia", "Dor em queimação com perda sensitiva distal simétrica é típica de polineuropatia diabética. Analgésicos comuns como ibuprofeno não tratam bem essa dor neuropática. Amitriptilina aparece como opção de prova, mas a escolha clínica leva em conta idade, efeitos anticolinérgicos, comorbidades e alternativas."]
  ],
  sources: [
   ["NIDDK · Diagnóstico", "https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis"],
   ["KDIGO · Doença renal crônica", "https://kdigo.org/wp-content/uploads/2017/02/KDIGO-2024-CKD-Guideline-Executive-Summary.pdf"],
   ["Crises hiperglicêmicas · Consenso de 2024", "https://www.ccjm.org/content/92/3/152"],
   ["ISPAD · Cetoacidose pediátrica", "https://ima-contentfiles.s3.amazonaws.com/DKA_2022_ISPAD.pdf"]
  ]
 },
 "Diabetes na gestação": {
  overview: "Diferencie diabetes prévio, diabetes manifesto diagnosticado na gestação e diabetes gestacional. A glicemia de jejum na primeira consulta identifica hiperglicemia precoce. Se estiver abaixo dos limiares diagnósticos, o TOTG de 75 g entre 24 e 28 semanas avalia a elevação da resistência à insulina que ocorre mais tarde.",
  points: [
   ["TOTG e controle", "Entre 24 e 28 semanas, um valor igual ou acima de 92 mg/dL no jejum, 180 mg/dL em uma hora ou 153 mg/dL em duas horas atende aos critérios de diabetes gestacional, observados os limites de diabetes manifesto. Um jejum normal, isoladamente, não exclui a alteração. Depois do diagnóstico, a automonitorização capilar orienta ajustes de alimentação e insulina. Repetir o TOTG ou usar só HbA1c não substitui o perfil capilar."],
   ["Do pré-natal ao parto", "A hiperglicemia presente desde o primeiro trimestre muda a avaliação do risco de malformações e pode motivar avaliação cardíaca fetal, conforme o protocolo. Necessidade de insulina, controle glicêmico e condição fetal orientam a vigilância e o planejamento do parto."],
   ["Puerpério", "Após a dequitação, a resistência à insulina cai. Na maioria das pessoas com diabetes exclusivamente gestacional, a insulina é suspensa após o parto, com avaliação da glicemia. O TOTG de 75 g no puerpério usa critérios de fora da gestação. Por exemplo, jejum de 99 mg/dL com duas horas de 155 mg/dL indica intolerância à glicose, com jejum normal."]
  ],
  sources: [
   ["Sociedade Brasileira de Diabetes · Rastreamento e diagnóstico", "https://diretriz.diabetes.org.br/rastreamento-e-diagnostico-da-hiperglicemia-na-gestacao/"],
   ["Sociedade Brasileira de Diabetes · Tratamento", "https://diretriz.diabetes.org.br/tratamento-farmacologico-do-diabetes-na-gestacao/"],
   ["NIDDK · Critérios fora da gestação", "https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis"]
  ]
 },
 "Tuberculose": {
  overview: "A tuberculose pulmonar ativa pode cursar com tosse, febre, sudorese noturna e perda de peso. O raciocínio reúne exposição, clínica, imagem e exames microbiológicos. Em imunossuprimidos, considere também doença disseminada. A infecção latente exige excluir doença ativa antes do tratamento preventivo.",
  points: [
   ["Teste rápido, baciloscopia e cultura", "O TRM-TB detecta material genético e pode apontar resistência à rifampicina. A baciloscopia detecta bacilos álcool-ácido resistentes e não identifica sozinha a espécie. Resultados discordantes, retratamento, interrupção prévia e suspeita de resistência exigem atenção à cultura e ao teste de sensibilidade. Resistência detectada muda o fluxo de investigação e tratamento."],
   ["Contatos e imunossupressão", "Prova tuberculínica e IGRA auxiliam na investigação de infecção latente, mas não diferenciam infecção latente de doença ativa. A interpretação depende do risco e da idade. Recém-nascidos expostos, crianças pequenas, pessoas com HIV e candidatos a anti-TNF têm fluxos específicos. Uma criança assintomática, com exame de imagem normal, ainda pode ter indicação de tratamento preventivo."],
   ["Tratamento e seguimento", "Revise o esquema básico e as condições em que o SUS admite encurtamento para tuberculose sensível, não grave, em crianças e adolescentes elegíveis. O acompanhamento clínico é regular, em geral mensal. A proporção de abandono informa a qualidade do seguimento, enquanto incidência informa a frequência de casos novos."],
   ["Acesso e diagnóstico diferencial", "Prisão e situação de rua mudam a probabilidade pré-teste e o plano de cuidado. A UBS deve acolher e organizar o acompanhamento. Em imunossuprimidos com sintomas sistêmicos prolongados, histoplasmose disseminada pode simular tuberculose."]
  ],
  sources: [
   ["Ministério da Saúde · Tuberculose", "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/t/tuberculose"],
   ["Ministério da Saúde · Tratamento", "https://www.gov.br/aids/pt-br/assuntos/tuberculose/tratamento"],
   ["Ministério da Saúde · Investigação de contatos", "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/estudos-e-notas-informativas/2024/nota-informativa-no-15-2024-cgtm-dathi-svsa-ms.pdf/@@download/file"]
  ]
 },
 "Contracepção": {
  overview: "Escolha o método considerando eficácia, preferência, possibilidade de uso contínuo, sangramento, interações medicamentosas e critérios de elegibilidade. Implantes e dispositivos intrauterinos são métodos reversíveis de longa duração. Preservativos continuam relevantes para prevenção de infecções sexualmente transmissíveis.",
  points: [
   ["Quando o estrogênio muda a escolha", "Enxaqueca com aura aumenta a preocupação com AVC isquêmico. Trombose recente, trombofilias, síndrome antifosfolípide e o puerpério inicial também desfavorecem métodos combinados. Pílula, adesivo ou injetável combinado continuam contendo estrogênio mesmo quando a via é diferente. Aplique os critérios de elegibilidade ao método específico, inclusive ao injetável de progestagênio."],
   ["DIU e sangramento", "O DIU de cobre pode aumentar fluxo e cólicas. O DIU com levonorgestrel tende a reduzir o fluxo e pode ser mais adequado no caso com sangramento intenso ou anticoagulação. Mioma sem distorção da cavidade não tem a mesma implicação que distorção incompatível com a inserção. Avalie a anatomia antes de indicar um DIU."],
   ["Lamotrigina, SOP e puerpério", "Contraceptivos combinados com estrogênio podem reduzir as concentrações de lamotrigina. Na SOP, o combinado pode reduzir o efeito do LH sobre a teca e aumentar a SHBG, diminuindo o estímulo androgênico. No puerpério, considere tempo desde o parto, amamentação, risco trombótico e preferências."],
   ["Adolescência e sigilo", "A consulta deve oferecer informação, avaliar compreensão e vontade da adolescente e preservar a confidencialidade quando cabível. Pedido de contracepção isoladamente não exige comunicação automática à família. Suspeita de violência, coerção ou risco exige avaliação e medidas de proteção."]
  ],
  sources: [
   ["CDC · Critérios de elegibilidade para contracepção", "https://www.cdc.gov/contraception/hcp/usmec/index.html"],
   ["CDC · Métodos hormonais combinados", "https://www.cdc.gov/contraception/hcp/usmec/combined-hormonal-contraceptives.html"],
   ["Ministério da Saúde · Saúde de adolescentes", "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-adolescente/saude-sexual-e-reprodutiva/ferramentas/saude_adolecentes.pdf/@@download/file"],
   ["ASRM · Diretriz internacional de SOP", "https://integration.asrm.org/globalassets/_asrm/practice-guidance/practice-guidelines/pdf/recommendations_from_the_2023_int_evidence-based_guideline_on_pcos.pdf"]
  ]
 },
 "Asma": {
  overview: "A asma combina sintomas respiratórios variáveis, como sibilância, tosse e dispneia, e limitação variável do fluxo expiratório. Na criança em idade escolar, espirometria com avaliação de resposta ao broncodilatador ajuda a demonstrar a variabilidade. Na criança pequena, o diagnóstico depende mais do padrão clínico e da resposta observada.",
  points: [
   ["Fisiopatologia e confirmação funcional", "Inflamação brônquica, hiperresponsividade, contração do músculo liso e produção de muco causam obstrução variável. No adulto, aumento do VEF1 de pelo menos 12% e 200 mL após broncodilatador apoia o diagnóstico; teste negativo isolado não exclui asma. Diferencie DPOC, insuficiência cardíaca e obstrução laríngea induzível."],
   ["Atualização brasileira de 2026", "O PCDT aprovado pela Portaria Conjunta 43/2026 prioriza tratamento contendo corticoide inalatório. Em adultos e adolescentes, CI-formoterol em baixa dose sob demanda é o regime preferencial nas etapas iniciais; nas etapas seguintes pode ser usado em manutenção e alívio (MART). Alternativas com SABA exigem cobertura anti-inflamatória. Antes de escalar, revisar técnica, adesão, exposições, medicamentos e diagnóstico."],
   ["Farmacologia e segurança", "Receptores beta-1 predominam no coração e beta-2 participam do relaxamento brônquico via AMPc. Betabloqueadores não seletivos podem agravar broncoespasmo e reduzir resposta ao resgate beta-2 agonista. Quando houver indicação cardiovascular forte, avaliar individualmente um agente beta-1 seletivo, com monitorização; seletividade não elimina o risco. Evitar retirada abrupta sem avaliação clínica."],
   ["Controle e ajuste de tratamento", "Avalie sintomas diurnos e noturnos, uso de resgate, limitação de atividades e exacerbações. Confira técnica inalatória, adesão e comorbidades como rinite antes de subir o degrau. Corticoide inalatório é a base do controle. Broncodilatador de longa duração na asma deve estar associado a corticoide inalatório."],
   ["Exacerbação grave", "Fala entrecortada, esforço importante, hipoxemia ou sonolência indicam gravidade. A abordagem inicial usa broncodilatador de ação rápida, corticoide sistêmico e oxigênio conforme necessidade. Ipratrópio é associado nas crises graves. Magnésio intravenoso pode ser adjuvante nos casos graves com resposta insuficiente ao tratamento inicial, e não é uma infusão contínua de rotina. Anti-histamínico e broncodilatador de longa ação não substituem a abordagem da crise aguda."],
   ["Pegadinhas de diagnóstico e segurança", "Radiografia e IgE específica podem ajudar em perguntas diferentes, mas não confirmam isoladamente a asma. Propranolol e outros betabloqueadores não seletivos podem precipitar broncoespasmo. Deterioração súbita durante uma crise refratária impõe reavaliar ventilação e possíveis complicações, como pneumotórax."],
   ["Siglas de broncodilatadores", "SABA: agonista beta-2 de curta ação (salbutamol); LABA: agonista beta-2 de longa ação (formoterol, salmeterol); SAMA: antagonista muscarínico de curta ação (ipratrópio); LAMA: antagonista muscarínico de longa ação (tiotrópio). Beta-2 agonistas promovem relaxamento brônquico via Gs/AMPc; antagonistas muscarínicos bloqueiam a broncoconstrição parassimpática por M3."],
   ["Origem do critério de resposta ao broncodilatador", "O PCDT brasileiro de 2026 e a GINA 2026 mantêm para adultos aumento do VEF1 ou CVF de pelo menos 12% E pelo menos 200 mL em relação ao basal. O limiar vem da ATS/ERS 2005; a proposta ATS/ERS 2022 de aumento acima de 10% do previsto é alternativa de interpretação funcional e não substituiu o critério da GINA 2026. Teste negativo isolado não exclui asma."],
   ["Questão NIEPAEM 2026.1 nº 33 — revisão após correção", "Em paciente asmático com sintomas persistentes apesar de corticoide sistêmico e salbutamol, identifique fármacos agravantes: propranolol bloqueia beta-1 e beta-2, pode causar broncoespasmo e dificultar o efeito do salbutamol. Entre as alternativas da questão, retirar/reavaliar propranolol é a medida mais adequada. Na prática, substituição deve considerar risco cardiovascular e evitar interrupção abrupta sem avaliação clínica."]
  ],
  sources: [["Ministério da Saúde · PCDT Asma 2026, atualizado em setembro", "https://www.gov.br/saude/pt-br/assuntos/pcdt/a/asma/view"], ["GINA · Estratégia de manejo da asma 2026", "https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf"]]
 },
 "Pneumonia": {
  overview: "A suspeita de pneumonia reúne sintomas respiratórios agudos, febre e achados focais, interpretados junto à oxigenação e ao estado geral. Em exames de imagem, diferencie consolidação pulmonar de complicações pleurais. Crianças precisam de avaliação própria de gravidade.",
  points: [
   ["Local do tratamento", "No adulto, CURB-65 considera confusão, ureia elevada, frequência respiratória ≥30, pressão baixa e idade ≥65. CRB-65 dispensa ureia. Use o escore com julgamento clínico, saturação, comorbidades e capacidade de cuidado em casa. Estabilidade clínica pode permitir antibiótico oral e reavaliação, enquanto hipoxemia, instabilidade ou confusão podem exigir internação."],
   ["Falha terapêutica e complicações", "Febre persistente, piora respiratória ou abolição do murmúrio vesicular após a terapia pedem reavaliação. Ultrassom ajuda a detectar derrame e septações. Cavitação e necrose após melhora inicial da influenza sugerem coinfecção bacteriana, inclusive por Staphylococcus aureus no quadro grave. O antecedente de influenza não exclui antibiótico quando há suspeita de coinfecção."],
   ["Pediatria e suporte", "No lactente, letargia, gemência, hipoxemia e fadiga respiratória exigem suporte rápido e avaliação da necessidade de ventilação invasiva. Em pneumonia necrotizante, febre persistente pode fazer parte da evolução. A decisão de ampliar o antibiótico ou repetir tomografia depende da trajetória clínica e de complicações, não apenas de um pico febril."]
  ],
  sources: [
   ["NICE · Diagnóstico e manejo da pneumonia", "https://www.nice.org.uk/guidance/ng250/chapter/recommendations"],
   ["IDSA · Influenza e coinfecção bacteriana", "https://www.idsociety.org/globalassets/idsa/practice-guidelines/2018-seasonal-influenza.pdf"]
  ]
 },
 "Dengue": {
  overview: "A dengue passa pelas fases febril, crítica e de recuperação. A queda da febre não garante melhora. A fase crítica pode começar na defervescência, quando extravasamento plasmático pode provocar hemoconcentração, instabilidade e choque.",
  points: [
   ["Classificação de risco", "Grupo A: sem sinais de alarme e sem fatores clínicos que exijam observação. Grupo B: sem sinais de alarme, mas com condições especiais, comorbidades, risco social ou sangramento de pele espontâneo ou induzido. Grupo C: com sinais de alarme, como dor abdominal intensa, vômitos persistentes, hipotensão postural ou sangramento de mucosa. Grupo D: choque, sangramento grave ou comprometimento grave de órgãos. Em crianças pequenas, considere o risco mesmo com exame inicial tranquilizador."],
   ["Prova do laço e janela diagnóstica", "Na prova do laço, insufle o manguito na média aritmética entre pressão sistólica e diastólica: 5 minutos em adultos e 3 minutos em crianças; avalie petéquias em área de 2,5 × 2,5 cm. Teste positivo: 20 ou mais petéquias em adultos, 10 ou mais em crianças. Resultado negativo não exclui dengue. Até o 5º dia de sintomas, priorize antígeno NS1 e métodos moleculares como RT-PCR; a partir do 6º dia, a IgM costuma ser mais útil. IgG isolada não confirma infecção aguda."],
   ["Conduta e exames", "Grupo C exige hidratação intravenosa e observação, sem esperar confirmação etiológica ou queda de plaquetas. Hemograma e hematócrito ajudam na estratificação e no acompanhamento. NS1 e métodos moleculares são mais úteis na fase inicial. IgM tem maior utilidade a partir do sexto dia. Plaquetas isoladas não confirmam dengue. Evite AAS e anti-inflamatórios não esteroidais no quadro suspeito."],
   ["Arboviroses e vacinas", "Diferencie do quadro com artralgia marcante da chikungunya e do exantema pruriginoso da zika, sem depender de um único sintoma. Em questões de vacina, identifique o produto, faixa etária, sorostatus e data da prova. Evidência por sorotipo e recomendações do PNI podem mudar entre edições."]
  ],
  sources: [
   ["Ministério da Saúde · Diagnóstico e manejo clínico", "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/view"],
   ["Ministério da Saúde · Guia da vacina do Butantan", "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/guias-e-manuais/2026/guia-tecnico-operacional-da-vacina-dengue-atenuada-do-instituto-butantan.pdf"]
  ]
 },
 "Rastreamento do câncer do colo uterino": {
  overview: "O rastreamento busca detectar alterações precursoras do câncer cervical em pessoas elegíveis e assintomáticas. A investigação de resultado alterado é uma etapa própria. Identifique se a questão usa citologia como teste primário ou o algoritmo de DNA-HPV oncogênico, incorporado nas diretrizes brasileiras mais recentes.",
  points: [
   ["No algoritmo citológico", "ASC-H indica atipia escamosa em que não se exclui lesão de alto grau e requer colposcopia. Conização ou exérese direta não são a investigação inicial de todo resultado alterado. Em protocolos citológicos anteriores, LSIL em algumas faixas etárias levava à repetição programada da citologia. Para ASC-US, idade, histórico e protocolo influenciam o intervalo."],
   ["No algoritmo de DNA-HPV", "O HPV 16 ou 18 detectado no rastreamento primário indica encaminhamento para colposcopia. Citologia de triagem ou repetição do teste pode fazer parte do fluxo para outros genótipos oncogênicos, dependendo do resultado e da diretriz adotada."],
   ["Situações especiais", "Imunossupressão, tratamento de lesão de alto grau e história de NIC 3 mudam o seguimento. Histerectomia total por doença benigna pode dispensar rastreamento em quem não tem história relevante, mas não zera a necessidade de vigilância em quem já teve lesão de alto grau. Use o protocolo da época da prova para o intervalo exato."]
  ],
  sources: [
   ["INCA · Diretriz citológica de 2016", "https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_brasileiras_rastreamento_cancer_colo_utero_2ed_rev_ampl_atual.pdf"],
   ["INCA · Diretrizes brasileiras com DNA-HPV", "https://www.gov.br/inca/pt-br/assuntos/noticias/2025/aprovada-diretrizes-brasileiras-para-o-rastreamento-do-cancer-de-colo-do-utero"],
   ["Ministério da Saúde · Situações especiais", "https://www.gov.br/saude/pt-br/assuntos/pcdt/c/cancer-de-colo-do-utero-parte-II/@@download/file"]
  ]
 },
 "Testes diagnósticos": {
  overview: "Organize a matriz 2 × 2 por condição real e resultado observado. Entre os doentes, sensibilidade = VP/(VP+FN). Entre os não doentes, especificidade = VN/(VN+FP). Valores preditivos partem do resultado do teste e mudam conforme a prevalência.",
  points: [
   ["Prevalência e ponto de corte", "Quando a prevalência cai, o valor preditivo positivo tende a cair. Baixa especificidade em uma população com muitos não doentes gera muitos falsos positivos. Ao baixar o limiar de um teste em que valores altos são positivos, a sensibilidade tende a subir e a especificidade a cair."],
   ["Razões de verossimilhança e ROC", "RV+ = sensibilidade/(1−especificidade). Com sensibilidade de 80% e especificidade de 90%, RV+ = 8. Compara a probabilidade de teste positivo em doentes e não doentes, e multiplica as chances pré-teste. A curva ROC representa sensibilidade no eixo vertical e 1−especificidade no horizontal."],
   ["Corrigir frequência observada", "Se o teste for imperfeito, a proporção observada de positivos combina verdadeiros e falsos positivos. Usando os valores como proporções, frequência corrigida = (frequência observada + especificidade − 1)/(sensibilidade + especificidade − 1), desde que o teste e as estimativas sejam adequados à população."]
  ],
  sources: [["Ministério da Saúde · Acurácia diagnóstica", "https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_metodologicas_estudos_acuracia_diagnostica.pdf"]]
 }
,
 "Bronquiolite": {
   "overview": "A bronquiolite viral aguda costuma começar com coriza e tosse e evoluir para taquipneia, retrações, sibilos ou estertores no lactente. O edema, as secreções e a obstrução das pequenas vias aéreas explicam o aumento do trabalho respiratório. O diagnóstico é clínico e a gravidade depende da respiração, da oxigenação e da capacidade de se alimentar.",
   "points": [
     [
       "Reconhecer o quadro e avaliar a gravidade",
       "O pródromo viral ajuda a reconhecer a bronquiolite. Apneia, cianose central, exaustão e esforço respiratório importante exigem avaliação imediata. Lactentes pequenos e prematuros têm maior risco de piora. Avalie também ingestão, diurese e saturação."
     ],
     [
       "Suporte e alternativas frequentes",
       "Ofereça hidratação e oxigênio conforme avaliação clínica. A NICE indica oxigênio se a saturação estiver persistentemente abaixo de 90% a partir de seis semanas de vida, ou abaixo de 92% em menores de seis semanas e em crianças com comorbidades. Salbutamol, adrenalina nebulizada, corticoide, antibiótico e fisioterapia respiratória ficam fora do tratamento de rotina. Radiografia também fica reservada para indicações específicas."
     ],
     [
       "Febre nova após melhora",
       "Na questão 97 da USP 2023, a febre reaparece após melhora respiratória e vem acompanhada de irritabilidade. Isso pede investigação de outra causa, como otite média aguda. A alternativa mostra uma membrana timpânica abaulada. Hiperemia isolada do tímpano tem menor valor diagnóstico."
     ]
   ],
   "sources": [
     [
       "NICE · Diagnóstico e manejo da bronquiolite",
       "https://www.nice.org.uk/guidance/ng9/chapter/Recommendations"
     ],
     [
       "CDC · Otite média aguda",
       "https://www.cdc.gov/antibiotic-use/hcp/clinical-care/pediatric-outpatient.html"
     ]
   ]
 },
 "Hemorragia pós-parto": {
   "overview": "O reconhecimento da hemorragia pós-parto combina perda sanguínea medida e avaliação da perfusão. As causas são lembradas pelos 4 Ts: tônus (atonia), trauma (lacerações ou lesões), tecido (retenção placentária) e trombina (coagulopatia). A estabilização começa enquanto a equipe procura a causa.",
   "points": [
     [
       "Atonia, macrossomia e sobredistensão",
       "Útero amolecido com sangramento sugere atonia. Macrossomia, polidrâmnio e gestação múltipla favorecem a sobredistensão uterina. Se o útero estiver firme e houver sangramento persistente, procure especialmente trauma de trajeto e avalie as demais causas."
     ],
     [
       "Índice de choque e instabilidade",
       "Divida a frequência cardíaca pela pressão arterial sistólica. Na UNESP 2023, o índice de 1,1, a sobredistensão e a atonia orientam o início do tratamento. Na UNIFESP 2024, os sinais de instabilidade justificam acionar o protocolo mesmo quando a perda registrada parece modesta."
     ],
     [
       "Primeiras medidas e escalonamento",
       "A abordagem inicial inclui massagem uterina, uterotônico, ácido tranexâmico precoce, acesso venoso com fluidos, exame do trato genital e acionamento de suporte. Na atonia, a ocitocina é o uterotônico de primeira linha. Se o sangramento persistir, avalie uterotônicos adicionais, tamponamento e intervenção conforme a causa. A questão da USP 2023 explora o passo após massagem e ocitocina em paciente hipertensa: evite derivados do ergot nessa situação e reconheça o misoprostol entre as opções."
     ]
   ],
   "sources": [
     [
       "OMS, FIGO e ICM · Diretriz consolidada de hemorragia pós-parto",
       "https://www.who.int/publications/i/item/9789240115637"
     ],
     [
       "OMS · Pacote de tratamento inicial",
       "https://www.ncbi.nlm.nih.gov/books/NBK619233/table/ch3.tab33/"
     ]
   ]
 },
 "Endometriose": {
   "overview": "Endometriose é a presença de tecido semelhante ao endométrio fora do útero, associada a inflamação e, em alguns casos, aderências. Dismenorreia, dispareunia profunda, disquesia cíclica e infertilidade ajudam a levantar a hipótese. Ultrassonografia transvaginal especializada e ressonância podem mapear a doença profunda. Imagem normal ainda permite doença superficial.",
   "points": [
     [
       "Dor pélvica e doença profunda",
       "Disquesia associada ao ciclo menstrual sugere comprometimento posterior, inclusive do retossigmoide. Revise localização, profundidade da lesão, sintomas e comprometimento de órgãos. A UNESP 2023 cobra a possibilidade de manter acompanhamento clínico especializado quando a dor está controlada e o caso permite essa abordagem."
     ],
     [
       "Tratamento quando o objetivo é aliviar a dor",
       "Contraceptivos hormonais combinados e progestagênios são opções de supressão hormonal. A escolha depende de tolerabilidade, contraindicações, preferências e desejo reprodutivo. Lesões profundas com suspeita de comprometimento de órgãos exigem avaliação especializada. A extensão na imagem, isoladamente, tem valor limitado para decidir operar."
     ],
     [
       "Infertilidade e planejamento reprodutivo",
       "Tratamento hormonal supressivo pode controlar sintomas, mas não aumenta a chance de gravidez espontânea enquanto utilizado para tratar infertilidade. Discuta idade, reserva ovariana, fator masculino e tubário, cirurgias anteriores e gravidade da dor para decidir entre investigação, cirurgia selecionada e reprodução assistida."
     ]
   ],
   "sources": [
     [
       "ESHRE · Diretriz de endometriose",
       "https://www.eshre.eu/guideline/endometriosis"
     ]
   ]
 },
 "Hipertensão arterial": {
   "overview": "A hipertensão arterial é definida por pressão persistentemente elevada, confirmada com técnica adequada e medidas repetidas. MAPA e MRPA ajudam a confirmar o diagnóstico e a identificar diferenças entre o consultório e a rotina. A decisão terapêutica considera risco cardiovascular, lesão de órgão-alvo, idade e tolerância.",
   "points": [
     [
       "Aferição e diagnóstico",
       "Deixe a pessoa em repouso, sentada e com o braço apoiado na altura do coração. Escolha o manguito pela circunferência do braço: um manguito pequeno tende a superestimar a pressão. No avental branco, a pressão sobe no consultório; na hipertensão mascarada, está normal no consultório e elevada fora dele."
     ],
     [
       "Tratamento inicial e idosos",
       "Mudanças de estilo de vida acompanham o tratamento. No estágio 2 sem lesão aguda, a associação inicial de duas classes é a resposta esperada no NIEPAEM. No idoso, confira medidas repetidas, fragilidade, risco de quedas e hipotensão ortostática. Holter avalia ritmo cardíaco e não substitui MAPA."
     ],
     [
       "Resistência e hipocalemia",
       "Antes de rotular hipertensão resistente, confira técnica, adesão e pressão fora do consultório. O esquema tríplice usual é IECA ou BRA, bloqueador de canal de cálcio e diurético tiazídico ou similar. Espironolactona costuma ser o próximo passo se função renal e potássio permitirem. Hipocalemia com hipertensão sugere investigar hiperaldosteronismo primário com relação aldosterona-renina."
     ],
     [
       "Emergência e pediatria",
       "Emergência hipertensiva exige lesão aguda de órgão-alvo, como edema pulmonar ou dissecção aórtica. A pressão isolada não define emergência. Dor torácica pede investigação dirigida. Na infância, interprete a pressão segundo idade, sexo e estatura quando aplicável e considere comorbidades ao escolher o fármaco."
     ]
   ],
   "sources": [
     [
       "Diretriz Brasileira de Hipertensão Arterial 2025",
       "https://abccardiol.org/article/diretriz-brasileira-de-hipertensao-arterial-2025/"
     ]
   ]
 },
 "Insuficiência cardíaca": {
   "overview": "É uma síndrome causada por alteração cardíaca estrutural ou funcional. Dispneia, ortopneia, edema e intolerância aos esforços orientam a suspeita. Ecocardiograma caracteriza a fração de ejeção e a estrutura cardíaca. BNP ou NT-proBNP ajudam quando há dúvida diagnóstica, interpretados com o contexto clínico.",
   "points": [
     [
       "Congestão e perfusão",
       "Estase jugular, ortopneia, edema e aumento do peso ajudam a reconhecer congestão. Ganho rápido de peso pode sinalizar retenção hídrica. O perfil frio e congesto combina hipoperfusão com sobrecarga de volume e requer avaliação urgente. Procure precipitantes, como arritmia, isquemia e infecção."
     ],
     [
       "Quatro pilares na fração de ejeção reduzida",
       "Combine, conforme tolerância e indicação, ARNI ou IECA/BRA, betabloqueador com evidência, antagonista mineralocorticoide e inibidor de SGLT2. Na questão do ENAMED com fração de ejeção de 38% em uso de IECA, a espironolactona é a opção entre as apresentadas que melhora o prognóstico. Clortalidona e clonidina não cumprem esse papel. A hidralazina pode ter indicação específica em associação ao nitrato."
     ],
     [
       "Diurético, recuperação e medicamentos",
       "O diurético de alça trata congestão. Se a fração de ejeção melhorou sob tratamento, mantenha as terapias que modificam prognóstico pelo risco de recaída. A pioglitazona pode piorar a retenção hídrica. Em crianças, shunts de cardiopatias congênitas podem produzir congestão pulmonar e dificuldade de ganhar peso."
     ]
   ],
   "sources": [
     [
       "AHA, ACC e HFSA · Diretriz de insuficiência cardíaca",
       "https://www.jacc.org/doi/full/10.1016/j.jacc.2021.12.012"
     ]
   ]
 },
 "Infecção pelo HIV": {
   "overview": "A abordagem integra diagnóstico, terapia antirretroviral (TARV) e prevenção combinada. A carga viral acompanha a resposta à TARV e o CD4 orienta a avaliação imunológica. Na cascata de cuidado, diferencie diagnóstico, vinculação, retenção, tratamento e supressão viral e confira o denominador de cada etapa.",
   "points": [
     [
       "PEP e PrEP",
       "Após exposição de risco, avalie PEP imediatamente, dentro de 72 horas. O esquema dura 28 dias. Faça testagem inicial e avalie outras ISTs sem atrasar uma PEP indicada. Se o risco persistir, planeje transição para PrEP ao fim da PEP conforme o protocolo. Para exposição vaginal, use o esquema oral diário quando indicado. Confira o protocolo vigente para o tempo até proteção. O item do ENAMED 2026 que cita 20 dias está registrado no banco com gabarito preliminar."
     ],
     [
       "Pré-natal e criança exposta",
       "Acolha, preserve o sigilo e explique o fluxo de confirmação. Após diagnóstico, organize início oportuno de TARV e prevenção da transmissão vertical. Na criança pequena exposta, o diagnóstico exige testes virológicos segundo o protocolo, pois anticorpos maternos podem persistir por meses."
     ],
     [
       "Acompanhamento e prevenção combinada",
       "A TARV é indicada para todas as pessoas com diagnóstico de HIV, independentemente de CD4, com atenção às situações clínicas que alteram o momento de início. Supressão viral sustentada impede transmissão sexual. A questão sobre rastreamento cervical exige considerar o protocolo específico para pessoas com HIV. No atendimento a adolescentes, avalie risco e confidencialidade segundo o contexto."
     ]
   ],
   "sources": [
     [
       "Ministério da Saúde · PEP",
       "https://portal.aids.gov.br/pep"
     ],
     [
       "Ministério da Saúde · PrEP",
       "https://h-painel.aids.gov.br/prep.html"
     ],
     [
       "Ministério da Saúde · Manejo da criança exposta",
       "https://www.gov.br/aids/pt-br/central-de-conteudo/pcdts/PCDT_HIV_Criana_Modulo_1_2024_e.pdf"
     ],
     [
       "Ministério da Saúde · Tratamento",
       "https://www.gov.br/aids/pt-br/assuntos/prevencao-combinada/tratamento"
     ]
   ]
 },
 "Delineamentos epidemiológicos": {
   "overview": "Para identificar o desenho, pergunte qual é a unidade analisada, como os participantes foram selecionados, em que ordem exposição e desfecho foram medidos e se o pesquisador atribuiu a intervenção.",
   "points": [
     [
       "Coorte e caso-controle",
       "Na coorte, compare pessoas segundo a exposição e observe a ocorrência do desfecho. Mesmo retrospectiva, pode estimar incidência e risco relativo se os denominadores forem conhecidos. No caso-controle, comece por casos e controles e reconstrua exposições anteriores. A medida usual é o odds ratio. Selecionar pessoas com e sem hipertensão e depois revisar exposições caracteriza caso-controle."
     ],
     [
       "Transversal e ecológico",
       "O transversal mede exposição e desfecho em um recorte e geralmente informa prevalência. A ordem temporal fica incerta. O ecológico usa dados agregados, como municípios ou países. Uma associação entre cidades não autoriza concluir que ela vale individualmente. Série temporal analisa medidas repetidas ao longo do tempo."
     ],
     [
       "Ensaio randomizado e vieses",
       "A randomização tende a equilibrar confundidores conhecidos e desconhecidos entre os grupos. Mascaramento reduz alguns vieses de informação. Na coorte, perdas de seguimento relacionadas à exposição e ao risco do desfecho podem distorcer o resultado. Em caso-controle, revise viés de memória e a origem dos controles."
     ],
     [
       "Medidas cobradas",
       "Risco relativo compara incidências. A fração atribuível populacional estima a proporção de eventos que poderia ser evitada na população se a exposição fosse eliminada, sob pressupostos causais. O cálculo depende do efeito e da frequência da exposição na população."
     ]
   ],
   "sources": [
     [
       "CDC · Delineamentos e vieses em estudos de campo",
       "https://www.cdc.gov/field-epi-manual/php/chapters/design-conduct-analyze-field-studies.html"
     ]
   ]
 },
 "Sepse": {
   "overview": "Sepse é disfunção orgânica potencialmente fatal decorrente de resposta desregulada à infecção. Alteração do estado mental, oligúria, hipoxemia e má perfusão ajudam a reconhecer gravidade, mesmo na ausência de febre.",
   "points": [
     [
       "SOFA e choque no adulto",
       "O Sepsis-3 operacionaliza a disfunção orgânica como aumento de pelo menos dois pontos no SOFA. O qSOFA pode sinalizar risco, mas é insuficiente para triagem isolada. Choque séptico, pelos critérios do Sepsis-3, combina necessidade de vasopressor para manter pressão arterial média de pelo menos 65 mmHg e lactato acima de 2 mmol/L apesar de reposição adequada."
     ],
     [
       "Primeira hora e foco infeccioso",
       "No choque séptico ou na alta probabilidade de sepse, inicie antimicrobianos prontamente, idealmente na primeira hora. Colha culturas antes se isso não atrasar o tratamento. Ajuste o esquema empírico ao foco e ao risco de resistência. Foco abdominal pode exigir drenagem ou cirurgia, além de cobertura para enterobactérias e anaeróbios."
     ],
     [
       "Fluidos e vasopressores",
       "Use cristaloides com reavaliação de perfusão e tolerância a fluidos. Hipotensão persistente pode exigir noradrenalina. Em questão sobre acesso periférico, a ideia é iniciar o vasopressor por acesso periférico adequado com vigilância, sem esperar a colocação de acesso central."
     ],
     [
       "Criança e recém-nascido",
       "Oligúria, alteração do sensório, pulsos fracos e enchimento capilar prolongado podem aparecer antes da hipotensão. No ENAMED, inflamação do coto umbilical e má perfusão apontam para choque séptico distributivo, que pode ter extremidades frias. Compare com choque cardiogênico, obstrutivo e neurogênico. Use critérios e estratégia de ressuscitação da faixa etária."
     ]
   ],
   "sources": [
     [
       "Surviving Sepsis Campaign · Adultos",
       "https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026"
     ],
     [
       "Surviving Sepsis Campaign · Crianças",
       "https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-the-management-of-sepsis-and-septic-shock-in"
     ]
   ]
 },
 "Sífilis": {
   "overview": "A sífilis pode ser primária, secundária, latente ou terciária. Cancro habitualmente indolor sugere a fase primária. Exantema que pode atingir palmas e plantas e lesões mucocutâneas sugerem sífilis secundária. As fases precoces têm maior transmissibilidade sexual.",
   "points": [
     [
       "Testes e seguimento",
       "Testes treponêmicos, como o teste rápido e o FTA-Abs, frequentemente permanecem reagentes após tratamento. A atividade e a evolução são interpretadas com história, exame e VDRL ou RPR quantitativo. Duas diluições correspondem a quatro vezes, como a queda de 1:32 para 1:8. Um VDRL baixo isolado é insuficiente para definir cicatriz sorológica. O item do ENAMED sobre resposta sorológica foi anulado."
     ],
     [
       "Tratamento e pré-natal",
       "Sífilis recente sem acometimento neurológico costuma ser tratada com uma dose de benzilpenicilina benzatina. Latente tardia ou de duração ignorada requer três doses semanais. Na gestação, trate prontamente conforme o estágio, acompanhe VDRL mensalmente, registre as doses e avalie as parcerias. Se o intervalo entre doses ultrapassar nove dias na gestante, reinicie o esquema. Elevação de duas diluições pede investigação de reinfecção ou falha terapêutica."
     ],
     [
       "Recém-nascido e vigilância",
       "Compare VDRL materno e neonatal e considere o tratamento materno, exame do bebê e investigação complementar. Um recém-nascido assintomático ainda pode ter sífilis congênita. Esquemas de penicilina variam com a avaliação, incluindo penicilina cristalina por dez dias quando indicada. Hipoacusia é possível manifestação tardia. Compare indicadores de detecção materna e sífilis congênita para avaliar o cuidado pré-natal."
     ]
   ],
   "sources": [
     [
       "Ministério da Saúde · Sífilis",
       "https://portal.aids.gov.br/sifilis"
     ],
     [
       "Ministério da Saúde · Sífilis congênita",
       "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-z/s/sifilis/gestantes/congenita/congenita/"
     ]
   ]
 },
 "Hérnias da parede abdominal": {
   "overview": "Hérnias são protrusões através de um defeito da parede. Na virilha, a hérnia indireta passa lateralmente aos vasos epigástricos inferiores, a direta passa medialmente, e a femoral situa-se abaixo do ligamento inguinal.",
   "points": [
     [
       "Irredutibilidade e estrangulamento",
       "Irredutibilidade aguda descreve a impossibilidade de reduzir o conteúdo. Estrangulamento envolve comprometimento vascular. Dor intensa persistente, sinais peritoneais ou sofrimento intestinal sugerem urgência cirúrgica. Vômitos e parada de flatos podem indicar obstrução por hérnia. No ENAMED, o caso da massa inguinal dolorosa e irredutível em idosa contrapõe hérnia femoral a inguinal indireta e outras causas de obstrução. O item foi anulado."
     ],
     [
       "Mulheres, hérnia femoral e redução",
       "Em mulheres, considere hérnia femoral mesmo quando o exame sugere inguinal. A via posterior laparoendoscópica permite avaliar ambos os orifícios quando há experiência. A hérnia femoral tem maior risco de complicações e costuma indicar reparo oportuno. Após redução espontânea, reavalie dor, obstrução e sinais de isquemia antes de decidir observação e programação do reparo."
     ],
     [
       "Inguinal e umbilical na infância",
       "Hérnia inguinal redutível na criança costuma ter indicação de correção eletiva devido ao risco de encarceramento. Em meninas, o ovário pode estar no saco. Já a hérnia umbilical assintomática frequentemente fecha espontaneamente e pode ser observada até perto dos cinco anos, conforme o caso."
     ]
   ],
   "sources": [
     [
       "HerniaSurge · Atualização sobre hérnias da virilha",
       "https://pmc.ncbi.nlm.nih.gov/articles/10588975/"
     ],
     [
       "American College of Surgeons · Hérnia umbilical pediátrica",
       "https://www.facs.org/for-patients/the-day-of-your-surgery/pediatric-umbilical-hernia/"
     ]
   ]
 },
 "Pancreatite": {
   "overview": "Pancreatite aguda é diagnosticada com dois de três critérios: dor típica, lipase ou amilase pelo menos três vezes acima do limite superior ou imagem compatível. A forma crônica envolve dano progressivo e pode cursar com dor recorrente, insuficiência exócrina e diabetes.",
   "points": [
     [
       "Conduta inicial na forma aguda",
       "Analgesia, hidratação com cristaloide ajustada à resposta e alimentação oral precoce conforme tolerância são medidas centrais. Jejum prolongado e antibióticos profiláticos não são rotina. Ultrassom investiga causa biliar. Tomografia precoce fica reservada à dúvida diagnóstica ou evolução que exija investigação."
     ],
     [
       "Origem biliar e via biliar",
       "Colangite concomitante muda a conduta e indica CPRE precoce. Na pancreatite biliar leve, programe colecistectomia na mesma internação quando possível. Colangiografia intraoperatória avalia a via biliar durante a cirurgia. Considere probabilidade de cálculo residual ao escolher entre colangiografia, exames não invasivos e CPRE terapêutica."
     ],
     [
       "Complicações locais e forma crônica",
       "Pseudocisto é uma coleção encapsulada predominantemente líquida. Necrose delimitada pode conter detritos sólidos. Considere evolução, sintomas e infecção para decidir intervenção. Dor epigástrica recorrente irradiada para dorso, álcool e enzimas normais favorecem pancreatite crônica entre as alternativas do ENAMED. TC ou RM ajudam a confirmar alterações estruturais."
     ]
   ],
   "sources": [
     [
       "American College of Gastroenterology · Pancreatite aguda",
       "https://pmc.ncbi.nlm.nih.gov/articles/PMC13221274/"
     ],
     [
       "American College of Gastroenterology · Pancreatite crônica",
       "https://doi.org/10.14309/AJG.0000000000000535"
     ],
     [
       "International Association of Pancreatology · Diretriz 2025",
       "https://doi.org/10.1016/j.pan.2025.04.020"
     ]
   ]
 },
 "Medidas de associação": {
   "overview": "Escolha a medida conforme o desenho e os denominadores. Em tabelas 2×2, confira quem é exposto, qual é o desfecho e qual categoria é a referência antes de calcular.",
   "points": [
     [
       "Risco relativo, odds ratio e prevalência",
       "Se a tabela tem expostos com e sem desfecho (a, b) e não expostos com e sem desfecho (c, d), o risco relativo é [a/(a+b)] ÷ [c/(c+d)]. Para dados transversais, a mesma divisão, com prevalências, produz a razão de prevalências. Em caso-controle, o odds ratio (razão de chances) é ad/bc. Com desfecho comum, interprete odds e risco como medidas distintas."
     ],
     [
       "Intervalo de confiança e direção",
       "Para razões, o valor nulo é 1. Um IC95% que inclui 1 não demonstra associação estatística ao nível de 5% no teste correspondente. Isso ainda permite efeitos compatíveis com o intervalo. Valor acima de 1 sugere associação positiva e abaixo de 1, inversa, conforme a categoria de referência."
     ],
     [
       "Leitura crítica nas questões",
       "Para tabelas sobre variantes genéticas, enchentes e bullying, leia cada desfecho e seu intervalo separadamente. Uma razão de 1,30 corresponde a 30% de aumento relativo, não a 30 pontos percentuais. Para diferenças absolutas, o valor nulo é 0. Confundimento, viés de seleção e precisão do intervalo importam antes de interpretar causalidade."
     ]
   ],
   "sources": [
     [
       "CDC · Análise e interpretação de medidas epidemiológicas",
       "https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html"
     ]
   ]
 },
 "Abdome agudo": {
  overview:"Dor abdominal aguda exige avaliar estabilidade, peritonismo e sinais de obstrução. Classifique a suspeita em inflamatória, obstrutiva, perfurativa, vascular ou hemorrágica, sem esquecer causas ginecológicas e metabólicas.",
  points:[["Pistas do enunciado","Migração da dor para a fossa ilíaca direita sugere apendicite. Distensão com vômitos e parada de flatos sugere obstrução. Dor desproporcional ao exame sugere isquemia mesentérica. Rigidez e dor à descompressão sugerem irritação peritoneal."],["Exames e prioridade","Ultrassom é útil na suspeita biliar ou pélvica. Considere teste de gravidez quando aplicável. A tomografia com contraste ajuda a identificar complicações em pacientes estáveis. Instabilidade, peritonite difusa ou suspeita de isquemia exigem avaliação cirúrgica urgente, em paralelo à estabilização."],["As alternativas nas provas","Compare analgesia e observação, antibiótico e controle do foco, e indicação de cirurgia. Em obstrução, avalie sinais de alça fechada ou estrangulamento. Na dor pélvica abrupta, considere torção anexial e gestação ectópica. Pancreatite biliar e porfiria aguda ilustram mecanismos distintos de dor intensa."],["Úlcera perfurada e sinais peritoneais","Úlcera péptica pode perfurar, com dor epigástrica súbita, rigidez, defesa involuntária e descompressão brusca dolorosa (irritação do peritônio). Náuseas e vômitos, inclusive biliosos, podem ocorrer por estímulo visceral e íleo reflexo; isoladamente não indicam obstrução."],["Imagem na suspeita de perfuração","O pneumoperitônio pode aparecer como ar livre subdiafragmático na radiografia de tórax em ortostatismo; ausência de ar livre não exclui perfuração. A tomografia computadorizada é geralmente o exame mais sensível/preferencial quando disponível, mas não deve retardar avaliação cirúrgica urgente com peritonite. Endoscopia não é exame inicial de rotina em suspeita de perfuração livre."],["Manejo inicial","Avaliar perfusão, sinais vitais e sepse; jejum, acesso venoso, analgesia, hidratação conforme quadro, exames laboratoriais e avaliação cirúrgica imediata. Em perfuração gastroduodenal suspeita ou confirmada, considerar antibioticoterapia de amplo espectro, IBP e controle cirúrgico do foco conforme indicação. Entre as alternativas da questão 53 do NIEPAEM 2026.1, a radiografia de tórax e abdome em ortostatismo é a melhor opção."]],
  sources:[["Merck Manual · Dor abdominal aguda","https://www.merckmanuals.com/professional/gastrointestinal-disorders/acute-abdomen-and-surgical-gastroenterology/acute-abdominal-pain"],["WSES · Úlcera péptica perfurada e hemorrágica (2020)","https://pmc.ncbi.nlm.nih.gov/articles/PMC6947898/"]]
 },
 "Artrites": {
  overview:"Artrite envolve inflamação articular demonstrável. O raciocínio parte do número de articulações, velocidade de início, padrão simétrico ou assimétrico e sinais sistêmicos.",
  points:[["Monoartrite aguda","Articulação quente com derrame exige considerar artrite séptica. A artrocentese permite pesquisar células, cristais, Gram e cultura. Cristais podem coexistir com infecção. Suspeita alta exige avaliação urgente para antibiótico e drenagem."],["Poliartrite e entesite","Poliartrite de pequenas articulações com rigidez matinal prolongada sugere artrite reumatoide. Anti-CCP ajuda na avaliação, mas depende do contexto clínico. Entesite e manifestações cutâneas ou oculares podem direcionar para espondiloartrites."],["Mecânica versus inflamatória","Osteoartrite costuma ter dor relacionada à carga, rigidez breve e líquido pouco inflamatório. Gota e deposição de pirofosfato podem causar inflamação súbita; a análise de cristais ajuda a distinguir."]],
  sources:[["EULAR · Artrite inicial","https://ard.bmj.com/content/76/6/948"],["Merck Manual · Artrite infecciosa aguda","https://www.merckmanuals.com/professional/musculoskeletal-and-connective-tissue-disorders/infections-of-joints-and-bones/acute-infectious-arthritis"]]
 },
 "Antibioticoterapia": {
  overview:"A decisão de usar antibiótico depende da probabilidade de infecção bacteriana, do foco, da gravidade e do risco de resistência. Diferencie tratamento empírico, tratamento dirigido e profilaxia.",
  points:[["Escolha empírica","Considere foco, flora esperada, aquisição comunitária ou hospitalar, culturas prévias, alergias e função renal. Na sepse grave, a rapidez é decisiva. Colha amostras quando isso não atrasar a terapia e avalie controle do foco."],["O que a banca costuma trocar","Profilaxia perioperatória busca níveis adequados no momento da incisão; tratamento de infecção instalada tem objetivo e duração diferentes. Em infecção abdominal, pense em enterobactérias, anaeróbios e drenagem quando indicada."],["Reavaliação","Reavalie resposta e microbiologia para estreitar espectro, ajustar duração ou suspender se outro diagnóstico se tornar mais provável. Via oral ou intravenosa depende da gravidade, absorção, foco e antibiótico."]],
  sources:[["OMS · Classificação AWaRe","https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.04"],["SCCM · Diretriz de sepse","https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026"]]
 },
 "Anemias": {
  overview:"Interprete hemoglobina segundo idade, sexo e gestação. Use o VCM para descrever o tamanho das hemácias e os reticulócitos para estimar a resposta medular.",
  points:[["Microcitose e ferro","Ferritina baixa favorece deficiência de ferro. Inflamação pode elevar a ferritina e dificultar a interpretação. Microcitose desproporcional à anemia, com contagem de hemácias relativamente alta, favorece traço talassêmico. Investigue a causa da perda ou da baixa oferta de ferro."],["Hemólise ou produção reduzida","Reticulocitose, LDH e bilirrubina indireta elevadas e haptoglobina baixa sugerem hemólise. Coombs direto ajuda quando há suspeita de hemólise imune. Reticulócitos baixos ou inadequados sugerem produção insuficiente, inclusive na deficiência de B12 ou na crise aplástica da doença falciforme."],["Contextos de prova","Na gestação, considere hemodiluição e deficiência de ferro; anemia fetal é investigação distinta, com Doppler da artéria cerebral média em gestação de risco. Indicação e preparo da transfusão dependem do quadro clínico e de antecedentes transfusionais."]],
  sources:[["Merck Manual · Avaliação da anemia","https://www.merckmanuals.com/professional/hematology-and-oncology/approach-to-the-patient-with-anemia/evaluation-of-anemia"]]
 },
 "Aneurismas": {
  overview:"Aneurisma é dilatação arterial localizada. Localização, tamanho, crescimento, morfologia e sintomas orientam acompanhamento e reparo. Aneurismas de aorta e intracranianos exigem critérios próprios.",
  points:[["Aorta abdominal","Ultrassom é útil no rastreamento de grupos selecionados e na vigilância. A periodicidade depende do diâmetro. A angiotomografia define anatomia quando se planeja reparo ou se investiga complicação em paciente estável."],["Ruptura e reparo","Dor abdominal ou lombar súbita com choque sugere ruptura. A suspeita exige avaliação vascular urgente. Na prova, diferencie vigilância de aneurisma estável, avaliação de lesão sacular e repercussão aguda. A indicação e a via de reparo dependem da anatomia, do risco e da apresentação."],["Intracraniano","Cefaleia abrupta de intensidade máxima em segundos ou minutos levanta suspeita de hemorragia subaracnóidea. Seu fluxo de investigação é distinto do rastreamento aórtico."]],
  sources:[["ACC/AHA · Doença da aorta","https://pmc.ncbi.nlm.nih.gov/articles/PMC9876736/"],["AHA · Hemorragia subaracnóidea aneurismática","https://doi.org/10.1161/STR.0000000000000436"]]
 },
 "Tromboembolismo venoso": {
  overview:"Trombose venosa profunda e embolia pulmonar são apresentações relacionadas. Estase, lesão endotelial e hipercoagulabilidade ajudam a entender fatores de risco.",
  points:[["Suspeita e escolha do teste","Edema unilateral favorece TVP. Dispneia súbita, dor pleurítica ou síncope podem indicar embolia pulmonar. Combine probabilidade pré-teste com dímero-D quando apropriado. Probabilidade alta geralmente exige imagem diretamente."],["Exames e conduta","Ultrassom compressivo avalia TVP. Angiotomografia pulmonar é usada em suspeita de embolia pulmonar conforme o cenário. Instabilidade altera a urgência e a abordagem. Na gestação, siga algoritmo próprio e considere ultrassom se houver sinais de TVP."]],
  sources:[["American Society of Hematology · Diagnóstico de TEV","https://www.hematology.org/resources/clinical-practice-guidelines/venous-thromboembolism-guidelines/diagnosis"]]
 },
 "Doenças renais": {
  overview:"A avaliação renal combina creatinina, diurese, urina e contexto. Diferencie alterações recentes da doença persistente e reconheça padrões glomerulares.",
  points:[["Agudo ou crônico","Compare creatinina atual e prévia e acompanhe diurese. Na lesão aguda, avalie perfusão, nefrotóxicos e obstrução. Doença renal crônica requer alterações estruturais ou funcionais por pelo menos três meses e é classificada por taxa de filtração e albuminúria."],["Nefrítica e nefrótica","Hematúria glomerular, hipertensão e queda de filtração favorecem síndrome nefrítica. Proteinúria importante, hipoalbuminemia e edema favorecem síndrome nefrótica. O padrão guia exames e investigação etiológica."]],
  sources:[["KDIGO · Avaliação e manejo da doença renal crônica","https://kdigo.org/guidelines/ckD-Evaluation-and-Management/"]]
 },
 "Amenorreia": {
   "overview": "Amenorreia é a ausência de menstruação. Investigue a forma primária se não houve menarca aos 15 anos com desenvolvimento sexual secundário normal. Na secundária, investigue após mais de três meses sem menstruar se os ciclos eram regulares, ou seis meses se eram irregulares.",
   "points": [
     [
       "Primeiro passo",
       "Exclua gestação quando biologicamente possível. Na amenorreia secundária, história, exame, TSH, prolactina e FSH orientam a avaliação. Estradiol baixo com FSH alto aponta para insuficiência ovariana. FSH baixo ou inadequadamente normal sugere causa hipotalâmica ou hipofisária."
     ],
     [
       "Amenorreia primária e anatomia",
       "Mamas desenvolvidas com útero ausente levantam duas hipóteses frequentes nas provas. Na síndrome de Rokitansky, os ovários funcionam e a pilificação costuma ser normal. Na insensibilidade completa aos andrógenos, a pilificação pubiana costuma ser escassa e a testosterona está na faixa masculina."
     ],
     [
       "Puberdade e prolactina",
       "Puberdade incompleta com FSH alto sugere disgenesia gonadal, como Turner. Gonadotrofinas baixas com anosmia sugerem Kallmann. Na amenorreia secundária com cefaleia ou alteração visual, investigue causa hipofisária. Restrição energética, exercício intenso e estresse podem causar supressão hipotalâmica."
     ]
   ],
   "sources": [
     [
       "ASRM — avaliação da amenorreia",
       "https://www.asrm.org/practice-guidance/practice-committee-documents/current-evaluation-of-amenorrhea/"
     ]
   ]
 },
 "Reanimação neonatal": {
   "overview": "Na sala de parto, avalie respiração, tônus e frequência cardíaca. Mantenha a temperatura e posicione a via aérea. A ventilação eficaz é a intervenção que costuma elevar a frequência cardíaca no recém-nascido que precisa de reanimação.",
   "points": [
     [
       "Quando ventilar",
       "Apneia, gasping ou frequência cardíaca abaixo de 100/min após as medidas iniciais indicam ventilação com pressão positiva. Em recém-nascidos a termo, comece com ar ambiente e ajuste o oxigênio pela saturação pré-ductal e pelo protocolo."
     ],
     [
       "Ventilação antes das compressões",
       "Se a frequência não sobe, confira expansão torácica, vedação da máscara e posição da cabeça. Se continuar abaixo de 60/min após 30 segundos de ventilação eficaz, inicie compressões sincronizadas na relação 3:1 e assegure via aérea adequada."
     ],
     [
       "Como decidir o próximo passo",
       "Nas questões sobre dispositivos, veja se máscara está ventilando bem ou se é preciso uma via aérea alternativa. Com respiração espontânea adequada e frequência acima de 100/min, pode-se suspender a ventilação e reavaliar a oxigenação e o esforço respiratório."
     ]
   ],
   "sources": [
     [
       "AHA/AAP — diretriz neonatal 2025",
       "https://publications.aap.org/pediatrics/article/157/1/e2025074352/205237/Part-5-Neonatal-Resuscitation-2025-American-Heart"
     ]
   ]
 },
 "Incontinência urinária": {
   "overview": "Separe perda com aumento da pressão abdominal, perda acompanhada de urgência e perda associada à retenção. História, exame, teste de urina e diário miccional ajudam a caracterizar o padrão.",
   "points": [
     [
       "Esforço, urgência e forma mista",
       "Perda ao tossir, espirrar ou fazer exercício sugere incontinência de esforço. Desejo súbito difícil de adiar, com frequência e noctúria, sugere bexiga hiperativa. Na forma mista, trate primeiro o componente predominante."
     ],
     [
       "Tratamento inicial",
       "Na incontinência de esforço ou mista, ofereça treinamento supervisionado do assoalho pélvico por pelo menos três meses, inclusive quando indicado no puerpério. Na urgência, o treinamento vesical é uma medida inicial. Avalie medicamentos e causas reversíveis no idoso."
     ],
     [
       "Quando considerar sling",
       "O sling pode ser discutido para perda de esforço persistente após manejo conservador, com avaliação dos riscos e opções. Sintomas de esvaziamento incompleto orientam a medir resíduo pós-miccional. O exercício de Kegel deve recrutar o assoalho pélvico."
     ]
   ],
   "sources": [
     [
       "NICE — incontinência urinária e prolapso",
       "https://www.nice.org.uk/guidance/ng123"
     ]
   ]
 },
 "Hipertensão na gestação": {
   "overview": "Hipertensão antes da gestação ou antes de 20 semanas sugere hipertensão crônica. A partir de 20 semanas, diferencie hipertensão gestacional de pré-eclâmpsia avaliando proteinúria, disfunção materna e sinais de comprometimento uteroplacentário.",
   "points": [
     [
       "Pré-eclâmpsia sem proteinúria",
       "Hipertensão nova associada a disfunção renal, hepática, hematológica ou neurológica pode preencher critérios mesmo sem proteinúria. Cefaleia persistente, alteração visual, dor epigástrica e hipertensão grave exigem avaliação urgente. Restrição do crescimento e Doppler ajudam na avaliação fetal."
     ],
     [
       "Gravidade e parto",
       "Hipertensão grave exige controle pressórico urgente. Sulfato de magnésio previne e trata convulsões eclâmpticas quando indicado. Estabilize a gestante e avalie idade gestacional, gravidade e condições fetais para decidir o momento e a via do parto. Na pré-eclâmpsia a termo, costuma-se indicar o parto."
     ],
     [
       "Prevenção",
       "Para gestantes de alto risco, vale reconhecer a indicação de AAS em baixa dose iniciado precocemente conforme protocolo. A indicação de cálcio segue a diretriz local. Na questão, diferencie prevenção de tratamento de doença estabelecida."
     ]
   ],
   "sources": [
     [
       "ISSHP — classificação, diagnóstico e manejo",
       "https://isshp.org/wp-content/uploads/2023/09/ISSHP-2021-guidelines.pdf"
     ]
   ]
 },
 "Infecção urinária": {
   "overview": "Disúria e polaciúria sem manifestação sistêmica favorecem cistite. Febre, dor lombar ou repercussão geral favorecem pielonefrite. Gestação, obstrução e instabilidade mudam a investigação e o manejo.",
   "points": [
     [
       "Coleta e gravidade",
       "Em pielonefrite, gestação ou criança febril, obtenha urina para cultura, de preferência antes do antibiótico quando isso não atrasar o atendimento. A escolha empírica considera gravidade, resistência local e penetração renal. Na suspeita de pielonefrite na gestação, a avaliação inicial costuma ser hospitalar."
     ],
     [
       "Obstrução infectada",
       "Febre ou sepse com via urinária obstruída exige avaliação urológica urgente para drenagem, junto com antibiótico. O cateter duplo J ou a nefrostomia tratam a obstrução conforme o cenário."
     ],
     [
       "Imagem na infância",
       "Ultrassom avalia anatomia e dilatação. Cintilografia DMSA tardia pode avaliar cicatriz renal em casos selecionados, e a uretrocistografia pesquisa refluxo quando indicada. Idade, recorrência, evolução e agente não E. coli influenciam quais exames pedir."
     ]
   ],
   "sources": [
     [
       "NICE — ITU em menores de 16 anos",
       "https://www.nice.org.uk/guidance/ng224"
     ]
   ]
 },
 "Colelitíase e coledocolitíase": {
   "overview": "Cálculos na vesícula podem causar cólica biliar ou colecistite. Cálculo no colédoco pode causar colestase, colangite ou pancreatite. Dor persistente, inflamação e alterações das provas hepáticas ajudam a localizar a complicação.",
   "points": [
     [
       "Colecistite",
       "Dor persistente em hipocôndrio direito e sinais inflamatórios favorecem colecistite. Ultrassom é o exame inicial usual. Em pacientes operáveis, a colecistectomia precoce é o tratamento de referência. No paciente crítico com alto risco operatório ou colecistite alitiásica, pode-se indicar drenagem da vesícula."
     ],
     [
       "Colédoco e CPRE",
       "Na probabilidade intermediária de cálculo no colédoco, colangiorressonância ou ecoendoscopia ajudam a confirmar. Indícios de alto risco, como cálculo visto em imagem ou colangite, podem indicar CPRE terapêutica. Após bypass gástrico, a anatomia pode tornar necessária uma via alternativa."
     ],
     [
       "Antibiótico e controle do foco",
       "Após colecistectomia com controle adequado do foco em quadro não complicado, evite prolongar antibiótico por rotina. Na colangite, antibiótico e drenagem biliar têm funções complementares."
     ]
   ],
   "sources": [
     [
       "ASGE — avaliação endoscópica da coledocolitíase",
       "https://www.guidelinecentral.com/guideline/9442/"
     ]
   ]
 },
 "Climatério e menopausa": {
   "overview": "Climatério é a transição reprodutiva. Em pessoas com mais de 45 anos e quadro típico, o diagnóstico costuma ser clínico. Menopausa natural é reconhecida retrospectivamente após 12 meses sem menstruação, quando o padrão pode ser interpretado.",
   "points": [
     [
       "Fogachos e terapia sistêmica",
       "A terapia hormonal sistêmica é uma opção eficaz para sintomas vasomotores. Na presença de útero, associe proteção endometrial com progestagênio. Escolha via e esquema conforme risco e preferência. A via transdérmica costuma ser preferida quando há risco aumentado de tromboembolismo."
     ],
     [
       "Câncer de mama e opções não hormonais",
       "Antecedente de câncer de mama exige avaliação individualizada. Para fogachos, considere estratégias não hormonais; em uso de tamoxifeno, confira possíveis interações ao escolher antidepressivos."
     ],
     [
       "Sintomas geniturinários",
       "Secura, dispareunia e sintomas urinários podem responder a hidratantes, lubrificantes e, quando apropriado, estrogênio vaginal. Em quem teve câncer de mama, discuta sintomas persistentes e opções com a equipe assistente. Sangramento pós-menopausa requer avaliação."
     ]
   ],
   "sources": [
     [
       "NICE — identificação e manejo da menopausa",
       "https://www.nice.org.uk/guidance/ng23"
     ]
   ]
 },
 "Prematuridade": {
   "overview": "Parto prematuro ocorre antes de 37 semanas completas. Diferencie contrações sem modificação cervical, trabalho de parto prematuro, insuficiência cervical e ruptura prematura de membranas.",
   "points": [
     [
       "Colo curto, história e cerclagem",
       "Comprimento cervical por ultrassom transvaginal e história obstétrica ajudam a estratificar risco. Progesterona e cerclagem têm indicações específicas. Dilatação indolor no segundo trimestre sugere insuficiência cervical. Antes de cerclagem de emergência, avalie infecção, trabalho de parto e condições das membranas."
     ],
     [
       "Preparo para nascimento prematuro",
       "Quando há risco de nascimento dentro da janela indicada, corticosteroide antenatal favorece maturação fetal e sulfato de magnésio pode ser indicado para neuroproteção. Tocólise pode ganhar tempo para essas intervenções ou transferência quando segura."
     ],
     [
       "Antibióticos e contraindicações",
       "Diferencie profilaxia intraparto para estreptococo do grupo B e antibiótico de latência na ruptura pré-termo de membranas. Infecção intra-amniótica ou comprometimento materno-fetal pode exigir parto em vez de tentar prolongar a gestação."
     ]
   ],
   "sources": [
     [
       "NICE — trabalho de parto prematuro e nascimento",
       "https://www.nice.org.uk/guidance/ng25"
     ]
   ]
 },
 "Delirium": {
   "overview": "Delirium é uma alteração aguda e flutuante da atenção e da consciência, geralmente desencadeada por doença, intervenção ou medicamento. Pode ocorrer sobre demência prévia.",
   "points": [
     [
       "Reconhecimento",
       "Compare com o estado basal relatado pela família e procure desatenção, oscilação e mudança em horas ou dias. O subtipo hipoativo pode se apresentar com lentificação e sonolência. O hiperativo costuma ter inquietação ou agitação. O 4AT apoia a avaliação em enfermaria."
     ],
     [
       "Causas cobradas",
       "Revise hipóxia, infecção, dor, desidratação, alterações metabólicas, retenção urinária, constipação e medicamentos. Na pessoa com confusão aguda e globo vesical, retenção urinária é uma causa tratável a investigar."
     ],
     [
       "Manejo",
       "Trate a causa e oriente com relógio, calendário, óculos, aparelhos auditivos, mobilização e rotina de sono. Medicamentos para agitação ficam reservados a situações selecionadas com sofrimento ou risco e após tentativa de medidas não farmacológicas. Benzodiazepínicos têm indicações específicas, como abstinência alcoólica."
     ]
   ],
   "sources": [
     [
       "NICE — prevenção, diagnóstico e manejo do delirium",
       "https://www.nice.org.uk/guidance/cg103"
     ]
   ]
 },
 "Doença falciforme": {
   "overview": "A hemoglobina S pode polimerizar sob desoxigenação, levando a hemólise e vaso-oclusão. Traço falciforme é condição heterozigótica e tem perfil clínico diferente da doença. Na triagem neonatal, o padrão FAS é compatível com traço.",
   "points": [
     [
       "Crise dolorosa, febre e tórax agudo",
       "Faça analgesia e investigue desencadeantes e complicações. Febre com dor óssea localizada pede avaliação de osteomielite, considerando Salmonella e Staphylococcus aureus. Novo infiltrado pulmonar com febre ou sintomas respiratórios sugere síndrome torácica aguda e exige avaliação rápida."
     ],
     [
       "Queda de hemoglobina e reticulócitos",
       "Queda brusca da hemoglobina com reticulocitopenia sugere crise aplástica, frequentemente por parvovírus B19. Sequestro esplênico associa aumento agudo do baço e costuma ter resposta reticulocitária preservada."
     ],
     [
       "Transfusão e compatibilidade",
       "Planeje compatibilidade antigênica ampliada para reduzir aloimunização. Na síndrome torácica aguda grave, a troca transfusional pode ser indicada. Reação alérgica grave prévia é informação essencial para selecionar o hemocomponente com a hemoterapia."
     ]
   ],
   "sources": [
     [
       "ASH — suporte transfusional na doença falciforme",
       "https://ashpublications.org/bloodadvances/article/4/2/327/440607/American-Society-of-Hematology-2020-guidelines-for"
     ]
   ]
 }
};
