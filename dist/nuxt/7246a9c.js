(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{757:function(e,t,n){"use strict";n.r(t);var o=n(0),r=(n(56),n(68),n(33),n(63),n(17),n(3)),l=Object(r.b)({name:"AdminNavComp",setup:function(){var e=Object(r.r)().state,t=Object(r.p)(),n=Object(r.a)((function(){return e.user})),l=Object(r.i)(n.value.data.role.isAdmin),c=Object(r.i)(n.value.data.role.isVendor),d=Object(r.i)(n.value.data.role.isDriver),v=Object(r.i)([{to:"/admin/users",label:"Users"},{to:"/admin/pages",label:"Pages"},{to:"/admin/posts",label:"Posts"}]),f=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l.value||(c.value?v.value=[{to:"/admin/products",label:"Products"},{to:"/admin/posts",label:"Posts"},{to:"/admin/shipping",label:"Shipping"},{to:"/admin/feedback",label:"Feedback"}]:d.value&&(v.value=[]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var p=t.value.path;return"/admin"!==p&&"/admin/"!==p&&(!p.includes("/edit")&&!p.includes("/users"))};return Object(r.f)((function(){m(),f()})),{canAdd:m,navOptions:v,getRoute:function(){return t.value.fullPath.includes("edit")?t.value.fullPath.replace(t.value.params.id,""):"".concat(t.value.fullPath,"/edit")}}}}),c=l,d=n(43),v=n(45),f=n.n(v),m=n(688),_=n(257),O=n(160),j=n(100),w=n(907),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.canAdd()?n("v-btn",{staticClass:"mr-1 elevation-0",attrs:{to:e.getRoute(),color:"secondary"}},[e._v("\n    + Add\n  ")]):e._e(),e._v(" "),n("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,r=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"primary",dark:"",elevation:"0"}},"v-btn",r,!1),o),[e._v("\n        Content\n      ")])]}}])},[e._v(" "),n("v-list",e._l(e.navOptions,(function(t,o){return n("v-list-item",{key:o,attrs:{to:t.to,nuxt:""}},[n("v-list-item-content",[n("v-list-item-title",[e._v("\n            "+e._s(t.label)+"\n          ")])],1)],1)})),1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{VBtn:m.a,VList:_.a,VListItem:O.a,VListItemContent:j.a,VListItemTitle:j.c,VMenu:w.a})},776:function(e,t,n){"use strict";var o={inserted:function(e,t,n){var o=t.value,r=t.options||{passive:!0};window.addEventListener("resize",o,r),e._onResize=Object(e._onResize),e._onResize[n.context._uid]={callback:o,options:r},t.modifiers&&t.modifiers.quiet||o()},unbind:function(e,t,n){var o;if(null!=(o=e._onResize)&&o[n.context._uid]){var r=e._onResize[n.context._uid],l=r.callback,c=r.options;window.removeEventListener("resize",l,c),delete e._onResize[n.context._uid]}}};t.a=o}}]);