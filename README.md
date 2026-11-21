# Atlas Med — Banco de Questões de Medicina

Aplicativo estático de estudo por **especialidade, assunto, banca e ano** para o período **2017–2026**, conforme a disponibilidade das provas.

## Estado atual (primeiro lote)

- **19 referências** de portais de provas e gabaritos (`data/provas.json`).
- **9 questões reais indexadas** por número, tema, subtema, página e gabarito da prova **USP FMUSP 2024, caderno A1** (`data/indices.json`). Os textos dos enunciados **não são reproduzidos**, e cada registro aponta para o PDF e gabarito oficiais.
- **0 questões integrais liberadas para resolução na plataforma** (`data/questoes.json`). Essa seção só será preenchida quando as condições de reprodução forem verificadas.
- Filtros por módulo, instituição, tema, intervalo de anos, busca por palavras-chave; acesso a fontes e gabaritos; estrutura para responder questões e guardar progresso **localmente no navegador**.
- Verificação automática de consistência e origem: `node scripts/validar.mjs`.

**Não confunda** questões indexadas com questões já reproduzidas no site ou provas integralmente importadas. Os 9 registros atuais vieram de um único caderno; 19 links de origem não significam 19 provas processadas.

## Provas contempladas

- **ENAMED**: iniciou-se em 2025.
- **ENARE**: começou em 2020; edições identificadas por ano de ingresso e ano de aplicação.
- **USP (FMUSP)**, **UNESP (FMB)** e **UNIFESP**: residências médicas.
- **NIEPAEM**: *Teste de Progresso* da graduação, não concurso de residência; os cadernos podem exigir credenciais.

A lista de 2017 a 2026 representa o **recorte da pesquisa**, não uma alegação de disponibilidade de todas as edições de todas as instituições.

## Publicação no GitHub Pages (sem Netlify)

Este repositório foi preparado para **publicação estática a partir da pasta raiz**; `index.html` e `.nojekyll` já estão no lugar.

1. Em **Settings → Pages** do repositório, seção **Build and deployment**, escolha **Deploy from a branch**.
2. Escolha a branch **main**, a pasta **/(root)** e clique em **Save**.
3. Depois do deploy, a URL prevista será **https://ige-app.github.io/atlas-med/**. A URL só passará a funcionar quando o GitHub Pages estiver ativado e o deploy tiver concluído.

**Atenção à visibilidade:** em contas GitHub Free, o GitHub Pages é disponibilizado a partir de **repositórios públicos**. O repositório está inicialmente **privado**; caso não haja um plano compatível com Pages privado, primeiro acesse **Settings → General → Danger Zone → Change repository visibility → Public**. Torná-lo público libera a visualização dos arquivos e histórico para qualquer pessoa. Revise o conteúdo antes de fazer isso.

Não é necessário Netlify, npm, banco de dados pago ou compilação para hospedar o projeto nesta fase. O GitHub Pages é hospedagem estática: os dados JSON ficam no próprio repositório, e o histórico de respostas fica no navegador (não sincroniza entre aparelhos).

## Desenvolvimento local

```bash
python3 -m http.server 8080
# Abra http://localhost:8080
```

Não abra `index.html` diretamente com `file://`, pois alguns navegadores impedem carregamento de JSON por `fetch`.

## Curadoria e próximos passos

1. Catalogar edições, cadernos de **acesso direto** e gabaritos *definitivos*, evitando confundir cadernos de pré-requisitos e anos de ingresso/aplicação.
2. Indexar **número da questão → módulo → tema → subtema**, vinculando sempre o PDF e a página originais.
3. Documentar gabaritos retificados, anulações e imagens, sem inventar dados.
4. Só incorporar texto e alternativas de provas quando houver autorização adequada de reprodução; caso contrário, manter índice temático e acesso ao caderno original.
5. Acrescentar mais edições e, depois, criar relatórios de recorrência de assuntos sem inflar as contagens com registros não verificados.

## Qualidade e integridade

Rodar `node scripts/validar.mjs`. O workflow `.github/workflows/validar.yml` também verifica as alterações automaticamente.

O código foi preparado para o GitHub Pages, mas **a publicação precisa ser habilitada nas configurações do repositório**; não é possível inferir que a página já está ao vivo pela existência do código.
