(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{1148:function(e,t,n){"use strict";n.r(t);var r=n(0),o=(n(19),n(16),n(5)),c=Object(o.b)({name:"ElementTravelTime",props:{origin:{type:String,default:function(){return null}},destination:{type:String,default:function(){return null}}},setup:function(e){var t=Object(o.q)(),n=t.state,c=t.dispatch,l=Object(o.l)(),v=l.$helper,m=l.$system,d=Object(o.a)((function(){return n.user.data})),f=Object(o.a)((function(){return n.user.profile})),w=Object(o.i)(!1),T=Object(o.i)(""),h=Object(o.i)("");Object(o.f)(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h.value=x(),!h.value||!e.destination){t.next=7;break}return t.next=4,j();case 4:if(t.t0=t.sent,!1!==t.t0){t.next=7;break}O();case 7:case"end":return t.stop()}}),t)}))));var x=function(){return origin.value?origin.value:"".concat(f.value.location.address_1," ").concat(f.value.location.city," ").concat(f.value.location.province," ").concat(f.value.location.postal)},O=function(){try{if(h.value){var t=new window.google.maps.DistanceMatrixService,n={origins:[h.value],destinations:[e.destination],travelMode:window.google.maps.TravelMode.DRIVING,unitSystem:window.google.maps.UnitSystem.METRIC,avoidHighways:!1,avoidTolls:!1};t.getDistanceMatrix(n).then((function(e){T.value=e.rows[0].elements[0].duration.text,y(T.value)}))}}catch(e){m.log({comp:"ElementTravelTime",msg:"getTime",val:e})}},j=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c("admin/getOne",{adminPath:"UI/TravelTime",id:v.slugify("".concat(x(),"-").concat(e.destination))});case 3:if(!1!==(n=t.sent)){t.next=8;break}return t.abrupt("return",n);case 8:T.value=n.time;case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),m.log({comp:"ElementTravelTime",msg:"getLocalTime",val:t.t0});case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}(),y=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(time){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c("admin/add",{adminPath:"UI/TravelTime",data:{title:"".concat(x(),"-").concat(e.destination),time:time}});case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),m.log({comp:"ElementTravelTime",msg:"addLocalTime",val:t.t0});case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}();return{user:d,profile:f,loading:w,duration:T}}}),l=c,v=n(35),component=Object(v.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.duration?n("div",{staticClass:"duration caption"},[e._v("\n  Travel: "+e._s(e.duration)+"\n")]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);