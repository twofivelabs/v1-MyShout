(window.webpackJsonp=window.webpackJsonp||[]).push([[8,60,64,107],{764:function(e,t,n){"use strict";n.r(t);var r=n(175),c={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},o=n(35),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports},781:function(e,t,n){"use strict";n.r(t);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},c=n(35),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("p",{class:"text-"+e.align+" text-xl-body-1"},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},847:function(e,t,n){"use strict";n.r(t);var r=n(757),c=n(175),o=n(176),l=n(107),d=n(286),f=n(154),v=n(78),m=n(298),_=n(0),h=(n(16),n(5)),x=Object(h.b)({name:"UserActionsbtn",directives:{Touch:m.a},props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(h.l)().$system,n=Object(h.q)().dispatch,r=Object(h.i)(!1),c=Object(h.i)(!1),o=Object(h.i)(!1),l=Object(h.i)(),d=function(){var e=Object(_.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{r.value=!0,c.value=!0}catch(e){t.log({comp:"UserActionsbtn",msg:"showUserActions",val:e})}finally{r.value=!1}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(h.f)(Object(_.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("user/friends/getOne",{id:e.user.id});case 2:(r=t.sent)&&r.id&&(o.value=!0,l.value=r.status);case 4:case"end":return t.stop()}}),t)})))),{loading:r,showBottomSheet:c,isFriend:o,friendStatus:l,showUserActions:d,swipe:function(e){"Down"===e&&(c.value=!1)},isFriendFunc:function(e){o.value=e}}}}),y=x,j=n(35),component=Object(j.a)(y,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(c.a,{staticClass:" pa-3 rounded-lg",attrs:{color:"myshoutDarkGrey"},on:{click:e.showUserActions}},[e._v("\n    mdi-dots-vertical\n  ")]),e._v(" "),n(r.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n(v.a,{staticClass:"rounded-t-xl",attrs:{height:"50vh"}},[n("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:m.b,name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:e.$t("is_loading")}}):e._e(),e._v(" "),n("ElementH3",{attrs:{align:"center",text:e.$t("actions")}}),e._v(" "),n(d.a,[e.$route.fullPath.includes(e.user.id)?e._e():n(o.a,{staticClass:"borderButton rounded-lg mb-2",attrs:{to:"/users/user/"+e.user.id}},[n(f.a,[n(c.a,[e._v("mdi-account")])],1),e._v(" "),n(l.a,[n(l.c,{staticClass:"myshoutDarkGrey--text"},[e._v(e._s(e.$t("view_profile")))])],1)],1),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsSendamessagebtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsRequestsafecheckinbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsToggleemergencycontactbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend?n("UserActionsRemoveasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}}):e._e(),e._v(" "),e.isFriend?e._e():n("UserActionsAddasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}})],1)],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{GlobalSlidebar:n(430).default,ElementH3:n(426).default,UserActionsSendamessagebtn:n(864).default,UserActionsRequestsafecheckinbtn:n(868).default,UserActionsToggleemergencycontactbtn:n(869).default,UserActionsRemoveasfriendbtn:n(870).default,UserActionsAddasfriendbtn:n(871).default})},864:function(e,t,n){"use strict";n.r(t);var r=n(175),c=n(176),o=n(107),l=n(154),d=n(0),f=(n(16),n(4),n(44),n(58),n(5)),v=Object(f.b)({name:"UserActionsSendamessagebtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(f.l)().$system,n=Object(f.q)(),r=n.state,c=n.dispatch,o=Object(f.i)(!1),dialog=Object(f.i)(!1),l=Object(f.a)((function(){return r.user.data})),v=Object(f.p)(),m=Object(f.i)([]),_=function(){var t=Object(d.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("chats/search",{field:"owner",operator:"==",term:l.value.uid}).then((function(t){if(t){var n=!1;return t.some((function(t){if(2===t.participants.length&&t.participants.includes(l.value.uid)&&t.participants.includes(e.user.id))return n=t,t})),n}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),h=function(){var n=Object(d.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,o.value=!0,n.next=4,_();case 4:if(!(r=n.sent)||!r.id){n.next=9;break}return n.next=8,v.push("/chats/chat/".concat(r.id));case 8:return n.abrupt("return");case 9:return m.value.push(l.value.uid),m.value.push(e.user.id),n.next=13,c("chats/add",{owner:l.value.uid,participants:m.value}).then(function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===t){e.next=3;break}return e.next=3,v.push("/chats/chat/".concat(t.id));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:n.next=18;break;case 15:n.prev=15,n.t0=n.catch(0),t.log({comp:"UserActionsSendamessagebtn",msg:"startChat",val:n.t0});case 18:return n.prev=18,o.value=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})));return function(){return n.apply(this,arguments)}}();return{loading:o,dialog:dialog,startChat:h}}}),m=v,_=n(35),component=Object(_.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.startChat}},[e._t("default",(function(){return[n(c.a,{staticClass:"borderButton rounded-lg mb-2"},[n(l.a,[n(r.a,[e._v("mdi-message-text")])],1),e._v(" "),n(o.a,[n(o.c,[e._v(e._s(e.$t("chats.send_message")))])],1)],1)]}))],2)}),[],!1,null,null,null);t.default=component.exports},868:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),f=n(176),v=n(107),m=n(154),_=n(0),h=(n(16),n(5)),x=Object(h.b)({name:"UserActionsRequestsafecheckinbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(h.l)(),n=t.$system,r=t.$notify,c=t.i18n,o=Object(h.q)(),l=o.dispatch,d=o.state,f=Object(h.a)((function(){return d.user.data})),v=Object(h.a)((function(){return d.user.profile})),m=Object(h.i)(!1),x=Object(h.i)(!1),y=Object(h.i)(),dialog=Object(h.i)(!1),form=Object(h.i)({}),j=Object(h.i)(),O=function(){var t=Object(_.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,m.value=!0,t.next=4,l("user/checkins/add",{userId:e.user.id,requestedBy:f.value.uid}).then((function(e){!1!==e&&(dialog.value=!1,j.value=e.id,r.show({text:c.t("notify.success"),color:"green"}))}));case 4:return t.next=6,l("user/notifications/add",{uid:e.user.id,title:"Check-In",body:"You have been requested to check-in by @".concat(v.value.username,". Contact them by phone or text message."),goTo:"/",type:"checkIn",seen:!1,created_at:new Date,meta:{checkInId:j.value,requestedBy:f.value.uid}});case 6:t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),n.log({comp:"UserActionsRequestsafecheckinbtn",msg:"save",val:t.t0}),r.show({text:c.t("notify.error_try_again"),color:"red"});case 12:return t.prev=12,m.value=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,8,12,15]])})));return function(){return t.apply(this,arguments)}}();return{loading:m,chat:y,showBottomSheet:x,dialog:dialog,form:form,save:O}}}),y=x,j=n(35),component=Object(j.a)(y,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(f.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,[e._v("mdi-account-check")])],1),e._v(" "),n(v.a,[n(v.c,[e._v(e._s(e.$t("request_safe_check_in")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("request_safe_check_in")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("confirm_they_are_safe")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.save}},[e._v("\n        "+e._s(e.$t("btn.confirm_request"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},869:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),f=n(176),v=n(107),m=n(154),_=n(0),h=(n(16),n(5)),x=Object(h.b)({name:"UserActionsToggleemergencycontactbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(h.l)(),n=t.$notify,r=t.$system,c=t.i18n,o=Object(h.q)().dispatch,l=Object(h.i)(!1),dialog=Object(h.i)(!1),d=Object(h.i)(),f=function(){var t=Object(_.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l.value=!0,t.next=4,o("user/friends/getOne",{id:e.user.id}).then((function(e){!1!==e&&(d.value=e)}));case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),r.log({comp:"UserActionsToggleemergencycontactbtn",msg:"getFriendship",val:t.t0});case 9:return t.prev=9,l.value=!1,t.finish(9);case 12:case"end":return t.stop()}}),t,null,[[0,6,9,12]])})));return function(){return t.apply(this,arguments)}}(),v=function(){var e=Object(_.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o("user/friends/updateField",{id:d.value.id,isEmergency:!d.value.isEmergency});case 2:e.sent?(dialog.value=!1,n.show({text:c.t("notify.success"),color:"success"})):(n.show({text:c.t("notify.error_try_again"),color:"error"}),r.log({comp:"UserActionsToggleemergencycontactbtn",msg:"toggleEmergencyContact",val:"bad response"}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(h.f)((function(){f()})),{loading:l,dialog:dialog,friendship:d,toggleEmergencyContact:v}}}),y=x,j=n(35),component=Object(j.a)(y,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(f.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,{attrs:{color:e.friendship&&e.friendship.isEmergency?"myshoutRed":"myshoutGreen"}},[e._v("mdi-alert")])],1),e._v(" "),n(v.a,{style:"color: "+(e.friendship&&e.friendship.isEmergency?"var(--v-myshoutRed-base)":"var(--v-myshoutGreen-base)")+";"},[e.friendship&&e.friendship.isEmergency?n(v.c,[e._v(e._s(e.$t("remove_as_emergency_contact")))]):n(v.c,[e._v(e._s(e.$t("add_as_emergency_contact")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[e.friendship&&e.friendship.isEmergency?n("ElementH1",{attrs:{text:e.$t("remove_as_emergency_contact")}}):n("ElementH1",{attrs:{text:e.$t("add_as_emergency_contact")}}),e._v(" "),e.friendship&&e.friendship.isEmergency?n("ElementP",{attrs:{text:e.$t("no_longer_receive_alerts")}}):n("ElementP",{attrs:{text:e.$t("yes_longer_receive_alerts")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.toggleEmergencyContact}},[e._v("\n        "+e._s(e.$t("btn.confirm"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},870:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),f=n(176),v=n(107),m=n(154),_=n(0),h=(n(16),n(5)),x=Object(h.b)({name:"UserActionsRemoveasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,r=Object(h.l)(),c=r.$notify,o=r.i18n,l=Object(h.q)().dispatch,d=Object(h.p)(),f=Object(h.i)(!1),dialog=Object(h.i)(!1),v=function(){var t=Object(_.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l("user/friends/remove",e.user.id);case 2:if(!t.sent){t.next=11;break}return dialog.value=!1,t.next=7,d.push("/profile");case 7:c.show({text:o.t("notify.success"),color:"success"}),n("isFriend",!1),t.next=12;break;case 11:c.show({text:o.t("notify.error_try_again"),color:"error"});case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:f,dialog:dialog,removeFriendship:v}}}),y=x,j=n(35),component=Object(j.a)(y,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(f.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,{attrs:{color:"myshoutRed"}},[e._v("mdi-account-multiple-minus")])],1),e._v(" "),n(v.a,{staticStyle:{color:"var(--v-myshoutRed-base)"}},[n(v.c,[e._v(e._s(e.$t("remove_friend")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("remove_friend")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.confirm_remove_friend")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.removeFriendship}},[e._v("\n        "+e._s(e.$t("remove_friend"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},871:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),f=n(176),v=n(107),m=n(154),_=n(828),h=n(0),x=(n(19),n(16),n(5)),y=Object(x.b)({name:"UserActionsAddasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,r=Object(x.l)(),c=r.$notify,o=r.i18n,l=Object(x.q)(),d=l.dispatch,f=l.state,v=Object(x.p)(),m=Object(x.i)(!1),dialog=Object(x.i)(!1),_=Object(x.a)((function(){return f.user.profile})),y=Object(x.i)(),j=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!y.value){e.next=6;break}return e.next=3,d("user/search",{field:"securityPin",operator:"==",term:y.value,limit:1});case 3:if(!((t=e.sent).length>0)){e.next=6;break}return e.abrupt("return",t);case 6:return e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j();case 2:if(r=t.sent){t.next=6;break}return c.show({text:o.t("notify.pin_no_match"),color:"error"}),t.abrupt("return");case 6:if(e.user.id===r[0].id){t.next=8;break}return t.abrupt("return");case 8:return t.next=10,d("user/friends/add",{id:e.user.id,status:"pending"});case 10:if(!t.sent){t.next=22;break}return console.log("Add notification to: ",e.user.id),t.next=15,d("user/notifications/add",{uid:e.user.id,title:o.t("new_friend_request"),body:"@".concat(_.value.username," ").concat(o.t("requested_to_be_your_friend")),seen:!1,created_at:new Date,type:"friendRequest",meta:{requestedBy:_.value.id}});case 15:return dialog.value=!1,t.next=18,v.push("/profile");case 18:c.show({text:o.t("notify.success"),color:"success"}),n("isFriend",!0),t.next=23;break;case 22:c.show({text:o.t("notify.error_try_again"),color:"error"});case 23:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:m,dialog:dialog,pin:y,addFriendship:O}}}),j=y,O=n(35),component=Object(O.a)(j,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(f.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,[e._v("mdi-account-multiple-plus")])],1),e._v(" "),n(v.a,[n(v.c,[e._v(e._s(e.$t("chats.add_friend")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("chats.add_friend")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.enter_pin")}}),e._v(" "),n(_.a,{attrs:{type:"text",label:e.$t("form.pin"),autocomplete:"off",required:""},model:{value:e.pin,callback:function(t){e.pin=t},expression:"pin"}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.addFriendship}},[e._v("\n        "+e._s(e.$t("chats.add_friend"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})}}]);