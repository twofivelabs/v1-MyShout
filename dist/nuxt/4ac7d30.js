(window.webpackJsonp=window.webpackJsonp||[]).push([[203],{705:function(t,e,o){"use strict";o.r(e),o.d(e,"pwa_toast",(function(){return r}));var n=o(226),r=function(){function t(t){Object(n.h)(this,t),this.duration=2e3,this.closing=null}return t.prototype.hostData=function(){var t={out:!!this.closing};return null!==this.closing&&(t.in=!this.closing),{class:t}},t.prototype.componentDidLoad=function(){var t=this;setTimeout((function(){t.closing=!1})),setTimeout((function(){t.close()}),this.duration)},t.prototype.close=function(){var t=this;this.closing=!0,setTimeout((function(){t.el.parentNode.removeChild(t.el)}),1e3)},t.prototype.__stencil_render=function(){return Object(n.g)("div",{class:"wrapper"},Object(n.g)("div",{class:"toast"},this.message))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(n.f)(this)},enumerable:!0,configurable:!0}),t.prototype.render=function(){return Object(n.g)(n.a,this.hostData(),this.__stencil_render())},Object.defineProperty(t,"style",{get:function(){return":host{position:fixed;bottom:20px;left:0;right:0;display:-ms-flexbox;display:flex;opacity:0}:host(.in){-webkit-transition:opacity .3s;transition:opacity .3s;opacity:1}:host(.out){-webkit-transition:opacity 1s;transition:opacity 1s;opacity:0}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.toast{font-family:-apple-system,system-ui,Helvetica Neue,Roboto,sans-serif;background-color:#eee;color:#000;border-radius:5px;padding:10px 15px;font-size:14px;font-weight:500;-webkit-box-shadow:0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 2px rgba(0,0,0,.2)}"},enumerable:!0,configurable:!0}),t}()}}]);