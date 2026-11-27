// builds p3/sketch/icons.js: { key: {src:'si'|'lu', els:[...]} }
const fs=require('fs'), path=require('path'), svgpath=require('svgpath'); const N=d=>svgpath(d).abs().unarc().round(3).toString();
const SI={nginx:'nginx',postgresql:'postgresql',mongodb:'mongodb',firebase:'firebase',github:'github',python:'python',flask:'flask',mariadb:'mariadb'};
const LU={user:'user',auth:'key-round',assign:'clipboard-list',judge:'list-checks',blog:'pen-line',gateway:'shield-check',queue:'layers',ci:'workflow',registry:'package',container:'container',cloud:'cloud',server:'server',chat:'messages-square',fast:'zap',file:'file-text',web:'monitor',chip:'cpu',search:'search',bot:'bot',map:'map-pin',sparkle:'sparkles',db:'database',lock:'lock'};
const out={};
for(const [k,f] of Object.entries(SI)){ const s=fs.readFileSync(path.join(__dirname,'node_modules/simple-icons/icons',f+'.svg'),'utf8'); out[k]={src:'si',els:[['path',{d:N(s.match(/ d="([^"]+)"/)[1])}]]}; }
for(const [k,f] of Object.entries(LU)){ const p=path.join(__dirname,'node_modules/lucide-static/icons',f+'.svg'); if(!fs.existsSync(p)){console.log('missing',f);continue;}
  const s=fs.readFileSync(p,'utf8'); const els=[]; for(const m of s.matchAll(/<(path|rect|circle|line|polyline|ellipse)\s([^>]*?)\/>/g)){ const a={}; for(const am of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) a[am[1]]=am[2]; if(a.d) a.d=N(a.d); els.push([m[1],a]); } out[k]={src:'lu',els}; }
fs.writeFileSync(process.argv[2],'const ICONS='+JSON.stringify(out)+';\n'); console.log(Object.keys(out).length);
