(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{768:function(e,t,n){"use strict";n.r(t);var o=n(693),r=n(163),l=n(263),c=n(164),d=n(103),v=n(914),f=n(0),m=(n(46),n(58),n(31),n(60),n(14),n(5)),_=Object(m.b)({name:"AdminNavComp",setup:function(){var e=Object(m.q)().state,t=Object(m.o)(),n=Object(m.a)((function(){return e.user})),o=Object(m.i)(n.value.data.role.isAdmin),r=Object(m.i)(n.value.data.role.isVendor),l=Object(m.i)(n.value.data.role.isDriver),c=Object(m.i)([{to:"/admin/users",label:"Users"},{to:"/admin/pages",label:"Pages"},{to:"/admin/posts",label:"Posts"}]),d=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.value||(r.value?c.value=[{to:"/admin/products",label:"Products"},{to:"/admin/posts",label:"Posts"},{to:"/admin/shipping",label:"Shipping"},{to:"/admin/feedback",label:"Feedback"}]:l.value&&(c.value=[]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var p=t.value.path;return"/admin"!==p&&"/admin/"!==p&&(!p.includes("/edit")&&!p.includes("/users"))};return Object(m.f)((function(){v(),d()})),{canAdd:v,navOptions:c,getRoute:function(){return t.value.fullPath.includes("edit")?t.value.fullPath.replace(t.value.params.id,""):"".concat(t.value.fullPath,"/edit")}}}}),O=_,h=n(37),component=Object(h.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.canAdd()?n(o.a,{staticClass:"mr-1 elevation-0",attrs:{to:e.getRoute(),color:"secondary",small:""}},[e._v("\n    + "+e._s(e.$t("btn.add"))+"\n  ")]):e._e(),e._v(" "),n(v.a,{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,l=t.attrs;return[n(o.a,e._g(e._b({attrs:{color:"primary",dark:"",elevation:"0",small:""}},"v-btn",l,!1),r),[e._v("\n        "+e._s(e.$t("btn.content"))+"\n      ")])]}}])},[e._v(" "),n(l.a,[n(c.a,{attrs:{to:"/admin",nuxt:"",color:"primary"}},[n(d.a,[n(d.c,[e._v("\n            Dashboard\n          ")])],1)],1),e._v(" "),e._l(e.navOptions,(function(t,o){return n(c.a,{key:o,attrs:{to:t.to,nuxt:""}},[n(d.a,[n(d.c,[e._v("\n            "+e._s(t.label)+"\n          ")])],1)],1)}))],2)],1),e._v(" "),n(o.a,{staticClass:"elevation-0",attrs:{small:""},on:{click:function(t){return e.$nuxt.refresh()}}},[n(r.a,[e._v("mdi-refresh")])],1)],1)}),[],!1,null,null,null);t.default=component.exports},793:function(e,t,n){"use strict";var o={inserted:function(e,t,n){var o=t.value,r=t.options||{passive:!0};window.addEventListener("resize",o,r),e._onResize=Object(e._onResize),e._onResize[n.context._uid]={callback:o,options:r},t.modifiers&&t.modifiers.quiet||o()},unbind:function(e,t,n){var o;if(null===(o=e._onResize)||void 0===o?void 0:o[n.context._uid]){var r=e._onResize[n.context._uid],l=r.callback,c=r.options;window.removeEventListener("resize",l,c),delete e._onResize[n.context._uid]}}};t.a=o}}]);