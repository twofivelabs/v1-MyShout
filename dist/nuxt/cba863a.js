(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{1087:function(t,e,n){"use strict";n.r(e);var r=n(692),o=n(752),c=n(164),l=n(0),d=(n(14),n(65),n(5)),h=n(964),f=Object(d.b)({name:"OnboardingPage8",layout:"onboarding",setup:function(){var t=Object(d.l)(),e=t.$config,n=t.$capacitor,r=t.i18n,o=Object(d.q)().state,c=Object(d.a)((function(){return o.user.profile})),f=Object(d.i)(!1),v=Object(d.p)();return Object(d.n)({title:"".concat(e.appTitle),meta:[{hid:"description",name:"description",content:"Discover ".concat(e.appTitle)}]}),{loading:f,profile:c,goNext:function(){f.value=!0,setTimeout(Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.a.requestPermissions();case 3:return t.next=5,h.a.schedule({notifications:[{title:r.t("notifications.welcome_title"),body:r.t("notifications.welcome_body"),id:1}]});case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("STICKY: local notifications issue",t.t0);case 10:return t.prev=10,t.next=13,n.pushNotificationsListeners();case 13:return t.next=15,n.pushNotificationsGetToken();case 15:return t.next=17,n.pushNotificationsListeners();case 17:return console.log("STICKY: NOTIFICATIONS > Mobile > True"),t.abrupt("return",!0);case 21:t.prev=21,t.t1=t.catch(10),console.log("STICKY: 8-CheckPermissions: ",t.t1);case 24:return t.prev=24,f.value=!1,v.push("/"),t.finish(24);case 28:case"end":return t.stop()}}),t,null,[[0,7],[10,21,24,28]])}))),1500)}}},head:{}}),v=n(37),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(o.a,{staticClass:"ma-0 pa-0 lightgray",attrs:{height:"100vh",fluid:""}},[n("div",{staticClass:"d-flex flex-column justify-space-between align-center",staticStyle:{height:"100vh"}},[n("div",{staticClass:"d-flex flex-column justify-space-around align-center",staticStyle:{width:"100vw",height:"23vh"}},[n("OnboardingCardheader",{staticClass:"gray--text mx-14",attrs:{h1:t.$t("onboarding.thank_you_heading")}})],1),t._v(" "),n("div",{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[200,0],opacity:[0,1],easing:"easeInOutQuad",duration:600,delay:600},expression:"{\n              translateY: [200, 0],\n              opacity: [0, 1],\n              easing: 'easeInOutQuad',\n              duration: 600,\n              delay:600\n            }"}],staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{width:"100vw","max-width":"700px",height:"77vh"}},[n("div",{staticClass:"text-center d-flex flex-column justify-space-around"},[n("h5",{staticClass:"text-h5 text-center mb-6"},[t._v(t._s(t.$t("onboarding.thank_you_sub")))]),t._v(" "),n("div",{staticClass:"text-center mt-15"},[n(r.a,{staticClass:"white--text",attrs:{loading:t.loading,color:"primary",fab:"",dark:"","x-large":"",type:"submit"},on:{click:t.goNext}},[n(c.a,[t._v("mdi-arrow-right")])],1)],1)])])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OnboardingCardheader:n(780).default})},780:function(t,e,n){"use strict";n.r(e);var r=n(724),o=n(723),c=n(164),l=n(715),d=n(5),h=Object(d.b)({name:"OnboardingCardheader",props:{h1:{type:String,default:function(){return""}},h2:{type:String,default:function(){return""}},prependIcon:{type:String,default:null}},setup:function(){return{}}}),f=n(37),component=Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200,opacity:[0,100],easing:"easeInOutQuad"},expression:"{\n      translateY: [100, 0],\n      duration: 1200,\n      opacity: [0, 100],\n      easing: 'easeInOutQuad'\n    }"}],staticClass:"rounded-t-xl",staticStyle:{"box-shadow":"none !important"},attrs:{color:"transparent",height:""}},[n(l.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[n(o.b,{staticClass:"text-center"},[t.h1?n("h1",{staticClass:"display-3 font-weight-bold mb-1 gray--text"},[t.prependIcon?n(c.a,[t._v("\n          "+t._s(t.prependIcon)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.h1)+"\n      ")],1):t._e(),t._v(" "),t.h2?n("h2",{staticClass:"text-h3 gray--text"},[t._v(t._s(t.h2))]):t._e()])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);