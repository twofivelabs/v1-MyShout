(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1160:function(t,n,r){"use strict";r.r(n);var e=r(3),c=Object(e.b)({name:"CartGrandTotal",setup:function(){var t=Object(e.r)().state;return{cart:Object(e.a)((function(){return t.cart.current}))}}}),l=r(43),o=r(45),v=r.n(o),w=r(710),f=r(711),component=Object(l.a)(c,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("v-row",{staticClass:"align-center pt-3"},[r("v-col",{staticClass:"overline text-right pa-0",attrs:{cols:"8"}},[t._v("\n    Total\n  ")]),t._v(" "),r("v-col",{staticClass:"text-right pa-0 pr-6"},[t._v("\n    "+t._s(t._f("centsToDollars")(t.cart.total||0))+"\n  ")])],1)}),[],!1,null,null,null);n.default=component.exports;v()(component,{VCol:w.a,VRow:f.a})}}]);