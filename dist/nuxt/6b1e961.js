(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{313:function(t,n,e){"use strict";e.r(n),e.d(n,"pwa_camera_modal",(function(){return l}));var o=e(121),r=function(t,n,e,o){function r(t){return t instanceof e?t:new e((function(n){n(t)}))}return new(e||(e=Promise))((function(e,i){function a(t){try{c(o.next(t))}catch(t){i(t)}}function s(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){t.done?e(t.value):r(t.value).then(a,s)}c((o=o.apply(t,n||[])).next())}))},c=function(t,n){var e,o,i,a,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(t){return function(n){return c([t,n])}}function c(s){if(e)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(r=0)),r;)try{if(e=1,o&&(i=2&s[0]?o.return:s[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,s[1])).done)return i;switch(o=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,o=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!(i=r.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){r=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){r.label=s[1];break}if(6===s[0]&&r.label<i[1]){r.label=i[1],i=s;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(s);break}i[2]&&r.ops.pop(),r.trys.pop();continue}s=n.call(t,r)}catch(t){s=[6,t],o=0}finally{e=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}},l=function(){function t(t){Object(o.r)(this,t),this.onPhoto=Object(o.c)(this,"onPhoto",7),this.noDeviceError=Object(o.c)(this,"noDeviceError",7),this.facingMode="user"}return t.prototype.present=function(){return r(this,void 0,void 0,(function(){var t,n=this;return c(this,(function(e){return(t=document.createElement("pwa-camera-modal-instance")).facingMode=this.facingMode,t.addEventListener("onPhoto",(function(t){return r(n,void 0,void 0,(function(){var n;return c(this,(function(e){return this._modal?(n=t.detail,this.onPhoto.emit(n),[2]):[2]}))}))})),t.addEventListener("noDeviceError",(function(t){return r(n,void 0,void 0,(function(){return c(this,(function(n){return this.noDeviceError.emit(t),[2]}))}))})),document.body.append(t),this._modal=t,[2]}))}))},t.prototype.dismiss=function(){return r(this,void 0,void 0,(function(){return c(this,(function(t){return this._modal?(this._modal&&this._modal.parentNode.removeChild(this._modal),this._modal=null,[2]):[2]}))}))},t.prototype.render=function(){return Object(o.h)("div",null)},t}();l.style=":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:600px;height:600px}"}}]);