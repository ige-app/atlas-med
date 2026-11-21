# Atlas Med — Banco de Questões Reais de Medicina

**Site publicado:** https://ige-app.github.io/atlas-med/  
**Repositório:** https://github.com/ige-app/atlas-med

O Atlas Med organiza questões de provas oficiais por **módulo → tema → banca → ano**, com leitura, respostas e histórico de desempenho no navegador.

## Estado atual (21/11/2026)

| Prova | Questões classificadas | Interação disponível |
|---|---:|---|
| ENAMED 2025 — Caderno 01 | 100 de 100 | Enunciados e quatro alternativas reescritos, PDF e gabarito **definitivo** (90 pontuáveis; 10 anuladas/excluídas) |
| ENAMED 2026 — Caderno 01 | **30 de 100** | Enunciados e quatro alternativas reescritos, comentários editoriais, PDF oficial e correções externas; gabarito **preliminar**, sujeito a recursos |
| USP FMUSP 2024 — Caderno A1 | 30 de 120 | Índice por assunto, com link para caderno e gabarito |
| **Total** | **160** | **130** com apresentação escrita e alternativas |

**Atenção:** o conteúdo de 2026 ainda não é definitivo. O Inep marcou a divulgação definitiva para **04/12/2026**, quando o gabarito precisa ser revalidado e corrigido no banco.

### PDFs de 2026

- [Prova oficial ENAMED 2026 — Caderno 01 (Inep)](https://download.inep.gov.br/enamed/provas_e_gabaritos/2026_caderno_1.pdf)
- [Gabarito preliminar do Inep](https://download.inep.gov.br/enamed/provas_e_gabaritos/2026_gabarito_caderno_1_preliminar.pdf)
- [Estratégia MED — Prova Comentada ENAMED/ENARE 2026/27](https://cdn.medblog.estrategiaeducacional.com.br/wp-content/uploads/2026/10/ENAMED-2026-Prova-Comentada-Estrategia-MED-1.pdf)
- [Página do Estratégia MED que anuncia o material](https://med.estrategia.com/portal/conteudos-gratis/ebooks-do-estrategia-med-confira-os-materiais-gratuitos-para-estudar-melhor-e-com-foco/)
- [OsceLabs — prova comentada ENAMED 2026 (PDF inspecionado)](https://www.oscelabs.com.br/provas-antigas/pdf/enamed/enamed-2026-caderno-1-comentada-v3.pdf)

O visualizador das questões de 2026 permite alternar entre **Caderno do Inep**, **Estratégia MED** e **Correção verificada (OsceLabs)**. Alguns servidores podem impedir a exibição do PDF dentro de páginas de terceiros. Em qualquer caso, há um link para abrir o PDF original em nova aba.

**Origem dos resumos:** as explicações escritas no Atlas Med são **sínteses editoriais próprias**, elaboradas a partir do caderno do Inep e da correção comentada do OsceLabs, consultada para as primeiras 30 questões. **Não são transcrições nem resumos diretamente extraídos do e-book do Estratégia**, porque o PDF anunciado não pôde ser inspecionado por inteiro nas ferramentas de leitura. A aba do Estratégia aponta para o arquivo divulgado pela própria instituição, mas a incorporação dos comentários específicos do Estratégia depende da conferência do conteúdo.

Nenhuma prova ou correção PDF de terceiros é armazenada neste repositório; todos os visualizadores acessam os sites de origem.

## Como resolver o ENAMED 2025

1. Acesse o [Atlas Med](https://ige-app.github.io/atlas-med/).
2. Selecione o módulo (ex.: Ginecologia ou Oftalmologia), escolha a banca **ENAMED** e filtre o intervalo **2025–2025**.
3. Clique em **Abrir e responder** numa das questões classificadas.
4. O painel à direita mostra o **caso clínico e as quatro alternativas em redação editorial**. O PDF oficial aparece à esquerda na página da questão.
5. Marque a alternativa A, B, C ou D e clique em **Corrigir resposta**. O resultado usa o [gabarito definitivo do Inep](https://download.inep.gov.br/enamed/provas_e_gabaritos/2025_gabarito_caderno_1_v2.pdf).
6. Respostas, favoritos e estatísticas são salvos **neste navegador**, sem sincronizar entre aparelhos.

**Importante:** o texto do site é uma **paráfrase/reformulação editorial** fiel à questão real, **não uma transcrição literal**. A íntegra, inclusive todas as imagens, tabelas e detalhes do caso, permanece visível no PDF oficial e disponível por link. Não há questões fictícias de treino.

Questões **anuladas** ou **excluídas da pontuação** são identificadas; não entram nos percentuais de acertos e erros. Para os assuntos em que uma questão envolva imagem, analise também a figura original no PDF.

## Edições de 2026

- **ENAMED 2026:** exame aplicado em **13/09/2026**; [cadernos e gabaritos preliminares no Inep](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enamed/provas-e-gabaritos). O edital prevê gabarito definitivo em **04/12/2026**. **30 questões do caderno 01** já foram classificadas, e o gabarito ainda é preliminar.
- **ENARE 2026/2027:** no **acesso direto**, usa a pontuação obtida no ENAMED. Portanto, questões idênticas não devem ser duplicadas. O [acervo da FGV](https://enare2026.conhecimento.fgv.br/provas/) contém **provas próprias de pré-requisito, ano adicional e área de atuação**, que ainda precisam ser importadas.
- **USP, UNESP, UNIFESP e NIEPAEM:** respectivos portais no catálogo, sem alegação de que todas as edições estão processadas. O NIEPAEM é um teste de progresso, não uma prova de residência.

## Estrutura de arquivos

- `index.html`, `styles.css`, `app.js`: interface, filtros, leitor PDF e correção.
- `data/indices.json`: índice das questões reais (número, ano, banca, módulo, tema, subtema, reescrita, alternativas, gabarito, página e PDF).
- `data/provas.json`: fontes oficiais e status de importação.
- `data/questoes.json`: reservado à reprodução integral somente com autorização comprovada (ainda vazio).
- `scripts/validar.mjs`: validação de fonte, contagem, formatos e consistência.
- `.github/workflows/validar.yml`: testes automáticos a cada atualização.

## Regras de curadoria

- Nunca atribuir enunciados criados ou treinamentos fictícios a provas reais.
- Registrar **ano, banca, número, página do PDF e gabarito definitivo**.
- Preservar ordem e sentido das alternativas; verificar redações reescritas com a fonte original.
- Marcar anulações e exclusões.
- Separar classificação por módulo/tema da existência de uma prova no portal.
- Manter link para as fontes e exigir licença adequada antes de publicar transcrição integral.
- Não duplicar o ENAMED sob a etiqueta ENARE de acesso direto.

## Rodar localmente e validar

```bash
python3 -m http.server 8080
# abrir http://localhost:8080

node --check app.js
node scripts/validar.mjs
```

Publicado gratuitamente no **GitHub Pages**, branch `main`, pasta `/(root)`.
