(window.webpackJsonp=window.webpackJsonp||[]).push([[204],{742:function(e,t,n){"use strict";n.r(t),n.d(t,"CameraWeb",(function(){return c})),n.d(t,"Camera",(function(){return l}));var r=n(55),o=n(310);class c extends r.b{async getPhoto(e){return new Promise((async(t,n)=>{if(e.webUseInput||e.source===o.c.Photos)this.fileInputExperience(e,t);else if(e.source===o.c.Prompt){let r=document.querySelector("pwa-action-sheet");r||(r=document.createElement("pwa-action-sheet"),document.body.appendChild(r)),r.header=e.promptLabelHeader||"Photo",r.cancelable=!1,r.options=[{title:e.promptLabelPhoto||"From Photos"},{title:e.promptLabelPicture||"Take Picture"}],r.addEventListener("onSelection",(async r=>{0===r.detail?this.fileInputExperience(e,t):this.cameraExperience(e,t,n)}))}else this.cameraExperience(e,t,n)}))}async pickImages(e){return new Promise((async e=>{this.multipleFileInputExperience(e)}))}async cameraExperience(e,t,n){if(customElements.get("pwa-camera-modal")){const c=document.createElement("pwa-camera-modal");c.facingMode=e.direction===o.a.Front?"user":"environment",document.body.appendChild(c);try{await c.componentOnReady(),c.addEventListener("onPhoto",(async o=>{const l=o.detail;null===l?n(new r.a("User cancelled photos app")):l instanceof Error?n(l):t(await this._getCameraPhoto(l,e)),c.dismiss(),document.body.removeChild(c)})),c.present()}catch(n){this.fileInputExperience(e,t)}}else console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(e,t)}fileInputExperience(e,t){let input=document.querySelector("#_capacitor-camera-input");const n=()=>{var e;null===(e=input.parentNode)||void 0===e||e.removeChild(input)};input||(input=document.createElement("input"),input.id="_capacitor-camera-input",input.type="file",input.hidden=!0,document.body.appendChild(input),input.addEventListener("change",(r=>{const o=input.files[0];let c="jpeg";if("image/png"===o.type?c="png":"image/gif"===o.type&&(c="gif"),"dataUrl"===e.resultType||"base64"===e.resultType){const r=new FileReader;r.addEventListener("load",(()=>{if("dataUrl"===e.resultType)t({dataUrl:r.result,format:c});else if("base64"===e.resultType){const e=r.result.split(",")[1];t({base64String:e,format:c})}n()})),r.readAsDataURL(o)}else t({webPath:URL.createObjectURL(o),format:c}),n()}))),input.accept="image/*",input.capture=!0,e.source===o.c.Photos||e.source===o.c.Prompt?input.removeAttribute("capture"):e.direction===o.a.Front?input.capture="user":e.direction===o.a.Rear&&(input.capture="environment"),input.click()}multipleFileInputExperience(e){let input=document.querySelector("#_capacitor-camera-input-multiple");input||(input=document.createElement("input"),input.id="_capacitor-camera-input-multiple",input.type="file",input.hidden=!0,input.multiple=!0,document.body.appendChild(input),input.addEventListener("change",(t=>{const n=[];for(let i=0;i<input.files.length;i++){const e=input.files[i];let t="jpeg";"image/png"===e.type?t="png":"image/gif"===e.type&&(t="gif"),n.push({webPath:URL.createObjectURL(e),format:t})}var r;e({photos:n}),null===(r=input.parentNode)||void 0===r||r.removeChild(input)}))),input.accept="image/*",input.click()}_getCameraPhoto(e,t){return new Promise(((n,r)=>{const o=new FileReader,c=e.type.split("/")[1];"uri"===t.resultType?n({webPath:URL.createObjectURL(e),format:c,saved:!1}):(o.readAsDataURL(e),o.onloadend=()=>{const e=o.result;"dataUrl"===t.resultType?n({dataUrl:e,format:c,saved:!1}):n({base64String:e.split(",")[1],format:c,saved:!1})},o.onerror=e=>{r(e)})}))}async checkPermissions(){if("undefined"==typeof navigator||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");try{return{camera:(await window.navigator.permissions.query({name:"camera"})).state,photos:"granted"}}catch(e){throw this.unavailable("Camera permissions are not available in this browser")}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}async pickLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}async getLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}}const l=new c}}]);