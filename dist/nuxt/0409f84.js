(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{1058:function(t,e,n){"use strict";n(966)},1059:function(t,e,n){var c=n(37)(!1);c.push([t.i,"\n.hideWithinNotch[data-v-4dca8628] {\n  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);\n}\n",""]),t.exports=c},1159:function(t,e,n){"use strict";n.r(e);var c=n(738),o=n(175),l=n(5),r=Object(l.b)({name:"UserLocationBtn",setup:function(){var t=Object(l.q)().state,e=Object(l.i)(null),n=Object(l.a)((function(){return t.user.profile})),c=Object(l.a)((function(){return t.user.gps}));return n.value.location&&n.value.location.city&&(e.value=n.value.location.city),Object(l.s)((function(){c.value.city?e.value=c.value.city:n.value.location.city&&(e.value=n.value.location.city)})),{city:e}}}),v=(n(1058),n(35)),component=Object(v.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.city?n(c.a,{staticClass:"pl-1 pr-2 grey--text darken-1",attrs:{small:"",text:"",to:"/profile"}},[n(o.a,[t._v("\n    mdi-google-maps\n  ")]),t._v(" "),t.$helper.hasDisplayNotch()?t._e():n("span",{staticClass:"hideWithinNotch"},[t._v(t._s(t.city))])],1):t._e()}),[],!1,null,"4dca8628",null);e.default=component.exports},966:function(t,e,n){var content=n(1059);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(38).default)("52122c8e",content,!0,{sourceMap:!1})}}]);