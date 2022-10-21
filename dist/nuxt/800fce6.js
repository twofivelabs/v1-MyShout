/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[212],{1104:function(e,t,n){"use strict";n.r(t);n(854)},854:function(e,t,n){"use strict";var r=n(733),o=n(742),c=n(744),l=n(747),h="firebasestorage.googleapis.com",f=function(e){function t(code,n){var r=e.call(this,d(code),"Firebase Storage: "+n+" ("+d(code)+")")||this;return r.customData={serverResponse:null},r._baseMessage=r.message,Object.setPrototypeOf(r,t.prototype),r}return Object(o.__extends)(t,e),t.prototype._codeEquals=function(code){return d(code)===this.code},Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=this._baseMessage+"\n"+this.customData.serverResponse:this.message=this._baseMessage},enumerable:!1,configurable:!0}),t}(c.FirebaseError);function d(code){return"storage/"+code}function _(){return new f("unknown","An unknown error occurred, please check the error payload for server response.")}function v(){return new f("canceled","User canceled the upload/download.")}function m(){return new f("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function y(e){return new f("invalid-argument",e)}function w(){return new f("app-deleted","The Firebase app was deleted.")}function R(e){return new f("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function k(e,t){return new f("invalid-format","String does not match format '"+e+"': "+t)}function T(e){throw new f("internal-error","Internal error: "+e)}var O={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},x=function(data,e){this.data=data,this.contentType=e||null};function P(e,t){switch(e){case O.RAW:return new x(U(t));case O.BASE64:case O.BASE64URL:return new x(S(e,t));case O.DATA_URL:return new x((n=new C(t)).base64?S(O.BASE64,n.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw k(O.DATA_URL,"Malformed data URL.")}return U(t)}(n.rest),function(e){return new C(e).contentType}(t))}var n;throw _()}function U(e){for(var b=[],i=0;i<e.length;i++){var t=e.charCodeAt(i);if(t<=127)b.push(t);else if(t<=2047)b.push(192|t>>6,128|63&t);else if(55296==(64512&t))if(i<e.length-1&&56320==(64512&e.charCodeAt(i+1)))t=65536|(1023&t)<<10|1023&e.charCodeAt(++i),b.push(240|t>>18,128|t>>12&63,128|t>>6&63,128|63&t);else b.push(239,191,189);else 56320==(64512&t)?b.push(239,191,189):b.push(224|t>>12,128|t>>6&63,128|63&t)}return new Uint8Array(b)}function S(e,t){switch(e){case O.BASE64:var n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw k(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break;case O.BASE64URL:var o=-1!==t.indexOf("+"),c=-1!==t.indexOf("/");if(o||c)throw k(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var l;try{l=atob(t)}catch(t){throw k(e,"Invalid character found")}for(var h=new Uint8Array(l.length),i=0;i<l.length;i++)h[i]=l.charCodeAt(i);return h}var C=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw k(O.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var n=t[1]||null;null!=n&&(this.base64=(s=n,r=";base64",s.length>=r.length&&s.substring(s.length-r.length)===r),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1);var s,r};var j,E={STATE_CHANGED:"state_changed"},A={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function I(e){switch(e){case"running":case"pausing":case"canceling":return A.RUNNING;case"paused":return A.PAUSED;case"success":return A.SUCCESS;case"canceled":return A.CANCELED;default:return A.ERROR}}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(j||(j={}));var M=function(){function e(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=j.NO_ERROR,this.sendPromise_=new Promise((function(t){e.xhr_.addEventListener("abort",(function(){e.errorCode_=j.ABORT,t()})),e.xhr_.addEventListener("error",(function(){e.errorCode_=j.NETWORK_ERROR,t()})),e.xhr_.addEventListener("load",(function(){t()}))}))}return e.prototype.send=function(e,t,body,n){if(this.sent_)throw T("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(var r in n)n.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,n[r].toString());return void 0!==body?this.xhr_.send(body):this.xhr_.send(),this.sendPromise_},e.prototype.getErrorCode=function(){if(!this.sent_)throw T("cannot .getErrorCode() before sending");return this.errorCode_},e.prototype.getStatus=function(){if(!this.sent_)throw T("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},e.prototype.getResponseText=function(){if(!this.sent_)throw T("cannot .getResponseText() before sending");return this.xhr_.responseText},e.prototype.abort=function(){this.xhr_.abort()},e.prototype.getResponseHeader=function(header){return this.xhr_.getResponseHeader(header)},e.prototype.addUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)},e.prototype.removeUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)},e}();var L=function(){function e(){}return e.prototype.createConnection=function(){return new M},e}(),B=function(){function e(e,path){this.bucket=e,this.path_=path}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t,n){var r;try{r=e.makeFromUrl(t,n)}catch(n){return new e(t,"")}if(""===r.path)return r;throw new f("invalid-default-bucket","Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t,n){var r=null,o="([A-Za-z0-9.\\-_]+)";var c=new RegExp("^gs://"+o+"(/(.*))?$","i");function l(e){e.path_=decodeURIComponent(e.path)}for(var d=n.replace(/[.]/g,"\\."),_=[{regex:c,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+d+"/v[A-Za-z0-9_]+/b/"+o+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:l},{regex:new RegExp("^https?://"+(n===h?"(?:storage.googleapis.com|storage.cloud.google.com)":n)+"/"+o+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:l}],i=0;i<_.length;i++){var v=_[i],m=v.regex.exec(t);if(m){var y=m[v.indices.bucket],w=m[v.indices.path];w||(w=""),r=new e(y,w),v.postModify(r);break}}if(null==r)throw function(e){return new f("invalid-url","Invalid URL '"+e+"'.")}(t);return r},e}(),N=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}();function F(p){return"string"==typeof p||p instanceof String}function z(p){return D()&&p instanceof Blob}function D(){return"undefined"!=typeof Blob}function H(e,t,n,r){if(r<t)throw y("Invalid value for '"+e+"'. Expected "+t+" or greater.");if(r>n)throw y("Invalid value for '"+e+"'. Expected "+n+" or less.")}function G(e,t){var n=t.match(/^(\w+):\/\/.+/),r=t;return null==(null==n?void 0:n[1])&&(r="https://"+t),r+"/v0"+e}function W(e){var t=encodeURIComponent,n="?";for(var r in e){if(e.hasOwnProperty(r))n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1)}var X=function(){function e(e,t,n,body,r,o,c,l,h,f,d){var _=this;this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=n,this.body_=body,this.successCodes_=r.slice(),this.additionalRetryCodes_=o.slice(),this.callback_=c,this.errorCallback_=l,this.progressCallback_=f,this.timeout_=h,this.pool_=d,this.promise_=new Promise((function(e,t){_.resolve_=e,_.reject_=t,_.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,n){var r,o=e.resolve_,c=e.reject_,l=n.connection;if(n.wasSuccessCode)try{var h=e.callback_(l,l.getResponseText());void 0!==h?o(h):o()}catch(e){c(e)}else null!==l?((r=_()).serverResponse=l.getResponseText(),e.errorCallback_?c(e.errorCallback_(l,r)):c(r)):n.canceled?c(r=e.appDelete_?w():v()):c(r=new f("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new V(!1,null,!0)):this.backoffId_=function(e,t,n){var r=1,c=null,l=!1,h=0;function f(){return 2===h}var d=!1;function _(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];d||(d=!0,t.apply(null,e))}function v(t){c=setTimeout((function(){c=null,e(m,f())}),t)}function m(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(!d)if(e)_.call.apply(_,Object(o.__spreadArray)([null,e],t));else{var c;f()||l?_.call.apply(_,Object(o.__spreadArray)([null,e],t)):(r<64&&(r*=2),1===h?(h=2,c=0):c=1e3*(r+Math.random()),v(c))}}var y=!1;function w(e){y||(y=!0,d||(null!==c?(e||(h=2),clearTimeout(c),v(0)):e||(h=1)))}return v(0),setTimeout((function(){l=!0,w(!0)}),n),w}((function(t,n){if(n)t(!1,new V(!1,null,!0));else{var r=e.pool_.createConnection();e.pendingConnection_=r,null!==e.progressCallback_&&r.addUploadProgressListener(o),r.send(e.url_,e.method_,e.body_,e.headers_).then((function(){null!==e.progressCallback_&&r.removeUploadProgressListener(o),e.pendingConnection_=null;var n=r.getErrorCode()===j.NO_ERROR,c=r.getStatus();if(n&&!e.isRetryStatusCode_(c)){var l=-1!==e.successCodes_.indexOf(c);t(!0,new V(l,r))}else{var h=r.getErrorCode()===j.ABORT;t(!1,new V(!1,null,h))}}))}function o(t){var n=t.loaded,r=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(n,r)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,n=-1!==[408,429].indexOf(e),r=-1!==this.additionalRetryCodes_.indexOf(e);return t||n||r},e}(),V=function(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n};function K(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function J(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=K();if(void 0!==n){for(var r=new n,i=0;i<e.length;i++)r.append(e[i]);return r.getBlob()}if(D())return new Blob(e);throw new f("unsupported-environment","This browser doesn't seem to support creating Blobs")}var Z=function(){function e(data,e){var t=0,n="";z(data)?(this.data_=data,t=data.size,n=data.type):data instanceof ArrayBuffer?(e?this.data_=new Uint8Array(data):(this.data_=new Uint8Array(data.byteLength),this.data_.set(new Uint8Array(data))),t=this.data_.length):data instanceof Uint8Array&&(e?this.data_=data:(this.data_=new Uint8Array(data.length),this.data_.set(data)),t=data.length),this.size_=t,this.type_=n}return e.prototype.size=function(){return this.size_},e.prototype.type=function(){return this.type_},e.prototype.slice=function(t,n){if(z(this.data_)){var r=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,t,n);return null===r?null:new e(r)}return new e(new Uint8Array(this.data_.buffer,t,n-t),!0)},e.getBlob=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];if(D()){var r=t.map((function(t){return t instanceof e?t.data_:t}));return new e(J.apply(null,r))}var o=t.map((function(e){return F(e)?P(O.RAW,e).data:e.data_})),c=0;o.forEach((function(e){c+=e.byteLength}));var l=new Uint8Array(c),h=0;return o.forEach((function(e){for(var i=0;i<e.length;i++)l[h++]=e[i]})),new e(l,!0)},e.prototype.uploadData=function(){return this.data_},e}();function $(s){var e,p;try{e=JSON.parse(s)}catch(e){return null}return"object"!=typeof(p=e)||Array.isArray(p)?null:e}function Y(path){var e=path.lastIndexOf("/",path.length-2);return-1===e?path:path.slice(e+1)}function Q(e,t){return t}var ee=function(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||Q},te=null;function ne(){if(te)return te;var e=[];e.push(new ee("bucket")),e.push(new ee("generation")),e.push(new ee("metageneration")),e.push(new ee("name","fullPath",!0));var t=new ee("name");t.xform=function(e,t){return function(e){return!F(e)||e.length<2?e:Y(e)}(t)},e.push(t);var n=new ee("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new ee("timeCreated")),e.push(new ee("updated")),e.push(new ee("md5Hash",null,!0)),e.push(new ee("cacheControl",null,!0)),e.push(new ee("contentDisposition",null,!0)),e.push(new ee("contentEncoding",null,!0)),e.push(new ee("contentLanguage",null,!0)),e.push(new ee("contentType",null,!0)),e.push(new ee("metadata","customMetadata",!0)),te=e}function re(e,t,n){for(var r={type:"file"},o=n.length,i=0;i<o;i++){var c=n[i];r[c.local]=c.xform(r,t[c.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){var n=e.bucket,path=e.fullPath,r=new B(n,path);return t._makeStorageReference(r)}})}(r,e),r}function oe(e,t,n){var r=$(t);return null===r?null:re(e,r,n)}function ie(e,t){for(var n={},r=t.length,i=0;i<r;i++){var o=t[i];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}function ae(e,t,n){var r=$(n);return null===r?null:function(e,t,n){var r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n.prefixes)for(var o=0,c=n.prefixes;o<c.length;o++){var l=c[o].replace(/\/$/,""),h=e._makeStorageReference(new B(t,l));r.prefixes.push(h)}if(n.items)for(var f=0,d=n.items;f<d.length;f++){var _=d[f];h=e._makeStorageReference(new B(t,_.name)),r.items.push(h)}return r}(e,t,r)}var se=function(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function ue(e){if(!e)throw _()}function ce(e,t){return function(n,text){var r=oe(e,text,t);return ue(null!==r),r}}function le(e,t){return function(n,text){var r=oe(e,text,t);return ue(null!==r),function(e,t,n){var r=$(t);if(null===r)return null;if(!F(r.downloadTokens))return null;var o=r.downloadTokens;if(0===o.length)return null;var c=encodeURIComponent;return o.split(",").map((function(t){var r=e.bucket,path=e.fullPath;return G("/b/"+c(r)+"/o/"+c(path),n)+W({alt:"media",token:t})}))[0]}(r,text,e.host)}}function he(e){return function(t,n){var r,path,o;return 401===t.getStatus()?r=t.getResponseText().includes("Firebase App Check token is invalid")?new f("unauthorized-app","This app does not have permission to access Firebase Storage on this project."):new f("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,r=new f("quota-exceeded","Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(path=e.path,r=new f("unauthorized","User does not have permission to access '"+path+"'.")):r=n,r.serverResponse=n.serverResponse,r}}function pe(e){var t=he(e);return function(n,r){var path,o=t(n,r);return 404===n.getStatus()&&(path=e.path,o=new f("object-not-found","Object '"+path+"' does not exist.")),o.serverResponse=r.serverResponse,o}}function fe(e,t,n){var r=G(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,c=new se(r,"GET",ce(e,n),o);return c.errorHandler=pe(t),c}function de(e,t,n,r,o){var c={};t.isRoot?c.prefix="":c.prefix=t.path+"/",n&&n.length>0&&(c.delimiter=n),r&&(c.pageToken=r),o&&(c.maxResults=o);var l=G(t.bucketOnlyServerUrl(),e.host),h=e.maxOperationRetryTime,f=new se(l,"GET",function(e,t){return function(n,text){var r=ae(e,t,text);return ue(null!==r),r}}(e,t.bucket),h);return f.urlParams=c,f.errorHandler=he(t),f}function _e(e,t,n){var r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}var ge=function(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null};function ve(e,t){var n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){ue(!1)}return ue(!!n&&-1!==(t||["active"]).indexOf(n)),n}var be=262144;function me(e,t,n,r,o,c,l,h){var d=new ge(0,0);if(l?(d.current=l.current,d.total=l.total):(d.current=0,d.total=r.size()),r.size()!==d.total)throw new f("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var _=d.total-d.current,v=_;o>0&&(v=Math.min(v,o));var y=d.current,w=y+v,R={"X-Goog-Upload-Command":v===_?"upload, finalize":"upload","X-Goog-Upload-Offset":""+d.current},body=r.slice(y,w);if(null===body)throw m();var k=t.maxUploadRetryTime,T=new se(n,"POST",(function(e,text){var n,o=ve(e,["active","final"]),l=d.current+v,h=r.size();return n="final"===o?ce(t,c)(e,text):null,new ge(l,h,"final"===o,n)}),k);return T.headers=R,T.body=body.uploadData(),T.progressCallback=h||null,T.errorHandler=he(e),T}var ye=function(e,t,n){if("function"==typeof e||null!=t||null!=n)this.next=e,this.error=t,this.complete=n;else{var r=e;this.next=r.next,this.error=r.error,this.complete=r.complete}};function we(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];Promise.resolve().then((function(){return e.apply(void 0,t)}))}}var Re=function(){function e(e,t,n){var r=this;void 0===n&&(n=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=ne(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(e){r._request=void 0,r._chunkMultiplier=1,e._codeEquals("canceled")?(r._needToFetchStatus=!0,r.completeTransitions_()):(r._error=e,r._transition("error"))},this._metadataErrorHandler=function(e){r._request=void 0,e._codeEquals("canceled")?r.completeTransitions_():(r._error=e,r._transition("error"))},this._promise=new Promise((function(e,t){r._resolve=e,r._reject=t,r._start()})),this._promise.then(null,(function(){}))}return e.prototype._makeProgressCallback=function(){var e=this,t=this._transferred;return function(n){return e._updateProgress(t+n)}},e.prototype._shouldDoResumable=function(e){return e.size()>262144},e.prototype._start=function(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},e.prototype._resolveToken=function(e){var t=this;Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((function(n){var r=n[0],o=n[1];switch(t._state){case"running":e(r,o);break;case"canceling":t._transition("canceled");break;case"pausing":t._transition("paused")}}))},e.prototype._createResumable=function(){var e=this;this._resolveToken((function(t,n){var r=function(e,t,n,r,o){var c=t.bucketOnlyServerUrl(),l=_e(t,r,o),h={name:l.fullPath},f=G(c,e.host),d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":""+r.size(),"X-Goog-Upload-Header-Content-Type":l.contentType,"Content-Type":"application/json; charset=utf-8"},body=ie(l,n),_=e.maxUploadRetryTime,v=new se(f,"POST",(function(e){var t;ve(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){ue(!1)}return ue(F(t)),t}),_);return v.urlParams=h,v.headers=d,v.body=body,v.errorHandler=he(t),v}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(r,t,n);e._request=o,o.getPromise().then((function(t){e._request=void 0,e._uploadUrl=t,e._needToFetchStatus=!1,e.completeTransitions_()}),e._errorHandler)}))},e.prototype._fetchStatus=function(){var e=this,t=this._uploadUrl;this._resolveToken((function(n,r){var o=function(e,t,n,r){var o=e.maxUploadRetryTime,c=new se(n,"POST",(function(e){var t=ve(e,["active","final"]),n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){ue(!1)}n||ue(!1);var o=Number(n);return ue(!isNaN(o)),new ge(o,r.size(),"final"===t)}),o);return c.headers={"X-Goog-Upload-Command":"query"},c.errorHandler=he(t),c}(e._ref.storage,e._ref._location,t,e._blob),c=e._ref.storage._makeRequest(o,n,r);e._request=c,c.getPromise().then((function(t){e._request=void 0,e._updateProgress(t.current),e._needToFetchStatus=!1,t.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()}),e._errorHandler)}))},e.prototype._continueUpload=function(){var e=this,t=be*this._chunkMultiplier,n=new ge(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((function(o,c){var l;try{l=me(e._ref._location,e._ref.storage,r,e._blob,t,e._mappings,n,e._makeProgressCallback())}catch(t){return e._error=t,void e._transition("error")}var h=e._ref.storage._makeRequest(l,o,c);e._request=h,h.getPromise().then((function(t){e._increaseMultiplier(),e._request=void 0,e._updateProgress(t.current),t.finalized?(e._metadata=t.metadata,e._transition("success")):e.completeTransitions_()}),e._errorHandler)}))},e.prototype._increaseMultiplier=function(){be*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)},e.prototype._fetchMetadata=function(){var e=this;this._resolveToken((function(t,n){var r=fe(e._ref.storage,e._ref._location,e._mappings),o=e._ref.storage._makeRequest(r,t,n);e._request=o,o.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._transition("success")}),e._metadataErrorHandler)}))},e.prototype._oneShotUpload=function(){var e=this;this._resolveToken((function(t,n){var r=function(e,t,n,r,o){var c=t.bucketOnlyServerUrl(),l={"X-Goog-Upload-Protocol":"multipart"},h=function(){for(var e="",i=0;i<2;i++)e+=Math.random().toString().slice(2);return e}();l["Content-Type"]="multipart/related; boundary="+h;var f=_e(t,r,o),d="--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+ie(f,n)+"\r\n--"+h+"\r\nContent-Type: "+f.contentType+"\r\n\r\n",_="\r\n--"+h+"--",body=Z.getBlob(d,r,_);if(null===body)throw m();var v={name:f.fullPath},y=G(c,e.host),w=e.maxUploadRetryTime,R=new se(y,"POST",ce(e,n),w);return R.urlParams=v,R.headers=l,R.body=body.uploadData(),R.errorHandler=he(t),R}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(r,t,n);e._request=o,o.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._updateProgress(e._blob.size()),e._transition("success")}),e._errorHandler)}))},e.prototype._updateProgress=function(e){var t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()},e.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request&&this._request.cancel();break;case"running":var t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=v(),this._state=e,this._notifyObservers()}},e.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}},Object.defineProperty(e.prototype,"snapshot",{get:function(){var e=I(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),e.prototype.on=function(e,t,n,r){var o=this,c=new ye(t,n,r);return this._addObserver(c),function(){o._removeObserver(c)}},e.prototype.then=function(e,t){return this._promise.then(e,t)},e.prototype.catch=function(e){return this.then(null,e)},e.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},e.prototype._removeObserver=function(e){var i=this._observers.indexOf(e);-1!==i&&this._observers.splice(i,1)},e.prototype._notifyObservers=function(){var e=this;this._finishPromise(),this._observers.slice().forEach((function(t){e._notifyObserver(t)}))},e.prototype._finishPromise=function(){if(void 0!==this._resolve){var e=!0;switch(I(this._state)){case A.SUCCESS:we(this._resolve.bind(null,this.snapshot))();break;case A.CANCELED:case A.ERROR:we(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}},e.prototype._notifyObserver=function(e){switch(I(this._state)){case A.RUNNING:case A.PAUSED:e.next&&we(e.next.bind(e,this.snapshot))();break;case A.SUCCESS:e.complete&&we(e.complete.bind(e))();break;default:e.error&&we(e.error.bind(e,this._error))()}},e.prototype.resume=function(){var e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e},e.prototype.pause=function(){var e="running"===this._state;return e&&this._transition("pausing"),e},e.prototype.cancel=function(){var e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e},e}(),ke=function(){function e(e,t){this._service=e,this._location=t instanceof B?t:B.makeFromUrl(t,e.host)}return e.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},e.prototype._newRef=function(t,n){return new e(t,n)},Object.defineProperty(e.prototype,"root",{get:function(){var e=new B(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return Y(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=function(path){if(0===path.length)return null;var e=path.lastIndexOf("/");return-1===e?"":path.slice(0,e)}(this._location.path);if(null===t)return null;var n=new B(this._location.bucket,t);return new e(this._service,n)},enumerable:!1,configurable:!0}),e.prototype._throwIfRoot=function(e){if(""===this._location.path)throw R(e)},e}();function Te(e){var t={prefixes:[],items:[]};return Oe(e,t).then((function(){return t}))}function Oe(e,t,n){return Object(o.__awaiter)(this,void 0,void 0,(function(){var r,c,l;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return[4,xe(e,{pageToken:n})];case 1:return r=o.sent(),(c=t.prefixes).push.apply(c,r.prefixes),(l=t.items).push.apply(l,r.items),null==r.nextPageToken?[3,3]:[4,Oe(e,t,r.nextPageToken)];case 2:o.sent(),o.label=3;case 3:return[2]}}))}))}function xe(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return null!=t&&"number"==typeof t.maxResults&&H("options.maxResults",1,1e3,t.maxResults),n=t||{},r=de(e.storage,e._location,"/",n.pageToken,n.maxResults),[4,e.storage.makeRequestWithTokens(r)];case 1:return[2,o.sent().getPromise()]}}))}))}function Pe(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n;return Object(o.__generator)(this,(function(r){switch(r.label){case 0:return e._throwIfRoot("updateMetadata"),n=function(e,t,n,r){var o=G(t.fullServerUrl(),e.host),body=ie(n,r),c=e.maxOperationRetryTime,l=new se(o,"PATCH",ce(e,r),c);return l.headers={"Content-Type":"application/json; charset=utf-8"},l.body=body,l.errorHandler=pe(t),l}(e.storage,e._location,t,ne()),[4,e.storage.makeRequestWithTokens(n)];case 1:return[2,r.sent().getPromise()]}}))}))}function Ue(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){var t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getDownloadURL"),t=function(e,t,n){var r=G(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,c=new se(r,"GET",le(e,n),o);return c.errorHandler=pe(t),c}(e.storage,e._location,ne()),[4,e.storage.makeRequestWithTokens(t)];case 1:return[2,n.sent().getPromise().then((function(e){if(null===e)throw new f("no-download-url","The given file does not have any download URLs.");return e}))]}}))}))}function Se(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){var t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("deleteObject"),t=function(e,t){var n=G(t.fullServerUrl(),e.host),r=e.maxOperationRetryTime,o=new se(n,"DELETE",(function(e,t){}),r);return o.successCodes=[200,204],o.errorHandler=pe(t),o}(e.storage,e._location),[4,e.storage.makeRequestWithTokens(t)];case 1:return[2,n.sent().getPromise()]}}))}))}function Ce(e,t){var n=function(path,e){var t=e.split("/").filter((function(component){return component.length>0})).join("/");return 0===path.length?t:path+"/"+t}(e._location.path,t),r=new B(e._location.bucket,n);return new ke(e.storage,r)}function je(path){return/^[A-Za-z]+:\/\//.test(path)}function Ee(e,path){if(e instanceof Me){var t=e;if(null==t._bucket)throw new f("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");var n=new ke(t,t._bucket);return null!=path?Ee(n,path):n}return void 0!==path?Ce(e,path):e}function Ae(e,t){if(t&&je(t)){if(e instanceof Me)return new ke(e,t);throw y("To use ref(service, url), the first argument must be a Storage instance.")}return Ee(e,t)}function Ie(e,t){var n=null==t?void 0:t.storageBucket;return null==n?null:B.makeFromBucketSpec(n,e)}var Me=function(){function e(e,t,n,r,o,c){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._pool=r,this._url=o,this._firebaseVersion=c,this._bucket=null,this._host=h,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=o?B.makeFromBucketSpec(o,this._host):Ie(this._host,this.app.options)}return Object.defineProperty(e.prototype,"host",{get:function(){return this._host},set:function(e){this._host=e,null!=this._url?this._bucket=B.makeFromBucketSpec(this._url,e):this._bucket=Ie(e,this.app.options)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(time){H("time",0,Number.POSITIVE_INFINITY,time),this._maxUploadRetryTime=time},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(time){H("time",0,Number.POSITIVE_INFINITY,time),this._maxOperationRetryTime=time},enumerable:!1,configurable:!0}),e.prototype._getAuthToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e,t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:return this._overrideAuthToken?[2,this._overrideAuthToken]:(e=this._authProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:if(null!==(t=n.sent()))return[2,t.accessToken];n.label=2;case 2:return[2,null]}}))}))},e.prototype._getAppCheckToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e;return Object(o.__generator)(this,(function(t){switch(t.label){case 0:return(e=this._appCheckProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:return[2,t.sent().token];case 2:return[2,null]}}))}))},e.prototype._delete=function(){return this._deleted||(this._deleted=!0,this._requests.forEach((function(e){return e.cancel()})),this._requests.clear()),Promise.resolve()},e.prototype._makeStorageReference=function(e){return new ke(this,e)},e.prototype._makeRequest=function(e,t,n){var r=this;if(this._deleted)return new N(w());var o=function(e,t,n,r,o,c){var l=W(e.urlParams),h=e.url+l,f=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(f,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(f,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(f,c),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(f,r),new X(h,e.method,f,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,o)}(e,this._appId,t,n,this._pool,this._firebaseVersion);return this._requests.add(o),o.getPromise().then((function(){return r._requests.delete(o)}),(function(){return r._requests.delete(o)})),o},e.prototype.makeRequestWithTokens=function(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return[4,Promise.all([this._getAuthToken(),this._getAppCheckToken()])];case 1:return t=o.sent(),n=t[0],r=t[1],[2,this._makeRequest(e,n,r)]}}))}))},e}();function qe(e,data,t){return function(e,data,t){return e._throwIfRoot("uploadBytesResumable"),new Re(e,new Z(data),t)}(e=Object(c.getModularInstance)(e),data,t)}function Le(e){return function(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){var t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getMetadata"),t=fe(e.storage,e._location,ne()),[4,e.storage.makeRequestWithTokens(t)];case 1:return[2,n.sent().getPromise()]}}))}))}(e=Object(c.getModularInstance)(e))}function Be(e,t){return Ae(e=Object(c.getModularInstance)(e),t)}function Ne(e,t,n,r){void 0===r&&(r={}),function(e,t,n,r){void 0===r&&(r={}),e.host="http://"+t+":"+n;var o=r.mockUserToken;o&&(e._overrideAuthToken="string"==typeof o?o:Object(c.createMockUserToken)(o,e.app.options.projectId))}(e,t,n,r)}var Fe,ze,De=function(){function e(e,t,n){this._delegate=e,this.task=t,this.ref=n}return Object.defineProperty(e.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),e}(),He=function(){function e(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(e.prototype,"snapshot",{get:function(){return new De(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),e.prototype.then=function(e,t){var n=this;return this._delegate.then((function(t){if(e)return e(new De(t,n,n._ref))}),t)},e.prototype.on=function(e,t,n,r){var o=this,c=void 0;return t&&(c="function"==typeof t?function(e){return t(new De(e,o,o._ref))}:{next:t.next?function(e){return t.next(new De(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,c,n||void 0,r||void 0)},e}(),Ge=function(){function e(e,t){this._delegate=e,this._service=t}return Object.defineProperty(e.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map((function(t){return new We(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){var e=this;return this._delegate.items.map((function(t){return new We(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),e}(),We=function(){function e(e,t){this._delegate=e,this.storage=t}return Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this._delegate.toString()},e.prototype.child=function(t){var n=function(e,t){return Ce(e,t)}(this._delegate,t);return new e(n,this.storage)},Object.defineProperty(e.prototype,"root",{get:function(){return new e(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=this._delegate.parent;return null==t?null:new e(t,this.storage)},enumerable:!1,configurable:!0}),e.prototype.put=function(data,e){return this._throwIfRoot("put"),new He(qe(this._delegate,data,e),this)},e.prototype.putString=function(e,t,n){void 0===t&&(t=O.RAW),this._throwIfRoot("putString");var data=P(t,e),r=Object(o.__assign)({},n);return null==r.contentType&&null!=data.contentType&&(r.contentType=data.contentType),new He(new Re(this._delegate,new Z(data.data,!0),r),this)},e.prototype.listAll=function(){var e=this;return function(e){return Te(e=Object(c.getModularInstance)(e))}(this._delegate).then((function(t){return new Ge(t,e.storage)}))},e.prototype.list=function(e){var t=this;return function(e,t){return xe(e=Object(c.getModularInstance)(e),t)}(this._delegate,e||void 0).then((function(e){return new Ge(e,t.storage)}))},e.prototype.getMetadata=function(){return Le(this._delegate)},e.prototype.updateMetadata=function(e){return function(e,t){return Pe(e=Object(c.getModularInstance)(e),t)}(this._delegate,e)},e.prototype.getDownloadURL=function(){return function(e){return Ue(e=Object(c.getModularInstance)(e))}(this._delegate)},e.prototype.delete=function(){return this._throwIfRoot("delete"),function(e){return Se(e=Object(c.getModularInstance)(e))}(this._delegate)},e.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw R(e)},e}(),Xe=function(){function e(e,t){this.app=e,this._delegate=t}return Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),e.prototype.ref=function(path){if(je(path))throw y("ref() expected a child path but got a URL, use refFromURL instead.");return new We(Be(this._delegate,path),this)},e.prototype.refFromURL=function(e){if(!je(e))throw y("refFromURL() expected a full URL but got a child path, use ref() instead.");try{B.makeFromUrl(e,this._delegate.host)}catch(e){throw y("refFromUrl() expected a valid full URL but got an invalid one.")}return new We(Be(this._delegate,e),this)},e.prototype.setMaxUploadRetryTime=function(time){this._delegate.maxUploadRetryTime=time},e.prototype.setMaxOperationRetryTime=function(time){this._delegate.maxOperationRetryTime=time},e.prototype.useEmulator=function(e,t,n){void 0===n&&(n={}),Ne(this._delegate,e,t,n)},e}();function Ve(e,t){var n=t.instanceIdentifier,o=e.getProvider("app").getImmediate(),c=e.getProvider("auth-internal"),l=e.getProvider("app-check-internal");return new Xe(o,new Me(o,c,l,new L,n,r.default.SDK_VERSION))}Fe=r.default,ze={TaskState:A,TaskEvent:E,StringFormat:O,Storage:Me,Reference:We},Fe.INTERNAL.registerComponent(new l.Component("storage",Ve,"PUBLIC").setServiceProps(ze).setMultipleInstances(!0)),Fe.registerVersion("@firebase/storage","0.7.1")}}]);