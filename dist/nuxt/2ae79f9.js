(window.webpackJsonp=window.webpackJsonp||[]).push([[11,71,75,126,127,128,129,130,131],{718:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return v}));var r=n(726),c=n(4),o=Object(c.j)("v-card__actions"),l=Object(c.j)("v-card__subtitle"),d=Object(c.j)("v-card__text"),v=Object(c.j)("v-card__title");r.a},724:function(e,t,n){"use strict";n.r(t);var r={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(43),o=n(45),l=n.n(o),d=n(159),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n("v-icon",[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports;l()(component,{VIcon:d.a})},734:function(e,t,n){"use strict";n.r(t);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},c=n(43),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("p",{class:"text-"+e.align+" text-xl-body-1"},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},812:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(3)),o=n(271),l=Object(c.b)({name:"UserActionsbtn",directives:{Touch:o.a},props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(c.m)().$system,n=Object(c.r)().dispatch,o=Object(c.i)(!1),l=Object(c.i)(!1),d=Object(c.i)(!1),v=Object(c.i)(),m=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{o.value=!0,l.value=!0}catch(e){t.log({comp:"UserActionsbtn",msg:"showUserActions",val:e})}finally{o.value=!1}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.f)(Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("user/friends/getOne",{id:e.user.id});case 2:(r=t.sent)&&r.id&&(d.value=!0,v.value=r.status);case 4:case"end":return t.stop()}}),t)})))),{loading:o,showBottomSheet:l,isFriend:d,friendStatus:v,showUserActions:m,swipe:function(e){"Down"===e&&(l.value=!1)},isFriendFunc:function(e){d.value=e}}}}),d=l,v=n(43),m=n(45),f=n.n(m),h=n(714),x=n(159),_=n(160),y=n(100),j=n(261),O=n(137),w=n(75),k=n(170),V=n.n(k),component=Object(v.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-icon",{staticClass:" pa-3 rounded-lg",attrs:{color:"myshoutDarkGrey"},on:{click:e.showUserActions}},[e._v("\n    mdi-dots-vertical\n  ")]),e._v(" "),n("v-bottom-sheet",{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n("v-sheet",{staticClass:"rounded-t-xl",attrs:{height:"50vh"}},[n("div",{staticClass:"ma-3"},[n("GlobalSlidebar",{directives:[{name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:"Loading..."}}):e._e(),e._v(" "),n("ElementH3",{attrs:{align:"center",text:"Actions"}}),e._v(" "),n("v-list-item-group",[e.$route.fullPath.includes(e.user.id)?e._e():n("v-list-item",{staticClass:"borderButton rounded-lg mb-2",attrs:{to:"/users/user/"+e.user.id}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-account")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"myshoutDarkGrey--text"},[e._v("View Profile")])],1)],1),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsSendamessagebtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsRequestsafecheckinbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsToggleemergencycontactbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend?n("UserActionsRemoveasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}}):e._e(),e._v(" "),e.isFriend?e._e():n("UserActionsAddasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}})],1)],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{GlobalSlidebar:n(381).default,ElementH3:n(380).default,UserActionsSendamessagebtn:n(827).default,UserActionsRequestsafecheckinbtn:n(831).default,UserActionsToggleemergencycontactbtn:n(832).default,UserActionsRemoveasfriendbtn:n(833).default,UserActionsAddasfriendbtn:n(834).default}),f()(component,{VBottomSheet:h.a,VIcon:x.a,VListItem:_.a,VListItemContent:y.a,VListItemGroup:j.a,VListItemIcon:O.a,VListItemTitle:y.c,VSheet:w.a}),V()(component,{Touch:o.b})},827:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(5),n(56),n(68),n(3)),o=Object(c.b)({name:"UserActionsSendamessagebtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(c.m)().$system,n=Object(c.r)(),o=n.state,l=n.dispatch,d=Object(c.i)(!1),dialog=Object(c.i)(!1),v=Object(c.a)((function(){return o.user.data})),m=Object(c.q)(),f=Object(c.i)([]),h=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l("chats/search",{field:"owner",operator:"==",term:v.value.uid}).then((function(t){if(t){var n=!1;return t.some((function(t){if(2===t.participants.length&&t.participants.includes(v.value.uid)&&t.participants.includes(e.user.id))return n=t,t})),n}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),x=function(){var n=Object(r.a)(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,d.value=!0,n.next=4,h();case 4:if(!(c=n.sent)||!c.id){n.next=9;break}return n.next=8,m.push("/chats/chat/".concat(c.id));case 8:return n.abrupt("return");case 9:return f.value.push(v.value.uid),f.value.push(e.user.id),n.next=13,l("chats/add",{owner:v.value.uid,participants:f.value}).then(function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===t){e.next=3;break}return e.next=3,m.push("/chats/chat/".concat(t.id));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:n.next=18;break;case 15:n.prev=15,n.t0=n.catch(0),t.log({comp:"UserActionsSendamessagebtn",msg:"startChat",val:n.t0});case 18:return n.prev=18,d.value=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})));return function(){return n.apply(this,arguments)}}();return{loading:d,dialog:dialog,startChat:x}}}),l=o,d=n(43),v=n(45),m=n.n(v),f=n(159),h=n(160),x=n(100),_=n(137),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.startChat}},[e._t("default",(function(){return[n("v-list-item",{staticClass:"borderButton rounded-lg mb-2"},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-message-text")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",[e._v("Send a message")])],1)],1)]}))],2)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VIcon:f.a,VListItem:h.a,VListItemContent:x.a,VListItemIcon:_.a,VListItemTitle:x.c})},831:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(3)),o=Object(c.b)({name:"UserActionsRequestsafecheckinbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(c.m)(),n=t.$system,o=t.$notify,l=Object(c.r)(),d=l.dispatch,v=l.state,m=Object(c.a)((function(){return v.user.data})),f=Object(c.a)((function(){return v.user.profile})),h=Object(c.i)(!1),x=Object(c.i)(!1),_=Object(c.i)(),dialog=Object(c.i)(!1),form=Object(c.i)({}),y=Object(c.i)(),j=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,h.value=!0,t.next=4,d("user/checkins/add",{userId:e.user.id,requestedBy:m.value.uid}).then((function(e){!1!==e&&(dialog.value=!1,y.value=e.id,o.show({text:"Successfully sent",color:"green"}))}));case 4:return t.next=6,d("user/notifications/add",{uid:e.user.id,title:"Check-In",body:"You have been requested to check-in by @".concat(f.value.username),goTo:"/",type:"checkIn",meta:{checkInId:y.value,requestedBy:m.value.uid}});case 6:t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),n.log({comp:"UserActionsRequestsafecheckinbtn",msg:"save",val:t.t0}),o.show({text:"Error sending request",color:"red"});case 12:return t.prev=12,h.value=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,8,12,15]])})));return function(){return t.apply(this,arguments)}}();return{loading:h,chat:_,showBottomSheet:x,dialog:dialog,form:form,save:j}}}),l=o,d=n(43),v=n(45),m=n.n(v),f=n(688),h=n(726),x=n(718),_=n(266),y=n(159),j=n(160),O=n(100),w=n(137),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("v-list-item",e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n("v-list-item-icon",[n("v-icon",[e._v("mdi-account-check")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",[e._v("Request safe check-in")])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:"Request safe check-in"}}),e._v(" "),n("ElementP",{attrs:{text:"We will send an alert to confirm they are safe."}}),e._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        Cancel\n      ")]),e._v(" "),n("v-btn",{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.save}},[e._v("\n        Confirm Request\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{ElementH1:n(724).default,ElementP:n(734).default}),m()(component,{VBtn:f.a,VCard:h.a,VCardActions:x.a,VDialog:_.a,VIcon:y.a,VListItem:j.a,VListItemContent:O.a,VListItemIcon:w.a,VListItemTitle:O.c})},832:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(3)),o=Object(c.b)({name:"UserActionsToggleemergencycontactbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(c.m)(),n=t.$notify,o=t.$system,l=Object(c.r)().dispatch,d=Object(c.i)(!1),dialog=Object(c.i)(!1),v=Object(c.i)(),m=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,d.value=!0,t.next=4,l("user/friends/getOne",{id:e.user.id}).then((function(e){!1!==e&&(v.value=e)}));case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),o.log({comp:"UserActionsToggleemergencycontactbtn",msg:"getFriendship",val:t.t0});case 9:return t.prev=9,d.value=!1,t.finish(9);case 12:case"end":return t.stop()}}),t,null,[[0,6,9,12]])})));return function(){return t.apply(this,arguments)}}(),f=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l("user/friends/updateField",{id:v.value.id,isEmergency:!v.value.isEmergency});case 2:e.sent?(dialog.value=!1,n.show({text:"Success",color:"success"})):(n.show({text:"Error, try again",color:"error"}),o.log({comp:"UserActionsToggleemergencycontactbtn",msg:"toggleEmergencyContact",val:"bad response"}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.f)((function(){m()})),{loading:d,dialog:dialog,friendship:v,toggleEmergencyContact:f}}}),l=o,d=n(43),v=n(45),m=n.n(v),f=n(688),h=n(726),x=n(718),_=n(266),y=n(159),j=n(160),O=n(100),w=n(137),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("v-list-item",e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n("v-list-item-icon",[n("v-icon",{attrs:{color:e.friendship&&e.friendship.isEmergency?"myshoutRed":"myshoutGreen"}},[e._v("mdi-alert")])],1),e._v(" "),n("v-list-item-content",{style:"color: "+(e.friendship&&e.friendship.isEmergency?"var(--v-myshoutRed-base)":"var(--v-myshoutGreen-base)")+";"},[e.friendship&&e.friendship.isEmergency?n("v-list-item-title",[e._v("Remove as emergency contact")]):n("v-list-item-title",[e._v("Add as emergency contact")])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",{staticClass:"rounded-xl pa-8"},[e.friendship&&e.friendship.isEmergency?n("ElementH1",{attrs:{text:"Remove as an emergency contact"}}):n("ElementH1",{attrs:{text:"Add as an emergency contact"}}),e._v(" "),e.friendship&&e.friendship.isEmergency?n("ElementP",{attrs:{text:"They will no longer receive alerts when you are in trouble."}}):n("ElementP",{attrs:{text:"They will receive alerts when you are in trouble."}}),e._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        Cancel\n      ")]),e._v(" "),n("v-btn",{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.toggleEmergencyContact}},[e._v("\n        Confirm\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{ElementH1:n(724).default,ElementP:n(734).default}),m()(component,{VBtn:f.a,VCard:h.a,VCardActions:x.a,VDialog:_.a,VIcon:y.a,VListItem:j.a,VListItemContent:O.a,VListItemIcon:w.a,VListItemTitle:O.c})},833:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(3)),o=Object(c.b)({name:"UserActionsRemoveasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,o=Object(c.m)().$notify,l=Object(c.r)().dispatch,d=Object(c.q)(),v=Object(c.i)(!1),dialog=Object(c.i)(!1),m=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l("user/friends/remove",e.user.id);case 2:if(!t.sent){t.next=11;break}return dialog.value=!1,t.next=7,d.push("/profile");case 7:o.show({text:"Success",color:"success"}),n("isFriend",!1),t.next=12;break;case 11:o.show({text:"Error, try again",color:"error"});case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:v,dialog:dialog,removeFriendship:m}}}),l=o,d=n(43),v=n(45),m=n.n(v),f=n(688),h=n(726),x=n(718),_=n(266),y=n(159),j=n(160),O=n(100),w=n(137),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("v-list-item",e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n("v-list-item-icon",[n("v-icon",{attrs:{color:"myshoutRed"}},[e._v("mdi-account-multiple-minus")])],1),e._v(" "),n("v-list-item-content",{staticStyle:{color:"var(--v-myshoutRed-base)"}},[n("v-list-item-title",[e._v("Remove as friend")])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:"Remove as friend"}}),e._v(" "),n("ElementP",{attrs:{text:"Please confirm you wish to remove as a friend."}}),e._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        Cancel\n      ")]),e._v(" "),n("v-btn",{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.removeFriendship}},[e._v("\n        Remove As Friend\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{ElementH1:n(724).default,ElementP:n(734).default}),m()(component,{VBtn:f.a,VCard:h.a,VCardActions:x.a,VDialog:_.a,VIcon:y.a,VListItem:j.a,VListItemContent:O.a,VListItemIcon:w.a,VListItemTitle:O.c})},834:function(e,t,n){"use strict";n.r(t);var r=n(0),c=(n(17),n(3)),o=Object(c.b)({name:"UserActionsAddasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,o=Object(c.m)().$notify,l=Object(c.r)(),d=l.dispatch,v=l.state,m=Object(c.q)(),f=Object(c.i)(!1),dialog=Object(c.i)(!1),h=Object(c.a)((function(){return v.user.profile})),x=Object(c.i)(),_=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.value){e.next=6;break}return e.next=3,d("user/search",{field:"securityPin",operator:"==",term:x.value,limit:1});case 3:if(!((t=e.sent).length>0)){e.next=6;break}return e.abrupt("return",t);case 6:return e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_();case 2:if(r=t.sent){t.next=6;break}return o.show({text:"This PIN does not match",color:"error"}),t.abrupt("return");case 6:if(e.user.id===r[0].id){t.next=8;break}return t.abrupt("return");case 8:return t.next=10,d("user/friends/add",{id:e.user.id,status:"pending"});case 10:if(!t.sent){t.next=22;break}return console.log("Add notification to: ",e.user.id),t.next=15,d("user/notifications/add",{uid:e.user.id,title:"New Friend Request",body:"@".concat(h.value.username," requested to be your friend."),type:"friendRequest",meta:{requestedBy:h.value.id}});case 15:return dialog.value=!1,t.next=18,m.push("/profile");case 18:o.show({text:"Success",color:"success"}),n("isFriend",!0),t.next=23;break;case 22:o.show({text:"Error, try again",color:"error"});case 23:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:f,dialog:dialog,pin:x,addFriendship:y}}}),l=o,d=n(43),v=n(45),m=n.n(v),f=n(688),h=n(726),x=n(718),_=n(266),y=n(159),j=n(160),O=n(100),w=n(137),k=n(800),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("v-list-item",e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n("v-list-item-icon",[n("v-icon",[e._v("mdi-account-multiple-plus")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",[e._v("Add friend")])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:"Add friend"}}),e._v(" "),n("ElementP",{attrs:{text:"Enter in your friend's PIN"}}),e._v(" "),n("v-text-field",{attrs:{type:"text",label:"PIN",autocomplete:"off",required:""},model:{value:e.pin,callback:function(t){e.pin=t},expression:"pin"}}),e._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        Cancel\n      ")]),e._v(" "),n("v-btn",{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.addFriendship}},[e._v("\n        Add Friend\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{ElementH1:n(724).default,ElementP:n(734).default}),m()(component,{VBtn:f.a,VCard:h.a,VCardActions:x.a,VDialog:_.a,VIcon:y.a,VListItem:j.a,VListItemContent:O.a,VListItemIcon:w.a,VListItemTitle:O.c,VTextField:k.a})}}]);