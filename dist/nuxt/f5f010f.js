/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[188],{1042:function(e,t,n){"use strict";n.r(t);n(816)},816:function(e,t,n){"use strict";var r=n(727),o=n(740),c=n(746),l={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},d=function(e){function t(code,n,details){var r=e.call(this,n)||this;return Object.setPrototypeOf(r,t.prototype),r.code=code,r.details=details,r}return Object(o.__extends)(t,e),t}(Error);var h=function(){function e(e,t){var n=this;this.auth=null,this.messaging=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then((function(e){return n.auth=e}),(function(){})),this.messaging||t.get().then((function(e){return n.messaging=e}),(function(){}))}return e.prototype.getAuthToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e;return Object(o.__generator)(this,(function(t){switch(t.label){case 0:if(!this.auth)return[2,void 0];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return(e=t.sent())?[2,e.accessToken]:[2,void 0];case 3:return t.sent(),[2,void 0];case 4:return[2]}}))}))},e.prototype.getInstanceIdToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){return Object(o.__generator)(this,(function(e){switch(e.label){case 0:if(!this.messaging||!("Notification"in self)||"granted"!==Notification.permission)return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.messaging.getToken()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,void 0];case 4:return[2]}}))}))},e.prototype.getContext=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e,t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return e=n.sent(),[4,this.getInstanceIdToken()];case 2:return t=n.sent(),[2,{authToken:e,instanceIdToken:t}]}}))}))},e}();function f(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}var v=function(){function e(){}return e.prototype.encode=function(data){var e=this;if(null==data)return null;if(data instanceof Number&&(data=data.valueOf()),"number"==typeof data&&isFinite(data))return data;if(!0===data||!1===data)return data;if("[object String]"===Object.prototype.toString.call(data))return data;if(data instanceof Date)return data.toISOString();if(Array.isArray(data))return data.map((function(t){return e.encode(t)}));if("function"==typeof data||"object"==typeof data)return f(data,(function(t){return e.encode(t)}));throw new Error("Data cannot be encoded in JSON: "+data)},e.prototype.decode=function(e){var t=this;if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var n=Number(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map((function(e){return t.decode(e)})):"function"==typeof e||"object"==typeof e?f(e,(function(e){return t.decode(e)})):e},e}();var m=function(){function e(e,t,n,r,o,c){var l=this;void 0===o&&(o="us-central1"),this.app_=e,this.appCheckProvider=r,this.fetchImpl=c,this.serializer=new v,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(l.deleteService())}},this.contextProvider=new h(t,n),this.cancelAllRequests=new Promise((function(e){l.deleteService=function(){return e()}}));try{var d=new URL(o);this.customDomain=d.origin,this.region="us-central1"}catch(e){this.customDomain=null,this.region=o}}return Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),e.prototype._url=function(e){var t=this.app_.options.projectId;return null!==this.emulatorOrigin?this.emulatorOrigin+"/"+t+"/"+this.region+"/"+e:null!==this.customDomain?this.customDomain+"/"+e:"https://"+this.region+"-"+t+".cloudfunctions.net/"+e},e.prototype.useEmulator=function(e,t){this.emulatorOrigin="http://"+e+":"+t},e.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},e.prototype.httpsCallable=function(e,t){var n=this;return function(data){return n.call(e,data,t||{})}},e.prototype.postJSON=function(e,body,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,r,c;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return t["Content-Type"]="application/json",[4,this.getAppCheckToken()];case 1:null!==(n=o.sent())&&(t["X-Firebase-AppCheck"]=n),o.label=2;case 2:return o.trys.push([2,4,,5]),[4,this.fetchImpl(e,{method:"POST",body:JSON.stringify(body),headers:t})];case 3:return r=o.sent(),[3,5];case 4:return o.sent(),[2,{status:0,json:null}];case 5:c=null,o.label=6;case 6:return o.trys.push([6,8,,9]),[4,r.json()];case 7:return c=o.sent(),[3,9];case 8:return o.sent(),[3,9];case 9:return[2,{status:r.status,json:c}]}}))}))},e.prototype.getAppCheckToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e;return Object(o.__generator)(this,(function(t){switch(t.label){case 0:return(e=this.appCheckProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:return[2,t.sent().token];case 2:return[2,null]}}))}))},e.prototype.call=function(e,data,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,body,r,c,h,f,v,m,O,_,y;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return n=this._url(e),data=this.serializer.encode(data),body={data:data},r={},[4,this.contextProvider.getContext()];case 1:return(c=o.sent()).authToken&&(r.Authorization="Bearer "+c.authToken),c.instanceIdToken&&(r["Firebase-Instance-ID-Token"]=c.instanceIdToken),h=t.timeout||7e4,f=function(e){var t,n=new Promise((function(n,r){t=setTimeout((function(){r(new d("deadline-exceeded","deadline-exceeded"))}),e)}));return{timer:t,promise:n}}(h),v=f.timer,m=f.promise,[4,Promise.race([w(v,this.postJSON(n,body,r)),m,w(v,this.cancelAllRequests)])];case 2:if(!(O=o.sent()))throw new d("cancelled","Firebase Functions instance was deleted.");if(_=function(e,t,n){var code=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),r=code,details=void 0;try{var o=t&&t.error;if(o){var c=o.status;if("string"==typeof c){if(!l[c])return new d("internal","internal");code=l[c],r=c}var h=o.message;"string"==typeof h&&(r=h),void 0!==(details=o.details)&&(details=n.decode(details))}}catch(e){}return"ok"===code?null:new d(code,r,details)}(O.status,O.json,this.serializer))throw _;if(!O.json)throw new d("internal","Response is not valid JSON object.");if(void 0===(y=O.json.data)&&(y=O.json.result),void 0===y)throw new d("internal","Response is missing data field.");return[2,{data:this.serializer.decode(y)}]}}))}))},e}();function w(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n;return Object(o.__generator)(this,(function(r){switch(r.label){case 0:return[4,t];case 1:return n=r.sent(),clearTimeout(e),[2,n]}}))}))}var O,_,y;O=r.default,_=fetch.bind(self),y={Functions:m},O.INTERNAL.registerComponent(new c.Component("functions",(function(e,t){var n=t.instanceIdentifier,r=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),c=e.getProvider("app-check-internal"),l=e.getProvider("messaging");return new m(r,o,l,c,n,_)}),"PUBLIC").setServiceProps(y).setMultipleInstances(!0)),r.default.registerVersion("@firebase/functions","0.6.16")}}]);