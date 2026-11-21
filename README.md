# Atlas Med — Banco de Questões de Medicina

Projeto criado para organizar questões de **ENAMED, ENARE, USP, UNESP, UNIFESP e NIEPAEM** por módulo, tema, banca e ano (2017–2026, quando houver edições).

## Situação do acervo
- **0 questões reais importadas**: nenhuma questão é inventada ou atribuída indevidamente a uma banca.
- O sistema começa como uma plataforma funcional de navegação e classificação.
- Textos de cadernos oficiais só devem ser publicados após conferência de origem, gabarito definitivo e condições de reprodução.
- **ENARE** começou em 2020; **ENAMED**, em 2025. **NIEPAEM** é teste de progresso, não uma seleção de residência.

## Arquivos
- `index.html`: interface de estudo estática.
- `data/questoes.json`: registros revisados de questões (inicialmente vazio).
- `data/provas.json`: catálogo de fontes e acervos, com links.
- `netlify.toml`: publicação estática.
- `modelo-questoes.json`: modelo de importação.

## Como testar
Abra o site pelo Netlify ou execute `python3 -m http.server 8080` na raiz, acessando `http://localhost:8080`.

## Publicação
No Netlify: **Add new project → Import an existing project → GitHub → ige-app/atlas-med** e deixe o diretório de publicação como `.`. Não substitua o domínio anterior até conferir o novo deploy.

Este repositório contém inicialmente a **plataforma**, não as provas completas dos últimos dez anos. A curadoria de cada edição e a classificação médica são etapas posteriores.