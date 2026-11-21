/* NIEPAEM — leitura local dos PDFs fornecidos pelo estudante.
 * Os PDFs e suas transcrições nunca são enviados ao servidor nem publicados
 * no GitHub. O texto é extraído no navegador com Mozilla PDF.js.
 */
(function(){
 "use strict";
 const dbName="atlas-med-pdfs-privados",storeName="cadernos";
 const sessions={},pending={};
 const info=sem=>sessions[String(sem)]||null;
 function database(){
  return new Promise((resolve,reject)=>{
   if(!window.indexedDB){reject(new Error("Armazenamento local indisponível."));return}
   const request=indexedDB.open(dbName,1);
   request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(storeName))request.result.createObjectStore(storeName)};
   request.onsuccess=()=>resolve(request.result);
   request.onerror=()=>reject(request.error);
  });
 }
 async function storageGet(sem){
  const db=await database();
  return new Promise((resolve,reject)=>{
   const tx=db.transaction(storeName,"readonly"),q=tx.objectStore(storeName).get(String(sem));
   q.onsuccess=()=>{resolve(q.result||null);db.close()};
   q.onerror=()=>{reject(q.error);db.close()};
  });
 }
 async function storageSet(sem,blob){
  const db=await database();
  return new Promise((resolve,reject)=>{
   const tx=db.transaction(storeName,"readwrite");
   tx.objectStore(storeName).put(blob,String(sem));
   tx.oncomplete=()=>{db.close();resolve(true)};
   tx.onerror=()=>{db.close();reject(tx.error)};
  });
 }
 async function storageDelete(sem){
  const db=await database();
  return new Promise((resolve,reject)=>{
   const tx=db.transaction(storeName,"readwrite");
   tx.objectStore(storeName).delete(String(sem));
   tx.oncomplete=()=>{db.close();resolve(true)};
   tx.onerror=()=>{db.close();reject(tx.error)};
  });
 }
 function announce(sem){window.dispatchEvent(new CustomEvent("niepaem-pdf-updated",{detail:{semester:Number(sem)}}))}
 function isQuestionStart(entry,side){
  const expectedX=side===0?22:310;
  if(Math.abs(entry.x-expectedX)>8)return null;
  const m=entry.text.match(/^\s*(\d{1,3})\.\s*/);
  return m?Number(m[1]):null;
 }
 function renderLines(entries){
  entries.sort((a,b)=>a.y-b.y||a.x-b.x);
  const lines=[];
  for(const item of entries){
   let last=lines[lines.length-1];
   if(!last||Math.abs(last.y-item.y)>3){
    last={y:item.y,parts:[]};lines.push(last);
   }
   last.parts.push(item);
  }
  return lines.map(line=>{
   line.parts.sort((a,b)=>a.x-b.x);
   let result="",right=null;
   for(const item of line.parts){
    if(right!==null&&item.x-right>1.8&&!result.endsWith(" ")&&!item.text.startsWith(" "))result+=" ";
    result+=item.text;
    right=Math.max(right===null?-Infinity:right,item.x+(item.width||0));
   }
   return result.trim();
  }).filter(Boolean).join("\n");
 }
 function parseOptions(text){
  const found=[...text.matchAll(/\(\s*([A-D])\s*\)/g)];
  const four=[];
  for(const letter of "ABCD"){
   const matches=found.filter(x=>x[1]===letter);
   const match=matches.find(x=>!four.length||x.index>four[four.length-1].index);
   if(!match)return {statement:text.trim(),options:null,reason:"Alternativas não reconhecidas automaticamente"};
   four.push({letter,index:match.index,end:match.index+match[0].length});
  }
  if(four[0].index<15)return {statement:text.trim(),options:null,reason:"Enunciado não identificado com segurança"};
  const statement=text.slice(0,four[0].index).replace(/^\s*\d{1,3}\.\s*/,"").replace(/\n+/g," ").replace(/\s+/g," ").trim();
  const options=four.map((cur,i)=>text.slice(cur.end,i+1<four.length?four[i+1].index:text.length).replace(/\n+/g," ").replace(/\s+/g," ").trim());
  if(!statement||options.some(x=>x.length<1))return {statement:text.trim(),options:null,reason:"Texto incompleto no PDF"};
  return {statement,options,reason:null};
 }
 async function extract(doc){
  const pages=[];
  for(let pageNo=1;pageNo<=doc.numPages;pageNo++){
   const page=await doc.getPage(pageNo);
   const content=await page.getTextContent();
   const height=page.view[3]-page.view[1];
   const items=content.items.filter(item=>item.str&&item.str.trim()).map(item=>({
     text:item.str,x:item.transform[4],y:height-item.transform[5],width:item.width||0,
     side:item.transform[4]<300?0:1
   }));
   pages.push(items);
   page.cleanup();
  }
  const candidates=[];
  pages.forEach((items,i)=>{
   for(const side of [0,1]){
    for(const item of items.filter(v=>v.side===side).sort((a,b)=>a.y-b.y)){
     const n=isQuestionStart(item,side);
     if(n&&item.y<790)candidates.push({number:n,page:i+1,side,y:item.y});
    }
   }
  });
  // Figuras podem conter números parecidos com "85."; aceitar apenas sequência crescente.
  let expected=1;
  const starts=[];
  for(const q of candidates){
   if(q.number===expected){starts.push(q);expected++}
  }
  if(starts.length!==120)throw new Error("Foram identificadas "+starts.length+" de 120 questões. O PDF pode ser de outra edição ou ter texto protegido.");
  const perQuestion={};
  for(let i=0;i<starts.length;i++){
   const begin=starts[i],end=starts[i+1];
   let page=begin.page,side=begin.side,top=begin.y-5;
   const segments=[];
   while(page<=pages.length){
    const until=end&&end.page===page&&end.side===side?end.y-3:795;
    const subset=pages[page-1].filter(x=>x.side===side&&x.y>=top&&x.y<until&&x.y<805&&x.y>=35);
    segments.push(renderLines(subset));
    if(end&&end.page===page&&end.side===side)break;
    if(!end)break;
    if(side===0){side=1;top=35}else{side=0;page++;top=35}
   }
   const text=segments.filter(Boolean).join("\n").replace(/[ \t]+/g," ");
   perQuestion[begin.number]=parseOptions(text);
  }
  return perQuestion;
 }
 async function attach(sem,blob,persist=true){
  sem=String(sem);
  if(pending[sem])await pending[sem].catch(()=>null);
  const task=(async()=>{
   if(sessions[sem]?.url)URL.revokeObjectURL(sessions[sem].url);
   const url=URL.createObjectURL(blob);
   sessions[sem]={url,status:"loading",questions:{},error:null};
   announce(sem);
   try{
    if(!window.pdfjsLib)throw new Error("Biblioteca de leitura PDF indisponível. Verifique a conexão com a internet.");
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const data=new Uint8Array(await blob.arrayBuffer());
    const task=pdfjsLib.getDocument({data});
    const doc=await task.promise;
    const questions=await extract(doc);
    sessions[sem]={url,status:"ready",questions,error:null};
    if(persist)await storageSet(sem,blob).catch(()=>null);
    announce(sem);
    await doc.destroy();
    return sessions[sem];
   }catch(err){
    sessions[sem]={url,status:"error",questions:{},error:String(err?.message||err)};
    announce(sem);
    return sessions[sem];
   }
  })();
  pending[sem]=task;
  try{return await task}finally{delete pending[sem]}
 }
 async function restore(sem){
  sem=String(sem);
  if(sessions[sem])return sessions[sem];
  if(pending[sem])return pending[sem];
  try{const blob=await storageGet(sem);if(blob)return attach(sem,blob,false)}catch(e){}
  return null;
 }
 async function forget(sem){
  sem=String(sem);
  if(sessions[sem]?.url)URL.revokeObjectURL(sessions[sem].url);
  delete sessions[sem];
  await storageDelete(sem).catch(()=>null);
  announce(sem);
 }
 window.NIEPAEMPdf={info,getQuestion:(sem,n)=>info(sem)?.questions?.[Number(n)]||null,attach,restore,forget};
})();