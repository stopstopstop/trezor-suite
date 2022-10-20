/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-postinstall",
factory: function (require) {
var plugin;(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});const n=require("@yarnpkg/core"),o=require("clipanion"),a={postinstall:{description:"Postinstall hook that will always run in Yarn v2",type:n.SettingsType.STRING,default:""}},r=require("@yarnpkg/shell"),l=async e=>{if(e){console.log("Running postinstall command...");const t=await r.execute(e);if(0!==t)throw new Error("postinstall command failed with exit code "+t)}};var i=function(e,t,n,o){var a,r=arguments.length,l=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,o);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(l=(r<3?a(l):r>3?a(t,n,l):a(t,n))||l);return r>3&&l&&Object.defineProperty(t,n,l),l};class c extends o.Command{async execute(){const e=(await n.Configuration.find(this.context.cwd,this.context.plugins)).get("postinstall");await l(e)}}i([o.Command.Path("postinstall")],c.prototype,"execute",null);const s={configuration:a,commands:[c],hooks:{afterAllInstalled:async e=>{const t=e.configuration.get("postinstall");await l(t)}}};plugin=t})();
return plugin;
}
};
