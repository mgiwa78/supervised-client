/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[4],{534:function(wa,ta,n){n.r(ta);var pa=n(0),na=n(556),oa=n(557),ia;(function(ka){ka[ka.EXTERNAL_XFDF_NOT_REQUESTED=0]="EXTERNAL_XFDF_NOT_REQUESTED";ka[ka.EXTERNAL_XFDF_NOT_AVAILABLE=1]="EXTERNAL_XFDF_NOT_AVAILABLE";ka[ka.EXTERNAL_XFDF_AVAILABLE=2]="EXTERNAL_XFDF_AVAILABLE"})(ia||(ia={}));wa=function(){function ka(ea){this.aa=ea;this.state=ia.EXTERNAL_XFDF_NOT_REQUESTED}ka.prototype.Spa=function(){var ea=this;return function(z,
x,f){return Object(pa.b)(ea,void 0,void 0,function(){var e,a,b,h,r,w,y,aa=this,ha;return Object(pa.d)(this,function(ca){switch(ca.label){case 0:if(this.state!==ia.EXTERNAL_XFDF_NOT_REQUESTED)return[3,2];e=this.aa.getDocument().Av();return[4,this.Una(e)];case 1:a=ca.ba(),b=this.Sha(a),this.$N=null!==(ha=null===b||void 0===b?void 0:b.parse())&&void 0!==ha?ha:null,this.state=null===this.$N?ia.EXTERNAL_XFDF_NOT_AVAILABLE:ia.EXTERNAL_XFDF_AVAILABLE,ca.label=2;case 2:if(this.state===ia.EXTERNAL_XFDF_NOT_AVAILABLE)return f(z),
[2];h=new DOMParser;r=h.parseFromString(z,"text/xml");x.forEach(function(fa){aa.merge(r,aa.$N,fa-1)});w=new XMLSerializer;y=w.serializeToString(r);f(y);return[2]}})})}};ka.prototype.KS=function(ea){this.Una=ea};ka.prototype.jf=function(){this.$N=void 0;this.state=ia.EXTERNAL_XFDF_NOT_REQUESTED};ka.prototype.Sha=function(ea){return ea?Array.isArray(ea)?new na.a(ea):"string"!==typeof ea?null:(new DOMParser).parseFromString(ea,"text/xml").querySelector("xfdf > add")?new na.a(ea):new oa.a(ea):null};ka.prototype.merge=
function(ea,z,x){var f=this;0===x&&(this.Lsa(ea,z.Ir),this.Nsa(ea,z.DN));var e=z.ea[x];e&&(this.Osa(ea,e.Dp),this.Qsa(ea,e.T9,z.Bz),this.Psa(ea,e.page,x),this.Msa(ea,e.b_));e=this.aa.xb();if(x===e-1){var a=z.Bz;Object.keys(a).forEach(function(b){a[b].HP||f.a4(ea,b,a[b])})}};ka.prototype.Lsa=function(ea,z){null!==z&&(ea=this.Jy(ea),this.vt(ea,"calculation-order",z))};ka.prototype.Nsa=function(ea,z){null!==z&&(ea=this.Jy(ea),this.vt(ea,"document-actions",z))};ka.prototype.Osa=function(ea,z){var x=this,
f=this.Iy(ea.querySelector("xfdf"),"annots");Object.keys(z).forEach(function(e){x.vt(f,'[name="'+e+'"]',z[e])})};ka.prototype.Qsa=function(ea,z,x){var f=this;if(0!==z.length){var e=this.Jy(ea);z.forEach(function(a){var b=a.getAttribute("field"),h=x[b];h&&(f.a4(ea,b,h),f.vt(e,"null",a))})}};ka.prototype.a4=function(ea,z,x){var f=this.Jy(ea),e=f.querySelector('ffield[name="'+z+'"]');null!==x.hG&&null===e&&this.vt(f,'ffield[name="'+z+'"]',x.hG);ea=this.Iy(ea.querySelector("xfdf"),"xfdf > fields","fields");
z=z.split(".");this.LR(ea,z,0,x.value);x.HP=!0};ka.prototype.Psa=function(ea,z,x){null!==z&&(ea=this.Jy(ea),ea=this.Iy(ea,"pages"),this.vt(ea,'[number="'+(x+1)+'"]',z))};ka.prototype.Msa=function(ea,z){Object.keys(z).forEach(function(x){(x=ea.querySelector('annots [name="'+x+'"]'))&&x.parentElement.removeChild(x)})};ka.prototype.LR=function(ea,z,x,f){if(x===z.length)z=document.createElementNS("","value"),z.textContent=f,this.vt(ea,"value",z);else{var e=z[x];this.Iy(ea,'[name="'+e+'"]',"field").setAttribute("name",
e);ea=ea.querySelectorAll('[name="'+e+'"]');1===ea.length?this.LR(ea[0],z,x+1,f):(e=this.bma(ea),this.LR(x===z.length-1?e:this.WAa(ea,e),z,x+1,f))}};ka.prototype.bma=function(ea){for(var z=null,x=0;x<ea.length;x++){var f=ea[x];if(0===f.childElementCount||1===f.childElementCount&&"value"===f.children[0].tagName){z=f;break}}return z};ka.prototype.WAa=function(ea,z){for(var x=0;x<ea.length;x++)if(ea[x]!==z)return ea[x];return null};ka.prototype.vt=function(ea,z,x){z=ea.querySelector(z);null!==z&&ea.removeChild(z);
ea.appendChild(x)};ka.prototype.Jy=function(ea){var z=ea.querySelector("pdf-info");if(null!==z)return z;z=this.Iy(ea.querySelector("xfdf"),"pdf-info");z.setAttribute("xmlns","http://www.pdftron.com/pdfinfo");z.setAttribute("version","2");z.setAttribute("import-version","4");return z};ka.prototype.Iy=function(ea,z,x){var f=ea.querySelector(z);if(null!==f)return f;f=document.createElementNS("",x||z);ea.appendChild(f);return f};return ka}();ta["default"]=wa},545:function(wa,ta){wa=function(){function n(){}
n.prototype.GE=function(pa){var na={Ir:null,DN:null,Bz:{},ea:{}};pa=(new DOMParser).parseFromString(pa,"text/xml");na.Ir=pa.querySelector("pdf-info calculation-order");na.DN=pa.querySelector("pdf-info document-actions");na.Bz=this.Zta(pa);na.ea=this.lua(pa);return na};n.prototype.Zta=function(pa){var na=pa.querySelector("fields");pa=pa.querySelectorAll("pdf-info > ffield");if(null===na&&null===pa)return{};var oa={};this.Lea(oa,na);this.Jea(oa,pa);return oa};n.prototype.Lea=function(pa,na){if(null!==
na&&na.children){for(var oa=[],ia=0;ia<na.children.length;ia++){var ka=na.children[ia];oa.push({name:ka.getAttribute("name"),element:ka})}for(;0!==oa.length;)for(na=oa.shift(),ia=0;ia<na.element.children.length;ia++)ka=na.element.children[ia],"value"===ka.tagName?pa[na.name]={value:ka.textContent,hG:null,HP:!1}:ka.children&&oa.push({name:na.name+"."+ka.getAttribute("name"),element:ka})}};n.prototype.Jea=function(pa,na){na.forEach(function(oa){var ia=oa.getAttribute("name");pa[ia]?pa[ia].hG=oa:pa[ia]=
{value:null,hG:oa,HP:!1}})};n.prototype.lua=function(pa){var na=this,oa={};pa.querySelectorAll("pdf-info widget").forEach(function(ia){var ka=parseInt(ia.getAttribute("page"),10)-1;na.qH(oa,ka);oa[ka].T9.push(ia)});pa.querySelectorAll("pdf-info page").forEach(function(ia){var ka=parseInt(ia.getAttribute("number"),10)-1;na.qH(oa,ka);oa[ka].page=ia});this.a1(pa).forEach(function(ia){var ka=parseInt(ia.getAttribute("page"),10),ea=ia.getAttribute("name");na.qH(oa,ka);oa[ka].Dp[ea]=ia});this.M0(pa).forEach(function(ia){var ka=
parseInt(ia.getAttribute("page"),10);ia=ia.textContent;na.qH(oa,ka);oa[ka].b_[ia]=!0});return oa};n.prototype.qH=function(pa,na){pa[na]||(pa[na]={Dp:{},b_:{},T9:[],page:null})};return n}();ta.a=wa},556:function(wa,ta,n){var pa=n(0),na=n(1);n.n(na);wa=function(oa){function ia(ka){var ea=oa.call(this)||this;ea.Lla=Array.isArray(ka)?ka:[ka];return ea}Object(pa.c)(ia,oa);ia.prototype.parse=function(){var ka=this,ea={Ir:null,DN:null,Bz:{},ea:{}};this.Lla.forEach(function(z){ea=Object(na.merge)(ea,ka.GE(z))});
return ea};ia.prototype.a1=function(ka){var ea=[];ka.querySelectorAll("add > *").forEach(function(z){ea.push(z)});ka.querySelectorAll("modify > *").forEach(function(z){ea.push(z)});return ea};ia.prototype.M0=function(ka){return ka.querySelectorAll("delete > *")};return ia}(n(545).a);ta.a=wa},557:function(wa,ta,n){var pa=n(0);wa=function(na){function oa(ia){var ka=na.call(this)||this;ka.Mla=ia;return ka}Object(pa.c)(oa,na);oa.prototype.parse=function(){return this.GE(this.Mla)};oa.prototype.a1=function(ia){return ia.querySelectorAll("annots > *")};
oa.prototype.M0=function(){return[]};return oa}(n(545).a);ta.a=wa}}]);}).call(this || window)

//# sourceMappingURL=ExternalAnnotationMerger.chunk.js.map