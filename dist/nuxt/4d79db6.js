(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{767:function(e,t,n){"use strict";n.r(t);var o=n(695),r=n(158),l=n(257),c=n(159),d=n(100),v=n(914),f=n(0),_=(n(56),n(67),n(34),n(62),n(16),n(3)),m=Object(_.b)({name:"AdminNavComp",setup:function(){var e=Object(_.r)().state,t=Object(_.p)(),n=Object(_.a)((function(){return e.user})),o=Object(_.i)(n.value.data.role.isAdmin),r=Object(_.i)(n.value.data.role.isVendor),l=Object(_.i)(n.value.data.role.isDriver),c=Object(_.i)([{to:"/admin/users",label:"Users"},{to:"/admin/pages",label:"Pages"},{to:"/admin/posts",label:"Posts"}]),d=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.value||(r.value?c.value=[{to:"/admin/products",label:"Products"},{to:"/admin/posts",label:"Posts"},{to:"/admin/shipping",label:"Shipping"},{to:"/admin/feedback",label:"Feedback"}]:l.value&&(c.value=[]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var p=t.value.path;return"/admin"!==p&&"/admin/"!==p&&(!p.includes("/edit")&&!p.includes("/users"))};return Object(_.f)((function(){v(),d()})),{canAdd:v,navOptions:c,getRoute:function(){return t.value.fullPath.includes("edit")?t.value.fullPath.replace(t.value.params.id,""):"".concat(t.value.fullPath,"/edit")}}}}),O=m,h=n(43),component=Object(h.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.canAdd()?n(o.a,{staticClass:"mr-1 elevation-0",attrs:{to:e.getRoute(),color:"secondary"}},[e._v("\n    + Add\n  ")]):e._e(),e._v(" "),n(v.a,{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,l=t.attrs;return[n(o.a,e._g(e._b({attrs:{color:"primary",dark:"",elevation:"0"}},"v-btn",l,!1),r),[e._v("\n        Content\n      ")])]}}])},[e._v(" "),n(l.a,e._l(e.navOptions,(function(t,o){return n(c.a,{key:o,attrs:{to:t.to,nuxt:""}},[n(d.a,[n(d.c,[e._v("\n            "+e._s(t.label)+"\n          ")])],1)],1)})),1)],1),e._v(" "),n(o.a,{staticClass:"elevation-0",on:{click:function(t){return e.$nuxt.refresh()}}},[n(r.a,[e._v("mdi-refresh")])],1)],1)}),[],!1,null,null,null);t.default=component.exports},785:function(e,t,n){"use strict";var o={inserted:function(e,t,n){var o=t.value,r=t.options||{passive:!0};window.addEventListener("resize",o,r),e._onResize=Object(e._onResize),e._onResize[n.context._uid]={callback:o,options:r},t.modifiers&&t.modifiers.quiet||o()},unbind:function(e,t,n){var o;if(null===(o=e._onResize)||void 0===o?void 0:o[n.context._uid]){var r=e._onResize[n.context._uid],l=r.callback,c=r.options;window.removeEventListener("resize",l,c),delete e._onResize[n.context._uid]}}};t.a=o}}]);