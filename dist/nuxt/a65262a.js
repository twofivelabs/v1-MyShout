(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{315:function(t,e,n){"use strict";n.r(e),n.d(e,"pwa_camera_modal_instance",(function(){return h}));var o=n(121),r=function(t,e,n,o){function r(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function a(t){try{s(o.next(t))}catch(t){i(t)}}function c(t){try{s(o.throw(t))}catch(t){i(t)}}function s(t){t.done?n(t.value):r(t.value).then(a,c)}s((o=o.apply(t,e||[])).next())}))},c=function(t,e){var n,o,i,a,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(t){return function(e){return s([t,e])}}function s(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(r=0)),r;)try{if(n=1,o&&(i=2&c[0]?o.return:c[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,c[1])).done)return i;switch(o=0,i&&(c=[2&c[0],i.value]),c[0]){case 0:case 1:i=c;break;case 4:return r.label++,{value:c[1],done:!1};case 5:r.label++,o=c[1],c=[0];continue;case 7:c=r.ops.pop(),r.trys.pop();continue;default:if(!(i=r.trys,(i=i.length>0&&i[i.length-1])||6!==c[0]&&2!==c[0])){r=0;continue}if(3===c[0]&&(!i||c[1]>i[0]&&c[1]<i[3])){r.label=c[1];break}if(6===c[0]&&r.label<i[1]){r.label=i[1],i=c;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(c);break}i[2]&&r.ops.pop(),r.trys.pop();continue}c=e.call(t,r)}catch(t){c=[6,t],o=0}finally{n=i=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}},h=function(){function t(t){var e=this;Object(o.r)(this,t),this.onPhoto=Object(o.c)(this,"onPhoto",7),this.noDeviceError=Object(o.c)(this,"noDeviceError",7),this.handlePhoto=function(t){return r(e,void 0,void 0,(function(){return c(this,(function(e){return this.onPhoto.emit(t),[2]}))}))},this.handleNoDeviceError=function(t){return r(e,void 0,void 0,(function(){return c(this,(function(e){return this.noDeviceError.emit(t),[2]}))}))},this.facingMode="user",this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image"}return t.prototype.handleBackdropClick=function(t){t.target!==this.el&&this.onPhoto.emit(null)},t.prototype.handleComponentClick=function(t){t.stopPropagation()},t.prototype.handleBackdropKeyUp=function(t){"Escape"===t.key&&this.onPhoto.emit(null)},t.prototype.render=function(){var t=this;return Object(o.h)("div",{class:"wrapper",onClick:function(e){return t.handleBackdropClick(e)}},Object(o.h)("div",{class:"content"},Object(o.h)("pwa-camera",{onClick:function(e){return t.handleComponentClick(e)},facingMode:this.facingMode,handlePhoto:this.handlePhoto,handleNoDeviceError:this.handleNoDeviceError,noDevicesButtonText:this.noDevicesButtonText,noDevicesText:this.noDevicesText})))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.g)(this)},enumerable:!1,configurable:!0}),t}();h.style=":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:var(--inset-width);height:var(--inset-height);max-height:100%}@media only screen and (max-width: 600px){.content{width:100%;height:100%}}"}}]);