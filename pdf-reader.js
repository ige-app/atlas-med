"use strict";

const pdfReaders = new WeakMap();

function mobilePdfReader(url, page, transcriptQuestion) {
  const transcript=transcriptQuestion ? pdfTranscriptFields(transcriptQuestion) : "";
  return '<div class="mobile-pdf" data-pdf-url="'+safe(url)+'" data-pdf-page="'+safe(page||1)+'"'+transcript+'>'+
    '<button type="button" data-load-pdf>'+(transcript?'Ler questão em texto':'Visualizar PDF aqui')+'</button>'+
    (transcript?'<p role="status" class="pdf-transcript-status muted"></p>':'')+
    '<p role="status" class="pdf-reader-status muted"></p>'+
    '<div class="pdf-pages" hidden>'+
    '<button type="button" data-pdf-delta="-1" aria-label="Página anterior">Anterior</button>'+
    '<span></span>'+
    '<button type="button" data-pdf-delta="1" aria-label="Próxima página">Próxima</button></div>'+
    '<canvas hidden aria-label="Página do PDF"></canvas>'+
    '<details class="pdf-local-option"><summary>Selecionar PDF dos Arquivos</summary>'+
    '<label>Escolha o caderno desta prova <input type="file" accept="application/pdf,.pdf" data-reader-file></label>'+
    '</details></div>';
}

async function showPdfPage(reader, state, number) {
  const status = reader.querySelector('.pdf-reader-status');
  const canvas = reader.querySelector('canvas');
  const navigation = reader.querySelector('.pdf-pages');
  const buttons = navigation.querySelectorAll('button');
  state.busy = true;
  buttons.forEach(button => button.disabled = true);
  status.textContent = 'Carregando página…';
  try {
    const page = await state.document.getPage(number);
    if (!reader.isConnected) return;
    const size = page.getViewport({scale: 1});
    const width = Math.min(1600, Math.max(320, reader.clientWidth) * (window.devicePixelRatio || 1));
    const viewport = page.getViewport({scale: width / size.width});
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({canvasContext: canvas.getContext('2d'), viewport}).promise;
    state.page = number;
    navigation.querySelector('span').textContent = number+' / '+state.document.numPages;
    navigation.hidden = canvas.hidden = false;
    status.textContent = '';
  } catch {
    canvas.hidden = true;
    status.textContent = 'Não foi possível mostrar esta página.';
  } finally {
    buttons[0].disabled = state.page <= 1;
    buttons[1].disabled = state.page >= state.document.numPages;
    state.busy = false;
  }
}

async function loadReaderPdf(reader, file) {
  if (pdfReaders.get(reader)?.busy) return;
  const state = {busy: true, page: 1};
  const previous = pdfReaders.get(reader);
  pdfReaders.set(reader, state);
  const status = reader.querySelector('.pdf-reader-status');
  const button = reader.querySelector('[data-load-pdf]');
  const localOption = reader.querySelector('details');
  reader.querySelector('.pdf-pages').hidden = reader.querySelector('canvas').hidden = true;
  button.disabled = true;
  status.textContent = 'Carregando PDF…';
  try {
    await previous?.document?.destroy();
    const pdf = window.pdfjsLib;
    if (!pdf) throw new Error('PDF.js indisponível');
    pdf.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const bytes = file ? await file.arrayBuffer() : null;
    const matchesCaderno = !bytes || await pdfMatchesCaderno(reader,bytes);
    const source = bytes ? {data: bytes} : {url: reader.dataset.pdfUrl};
    const task = pdf.getDocument({...source, isEvalSupported: false});
    try {
      state.document = await task.promise;
    } catch (error) {
      await task.destroy();
      throw error;
    }
    if (!reader.isConnected) {
      await state.document.destroy();
      return;
    }
    const initial = Math.min(state.document.numPages, Number(reader.dataset.pdfPage) || 1);
    await showPdfPage(reader, state, initial);
    state.busy = true;
    await preparePdfTranscript(reader, state.document, matchesCaderno);
  } catch {
    status.textContent = file ? 'Não foi possível ler o arquivo selecionado.' :
      'Não foi possível carregar o PDF direto da fonte. Abra o original ou selecione uma cópia dos Arquivos.';
    localOption.open = true;
  } finally {
    button.disabled = state.busy = false;
  }
}

document.getElementById('quiz-body').addEventListener('click', event => {
  const button = event.target.closest('button');
  const reader = button?.closest('.mobile-pdf');
  if (!reader) return;
  if (button.hasAttribute('data-load-pdf')) {
    loadReaderPdf(reader);
    return;
  }
  const state = pdfReaders.get(reader);
  if (button.dataset.pdfDelta && state?.document && !state.busy) {
    showPdfPage(reader, state, state.page + Number(button.dataset.pdfDelta));
  }
});

document.getElementById('quiz-body').addEventListener('change', event => {
  const input = event.target;
  if (input.matches('[data-reader-file]') && input.files[0]) loadReaderPdf(input.closest('.mobile-pdf'), input.files[0]);
});

const readerHost = document.getElementById('quiz-body');
new MutationObserver(records => {
  for (const record of records) {
    for (const node of record.removedNodes) {
      for (const reader of node.querySelectorAll?.('.mobile-pdf') || []) {
        const state = pdfReaders.get(reader);
        state?.document?.destroy().catch(() => {});
      }
    }
  }
}).observe(readerHost, {childList: true});
