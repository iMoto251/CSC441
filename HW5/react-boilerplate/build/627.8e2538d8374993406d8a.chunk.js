(self.webpackChunkreact_boilerplate=self.webpackChunkreact_boilerplate||[]).push([[627],{"A/Pt":(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=r("vOnD").ZP.h1.withConfig({displayName:"H1",componentId:"tncdg6-0"})(["font-size:2em;margin-bottom:0.25em;"])},WXt3:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>y});var n,o=r("q1tI"),i=r("TJpk"),a=r("lHey"),l=r.n(a),u=r("A/Pt");function c(e,t,r,o){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=o;else if(a>1){for(var l=new Array(a),u=0;u<a;u++)l[u]=arguments[u+3];t.children=l}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var d=c(i.ql,{},void 0,c("title",{},void 0,"Feature Page"),c("meta",{name:"description",content:"Feature page of React.js Boilerplate application"})),p=c(u.Z,{},void 0,c("div",{},void 0,"Sign Up"));function y(e){console.log("in SignupPage");var t=s((0,o.useState)(""),2),r=t[0],n=t[1],i=s((0,o.useState)(""),2),a=i[0],u=i[1];return c("div",{},void 0,d,p,c("div",{},void 0,c("input",{type:"text",placeholder:"Username",value:r,onChange:function(e){return n(e.target.value)}})),c("div",{},void 0,c("input",{type:"password",placeholder:"Password",value:a,onChange:function(e){return u(e.target.value)}}),c("button",{onClick:function(e){l()()},type:"submit"},void 0,"Sign Up")))}},lHey:(e,t,r)=>{const n=r("oY9k");!async function(e="",t={}){try{await n(e,{method:"POST",mode:"cors",cache:"no-cashe",credentials:"same origin",headers:{"Content-Type":"application/json"},redirect:"follow",referPolicy:"no-referrer",body:JSON.strigify(t)});await responce.json()}catch(e){console.log("postData:Exception: ",e)}}("http://localhost:3000/signup",{username:"wlburkes",password:"temp123"})},oY9k:(e,t)=>{"use strict";var r=function(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof r)return r;throw new Error("unable to locate global object")}();e.exports=t=r.fetch,r.fetch&&(t.default=r.fetch.bind(r)),t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response}}]);