(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{1084:function(t,e,n){"use strict";n.r(e);var r=n(693),l=n(753),o=n(163),c=n(5),d=Object(c.b)({name:"OnboardingPage8",layout:"onboarding",setup:function(){var t=Object(c.l)().$config,e=Object(c.q)().state,n=Object(c.a)((function(){return e.user.profile})),r=Object(c.i)(!1);return Object(c.n)({title:"".concat(t.appTitle),meta:[{hid:"description",name:"description",content:"Discover ".concat(t.appTitle)}]}),{loading:r,profile:n}},head:{}}),h=n(37),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(l.a,{staticClass:"ma-0 pa-0 lightgray",attrs:{height:"100vh",fluid:""}},[n("div",{staticClass:"d-flex flex-column justify-space-between align-center",staticStyle:{height:"100vh"}},[n("div",{staticClass:"d-flex flex-column justify-space-around align-center",staticStyle:{width:"100vw",height:"23vh"}},[n("OnboardingCardheader",{staticClass:"gray--text mx-14",attrs:{h1:t.$t("onboarding.thank_you_heading")}})],1),t._v(" "),n("div",{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[200,0],opacity:[0,1],easing:"easeOutExpo",duration:900,delay:900},expression:"{\n              translateY: [200, 0],\n              opacity: [0, 1],\n              easing: 'easeOutExpo',\n              duration: 900,\n              delay:900\n            }"}],staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{width:"100vw","max-width":"700px",height:"77vh"}},[n("div",{staticClass:"text-center d-flex flex-column justify-space-around"},[n("h5",{staticClass:"text-h5 text-center mb-6"},[t._v(t._s(t.$t("onboarding.thank_you_sub")))]),t._v(" "),n("div",{staticClass:"text-center mt-15"},[n(r.a,{staticClass:"white--text",attrs:{loading:t.loading,color:"primary",fab:"",dark:"","x-large":"",type:"submit",to:"/"}},[n(o.a,[t._v("mdi-arrow-right")])],1)],1)])])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OnboardingCardheader:n(781).default})},781:function(t,e,n){"use strict";n.r(e);var r=n(725),l=n(724),o=n(163),c=n(716),d=n(5),h=Object(d.b)({name:"OnboardingCardheader",props:{h1:{type:String,default:function(){return""}},h2:{type:String,default:function(){return""}},prependIcon:{type:String,default:null}},setup:function(){return{}}}),f=n(37),component=Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200},expression:"{\n      translateY: [100, 0],\n      duration: 1200\n    }"}],staticClass:"rounded-t-xl",staticStyle:{"box-shadow":"none !important"},attrs:{color:"transparent",height:""}},[n(c.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[n(l.b,{staticClass:"text-center"},[t.h1?n("h1",{staticClass:"display-3 font-weight-bold mb-1 gray--text"},[t.prependIcon?n(o.a,[t._v("\n          "+t._s(t.prependIcon)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.h1)+"\n      ")],1):t._e(),t._v(" "),t.h2?n("h2",{staticClass:"text-h3 gray--text"},[t._v(t._s(t.h2))]):t._e()])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);