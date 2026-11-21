# Atlas Med — Banco de Questões de Medicina

**Site:** https://ige-app.github.io/atlas-med/  
**Repositório:** https://github.com/ige-app/atlas-med

O Atlas Med reúne **questões reais**, por instituição, ano, módulo, assunto e semestre, com correção automática quando a resposta foi conferida. Respostas, favoritos e estatísticas são mantidos localmente no navegador.

## Acervo — atualizado em 21/11/2026

| Prova | Registros | Correção |
|---|---:|---|
| **USP FMUSP 2025 — acesso direto A1** | **120/120** | 120 questões pontuáveis; gabarito oficial da Fuvest |
| **USP FMUSP 2026 — acesso direto AD1** | **120/120** | 118 pontuáveis; **54 e 120 anuladas**, segundo gabarito retificado |
| UNESP Botucatu 2025 — acesso direto | 100/100 | 96 pontuáveis; 4 anuladas, retificações oficiais consideradas |
| UNESP Botucatu 2026 — acesso direto | 100/100 | 100 respostas coletadas em fonte secundária, checagem direta na Vunesp pendente |
| ENAMED 2025 — Caderno 01 | 100/100 | 90 pontuáveis, 10 anuladas/excluídas; enunciados e alternativas reescritos |
| ENAMED 2026 — Caderno 01 | 100/100 | Gabarito **preliminar**, sujeito a retificação em 04/12/2026 |
| NIEPAEM 2026.1 | 120/120 | Gabarito da banca + resolução usando PDF local do caderno |
| NIEPAEM 2026.2 | 120/120 | Gabarito da banca + resolução usando PDF local do caderno |
| NIEPAEM 2025.1 | 5/120 | Respostas em fonte secundária |
| NIEPAEM 2025.2 | 8/120 | Respostas em fonte secundária |
| USP FMUSP 2024 — A1 | 30/120 | Temas indexados; texto/alternativas ainda não integrados |
| **Total** | **923 registros** | **877 questões pontuáveis** (inclui respostas preliminares/secundárias sinalizadas) |

O catálogo possui **52 referências** entre provas, gabaritos e portais. Fonte catalogada **não significa** que a prova inteira tenha sido incorporada.

## USP FMUSP 2025 e 2026: cadernos e gabaritos oficiais

As duas seleções da **Faculdade de Medicina da USP, São Paulo (FMUSP)** são diferentes das de **USP Ribeirão Preto** ou **USP Bauru**.

- **2025** — [Caderno A1 oficial](https://www.fuvest.br/wp-content/uploads/2024-12-01_rm2025_prova-areasbasicasedeacessodireto_grupo-a1.pdf), [gabarito A1 da Fuvest de 01/12/2024](https://www.fuvest.br/wp-content/uploads/2024-12-01_rm2025_gabarito-areasbasicasedeacessodireto.pdf), [acervo da seleção](https://www.fuvest.br/acervo-residencia-coreme-sp-2025/).
- **2026** — [Caderno AD1 oficial](https://www.fuvest.br/wp-content/uploads/rm2026-prova-AD1-areasbasicas-acessodireto.pdf), [gabarito AD1 retificado em 15/12/2025](https://www.fuvest.br/wp-content/uploads/rm2026-gabarito-AD-areasbasicas-acessodireto-retificado.pdf), [portal da Fuvest](https://www.fuvest.br/residencia-medica-provas-e-gabarito/).

Ambos os cadernos têm **120 questões de quatro alternativas**. Para a edição de 2026 foram consideradas as **anulações das questões 54 e 120** e as marcações retificadas do gabarito de AD1, incluindo as questões 109, 110 e 114. As versões A2/A3 (2025) e AD2/AD3 (2026) reorganizam o mesmo conjunto de questões; **não são contadas novamente**, para evitar duplicatas.

### O que já funciona

1. Escolher **USP → 2025** ou **USP → 2026** no banco.
2. Clicar em **Abrir e responder** na questão desejada.
3. Visualizar o PDF da Fuvest na mesma tela ou abrir em outra aba; marcar a alternativa **A–D** no painel.
4. Corrigir pelo gabarito oficial, registrar desempenho e favoritar questões.
5. As anuladas são consultáveis, **não entram no cálculo de acertos**.

### Limitações atuais e classificação por módulo

As **240 questões possuem número e gabarito oficial**, mas somente **53** já receberam uma classificação **individual específica por módulo e tema** (39 da edição 2025 e 14 da edição 2026). As demais estão agrupadas explicitamente em **“Acesso direto — classificação pendente”**. Não foram atribuídas a módulos por adivinhação. A meta é identificar as especialidades caso a caso com o caderno original, inclusive para questões que exigem interpretação de imagens.

A **página do PDF indicada no botão é uma estimativa**, não uma referência exata verificada. Se a questão não estiver naquela página, use o PDF em outra aba e procure o número da pergunta. Os enunciados e alternativas **não foram transcritos no repositório público**: são visualizados na prova original. Ainda não há comentários próprios individuais para essas 240 questões.

## NIEPAEM 2026

Dois cadernos completos e dois gabaritos comentados foram fornecidos no chat para **2026.1** e **2026.2**, com 120 itens em cada semestre. A numeração, as letras corretas e as páginas foram integradas ao Atlas Med. **Os quatro PDFs não foram publicados no repositório**, pois o material contém restrição expressa de reprodução. Para viabilizar a leitura completa no site sem redistribuir os arquivos, incorporamos o **PDF.js**, que lê o PDF enviado e extrai enunciados e alternativas no próprio navegador. A cópia do caderno é guardada em **IndexedDB local**, permitindo reutilizá-la após atualizar a página. Existe um botão para apagar a cópia do navegador. Para resolver:

1. Selecione **NIEPAEM → 2026 → 1º ou 2º semestre**, depois o módulo.
2. Clique em **Abrir e responder** e selecione o PDF do caderno **uma vez** no seu dispositivo. Ele será guardado neste navegador, sem upload. O PDF.js extrai localmente **o enunciado e as quatro alternativas** para exibir em texto no painel da questão. A página original, com imagens e gráficos, fica no visualizador.
3. Marque A–D; após correção, aparece o comentário resumido e a opção de abrir o PDF comentado também localmente.

O arquivo fica armazenado **somente neste navegador** e poderá ser reutilizado depois de fechar/reabrir o site, desde que o armazenamento local esteja disponível. Ele não se transfere entre dispositivos; para apagar, use o botão **Apagar cópia privada deste navegador**. Se o PDF não tiver camada textual ou a leitura falhar, o caderno continua no visualizador.

## Outras observações de curadoria

- **ENAMED 2026:** gabarito ainda preliminar; revisar em 04/12/2026.
- **UNESP 2026:** fonte de gabarito secundária; pode exigir cotejo com Vunesp.
- **USP 2024:** há 30 questões classificadas, mas ainda não integradas à resolução.
- **UNESP R+ (Clínica e Cirurgia):** cadernos de 2025 e 2026 já catalogados; faltam respostas individuais.
- **NIEPAEM 2025:** apenas primeiros lotes, não provas completas.
- A classificação e os resumos próprios devem preservar o significado da prova, sem apresentar questões de treino como se fossem originais.

## Estrutura e validação

- `index.html`, `styles.css`, `app.js` e `niepaem-pdf.js`: interface, filtros, transcrição local de PDFs com PDF.js, correção e armazenamento privado IndexedDB.
- `data/indices.json`: questões ENAMED, USP, UNESP e NIEPAEM 2025 com número, módulo, tema, prova e gabarito.
- `data/niepaem-2026-1.json` e `data/niepaem-2026-2.json`: 120 questões cada, com páginas dos cadernos e comentários editoriais.
- `data/provas.json`: catálogo de fontes.
- `scripts/validar.mjs`: regras de integridade e verificação por `GitHub Actions`.

```bash
python3 -m http.server 8080
node --check app.js
node scripts/validar.mjs
```

Hospedado no **GitHub Pages**, branch `main` e pasta raiz.
