"use strict";

const topicReviewLessons = {
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
   ["Controle e ajuste de tratamento", "Avalie sintomas diurnos e noturnos, uso de resgate, limitação de atividades e exacerbações. Confira técnica inalatória, adesão e comorbidades como rinite antes de subir o degrau. Corticoide inalatório é a base do controle. Broncodilatador de longa duração na asma deve estar associado a corticoide inalatório."],
   ["Exacerbação grave", "Fala entrecortada, esforço importante, hipoxemia ou sonolência indicam gravidade. A abordagem inicial usa broncodilatador de ação rápida, corticoide sistêmico e oxigênio conforme necessidade. Ipratrópio é associado nas crises graves. Magnésio intravenoso pode ser adjuvante nos casos graves com resposta insuficiente ao tratamento inicial, e não é uma infusão contínua de rotina. Anti-histamínico e broncodilatador de longa ação não substituem a abordagem da crise aguda."],
   ["Pegadinhas de diagnóstico e segurança", "Radiografia e IgE específica podem ajudar em perguntas diferentes, mas não confirmam isoladamente a asma. Propranolol e outros betabloqueadores não seletivos podem precipitar broncoespasmo. Deterioração súbita durante uma crise refratária impõe reavaliar ventilação e possíveis complicações, como pneumotórax."]
  ],
  sources: [["GINA · Estratégia de manejo da asma 2025", "https://ginasthma.org/wp-content/uploads/2025/11/GINA-2025-Update-25_11_08-WMS.pdf"]]
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
};
