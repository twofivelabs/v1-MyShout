(window.webpackJsonp=window.webpackJsonp||[]).push([[192],{1052:function(n,e,o){"use strict";o.r(e),o.d(e,"AdMobWeb",(function(){return r}));var t=o(54);class r extends t.b{constructor(){super({name:"AdMob",platforms:["web"]})}async initialize(){console.log("initialize")}async targetSettings(){console.log("targetSettings")}async trackingAuthorizationStatus(){return{status:"authorized"}}async showBanner(n){console.log("showBanner",n)}async hideBanner(){console.log("hideBanner")}async resumeBanner(){console.log("resumeBanner")}async removeBanner(){console.log("removeBanner")}async prepareInterstitial(n){return console.log("prepareInterstitial",n),{adUnitId:n.adId}}async showInterstitial(){console.log("showInterstitial")}async prepareRewardVideoAd(n){return console.log(n),{adUnitId:n.adId}}async showRewardVideoAd(){return{type:"",amount:0}}}}}]);