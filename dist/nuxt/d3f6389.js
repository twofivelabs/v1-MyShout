(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{812:function(e,t,n){"use strict";n.r(t);n(112),n(5);var r=n(13),c=n.n(r),d=n(3),o=Object(d.b)({name:"PreviousLiked",props:{product:{type:Object,default:function(){return{}}},company:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(d.r)().state,n=Object(d.a)((function(){return t.user.tagging.all})),r=Object(d.i)(null);return Object(d.e)((function(){e.company&&e.company.id?c.a.find(n.value,{id:e.company.id,purchased:!0})?r.value="Previously ordered from here":c.a.find(n.value,{id:e.company.id,like:!0})&&(r.value="You like their products"):e.product&&e.product.id&&c.a.find(n.value,{id:e.product.id,purchased:!0})&&(r.value="Previously ordered by you")})),{displayText:r}}}),l=n(43),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.displayText?n("div",{staticClass:"caption primary--text"},[e._v("\n  "+e._s(e.displayText)+"\n")]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);