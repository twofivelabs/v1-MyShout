(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{1114:function(t,e,l){"use strict";l.r(e);var c=l(693),n=l(163),r=(l(25),l(5)),o=Object(r.b)({name:"GlobalShare",props:{payload:{type:Object,default:function(){return{}}}},setup:function(t){var e=Object(r.l)(),l=e.$capacitor,c=e.$config,n=Object(r.o)();return{share:function(){var e=t.payload;t.payload.path?e.url="".concat(c.websiteUrl).concat(t.payload.path):e.url="".concat(c.websiteUrl).concat(n.value.fullPath),l.share(e)}}}}),h=l(37),component=Object(h.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticStyle:{display:"inline-block"}},[l(c.a,{staticClass:"white--text elevation-0",attrs:{color:"grey",fab:"","x-small":"",right:"",top:""},on:{click:t.share}},[l(n.a,[t._v("mdi-share-variant")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);