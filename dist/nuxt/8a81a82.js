/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{809:function(e,t,n){"use strict";var r,o=n(776),c=n(783),f=n(779),l=n(780),d=n(832),h="0.4.32",_=1e4,v="w:"+h,w="FIS_v2",y="https://firebaseinstallations.googleapis.com/v1",j=36e5,m=((r={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',r["not-registered"]="Firebase Installation is not registered.",r["installation-not-found"]="Firebase Installation not found.",r["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',r["app-offline"]="Could not process request. Application offline.",r["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",r),O=new l.ErrorFactory("installations","Installations",m);function S(e){return e instanceof l.FirebaseError&&e.code.includes("request-failed")}function I(e){var t=e.projectId;return y+"/projects/"+t+"/installations"}function C(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function k(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return[4,t.json()];case 1:return n=o.sent(),r=n.error,[2,O.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function T(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function D(e,t){var n=t.refreshToken,r=T(e);return r.append("Authorization",function(e){return w+" "+e}(n)),r}function x(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t;return Object(f.__generator)(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function P(e,t){var n=t.fid;return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,r,body,o,c,l;return Object(f.__generator)(this,(function(f){switch(f.label){case 0:return t=I(e),r=T(e),body={fid:n,authVersion:w,appId:e.appId,sdkVersion:v},o={method:"POST",headers:r,body:JSON.stringify(body)},[4,x((function(){return fetch(t,o)}))];case 1:return(c=f.sent()).ok?[4,c.json()]:[3,3];case 2:return l=f.sent(),[2,{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:C(l.authToken)}];case 3:return[4,k("Create Installation",c)];case 4:throw f.sent()}}))}))}function E(e){return new Promise((function(t){setTimeout(t,e)}))}var A=/^[cdef][\w-]{21}$/,N="";function B(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){var t=(n=e,btoa(String.fromCharCode.apply(String,Object(f.__spreadArray)([],Object(f.__read)(n)))).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}(e);return A.test(t)?t:N}catch(e){return N}}function K(e){return e.appName+"!"+e.appId}var L=new Map;function V(e,t){var n=K(e);F(n,t),function(e,t){var n=$();n&&n.postMessage({key:e,fid:t});J()}(n,t)}function F(e,t){var n,r,o=L.get(e);if(o)try{for(var c=Object(f.__values)(o),l=c.next();!l.done;l=c.next()){(0,l.value)(t)}}catch(e){n={error:e}}finally{try{l&&!l.done&&(r=c.return)&&r.call(c)}finally{if(n)throw n.error}}}var M=null;function $(){return!M&&"BroadcastChannel"in self&&((M=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){F(e.data.key,e.data.fid)}),M}function J(){0===L.size&&M&&(M.close(),M=null)}var z,R="firebase-installations-database",U=1,G="firebase-installations-store",H=null;function Q(){return H||(H=Object(d.openDb)(R,U,(function(e){if(0===e.oldVersion)e.createObjectStore(G)}))),H}function W(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r,o,c,l;return Object(f.__generator)(this,(function(f){switch(f.label){case 0:return n=K(e),[4,Q()];case 1:return r=f.sent(),o=r.transaction(G,"readwrite"),[4,(c=o.objectStore(G)).get(n)];case 2:return l=f.sent(),[4,c.put(t,n)];case 3:return f.sent(),[4,o.complete];case 4:return f.sent(),l&&l.fid===t.fid||V(e,t.fid),[2,t]}}))}))}function X(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return t=K(e),[4,Q()];case 1:return n=o.sent(),[4,(r=n.transaction(G,"readwrite")).objectStore(G).delete(t)];case 2:return o.sent(),[4,r.complete];case 3:return o.sent(),[2]}}))}))}function Y(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r,o,c,l,d;return Object(f.__generator)(this,(function(f){switch(f.label){case 0:return n=K(e),[4,Q()];case 1:return r=f.sent(),o=r.transaction(G,"readwrite"),[4,(c=o.objectStore(G)).get(n)];case 2:return l=f.sent(),void 0!==(d=t(l))?[3,4]:[4,c.delete(n)];case 3:return f.sent(),[3,6];case 4:return[4,c.put(d,n)];case 5:f.sent(),f.label=6;case 6:return[4,o.complete];case 7:return f.sent(),!d||l&&l.fid===d.fid||V(e,d.fid),[2,d]}}))}))}function Z(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return[4,Y(e,(function(n){var r=function(e){var t=e||{fid:B(),registrationStatus:0};return ne(t)}(n),o=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(O.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=function(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,7]),[4,P(e,t)];case 1:return n=o.sent(),[2,W(e,n)];case 2:return S(r=o.sent())&&409===r.customData.serverCode?[4,X(e)]:[3,4];case 3:return o.sent(),[3,6];case 4:return[4,W(e,{fid:t.fid,registrationStatus:0})];case 5:o.sent(),o.label=6;case 6:throw r;case 7:return[2]}}))}))}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:ee(e)}:{installationEntry:t}}(e,r);return t=o.registrationPromise,o.installationEntry}))];case 1:return(n=o.sent()).fid!==N?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=o.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function ee(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,n,r,o;return Object(f.__generator)(this,(function(c){switch(c.label){case 0:return[4,te(e)];case 1:t=c.sent(),c.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,E(100)];case 3:return c.sent(),[4,te(e)];case 4:return t=c.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,Z(e)];case 6:return n=c.sent(),r=n.installationEntry,(o=n.registrationPromise)?[2,o]:[2,r];case 7:return[2,t]}}))}))}function te(e){return Y(e,(function(e){if(!e)throw O.create("installation-not-found");return ne(e)}))}function ne(e){return 1===(t=e).registrationStatus&&t.registrationTime+_<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}function re(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return Object(f.__awaiter)(this,void 0,void 0,(function(){var e,o,c,body,l,d,h;return Object(f.__generator)(this,(function(f){switch(f.label){case 0:return e=function(e,t){var n=t.fid;return I(e)+"/"+n+"/authTokens:generate"}(n,t),o=D(n,t),(c=r.getImmediate({optional:!0}))&&o.append("x-firebase-client",c.getPlatformInfoString()),body={installation:{sdkVersion:v}},l={method:"POST",headers:o,body:JSON.stringify(body)},[4,x((function(){return fetch(e,l)}))];case 1:return(d=f.sent()).ok?[4,d.json()]:[3,3];case 2:return h=f.sent(),[2,C(h)];case 3:return[4,k("Generate Auth Token",d)];case 4:throw f.sent()}}))}))}function ie(e,t){return void 0===t&&(t=!1),Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r,o;return Object(f.__generator)(this,(function(c){switch(c.label){case 0:return[4,Y(e.appConfig,(function(r){if(!ae(r))throw O.create("not-registered");var o=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+j}(e)}(o))return r;if(1===o.requestStatus)return n=function(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return[4,oe(e.appConfig)];case 1:n=o.sent(),o.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,E(100)];case 3:return o.sent(),[4,oe(e.appConfig)];case 4:return n=o.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,ie(e,t)]:[2,r]}}))}))}(e,t),r;if(!navigator.onLine)throw O.create("app-offline");var c=function(e){var t={requestStatus:1,requestTime:Date.now()};return Object(f.__assign)(Object(f.__assign)({},e),{authToken:t})}(r);return n=function(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r,o;return Object(f.__generator)(this,(function(c){switch(c.label){case 0:return c.trys.push([0,3,,8]),[4,re(e,t)];case 1:return n=c.sent(),o=Object(f.__assign)(Object(f.__assign)({},t),{authToken:n}),[4,W(e.appConfig,o)];case 2:return c.sent(),[2,n];case 3:return!S(r=c.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,X(e.appConfig)];case 4:return c.sent(),[3,7];case 5:return o=Object(f.__assign)(Object(f.__assign)({},t),{authToken:{requestStatus:0}}),[4,W(e.appConfig,o)];case 6:c.sent(),c.label=7;case 7:throw r;case 8:return[2]}}))}))}(e,c),c}))];case 1:return r=c.sent(),n?[4,n]:[3,3];case 2:return o=c.sent(),[3,4];case 3:o=r.authToken,c.label=4;case 4:return[2,o]}}))}))}function oe(e){return Y(e,(function(e){if(!ae(e))throw O.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+_<Date.now()?Object(f.__assign)(Object(f.__assign)({},e),{authToken:{requestStatus:0}}):e}))}function ae(e){return void 0!==e&&2===e.registrationStatus}function se(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t;return Object(f.__generator)(this,(function(n){switch(n.label){case 0:return[4,Z(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}function ue(e,t){return Object(f.__awaiter)(this,void 0,void 0,(function(){var n,r,o,c;return Object(f.__generator)(this,(function(f){switch(f.label){case 0:return n=function(e,t){var n=t.fid;return I(e)+"/"+n}(e,t),r=D(e,t),o={method:"DELETE",headers:r},[4,x((function(){return fetch(n,o)}))];case 1:return(c=f.sent()).ok?[3,3]:[4,k("Delete Installation",c)];case 2:throw f.sent();case 3:return[2]}}))}))}function ce(e,t){var n=e.appConfig;return function(e,t){$();var n=K(e),r=L.get(n);r||(r=new Set,L.set(n,r)),r.add(t)}(n,t),function(){!function(e,t){var n=K(e),r=L.get(n);r&&(r.delete(t),0===r.size&&L.delete(n),J())}(n,t)}}function fe(e){return O.create("missing-app-config-values",{valueName:e})}(z=o.default).INTERNAL.registerComponent(new c.Component("installations",(function(e){var t=e.getProvider("app").getImmediate(),n=function(e){var t,n;if(!e||!e.options)throw fe("App Configuration");if(!e.name)throw fe("App Name");try{for(var r=Object(f.__values)(["projectId","apiKey","appId"]),o=r.next();!o.done;o=r.next()){var c=o.value;if(!e.options[c])throw fe(c)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),r={appConfig:n,platformLoggerProvider:e.getProvider("platform-logger")},o={app:t,getId:function(){return function(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(f.__generator)(this,(function(o){switch(o.label){case 0:return[4,Z(e.appConfig)];case 1:return t=o.sent(),n=t.installationEntry,(r=t.registrationPromise)?r.catch(console.error):ie(e).catch(console.error),[2,n.fid]}}))}))}(r)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),Object(f.__awaiter)(this,void 0,void 0,(function(){return Object(f.__generator)(this,(function(n){switch(n.label){case 0:return[4,se(e.appConfig)];case 1:return n.sent(),[4,ie(e,t)];case 2:return[2,n.sent().token]}}))}))}(r,e)},delete:function(){return function(e){return Object(f.__awaiter)(this,void 0,void 0,(function(){var t,n;return Object(f.__generator)(this,(function(r){switch(r.label){case 0:return[4,Y(t=e.appConfig,(function(e){if(!e||0!==e.registrationStatus)return e}))];case 1:if(!(n=r.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw O.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw O.create("app-offline");case 3:return[4,ue(t,n)];case 4:return r.sent(),[4,X(t)];case 5:r.sent(),r.label=6;case 6:return[2]}}))}))}(r)},onIdChange:function(e){return ce(r,e)}};return o}),"PUBLIC")),z.registerVersion("@firebase/installations",h)},832:function(e,t,n){!function(e){"use strict";function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function r(e,t,r){var o,p=new Promise((function(c,f){n(o=e[t].apply(e,r)).then(c,f)}));return p.request=o,p}function o(e,t,n){var p=r(e,t,n);return p.then((function(e){if(e)return new _(e,p.request)}))}function c(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function f(e,t,n,o){o.forEach((function(o){o in n.prototype&&(e.prototype[o]=function(){return r(this[t],o,arguments)})}))}function l(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function d(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return o(this[t],r,arguments)})}))}function h(e){this._index=e}function _(cursor,e){this._cursor=cursor,this._request=e}function v(e){this._store=e}function w(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function y(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new w(n)}function j(e){this._db=e}function m(e,t,n){var p=r(indexedDB,"open",[e,t]),o=p.request;return o&&(o.onupgradeneeded=function(e){n&&n(new y(o.result,e.oldVersion,o.transaction))}),p.then((function(e){return new j(e)}))}function O(e){return r(indexedDB,"deleteDatabase",[e])}c(h,"_index",["name","keyPath","multiEntry","unique"]),f(h,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),d(h,"_index",IDBIndex,["openCursor","openKeyCursor"]),c(_,"_cursor",["direction","key","primaryKey","value"]),f(_,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(_.prototype[e]=function(){var cursor=this,t=arguments;return Promise.resolve().then((function(){return cursor._cursor[e].apply(cursor._cursor,t),n(cursor._request).then((function(e){if(e)return new _(e,cursor._request)}))}))})})),v.prototype.createIndex=function(){return new h(this._store.createIndex.apply(this._store,arguments))},v.prototype.index=function(){return new h(this._store.index.apply(this._store,arguments))},c(v,"_store",["name","keyPath","indexNames","autoIncrement"]),f(v,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),d(v,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),l(v,"_store",IDBObjectStore,["deleteIndex"]),w.prototype.objectStore=function(){return new v(this._tx.objectStore.apply(this._tx,arguments))},c(w,"_tx",["objectStoreNames","mode"]),l(w,"_tx",IDBTransaction,["abort"]),y.prototype.createObjectStore=function(){return new v(this._db.createObjectStore.apply(this._db,arguments))},c(y,"_db",["name","version","objectStoreNames"]),l(y,"_db",IDBDatabase,["deleteObjectStore","close"]),j.prototype.transaction=function(){return new w(this._db.transaction.apply(this._db,arguments))},c(j,"_db",["name","version","objectStoreNames"]),l(j,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[v,h].forEach((function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],o=this._store||this._index,c=o[e].apply(o,n.slice(0,-1));c.onsuccess=function(){r(c.result)}})}))})),[h,v].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(o){n.iterateCursor(e,(function(cursor){cursor?(r.push(cursor.value),void 0===t||r.length!=t?cursor.continue():o(r)):o(r)}))}))})})),e.openDb=m,e.deleteDb=O,Object.defineProperty(e,"__esModule",{value:!0})}(t)}}]);