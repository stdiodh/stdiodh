// hand-drawn technical-note helpers (rough.js). Coordinates in CSS px.
const INK='#1E293B', BLUE='#2563EB', GREEN='#15803D', RED='#334155', SLATE='#475569', FAINT='#CBD5E1';
let svg, rc, SEED=11;
function init(w,h){ svg=document.getElementById('s'); svg.setAttribute('width',w); svg.setAttribute('height',h); svg.setAttribute('viewBox',`0 0 ${w} ${h}`); rc=rough.svg(svg); }
const O=o=>Object.assign({roughness:0.9,bowing:0.5,strokeWidth:1.6,stroke:INK,seed:SEED++,disableMultiStroke:false},o);
const add=n=>(svg.appendChild(n),n);
function rr(x,y,w,h,r){return `M${x+r},${y} L${x+w-r},${y} Q${x+w},${y} ${x+w},${y+r} L${x+w},${y+h-r} Q${x+w},${y+h} ${x+w-r},${y+h} L${x+r},${y+h} Q${x},${y+h} ${x},${y+h-r} L${x},${y+r} Q${x},${y} ${x+r},${y} Z`;}
function box(x,y,w,h,o={}){ return add(rc.path(rr(x,y,w,h,o.r??7),O({stroke:o.c||INK,strokeWidth:o.sw||1.6,fill:o.fill,fillStyle:o.fs||'hachure',hachureGap:o.gap||7,fillWeight:0.8,hachureAngle:-41,strokeLineDash:o.dash?[7,6]:undefined}))); }
function line(x1,y1,x2,y2,o={}){ return add(rc.line(x1,y1,x2,y2,O({stroke:o.c||INK,strokeWidth:o.sw||1.6,strokeLineDash:o.dash?[6,6]:undefined}))); }
function head(x1,y1,x2,y2,c,sw){ const a=Math.atan2(y2-y1,x2-x1), L=10, k=0.45; line(x2,y2,x2-L*Math.cos(a-k),y2-L*Math.sin(a-k),{c,sw}); line(x2,y2,x2-L*Math.cos(a+k),y2-L*Math.sin(a+k),{c,sw}); }
function arrow(x1,y1,x2,y2,o={}){ line(x1,y1,x2,y2,o); head(x1,y1,x2,y2,o.c||INK,o.sw||1.6); if(o.label){ const mx=(x1+x2)/2, my=(y1+y2)/2; text(mx+(o.lx||0), my+(o.ly??-8), o.label,{size:o.ls||12,c:o.lc||SLATE,w:500}); } }
function path(points,o={}){ const n=add(rc.curve(points,O({stroke:o.c||INK,strokeWidth:o.sw||1.6,strokeLineDash:o.dash?[6,6]:undefined}))); if(o.arrow){const p=points[points.length-1],q=points[points.length-2]; head(q[0],q[1],p[0],p[1],o.c||INK,o.sw||1.6);} return n; }
function poly(points,o={}){ for(let i=1;i<points.length;i++) line(points[i-1][0],points[i-1][1],points[i][0],points[i][1],o); if(o.arrow){const p=points[points.length-1],q=points[points.length-2]; head(q[0],q[1],p[0],p[1],o.c||INK,o.sw||1.6);} }
function text(x,y,s,o={}){ const t=document.createElementNS('http://www.w3.org/2000/svg','text'); t.setAttribute('x',x); t.setAttribute('y',y);
  t.setAttribute('font-family','Pretendard'); const fz=Math.max(o.size||14,13); t.setAttribute('font-size',fz); t.setAttribute('font-weight',o.w||500); t.setAttribute('fill',o.c||INK);
  t.setAttribute('text-anchor',o.a||'middle'); t.setAttribute('dominant-baseline','middle'); t.setAttribute('letter-spacing',o.ls??(fz<16?'0':'-0.2'));
  const lines=String(s).split('\n'); const lh=fz*(o.lh||1.35); const y0=y-(lines.length-1)*lh/2;
  lines.forEach((l,i)=>{const sp=document.createElementNS('http://www.w3.org/2000/svg','tspan'); sp.setAttribute('x',x); sp.setAttribute('y',y0+i*lh); sp.textContent=l; t.appendChild(sp);}); return add(t); }
function label(x,y,w,h,s,o={}){ box(x,y,w,h,o); text(x+w/2,y+h/2+(o.dy||0),s,{size:o.size||14,w:o.w||600,c:o.tc||o.c||INK}); }
function xmark(cx,cy,r=7,c=RED){ line(cx-r,cy-r,cx+r,cy+r,{c,sw:2.2}); line(cx-r,cy+r,cx+r,cy-r,{c,sw:2.2}); }
function check(cx,cy,r=7,c=BLUE){ poly([[cx-r,cy],[cx-r/3,cy+r*0.75],[cx+r,cy-r*0.8]],{c,sw:2.2}); }
function circle(cx,cy,d,o={}){ return add(rc.circle(cx,cy,d,O({stroke:o.c||INK,strokeWidth:o.sw||1.6,fill:o.fill,fillStyle:'hachure',hachureGap:5,strokeLineDash:o.dash?[6,6]:undefined}))); }
function ellipse(cx,cy,w,h,o={}){ return add(rc.ellipse(cx,cy,w,h,O({stroke:o.c||INK,strokeWidth:o.sw||1.6,strokeLineDash:o.dash?[6,6]:undefined}))); }
function db(cx,cy,w=44,h=50,s='DB',o={}){ const c=o.c||INK; ellipse(cx,cy-h/2+6,w,12,{c}); line(cx-w/2,cy-h/2+6,cx-w/2,cy+h/2-6,{c}); line(cx+w/2,cy-h/2+6,cx+w/2,cy+h/2-6,{c});
  add(rc.arc(cx,cy+h/2-6,w,12,0,Math.PI,false,O({stroke:c}))); if(s) text(cx,cy+4,s,{size:12,w:600,c}); }
function note(x,y,s,o={}){ return text(x,y,s,Object.assign({size:13,c:SLATE,w:500},o)); }
function hl(x,y,w,c='#DBEAFE'){ add(rc.line(x,y,x+w,y,O({stroke:c,strokeWidth:9,roughness:1.4}))).setAttribute('opacity','0.7'); }

function shot(x,y,w,h,key,o={}){ if(typeof SHOTS!=='undefined'&&SHOTS[key]){ const ns='http://www.w3.org/2000/svg'; const id='c'+(SEED++);
  const cp=document.createElementNS(ns,'clipPath'); cp.id=id; const r=document.createElementNS(ns,'rect'); r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width',w);r.setAttribute('height',h);r.setAttribute('rx',5); cp.appendChild(r); add(cp);
  const im=document.createElementNS(ns,'image'); im.setAttribute('href',SHOTS[key]); im.setAttribute('x',x); im.setAttribute('y',y); im.setAttribute('width',w); im.setAttribute('height',h); if(o.meet){ const bg=document.createElementNS(ns,'rect'); bg.setAttribute('x',x);bg.setAttribute('y',y);bg.setAttribute('width',w);bg.setAttribute('height',h);bg.setAttribute('fill',o.meet);bg.setAttribute('clip-path',`url(#${id})`); add(bg);} im.setAttribute('preserveAspectRatio',o.meet?'xMidYMid meet':'xMidYMin slice'); im.setAttribute('clip-path',`url(#${id})`); add(im);
  box(x-3,y-3,w+6,h+6,{r:7,c:o.c||INK,sw:1.5}); }
  else { box(x,y,w,h,{dash:true,c:SLATE}); text(x+w/2,y+h/2,'화면: '+key,{size:12,c:SLATE}); } }
