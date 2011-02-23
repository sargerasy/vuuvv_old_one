(function(){ 

if (!this.window) window = this;

if (!window.navigator) window.navigator = {
  userAgent: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; de-de) AppleWebKit/533.17.8 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8", 
  product: "", 
  cpuClass: ""
}; 

if (!window.qx) window.qx = {};
  
if (!this.qxsettings) qxsettings = {};
var settings = {"qx.globalErrorHandling":"off"};
for (var k in settings) qxsettings[k] = settings[k];

qx.$$packageData = {};
qx.$$loader = {};
})();

qx.$$packageData['9b2f55c8f147']={"locales":{},"resources":{},"translations":{}};
(function(){var m="toString",k=".",j="default",h="Object",g='"',f="Array",e="()",d="String",c="Function",b=".prototype",L="function",K="Boolean",J="Error",I="constructor",H="warn",G="hasOwnProperty",F="string",E="toLocaleString",D="RegExp",C='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="count",z="debug",B="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,M){var O=name.split(k);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(Q,R,name){Q.displayName=R+k+name+e;
},setDisplayNames:function(S,T){for(var name in S){var U=S[name];

if(U instanceof Function){U.displayName=T+k+name+e;
}}},define:function(name,V){if(!V){var V={statics:{}};
}var bb;
var Y=null;
qx.Bootstrap.setDisplayNames(V.statics,name);

if(V.members||V.extend){qx.Bootstrap.setDisplayNames(V.members,name+b);
bb=V.construct||new Function;

if(V.extend){this.extendClass(bb,bb,V.extend,name,ba);
}var W=V.statics||{};
for(var i=0,bc=qx.Bootstrap.getKeys(W),l=bc.length;i<l;i++){var bd=bc[i];
bb[bd]=W[bd];
}Y=bb.prototype;
var X=V.members||{};
for(var i=0,bc=qx.Bootstrap.getKeys(X),l=bc.length;i<l;i++){var bd=bc[i];
Y[bd]=X[bd];
}}else{bb=V.statics||{};
}var ba=this.createNamespace(name,bb);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=o;
if(!bb.hasOwnProperty(m)){bb.toString=this.genericToString;
}if(V.defer){V.defer(bb,Y);
}qx.Bootstrap.$$registry[name]=V.statics;
return bb;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(be,bf,bg,name,bh){var bk=bg.prototype;
var bj=new Function;
bj.prototype=bk;
var bi=new bj;
be.prototype=bi;
bi.name=bi.classname=name;
bi.basename=bh;
bf.base=be.superclass=bg;
bf.self=be.constructor=bi.constructor=be;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bl){return bl.__count__;
},"default":function(bm){var length=0;

for(var bn in bm){length++;
}return length;
}})[(({}).__count__==0)?A:j],objectMergeWith:function(bo,bp,bq){if(bq===undefined){bq=true;
}
for(var br in bp){if(bq||bo[br]===undefined){bo[br]=bp[br];
}}return bo;
},__a:[r,G,E,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bs){var bt=[];
var bv=Object.prototype.hasOwnProperty;

for(var bw in bs){if(bv.call(bs,bw)){bt.push(bw);
}}var bu=qx.Bootstrap.__a;

for(var i=0,a=bu,l=a.length;i<l;i++){if(bv.call(bs,a[i])){bt.push(a[i]);
}}return bt;
},"default":function(bx){var by=[];
var bz=Object.prototype.hasOwnProperty;

for(var bA in bx){if(bz.call(bx,bA)){by.push(bA);
}}return by;
}})[typeof (Object.keys)==
L?B:
(function(){for(var bB in {toString:1}){return bB;
}})()!==m?u:j],getKeysAsString:function(bC){var bD=qx.Bootstrap.getKeys(bC);

if(bD.length==0){return p;
}return g+bD.join(C)+g;
},__b:{"[object String]":d,"[object Array]":f,"[object Object]":h,"[object RegExp]":D,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":c,"[object Error]":J},bind:function(bE,self,bF){var bG=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bH=Array.prototype.slice.call(arguments,0,arguments.length);
return bE.apply(self,bG.concat(bH));
};
},firstUp:function(bI){return bI.charAt(0).toUpperCase()+bI.substr(1);
},firstLow:function(bJ){return bJ.charAt(0).toLowerCase()+bJ.substr(1);
},getClass:function(bK){var bL=Object.prototype.toString.call(bK);
return (qx.Bootstrap.__b[bL]||bL.slice(8,-1));
},isString:function(bM){return (bM!==null&&(typeof bM===F||qx.Bootstrap.getClass(bM)==d||bM instanceof String||(!!bM&&!!bM.$$isString)));
},isArray:function(bN){return (bN!==null&&(bN instanceof Array||(bN&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bN.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bN)==f||(!!bN&&!!bN.$$isArray)));
},isObject:function(bO){return (bO!==undefined&&bO!==null&&qx.Bootstrap.getClass(bO)==h);
},isFunction:function(bP){return qx.Bootstrap.getClass(bP)==c;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bQ,name){while(bQ){if(bQ.$$properties&&bQ.$$properties[name]){return bQ.$$properties[name];
}bQ=bQ.superclass;
}return null;
},hasProperty:function(bR,name){return !!qx.Bootstrap.getPropertyDefinition(bR,name);
},getEventType:function(bS,name){var bS=bS.constructor;

while(bS.superclass){if(bS.$$events&&bS.$$events[name]!==undefined){return bS.$$events[name];
}bS=bS.superclass;
}return null;
},supportsEvent:function(bT,name){return !!qx.Bootstrap.getEventType(bT,name);
},getByInterface:function(bU,bV){var bW,i,l;

while(bU){if(bU.$$implements){bW=bU.$$flatImplements;

for(i=0,l=bW.length;i<l;i++){if(bW[i]===bV){return bU;
}}}bU=bU.superclass;
}return null;
},hasInterface:function(bX,bY){return !!qx.Bootstrap.getByInterface(bX,bY);
},getMixins:function(ca){var cb=[];

while(ca){if(ca.$$includes){cb.push.apply(cb,ca.$$flatIncludes);
}ca=ca.superclass;
}return cb;
},$$logs:[],debug:function(cc,cd){qx.Bootstrap.$$logs.push([z,arguments]);
},info:function(ce,cf){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(cg,ch){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(ci,cj){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(ck){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,h){if(h){if(h.include&&!(h.include instanceof Array)){h.include=[h.include];
}{};
var k=h.statics?h.statics:{};
qx.Bootstrap.setDisplayNames(k,name);

for(var j in k){if(k[j] instanceof Function){k[j].$$mixin=k;
}}if(h.construct){k.$$constructor=h.construct;
qx.Bootstrap.setDisplayName(h.construct,name,e);
}
if(h.include){k.$$includes=h.include;
}
if(h.properties){k.$$properties=h.properties;
}
if(h.members){k.$$members=h.members;
qx.Bootstrap.setDisplayNames(h.members,name+f);
}
for(var j in k.$$members){if(k.$$members[j] instanceof Function){k.$$members[j].$$mixin=k;
}}
if(h.events){k.$$events=h.events;
}
if(h.destruct){k.$$destructor=h.destruct;
qx.Bootstrap.setDisplayName(h.destruct,name,b);
}}else{var k={};
}k.$$type=a;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
this.$$registry[name]=k;
return k;
},checkCompatibility:function(m){var p=this.flatten(m);
var q=p.length;

if(q<2){return true;
}var t={};
var s={};
var r={};
var o;

for(var i=0;i<q;i++){o=p[i];

for(var n in o.events){if(r[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+r[n]+'" in member "'+n+'"!');
}r[n]=o.name;
}
for(var n in o.properties){if(t[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+t[n]+'" in property "'+n+'"!');
}t[n]=o.name;
}
for(var n in o.members){if(s[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+s[n]+'" in member "'+n+'"!');
}s[n]=o.name;
}}return true;
},isCompatible:function(u,v){var w=qx.Bootstrap.getMixins(v);
w.push(u);
return qx.Mixin.checkCompatibility(w);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(x){if(!x){return [];
}var y=x.concat();

for(var i=0,l=x.length;i<l;i++){if(x[i].$$includes){y.push.apply(y,this.flatten(x[i].$$includes));
}}return y;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__c:null,__d:function(){}}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__e:{},define:function(j,k){if(k===undefined){throw new Error('Default value of setting "'+j+'" must be defined!');
}
if(!this.__e[j]){this.__e[j]={};
}else if(this.__e[j].defaultValue!==undefined){throw new Error('Setting "'+j+'" is already defined!');
}this.__e[j].defaultValue=k;
},get:function(l){var m=this.__e[l];

if(m===undefined){throw new Error('Setting "'+l+'" is not defined.');
}
if(m.value!==undefined){return m.value;
}return m.defaultValue;
},set:function(n,o){if((n.split(a)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__e[n]){this.__e[n]={};
}this.__e[n].value=o;
},__f:function(){if(window.qxsettings){for(var p in window.qxsettings){this.set(p,window.qxsettings[p]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(q){}this.__g();
}},__g:function(){if(this.get(h)!=true){return;
}var s=document.location.search.slice(1).split(g);

for(var i=0;i<s.length;i++){var r=s[i].split(b);

if(r.length!=3||r[0]!=c){continue;
}this.set(r[1],decodeURIComponent(r[2]));
}}},defer:function(t){t.define(h,false);
t.define(e,false);
t.define(d,0);
t.__f();
}});
})();
(function(){var h="function",g="Boolean",f="qx.Interface",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(f,{statics:{define:function(name,j){if(j){if(j.extend&&!(j.extend instanceof Array)){j.extend=[j.extend];
}{};
var k=j.statics?j.statics:{};
if(j.extend){k.$$extends=j.extend;
}
if(j.properties){k.$$properties=j.properties;
}
if(j.members){k.$$members=j.members;
}
if(j.events){k.$$events=j.events;
}}else{var k={};
}k.$$type=c;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
qx.Interface.$$registry[name]=k;
return k;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(m){if(!m){return [];
}var n=m.concat();

for(var i=0,l=m.length;i<l;i++){if(m[i].$$extends){n.push.apply(n,this.flatten(m[i].$$extends));
}}return n;
},__h:function(o,p,q,r){var v=q.$$members;

if(v){for(var u in v){if(qx.Bootstrap.isFunction(v[u])){var t=this.__i(p,u);
var s=t||qx.Bootstrap.isFunction(o[u]);

if(!s){throw new Error('Implementation of method "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}var w=r===true&&!t&&!qx.Bootstrap.hasInterface(p,q);

if(w){o[u]=this.__l(q,o[u],u,v[u]);
}}else{if(typeof o[u]===undefined){if(typeof o[u]!==h){throw new Error('Implementation of member "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}}}}}},__i:function(x,y){var C=y.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!C){return false;
}var z=qx.Bootstrap.firstLow(C[2]);
var A=qx.Bootstrap.getPropertyDefinition(x,z);

if(!A){return false;
}var B=C[0]==b||C[0]==d;

if(B){return qx.Bootstrap.getPropertyDefinition(x,z).check==g;
}return true;
},__j:function(D,E){if(E.$$properties){for(var F in E.$$properties){if(!qx.Bootstrap.getPropertyDefinition(D,F)){throw new Error('The property "'+F+'" is not supported by Class "'+D.classname+'"!');
}}}},__k:function(G,H){if(H.$$events){for(var I in H.$$events){if(!qx.Bootstrap.supportsEvent(G,I)){throw new Error('The event "'+I+'" is not supported by Class "'+G.classname+'"!');
}}}},assertObject:function(J,K){var M=J.constructor;
this.__h(J,M,K,false);
this.__j(M,K);
this.__k(M,K);
var L=K.$$extends;

if(L){for(var i=0,l=L.length;i<l;i++){this.assertObject(J,L[i]);
}}},assert:function(N,O,P){this.__h(N.prototype,N,O,P);
this.__j(N,O);
this.__k(N,O);
var Q=O.$$extends;

if(Q){for(var i=0,l=Q.length;i<l;i++){this.assert(N,Q[i],P);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__l:function(){},__m:null,__n:function(){}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;
}else if(m<0){m=Math.max(0,this.length+m);
}
for(var i=m;i>=0;i--){if(this[i]===k){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];
var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);
}}}return s;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){w[i]=u.call(v||window,x,i,this);
}}return w;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var m=';',k='return this.',j="boolean",h="string",g='!==undefined)',f='else if(this.',e='if(this.',d='else ',c=' of an instance of ',b=' is not (yet) ready!");',bi="init",bh='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bg='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bf=" of class ",be='qx.core.Assert.assertInstance(value, Date, msg) || true',bd='value !== null && value.nodeType !== undefined',bc='var inherit=prop.$$inherit;',bb='value !== null && value.nodeType === 9 && value.documentElement',ba='return init;',Y='value !== null && value.$$type === "Mixin"',t='qx.core.Assert.assertMap(value, msg) || true',u='var init=this.',r='return value;',s='qx.core.Assert.assertNumber(value, msg) || true',p='qx.core.Assert.assertPositiveInteger(value, msg) || true',q="': ",n="Error in property ",o='if(init==qx.core.Property.$$inherit)init=null;',x='qx.core.Assert.assertInteger(value, msg) || true',y="rv:1.8.1",G='value !== null && value.$$type === "Interface"',E="set",O='value !== null && value.$$type === "Theme"',J='qx.core.Assert.assertInstance(value, RegExp, msg) || true',U='value !== null && value.type !== undefined',S='value !== null && value.document',A=" in method ",X='qx.core.Assert.assertInstance(value, Error, msg) || true',W='throw new Error("Property ',V='qx.core.Assert.assertBoolean(value, msg) || true',z='return null;',C='qx.core.Assert.assertObject(value, msg) || true',D="setRuntime",F='value !== null && value.nodeType === 1 && value.attributes',H=" with incoming value '",K="setThemed",P='qx.core.Assert.assertString(value, msg) || true',T="inherit",v='value !== null && value.$$type === "Class"',w='qx.core.Assert.assertFunction(value, msg) || true',B='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',N='qx.core.Assert.assertArray(value, msg) || true',M='qx.core.Assert.assertPositiveNumber(value, msg) || true',L="object",R="MSIE 6.0",Q='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',I="qx.core.Property";
qx.Bootstrap.define(I,{statics:{__x:{"Boolean":V,"String":P,"Number":s,"Integer":x,"PositiveNumber":M,"PositiveInteger":p,"Error":X,"RegExp":J,"Object":C,"Array":N,"Map":t,"Function":w,"Date":be,"Node":bd,"Element":F,"Document":bb,"Window":S,"Event":U,"Class":v,"Mixin":Y,"Interface":G,"Theme":O,"Color":bh,"Decorator":B,"Font":bg},__y:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:T,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:h,dereference:j,inheritable:j,nullable:j,themeable:j,refine:j,init:null,apply:h,event:h,check:null,transform:h,deferredInit:j,validate:null},$$allowedGroupKeys:{name:h,group:L,mode:h,themeable:j},$$inheritable:{},__z:function(bj){var bk=this.__A(bj);

if(!bk.length){var bl=qx.lang.Function.empty;
}else{bl=this.__B(bk);
}bj.prototype.$$refreshInheritables=bl;
},__A:function(bm){var bo=[];

while(bm){var bn=bm.$$properties;

if(bn){for(var name in this.$$inheritable){if(bn[name]&&bn[name].inheritable){bo.push(name);
}}}bm=bm.superclass;
}return bo;
},__B:function(bp){var bt=this.$$store.inherit;
var bs=this.$$store.init;
var br=this.$$method.refresh;
var bq=["var parent = this.getLayoutParent();","if (!parent) return;"];

for(var i=0,l=bp.length;i<l;i++){var name=bp[i];
bq.push("var value = parent.",bt[name],";","if (value===undefined) value = parent.",bs[name],";","this.",br[name],"(value);");
}return new Function(bq.join(""));
},attachRefreshInheritables:function(bu){bu.prototype.$$refreshInheritables=function(){qx.core.Property.__z(bu);
return this.$$refreshInheritables();
};
},attachMethods:function(bv,name,bw){bw.group?this.__C(bv,bw,name):this.__D(bv,bw,name);
},__C:function(bx,by,name){var bF=qx.Bootstrap.firstUp(name);
var bE=bx.prototype;
var bG=by.themeable===true;
{};
var bH=[];
var bB=[];

if(bG){var bz=[];
var bD=[];
}var bC="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
bH.push(bC);

if(bG){bz.push(bC);
}
if(by.mode=="shorthand"){var bA="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
bH.push(bA);

if(bG){bz.push(bA);
}}
for(var i=0,a=by.group,l=a.length;i<l;i++){{};
bH.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
bB.push("this.",this.$$method.reset[a[i]],"();");

if(bG){{};
bz.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
bD.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+bF;
bE[this.$$method.set[name]]=new Function(bH.join(""));
this.$$method.reset[name]="reset"+bF;
bE[this.$$method.reset[name]]=new Function(bB.join(""));

if(bG){this.$$method.setThemed[name]="setThemed"+bF;
bE[this.$$method.setThemed[name]]=new Function(bz.join(""));
this.$$method.resetThemed[name]="resetThemed"+bF;
bE[this.$$method.resetThemed[name]]=new Function(bD.join(""));
}},__D:function(bI,bJ,name){var bL=qx.Bootstrap.firstUp(name);
var bN=bI.prototype;
{};
if(bJ.dereference===undefined&&typeof bJ.check==="string"){bJ.dereference=this.__E(bJ.check);
}var bM=this.$$method;
var bK=this.$$store;
bK.runtime[name]="$$runtime_"+name;
bK.user[name]="$$user_"+name;
bK.theme[name]="$$theme_"+name;
bK.init[name]="$$init_"+name;
bK.inherit[name]="$$inherit_"+name;
bK.useinit[name]="$$useinit_"+name;
bM.get[name]="get"+bL;
bN[bM.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,bI,name,"get");
};
bM.set[name]="set"+bL;
bN[bM.set[name]]=function(bO){return qx.core.Property.executeOptimizedSetter(this,bI,name,"set",arguments);
};
bM.reset[name]="reset"+bL;
bN[bM.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"reset");
};

if(bJ.inheritable||bJ.apply||bJ.event||bJ.deferredInit){bM.init[name]="init"+bL;
bN[bM.init[name]]=function(bP){return qx.core.Property.executeOptimizedSetter(this,bI,name,"init",arguments);
};
}
if(bJ.inheritable){bM.refresh[name]="refresh"+bL;
bN[bM.refresh[name]]=function(bQ){return qx.core.Property.executeOptimizedSetter(this,bI,name,"refresh",arguments);
};
}bM.setRuntime[name]="setRuntime"+bL;
bN[bM.setRuntime[name]]=function(bR){return qx.core.Property.executeOptimizedSetter(this,bI,name,"setRuntime",arguments);
};
bM.resetRuntime[name]="resetRuntime"+bL;
bN[bM.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"resetRuntime");
};

if(bJ.themeable){bM.setThemed[name]="setThemed"+bL;
bN[bM.setThemed[name]]=function(bS){return qx.core.Property.executeOptimizedSetter(this,bI,name,"setThemed",arguments);
};
bM.resetThemed[name]="resetThemed"+bL;
bN[bM.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"resetThemed");
};
}
if(bJ.check==="Boolean"){bN["toggle"+bL]=new Function("return this."+bM.set[name]+"(!this."+bM.get[name]+"())");
bN["is"+bL]=new Function("return this."+bM.get[name]+"()");
}},__E:function(bT){return !!this.__y[bT];
},__F:function(bU){return this.__y[bU]||qx.Bootstrap.classIsDefined(bU)||(qx.Interface&&qx.Interface.isDefined(bU));
},__G:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(bV,bW,bX,bY,ca){var cb=bV.constructor.classname;
var cc=n+bX+bf+cb+A+this.$$method[bY][bX]+H+ca+q;
throw new Error(cc+(this.__G[bW]||"Unknown reason: "+bW));
},__H:function(cd,ce,name,cf,cg,ch){var ci=this.$$method[cf][name];
{ce[ci]=new Function("value",cg.join(""));
};
{};
qx.Bootstrap.setDisplayName(ce[ci],cd.classname+".prototype",ci);
if(ch===undefined){return cd[ci]();
}else{return cd[ci](ch[0]);
}},executeOptimizedGetter:function(cj,ck,name,cl){var cn=ck.$$properties[name];
var cp=ck.prototype;
var cm=[];
var co=this.$$store;
cm.push(e,co.runtime[name],g);
cm.push(k,co.runtime[name],m);

if(cn.inheritable){cm.push(f,co.inherit[name],g);
cm.push(k,co.inherit[name],m);
cm.push(d);
}cm.push(e,co.user[name],g);
cm.push(k,co.user[name],m);

if(cn.themeable){cm.push(f,co.theme[name],g);
cm.push(k,co.theme[name],m);
}
if(cn.deferredInit&&cn.init===undefined){cm.push(f,co.init[name],g);
cm.push(k,co.init[name],m);
}cm.push(d);

if(cn.init!==undefined){if(cn.inheritable){cm.push(u,co.init[name],m);

if(cn.nullable){cm.push(o);
}else if(cn.init!==undefined){cm.push(k,co.init[name],m);
}else{cm.push(Q,name,c,ck.classname,b);
}cm.push(ba);
}else{cm.push(k,co.init[name],m);
}}else if(cn.inheritable||cn.nullable){cm.push(z);
}else{cm.push(W,name,c,ck.classname,b);
}return this.__H(cj,cp,name,cl,cm);
},executeOptimizedSetter:function(cq,cr,name,cs,ct){var cy=cr.$$properties[name];
var cx=cr.prototype;
var cv=[];
var cu=cs===E||cs===K||cs===D||(cs===bi&&cy.init===undefined);
var cw=cy.apply||cy.event||cy.inheritable;
var cz=this.__I(cs,name);
this.__J(cv,cy,name,cs,cu);

if(cu){this.__K(cv,cr,cy,name);
}
if(cw){this.__L(cv,cu,cz,cs);
}
if(cy.inheritable){cv.push(bc);
}{};

if(!cw){this.__N(cv,name,cs,cu);
}else{this.__O(cv,cy,name,cs,cu);
}
if(cy.inheritable){this.__P(cv,cy,name,cs);
}else if(cw){this.__Q(cv,cy,name,cs);
}
if(cw){this.__R(cv,cy,name);
if(cy.inheritable&&cx._getChildren){this.__S(cv,name);
}}if(cu){cv.push(r);
}return this.__H(cq,cx,name,cs,cv,ct);
},__I:function(cA,name){if(cA==="setRuntime"||cA==="resetRuntime"){var cB=this.$$store.runtime[name];
}else if(cA==="setThemed"||cA==="resetThemed"){cB=this.$$store.theme[name];
}else if(cA==="init"){cB=this.$$store.init[name];
}else{cB=this.$$store.user[name];
}return cB;
},__J:function(cC,cD,name,cE,cF){{if(!cD.nullable||cD.check||cD.inheritable){cC.push('var prop=qx.core.Property;');
}if(cE==="set"){cC.push('if(value===undefined)prop.error(this,2,"',name,'","',cE,'",value);');
}};
},__K:function(cG,cH,cI,name){if(cI.transform){cG.push('value=this.',cI.transform,'(value);');
}if(cI.validate){if(typeof cI.validate==="string"){cG.push('this.',cI.validate,'(value);');
}else if(cI.validate instanceof Function){cG.push(cH.classname,'.$$properties.',name);
cG.push('.validate.call(this, value);');
}}},__L:function(cJ,cK,cL,cM){var cN=(cM==="reset"||cM==="resetThemed"||cM==="resetRuntime");

if(cK){cJ.push('if(this.',cL,'===value)return value;');
}else if(cN){cJ.push('if(this.',cL,'===undefined)return;');
}},__M:undefined,__N:function(cO,name,cP,cQ){if(cP==="setRuntime"){cO.push('this.',this.$$store.runtime[name],'=value;');
}else if(cP==="resetRuntime"){cO.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cO.push('delete this.',this.$$store.runtime[name],';');
}else if(cP==="set"){cO.push('this.',this.$$store.user[name],'=value;');
}else if(cP==="reset"){cO.push('if(this.',this.$$store.user[name],'!==undefined)');
cO.push('delete this.',this.$$store.user[name],';');
}else if(cP==="setThemed"){cO.push('this.',this.$$store.theme[name],'=value;');
}else if(cP==="resetThemed"){cO.push('if(this.',this.$$store.theme[name],'!==undefined)');
cO.push('delete this.',this.$$store.theme[name],';');
}else if(cP==="init"&&cQ){cO.push('this.',this.$$store.init[name],'=value;');
}},__O:function(cR,cS,name,cT,cU){if(cS.inheritable){cR.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{cR.push('var computed, old;');
}cR.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(cT==="setRuntime"){cR.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cT==="resetRuntime"){cR.push('delete this.',this.$$store.runtime[name],';');
cR.push('if(this.',this.$$store.user[name],'!==undefined)');
cR.push('computed=this.',this.$$store.user[name],';');
cR.push('else if(this.',this.$$store.theme[name],'!==undefined)');
cR.push('computed=this.',this.$$store.theme[name],';');
cR.push('else if(this.',this.$$store.init[name],'!==undefined){');
cR.push('computed=this.',this.$$store.init[name],';');
cR.push('this.',this.$$store.useinit[name],'=true;');
cR.push('}');
}else{cR.push('old=computed=this.',this.$$store.runtime[name],';');
if(cT==="set"){cR.push('this.',this.$$store.user[name],'=value;');
}else if(cT==="reset"){cR.push('delete this.',this.$$store.user[name],';');
}else if(cT==="setThemed"){cR.push('this.',this.$$store.theme[name],'=value;');
}else if(cT==="resetThemed"){cR.push('delete this.',this.$$store.theme[name],';');
}else if(cT==="init"&&cU){cR.push('this.',this.$$store.init[name],'=value;');
}}cR.push('}');
cR.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(cT==="set"){if(!cS.inheritable){cR.push('old=this.',this.$$store.user[name],';');
}cR.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cT==="reset"){if(!cS.inheritable){cR.push('old=this.',this.$$store.user[name],';');
}cR.push('delete this.',this.$$store.user[name],';');
cR.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cR.push('computed=this.',this.$$store.runtime[name],';');
cR.push('if(this.',this.$$store.theme[name],'!==undefined)');
cR.push('computed=this.',this.$$store.theme[name],';');
cR.push('else if(this.',this.$$store.init[name],'!==undefined){');
cR.push('computed=this.',this.$$store.init[name],';');
cR.push('this.',this.$$store.useinit[name],'=true;');
cR.push('}');
}else{if(cT==="setRuntime"){cR.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cS.inheritable){cR.push('computed=this.',this.$$store.user[name],';');
}else{cR.push('old=computed=this.',this.$$store.user[name],';');
}if(cT==="setThemed"){cR.push('this.',this.$$store.theme[name],'=value;');
}else if(cT==="resetThemed"){cR.push('delete this.',this.$$store.theme[name],';');
}else if(cT==="init"&&cU){cR.push('this.',this.$$store.init[name],'=value;');
}}cR.push('}');
if(cS.themeable){cR.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!cS.inheritable){cR.push('old=this.',this.$$store.theme[name],';');
}
if(cT==="setRuntime"){cR.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cT==="set"){cR.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cT==="setThemed"){cR.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cT==="resetThemed"){cR.push('delete this.',this.$$store.theme[name],';');
cR.push('if(this.',this.$$store.init[name],'!==undefined){');
cR.push('computed=this.',this.$$store.init[name],';');
cR.push('this.',this.$$store.useinit[name],'=true;');
cR.push('}');
}else if(cT==="init"){if(cU){cR.push('this.',this.$$store.init[name],'=value;');
}cR.push('computed=this.',this.$$store.theme[name],';');
}else if(cT==="refresh"){cR.push('computed=this.',this.$$store.theme[name],';');
}cR.push('}');
}cR.push('else if(this.',this.$$store.useinit[name],'){');

if(!cS.inheritable){cR.push('old=this.',this.$$store.init[name],';');
}
if(cT==="init"){if(cU){cR.push('computed=this.',this.$$store.init[name],'=value;');
}else{cR.push('computed=this.',this.$$store.init[name],';');
}}else if(cT==="set"||cT==="setRuntime"||cT==="setThemed"||cT==="refresh"){cR.push('delete this.',this.$$store.useinit[name],';');

if(cT==="setRuntime"){cR.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cT==="set"){cR.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cT==="setThemed"){cR.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cT==="refresh"){cR.push('computed=this.',this.$$store.init[name],';');
}}cR.push('}');
if(cT==="set"||cT==="setRuntime"||cT==="setThemed"||cT==="init"){cR.push('else{');

if(cT==="setRuntime"){cR.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cT==="set"){cR.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cT==="setThemed"){cR.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cT==="init"){if(cU){cR.push('computed=this.',this.$$store.init[name],'=value;');
}else{cR.push('computed=this.',this.$$store.init[name],';');
}cR.push('this.',this.$$store.useinit[name],'=true;');
}cR.push('}');
}},__P:function(cV,cW,name,cX){cV.push('if(computed===undefined||computed===inherit){');

if(cX==="refresh"){cV.push('computed=value;');
}else{cV.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}cV.push('if((computed===undefined||computed===inherit)&&');
cV.push('this.',this.$$store.init[name],'!==undefined&&');
cV.push('this.',this.$$store.init[name],'!==inherit){');
cV.push('computed=this.',this.$$store.init[name],';');
cV.push('this.',this.$$store.useinit[name],'=true;');
cV.push('}else{');
cV.push('delete this.',this.$$store.useinit[name],';}');
cV.push('}');
cV.push('if(old===computed)return value;');
cV.push('if(computed===inherit){');
cV.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
cV.push('}');
cV.push('else if(computed===undefined)');
cV.push('delete this.',this.$$store.inherit[name],';');
cV.push('else this.',this.$$store.inherit[name],'=computed;');
cV.push('var backup=computed;');
if(cW.init!==undefined&&cX!=="init"){cV.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{cV.push('if(old===undefined)old=null;');
}cV.push('if(computed===undefined||computed==inherit)computed=null;');
},__Q:function(cY,da,name,db){if(db!=="set"&&db!=="setRuntime"&&db!=="setThemed"){cY.push('if(computed===undefined)computed=null;');
}cY.push('if(old===computed)return value;');
if(da.init!==undefined&&db!=="init"){cY.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{cY.push('if(old===undefined)old=null;');
}},__R:function(dc,dd,name){if(dd.apply){dc.push('this.',dd.apply,'(computed, old, "',name,'");');
}if(dd.event){dc.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dd.event,"')){","reg.fireEvent(this, '",dd.event,"', qx.event.type.Data, [computed, old]",")}");
}},__S:function(de,name){de.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
de.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
de.push('}');
}},defer:function(df){var dh=navigator.userAgent.indexOf(R)!=-1;
var dg=navigator.userAgent.indexOf(y)!=-1;
if(dh||dg){df.__E=df.__F;
}}});
})();
(function(){var k="[Class ",j="]",h="$$init_",g=".prototype",f="extend",e="qx.Class",d=".",c="static",b="qx.event.type.Data";
qx.Bootstrap.define(e,{statics:{define:function(name,m){if(!m){var m={};
}if(m.include&&!(m.include instanceof Array)){m.include=[m.include];
}if(m.implement&&!(m.implement instanceof Array)){m.implement=[m.implement];
}var n=false;

if(!m.hasOwnProperty(f)&&!m.type){m.type=c;
n=true;
}{};
var o=this.__X(name,m.type,m.extend,m.statics,m.construct,m.destruct,m.include);
if(m.extend){if(m.properties){this.__ba(o,m.properties,true);
}if(m.members){this.__bc(o,m.members,true,true,false);
}if(m.events){this.__Y(o,m.events,true);
}if(m.include){for(var i=0,l=m.include.length;i<l;i++){this.__bg(o,m.include[i],false);
}}}if(m.settings){for(var p in m.settings){qx.core.Setting.define(p,m.settings[p]);
}}if(m.variants){for(var p in m.variants){qx.core.Variant.define(p,m.variants[p].allowedValues,m.variants[p].defaultValue);
}}if(m.implement){for(var i=0,l=m.implement.length;i<l;i++){this.__be(o,m.implement[i]);
}}{};
if(m.defer){m.defer.self=o;
m.defer(o,o.prototype,{add:function(name,q){var r={};
r[name]=q;
qx.Class.__ba(o,r,true);
}});
}return o;
},undefine:function(name){delete this.$$registry[name];
var s=name.split(d);
var u=[window];

for(var i=0;i<s.length;i++){u.push(u[i][s[i]]);
}for(var i=u.length-1;i>=1;i--){var t=u[i];
var parent=u[i-1];

if(qx.Bootstrap.isFunction(t)||qx.Bootstrap.objectGetLength(t)===0){delete parent[s[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(v,w){{};
qx.Class.__bg(v,w,false);
},patch:function(x,y){{};
qx.Class.__bg(x,y,true);
},isSubClassOf:function(z,A){if(!z){return false;
}
if(z==A){return true;
}
if(z.prototype instanceof A){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(B){var C=[];

while(B){if(B.$$properties){C.push.apply(C,qx.Bootstrap.getKeys(B.$$properties));
}B=B.superclass;
}return C;
},getByProperty:function(D,name){while(D){if(D.$$properties&&D.$$properties[name]){return D;
}D=D.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(E,F){return E.$$includes&&E.$$includes.indexOf(F)!==-1;
},getByMixin:function(G,H){var I,i,l;

while(G){if(G.$$includes){I=G.$$flatIncludes;

for(i=0,l=I.length;i<l;i++){if(I[i]===H){return G;
}}}G=G.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(J,K){return !!this.getByMixin(J,K);
},hasOwnInterface:function(L,M){return L.$$implements&&L.$$implements.indexOf(M)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(N){var O=[];

while(N){if(N.$$implements){O.push.apply(O,N.$$flatImplements);
}N=N.superclass;
}return O;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(P,Q){var R=P.constructor;

if(this.hasInterface(R,Q)){return true;
}
try{qx.Interface.assertObject(P,Q);
return true;
}catch(S){}
try{qx.Interface.assert(R,Q,false);
return true;
}catch(T){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return k+this.classname+j;
},$$registry:qx.Bootstrap.$$registry,__T:null,__U:null,__V:function(){},__W:function(){},__X:function(name,U,V,W,X,Y,ba){var bd;

if(!V&&true){bd=W||{};
qx.Bootstrap.setDisplayNames(bd,name);
}else{var bd={};

if(V){if(!X){X=this.__bh();
}
if(this.__bj(V,ba)){bd=this.__bk(X,name,U);
}else{bd=X;
}if(U==="singleton"){bd.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(X,name,"constructor");
}if(W){qx.Bootstrap.setDisplayNames(W,name);
var be;

for(var i=0,a=qx.Bootstrap.getKeys(W),l=a.length;i<l;i++){be=a[i];
var bb=W[be];
{bd[be]=bb;
};
}}}var bc=qx.Bootstrap.createNamespace(name,bd);
bd.name=bd.classname=name;
bd.basename=bc;
bd.$$type="Class";

if(U){bd.$$classtype=U;
}if(!bd.hasOwnProperty("toString")){bd.toString=this.genericToString;
}
if(V){qx.Bootstrap.extendClass(bd,X,V,name,bc);
if(Y){{};
bd.$$destructor=Y;
qx.Bootstrap.setDisplayName(Y,name,"destruct");
}}this.$$registry[name]=bd;
return bd;
},__Y:function(bf,bg,bh){var bi,bi;
{};

if(bf.$$events){for(var bi in bg){bf.$$events[bi]=bg[bi];
}}else{bf.$$events=bg;
}},__ba:function(bj,bk,bl){var bm;

if(bl===undefined){bl=false;
}var bn=bj.prototype;

for(var name in bk){bm=bk[name];
{};
bm.name=name;
if(!bm.refine){if(bj.$$properties===undefined){bj.$$properties={};
}bj.$$properties[name]=bm;
}if(bm.init!==undefined){bj.prototype[h+name]=bm.init;
}if(bm.event!==undefined){var event={};
event[bm.event]=b;
this.__Y(bj,event,bl);
}if(bm.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bn.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bj);
}}
if(!bm.refine){qx.core.Property.attachMethods(bj,name,bm);
}}},__bb:null,__bc:function(bo,bp,bq,br,bs){var bt=bo.prototype;
var bv,bu;
qx.Bootstrap.setDisplayNames(bp,bo.classname+g);

for(var i=0,a=qx.Bootstrap.getKeys(bp),l=a.length;i<l;i++){bv=a[i];
bu=bp[bv];
{};
if(br!==false&&bu instanceof Function&&bu.$$type==null){if(bs==true){bu=this.__bd(bu,bt[bv]);
}else{if(bt[bv]){bu.base=bt[bv];
}bu.self=bo;
}{};
}bt[bv]=bu;
}},__bd:function(bw,bx){if(bx){return function(){var bz=bw.base;
bw.base=bx;
var by=bw.apply(this,arguments);
bw.base=bz;
return by;
};
}else{return bw;
}},__be:function(bA,bB){{};
var bC=qx.Interface.flatten([bB]);

if(bA.$$implements){bA.$$implements.push(bB);
bA.$$flatImplements.push.apply(bA.$$flatImplements,bC);
}else{bA.$$implements=[bB];
bA.$$flatImplements=bC;
}},__bf:function(bD){var name=bD.classname;
var bE=this.__bk(bD,name,bD.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bD),l=a.length;i<l;i++){bF=a[i];
bE[bF]=bD[bF];
}bE.prototype=bD.prototype;
var bH=bD.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(bH),l=a.length;i<l;i++){bF=a[i];
var bI=bH[bF];
if(bI&&bI.self==bD){bI.self=bE;
}}for(var bF in this.$$registry){var bG=this.$$registry[bF];

if(!bG){continue;
}
if(bG.base==bD){bG.base=bE;
}
if(bG.superclass==bD){bG.superclass=bE;
}
if(bG.$$original){if(bG.$$original.base==bD){bG.$$original.base=bE;
}
if(bG.$$original.superclass==bD){bG.$$original.superclass=bE;
}}}qx.Bootstrap.createNamespace(name,bE);
this.$$registry[name]=bE;
return bE;
},__bg:function(bJ,bK,bL){{};

if(this.hasMixin(bJ,bK)){return;
}var bO=bJ.$$original;

if(bK.$$constructor&&!bO){bJ=this.__bf(bJ);
}var bN=qx.Mixin.flatten([bK]);
var bM;

for(var i=0,l=bN.length;i<l;i++){bM=bN[i];
if(bM.$$events){this.__Y(bJ,bM.$$events,bL);
}if(bM.$$properties){this.__ba(bJ,bM.$$properties,bL);
}if(bM.$$members){this.__bc(bJ,bM.$$members,bL,bL,bL);
}}if(bJ.$$includes){bJ.$$includes.push(bK);
bJ.$$flatIncludes.push.apply(bJ.$$flatIncludes,bN);
}else{bJ.$$includes=[bK];
bJ.$$flatIncludes=bN;
}},__bh:function(){function bP(){bP.base.apply(this,arguments);
}return bP;
},__bi:function(){return function(){};
},__bj:function(bQ,bR){{};
if(bQ&&bQ.$$includes){var bS=bQ.$$flatIncludes;

for(var i=0,l=bS.length;i<l;i++){if(bS[i].$$constructor){return true;
}}}if(bR){var bT=qx.Mixin.flatten(bR);

for(var i=0,l=bT.length;i<l;i++){if(bT[i].$$constructor){return true;
}}}return false;
},__bk:function(bU,name,bV){var bW;
var bX=function(){var cb=bX;
{};
var ca=cb.$$original.apply(this,arguments);
if(cb.$$includes){var bY=cb.$$flatIncludes;

for(var i=0,l=bY.length;i<l;i++){if(bY[i].$$constructor){bY[i].$$constructor.apply(this,arguments);
}}}{};
return ca;
};
{};
bX.$$original=bU;
bU.wrapper=bX;
return bX;
}},defer:function(){var cc,cd,ce;
{};
}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__p:function(){var t=d;
var x=e;
var w=window.navigator.userAgent;
var z=false;
var v=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){t=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(w)){x=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){x+=q+RegExp.$3;
}}else{v=true;
x=i;
}}else if(window.navigator.userAgent.indexOf(j)!=-1){t=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(w)){x=RegExp.$1;
var y=RegExp(n).exec(x);

if(y){x=x.slice(0,y.index);
}}else{v=true;
x=m;
}}else if(window.controllers&&window.navigator.product===c){t=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(w)){x=RegExp.$1;
}else{v=true;
x=r;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(w)){t=k;
x=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(x<8&&/Trident\/([^\);]+)(\)|;)/.test(w)){if(RegExp.$1===g){x=h;
}}this.MSHTML=true;
}else{var u=window.qxFail;

if(u&&typeof u===o){var t=u();

if(t.NAME&&t.FULLVERSION){t=t.NAME;
this[t.toUpperCase()]=true;
x=t.FULLVERSION;
}}else{z=true;
v=true;
x=r;
t=s;
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+w+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=z;
this.UNKNOWN_VERSION=v;
this.NAME=t;
this.FULLVERSION=x;
this.VERSION=parseFloat(x);
}},defer:function(A){A.__p();
}});
})();
(function(){var x="off",w="on",u="|",t="default",s="object",r="&",q="qx.aspects",p="qx.mobile.nativescroll",o="qx.mobile.emulatetouch",n="$",e="qx.allowUrlVariants",m="qx.debug",h="qx.client",c="qx.dynlocale",b="webkit",g="qxvariant",f="opera",j=":",a="qx.core.Variant",k="mshtml",d="gecko";
qx.Bootstrap.define(a,{statics:{__q:{},__r:{},compilerIsSet:function(){return true;
},define:function(y,z,A){{};

if(!this.__q[y]){this.__q[y]={};
}else{}this.__q[y].allowedValues=z;
this.__q[y].defaultValue=A;
},get:function(B){var C=this.__q[B];
{};

if(C.value!==undefined){return C.value;
}return C.defaultValue;
},__s:function(){if(window.qxvariants){for(var D in qxvariants){{};

if(!this.__q[D]){this.__q[D]={};
}this.__q[D].value=qxvariants[D];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(E){}this.__t(this.__q);
}},__t:function(){if(qx.core.Setting.get(e)!=true){return;
}var F=document.location.search.slice(1).split(r);

for(var i=0;i<F.length;i++){var G=F[i].split(j);

if(G.length!=3||G[0]!=g){continue;
}var H=G[1];

if(!this.__q[H]){this.__q[H]={};
}this.__q[H].value=decodeURIComponent(G[2]);
}},select:function(I,J){{};

for(var K in J){if(this.isSet(I,K)){return J[K];
}}
if(J[t]!==undefined){return J[t];
}{};
},isSet:function(L,M){var N=L+n+M;

if(this.__r[N]!==undefined){return this.__r[N];
}var P=false;
if(M.indexOf(u)<0){P=this.get(L)===M;
}else{var O=M.split(u);

for(var i=0,l=O.length;i<l;i++){if(this.get(L)===O[i]){P=true;
break;
}}}this.__r[N]=P;
return P;
},__u:function(v){return typeof v===s&&v!==null&&v instanceof Array;
},__v:function(v){return typeof v===s&&v!==null&&!(v instanceof Array);
},__w:function(Q,R){for(var i=0,l=Q.length;i<l;i++){if(Q[i]==R){return true;
}}return false;
}},defer:function(S){S.define(h,[d,k,f,b],qx.bom.client.Engine.NAME);
S.define(m,[w,x],w);
S.define(q,[w,x],x);
S.define(c,[w,x],w);
S.define(o,[w,x],x);
S.define(p,[w,x],x);
S.__s();
}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(e){return e.nodeType===
this.DOCUMENT?e:
e.ownerDocument||e.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(f){if(f.nodeType==null){return f;
}if(f.nodeType!==this.DOCUMENT){f=f.ownerDocument;
}return f.parentWindow;
},"default":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.defaultView;
}}),getDocumentElement:function(h){return this.getDocument(h).documentElement;
},getBodyElement:function(j){return this.getDocument(j).body;
},isNode:function(k){return !!(k&&k.nodeType!=null);
},isElement:function(l){return !!(l&&l.nodeType===this.ELEMENT);
},isDocument:function(m){return !!(m&&m.nodeType===this.DOCUMENT);
},isText:function(n){return !!(n&&n.nodeType===this.TEXT);
},isWindow:function(o){return !!(o&&o.history&&o.location&&o.document);
},isNodeName:function(p,q){if(!q||!p||!p.nodeName){return false;
}return q.toLowerCase()==qx.dom.Node.getName(p);
},getName:function(r){if(!r||!r.nodeName){return null;
}return r.nodeName.toLowerCase();
},getText:function(s){if(!s||!s.nodeType){return null;
}
switch(s.nodeType){case 1:var i,a=[],t=s.childNodes,length=t.length;

for(i=0;i<length;i++){a[i]=this.getText(t[i]);
}return a.join(b);
case 2:return s.nodeValue;
break;
case 3:return s.nodeValue;
break;
}return null;
},isBlockNode:function(u){if(!qx.dom.Node.isElement(u)){return false;
}u=qx.dom.Node.getName(u);
return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(u);
}}});
})();
(function(){var j="on",i="qx.client",h="gecko",g="function",f="HTMLEvents",d="mousedown",c="qx.bom.Event",b="return;",a="mouseover";
qx.Class.define(c,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);
}else if(k.attachEvent){k.attachEvent(j+l,m);
}},removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);
}else if(o.detachEvent){try{o.detachEvent(j+p,q);
}catch(e){if(e.number!==-2146828218){throw e;
}}}},getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if(qx.core.Variant.isSet(i,h)){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}}return e.relatedTarget;
}else if(e.fromElement!==undefined&&e.type===a){return e.fromElement;
}else if(e.toElement!==undefined){return e.toElement;
}else{return null;
}},preventDefault:function(e){if(e.preventDefault){if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION>=1.9&&e.type==d&&e.button==2){return;
}e.preventDefault();
if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(s){}}}else{try{e.keyCode=0;
}catch(t){}e.returnValue=false;
}},stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}else{e.cancelBubble=true;
}},fire:function(u,v){if(document.createEvent){var w=document.createEvent(f);
w.initEvent(v,true,true);
return !u.dispatchEvent(w);
}else{var w=document.createEventObject();
return u.fireEvent(j+v,w);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(x,y){return x.hasOwnProperty(j+y);
},"default":function(z,A){var B=j+A;
var C=(B in z);

if(!C){C=typeof z[B]==g;

if(!C&&z.setAttribute){z.setAttribute(B,b);
C=typeof z[B]==g;
z.removeAttribute(B);
}}return C;
}})}});
})();
(function(){var r="|bubble",q="|capture",p="|",o="",n="_",m="unload",k="UNKNOWN_",j="__bJ",h="c",g="DOM_",c="__bI",f="WIN_",e="QX_",b="qx.event.Manager",a="capture",d="DOCUMENT_";
qx.Class.define(b,{extend:Object,construct:function(s,t){this.__bE=s;
this.__bF=qx.core.ObjectRegistry.toHashCode(s);
this.__bG=t;
if(s.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(s,m,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,m,arguments.callee);
self.dispose();
}));
}this.__bH={};
this.__bI={};
this.__bJ={};
this.__bK={};
},statics:{__bL:0,getNextUniqueId:function(){return (this.__bL++)+o;
}},members:{__bG:null,__bH:null,__bJ:null,__bM:null,__bI:null,__bK:null,__bE:null,__bF:null,getWindow:function(){return this.__bE;
},getWindowId:function(){return this.__bF;
},getHandler:function(u){var v=this.__bI[u.classname];

if(v){return v;
}return this.__bI[u.classname]=new u(this);
},getDispatcher:function(w){var x=this.__bJ[w.classname];

if(x){return x;
}return this.__bJ[w.classname]=new w(this,this.__bG);
},getListeners:function(y,z,A){var B=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);
var D=this.__bH[B];

if(!D){return null;
}var E=z+(A?q:r);
var C=D[E];
return C?C.concat():null;
},serializeListeners:function(F){var M=F.$$hash||qx.core.ObjectRegistry.toHashCode(F);
var O=this.__bH[M];
var K=[];

if(O){var I,N,G,J,L;

for(var H in O){I=H.indexOf(p);
N=H.substring(0,I);
G=H.charAt(I+1)==h;
J=O[H];

for(var i=0,l=J.length;i<l;i++){L=J[i];
K.push({self:L.context,handler:L.handler,type:N,capture:G});
}}}return K;
},toggleAttachedEvents:function(P,Q){var V=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);
var X=this.__bH[V];

if(X){var S,W,R,T;

for(var U in X){S=U.indexOf(p);
W=U.substring(0,S);
R=U.charCodeAt(S+1)===99;
T=X[U];

if(Q){this.__bN(P,W,R);
}else{this.__bO(P,W,R);
}}}},hasListener:function(Y,ba,bb){{};
var bc=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);
var be=this.__bH[bc];

if(!be){return false;
}var bf=ba+(bb?q:r);
var bd=be[bf];
return bd&&bd.length>0;
},importListeners:function(bg,bh){{};
var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);
var bo=this.__bH[bn]={};
var bk=qx.event.Manager;

for(var bi in bh){var bl=bh[bi];
var bm=bl.type+(bl.capture?q:r);
var bj=bo[bm];

if(!bj){bj=bo[bm]=[];
this.__bN(bg,bl.type,bl.capture);
}bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__bL++)+o});
}},addListener:function(bp,bq,br,self,bs){var bw;
{};
var bx=bp.$$hash||qx.core.ObjectRegistry.toHashCode(bp);
var bz=this.__bH[bx];

if(!bz){bz=this.__bH[bx]={};
}var bv=bq+(bs?q:r);
var bu=bz[bv];

if(!bu){bu=bz[bv]=[];
}if(bu.length===0){this.__bN(bp,bq,bs);
}var by=(qx.event.Manager.__bL++)+o;
var bt={handler:br,context:self,unique:by};
bu.push(bt);
return bv+p+by;
},findHandler:function(bA,bB){var bN=false,bF=false,bO=false,bC=false;
var bL;

if(bA.nodeType===1){bN=true;
bL=g+bA.tagName.toLowerCase()+n+bB;
}else if(bA.nodeType===9){bC=true;
bL=d+bB;
}else if(bA==this.__bE){bF=true;
bL=f+bB;
}else if(bA.classname){bO=true;
bL=e+bA.classname+n+bB;
}else{bL=k+bA+n+bB;
}var bH=this.__bK;

if(bH[bL]){return bH[bL];
}var bK=this.__bG.getHandlers();
var bG=qx.event.IEventHandler;
var bI,bJ,bE,bD;

for(var i=0,l=bK.length;i<l;i++){bI=bK[i];
bE=bI.SUPPORTED_TYPES;

if(bE&&!bE[bB]){continue;
}bD=bI.TARGET_CHECK;

if(bD){var bM=false;

if(bN&&((bD&bG.TARGET_DOMNODE)!=0)){bM=true;
}else if(bF&&((bD&bG.TARGET_WINDOW)!=0)){bM=true;
}else if(bO&&((bD&bG.TARGET_OBJECT)!=0)){bM=true;
}else if(bC&&((bD&bG.TARGET_DOCUMENT)!=0)){bM=true;
}
if(!bM){continue;
}}bJ=this.getHandler(bK[i]);

if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bA,bB)){bH[bL]=bJ;
return bJ;
}}return null;
},__bN:function(bP,bQ,bR){var bS=this.findHandler(bP,bQ);

if(bS){bS.registerEvent(bP,bQ,bR);
return;
}{};
},removeListener:function(bT,bU,bV,self,bW){var cb;
{};
var cc=bT.$$hash||qx.core.ObjectRegistry.toHashCode(bT);
var cd=this.__bH[cc];

if(!cd){return false;
}var bX=bU+(bW?q:r);
var bY=cd[bX];

if(!bY){return false;
}var ca;

for(var i=0,l=bY.length;i<l;i++){ca=bY[i];

if(ca.handler===bV&&ca.context===self){qx.lang.Array.removeAt(bY,i);

if(bY.length==0){this.__bO(bT,bU,bW);
}return true;
}}return false;
},removeListenerById:function(ce,cf){var cl;
{};
var cj=cf.split(p);
var co=cj[0];
var cg=cj[1].charCodeAt(0)==99;
var cn=cj[2];
var cm=ce.$$hash||qx.core.ObjectRegistry.toHashCode(ce);
var cp=this.__bH[cm];

if(!cp){return false;
}var ck=co+(cg?q:r);
var ci=cp[ck];

if(!ci){return false;
}var ch;

for(var i=0,l=ci.length;i<l;i++){ch=ci[i];

if(ch.unique===cn){qx.lang.Array.removeAt(ci,i);

if(ci.length==0){this.__bO(ce,co,cg);
}return true;
}}return false;
},removeAllListeners:function(cq){var cu=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);
var cw=this.__bH[cu];

if(!cw){return false;
}var cs,cv,cr;

for(var ct in cw){if(cw[ct].length>0){cs=ct.split(p);
cv=cs[0];
cr=cs[1]===a;
this.__bO(cq,cv,cr);
}}delete this.__bH[cu];
return true;
},deleteAllListeners:function(cx){delete this.__bH[cx];
},__bO:function(cy,cz,cA){var cB=this.findHandler(cy,cz);

if(cB){cB.unregisterEvent(cy,cz,cA);
return;
}{};
},dispatchEvent:function(cC,event){var cH;
{};
var cI=event.getType();

if(!event.getBubbles()&&!this.hasListener(cC,cI)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cC);
}var cG=this.__bG.getDispatchers();
var cF;
var cE=false;

for(var i=0,l=cG.length;i<l;i++){cF=this.getDispatcher(cG[i]);
if(cF.canDispatchEvent(cC,event,cI)){cF.dispatchEvent(cC,event,cI);
cE=true;
break;
}}
if(!cE){{};
return true;
}var cD=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cD;
},dispose:function(){this.__bG.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,c);
qx.util.DisposeUtil.disposeMap(this,j);
this.__bH=this.__bE=this.__bM=null;
this.__bG=this.__bK=null;
}}});
})();
(function(){var g="mshtml",f="qx.client",e="[object Array]",d="qx.lang.Array",c="qx",b="number",a="string";
qx.Class.define(d,{statics:{toArray:function(h,j){return this.cast(h,Array,j);
},cast:function(k,m,n){if(k.constructor===m){return k;
}
if(qx.Class.hasInterface(k,qx.data.IListData)){var k=k.toArray();
}var o=new m;
if(qx.core.Variant.isSet(f,g)){if(k.item){for(var i=n||0,l=k.length;i<l;i++){o.push(k[i]);
}return o;
}}if(Object.prototype.toString.call(k)===e&&n==null){o.push.apply(o,k);
}else{o.push.apply(o,Array.prototype.slice.call(k,n||0));
}return o;
},fromArguments:function(p,q){return Array.prototype.slice.call(p,q||0);
},fromCollection:function(r){if(qx.core.Variant.isSet(f,g)){if(r.item){var s=[];

for(var i=0,l=r.length;i<l;i++){s[i]=r[i];
}return s;
}}return Array.prototype.slice.call(r,0);
},fromShortHand:function(t){var v=t.length;
var u=qx.lang.Array.clone(t);
switch(v){case 1:u[1]=u[2]=u[3]=u[0];
break;
case 2:u[2]=u[0];
case 3:u[3]=u[1];
}return u;
},clone:function(w){return w.concat();
},insertAt:function(x,y,i){x.splice(i,0,y);
return x;
},insertBefore:function(z,A,B){var i=z.indexOf(B);

if(i==-1){z.push(A);
}else{z.splice(i,0,A);
}return z;
},insertAfter:function(C,D,E){var i=C.indexOf(E);

if(i==-1||i==(C.length-1)){C.push(D);
}else{C.splice(i+1,0,D);
}return C;
},removeAt:function(F,i){return F.splice(i,1)[0];
},removeAll:function(G){G.length=0;
return this;
},append:function(H,I){{};
Array.prototype.push.apply(H,I);
return H;
},exclude:function(J,K){{};

for(var i=0,M=K.length,L;i<M;i++){L=J.indexOf(K[i]);

if(L!=-1){J.splice(L,1);
}}return J;
},remove:function(N,O){var i=N.indexOf(O);

if(i!=-1){N.splice(i,1);
return O;
}},contains:function(P,Q){return P.indexOf(Q)!==-1;
},equals:function(R,S){var length=R.length;

if(length!==S.length){return false;
}
for(var i=0;i<length;i++){if(R[i]!==S[i]){return false;
}}return true;
},sum:function(T){var U=0;

for(var i=0,l=T.length;i<l;i++){U+=T[i];
}return U;
},max:function(V){{};
var i,X=V.length,W=V[0];

for(i=1;i<X;i++){if(V[i]>W){W=V[i];
}}return W===undefined?null:W;
},min:function(Y){{};
var i,bb=Y.length,ba=Y[0];

for(i=1;i<bb;i++){if(Y[i]<ba){ba=Y[i];
}}return ba===undefined?null:ba;
},unique:function(bc){var bm=[],be={},bh={},bj={};
var bi,bd=0;
var bn=c+qx.lang.Date.now();
var bf=false,bl=false,bo=false;
for(var i=0,bk=bc.length;i<bk;i++){bi=bc[i];
if(bi===null){if(!bf){bf=true;
bm.push(bi);
}}else if(bi===undefined){}else if(bi===false){if(!bl){bl=true;
bm.push(bi);
}}else if(bi===true){if(!bo){bo=true;
bm.push(bi);
}}else if(typeof bi===a){if(!be[bi]){be[bi]=1;
bm.push(bi);
}}else if(typeof bi===b){if(!bh[bi]){bh[bi]=1;
bm.push(bi);
}}else{bg=bi[bn];

if(bg==null){bg=bi[bn]=bd++;
}
if(!bj[bg]){bj[bg]=bi;
bm.push(bi);
}}}for(var bg in bj){try{delete bj[bg][bn];
}catch(bp){try{bj[bg][bn]=null;
}catch(bq){throw new Error("Cannot clean-up map entry doneObjects["+bg+"]["+bn+"]");
}}}return bm;
}}});
})();
(function(){var f="()",e=".",d=".prototype.",c='anonymous()',b="qx.lang.Function",a=".constructor()";
qx.Class.define(b,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;
},getName:function(h){if(h.displayName){return h.displayName;
}
if(h.$$original||h.wrapper||h.classname){return h.classname+a;
}
if(h.$$mixin){for(var j in h.$$mixin.$$members){if(h.$$mixin.$$members[j]==h){return h.$$mixin.name+d+j+f;
}}for(var j in h.$$mixin){if(h.$$mixin[j]==h){return h.$$mixin.name+e+j+f;
}}}
if(h.self){var k=h.self.constructor;

if(k){for(var j in k.prototype){if(k.prototype[j]==h){return k.classname+d+j+f;
}}for(var j in k){if(k[j]==h){return k.classname+e+j+f;
}}}}var i=h.toString().match(/function\s*(\w*)\s*\(.*/);

if(i&&i.length>=1&&i[1]){return i[1]+f;
}return c;
},globalEval:function(l){if(window.execScript){return window.execScript(l);
}else{return eval.call(window,l);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(m,n){{};
if(!n){return m;
}if(!(n.self||n.args||n.delay!=null||n.periodical!=null||n.attempt)){return m;
}return function(event){{};
var p=qx.lang.Array.fromArguments(arguments);
if(n.args){p=n.args.concat(p);
}
if(n.delay||n.periodical){var o=qx.event.GlobalError.observeMethod(function(){return m.apply(n.self||this,p);
});

if(n.delay){return window.setTimeout(o,n.delay);
}
if(n.periodical){return window.setInterval(o,n.periodical);
}}else if(n.attempt){var q=false;

try{q=m.apply(n.self||this,p);
}catch(r){}return q;
}else{return m.apply(n.self||this,p);
}};
},bind:function(s,self,t){return this.create(s,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(u,v){return this.create(u,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(w,self,x){if(arguments.length<3){return function(event){return w.call(self||this,event||window.event);
};
}else{var y=qx.lang.Array.fromArguments(arguments,2);
return function(event){var z=[event||window.event];
z.push.apply(z,y);
w.apply(self||this,z);
};
}},attempt:function(A,self,B){return this.create(A,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(C,D,self,E){return this.create(C,{delay:D,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(F,G,self,H){return this.create(F,{periodical:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var c="qx.event.Registration";
qx.Class.define(c,{statics:{__bP:{},getManager:function(d){if(d==null){{};
d=window;
}else if(d.nodeType){d=qx.dom.Node.getWindow(d);
}else if(!qx.dom.Node.isWindow(d)){d=window;
}var f=d.$$hash||qx.core.ObjectRegistry.toHashCode(d);
var e=this.__bP[f];

if(!e){e=new qx.event.Manager(d,this);
this.__bP[f]=e;
}return e;
},removeManager:function(g){var h=g.getWindowId();
delete this.__bP[h];
},addListener:function(i,j,k,self,l){return this.getManager(i).addListener(i,j,k,self,l);
},removeListener:function(m,n,o,self,p){return this.getManager(m).removeListener(m,n,o,self,p);
},removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);
},removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);
},deleteAllListeners:function(t){var u=t.$$hash;

if(u){this.getManager(t).deleteAllListeners(u);
}},hasListener:function(v,w,x){return this.getManager(v).hasListener(v,w,x);
},serializeListeners:function(y){return this.getManager(y).serializeListeners(y);
},createEvent:function(z,A,B){{};
if(A==null){A=qx.event.type.Event;
}var C=qx.event.Pool.getInstance().getObject(A);
B?C.init.apply(C,B):C.init();
if(z){C.setType(z);
}return C;
},dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);
},fireEvent:function(E,F,G,H){var I;
{};
var J=this.createEvent(F,G||null,H);
return this.getManager(E).dispatchEvent(E,J);
},fireNonBubblingEvent:function(K,L,M,N){{};
var O=this.getManager(K);

if(!O.hasListener(K,L,false)){return true;
}var P=this.createEvent(L,M||null,N);
return O.dispatchEvent(K,P);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bQ:[],addHandler:function(Q){{};
this.__bQ.push(Q);
this.__bQ.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bQ;
},__bR:[],addDispatcher:function(R,S){{};
this.__bR.push(R);
this.__bR.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bR;
}}});
})();
(function(){var e="$$hash",d="",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__bB:{},__bC:0,__bD:[],register:function(f){var j=this.__bB;

if(!j){return;
}var h=f.$$hash;

if(h==null){var g=this.__bD;

if(g.length>0){h=g.pop();
}else{h=(this.__bC++)+d;
}f.$$hash=h;
}{};
j[h]=f;
},unregister:function(k){var m=k.$$hash;

if(m==null){return;
}var n=this.__bB;

if(n&&n[m]){delete n[m];
this.__bD.push(m);
}try{delete k.$$hash;
}catch(o){if(k.removeAttribute){k.removeAttribute(e);
}}},toHashCode:function(p){{};
var r=p.$$hash;

if(r!=null){return r;
}var q=this.__bD;

if(q.length>0){r=q.pop();
}else{r=(this.__bC++)+d;
}return p.$$hash=r;
},clearHashCode:function(s){{};
var t=s.$$hash;

if(t!=null){this.__bD.push(t);
try{delete s.$$hash;
}catch(u){if(s.removeAttribute){s.removeAttribute(e);
}}}},fromHashCode:function(v){return this.__bB[v]||null;
},shutdown:function(){this.inShutDown=true;
var x=this.__bB;
var z=[];

for(var y in x){z.push(y);
}z.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);
});
var w,i=0,l=z.length;

while(true){try{for(;i<l;i++){y=z[i];
w=x[y];

if(w&&w.dispose){w.dispose();
}}}catch(A){qx.Bootstrap.error(this,"Could not dispose object "+w.toString()+": "+A);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bB;
},getRegistry:function(){return this.__bB;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__bl:0,__bm:0,__bn:false,__bo:0,__bp:null,__bq:null,setMaxEntries:function(c){this.__bq=c;
this.clear();
},getMaxEntries:function(){return this.__bq;
},addEntry:function(d){this.__bp[this.__bl]=d;
this.__bl=this.__br(this.__bl,1);
var e=this.getMaxEntries();

if(this.__bm<e){this.__bm++;
}if(this.__bn&&(this.__bo<e)){this.__bo++;
}},mark:function(){this.__bn=true;
this.__bo=0;
},clearMark:function(){this.__bn=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__bm){f=this.__bm;
}if(g&&this.__bn&&(f>this.__bo)){f=this.__bo;
}
if(f>0){var i=this.__br(this.__bl,-1);
var h=this.__br(i,-f+1);
var j;

if(h<=i){j=this.__bp.slice(h,i+1);
}else{j=this.__bp.slice(h,this.__bm).concat(this.__bp.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__bp=new Array(this.getMaxEntries());
this.__bm=0;
this.__bo=0;
this.__bl=0;
},__br:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(d){this.addEntry(d);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(e,f){return this.getEntries(e,f);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var j=":",h="qx.client",g="anonymous",f="...",e="qx.dev.StackTrace",d="",c="\n",b="/source/class/",a=".";
qx.Class.define(e,{statics:{getStackTrace:qx.core.Variant.select(h,{"gecko":function(){try{throw new Error();
}catch(x){var r=this.getStackTraceFromError(x);
qx.lang.Array.removeAt(r,0);
var p=this.getStackTraceFromCaller(arguments);
var n=p.length>r.length?p:r;

for(var i=0;i<Math.min(p.length,r.length);i++){var o=p[i];

if(o.indexOf(g)>=0){continue;
}var v=o.split(j);

if(v.length!=2){continue;
}var t=v[0];
var m=v[1];
var l=r[i];
var w=l.split(j);
var s=w[0];
var k=w[1];

if(qx.Class.getByName(s)){var q=s;
}else{q=t;
}var u=q+j;

if(m){u+=m+j;
}u+=k;
n[i]=u;
}return n;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var y;

try{y.bar();
}catch(A){var z=this.getStackTraceFromError(A);
qx.lang.Array.removeAt(z,0);
return z;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(h,{"opera":function(B){return [];
},"default":function(C){var H=[];
var G=qx.lang.Function.getCaller(C);
var D={};

while(G){var E=qx.lang.Function.getName(G);
H.push(E);

try{G=G.caller;
}catch(I){break;
}
if(!G){break;
}var F=qx.core.ObjectRegistry.toHashCode(G);

if(D[F]){H.push(f);
break;
}D[F]=G;
}return H;
}}),getStackTraceFromError:qx.core.Variant.select(h,{"gecko":function(J){if(!J.stack){return [];
}var P=/@(.+):(\d+)$/gm;
var K;
var L=[];

while((K=P.exec(J.stack))!=null){var M=K[1];
var O=K[2];
var N=this.__bs(M);
L.push(N+j+O);
}return L;
},"webkit":function(Q){if(Q.sourceURL&&Q.line){return [this.__bs(Q.sourceURL)+j+Q.line];
}else{return [];
}},"opera":function(R){if(R.message.indexOf("Backtrace:")<0){return [];
}var T=[];
var U=qx.lang.String.trim(R.message.split("Backtrace:")[1]);
var V=U.split(c);

for(var i=0;i<V.length;i++){var S=V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(S&&S.length>=2){var X=S[1];
var W=this.__bs(S[2]);
T.push(W+j+X);
}}return T;
},"default":function(){return [];
}}),__bs:function(Y){var bc=b;
var ba=Y.indexOf(bc);
var bb=(ba==-1)?Y:Y.substring(ba+bc.length).replace(/\//g,a).replace(/\.js$/,d);
return bb;
}}});
})();
(function(){var k="",j="g",h="0",g='\\$1',f="%",e='-',d="qx.lang.String",c=' ',b='\n',a="undefined";
qx.Class.define(d,{statics:{camelCase:function(l){return l.replace(/\-([a-z])/g,function(m,n){return n.toUpperCase();
});
},hyphenate:function(o){return o.replace(/[A-Z]/g,function(p){return (e+p.charAt(0).toLowerCase());
});
},capitalize:function(q){return q.replace(/\b[a-z]/g,function(r){return r.toUpperCase();
});
},clean:function(s){return this.trim(s.replace(/\s+/g,c));
},trimLeft:function(t){return t.replace(/^\s+/,k);
},trimRight:function(u){return u.replace(/\s+$/,k);
},trim:function(v){return v.replace(/^\s+|\s+$/g,k);
},startsWith:function(w,x){return w.indexOf(x)===0;
},endsWith:function(y,z){return y.substring(y.length-z.length,y.length)===z;
},repeat:function(A,B){return A.length>0?new Array(B+1).join(A):k;
},pad:function(C,length,D){var E=length-C.length;

if(E>0){if(typeof D===a){D=h;
}return this.repeat(D,E)+C;
}else{return C;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(F,G){return F.indexOf(G)!=-1;
},format:function(H,I){var J=H;

for(var i=0;i<I.length;i++){J=J.replace(new RegExp(f+(i+1),j),I[i]+k);
}return J;
},escapeRegexpChars:function(K){return K.replace(/([.*+?^${}()|[\]\/\\])/g,g);
},toArray:function(L){return L.split(/\B|\b/g);
},stripTags:function(M){return M.replace(/<\/?[^>]+>/gi,k);
},stripScripts:function(N,O){var Q=k;
var P=N.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){Q+=arguments[1]+b;
return k;
});

if(O===true){qx.lang.Function.globalEval(Q);
}return P;
}}});
})();
(function(){var k="node",j="error",h="...(+",g="array",f=")",e="info",d="instance",c="string",b="null",a="class",H="number",G="stringify",F="]",E="date",D="unknown",C="function",B="boolean",A="debug",z="map",y="undefined",s="qx.log.Logger",t="[",q="#",r="warn",o="document",p="{...(",m="text[",n="[...(",u="\n",v=")}",x=")]",w="object";
qx.Class.define(s,{statics:{__bt:A,setLevel:function(I){this.__bt=I;
},getLevel:function(){return this.__bt;
},setTreshold:function(J){this.__bw.setMaxMessages(J);
},getTreshold:function(){return this.__bw.getMaxMessages();
},__bu:{},__bv:0,register:function(K){if(K.$$id){return;
}var M=this.__bv++;
this.__bu[M]=K;
K.$$id=M;
var L=this.__bx;
var N=this.__bw.getAllLogEvents();

for(var i=0,l=N.length;i<l;i++){if(L[N[i].level]>=L[this.__bt]){K.process(N[i]);
}}},unregister:function(O){var P=O.$$id;

if(P==null){return;
}delete this.__bu[P];
delete O.$$id;
},debug:function(Q,R){qx.log.Logger.__by(A,arguments);
},info:function(S,T){qx.log.Logger.__by(e,arguments);
},warn:function(U,V){qx.log.Logger.__by(r,arguments);
},error:function(W,X){qx.log.Logger.__by(j,arguments);
},trace:function(Y){qx.log.Logger.__by(e,[Y,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(ba,bb){var bc;
{};
},deprecatedClassWarning:function(bd,be){var bf;
{};
},deprecatedEventWarning:function(bg,event,bh){var bi;
{};
},deprecatedMixinWarning:function(bj,bk){var bl;
{};
},deprecatedConstantWarning:function(bm,bn,bo){var self,bp;
{};
},deprecateMethodOverriding:function(bq,br,bs,bt){var bu;
{};
},clear:function(){this.__bw.clearHistory();
},__bw:new qx.log.appender.RingBuffer(50),__bx:{debug:0,info:1,warn:2,error:3},__by:function(bv,bw){var bB=this.__bx;

if(bB[bv]<bB[this.__bt]){return;
}var by=bw.length<2?null:bw[0];
var bA=by?1:0;
var bx=[];

for(var i=bA,l=bw.length;i<l;i++){bx.push(this.__bA(bw[i],true));
}var bC=new Date;
var bD={time:bC,offset:bC-qx.Bootstrap.LOADSTART,level:bv,items:bx,win:window};
if(by){if(by.$$hash!==undefined){bD.object=by.$$hash;
}else if(by.$$type){bD.clazz=by;
}}this.__bw.process(bD);
var bE=this.__bu;

for(var bz in bE){bE[bz].process(bD);
}},__bz:function(bF){if(bF===undefined){return y;
}else if(bF===null){return b;
}
if(bF.$$type){return a;
}var bG=typeof bF;

if(bG===C||bG==c||bG===H||bG===B){return bG;
}else if(bG===w){if(bF.nodeType){return k;
}else if(bF.classname){return d;
}else if(bF instanceof Array){return g;
}else if(bF instanceof Error){return j;
}else if(bF instanceof Date){return E;
}else{return z;
}}
if(bF.toString){return G;
}return D;
},__bA:function(bH,bI){var bP=this.__bz(bH);
var bL=D;
var bK=[];

switch(bP){case b:case y:bL=bP;
break;
case c:case H:case B:case E:bL=bH;
break;
case k:if(bH.nodeType===9){bL=o;
}else if(bH.nodeType===3){bL=m+bH.nodeValue+F;
}else if(bH.nodeType===1){bL=bH.nodeName.toLowerCase();

if(bH.id){bL+=q+bH.id;
}}else{bL=k;
}break;
case C:bL=qx.lang.Function.getName(bH)||bP;
break;
case d:bL=bH.basename+t+bH.$$hash+F;
break;
case a:case G:bL=bH.toString();
break;
case j:bK=qx.dev.StackTrace.getStackTraceFromError(bH);
bL=bH.toString();
break;
case g:if(bI){bL=[];

for(var i=0,l=bH.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bL.push(this.__bA(bH[i],false));
}}else{bL=n+bH.length+x;
}break;
case z:if(bI){var bJ;
var bO=[];

for(var bN in bH){bO.push(bN);
}bO.sort();
bL=[];

for(var i=0,l=bO.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bN=bO[i];
bJ=this.__bA(bH[bN],false);
bJ.key=bN;
bL.push(bJ);
}}else{var bM=0;

for(var bN in bH){bM++;
}bL=p+bM+v;
}break;
}return {type:bP,text:bL,trace:bK};
}},defer:function(bQ){var bR=qx.Bootstrap.$$logs;

for(var i=0;i<bR.length;i++){bQ.__by(bR[i][0],bR[i][1]);
}qx.Bootstrap.debug=bQ.debug;
qx.Bootstrap.info=bQ.info;
qx.Bootstrap.warn=bQ.warn;
qx.Bootstrap.error=bQ.error;
qx.Bootstrap.trace=bQ.trace;
}});
})();
(function(){var q="set",p="get",o="reset",n="MSIE 6.0",m="info",k="qx.core.Object",j="error",h="warn",g="]",f="debug",b="[",d="$$user_",c="rv:1.8.1",a="Object";
qx.Class.define(k,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:a},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+b+this.$$hash+g;
},base:function(r,s){{};

if(arguments.length===1){return r.callee.base.call(this);
}else{return r.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(t){return t.callee.self;
},clone:function(){var v=this.constructor;
var u=new v;
var x=qx.Class.getProperties(v);
var w=qx.core.Property.$$store.user;
var y=qx.core.Property.$$method.set;
var name;
for(var i=0,l=x.length;i<l;i++){name=x[i];

if(this.hasOwnProperty(w[name])){u[y[name]](this[w[name]]);
}}return u;
},set:function(z,A){var C=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(z)){if(!this[C[z]]){if(this[q+qx.Bootstrap.firstUp(z)]!=undefined){this[q+qx.Bootstrap.firstUp(z)](A);
return this;
}{};
}return this[C[z]](A);
}else{for(var B in z){if(!this[C[B]]){if(this[q+qx.Bootstrap.firstUp(B)]!=undefined){this[q+qx.Bootstrap.firstUp(B)](z[B]);
continue;
}{};
}this[C[B]](z[B]);
}return this;
}},get:function(D){var E=qx.core.Property.$$method.get;

if(!this[E[D]]){if(this[p+qx.Bootstrap.firstUp(D)]!=undefined){return this[p+qx.Bootstrap.firstUp(D)]();
}{};
}return this[E[D]]();
},reset:function(F){var G=qx.core.Property.$$method.reset;

if(!this[G[F]]){if(this[o+qx.Bootstrap.firstUp(F)]!=undefined){this[o+qx.Bootstrap.firstUp(F)]();
return;
}{};
}this[G[F]]();
},__cn:qx.event.Registration,addListener:function(H,I,self,J){if(!this.$$disposed){return this.__cn.addListener(this,H,I,self,J);
}return null;
},addListenerOnce:function(K,L,self,M){var N=function(e){this.removeListener(K,N,this,M);
L.call(self||this,e);
};
return this.addListener(K,N,this,M);
},removeListener:function(O,P,self,Q){if(!this.$$disposed){return this.__cn.removeListener(this,O,P,self,Q);
}return false;
},removeListenerById:function(R){if(!this.$$disposed){return this.__cn.removeListenerById(this,R);
}return false;
},hasListener:function(S,T){return this.__cn.hasListener(this,S,T);
},dispatchEvent:function(U){if(!this.$$disposed){return this.__cn.dispatchEvent(this,U);
}return true;
},fireEvent:function(V,W,X){if(!this.$$disposed){return this.__cn.fireEvent(this,V,W,X);
}return true;
},fireNonBubblingEvent:function(Y,ba,bb){if(!this.$$disposed){return this.__cn.fireNonBubblingEvent(this,Y,ba,bb);
}return true;
},fireDataEvent:function(bc,bd,be,bf){if(!this.$$disposed){if(be===undefined){be=null;
}return this.__cn.fireNonBubblingEvent(this,bc,qx.event.type.Data,[bd,be,!!bf]);
}return true;
},__co:null,setUserData:function(bg,bh){if(!this.__co){this.__co={};
}this.__co[bg]=bh;
},getUserData:function(bi){if(!this.__co){return null;
}var bj=this.__co[bi];
return bj===undefined?null:bj;
},__cp:qx.log.Logger,debug:function(bk){this.__cq(f,arguments);
},info:function(bl){this.__cq(m,arguments);
},warn:function(bm){this.__cq(h,arguments);
},error:function(bn){this.__cq(j,arguments);
},trace:function(){this.__cp.trace(this);
},__cq:function(bo,bp){var bq=qx.lang.Array.fromArguments(bp);
bq.unshift(this);
this.__cp[bo].apply(this.__cp,bq);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var bv,bt,bs,bw;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var bu=this.constructor;
var br;

while(bu.superclass){if(bu.$$destructor){bu.$$destructor.call(this);
}if(bu.$$includes){br=bu.$$flatIncludes;

for(var i=0,l=br.length;i<l;i++){if(br[i].$$destructor){br[i].$$destructor.call(this);
}}}bu=bu.superclass;
}if(this.__cr){this.__cr();
}{};
},__cr:null,__cs:function(){var bx=qx.Class.getProperties(this.constructor);

for(var i=0,l=bx.length;i<l;i++){delete this[d+bx[i]];
}},_disposeObjects:function(by){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bz){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(bA){qx.util.DisposeUtil.disposeArray(this,bA);
},_disposeMap:function(bB){qx.util.DisposeUtil.disposeMap(this,bB);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bC,bD){{};
var bF=navigator.userAgent.indexOf(n)!=-1;
var bE=navigator.userAgent.indexOf(c)!=-1;
if(bF||bE){bD.__cr=bD.__cs;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__co=null;
var bI=this.constructor;
var bM;
var bN=qx.core.Property.$$store;
var bK=bN.user;
var bL=bN.theme;
var bG=bN.inherit;
var bJ=bN.useinit;
var bH=bN.init;

while(bI){bM=bI.$$properties;

if(bM){for(var name in bM){if(bM[name].dereference){this[bK[name]]=this[bL[name]]=this[bG[name]]=this[bJ[name]]=this[bH[name]]=undefined;
}}}bI=bI.superclass;
}}});
})();
(function(){var a="qx.event.type.Event";
qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(b,c){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!b;
this._cancelable=!!c;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(d){if(d){var e=d;
}else{var e=qx.event.Pool.getInstance().getObject(this.constructor);
}e._type=this._type;
e._target=this._target;
e._currentTarget=this._currentTarget;
e._relatedTarget=this._relatedTarget;
e._originalTarget=this._originalTarget;
e._stopPropagation=this._stopPropagation;
e._bubbles=this._bubbles;
e._preventDefault=this._preventDefault;
e._cancelable=this._cancelable;
return e;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(f){this._type=f;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(g){this._eventPhase=g;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(h){this._target=h;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(i){this._currentTarget=i;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(j){this._relatedTarget=j;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(k){this._originalTarget=k;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(l){this._bubbles=l;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(m){this._cancelable=m;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cC:null,__cD:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cC=b;
this.__cD=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cC=this.__cC;
f.__cD=this.__cD;
return f;
},getData:function(){return this.__cC;
},getOldData:function(){return this.__cD;
}},destruct:function(){this.__cC=this.__cD=null;
}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){},setItem:function(e,f){},splice:function(g,h,i){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cH={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cH:null,getObject:function(d){if(this.$$disposed){return new d;
}
if(!d){throw new Error("Class needs to be defined!");
}var e=null;
var f=this.__cH[d.classname];

if(f){e=f.pop();
}
if(e){e.$$pooled=false;
}else{e=new d;
}return e;
},poolObject:function(g){if(!this.__cH){return;
}var h=g.classname;
var j=this.__cH[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__cH[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var n=this.__cH;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cH;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(b,c,d){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){if(!d&&b[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{b[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(e,f){var h=e[f];

if(!h){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{var g;

for(var i=h.length-1;i>=0;i--){g=h[i];

if(g){g.dispose();
}}}catch(j){throw new Error("The array field: "+f+" of object: "+e+" has non disposable entries: "+j);
}h.length=0;
e[f]=null;
},disposeMap:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var p in o){n=o[p];

if(o.hasOwnProperty(p)&&n){n.dispose();
}}}catch(q){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+q);
}k[m]=null;
},disposeTriggeredBy:function(r,s){var t=s.dispose;
s.dispose=function(){t.call(s);
r.dispose();
};
}}});
})();
(function(){var m="get",l="",k="[",h="last",g="change",f="]",d=".",c="Number",b="String",a="set",D="deepBinding",C="item",B="reset",A="' (",z="Boolean",y=").",x=") to the object '",w="Integer",v=" of object ",u="qx.data.SingleValueBinding",s="Binding property ",t="PositiveNumber",q="Binding from '",r="PositiveInteger",o="Binding does not exist!",p="Date",n=" not possible: No event available. ";
qx.Class.define(u,{statics:{DEBUG_ON:false,__cI:{},bind:function(E,F,G,H,I){var S=this.__cK(E,F,G,H,I);
var N=F.split(d);
var K=this.__cQ(N);
var R=[];
var O=[];
var P=[];
var L=[];
var M=E;
for(var i=0;i<N.length;i++){if(K[i]!==l){L.push(g);
}else{L.push(this.__cL(M,N[i]));
}R[i]=M;
if(i==N.length-1){if(K[i]!==l){var V=K[i]===h?M.length-1:K[i];
var J=M.getItem(V);
this.__cP(J,G,H,I,E);
P[i]=this.__cR(M,L[i],G,H,I,K[i]);
}else{if(N[i]!=null&&M[m+qx.lang.String.firstUp(N[i])]!=null){var J=M[m+qx.lang.String.firstUp(N[i])]();
this.__cP(J,G,H,I,E);
}P[i]=this.__cR(M,L[i],G,H,I);
}}else{var T={index:i,propertyNames:N,sources:R,listenerIds:P,arrayIndexValues:K,targetObject:G,targetPropertyChain:H,options:I,listeners:O};
var Q=qx.lang.Function.bind(this.__cJ,this,T);
O.push(Q);
P[i]=M.addListener(L[i],Q);
}if(M[m+qx.lang.String.firstUp(N[i])]==null){M=null;
}else if(K[i]!==l){M=M[m+qx.lang.String.firstUp(N[i])](K[i]);
}else{M=M[m+qx.lang.String.firstUp(N[i])]();
}
if(!M){break;
}}var U={type:D,listenerIds:P,sources:R,targetListenerIds:S.listenerIds,targets:S.targets};
this.__cS(U,E,F,G,H);
return U;
},__cJ:function(W){if(W.options&&W.options.onUpdate){W.options.onUpdate(W.sources[W.index],W.targetObject);
}for(var j=W.index+1;j<W.propertyNames.length;j++){var bb=W.sources[j];
W.sources[j]=null;

if(!bb){continue;
}bb.removeListenerById(W.listenerIds[j]);
}var bb=W.sources[W.index];
for(var j=W.index+1;j<W.propertyNames.length;j++){if(W.arrayIndexValues[j-1]!==l){bb=bb[m+qx.lang.String.firstUp(W.propertyNames[j-1])](W.arrayIndexValues[j-1]);
}else{bb=bb[m+qx.lang.String.firstUp(W.propertyNames[j-1])]();
}W.sources[j]=bb;
if(!bb){this.__cM(W.targetObject,W.targetPropertyChain);
break;
}if(j==W.propertyNames.length-1){if(qx.Class.implementsInterface(bb,qx.data.IListData)){var bc=W.arrayIndexValues[j]===h?bb.length-1:W.arrayIndexValues[j];
var Y=bb.getItem(bc);
this.__cP(Y,W.targetObject,W.targetPropertyChain,W.options,W.sources[W.index]);
W.listenerIds[j]=this.__cR(bb,g,W.targetObject,W.targetPropertyChain,W.options,W.arrayIndexValues[j]);
}else{if(W.propertyNames[j]!=null&&bb[m+qx.lang.String.firstUp(W.propertyNames[j])]!=null){var Y=bb[m+qx.lang.String.firstUp(W.propertyNames[j])]();
this.__cP(Y,W.targetObject,W.targetPropertyChain,W.options,W.sources[W.index]);
}var ba=this.__cL(bb,W.propertyNames[j]);
W.listenerIds[j]=this.__cR(bb,ba,W.targetObject,W.targetPropertyChain,W.options);
}}else{if(W.listeners[j]==null){var X=qx.lang.Function.bind(this.__cJ,this,W);
W.listeners.push(X);
}if(qx.Class.implementsInterface(bb,qx.data.IListData)){var ba=g;
}else{var ba=this.__cL(bb,W.propertyNames[j]);
}W.listenerIds[j]=bb.addListener(ba,W.listeners[j]);
}}},__cK:function(bd,be,bf,bg,bh){var bl=bg.split(d);
var bj=this.__cQ(bl);
var bq=[];
var bp=[];
var bn=[];
var bm=[];
var bk=bf;
for(var i=0;i<bl.length-1;i++){if(bj[i]!==l){bm.push(g);
}else{try{bm.push(this.__cL(bk,bl[i]));
}catch(e){break;
}}bq[i]=bk;
var bo=function(){for(var j=i+1;j<bl.length-1;j++){var bt=bq[j];
bq[j]=null;

if(!bt){continue;
}bt.removeListenerById(bn[j]);
}var bt=bq[i];
for(var j=i+1;j<bl.length-1;j++){var br=qx.lang.String.firstUp(bl[j-1]);
if(bj[j-1]!==l){var bu=bj[j-1]===h?bt.getLength()-1:bj[j-1];
bt=bt[m+br](bu);
}else{bt=bt[m+br]();
}bq[j]=bt;
if(bp[j]==null){bp.push(bo);
}if(qx.Class.implementsInterface(bt,qx.data.IListData)){var bs=g;
}else{try{var bs=qx.data.SingleValueBinding.__cL(bt,bl[j]);
}catch(e){break;
}}bn[j]=bt.addListener(bs,bp[j]);
}qx.data.SingleValueBinding.updateTarget(bd,be,bf,bg,bh);
};
bp.push(bo);
bn[i]=bk.addListener(bm[i],bo);
var bi=qx.lang.String.firstUp(bl[i]);
if(bk[m+bi]==null){bk=null;
}else if(bj[i]!==l){bk=bk[m+bi](bj[i]);
}else{bk=bk[m+bi]();
}
if(!bk){break;
}}return {listenerIds:bn,targets:bq};
},updateTarget:function(bv,bw,bx,by,bz){var bD=this.__cO(bv,bw);

if(bD!=null){var bF=bw.substring(bw.lastIndexOf(d)+1,bw.length);
if(bF.charAt(bF.length-1)==f){var bA=bF.substring(bF.lastIndexOf(k)+1,bF.length-1);
var bC=bF.substring(0,bF.lastIndexOf(k));
var bE=bD[m+qx.lang.String.firstUp(bC)]();

if(bA==h){bA=bE.length-1;
}
if(bE!=null){var bB=bE.getItem(bA);
}}else{var bB=bD[m+qx.lang.String.firstUp(bF)]();
}}bB=qx.data.SingleValueBinding.__cT(bB,bx,by,bz);
this.__cN(bx,by,bB);
},__cL:function(bG,bH){var bI=this.__cU(bG,bH);
if(bI==null){if(qx.Class.supportsEvent(bG.constructor,bH)){bI=bH;
}else if(qx.Class.supportsEvent(bG.constructor,g+qx.lang.String.firstUp(bH))){bI=g+qx.lang.String.firstUp(bH);
}else{throw new qx.core.AssertionError(s+bH+v+bG+n);
}}return bI;
},__cM:function(bJ,bK){var bL=this.__cO(bJ,bK);

if(bL!=null){var bM=bK.substring(bK.lastIndexOf(d)+1,bK.length);
if(bM.charAt(bM.length-1)==f){this.__cN(bJ,bK,null);
return;
}if(bL[B+qx.lang.String.firstUp(bM)]!=undefined){bL[B+qx.lang.String.firstUp(bM)]();
}else{bL[a+qx.lang.String.firstUp(bM)](null);
}}},__cN:function(bN,bO,bP){var bT=this.__cO(bN,bO);

if(bT!=null){var bU=bO.substring(bO.lastIndexOf(d)+1,bO.length);
if(bU.charAt(bU.length-1)==f){var bQ=bU.substring(bU.lastIndexOf(k)+1,bU.length-1);
var bS=bU.substring(0,bU.lastIndexOf(k));
var bR=bT[m+qx.lang.String.firstUp(bS)]();

if(bQ==h){bQ=bR.length-1;
}
if(bR!=null){bR.setItem(bQ,bP);
}}else{bT[a+qx.lang.String.firstUp(bU)](bP);
}}},__cO:function(bV,bW){var ca=bW.split(d);
var cb=bV;
for(var i=0;i<ca.length-1;i++){try{var bY=ca[i];
if(bY.indexOf(f)==bY.length-1){var bX=bY.substring(bY.indexOf(k)+1,bY.length-1);
bY=bY.substring(0,bY.indexOf(k));
}cb=cb[m+qx.lang.String.firstUp(bY)]();

if(bX!=null){if(bX==h){bX=cb.length-1;
}cb=cb.getItem(bX);
bX=null;
}}catch(cc){return null;
}}return cb;
},__cP:function(cd,ce,cf,cg,ch){cd=this.__cT(cd,ce,cf,cg);
if(cd===undefined){this.__cM(ce,cf);
}if(cd!==undefined){try{this.__cN(ce,cf,cd);
if(cg&&cg.onUpdate){cg.onUpdate(ch,ce,cd);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cg&&cg.onSetFail){cg.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cd+" on "+ce+". Error message: "+e);
}}}},__cQ:function(ci){var cj=[];
for(var i=0;i<ci.length;i++){var name=ci[i];
if(qx.lang.String.endsWith(name,f)){var ck=name.substring(name.indexOf(k)+1,name.indexOf(f));
if(name.indexOf(f)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(ck!==h){if(ck==l||isNaN(parseInt(ck,10))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(k)!=0){ci[i]=name.substring(0,name.indexOf(k));
cj[i]=l;
cj[i+1]=ck;
ci.splice(i+1,0,C);
i++;
}else{cj[i]=ck;
ci.splice(i,1,C);
}}else{cj[i]=l;
}}return cj;
},__cR:function(cl,cm,cn,co,cp,cq){var cr;
{};
var ct=function(cu,e){if(cu!==l){if(cu===h){cu=cl.length-1;
}var cx=cl.getItem(cu);
if(cx===undefined){qx.data.SingleValueBinding.__cM(cn,co);
}var cv=e.getData().start;
var cw=e.getData().end;

if(cu<cv||cu>cw){return;
}}else{var cx=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cl+" by "+cm+" to "+cn+" ("+co+")");
qx.log.Logger.debug("Data before conversion: "+cx);
}cx=qx.data.SingleValueBinding.__cT(cx,cn,co,cp);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+cx);
}try{if(cx!==undefined){qx.data.SingleValueBinding.__cN(cn,co,cx);
}else{qx.data.SingleValueBinding.__cM(cn,co);
}if(cp&&cp.onUpdate){cp.onUpdate(cl,cn,cx);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cp&&cp.onSetFail){cp.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cx+" on "+cn+". Error message: "+e);
}}};
if(!cq){cq=l;
}ct=qx.lang.Function.bind(ct,cl,cq);
var cs=cl.addListener(cm,ct);
return cs;
},__cS:function(cy,cz,cA,cB,cC){if(this.__cI[cz.toHashCode()]===undefined){this.__cI[cz.toHashCode()]=[];
}this.__cI[cz.toHashCode()].push([cy,cz,cA,cB,cC]);
},__cT:function(cD,cE,cF,cG){if(cG&&cG.converter){var cI;

if(cE.getModel){cI=cE.getModel();
}return cG.converter(cD,cI);
}else{var cK=this.__cO(cE,cF);
var cL=cF.substring(cF.lastIndexOf(d)+1,cF.length);
if(cK==null){return cD;
}var cJ=qx.Class.getPropertyDefinition(cK.constructor,cL);
var cH=cJ==null?l:cJ.check;
return this.__cV(cD,cH);
}},__cU:function(cM,cN){var cO=qx.Class.getPropertyDefinition(cM.constructor,cN);

if(cO==null){return null;
}return cO.event;
},__cV:function(cP,cQ){var cR=qx.lang.Type.getClass(cP);
if((cR==c||cR==b)&&(cQ==w||cQ==r)){cP=parseInt(cP,10);
}if((cR==z||cR==c||cR==p)&&cQ==b){cP=cP+l;
}if((cR==c||cR==b)&&(cQ==c||cQ==t)){cP=parseFloat(cP);
}return cP;
},removeBindingFromObject:function(cS,cT){if(cT.type==D){for(var i=0;i<cT.sources.length;i++){if(cT.sources[i]){cT.sources[i].removeListenerById(cT.listenerIds[i]);
}}for(var i=0;i<cT.targets.length;i++){if(cT.targets[i]){cT.targets[i].removeListenerById(cT.targetListenerIds[i]);
}}}else{cS.removeListenerById(cT);
}var cU=this.__cI[cS.toHashCode()];
if(cU!=undefined){for(var i=0;i<cU.length;i++){if(cU[i][0]==cT){qx.lang.Array.remove(cU,cU[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(cV){{};
var cW=this.__cI[cV.toHashCode()];

if(cW!=undefined){for(var i=cW.length-1;i>=0;i--){this.removeBindingFromObject(cV,cW[i][0]);
}}},getAllBindingsForObject:function(cX){if(this.__cI[cX.toHashCode()]===undefined){this.__cI[cX.toHashCode()]=[];
}return this.__cI[cX.toHashCode()];
},removeAllBindings:function(){for(var da in this.__cI){var cY=qx.core.ObjectRegistry.fromHashCode(da);
if(cY==null){delete this.__cI[da];
continue;
}this.removeAllBindingsForObject(cY);
}this.__cI={};
},getAllBindings:function(){return this.__cI;
},showBindingInLog:function(db,dc){var de;
for(var i=0;i<this.__cI[db.toHashCode()].length;i++){if(this.__cI[db.toHashCode()][i][0]==dc){de=this.__cI[db.toHashCode()][i];
break;
}}
if(de===undefined){var dd=o;
}else{var dd=q+de[1]+A+de[2]+x+de[3]+A+de[4]+y;
}qx.log.Logger.debug(dd);
},showAllBindingsInLog:function(){for(var dg in this.__cI){var df=qx.core.ObjectRegistry.fromHashCode(dg);

for(var i=0;i<this.__cI[dg].length;i++){this.showBindingInLog(df,this.__cI[dg][i][0]);
}}}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__bS=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__bS:null,message:null,getComment:function(){return this.__bS;
},toString:function(){return this.__bS+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__bT=qx.dev.StackTrace.getStackTrace();
},members:{__bT:null,getStackTrace:function(){return this.__bT;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();
},dispatchEvent:function(e,event,f){var j,g;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var k=this._manager.getListeners(e,f,false);

if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;
k[i].handler.call(h,event);
}}}},defer:function(m){qx.event.Registration.addDispatcher(m);
}});
})();
(function(){var p="",o="!",n="'!",m="'",k="Expected '",j="' (rgb(",h=",",g=")), but found value '",f="Event (",d="Expected value to be the CSS color '",bw="' but found ",bv="The value '",bu=" != ",bt="qx.core.Object",bs="Expected value to be an array but found ",br=") was fired.",bq="Expected value to be an integer >= 0 but found ",bp="' to be not equal with '",bo="' to '",bn="qx.ui.core.Widget",w="Called assertTrue with '",x="Expected value to be a map but found ",u="The function did not raise an exception!",v="Expected value to be undefined but found ",s="Expected value to be a DOM element but found  '",t="Expected value to be a regular expression but found ",q="' to implement the interface '",r="Expected value to be null but found ",E="Invalid argument 'type'",F="Called assert with 'false'",R="Assertion error! ",N="Expected value to be a string but found ",ba="null",U="' but found '",bj="' must must be a key of the map '",bf="The String '",J="Expected value not to be undefined but found ",bm="qx.util.ColorUtil",bl=": ",bk="The raised exception does not have the expected type! ",I=") not fired.",L="qx.core.Assert",M="Expected value to be typeof object but found ",P="' (identical) but found '",S="' must have any of the values defined in the array '",V="Expected value to be a number but found ",bc="Called assertFalse with '",bh="]",y="Expected value to be a qooxdoo object but found ",z="' arguments.",K="Expected value not to be null but found ",Y="Array[",X="' does not match the regular expression '",W="' to be not identical with '",be="' arguments but found '",bd="', which cannot be converted to a CSS color!",T="Expected object '",bb="qx.core.AssertionError",a="Expected value to be a boolean but found ",bg="))!",A="Expected value to be a qooxdoo widget but found ",B="Expected value '%1' to be in the range '%2'..'%3'!",O="Expected value to be typeof '",b="Expected value to be typeof function but found ",c="Expected value to be an integer but found ",H="Called fail().",C="The parameter 're' must be a string or a regular expression.",D="Expected value to be a number >= 0 but found ",G="Expected value to be instanceof '",Q="Wrong number of arguments given. Expected '",bi="object";
qx.Class.define(L,{statics:{__bU:true,__bV:function(bx,by){var bz=p;

for(var i=1,l=arguments.length;i<l;i++){bz=bz+this.__bW(arguments[i]);
}var bB=R+bx+bl+bz;

if(this.__bU){qx.Bootstrap.error(bB);
}
if(qx.Class.isDefined(bb)){var bA=new qx.core.AssertionError(bx,bz);

if(this.__bU){qx.Bootstrap.error("Stack trace: \n"+bA.getStackTrace());
}throw bA;
}else{throw new Error(bB);
}},__bW:function(bC){var bD;

if(bC===null){bD=ba;
}else if(qx.lang.Type.isArray(bC)&&bC.length>10){bD=Y+bC.length+bh;
}else if((bC instanceof Object)&&(bC.toString==null)){bD=qx.lang.Json.stringify(bC,null,2);
}else{try{bD=bC.toString();
}catch(e){bD=p;
}}return bD;
},assert:function(bE,bF){bE==true||this.__bV(bF||p,F);
},fail:function(bG){this.__bV(bG||p,H);
},assertTrue:function(bH,bI){(bH===true)||this.__bV(bI||p,w,bH,m);
},assertFalse:function(bJ,bK){(bJ===false)||this.__bV(bK||p,bc,bJ,m);
},assertEquals:function(bL,bM,bN){bL==bM||this.__bV(bN||p,k,bL,U,bM,n);
},assertNotEquals:function(bO,bP,bQ){bO!=bP||this.__bV(bQ||p,k,bO,bp,bP,n);
},assertIdentical:function(bR,bS,bT){bR===bS||this.__bV(bT||p,k,bR,P,bS,n);
},assertNotIdentical:function(bU,bV,bW){bU!==bV||this.__bV(bW||p,k,bU,W,bV,n);
},assertNotUndefined:function(bX,bY){bX!==undefined||this.__bV(bY||p,J,bX,o);
},assertUndefined:function(ca,cb){ca===undefined||this.__bV(cb||p,v,ca,o);
},assertNotNull:function(cc,cd){cc!==null||this.__bV(cd||p,K,cc,o);
},assertNull:function(ce,cf){ce===null||this.__bV(cf||p,r,ce,o);
},assertJsonEquals:function(cg,ch,ci){this.assertEquals(qx.lang.Json.stringify(cg),qx.lang.Json.stringify(ch),ci);
},assertMatch:function(cj,ck,cl){this.assertString(cj);
this.assert(qx.lang.Type.isRegExp(ck)||qx.lang.Type.isString(ck),C);
cj.search(ck)>=0||this.__bV(cl||p,bf,cj,X,ck.toString(),n);
},assertArgumentsCount:function(cm,cn,co,cp){var cq=cm.length;
(cq>=cn&&cq<=co)||this.__bV(cp||p,Q,cn,bo,co,be,arguments.length,z);
},assertEventFired:function(cr,event,cs,ct,cu){var cw=false;
var cv=function(e){if(ct){ct.call(cr,e);
}cw=true;
};
var cx;

try{cx=cr.addListener(event,cv,cr);
cs.call();
}catch(cy){throw cy;
}finally{try{cr.removeListenerById(cx);
}catch(cz){}}cw===true||this.__bV(cu||p,f,event,I);
},assertEventNotFired:function(cA,event,cB,cC){var cE=false;
var cD=function(e){cE=true;
};
var cF=cA.addListener(event,cD,cA);
cB.call();
cE===false||this.__bV(cC||p,f,event,br);
cA.removeListenerById(cF);
},assertException:function(cG,cH,cI,cJ){var cH=cH||Error;
var cK;

try{this.__bU=false;
cG();
}catch(cL){cK=cL;
}finally{this.__bU=true;
}
if(cK==null){this.__bV(cJ||p,u);
}cK instanceof cH||this.__bV(cJ||p,bk,cH,bu,cK);

if(cI){this.assertMatch(cK.toString(),cI,cJ);
}},assertInArray:function(cM,cN,cO){cN.indexOf(cM)!==-1||this.__bV(cO||p,bv,cM,S,cN,m);
},assertArrayEquals:function(cP,cQ,cR){this.assertArray(cP,cR);
this.assertArray(cQ,cR);
this.assertEquals(cP.length,cQ.length,cR);

for(var i=0;i<cP.length;i++){this.assertIdentical(cP[i],cQ[i],cR);
}},assertKeyInMap:function(cS,cT,cU){cT[cS]!==undefined||this.__bV(cU||p,bv,cS,bj,cT,m);
},assertFunction:function(cV,cW){qx.lang.Type.isFunction(cV)||this.__bV(cW||p,b,cV,o);
},assertString:function(cX,cY){qx.lang.Type.isString(cX)||this.__bV(cY||p,N,cX,o);
},assertBoolean:function(da,db){qx.lang.Type.isBoolean(da)||this.__bV(db||p,a,da,o);
},assertNumber:function(dc,dd){(qx.lang.Type.isNumber(dc)&&isFinite(dc))||this.__bV(dd||p,V,dc,o);
},assertPositiveNumber:function(de,df){(qx.lang.Type.isNumber(de)&&isFinite(de)&&de>=0)||this.__bV(df||p,D,de,o);
},assertInteger:function(dg,dh){(qx.lang.Type.isNumber(dg)&&isFinite(dg)&&dg%1===0)||this.__bV(dh||p,c,dg,o);
},assertPositiveInteger:function(di,dj){var dk=(qx.lang.Type.isNumber(di)&&isFinite(di)&&di%1===0&&di>=0);
dk||this.__bV(dj||p,bq,di,o);
},assertInRange:function(dl,dm,dn,dp){(dl>=dm&&dl<=dn)||this.__bV(dp||p,qx.lang.String.format(B,[dl,dm,dn]));
},assertObject:function(dq,dr){var ds=dq!==null&&(qx.lang.Type.isObject(dq)||typeof dq===bi);
ds||this.__bV(dr||p,M,(dq),o);
},assertArray:function(dt,du){qx.lang.Type.isArray(dt)||this.__bV(du||p,bs,dt,o);
},assertMap:function(dv,dw){qx.lang.Type.isObject(dv)||this.__bV(dw||p,x,dv,o);
},assertRegExp:function(dx,dy){qx.lang.Type.isRegExp(dx)||this.__bV(dy||p,t,dx,o);
},assertType:function(dz,dA,dB){this.assertString(dA,E);
typeof (dz)===dA||this.__bV(dB||p,O,dA,bw,dz,o);
},assertInstance:function(dC,dD,dE){var dF=dD.classname||dD+p;
dC instanceof dD||this.__bV(dE||p,G,dF,bw,dC,o);
},assertInterface:function(dG,dH,dI){qx.Class.implementsInterface(dG,dH)||this.__bV(dI||p,T,dG,q,dH,n);
},assertCssColor:function(dJ,dK,dL){var dM=qx.Class.getByName(bm);

if(!dM){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dO=dM.stringToRgb(dJ);

try{var dN=dM.stringToRgb(dK);
}catch(dQ){this.__bV(dL||p,d,dJ,j,dO.join(h),g,dK,bd);
}var dP=dO[0]==dN[0]&&dO[1]==dN[1]&&dO[2]==dN[2];
dP||this.__bV(dL||p,d,dO,j,dO.join(h),g,dK,j,dN.join(h),bg);
},assertElement:function(dR,dS){!!(dR&&dR.nodeType===1)||this.__bV(dS||p,s,dR,n);
},assertQxObject:function(dT,dU){this.__bX(dT,bt)||this.__bV(dU||p,y,dT,o);
},assertQxWidget:function(dV,dW){this.__bX(dV,bn)||this.__bV(dW||p,A,dV,o);
},__bX:function(dX,dY){if(!dX){return false;
}var ea=dX.constructor;

while(ea){if(ea.classname===dY){return true;
}ea=ea.superclass;
}return false;
}}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__bY:null,__ca:null,__cb:null,__cc:null,stringify:function(bb,bc,bd){this.__bY=p;
this.__ca=p;
this.__cc=[];

if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));

for(var i=0;i<bd;i+=1){this.__ca+=O;
}}else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);
}this.__ca=bd;
}if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__cb=bc;
}else{this.__cb=null;
}return this.__cd(p,{'':bb});
},__cd:function(be,bf){var bi=this.__bY,bg,bj=bf[be];
if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);
}else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);
}if(typeof this.__cb===e){bj=this.__cb.call(bf,be,bj);
}
if(bj===null){return h;
}
if(bj===undefined){return undefined;
}switch(qx.lang.Type.getClass(bj)){case R:return this.__ce(bj);
case B:return isFinite(bj)?String(bj):h;
case Q:return String(bj);
case J:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
var length=bj.length;

for(var i=0;i<length;i+=1){bg[i]=this.__cd(i,bj)||h;
}this.__cc.pop();
if(bg.length===0){var bh=s;
}else if(this.__bY){bh=E+this.__bY+bg.join(Y+this.__bY)+b+bi+l;
}else{bh=N+bg.join(d)+l;
}this.__bY=bi;
return bh;
case z:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
if(this.__cb&&typeof this.__cb===f){var length=this.__cb.length;

for(var i=0;i<length;i+=1){var k=this.__cb[i];

if(typeof k===W){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}else{for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}this.__cc.pop();
if(bg.length===0){var bh=A;
}else if(this.__bY){bh=w+this.__bY+bg.join(Y+this.__bY)+b+bi+S;
}else{bh=C+bg.join(d)+S;
}this.__bY=bi;
return bh;
}},dateToJSON:function(bk){var bl=function(n){return n<10?U+n:n;
};
var bm=function(n){var bn=bl(n);
return n<100?U+bn:bn;
};
return isFinite(bk.valueOf())?bk.getUTCFullYear()+T+bl(bk.getUTCMonth()+1)+T+bl(bk.getUTCDate())+M+bl(bk.getUTCHours())+m+bl(bk.getUTCMinutes())+m+bl(bk.getUTCSeconds())+F+bm(bk.getUTCMilliseconds())+q:null;
},__ce:function(bo){var bp={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;

if(bq.test(bo)){return o+
bo.replace(bq,function(a){var c=bp[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bo+o;
}},parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bt.lastIndex=0;
if(bt.test(br)){br=br.replace(bt,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+br+D);
return typeof bs===e?this.__cf({'':j},p,bs):j;
}throw new SyntaxError(P);
},__cf:function(bu,bv,bw){var bx=bu[bv];

if(bx&&typeof bx===f){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cf(bx,k,bw);

if(v!==undefined){bx[k]=v;
}else{delete bx[k];
}}}}return bw.call(bu,bv,bx);
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){{};
this.__cg=b+(c&&c.message?c.message:c);
Error.call(this,this.__cg);
this.__ch=d;
this.__ci=c;
},members:{__ci:null,__ch:null,__cg:null,toString:function(){return this.__cg;
},getArguments:function(){return this.__ch;
},getSourceException:function(){return this.__ci;
}},destruct:function(){this.__ci=null;
this.__ch=null;
this.__cg=null;
}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cW:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cX:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cY:function(){var L=qx.lang.Generics.__cW;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__cX(N,O);
}}}}},defer:function(Q){Q.__cY();
}});
})();


if (typeof exports != "undefined") {for (var key in qx) {exports[key] = qx[key];}}