# Atlas Med — Banco de Questões de Medicina

**Site:** https://ige-app.github.io/atlas-med/  
**Código:** https://github.com/ige-app/atlas-med

O Atlas Med é uma plataforma de estudo de questões de provas reais, organizada por **módulo, tema, instituição, ano e semestre**, com links às fontes e histórico no navegador.

## Acervo (21/11/2026)

| Edição | Classificadas | Situação |
|---|---:|---|
| ENAMED 2025 | 100/100 | Questões reescritas com quatro alternativas, PDF oficial e gabarito definitivo; 90 pontuáveis |
| ENAMED 2026 | 100/100 | Questões reescritas e comentadas, gabarito **preliminar** até a publicação do definitivo, prevista para 04/12/2026 |
| USP FMUSP 2024 A1 | 30/120 | Índice por módulo com acesso à fonte |
| NIEPAEM 2025.1 | 5/120 | Questões com alternativas e comentário editorial; fonte secundária |
| NIEPAEM 2025.2 | 8/120 | Questões com alternativas e comentário editorial; fonte secundária |
| **NIEPAEM 2026.1** | **120/120** | **Gabarito comentado da banca**, classificação e explicações próprias; sem enunciado integral no repositório |
| **NIEPAEM 2026.2** | **120/120** | **Gabarito comentado da banca**, classificação e explicações próprias; sem enunciado integral no repositório |
| **TOTAL** | **483 registros** | **213** com alternativas respondíveis; **240** registros NIEPAEM 2026 para consulta do gabarito e explicação, sem simular tentativas |

Há **39 referências** de portais, cadernos e gabaritos. Não confundir uma edição catalogada com a prova totalmente importada.

## PDFs NIEPAEM 2026 — recebidos da usuária

Os seguintes documentos foram lidos e utilizados **apenas como fonte de conferência das letras e dos temas**, sem publicar suas páginas no GitHub:

- **TP_NIEPAEM_2026.1_COMENTARIOS.pdf**: 27 páginas, prova de **13/05/2026**; 120 respostas comentadas, com bibliografia.
- **TP_NIEPAEM_2026.2_COMENTARIOS.pdf**: 29 páginas, prova de **24/09/2026**; 120 respostas comentadas, com bibliografia.

Os PDFs afirmam expressamente **“Direitos autorais reservados. Proibida a reprodução, ainda que parcial, sem autorização prévia.”** Por isso, o site contém somente:
- categoria da banca original (GO, SC, CM, CIR ou PED), classificação de módulo/assunto e gabarito;
- uma **síntese editorial original** dos pontos médicos principais, não uma transcrição do comentário;
- referência à **página específica** do documento privado, para conferência.

**O PDF comentado não foi publicado nem incorporado aos arquivos do site público.** Para consultá-lo no próprio Atlas Med, acesse uma questão NIEPAEM 2026 → **Ver gabarito e comentário** → **Carregar PDF comentado** e selecione o arquivo do respectivo semestre **no seu próprio computador**. O arquivo é aberto localmente pelo navegador, sem envio ao GitHub/servidor. O visualizador tentará abrir na página do comentário da questão. Você precisa selecionar o PDF novamente após atualizar a página.

As **120 letras de cada semestre** foram conferidas diretamente nos PDFs recebidos, mas essas fontes **não são os cadernos de enunciados com alternativas**. Por isso, as 240 questões de 2026 são exibidas como *gabarito consultável*, **sem botão de resposta A–D nem contabilização de desempenho**. Para habilitar resolução interativa fiel será necessário também dispor dos cadernos e conferir o número das questões e a ordem de alternativas.

Caderno NIEPAEM 2026.1 encontrado em [Scribd](https://pt.scribd.com/document/1070216313/Tp-Niepaem-2026-1-Prova), porém a plataforma de terceiros pode exigir autenticação. O caderno 2026.2 não foi incorporado.

## Como estudar

1. Selecione a instituição **NIEPAEM**, o ano **2026–2026** e o semestre **1º** ou **2º**.
2. Escolha um módulo (ex.: Obstetrícia, Cardiologia, Cirurgia Geral) ou deixe **Todos**.
3. Clique em **Ver gabarito e comentário** para consultar a letra da banca e a síntese explicativa.
4. Se já tiver o PDF comentado, carregue-o no visualizador **local** para ler a resolução integral da banca em seu próprio dispositivo.

Para **ENAMED 2025/2026**, use **Abrir e responder**: há enunciados e alternativas em redação editorial, correção automática, favoritos e estatísticas salvas localmente.

## Alertas de verificação

- **ENAMED 2026:** só gabarito preliminar, sujeito a recursos e eventual anulação. Confirmar nova versão oficial em 04/12/2026 antes de remover alertas.
- **NIEPAEM 2025:** primeiras 13 questões disponíveis com base em gabaritos comentados compartilhados por terceiros, não validados contra arquivo fornecido pela banca neste chat.
- **NIEPAEM 2026:** as letras foram extraídas dos gabaritos comentados enviados; as sínteses e classificações por especialidade são editoriais e podem ser refinadas mediante conferência dos cadernos completos.
- Para questões com imagens/tabelas, usar a fonte original; nenhum conteúdo de imagem de terceiros foi copiado para o repositório.

## Arquivos

- `index.html`, `styles.css`, `app.js`: aplicação estática, filtros, correção e leitor de PDF local.
- `data/indices.json`: ENAMED 2025/2026, USP 2024 e primeiros lotes NIEPAEM 2025.
- `data/niepaem-2026-1.json`, `data/niepaem-2026-2.json`: 120 respostas e explicações editoriais por edição.
- `data/provas.json`: catálogo de fontes.
- `data/questoes.json`: questões de texto integral autorizado, ainda vazio.
- `scripts/validar.mjs`: verificação de consistência; executada automaticamente pelo GitHub Actions.

## Desenvolvimento local

```bash
python3 -m http.server 8080
node --check app.js
node scripts/validar.mjs
```

O GitHub Pages publica a branch `main`, pasta `/(root)`. Respostas e favoritos ficam no armazenamento local do navegador e **não são sincronizados**.
