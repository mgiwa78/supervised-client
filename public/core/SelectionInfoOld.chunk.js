/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[10],{536:function(wa,ta,n){n.r(ta);var pa=n(546),na=n(138),oa=n(48),ia=n(84);wa=function(){function ka(){this.Nb=this.qf=this.zc=this.Rc=null;this.Mf=!1}ka.prototype.clear=function(){Object(oa.b)(this.Rc);this.zc="";Object(oa.b)(this.qf);Object(oa.b)(this.Nb);this.Mf=!1};ka.prototype.Vd=function(){this.Rc=[];this.qf=[];this.Nb=[];this.Mf=!1};ka.prototype.jE=function(ea){for(var z="",x=0,f,e,a;x<ea.length;)f=ea.charCodeAt(x),9===
f?(z+=String.fromCharCode(10),x++):128>f?(z+=String.fromCharCode(f),x++):191<f&&224>f?(e=ea.charCodeAt(x+1),z+=String.fromCharCode((f&31)<<6|e&63),x+=2):(e=ea.charCodeAt(x+1),a=ea.charCodeAt(x+2),z+=String.fromCharCode((f&15)<<12|(e&63)<<6|a&63),x+=3);return z};ka.prototype.initData=function(ea){this.Rc=[];this.qf=[];this.Nb=[];this.Mf=!1;try{var z=new ia.a(ea);this.zc="";z.Qa();if(!z.advance())return;var x=z.current.textContent;this.zc=x=this.jE(x);Object(oa.b)(this.qf);z.advance();x=z.current.textContent;
for(var f=x.split(","),e=Object(na.a)(f);e.qo();){var a=e.current;try{var b=parseInt(a.trim(),10);this.qf.push(b)}catch(ca){}}Object(oa.b)(this.Rc);z.advance();x=z.current.textContent;f=x.split(",");for(var h=Object(na.a)(f);h.qo();){a=h.current;try{b=parseFloat(a.trim()),this.Rc.push(b)}catch(ca){}}Object(oa.b)(this.Nb);z.advance();x=z.current.textContent;f=x.split(",");ea=[];z=[];x=0;for(var r=Object(na.a)(f);r.qo();){a=r.current;switch(a){case "Q":x=1;break;case "R":x=2;break;case "S":x=3;break;
default:x=0}if(x)ea.push(0),z.push(x);else try{b=parseFloat(a.trim()),ea.push(b),z.push(x)}catch(ca){return}}x=0;var w=ea.length;e=r=a=f=void 0;for(var y=h=0,aa=0;aa<w;){var ha=z[aa];if(0<ha)x=ha,++aa,3===x&&(h=ea[aa],y=ea[aa+1],aa+=2);else if(1===x)for(b=0;8>b;++b)this.Nb.push(ea[aa++]);else 2===x?(f=ea[aa++],a=ea[aa++],r=ea[aa++],e=ea[aa++],this.Nb.push(f),this.Nb.push(a),this.Nb.push(r),this.Nb.push(a),this.Nb.push(r),this.Nb.push(e),this.Nb.push(f),this.Nb.push(e)):3===x&&(f=ea[aa++],a=h,r=ea[aa++],
e=y,this.Nb.push(f),this.Nb.push(a),this.Nb.push(r),this.Nb.push(a),this.Nb.push(r),this.Nb.push(e),this.Nb.push(f),this.Nb.push(e))}}catch(ca){return}this.zc.length&&this.zc.length===this.qf.length&&8*this.zc.length===this.Nb.length&&(this.Mf=!0)};ka.prototype.ready=function(){return this.Mf};ka.prototype.Wz=function(){var ea=new pa.a;if(!this.Rc.length)return ea.ji(this.Rc,-1,this.zc,this.Nb,0),ea;ea.ji(this.Rc,1,this.zc,this.Nb,1);return ea};ka.prototype.Kf=function(){return this.Nb};ka.prototype.getData=
function(){return{m_Struct:this.Rc,m_Str:this.zc,m_Offsets:this.qf,m_Quads:this.Nb,m_Ready:this.Mf}};return ka}();ta["default"]=wa},546:function(wa,ta,n){var pa=n(102),na=n(60),oa=n(558);wa=function(){function ia(){this.Te=0;this.Lb=this.La=this.$f=null;this.td=0;this.Se=null}ia.prototype.Vd=function(){this.Te=-1;this.td=0;this.Se=[]};ia.prototype.ji=function(ka,ea,z,x,f){this.Te=ea;this.td=f;this.Se=[];this.$f=ka;this.La=z;this.Lb=x};ia.prototype.jd=function(ka){return this.Te===ka.Te};ia.prototype.Jl=
function(){return Math.abs(this.$f[this.Te])};ia.prototype.mo=function(){return 0<this.$f[this.Te]};ia.prototype.di=function(){var ka=this.mo()?6:10,ea=new oa.a;ea.ji(this.$f,this.Te+ka,this.Te,this.La,this.Lb,1);return ea};ia.prototype.W1=function(ka){if(0>ka||ka>=this.Jl())return ka=new oa.a,ka.ji(this.$f,-1,-1,this.La,this.Lb,0),ka;var ea=this.mo()?6:10,z=this.mo()?5:11,x=new oa.a;x.ji(this.$f,this.Te+ea+z*ka,this.Te,this.La,this.Lb,1+ka);return x};ia.prototype.Ui=function(){var ka=this.Te+parseInt(this.$f[this.Te+
1],10);if(ka>=this.$f.length)return ka=new ia,ka.ji(this.$f,-1,this.La,this.Lb,0),ka;var ea=new ia;ea.ji(this.$f,ka,this.La,this.Lb,this.td+1);return ea};ia.prototype.getBBox=function(ka){if(this.mo())ka.x1=this.$f[this.Te+2+0],ka.y1=this.$f[this.Te+2+1],ka.x2=this.$f[this.Te+2+2],ka.y2=this.$f[this.Te+2+3];else{for(var ea=1.79769E308,z=pa.a.MIN,x=1.79769E308,f=pa.a.MIN,e=0;4>e;++e){var a=this.$f[this.Te+2+2*e],b=this.$f[this.Te+2+2*e+1];ea=Math.min(ea,a);z=Math.max(z,a);x=Math.min(x,b);f=Math.max(f,
b)}ka.x1=ea;ka.y1=x;ka.x2=z;ka.y2=f}};ia.prototype.DG=function(){if(this.Se.length)return this.Se[0];var ka=new na.a,ea=new na.a,z=new oa.a;z.Vd();var x=this.di(),f=new oa.a;f.Vd();for(var e=this.di();!e.jd(z);e=e.fi())f=e;z=Array(8);e=Array(8);x.Jf(0,z);ka.x=(z[0]+z[2]+z[4]+z[6])/4;ka.y=(z[1]+z[3]+z[5]+z[7])/4;f.Jf(f.Il()-1,e);ea.x=(e[0]+e[2]+e[4]+e[6])/4;ea.y=(e[1]+e[3]+e[5]+e[7])/4;.01>Math.abs(ka.x-ea.x)&&.01>Math.abs(ka.y-ea.y)&&this.Se.push(0);ka=Math.atan2(ea.y-ka.y,ea.x-ka.x);ka*=180/3.1415926;
0>ka&&(ka+=360);this.Se.push(ka);return 0};return ia}();ta.a=wa},558:function(wa,ta,n){var pa=n(546),na=n(114),oa=n(102);wa=function(){function ia(){this.dn=this.ve=0;this.Lb=this.La=this.Rc=null;this.td=0}ia.prototype.Vd=function(){this.dn=this.ve=-1;this.td=0};ia.prototype.ji=function(ka,ea,z,x,f,e){this.ve=ea;this.dn=z;this.Rc=ka;this.La=x;this.Lb=f;this.td=e};ia.prototype.jd=function(ka){return this.ve===ka.ve};ia.prototype.Il=function(){return parseInt(this.Rc[this.ve],10)};ia.prototype.gk=function(){return parseInt(this.Rc[this.ve+
2],10)};ia.prototype.ii=function(){return parseInt(this.Rc[this.ve+1],10)};ia.prototype.mo=function(){return 0<this.Rc[this.dn]};ia.prototype.Zoa=function(){return Math.abs(this.Rc[this.dn])};ia.prototype.fi=function(){var ka=this.mo(),ea=ka?5:11;if(this.ve>=this.dn+(ka?6:10)+(this.Zoa()-1)*ea)return ea=new ia,ea.ji(this.Rc,-1,-1,this.La,this.Lb,0),ea;ka=new ia;ka.ji(this.Rc,this.ve+ea,this.dn,this.La,this.Lb,this.td+1);return ka};ia.prototype.koa=function(ka){var ea=this.Il();return 0>ka||ka>=ea?
-1:parseInt(this.Rc[this.ve+1],10)+ka};ia.prototype.Jf=function(ka,ea){ka=this.koa(ka);if(!(0>ka)){var z=new pa.a;z.ji(this.Rc,this.dn,this.La,this.Lb,0);if(z.mo()){var x=new na.a;z.getBBox(x);z=x.y1<x.y2?x.y1:x.y2;x=x.y1>x.y2?x.y1:x.y2;ka*=8;ea[0]=this.Lb[ka];ea[1]=z;ea[2]=this.Lb[ka+2];ea[3]=ea[1];ea[4]=this.Lb[ka+4];ea[5]=x;ea[6]=this.Lb[ka+6];ea[7]=ea[5]}else for(ka*=8,z=0;8>z;++z)ea[z]=this.Lb[ka+z]}};ia.prototype.Ze=function(ka){var ea=new pa.a;ea.ji(this.Rc,this.dn,this.La,this.Lb,0);if(ea.mo()){var z=
this.Rc[this.ve+3],x=this.Rc[this.ve+4];if(z>x){var f=z;z=x;x=f}f=new na.a;ea.getBBox(f);ea=f.y1<f.y2?f.y1:f.y2;f=f.y1>f.y2?f.y1:f.y2;ka[0]=z;ka[1]=ea;ka[2]=x;ka[3]=ea;ka[4]=x;ka[5]=f;ka[6]=z;ka[7]=f}else for(z=this.ve+3,x=0;8>x;++x)ka[x]=this.Rc[z+x]};ia.prototype.getBBox=function(ka){var ea=new pa.a;ea.ji(this.Rc,this.dn,this.La,this.Lb,0);if(ea.mo()){var z=this.Rc[this.ve+3],x=this.Rc[this.ve+4];if(z>x){var f=z;z=x;x=f}f=new na.a;ea.getBBox(f);ea=f.y1<f.y2?f.y1:f.y2;f=f.y1>f.y2?f.y1:f.y2;ka[0]=
z;ka[1]=ea;ka[2]=x;ka[3]=f}else{z=1.79769E308;x=oa.a.MIN;ea=1.79769E308;f=oa.a.MIN;for(var e=this.ve+3,a=0;4>a;++a){var b=this.Rc[e+2*a],h=this.Rc[e+2*a+1];z=Math.min(z,b);x=Math.max(x,b);ea=Math.min(ea,h);f=Math.max(f,h)}ka[0]=z;ka[1]=ea;ka[2]=x;ka[3]=f}};return ia}();ta.a=wa}}]);}).call(this || window)

//# sourceMappingURL=SelectionInfoOld.chunk.js.map