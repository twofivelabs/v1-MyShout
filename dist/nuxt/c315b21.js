(window.webpackJsonp=window.webpackJsonp||[]).push([[165,8,60,64,78,107],{1050:function(e,t,n){"use strict";n(965)},1051:function(e,t,n){var r=n(37)(!1);r.push([e.i,"\n.v-tab[data-v-68b82c33] {\n  font-weight: 600;\n}\n",""]),e.exports=r},1140:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(846),o=n(754),l=n(790),d=n(175),v=n(753),f=n(759),m=n(957),h=n(958),_=n(993),y=n(902),x=n(0),O=(n(19),n(29),n(54),n(39),n(16),n(57)),w=n.n(O),j=n(5),k=Object(j.b)({name:"PageUsersId",middleware:"authenticated",watch:{"$route.query":"$fetch"},setup:function(){var e=Object(j.q)(),t=e.state,n=e.dispatch,r=Object(j.n)(),title=r.title,meta=r.meta,c=Object(j.l)(),o=c.$config,l=c.$system,d=c.error,v=Object(j.o)(),f=Object(j.i)(!0),m=Object(j.i)(!1),h=Object(j.i)(0),_=Object(j.i)(w.a.cloneDeep(t.user.one)),y=Object(j.i)(!1),O=Object(j.i)(!1),k=Object(j.a)((function(){return t.user.data})),C=Object(j.i)([]),$=Object(j.i)([]);Object(j.m)(Object(x.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A();case 2:case"end":return e.stop()}}),e)}))));var A=function(){var e=Object(x.a)(regeneratorRuntime.mark((function e(){var t,r,c,m,h,x,j;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f.value=!0,e.prev=1,e.next=4,n("user/getOne",null===(t=v.value)||void 0===t||null===(t=t.params)||void 0===t?void 0:t.id).then((function(e){!1!==e&&(_.value=w.a.cloneDeep(e))})).catch((function(e){l.log({comp:"PageUsersId",msg:"user/getOne",val:e})}));case 4:return e.next=6,n("user/friends/getMyAccess",{userId:null===(r=k.value)||void 0===r?void 0:r.uid,id:null===(c=v.value)||void 0===c||null===(c=c.params)||void 0===c?void 0:c.id}).then((function(e){!1!==e&&(O.value=e)})).catch((function(e){l.log({comp:"PageUsersId",msg:"user/friends/getMyAccess",val:e})}));case 6:return e.next=8,n("user/friends/getAccess",{userId:null===(m=k.value)||void 0===m?void 0:m.uid,id:null===(h=v.value)||void 0===h||null===(h=h.params)||void 0===h?void 0:h.id}).then((function(e){!1!==e&&(y.value=e)})).catch((function(e){l.log({comp:"PageUsersId",msg:"user/friends/getAccess",val:e})}));case 8:_.value&&(title.value="".concat(null===(x=_.value)||void 0===x?void 0:x.username," by ").concat(o.appTitle),null!==(j=_.value)&&void 0!==j&&j.username&&(meta.value[0]={hid:"description",name:"description",content:_.value.username.replace(/^(.{155}[^\s]*).*/,"$1")})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),d({statusCode:404});case 14:return e.prev=14,f.value=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})));return function(){return e.apply(this,arguments)}}();return Object(j.f)((function(){m.value=!0})),Object(j.r)(v,(function(e){"users-user-id"===e.name&&A()})),{loading:f,activeTab:h,publicUser:_,products:C,posts:$,hasMounted:m,friendshipAccess:y,myFriendshipAccess:O}},head:{}}),C=k,$=(n(1050),n(35)),component=Object($.a)(C,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{staticClass:"pt-8 pl-0 pr-0"},[n(r.a,{staticClass:"mt-2 mx-3",attrs:{title:e.$t("btn.back"),small:"",fab:"",text:""},on:{click:function(t){return e.$router.go(-1)}}},[n(d.a,[e._v("mdi-arrow-left")])],1),e._v(" "),e.loading||!e.hasMounted?n("div",[n(v.a,{staticClass:"px-3"},[n(o.a,{attrs:{cols:"12",md:"4",sm:"12"}},[n(f.a,{attrs:{type:"image"}})],1),e._v(" "),n(o.a,{attrs:{cols:"12",md:"8",sm:"12"}},[n(f.a,{attrs:{type:"heading"}}),e._v(" "),n(f.a,{staticClass:"mt-2",attrs:{type:"list-item-three-line"}})],1)],1)],1):!e.loading&&e.publicUser?n("div",[n("div",{staticClass:"text-center"},[n("UserAvatar",{attrs:{user:e.publicUser,size:120}}),e._v(" "),e.publicUser.username?n("ElementH1",{attrs:{text:"@"+e.publicUser.username}}):e._e(),e._v(" "),"approved"===e.myFriendshipAccess.status?n("span",{staticClass:"d-flex justify-center "},[e.publicUser.location.country?n("ElementH4",{staticClass:"gray--text",attrs:{text:e.publicUser.location.city+" "+e.publicUser.location.country}}):e._e()],1):e._e(),e._v(" "),n("div",{staticClass:"d-flex justify-center my-6"},["approved"===e.myFriendshipAccess.status?n("UserActionsSendamessagebtn",{attrs:{user:e.publicUser}},[n(r.a,{staticClass:"elevation-0 rounded-lg white--text mr-2",attrs:{color:"myshoutGreen",large:"",rounded:""}},[e._v("\n              "+e._s(e.$t("chats.send_message"))+"\n            ")])],1):e._e(),e._v(" "),n("UserActionsbtn",{attrs:{user:e.publicUser}})],1),e._v(" "),"approved"!==e.myFriendshipAccess.status?n("div",{staticClass:"mt-6"},[e.myFriendshipAccess.status?n(c.a,{attrs:{title:e.myFriendshipAccess.status,color:"myshoutOrange"},on:{click:function(t){return e.$fetch()}}},[n(d.a,{},[e._v("mdi-update")]),e._v("\n            "+e._s(e.$t("friendship_is"))+" "+e._s(e.myFriendshipAccess.status))],1):n("ElementH4",{attrs:{align:"center",text:e.$t("permission.no_user_profile")}})],1):e._e()],1),e._v(" "),"approved"===e.myFriendshipAccess.status?n(_.a,{staticClass:"mb-12 pb-12",attrs:{"background-color":"transparent",grow:""},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[n(m.a,[e._v("\n              "+e._s(e.$t("location"))+"\n            ")]),e._v(" "),n(m.a,[e._v("\n              "+e._s(e.$t("alerts"))+"\n            ")]),e._v(" "),n(y.a,{model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[n(h.a,[0===e.activeTab?n("div",[e.friendshipAccess.isEmergency||e.publicUser.permissions.shareLocationWithFriends?n("MapGmbasic",{attrs:{lat:e.publicUser.gps.lat,lng:e.publicUser.gps.lng}}):n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("permission.no_view_location")}})],1):e._e()]),e._v(" "),n(h.a,{staticClass:"pt-3"},[1===e.activeTab?n("UserAccountAlerts",{attrs:{user:e.publicUser}}):e._e()],1)],1)],1):e._e()],1):e.loading?e._e():n("div",[n("GlobalFourohfour")],1)],1)}),[],!1,null,"68b82c33",null);t.default=component.exports;installComponents(component,{UserAvatar:n(797).default,ElementH1:n(764).default,ElementH4:n(429).default,UserActionsSendamessagebtn:n(864).default,UserActionsbtn:n(847).default,MapGmbasic:n(836).default,UserAccountAlerts:n(923).default,GlobalFourohfour:n(992).default})},764:function(e,t,n){"use strict";n.r(t);var r=n(175),c={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},o=n(35),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports},781:function(e,t,n){"use strict";n.r(t);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},c=n(35),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("p",{class:"text-"+e.align+" text-xl-body-1"},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},797:function(e,t,n){"use strict";n.r(t);var r=n(285),c=n(760),o=n(757),l=n(738),d=n(175),v=n(786),f=(n(52),n(44),n(58),n(39),n(5)),m=Object(f.b)({name:"UserAvatar",props:{user:{type:Object,default:function(){return{}}},size:{type:Number,default:function(){return 50}},color:{type:String,default:function(){return"black"}}},setup:function(e){var t=Object(f.q)(),n=t.getters,r=t.state,c=Object(f.o)(),o=Object(f.a)((function(){return n["user/isLoggedIn"]})),l=Object(f.a)((function(){return r.user.profile.initial})),d=Object(f.a)((function(){return r.user.profile.photoURL})),v=Object(f.a)((function(){return r.user.profile})),m=Object(f.i)("offline"),h=Object(f.i)(!1),_=Object(f.i)("/users/user/".concat(e.user.id));r.user.profile.isOnline&&r.user.profile.isOnline.status&&(m.value=r.user.profile.isOnline.status),e.user&&(l=Object(f.a)((function(){return e.user.initial})),d=Object(f.a)((function(){return e.user.photoURL})),e.user.isOnline&&e.user.isOnline.status&&(m.value=e.user.isOnline.status)),v.value.id===e.user.id&&(_.value="/profile");return{isLoggedIn:o,initial:l,photo:d,goTo:_,onlineStatus:m,viewPhoto:h,tappedPhoto:function(){c.value.name.includes("users-user-id")&&(h.value=!0)}}}}),h=n(35),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{display:"inline-block"}},[n(c.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"8","offset-y":"8",color:"online"===e.onlineStatus?"myshoutGreen":"myshoutRed"}},[n(r.a,{staticClass:"rounded-lg",attrs:{color:e.color,size:e.size,rounded:""}},[e.isLoggedIn?e.isLoggedIn&&e.photo?n(v.a,{attrs:{src:e.photo},on:{click:e.tappedPhoto}}):e.isLoggedIn?n("span",{staticClass:"white--text headline"},[e._v(e._s(e.initial))]):e._e():n(d.a,{attrs:{dark:""}},[e._v("\n        mdi-account\n      ")])],1)],1),e._v(" "),e.viewPhoto?n(o.a,{staticClass:"elevation-0",staticStyle:{"box-shadow":"none !important"},attrs:{"hide-overlay":!0,scrollable:!1,width:"100%","max-width":"700"},model:{value:e.viewPhoto,callback:function(t){e.viewPhoto=t},expression:"viewPhoto"}},[n("div",{staticStyle:{"margin-bottom":"45%"}},[n(v.a,{staticClass:"elevation-12 rounded-lg mx-1",attrs:{src:e.photo}}),e._v(" "),n("div",{staticClass:"text-center"},[n(l.a,{staticClass:"mt-n7",attrs:{color:"primary",fab:""},on:{click:function(t){e.viewPhoto=!e.viewPhoto}}},[n(d.a,[e._v("mdi-close")])],1)],1)],1)]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},825:function(e,t,n){"use strict";n.r(t);var r=n(786),c=n(5),o=Object(c.b)({name:"IconsAccident",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutOrange-base)",border:"solid 0.5rem var(--v-myshoutOrange-base)",margin:"0 auto"},attrs:{height:e.width,width:e.width,position:"center",contain:"",src:"/icons/Accident.svg"}})}),[],!1,null,null,null);t.default=component.exports},826:function(e,t,n){"use strict";n.r(t);var r=n(786),c=n(5),o=Object(c.b)({name:"IconsKidnapping",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutRed-base)",border:"solid 0.5rem var(--v-myshoutRed-base)",margin:"0 auto"},attrs:{height:e.width,width:e.width,position:"center",contain:"",src:"/icons/Kidnapping.svg"}})}),[],!1,null,null,null);t.default=component.exports},827:function(e,t,n){"use strict";n.r(t);var r=n(786),c=n(5),o=Object(c.b)({name:"IconsRobbery",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutGreen-base)",border:"solid 0.5rem var(--v-myshoutGreen-base)",margin:"0 auto"},attrs:{height:e.width,width:e.width,position:"center",contain:"",src:"/icons/Robbery.svg"}})}),[],!1,null,null,null);t.default=component.exports},830:function(e,t,n){"use strict";n.r(t);var r=n(786),c=n(5),o=Object(c.b)({name:"IconsShout",props:{styling:{type:Boolean,default:!0},width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",style:e.styling?"background-color:var(--v-myshoutBlue-base); border:solid 0.5rem var(--v-myshoutBlue-base); margin:0 auto;":"",attrs:{height:e.width,width:e.width,position:"center",contain:"",src:"/icons/Shout.svg"}})}),[],!1,null,null,null);t.default=component.exports},836:function(e,t,n){"use strict";n.r(t);var r=n(786),c=(n(52),n(5)),o=Object(c.b)({name:"MapGmbasic",props:{lat:{type:Number,default:function(){return null}},lng:{type:Number,default:function(){return null}},user:{type:Object,default:function(){return{}}}},setup:function(){return{loading:Object(c.i)(!1)}}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.lat&&e.lng?n("div",[n("a",{attrs:{target:"_blank",href:"https://www.google.com/maps/search/?api=1&query="+e.lat+","+e.lng}},[n(r.a,{staticClass:"mx-auto",attrs:{width:"600",src:"https://maps.googleapis.com/maps/api/staticmap?center="+e.lat+","+e.lng+"&zoom=16&scale=1&size=600x500&maptype=hybrid&key="+e.$config.google.mapsApiKey+"&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C"+e.lat+","+e.lng,alt:"Google Map of "+e.lat+","+e.lng}})],1)]):n("div",[n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("gps.user_no_location")}})],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:n(429).default})},847:function(e,t,n){"use strict";n.r(t);var r=n(757),c=n(175),o=n(176),l=n(107),d=n(286),v=n(154),f=n(78),m=n(298),h=n(0),_=(n(16),n(5)),y=Object(_.b)({name:"UserActionsbtn",directives:{Touch:m.a},props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(_.l)().$system,n=Object(_.q)().dispatch,r=Object(_.i)(!1),c=Object(_.i)(!1),o=Object(_.i)(!1),l=Object(_.i)(),d=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{r.value=!0,c.value=!0}catch(e){t.log({comp:"UserActionsbtn",msg:"showUserActions",val:e})}finally{r.value=!1}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(_.f)(Object(h.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("user/friends/getOne",{id:e.user.id});case 2:(r=t.sent)&&r.id&&(o.value=!0,l.value=r.status);case 4:case"end":return t.stop()}}),t)})))),{loading:r,showBottomSheet:c,isFriend:o,friendStatus:l,showUserActions:d,swipe:function(e){"Down"===e&&(c.value=!1)},isFriendFunc:function(e){o.value=e}}}}),x=y,O=n(35),component=Object(O.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(c.a,{staticClass:" pa-3 rounded-lg",attrs:{color:"myshoutDarkGrey"},on:{click:e.showUserActions}},[e._v("\n    mdi-dots-vertical\n  ")]),e._v(" "),n(r.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n(f.a,{staticClass:"rounded-t-xl",attrs:{height:"50vh"}},[n("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:m.b,name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:e.$t("is_loading")}}):e._e(),e._v(" "),n("ElementH3",{attrs:{align:"center",text:e.$t("actions")}}),e._v(" "),n(d.a,[e.$route.fullPath.includes(e.user.id)?e._e():n(o.a,{staticClass:"borderButton rounded-lg mb-2",attrs:{to:"/users/user/"+e.user.id}},[n(v.a,[n(c.a,[e._v("mdi-account")])],1),e._v(" "),n(l.a,[n(l.c,{staticClass:"myshoutDarkGrey--text"},[e._v(e._s(e.$t("view_profile")))])],1)],1),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsSendamessagebtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsRequestsafecheckinbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend&&"approved"===e.friendStatus?n("UserActionsToggleemergencycontactbtn",{attrs:{user:e.user}}):e._e(),e._v(" "),e.isFriend?n("UserActionsRemoveasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}}):e._e(),e._v(" "),e.isFriend?e._e():n("UserActionsAddasfriendbtn",{attrs:{user:e.user},on:{isFriend:e.isFriendFunc}})],1)],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{GlobalSlidebar:n(430).default,ElementH3:n(426).default,UserActionsSendamessagebtn:n(864).default,UserActionsRequestsafecheckinbtn:n(868).default,UserActionsToggleemergencycontactbtn:n(869).default,UserActionsRemoveasfriendbtn:n(870).default,UserActionsAddasfriendbtn:n(871).default})},864:function(e,t,n){"use strict";n.r(t);var r=n(175),c=n(176),o=n(107),l=n(154),d=n(0),v=(n(16),n(4),n(44),n(58),n(5)),f=Object(v.b)({name:"UserActionsSendamessagebtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(v.l)().$system,n=Object(v.q)(),r=n.state,c=n.dispatch,o=Object(v.i)(!1),dialog=Object(v.i)(!1),l=Object(v.a)((function(){return r.user.data})),f=Object(v.p)(),m=Object(v.i)([]),h=function(){var t=Object(d.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("chats/search",{field:"owner",operator:"==",term:l.value.uid}).then((function(t){if(t){var n=!1;return t.some((function(t){if(2===t.participants.length&&t.participants.includes(l.value.uid)&&t.participants.includes(e.user.id))return n=t,t})),n}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),_=function(){var n=Object(d.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,o.value=!0,n.next=4,h();case 4:if(!(r=n.sent)||!r.id){n.next=9;break}return n.next=8,f.push("/chats/chat/".concat(r.id));case 8:return n.abrupt("return");case 9:return m.value.push(l.value.uid),m.value.push(e.user.id),n.next=13,c("chats/add",{owner:l.value.uid,participants:m.value}).then(function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===t){e.next=3;break}return e.next=3,f.push("/chats/chat/".concat(t.id));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:n.next=18;break;case 15:n.prev=15,n.t0=n.catch(0),t.log({comp:"UserActionsSendamessagebtn",msg:"startChat",val:n.t0});case 18:return n.prev=18,o.value=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})));return function(){return n.apply(this,arguments)}}();return{loading:o,dialog:dialog,startChat:_}}}),m=f,h=n(35),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.startChat}},[e._t("default",(function(){return[n(c.a,{staticClass:"borderButton rounded-lg mb-2"},[n(l.a,[n(r.a,[e._v("mdi-message-text")])],1),e._v(" "),n(o.a,[n(o.c,[e._v(e._s(e.$t("chats.send_message")))])],1)],1)]}))],2)}),[],!1,null,null,null);t.default=component.exports},868:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),v=n(176),f=n(107),m=n(154),h=n(0),_=(n(16),n(5)),y=Object(_.b)({name:"UserActionsRequestsafecheckinbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(_.l)(),n=t.$system,r=t.$notify,c=t.i18n,o=Object(_.q)(),l=o.dispatch,d=o.state,v=Object(_.a)((function(){return d.user.data})),f=Object(_.a)((function(){return d.user.profile})),m=Object(_.i)(!1),y=Object(_.i)(!1),x=Object(_.i)(),dialog=Object(_.i)(!1),form=Object(_.i)({}),O=Object(_.i)(),w=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,m.value=!0,t.next=4,l("user/checkins/add",{userId:e.user.id,requestedBy:v.value.uid}).then((function(e){!1!==e&&(dialog.value=!1,O.value=e.id,r.show({text:c.t("notify.success"),color:"green"}))}));case 4:return t.next=6,l("user/notifications/add",{uid:e.user.id,title:"Check-In",body:"You have been requested to check-in by @".concat(f.value.username,". Contact them by phone or text message."),goTo:"/",type:"checkIn",seen:!1,created_at:new Date,meta:{checkInId:O.value,requestedBy:v.value.uid}});case 6:t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),n.log({comp:"UserActionsRequestsafecheckinbtn",msg:"save",val:t.t0}),r.show({text:c.t("notify.error_try_again"),color:"red"});case 12:return t.prev=12,m.value=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,8,12,15]])})));return function(){return t.apply(this,arguments)}}();return{loading:m,chat:x,showBottomSheet:y,dialog:dialog,form:form,save:w}}}),x=y,O=n(35),component=Object(O.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(v.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,[e._v("mdi-account-check")])],1),e._v(" "),n(f.a,[n(f.c,[e._v(e._s(e.$t("request_safe_check_in")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("request_safe_check_in")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("confirm_they_are_safe")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.save}},[e._v("\n        "+e._s(e.$t("btn.confirm_request"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},869:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),v=n(176),f=n(107),m=n(154),h=n(0),_=(n(16),n(5)),y=Object(_.b)({name:"UserActionsToggleemergencycontactbtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(_.l)(),n=t.$notify,r=t.$system,c=t.i18n,o=Object(_.q)().dispatch,l=Object(_.i)(!1),dialog=Object(_.i)(!1),d=Object(_.i)(),v=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l.value=!0,t.next=4,o("user/friends/getOne",{id:e.user.id}).then((function(e){!1!==e&&(d.value=e)}));case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),r.log({comp:"UserActionsToggleemergencycontactbtn",msg:"getFriendship",val:t.t0});case 9:return t.prev=9,l.value=!1,t.finish(9);case 12:case"end":return t.stop()}}),t,null,[[0,6,9,12]])})));return function(){return t.apply(this,arguments)}}(),f=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o("user/friends/updateField",{id:d.value.id,isEmergency:!d.value.isEmergency});case 2:e.sent?(dialog.value=!1,n.show({text:c.t("notify.success"),color:"success"})):(n.show({text:c.t("notify.error_try_again"),color:"error"}),r.log({comp:"UserActionsToggleemergencycontactbtn",msg:"toggleEmergencyContact",val:"bad response"}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(_.f)((function(){v()})),{loading:l,dialog:dialog,friendship:d,toggleEmergencyContact:f}}}),x=y,O=n(35),component=Object(O.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(v.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,{attrs:{color:e.friendship&&e.friendship.isEmergency?"myshoutRed":"myshoutGreen"}},[e._v("mdi-alert")])],1),e._v(" "),n(f.a,{style:"color: "+(e.friendship&&e.friendship.isEmergency?"var(--v-myshoutRed-base)":"var(--v-myshoutGreen-base)")+";"},[e.friendship&&e.friendship.isEmergency?n(f.c,[e._v(e._s(e.$t("remove_as_emergency_contact")))]):n(f.c,[e._v(e._s(e.$t("add_as_emergency_contact")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[e.friendship&&e.friendship.isEmergency?n("ElementH1",{attrs:{text:e.$t("remove_as_emergency_contact")}}):n("ElementH1",{attrs:{text:e.$t("add_as_emergency_contact")}}),e._v(" "),e.friendship&&e.friendship.isEmergency?n("ElementP",{attrs:{text:e.$t("no_longer_receive_alerts")}}):n("ElementP",{attrs:{text:e.$t("yes_longer_receive_alerts")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.toggleEmergencyContact}},[e._v("\n        "+e._s(e.$t("btn.confirm"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},870:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),v=n(176),f=n(107),m=n(154),h=n(0),_=(n(16),n(5)),y=Object(_.b)({name:"UserActionsRemoveasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,r=Object(_.l)(),c=r.$notify,o=r.i18n,l=Object(_.q)().dispatch,d=Object(_.p)(),v=Object(_.i)(!1),dialog=Object(_.i)(!1),f=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l("user/friends/remove",e.user.id);case 2:if(!t.sent){t.next=11;break}return dialog.value=!1,t.next=7,d.push("/profile");case 7:c.show({text:o.t("notify.success"),color:"success"}),n("isFriend",!1),t.next=12;break;case 11:c.show({text:o.t("notify.error_try_again"),color:"error"});case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:v,dialog:dialog,removeFriendship:f}}}),x=y,O=n(35),component=Object(O.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(v.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,{attrs:{color:"myshoutRed"}},[e._v("mdi-account-multiple-minus")])],1),e._v(" "),n(f.a,{staticStyle:{color:"var(--v-myshoutRed-base)"}},[n(f.c,[e._v(e._s(e.$t("remove_friend")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("remove_friend")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.confirm_remove_friend")}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.removeFriendship}},[e._v("\n        "+e._s(e.$t("remove_friend"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},871:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(762),o=n(761),l=n(294),d=n(175),v=n(176),f=n(107),m=n(154),h=n(828),_=n(0),y=(n(19),n(16),n(5)),x=Object(y.b)({name:"UserActionsAddasfriendbtn",props:{user:{type:Object,default:function(){return{}}}},emits:["isFriend"],setup:function(e,t){var n=t.emit,r=Object(y.l)(),c=r.$notify,o=r.i18n,l=Object(y.q)(),d=l.dispatch,v=l.state,f=Object(y.p)(),m=Object(y.i)(!1),dialog=Object(y.i)(!1),h=Object(y.a)((function(){return v.user.profile})),x=Object(y.i)(),O=function(){var e=Object(_.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.value){e.next=6;break}return e.next=3,d("user/search",{field:"securityPin",operator:"==",term:x.value,limit:1});case 3:if(!((t=e.sent).length>0)){e.next=6;break}return e.abrupt("return",t);case 6:return e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var t=Object(_.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O();case 2:if(r=t.sent){t.next=6;break}return c.show({text:o.t("notify.pin_no_match"),color:"error"}),t.abrupt("return");case 6:if(e.user.id===r[0].id){t.next=8;break}return t.abrupt("return");case 8:return t.next=10,d("user/friends/add",{id:e.user.id,status:"pending"});case 10:if(!t.sent){t.next=22;break}return console.log("Add notification to: ",e.user.id),t.next=15,d("user/notifications/add",{uid:e.user.id,title:o.t("new_friend_request"),body:"@".concat(h.value.username," ").concat(o.t("requested_to_be_your_friend")),seen:!1,created_at:new Date,type:"friendRequest",meta:{requestedBy:h.value.id}});case 15:return dialog.value=!1,t.next=18,f.push("/profile");case 18:c.show({text:o.t("notify.success"),color:"success"}),n("isFriend",!0),t.next=23;break;case 22:c.show({text:o.t("notify.error_try_again"),color:"error"});case 23:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:m,dialog:dialog,pin:x,addFriendship:w}}}),O=x,w=n(35),component=Object(w.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n(v.a,e._g(e._b({staticClass:"borderButton rounded-lg mb-2"},"v-list-item",c,!1),r),[n(m.a,[n(d.a,[e._v("mdi-account-multiple-plus")])],1),e._v(" "),n(f.a,[n(f.c,[e._v(e._s(e.$t("chats.add_friend")))])],1)],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n(c.a,{staticClass:"rounded-xl pa-8"},[n("ElementH1",{attrs:{text:e.$t("chats.add_friend")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.enter_pin")}}),e._v(" "),n(h.a,{attrs:{type:"text",label:e.$t("form.pin"),autocomplete:"off",required:""},model:{value:e.pin,callback:function(t){e.pin=t},expression:"pin"}}),e._v(" "),n(o.a,{staticClass:"justify-center"},[n(r.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.cancel"))+"\n      ")]),e._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{color:"primary"},on:{click:e.addFriendship}},[e._v("\n        "+e._s(e.$t("chats.add_friend"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementP:n(781).default})},895:function(e,t,n){"use strict";n.r(t);var r=n(757),c=n(175),o=n(176),l=n(283),d=n(107),v=n(78),f=n(298),m=n(5),h=Object(m.b)({name:"AlertListitem",directives:{Touch:f.a},props:{alert:{type:Object,default:function(){return{}}}},setup:function(){var e=Object(m.l)().$system,t=Object(m.i)(!1),n=Object(m.i)(!1);return{loading:t,showBottomSheet:n,swipe:function(e){"Down"===e&&(n.value=!1)},viewAlertDetails:function(){try{t.value=!0,n.value=!0}catch(t){e.log({comp:"AlertListitem",msg:"viewAlertDetails",val:t})}finally{t.value=!1}}}}}),_=n(35),component=Object(_.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(o.a,{attrs:{"two-line":""},on:{click:e.viewAlertDetails}},[n("div",{staticClass:"mr-2"},["accident"===e.alert.type?n("IconsAccident",{attrs:{width:"50"}}):e._e(),e._v(" "),"kidnapping"===e.alert.type?n("IconsKidnapping",{attrs:{width:"50"}}):e._e(),e._v(" "),"robbery"===e.alert.type?n("IconsRobbery",{attrs:{width:"50"}}):e._e(),e._v(" "),"shout"===e.alert.type?n("IconsShout",{attrs:{width:"50"}}):e._e()],1),e._v(" "),n(d.a,["accident"===e.alert.type?n("ElementH3",{staticStyle:{"text-transform":"capitalize"},attrs:{text:e.$t("accident"),align:"left"}}):e._e(),e._v(" "),"kidnapping"===e.alert.type?n("ElementH3",{staticStyle:{"text-transform":"capitalize"},attrs:{text:e.$t("kidnapping"),align:"left"}}):e._e(),e._v(" "),"robbery"===e.alert.type?n("ElementH3",{staticStyle:{"text-transform":"capitalize"},attrs:{text:e.$t("robbery"),align:"left"}}):e._e(),e._v(" "),"shout"===e.alert.type?n("ElementH3",{staticStyle:{"text-transform":"capitalize"},attrs:{text:e.$t("shout"),align:"left"}}):e._e(),e._v(" "),e.alert.location?n("span",{staticClass:"caption"},[e._v(e._s(e.alert.location.city)+", "+e._s(e.alert.location.province))]):e.alert.gps.lat?n("span",{staticClass:"caption"},[e._v(e._s(e.alert.gps.lat)+", "+e._s(e.alert.gps.lng))]):e._e()],1),e._v(" "),n(l.a,{staticClass:"mr-3"},[n("span",{staticClass:"caption"},[e._v(e._s(e.alert.created_at))])])],1),e._v(" "),n(r.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n(v.a,{staticClass:"rounded-t-xl pb-14",attrs:{height:"80vh"}},[n("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:f.b,name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:e.$t("is_loading")}}):e._e(),e._v(" "),n("ElementH1",{attrs:{align:"center",text:e.$t("alert_details")}}),e._v(" "),"accident"===e.alert.type?n("IconsAccident",{attrs:{width:"60"}}):e._e(),e._v(" "),"kidnapping"===e.alert.type?n("IconsKidnapping",{attrs:{width:"60"}}):e._e(),e._v(" "),"robbery"===e.alert.type?n("IconsRobbery",{attrs:{width:"60"}}):e._e(),e._v(" "),"shout"===e.alert.type?n("IconsShout",{attrs:{width:"60"}}):e._e(),e._v(" "),n("div",{staticClass:"text-center my-3"},[n("span",{staticClass:"caption"},[n(c.a,[e._v("\n              mdi-calendar\n            ")]),e._v("\n            "+e._s(e.alert.created_at)+"\n          ")],1),e._v(" "),n("span",{staticClass:"caption"},[n(c.a,[e._v("\n              mdi-map\n            ")]),e._v("\n            "+e._s(e.alert.gps.lat)+", "+e._s(e.alert.gps.lng)+"\n          ")],1)]),e._v(" "),e.alert.location?n("div",{staticClass:"text-center mb-3"},[e._v("\n          "+e._s(e.alert.location.city)+",\n          "+e._s(e.alert.location.province)+",\n          "+e._s(e.alert.location.country)+"\n        ")]):e._e(),e._v(" "),e.alert.audioUrl?n("div",{staticClass:"my-7 text-center"},[n("audio",{staticStyle:{"min-width":"220px"},attrs:{src:e.alert.audioUrl,controls:""}})]):e._e(),e._v(" "),n("MapGmbasic",{attrs:{lat:e.alert.gps.lat,lng:e.alert.gps.lng}})],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{IconsAccident:n(825).default,IconsKidnapping:n(826).default,IconsRobbery:n(827).default,IconsShout:n(830).default,ElementH3:n(426).default,GlobalSlidebar:n(430).default,ElementH1:n(764).default,MapGmbasic:n(836).default})},923:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(175),o=n(282),l=n(286),d=n(0),v=(n(16),n(5)),f=n(57),m=n.n(f),h=Object(v.b)({name:"UserAccountAlerts",middleware:"authenticated",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(v.l)().$system,n=Object(v.q)(),r=n.dispatch,c=n.state,o=n.commit,l=Object(v.a)((function(){return c.user.data})),f=Object(v.i)(!1),h=Object(v.i)([]),_=Object(v.a)((function(){return c.user.alerts.all})),y=Object(v.i)(),x=Object(v.i)(!1),O=Object(v.i)({isEmergency:!1}),w=function(){var n=Object(d.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return f.value=!0,n.prev=1,n.next=4,r("user/getOne",e.user.id).then((function(e){!1!==e&&(y.value=m.a.cloneDeep(e))})).catch((function(e){t.log({comp:"PageUsersId",msg:"user/getOne",val:e})}));case 4:return n.next=6,r("user/friends/getAccess",{userId:l.value.uid,id:e.user.id}).then((function(e){!1!==e&&(O.value=e,O.value.isEmergency&&(x.value=!0),y.value.permissions.shareLocationWithFriends)}));case 6:n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),t.log({comp:"UserAlerts",msg:"getUserFriends",val:n.t0});case 11:return n.prev=11,f.value=!1,n.finish(11);case 14:case"end":return n.stop()}}),n,null,[[1,8,11,14]])})));return function(){return n.apply(this,arguments)}}(),j=function(){var n=Object(d.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(f.value=!0,n.prev=1,l.value.uid!==e.user.id){n.next=6;break}x.value=!0,n.next=8;break;case 6:if(x.value){n.next=8;break}return n.abrupt("return");case 8:return n.next=10,r("user/alerts/getAll",e.user.id).then((function(e){!1!==e&&(h.value=e)}));case 10:n.next=15;break;case 12:n.prev=12,n.t0=n.catch(1),t.log({comp:"UserAlerts",msg:"getAlerts",val:n.t0});case 15:return n.prev=15,f.value=!1,o("user/alerts/HAS_NEW_ALERTS",!1),n.finish(15);case 19:case"end":return n.stop()}}),n,null,[[1,12,15,19]])})));return function(){return n.apply(this,arguments)}}();return Object(v.f)(Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:return e.next=4,j();case 4:case"end":return e.stop()}}),e)})))),{alertsStore:_,getAlerts:j,loading:f,state:c,alerts:h,canViewAlerts:x,publicUser:y,friendshipAccess:O}}}),_=h,y=n(35),component=Object(y.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loading||e.canViewAlerts?n("div",[n("div",{staticClass:"text-center"},[e.$store.state.user.alerts.hasNewAlerts?n(r.a,{staticClass:"my-3",attrs:{color:"myshoutOrange"},on:{click:e.getAlerts}},[n(c.a,{attrs:{small:""}},[e._v("mdi-refresh")]),e._v("\n        "+e._s(e.$t("btn.load_new"))+"\n      ")],1):e._e()],1),e._v(" "),e.alerts&&e.alerts.length>0?n(o.a,{attrs:{color:"transparent",rounded:""}},[n(l.a,[e._l(e.alerts,(function(e,t){return[n("AlertListitem",{key:t,attrs:{alert:e}})]}))],2)],1):n("div",[e.loading?e._e():n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("you_have_no_alerts")}})],1)],1):n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("must_be_emergency_contact")}})],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:n(429).default,AlertListitem:n(895).default})},965:function(e,t,n){var content=n(1051);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(38).default)("346f1aab",content,!0,{sourceMap:!1})},992:function(e,t,n){"use strict";n.r(t);var r=n(738),c=n(5),o=Object(c.b)({name:"GlobalFourohfour",setup:function(){var title=Object(c.n)().title;return title.value="404 Not Found",{title:title}},head:{}}),l=n(35),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ma-6 text-center"},[n("ElementH1",{attrs:{text:e.$t("page.not_found_heading")}}),e._v(" "),n("ElementH3",{attrs:{text:e.$t("page.not_found_text")}}),e._v(" "),n(r.a,{staticClass:"mt-6",on:{click:function(t){return e.$nuxt.refresh()}}},[e._v("\n    "+e._s(e.$t("btn.retry"))+"\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(764).default,ElementH3:n(426).default})}}]);