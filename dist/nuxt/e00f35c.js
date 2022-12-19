(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{1082:function(t,e,n){"use strict";n.r(e);var r=n(693),o=n(753),c=n(163),l=n(0),d=(n(64),n(14),n(5)),h=n(93),m=Object(d.b)({name:"OnboardingPage6",layout:"onboarding",middleware:"authenticated",setup:function(){var t=Object(d.l)(),e=t.$config,n=t.$capacitor,r=Object(d.q)().state,o=Object(d.a)((function(){return r.user.profile})),c=Object(d.i)(!1),m=Object(d.i)(!1);return Object(d.f)((function(){h.a.checkPermissions().then(function(){var t=Object(l.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"granted"===e.location&&(m.value=!0);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),setTimeout((function(){n.positionPermissions()}),1500)})),Object(d.n)({title:"".concat(e.appTitle),meta:[{hid:"description",name:"description",content:"Discover ".concat(e.appTitle)}]}),{loading:c,profile:o,hasPermission:m}},head:{}}),v=m,f=n(37),component=Object(f.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(o.a,{staticClass:"ma-0 pa-0 lightgray",attrs:{height:"100vh",fluid:""}},[n("div",{staticClass:"d-flex flex-column justify-space-between align-center",staticStyle:{height:"100vh"}},[n("div",{staticClass:"d-flex flex-column justify-space-around align-center",staticStyle:{width:"100vw",height:"23vh"}},[n("OnboardingCardheader",{staticClass:"gray--text mx-14",attrs:{prependIcon:"mdi-google-maps",h1:t.$t("onboarding.enable_location_permissions_heading")}})],1),t._v(" "),n("div",{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[200,0],opacity:[0,1],easing:"easeOutExpo",duration:900,delay:900},expression:"{\n              translateY: [200, 0],\n              opacity: [0, 1],\n              easing: 'easeOutExpo',\n              duration: 900,\n              delay:900\n            }"}],staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{width:"100vw","max-width":"700px",height:"77vh"}},[n("div",{staticClass:"text-center"},[n("h5",{staticClass:"text-h5 text-center mb-6"},[t._v("\n          "+t._s(t.$t("onboarding.enable_location_permissions_sub"))+"\n        ")]),t._v(" "),t.hasPermission?n(c.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200},expression:"{\n              translateY: [100, 0],\n              duration: 1200\n            }"}],staticClass:"mt-7",attrs:{color:"green",size:"120"}},[t._v("\n          mdi-checkbox-marked-circle-outline\n        ")]):t._e(),t._v(" "),n("div",{staticClass:"text-center mt-15"},[n(r.a,{staticClass:"white--text",attrs:{loading:t.loading,color:"primary",fab:"",dark:"","x-large":"",type:"submit",to:"/onboarding/7"}},[n(c.a,[t._v("mdi-arrow-right")])],1)],1)],1)])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OnboardingCardheader:n(781).default})},781:function(t,e,n){"use strict";n.r(e);var r=n(725),o=n(724),c=n(163),l=n(716),d=n(5),h=Object(d.b)({name:"OnboardingCardheader",props:{h1:{type:String,default:function(){return""}},h2:{type:String,default:function(){return""}},prependIcon:{type:String,default:null}},setup:function(){return{}}}),m=n(37),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200},expression:"{\n      translateY: [100, 0],\n      duration: 1200\n    }"}],staticClass:"rounded-t-xl",staticStyle:{"box-shadow":"none !important"},attrs:{color:"transparent",height:""}},[n(l.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[n(o.b,{staticClass:"text-center"},[t.h1?n("h1",{staticClass:"display-3 font-weight-bold mb-1 gray--text"},[t.prependIcon?n(c.a,[t._v("\n          "+t._s(t.prependIcon)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.h1)+"\n      ")],1):t._e(),t._v(" "),t.h2?n("h2",{staticClass:"text-h3 gray--text"},[t._v(t._s(t.h2))]):t._e()])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);