(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{1047:function(e,t,n){"use strict";n.r(t),n.d(t,"DeviceWeb",(function(){return r}));var o=n(54);class r extends o.b{async getId(){return{identifier:this.getUid()}}async getInfo(){if("undefined"==typeof navigator||!navigator.userAgent)throw this.unavailable("Device API not available in this browser");const e=navigator.userAgent,t=this.parseUa(e);return{model:t.model,platform:"web",operatingSystem:t.operatingSystem,osVersion:t.osVersion,manufacturer:navigator.vendor,isVirtual:!1,webViewVersion:t.browserVersion}}async getBatteryInfo(){if("undefined"==typeof navigator||!navigator.getBattery)throw this.unavailable("Device API not available in this browser");let e={};try{e=await navigator.getBattery()}catch(e){}return{batteryLevel:e.level,isCharging:e.charging}}async getLanguageCode(){return{value:navigator.language.split("-")[0].toLowerCase()}}async getLanguageTag(){return{value:navigator.language}}parseUa(e){const t={},n=e.indexOf("(")+1;let o=e.indexOf(") AppleWebKit");-1!==e.indexOf(") Gecko")&&(o=e.indexOf(") Gecko"));const r=e.substring(n,o);if(-1!==e.indexOf("Android")){const e=r.replace("; wv","").split("; ").pop();e&&(t.model=e.split(" Build")[0]),t.osVersion=r.split("; ")[1]}else if(t.model=r.split("; ")[0],"undefined"!=typeof navigator&&navigator.oscpu)t.osVersion=navigator.oscpu;else if(-1!==e.indexOf("Windows"))t.osVersion=r;else{const e=r.split("; ").pop();if(e){const n=e.replace(" like Mac OS X","").split(" ");t.osVersion=n[n.length-1].replace(/_/g,".")}}/android/i.test(e)?t.operatingSystem="android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?t.operatingSystem="ios":/Win/.test(e)?t.operatingSystem="windows":/Mac/i.test(e)?t.operatingSystem="mac":t.operatingSystem="unknown";const l=!!window.ApplePaySession,d=!!window.chrome,c=/Firefox/.test(e),x=/Edg/.test(e),w=/FxiOS/.test(e),f=/CriOS/.test(e),v=/EdgiOS/.test(e);if(l||d&&!x||w||f||v){let n;n=w?"FxiOS":f?"CriOS":v?"EdgiOS":l?"Version":"Chrome";const o=e.split(" ");for(const e of o)if(e.includes(n)){const n=e.split("/")[1];t.browserVersion=n}}else if(c||x){const n=e.split("").reverse().join("").split("/")[0].split("").reverse().join("");t.browserVersion=n}return t}getUid(){if("undefined"!=typeof window&&window.localStorage){let e=window.localStorage.getItem("_capuid");return e||(e=this.uuid4(),window.localStorage.setItem("_capuid",e),e)}return this.uuid4()}uuid4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}}}}]);