(self.webpackChunkreact_boilerplate=self.webpackChunkreact_boilerplate||[]).push([[559],{"A/Pt":(t,e,n)=>{"use strict";n.d(e,{Z:()=>r});const r=n("vOnD").ZP.h1.withConfig({displayName:"H1",componentId:"tncdg6-0"})(["font-size:2em;margin-bottom:0.25em;"])},dphA:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>p});var r,o=n("q1tI"),i=n("TJpk"),a=n("A/Pt");function l(t,e,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=t&&t.defaultProps,a=arguments.length-3;if(e||0===a||(e={children:void 0}),1===a)e.children=o;else if(a>1){for(var l=new Array(a),u=0;u<a;u++)l[u]=arguments[u+3];e.children=l}if(e&&i)for(var c in i)void 0===e[c]&&(e[c]=i[c]);else e||(e=i||{});return{$$typeof:r,type:t,key:void 0===n?null:""+n,ref:null,props:e,_owner:null}}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=t[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var f=l(i.ql,{},void 0,l("title",{},void 0,"Sign In Page"),l("meta",{name:"description",content:"Sign In page of React.js Boilerplate application"})),d=l(a.Z,{},void 0,l("div",{},void 0,"Sign In"));function p(t){console.log("in SigninPage");var e=u((0,o.useState)(""),2),n=e[0],r=e[1],i=u((0,o.useState)(""),2),a=i[0],c=i[1];return l("div",{},void 0,f,d,l("div",{},void 0,l("input",{type:"text",placeholder:"Username",value:n,onChange:function(t){return r(t.target.value)}})),l("div",{},void 0,l("input",{type:"password",placeholder:"Password",value:a,onChange:function(t){return c(t.target.value)}}),l("button",{onClick:function(t){postData()},type:"submit"},void 0,"Log In")))}}}]);