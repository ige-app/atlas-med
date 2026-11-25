"use strict";
// Registro público das sessões de estudo feitas com o ChatGPT e confirmadas no diálogo.
// Somente questões efetivamente respondidas entram no aproveitamento.
// Para novas sessões, acrescente registros aqui depois de confirmar a resposta do estudante.
const chatStudySessions = [
  {id:"niepaem-2026-1-q053",date:"2026-11-22",bank:"NIEPAEM",exam:"NIEPAEM 2026.1",number:53,topic:"Abdome agudo",answer:"C",correct:true,source:"ChatGPT",summary:true},
  {id:"niepaem-2026-1-q005",date:"2026-11-22",bank:"NIEPAEM",exam:"NIEPAEM 2026.1",number:5,topic:"Hipocalcemia e hipoparatireoidismo",answer:"B",correct:false,source:"ChatGPT",summary:true},
  {id:"niepaem-2026-1-q003",date:"2026-11-23",bank:"NIEPAEM",exam:"NIEPAEM 2026.1",number:3,topic:"Dengue",answer:"D",correct:true,source:"ChatGPT",summary:true},
  {id:"niepaem-2026-1-q033",date:"2026-11-24",bank:"NIEPAEM",exam:"NIEPAEM 2026.1",number:33,topic:"Asma",answer:"B",correct:true,source:"ChatGPT",summary:true}
];
// A pergunta adicional de fixação da primeira aula não é uma questão do banco;
// por isso não entra no total de questões reais resolvidas.
