(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{871:function(e,n,t){"use strict";t.r(n);var r=t(693),o=t(163),c=t(0),l=(t(14),t(5)),f=Object(l.b)({name:"GlobalSocialLogin",setup:function(){var e=Object(l.l)(),n=e.$notify,t=e.$fire,r=e.$fireModule,o=e.$system,f=e.i18n,v=Object(l.p)(),h=Object(l.i)(null),m=function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,h.value=new r.auth.GoogleAuthProvider,e.next=4,d();case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),o.log({comp:"GlobalSocialLogin",msg:"Login with Google",val:e.t0}),n.show({text:f.t("notify.error_try_again"),color:"error"});case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h.value=new r.auth.OAuthProvider("apple.com"),h.value.addScope("email"),h.value.addScope("name"),e.next=5,d();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.auth.signInWithPopup(h.value).then(Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.analytics.logEvent("login"),n.show({text:f.t("notify.success")}),e.next=4,v.push("/");case 4:case"end":return e.stop()}}),e)})))).catch((function(e){o.log({comp:"GlobalSocialLogin",msg:"Login with popup",val:e}),n.show({text:f.t("notify.error_try_again"),color:"error"})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{googleSignIn:m,appleSignIn:w,loginWithPopUp:d}}}),v=f,h=t(37),component=Object(h.a)(v,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.$config.useSocialLogin?t("div",[t(r.a,{attrs:{outlined:"",fab:"",elevation:"0"},on:{click:e.googleSignIn}},[t(o.a,[e._v("mdi-google")])],1),e._v(" "),t(r.a,{attrs:{outlined:"",fab:"",elevation:"0"},on:{click:e.appleSignIn}},[t(o.a,[e._v("mdi-apple")])],1)],1):e._e()}),[],!1,null,null,null);n.default=component.exports}}]);