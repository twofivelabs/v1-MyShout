(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{932:function(e,t,n){"use strict";n.r(t);var r=n(1013),o=n(0),c=(n(14),n(66),n(5)),l=Object(c.b)({name:"MapLocationtoggle",props:{label:{type:String,default:function(){return"Location"}}},setup:function(){var e=Object(c.q)(),t=e.state,n=e.dispatch,r=Object(c.l)().$capacitor,l=Object(c.a)((function(){return t.user.data})),f=Object(c.a)((function(){return t.user.profile})),d=Object(c.i)(!1),m=Object(c.i)(!1);Object(c.f)((function(){Object(c.d)((function(){setTimeout((function(){m.value=f.value.permissions.location}),1e3)}))}));var v=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("user/updateField",{permissions:{location:!1}});case 2:return e.next=4,r.clearWatchPosition();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==m.value){e.next=5;break}return e.next=3,r.positionPermissions();case 3:e.next=7;break;case 5:return e.next=7,v();case 7:if(!m.value){e.next=10;break}return e.next=10,n("user/updateField",{permissions:{location:m.value}});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{loading:d,user:l,profile:f,locationPermissionGranted:m,toggleLocation:j}}}),f=l,d=n(37),component=Object(d.a)(f,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{attrs:{"hide-details":"true",label:e.label,"prepend-icon":"mdi-map-marker-account"},on:{click:e.toggleLocation},model:{value:e.locationPermissionGranted,callback:function(t){e.locationPermissionGranted=t},expression:"locationPermissionGranted"}})}),[],!1,null,null,null);t.default=component.exports}}]);