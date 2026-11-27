import sys, numpy as np
from PIL import Image
import os; HMIN=float(os.environ.get("HMIN","5"))
src, dst = sys.argv[1], sys.argv[2]
boxes = [tuple(map(int, b.split(','))) for b in sys.argv[3:]]  # x0,y0,x1,y1 regions to keep
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32)/255
hsv = np.asarray(im.convert('HSV')).astype(np.float32)
h = hsv[...,0]*360/255; s = hsv[...,1]/255; v = hsv[...,2]/255
HMAX=float(os.environ.get("HMAX","45")); mask = ((h >= HMIN) | (h >= float(os.environ.get("HWRAP","361")))) & ((h <= HMAX) | (h >= float(os.environ.get("HWRAP","361")))) & (s > float(os.environ.get("SMIN","0.06")))
keep=np.zeros_like(mask)
for x0,y0,x1,y1 in boxes:
    if x0<0: mask_add=(-x0,y0,x1,y1); continue
    keep[y0:y1, x0:x1] = True
add=np.zeros_like(mask)
for b in os.environ.get("ADD","").split(";"):
    if b: x0,y0,x1,y1=map(int,b.split(",")); add[y0:y1,x0:x1]=True
mask = mask & (~keep | add)
# HLS conversion for masked pixels
r,g,b = a[...,0],a[...,1],a[...,2]
mx = a.max(-1); mn = a.min(-1); l = (mx+mn)/2
d = mx-mn; sl = np.where(d==0,0,d/(1-np.abs(2*l-1)+1e-6))
sl = np.clip(sl*0.83,0,1); l2 = np.clip(l + 0.033*sl/0.83*(1-np.abs(2*l-1)),0,1)
H = 221/360
def hue2rgb(p,q,t):
    t = t%1
    return np.where(t<1/6, p+(q-p)*6*t, np.where(t<1/2, q, np.where(t<2/3, p+(q-p)*(2/3-t)*6, p)))
q = np.where(l2<0.5, l2*(1+sl), l2+sl-l2*sl); p = 2*l2-q
nr, ng, nb = hue2rgb(p,q,H+1/3), hue2rgb(p,q,H), hue2rgb(p,q,H-1/3)
out = a.copy()
for i,c in enumerate((nr,ng,nb)): out[...,i] = np.where(mask, c, a[...,i])
Image.fromarray((out*255+0.5).astype(np.uint8)).save(dst, optimize=True)
print(dst, mask.mean())
