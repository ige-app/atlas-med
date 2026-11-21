# Atlas Med — Banco de Questões de Medicina

**Site:** https://ige-app.github.io/atlas-med/  
**Repositório:** https://github.com/ige-app/atlas-med

Banco organizado por **módulo, tema, instituição, ano e semestre**, com resposta por alternativa, correção pelo gabarito e acompanhamento local de acertos e erros.

## Situação do acervo — 21/11/2026

| Prova | Indexadas | Disponibilidade |
|---|---:|---|
| ENAMED 2025 (Caderno 01) | 100/100 | 100 questões com enunciados e alternativas reescritos, PDF original vinculado, gabarito definitivo (90 pontuáveis, 10 anuladas/excluídas) |
| ENAMED 2026 (Caderno 01) | 100/100 | 100 questões com redação editorial, quatro alternativas e comentários; **gabarito ainda preliminar** |
| USP 2024 (A1) | 30/120 | Classificação temática e links para a prova e o gabarito |
| NIEPAEM 2025.1 | 5/120 | Resolução de primeiro lote em redação editorial |
| NIEPAEM 2025.2 | 8/120 | Resolução de primeiro lote em redação editorial |
| **NIEPAEM 2026.1** | **120/120** | **120 questões respondíveis com caderno original carregado localmente, gabarito e resumo** |
| **NIEPAEM 2026.2** | **120/120** | **120 questões respondíveis com caderno original carregado localmente, gabarito e resumo** |
| **Total** | **483 registros** | **453** podem ser respondidos (240 deles exigem carregar o PDF do caderno no navegador) |

O catálogo contém **39 referências**, mas essas referências não significam 39 provas integralmente processadas.

## NIEPAEM 2026: cadernos e gabaritos disponíveis, sem republicar PDFs

A usuária forneceu quatro documentos:

| Edição | Caderno de questões | Gabarito comentado |
|---|---|---|
| 2026.1, aplicada em 13/05/2026 | `TP_NIEPAEM_2026.1_PROVA.pdf` — **20 páginas**, 120 questões, A–D | `TP_NIEPAEM_2026.1_COMENTARIOS.pdf` — **27 páginas** |
| 2026.2, aplicada em 24/09/2026 | `TP_NIEPAEM_2026.2_PROVA.pdf` — **24 páginas**, 120 questões, A–D | `TP_NIEPAEM_2026.2_COMENTARIOS.pdf` — **29 páginas** |

As páginas de **todas as 240 questões** foram mapeadas diretamente nos cadernos; os 240 gabaritos e os temas específicos foram conferidos com os comentários da banca. Questões com fotografias, ECG, gráficos, ultrassonografia e figuras são lidas no PDF original.

**Os quatro PDFs dizem expressamente que sua reprodução, ainda que parcial, exige autorização.** Por isso, nenhum desses quatro arquivos foi publicado no GitHub Pages. O código público armazena apenas o número, a página do caderno, o módulo, o assunto, a letra do gabarito e uma explicação resumida escrita pelo Atlas Med. Enunciados e alternativas originais são lidos de um **arquivo local do usuário**, sem transmiti-los a nenhum servidor. É uma interface de estudo de provas reais, não um banco de transcrições publicadas.

### Como responder qualquer questão NIEPAEM 2026

1. Abra https://ige-app.github.io/atlas-med/.
2. Selecione a banca **NIEPAEM**, o ano **2026** e o **1º** ou **2º semestre**.
3. Escolha o módulo que está estudando ou use **Todos**.
4. Clique em **Abrir e responder** na questão escolhida.
5. No campo **Caderno original**, escolha o arquivo `TP_NIEPAEM_2026.1_PROVA.pdf` ou `TP_NIEPAEM_2026.2_PROVA.pdf` que está no seu dispositivo. O visualizador abre na página correta.
6. Leia o enunciado e as opções A–D no próprio PDF. Marque a alternativa no painel ao lado e clique em **Corrigir resposta**.
7. A resposta da banca e uma síntese explicativa aparecem **depois** de responder; o histórico registra seu desempenho. Se quiser comparar com o comentário integral, carregue também `TP_NIEPAEM_2026.1_COMENTARIOS.pdf` ou `TP_NIEPAEM_2026.2_COMENTARIOS.pdf` no campo exibido após a correção.
8. Use **Anterior/Próxima** para avançar nas questões do semestre que atendem aos filtros.

A seleção do PDF vale durante a sessão no mesmo navegador: para outros itens do **mesmo semestre**, não será necessário escolhê-lo novamente. **Após atualizar ou fechar a página, é necessário selecionar o PDF outra vez**. Os arquivos nunca são enviados ao site, e não ficam persistidos no armazenamento do navegador.

Os registros NIEPAEM 2026 agora incluem a propriedade `modo_resolucao: "pdf-local"`, `pagina_prova` e referência do PDF de prova. O gabarito só é mostrado após registrar uma resposta. O resumo explicativo é uma redação própria, não a transcrição de terceiros.

## Outros cuidados

- **ENAMED 2026:** o resultado ainda usa gabarito preliminar do Inep; verificar a versão definitiva prevista para **04/12/2026** e corrigir questões afetadas.
- **NIEPAEM 2025:** somente as primeiras questões foram verificadas; não declarar provas completas.
- Os PDFs de terceiros não são armazenados no repositório. Nenhum conteúdo de figuras protegidas foi reproduzido.
- Desempenho e favoritos são salvos apenas no armazenamento local do navegador, sem sincronização entre aparelhos.

## Arquivos

- `index.html`, `app.js`, `styles.css` — interface, filtros, visualizadores e correção.
- `data/indices.json` — provas ENAMED, USP e primeiros lotes NIEPAEM 2025.
- `data/niepaem-2026-1.json` e `data/niepaem-2026-2.json` — 120 questões por semestre, com página do caderno, classificação, letra e síntese do comentário.
- `data/provas.json` — catálogo de referências.
- `data/questoes.json` — reserva para material textual com autorização de reprodução.
- `scripts/validar.mjs` — validação automática no GitHub Actions.

Para rodar localmente:

```bash
python3 -m http.server 8080
node --check app.js
node scripts/validar.mjs
```

A publicação ocorre em GitHub Pages, a partir da branch `main` e da pasta `/(root)`.
