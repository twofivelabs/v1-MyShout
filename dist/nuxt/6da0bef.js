(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{1108:function(e,t,n){"use strict";n.r(t);var o=n(0),r=(n(14),n(32),n(98),n(66),n(5)),c=Object(r.b)({name:"NotificationsPush",setup:function(){var e=Object(r.q)(),t=e.dispatch,n=e.state,c=Object(r.l)(),l=c.$fire,f=c.$system,v=c.$notify,m=c.$capacitor,d=c.$ttlStorage,h=Object(r.a)((function(){return n.user.profile})),k=Object(r.i)(!1),x=Object(r.i)(!1),O=Object(r.i)(),T=Object(r.i)(!1),j="ontouchstart"in document.documentElement&&navigator.userAgent.match(/Mobi/),w=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!Notification){e.next=8;break}return e.next=4,Notification.requestPermission();case 4:t=e.sent,x.value="granted"===t,e.next=12;break;case 8:if(!j){e.next=12;break}return e.next=11,m.pushNotificationsRequestAndRegisterPermissions();case 11:x.value=e.sent;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),f.log({comp:"NotificationsPush",msg:"requestPermission",val:e.t0});case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),M=function(){console.log("STICKY: startOnMessageListener");try{l.messaging&&(console.log("STICKY: Start onMessage"),l.messaging.onBackgroundMessage((function(e){console.log("STICKY: onBackgroundMessage",e)})),l.messaging.onMessage((function(e){console.log("STICKY: We have a message",e);var t={title:e.notification.title,text:e.notification.body,color:e.notification.body||"blue"};e.data&&e.data.goTo&&(t.goTo=e.data.goTo),v.show(t),f.log({comp:"ProductFavouriteBtn",msg:"Message received",val:e})})))}catch(e){f.log({comp:"startOnMessageListener",msg:"onMessage",val:e.message})}},R=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(T.value=!0,h.value.notificationWebToken?O.value=h.value.notificationWebToken:O.value=d.get("notificationWebToken"),e.prev=2,!l.messaging){e.next=8;break}return e.next=6,l.messaging.getToken();case 6:O.value=e.sent,d.set("notificationWebToken",O.value);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),f.log({comp:"NotificationPush",msg:"getIdToken",val:e.t0}),O.value=null;case 14:return e.prev=14,T.value=!1,e.finish(14);case 17:if(!O.value){e.next=20;break}return e.next=20,t("user/updateField",{notificationWebToken:O.value});case 20:case"end":return e.stop()}}),e,null,[[2,10,14,17]])})));return function(){return e.apply(this,arguments)}}();Object(r.f)((function(){setTimeout(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M(),void(k.value=!0);case 2:return e.next=4,w();case 4:return e.next=6,R();case 6:case"end":return e.stop()}}),e)}))),2e3)}))}}),l=c,f=n(37),component=Object(f.a)(l,(function(){var e=this.$createElement;return(this._self._c||e)("div")}),[],!1,null,null,null);t.default=component.exports}}]);