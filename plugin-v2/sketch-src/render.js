// usage: node render.js figs.js OUTDIR [name...]
const { chromium } = require('playwright'); const fs=require('fs'), path=require('path');
(async()=>{
  const figs=fs.readFileSync(process.argv[2],'utf8'); const out=process.argv[3]; const only=process.argv.slice(4);
  const lib=fs.readFileSync(path.join(__dirname,'lib.js'),'utf8'), rough=fs.readFileSync(path.join(__dirname,'rough.js'),'utf8');
  const FIGS=eval(figs+';FIGS');
  const SD=process.env.SHOTS, SHOTS={}; if(SD&&fs.existsSync(SD)) for(const f of fs.readdirSync(SD).filter(f=>f.endsWith('.png'))) SHOTS[f.replace('.png','')]='data:image/png;base64,'+fs.readFileSync(path.join(SD,f)).toString('base64');
  const b=await chromium.launch();
  for(const [name,f] of Object.entries(FIGS)){ if(only.length&&!only.includes(name)) continue;
    const p=await b.newPage({viewport:{width:f.w,height:f.h},deviceScaleFactor:2}); p.on('pageerror',e=>console.log('ERR',name,e.message)); p.on('console',m=>{if(m.type()==='error')console.log('CERR',name,m.text())});
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:${f.bg||'#FFFFFF'}}svg{display:block}</style></head><body><svg id="s" xmlns="http://www.w3.org/2000/svg"></svg><script>${rough}<\/script><script>const SHOTS=${JSON.stringify(SHOTS)};<\/script><script>${lib}<\/script><script>init(${f.w},${f.h});({${f.draw.toString()}}).draw();<\/script></body></html>`);
    await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({path:path.join(out,name+'.png')}); await p.close(); console.log('ok',name);
  }
  await b.close();
})();
