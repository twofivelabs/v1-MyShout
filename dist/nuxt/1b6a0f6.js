(window.webpackJsonp=window.webpackJsonp||[]).push([[220],{695:function(t,e,n){"use strict";n.r(e),n.d(e,"pwa_action_sheet",(function(){return r}));var o=n(224),r=function(){function t(t){Object(o.h)(this,t),this.cancelable=!0,this.options=[],this.open=!1,this.onSelection=Object(o.d)(this,"onSelection",7)}return t.prototype.componentDidLoad=function(){var t=this;requestAnimationFrame((function(){t.open=!0}))},t.prototype.dismiss=function(){this.cancelable&&this.close()},t.prototype.close=function(){var t=this;this.open=!1,setTimeout((function(){t.el.parentNode.removeChild(t.el)}),500)},t.prototype.handleOptionClick=function(t,i){t.stopPropagation(),this.onSelection.emit(i),this.close()},t.prototype.render=function(){var t=this;return Object(o.g)("div",{class:"wrapper"+(this.open?" open":""),onClick:function(){return t.dismiss()}},Object(o.g)("div",{class:"content"},Object(o.g)("div",{class:"title"},this.header),this.options.map((function(option,i){return Object(o.g)("div",{class:"action-sheet-option",onClick:function(e){return t.handleOptionClick(e,i)}},Object(o.g)("div",{class:"action-sheet-button"},option.title))}))))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.f)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,Roboto,sans-serif}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:transparent;-webkit-transition:background-color .4s cubic-bezier(.36,.66,.04,1);transition:background-color .4s cubic-bezier(.36,.66,.04,1)}.wrapper.open{background-color:rgba(0,0,0,.32)}.title{color:#999;height:23px;line-height:23px;padding-bottom:17px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:20px}.content{width:568px;-ms-flex-item-align:end;align-self:flex-end;background-color:#fff;-webkit-transition:-webkit-transform .4s cubic-bezier(.36,.66,.04,1);transition:-webkit-transform .4s cubic-bezier(.36,.66,.04,1);transition:transform .4s cubic-bezier(.36,.66,.04,1);transition:transform .4s cubic-bezier(.36,.66,.04,1),-webkit-transform .4s cubic-bezier(.36,.66,.04,1);-webkit-transform:translateY(100%);transform:translateY(100%)}.wrapper.open .content{-webkit-transform:translateY(0);transform:translateY(0)}@media only screen and (max-width:568px){.content{width:100%}}.action-sheet-option{cursor:pointer;height:52px;line-height:52px}.action-sheet-button{color:#262626;font-size:16px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:0}.action-sheet-button:hover{background-color:#f6f6f6}"},enumerable:!0,configurable:!0}),t}()}}]);