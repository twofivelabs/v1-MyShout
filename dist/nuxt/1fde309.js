(window.webpackJsonp=window.webpackJsonp||[]).push([[161,64],{1133:function(t,e,n){"use strict";n.r(e);var r=n(1075),c=n(879),l=n(765),o=n(757),d=n(793),f=n(174),h=n(933),m=n(110),x=n(756),v=n(299),_=n(816),y=n(820),w=n(0),j=(n(16),n(5)),O=Object(j.b)({name:"UserLanguagepage",middleware:"authenticated",setup:function(){var t=Object(j.q)(),e=t.state,n=t.dispatch,r=Object(j.l)(),c=r.$config,l=r.$notify,o=r.i18n,d=r.$ttlStorage,f=Object(j.p)(),h=Object(j.a)((function(){return e.users.data})),m=Object(j.a)((function(){return e.users.profile})),x=Object(j.i)(!1),dialog=Object(j.i)(!1),v=function(){var t=Object(w.a)(regeneratorRuntime.mark((function t(code){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d.set("locale",code),t.next=3,o.setLocale(code);case 3:return t.next=5,o.setLocaleCookie(code);case 5:return t.next=7,n("user/updateField",{language:code});case 7:l.show({text:o.t("notify.success"),color:"green"}),f.push("/");case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(j.n)({title:"Language ".concat(c.appTitle),meta:[{hid:"description",name:"description",content:""}]}),{loading:x,dialog:dialog,user:h,changeLang:v,profile:m}},head:{}}),k=O,C=n(36),component=Object(C.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mobileNotch",attrs:{color:"white",app:"",fixed:"",top:""}},[n(c.a,[n("NuxtLink",{attrs:{to:"/settings"}},[n(f.a,{staticClass:"pr-2 py-3 pl-2",attrs:{color:"myshoutDarkGrey"}},[t._v("\n          mdi-arrow-left\n        ")])],1)],1),t._v(" "),n(y.b,{staticClass:"pl-0"},[n("div",{staticClass:"d-flex align-center"},[n("ElementH2",{attrs:{align:"left",text:t.$t("heading.change_language")}})],1)]),t._v(" "),n(_.a)],1),t._v(" "),n(d.a,{staticClass:"mt-3 mobileNotch px-3 "},[n(x.a,[n(o.a,{attrs:{cols:"12",sm:"5"}},[n(m.b,{attrs:{mandatory:""}},[n(x.a,t._l(t.$i18n.locales,(function(e){return n(o.a,{key:e.code,attrs:{cols:"6",md:"4"}},[n(h.b,{scopedSlots:t._u([{key:"default",fn:function(r){r.active;return[n(l.a,{staticClass:"d-flex align-center",attrs:{color:t.$i18n.localeProperties.code===e.code?"primary":"",height:"200",dark:""},on:{click:function(n){return t.changeLang(e.code)}}},[n(v.e,[n("div",{staticClass:"text-h2 flex-grow-1 text-center"},[t._v("\n                      "+t._s(e.local)+"\n                    ")])])],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ElementH2:n(797).default})},797:function(t,e,n){"use strict";n.r(e);var r=n(174),c={name:"ElementH2",props:{text:{type:String,default:""},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},l=n(36),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",{class:"text-"+t.align+"  text-h4 text-md-h3 text-lg-h2",staticStyle:{"letter-spacing":"0px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports}}]);