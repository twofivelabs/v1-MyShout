(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{950:function(e,t,n){"use strict";n.r(t);var r=n(1033),o=n(0),c=(n(14),n(65),n(5)),l=Object(c.b)({name:"NotificationsToggle",props:{label:{type:String,default:function(){return"Notifications"}}},setup:function(){var e=Object(c.q)(),t=e.state,n=e.dispatch,r=Object(c.l)(),l=r.$notify,f=r.$system,v=r.$capacitor,m=r.$fire,d=Object(c.a)((function(){return t.user.data})),x=Object(c.a)((function(){return t.user.profile})),k=Object(c.i)(!1),w=Object(c.i)(null),h=Object(c.i)(null),j=Object(c.i)(!1),O=Object(c.i)(!1);Object(c.f)(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.device();case 2:h.value=e.sent,h.value&&h.value.platform&&("web"===h.value.platform||void 0===h.value.platform||null===h.value.platform)&&(j.value=!0),Object(c.d)((function(){setTimeout((function(){x.value.permissions.notifications&&(O.value=!0)}),1e3)}));case 5:case"end":return e.stop()}}),e)}))));var R=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("user/updateField",{permissions:{notifications:!1}});case 2:if(j.value){e.next=5;break}return e.next=5,v.pushNotificationsRemoveListeners();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==O.value){e.next=12;break}if(!j.value){e.next=7;break}return e.next=4,y();case 4:w.value=x.value.notificationWebToken,e.next=10;break;case 7:return e.next=9,v.pushNotificationsRequestAndRegisterPermissions();case 9:w.value=x.value.notificationDeviceToken;case 10:e.next=14;break;case 12:return e.next=14,R();case 14:if(!O.value){e.next=17;break}return e.next=17,n("user/updateField",{permissions:{notifications:O.value}});case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,window.Notification){e.next=5;break}l.show({text:"Notifications not supported!",color:"error"}),e.next=14;break;case 5:return e.next=7,Notification.requestPermission();case 7:if(t=e.sent,O.value="granted"===t,!m.messaging){e.next=12;break}return e.next=12,m.messaging.getToken();case 12:return e.next=14,n("user/updateField",{permissions:{notifications:"granted"===t}});case 14:e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),l.show({text:"Error with your notifications.",color:"error"}),f.log({comp:"UserToggleSettings",msg:"requestWebPermissions",val:e.t0});case 20:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();return{loading:k,user:d,token:w,profile:x,notificationPermissionGranted:O,toggleNotifications:N}}}),f=l,v=n(37),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{attrs:{"hide-details":"true",label:e.label,"prepend-icon":"mdi-bell"},on:{click:e.toggleNotifications},model:{value:e.notificationPermissionGranted,callback:function(t){e.notificationPermissionGranted=t},expression:"notificationPermissionGranted"}})}),[],!1,null,null,null);t.default=component.exports}}]);