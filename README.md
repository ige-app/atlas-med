# Atlas Med — Questões reais de Medicina

Site: **https://ige-app.github.io/atlas-med/**  
Repositório: **https://github.com/ige-app/atlas-med**

O Atlas Med reúne referências de questões de provas oficiais de residência e avaliação médica. A organização é por **módulo → tema → banca → ano**, para estudar apenas o conteúdo do módulo que você está cursando.

## Situação real do projeto

| Acervo | Registros |
|---|---:|
| USP FMUSP 2024 — Caderno A1 | 30 questões indexadas por assunto, com gabaritos (consultáveis no PDF original) |
| ENAMED 2025 — Caderno 01 | 30 questões indexadas; 25 com resposta pontuável + 5 anuladas/excluídas |
| Total indexado | **60 questões reais** |
| Questões com enunciado e alternativas reescritos no site | **3 do ENAMED 2025** (números 1, 4 e 8) |
| Fontes e portais catalogados | **22 registros** |

**Não estão disponíveis ainda todas as questões de 2025–2026, nem todas as edições das outras bancas.** Não há questões de treino inventadas.

## Como responder

1. Acesse o site e escolha uma especialidade (por exemplo, Ginecologia), o intervalo de anos e a banca.
2. Abra uma questão do **ENAMED 2025**.
3. O PDF do Inep aparece no painel esquerdo, na página correspondente à questão. Caso o navegador bloqueie o visualizador, use o link “Abrir PDF em outra aba”.
4. No painel direito, marque a alternativa **A, B, C ou D** e pressione **Corrigir resposta**.
5. O aplicativo mostra a resposta segundo o **gabarito definitivo**, registra seu desempenho e permite responder novamente. O registro fica somente no armazenamento local do navegador, não sincronizado entre dispositivos.

Algumas questões possuem uma **redação resumida e reescrita**, com alternativas correspondentes à questão real. Esses resumos estão explicitamente identificados; a formulação integral e as imagens permanecem disponíveis no PDF original, sem substituir a fonte.

**Questões anuladas ou excluídas:** estão marcadas e podem ser consultadas, mas **não contam como acerto nem como erro**. A questão 10 do ENAMED 2025 foi anulada administrativamente.

## Fontes do primeiro lote ENAMED 2025

- [Caderno oficial 01 — Inep](https://download.inep.gov.br/enamed/provas_e_gabaritos/2025_caderno_1_preliminar.pdf)
- [Gabarito definitivo (versão 2) — Inep](https://download.inep.gov.br/enamed/provas_e_gabaritos/2025_gabarito_caderno_1_v2.pdf)

O **ENAMED 2026** já tem caderno e gabarito preliminar publicados no [portal do Inep](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enamed/provas-e-gabaritos), mas o gabarito definitivo está previsto para **04/12/2026**; essa edição ainda não foi indexada para correção definitiva.

## Organização dos arquivos

- `index.html`, `app.js`, `styles.css`: interface e resolução.
- `data/indices.json`: questões reais identificadas por número, página, módulo, assunto e gabarito.
- `data/provas.json`: catálogo de provas, cadernos, gabaritos e portais.
- `data/questoes.json`: espaço reservado para questões em formato textual cuja reprodução integral seja autorizada; atualmente vazio.
- `scripts/validar.mjs`: verificador de dados, executado automaticamente pelo GitHub Actions.

## Critérios do banco

- Nunca cadastrar questões fictícias como se fossem de provas anteriores.
- Vincular número, banca, edição, PDF e gabarito.
- Não tratar como "questão resolvida" um mero link de prova.
- Indexar por **área, tema e subtema**, em vez de apenas pelo bloco da prova.
- Verificar as alterações dos gabaritos após recursos.
- Manter a classificação de anulações e exclusões conforme a banca.
- ENARE começou em 2020; ENAMED em 2025; NIEPAEM é teste de progresso, não prova de residência.

## Executar localmente

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

Para validação:

```bash
node --check app.js
node scripts/validar.mjs
```

O site é estático e publicado pelo **GitHub Pages** a partir da branch `main`, diretório raiz. Cada alteração na branch pode disparar uma nova publicação automaticamente.
