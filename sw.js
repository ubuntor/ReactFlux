if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),u={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/en-US-hUWOZquR.js",revision:null},{url:"assets/es-ES-jyWntrD8.js",revision:null},{url:"assets/index-BEMFSgq5.css",revision:null},{url:"assets/index-nGT6miW7.js",revision:null},{url:"assets/vendor-CbF1Di_m.css",revision:null},{url:"assets/vendor-CwLsKHTJ.js",revision:null},{url:"assets/zh-CN-BmzNQis_.js",revision:null},{url:"index.html",revision:"9a4eb3c1328ca0cbd02474f705d77191"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"6017208229886bea6bc7bb00b9adcccf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
