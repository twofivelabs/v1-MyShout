(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{945:function(e,t,r){"use strict";r.r(t);var n=r(1028),o=(r(66),r(5)),c=Object(o.b)({name:"UserDarkmode",setup:function(){var e=Object(o.q)().state,t=Object(o.l)(),r=t.$vuetify,n=t.$ttlStorage,c=Object(o.a)((function(){return e.user.data})),l=Object(o.a)((function(){return e.user.profile}));return{loading:Object(o.i)(!1),user:c,profile:l,toggleDarkMode:function(){setTimeout((function(){r.theme.dark=!!r.theme.dark,n.set("darkMode",r.theme.dark)}),0)}}}}),l=r(37),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.$config.useDarkMode?r(n.a,{attrs:{"hide-details":"true",label:"Dark Mode","prepend-icon":"mdi-brightness-4"},on:{click:e.toggleDarkMode},model:{value:e.$vuetify.theme.dark,callback:function(t){e.$set(e.$vuetify.theme,"dark",t)},expression:"$vuetify.theme.dark"}}):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);