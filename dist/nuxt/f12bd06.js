(window.webpackJsonp=window.webpackJsonp||[]).push([[200],{1047:function(e,t,n){"use strict";n.r(t),n.d(t,"ShareWeb",(function(){return o}));var r=n(58);class o extends r.b{async canShare(){return"undefined"!=typeof navigator&&navigator.share?{value:!0}:{value:!1}}async share(e){if("undefined"==typeof navigator||!navigator.share)throw this.unavailable("Share API not available in this browser");return await navigator.share({title:e.title,text:e.text,url:e.url}),{}}}}}]);