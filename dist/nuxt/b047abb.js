(window.webpackJsonp=window.webpackJsonp||[]).push([[48,60,64],{764:function(e,t,n){"use strict";n.r(t);var r=n(175),o={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(35),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports},781:function(e,t,n){"use strict";n.r(t);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},o=n(35),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("p",{class:"text-"+e.align+" text-xl-body-1"},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},788:function(e,t,n){var content=n(803);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(38).default)("53f37fa6",content,!0,{sourceMap:!1})},795:function(e,t,n){"use strict";n.r(t);var r=n(176),o=n(283),c=n(107),l=n(5),d=Object(l.b)({name:"UserListitem",props:{user:{type:Object,default:function(){return{}}},urlBase:{type:String,default:function(){return"/users/user/"}}},setup:function(e){var t=Object(l.q)().state,n=Object(l.i)(!1),r=Object(l.i)(!1),o=Object(l.i)(),dialog=Object(l.i)(!1),c=Object(l.a)((function(){return t.user.data})),d=Object(l.i)(!1),f=Object(l.i)();return Object(l.f)((function(){c.value.uid===e.user.id&&(d.value=!0,f.value="/profile")})),{loading:n,chat:o,showBottomSheet:r,dialog:dialog,isMe:d,goTo:f}}}),f=(n(802),n(35)),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(r.a,[n("NuxtLink",{attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id}},[n("UserAvatar",{staticClass:"mr-5",attrs:{user:e.user}})],1),e._v(" "),n("NuxtLink",{staticStyle:{width:"100%"},attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id,color:"myshoutDarkGrey"}},[n(c.a,[n(c.c,{staticClass:"username myshoutDarkGrey--text",domProps:{innerHTML:e._s(e.user&&e.user.username?"@"+e.user.username:e.user.first_name)}})],1)],1),e._v(" "),n(o.a,{staticClass:"mr-3"},[e._t("action")],2)],1)}),[],!1,null,"83a04722",null);t.default=component.exports;installComponents(component,{UserAvatar:n(797).default})},797:function(e,t,n){"use strict";n.r(t);var r=n(285),o=n(760),c=n(757),l=n(738),d=n(175),f=n(786),v=(n(52),n(44),n(58),n(39),n(5)),m=Object(v.b)({name:"UserAvatar",props:{user:{type:Object,default:function(){return{}}},size:{type:Number,default:function(){return 50}},color:{type:String,default:function(){return"black"}}},setup:function(e){var t=Object(v.q)(),n=t.getters,r=t.state,o=Object(v.o)(),c=Object(v.a)((function(){return n["user/isLoggedIn"]})),l=Object(v.a)((function(){return r.user.profile.initial})),d=Object(v.a)((function(){return r.user.profile.photoURL})),f=Object(v.a)((function(){return r.user.profile})),m=Object(v.i)("offline"),h=Object(v.i)(!1),O=Object(v.i)("/users/user/".concat(e.user.id));r.user.profile.isOnline&&r.user.profile.isOnline.status&&(m.value=r.user.profile.isOnline.status),e.user&&(l=Object(v.a)((function(){return e.user.initial})),d=Object(v.a)((function(){return e.user.photoURL})),e.user.isOnline&&e.user.isOnline.status&&(m.value=e.user.isOnline.status)),f.value.id===e.user.id&&(O.value="/profile");return{isLoggedIn:c,initial:l,photo:d,goTo:O,onlineStatus:m,viewPhoto:h,tappedPhoto:function(){o.value.name.includes("users-user-id")&&(h.value=!0)}}}}),h=n(35),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{display:"inline-block"}},[n(o.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"8","offset-y":"8",color:"online"===e.onlineStatus?"myshoutGreen":"myshoutRed"}},[n(r.a,{staticClass:"rounded-lg",attrs:{color:e.color,size:e.size,rounded:""}},[e.isLoggedIn?e.isLoggedIn&&e.photo?n(f.a,{attrs:{src:e.photo},on:{click:e.tappedPhoto}}):e.isLoggedIn?n("span",{staticClass:"white--text headline"},[e._v(e._s(e.initial))]):e._e():n(d.a,{attrs:{dark:""}},[e._v("\n        mdi-account\n      ")])],1)],1),e._v(" "),e.viewPhoto?n(c.a,{staticClass:"elevation-0",staticStyle:{"box-shadow":"none !important"},attrs:{"hide-overlay":!0,scrollable:!1,width:"100%","max-width":"700"},model:{value:e.viewPhoto,callback:function(t){e.viewPhoto=t},expression:"viewPhoto"}},[n("div",{staticStyle:{"margin-bottom":"45%"}},[n(f.a,{staticClass:"elevation-12 rounded-lg mx-1",attrs:{src:e.photo}}),e._v(" "),n("div",{staticClass:"text-center"},[n(l.a,{staticClass:"mt-n7",attrs:{color:"primary",fab:""},on:{click:function(t){e.viewPhoto=!e.viewPhoto}}},[n(d.a,[e._v("mdi-close")])],1)],1)],1)]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},802:function(e,t,n){"use strict";n(788)},803:function(e,t,n){var r=n(37)(!1);r.push([e.i,"\n.username[data-v-83a04722] {\n  font-size:19px;\n  font-weight:600;\n}\n",""]),e.exports=r},843:function(e,t,n){"use strict";n.r(t);var r=n(839),o=n(846),c=n(175),l=n(282),d=n(828),f=n(0),v=(n(18),n(4),n(44),n(58),n(16),n(5)),m=n(57),h=n.n(m),O=Object(v.b)({name:"ChatViewsearchmembers",setup:function(e,t){var n=t.emit,r=Object(v.l)(),o=r.$system,c=r.$helper,l=Object(v.q)(),d=l.dispatch,m=l.state,O=Object(v.i)(!1),w=Object(v.a)((function(){return m.user.data})),x=Object(v.i)(!1),_=Object(v.i)([]),j=Object(v.i)([]),y=Object(v.i)(),C=Object(v.i)([]),k=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O.value=!0,e.prev=1,e.next=4,d("user/friends/getAll",{uid:w.value.uid}).then((function(e){!1!==e&&(_.value=e,j.value=e)}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),o.log({comp:"Newchat",msg:"getFriends",val:e.t0});case 9:return e.prev=9,O.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[1,6,9,12]])})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.value=c.arrToggle(C.value,t),n("friendsSelected",C.value);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.value&&y.value.length>=3?(t=y.value.toLowerCase(),_.value=h.a.filter(j.value,(function(e){return!(!e.first_name||!e.first_name.toLowerCase().includes(t))||(!(!e.last_name||!e.last_name.toLowerCase().includes(t))||(!(!e.username||!e.username.toLowerCase().includes(t))||(!(!e.phone||!e.phone.toLowerCase().includes(t))||void 0)))}))):_.value=j.value;case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.f)(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O.value=!0,e.prev=1,e.next=4,k();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),o.log({comp:"ChatViewsearchmembers",msg:"getFriends",val:e.t0});case 9:return e.prev=9,O.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[1,6,9,12]])})))),{loading:O,showBottomSheet:x,friends:_,searchFriendInput:y,toggleFriend:S,searchFriends:L}}}),w=O,x=n(35),component=Object(x.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mb-12 pb-12"},[e.friends&&0!==e.friends.length?n(d.a,{attrs:{label:e.$t("contacts.search_friends"),placeholder:e.$t("contacts.search_friends"),"append-icon":"mdi-magnify",filled:"",rounded:""},nativeOn:{keyup:function(t){return e.searchFriends.apply(null,arguments)}},model:{value:e.searchFriendInput,callback:function(t){e.searchFriendInput=t},expression:"searchFriendInput"}}):n("div",[e.loading?e._e():n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("contacts.no_contacts")}})],1),e._v(" "),n(l.a,[e._l(e.friends,(function(u,t){return[n("UserListitem",{key:t,staticClass:"mb-2",attrs:{user:u,urlBase:"/users/user/"},scopedSlots:e._u([{key:"action",fn:function(){return["approved"===u.status?n(r.a,{on:{click:function(t){return e.toggleFriend(u.id)}}}):n(o.a,{attrs:{color:"myshoutOrange",title:u.status}},[n(c.a,{staticClass:"pr-3"},[e._v("mdi-update")])],1)]},proxy:!0}],null,!0)})]}))],2)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:n(429).default,UserListitem:n(795).default})},872:function(e,t,n){"use strict";n.r(t);var r=n(1072),o=n(757),c=n(738),l=n(78),d=n(298),f=n(73),v=n(0),m=(n(19),n(16),n(5)),h=n(57),O=n.n(h),w=Object(m.b)({name:"ChatAddmemberstochatbtn",directives:{Touch:d.a},props:{chat:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(m.l)(),n=t.$system,r=t.$notify,o=t.i18n,c=Object(m.q)().dispatch,l=Object(m.p)(),d=Object(m.i)(!1),h=Object(m.i)(!1),w=Object(m.i)([]),x=function(){var e=Object(v.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{d.value=!0,h.value=!0}catch(e){n.log({comp:"ChatsIndex",msg:"getChats",val:e})}finally{d.value=!1}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var t=Object(v.a)(regeneratorRuntime.mark((function t(){var m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==w.value.length){t.next=3;break}return r.show({text:o.t("chats.select_friend_first"),color:"error"}),t.abrupt("return");case 3:return t.prev=3,d.value=!0,(m=O.a.cloneDeep(e.chat)).participants=[].concat(Object(f.a)(m.participants),Object(f.a)(w.value)),t.next=9,c("chats/update",m).then(function(){var t=Object(v.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1===n){t.next=4;break}return t.next=3,l.push("/chats/chat/".concat(e.chat.id));case 3:r.show({text:o.t("notify.success"),color:"success"});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(3),n.log({comp:"ChatAddmemberstochatbtn",msg:"startChat",val:t.t0});case 14:return t.prev=14,d.value=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[3,11,14,17]])})));return function(){return t.apply(this,arguments)}}();return{loading:d,showBottomSheet:h,newChat:x,startChat:_,swipe:function(e){"Down"===e&&(h.value=!1)},friendsSelected:function(e){w.value=e}}}}),x=w,_=n(35),component=Object(_.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(c.a,{staticClass:"justify-center primary elevation-0",on:{click:e.newChat}},[e._v("\n    "+e._s(e.$t("chats.add_member"))+"\n  ")]),e._v(" "),n(o.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n(l.a,{staticClass:"rounded-t-xl pb-14",attrs:{height:"80vh"}},[n("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:d.b,name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:e.$t("is_loading")}}):e._e(),e._v(" "),n("ElementH1",{attrs:{align:"center",text:e.$t("chats.add_member")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.select_friends")}}),e._v(" "),n("ChatViewsearchmembers",{on:{friendsSelected:e.friendsSelected}}),e._v(" "),n(r.a,{staticClass:"mb-16",staticStyle:{top:"90%","margin-bottom":"20px"},attrs:{color:"rgba(0,0,0,0)",flat:"",bottom:"",fixed:""}},[n("div",{staticClass:"text-center",staticStyle:{width:"100%"}},[n(c.a,{staticClass:"primary elevation-0",attrs:{rounded:"",large:""},on:{click:e.startChat}},[e._v("\n              "+e._s(e.$t("btn.add"))+"\n            ")])],1)])],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{GlobalSlidebar:n(430).default,ElementH3:n(426).default,ElementH1:n(764).default,ElementP:n(781).default,ChatViewsearchmembers:n(843).default})}}]);