(window.webpackJsonp=window.webpackJsonp||[]).push([[128,71,75],{718:function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return d})),n.d(e,"d",(function(){return v}));var r=n(726),c=n(4),l=Object(c.j)("v-card__actions"),o=Object(c.j)("v-card__subtitle"),d=Object(c.j)("v-card__text"),v=Object(c.j)("v-card__title");r.a},724:function(t,e,n){"use strict";n.r(e);var r={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(43),l=n(45),o=n.n(l),d=n(159),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?n("v-icon",[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports;o()(component,{VIcon:d.a})},734:function(t,e,n){"use strict";n.r(e);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},c=n(43),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("p",{class:"text-"+t.align+" text-xl-body-1"},[t._v("\n  "+t._s(t.text)+"\n")])}),[],!1,null,null,null);e.default=component.exports},831:function(t,e,n){"use strict";n.r(e);var r=n(0),c=(n(17),n(3)),l=Object(c.b)({name:"UserActionsRequestsafecheckinbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(t){var e=Object(c.m)(),n=e.$system,l=e.$notify,o=Object(c.r)(),d=o.dispatch,v=o.state,f=Object(c.a)((function(){return v.user.data})),m=Object(c.a)((function(){return v.user.profile})),_=Object(c.i)(!1),h=Object(c.i)(!1),x=Object(c.i)(),dialog=Object(c.i)(!1),form=Object(c.i)({}),j=Object(c.i)(),y=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_.value=!0,e.next=4,d("user/checkins/add",{userId:t.user.id,requestedBy:f.value.uid}).then((function(t){!1!==t&&(dialog.value=!1,j.value=t.id,l.show({text:"Successfully sent",color:"green"}))}));case 4:return e.next=6,d("user/notifications/add",{uid:t.user.id,title:"Check-In",body:"You have been requested to check-in by @".concat(m.value.username),goTo:"/",type:"checkIn",meta:{checkInId:j.value,requestedBy:f.value.uid}});case 6:e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),n.log({comp:"UserActionsRequestsafecheckinbtn",msg:"save",val:e.t0}),l.show({text:"Error sending request",color:"red"});case 12:return e.prev=12,_.value=!1,e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,8,12,15]])})));return function(){return e.apply(this,arguments)}}();return{loading:_,chat:x,showBottomSheet:h,dialog:dialog,form:form,save:y}}}),o=l,d=n(43),v=n(45),f=n.n(v),m=n(688),_=n(726),h=n(718),x=n(266),j=n(159),y=n(160),O=n(100),k=n(137),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,c=e.attrs;return[n("v-list-item",t._g(t._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n("v-list-item-icon",[n("v-icon",[t._v("mdi-account-check")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("Request safe check-in")])],1)],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),n("v-card",{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:"Request safe check-in"}}),t._v(" "),n("ElementP",{attrs:{text:"We will send an alert to confirm they are safe."}}),t._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n        Cancel\n      ")]),t._v(" "),n("v-btn",{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:t.save}},[t._v("\n        Confirm Request\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{ElementH1:n(724).default,ElementP:n(734).default}),f()(component,{VBtn:m.a,VCard:_.a,VCardActions:h.a,VDialog:x.a,VIcon:j.a,VListItem:y.a,VListItemContent:O.a,VListItemIcon:k.a,VListItemTitle:O.c})}}]);