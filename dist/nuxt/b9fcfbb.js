(window.webpackJsonp=window.webpackJsonp||[]).push([[147],{1124:function(t,e,n){"use strict";n.r(e);var r=n(738),o=n(790),c=n(175),l=n(5),d=Object(l.b)({name:"OnboardingPage5",layout:"onboarding",middleware:"authenticated",setup:function(){var t=Object(l.l)().$config,e=Object(l.q)().state,n=Object(l.a)((function(){return e.user.profile})),r=Object(l.i)(!1);return Object(l.n)({title:"".concat(t.appTitle),meta:[{hid:"description",name:"description",content:"Discover ".concat(t.appTitle)}]}),{loading:r,profile:n}},head:{}}),h=n(35),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(o.a,{staticClass:"ma-0 pa-0 lightgray",attrs:{height:"100vh",fluid:""}},[n("div",{staticClass:"d-flex flex-column justify-space-between align-center",staticStyle:{height:"100vh"}},[n("div",{staticClass:"d-flex flex-column justify-space-around align-center",staticStyle:{width:"100vw",height:"23vh"}},[n("OnboardingCardheader",{staticClass:"gray--text mx-14",attrs:{h1:t.$t("onboarding.add_photo_heading")}})],1),t._v(" "),n("div",{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[200,0],opacity:[0,1],easing:"easeInOutQuad",duration:600,delay:600},expression:"{\n              translateY: [200, 0],\n              opacity: [0, 1],\n              easing: 'easeInOutQuad',\n              duration: 600,\n              delay:600\n            }"}],staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{width:"100vw","max-width":"700px",height:"77vh"}},[n("div",{staticClass:"text-center"},[n("h5",{staticClass:"text-h5 text-center mb-6"},[t._v(t._s(t.$t("onboarding.add_photo_sub")))]),t._v(" "),n("UserProfileavatar",{staticClass:"mt-5 mx-auto",attrs:{user:t.profile,size:120}}),t._v(" "),n("div",{staticClass:"text-center mt-15"},[n(r.a,{staticClass:"white--text",attrs:{loading:t.loading,color:"primary",fab:"",dark:"","x-large":"",type:"submit",to:"/onboarding/6"}},[n(c.a,[t._v("mdi-arrow-right")])],1)],1)],1)])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OnboardingCardheader:n(818).default,UserProfileavatar:n(922).default})},818:function(t,e,n){"use strict";n.r(e);var r=n(762),o=n(761),c=n(175),l=n(753),d=n(5),h=Object(d.b)({name:"OnboardingCardheader",props:{h1:{type:String,default:function(){return""}},h2:{type:String,default:function(){return""}},prependIcon:{type:String,default:null}},setup:function(){return{}}}),f=n(35),component=Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200,opacity:[0,100],easing:"easeInOutQuad"},expression:"{\n      translateY: [100, 0],\n      duration: 1200,\n      opacity: [0, 100],\n      easing: 'easeInOutQuad'\n    }"}],staticClass:"rounded-t-xl",staticStyle:{"box-shadow":"none !important"},attrs:{color:"transparent",height:""}},[n(l.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[n(o.b,{staticClass:"text-center"},[t.h1?n("h1",{staticClass:"display-3 font-weight-bold mb-1 gray--text"},[t.prependIcon?n(c.a,[t._v("\n          "+t._s(t.prependIcon)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.h1)+"\n      ")],1):t._e(),t._v(" "),t.h2?n("h2",{staticClass:"text-h3 gray--text"},[t._v(t._s(t.h2))]):t._e()])],1)],1)}),[],!1,null,null,null);e.default=component.exports},922:function(t,e,n){"use strict";n.r(e);var r=n(285),o=n(760),c=n(175),l=n(786),d=n(0),h=(n(16),n(52),n(5)),f=Object(h.b)({name:"UserProfileavatar",props:{size:{type:Number,default:function(){return 40}},color:{type:String,default:function(){return"black"}}},setup:function(){var t=Object(h.i)(!1),e=Object(h.q)(),n=e.getters,r=e.state,o=e.dispatch,c=Object(h.l)(),l=c.$capacitor,f=c.$db,v=c.$notify,m=c.$system,y=c.i18n,x=Object(h.a)((function(){return r.user.data})),_=Object(h.a)((function(){return n["user/isLoggedIn"]})),O=Object(h.a)((function(){return r.user.profile.initial})),w=Object(h.a)((function(){return r.user.profile.photoURL})),j=Object(h.a)((function(){return r.user.profile.isOnline.status})),C=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.value=!0,e.next=4,l.cameraTakePicture();case 4:return n=e.sent,e.next=7,f.upload({path:"/USERS/".concat(x.value.uid,"/profile.jpg"),data:n,base64:!0});case 7:return r=e.sent,e.next=10,o("user/updateField",{photoURL:r});case 10:e.sent?v.show({text:y.t("notify.success"),color:"success"}):v.show({text:y.t("notify.error_try_again"),color:"error"}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),m.log({comp:"UserProfileavatar",msg:"takePhoto",val:e.t0});case 17:return e.prev=17,t.value=!1,e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(){return e.apply(this,arguments)}}();return{isLoggedIn:_,loading:t,initial:O,photo:w,onlineStatus:j,takePhoto:C}}}),v=f,m=n(35),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"inline-block"},on:{click:t.takePhoto}},[n(o.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"6","offset-y":"6",color:"online"===t.onlineStatus?"myshoutGreen":"myshoutRed"}},[n(r.a,{staticClass:"rounded-lg",attrs:{color:t.color,size:t.size,rounded:""}},[t.loading?n(c.a,{attrs:{color:"white"}},[t._v("\n        mdi-autorenew mdi-spin\n      ")]):t._e(),t._v(" "),t.isLoggedIn?t.isLoggedIn&&t.photo?n(l.a,{attrs:{src:t.photo}}):t.isLoggedIn&&!t.loading?n("span",{staticClass:"white--text headline"},[t._v(t._s(t.initial))]):t._e():n(c.a,{attrs:{color:"white"}},[t._v("\n        mdi-account\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);