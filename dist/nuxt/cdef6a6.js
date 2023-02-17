(window.webpackJsonp=window.webpackJsonp||[]).push([[43,52,56],{726:function(e,t,n){"use strict";n.r(t);var r=n(164),o={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(37),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports},744:function(e,t,n){"use strict";n.r(t);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},o=n(37),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("p",{class:"text-"+e.align+" text-xl-body-1"},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},750:function(e,t,n){var content=n(765);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(39).default)("2029faa0",content,!0,{sourceMap:!1})},755:function(e,t,n){"use strict";n.r(t);var r=n(267),o=n(722),c=n(719),l=n(692),d=n(164),f=n(748),v=(n(55),n(46),n(58),n(43),n(5)),h=Object(v.b)({name:"UserAvatar",props:{user:{type:Object,default:function(){return{}}},size:{type:Number,default:function(){return 50}},color:{type:String,default:function(){return"black"}}},setup:function(e){var t=Object(v.q)(),n=t.getters,r=t.state,o=Object(v.o)(),c=Object(v.a)((function(){return n["user/isLoggedIn"]})),l=Object(v.a)((function(){return r.user.profile.initial})),d=Object(v.a)((function(){return r.user.profile.photoURL})),f=Object(v.a)((function(){return r.user.profile})),h=Object(v.i)("offline"),m=Object(v.i)(!1),w=Object(v.i)("/users/user/".concat(e.user.id));r.user.profile.isOnline&&r.user.profile.isOnline.status&&(h.value=r.user.profile.isOnline.status),e.user&&(l=Object(v.a)((function(){return e.user.initial})),d=Object(v.a)((function(){return e.user.photoURL})),e.user.isOnline&&e.user.isOnline.status&&(h.value=e.user.isOnline.status)),f.value.id===e.user.id&&(w.value="/profile");return{isLoggedIn:c,initial:l,photo:d,goTo:w,onlineStatus:h,viewPhoto:m,tappedPhoto:function(){o.value.name.includes("users-user-id")&&(m.value=!0)}}}}),m=n(37),component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{display:"inline-block"}},[n(o.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"8","offset-y":"8",color:"online"===e.onlineStatus?"myshoutGreen":"myshoutRed"}},[n(r.a,{staticClass:"rounded-lg",attrs:{color:e.color,size:e.size,rounded:""}},[e.isLoggedIn?e.isLoggedIn&&e.photo?n(f.a,{attrs:{src:e.photo},on:{click:e.tappedPhoto}}):e.isLoggedIn?n("span",{staticClass:"white--text headline"},[e._v(e._s(e.initial))]):e._e():n(d.a,{attrs:{dark:""}},[e._v("\n        mdi-account\n      ")])],1)],1),e._v(" "),e.viewPhoto?n(c.a,{staticClass:"elevation-0",staticStyle:{"box-shadow":"none !important"},attrs:{"hide-overlay":!0,scrollable:!1,width:"100%","max-width":"700"},model:{value:e.viewPhoto,callback:function(t){e.viewPhoto=t},expression:"viewPhoto"}},[n("div",{staticStyle:{"margin-bottom":"45%"}},[n(f.a,{staticClass:"elevation-12 rounded-lg mx-1",attrs:{src:e.photo}}),e._v(" "),n("div",{staticClass:"text-center"},[n(l.a,{staticClass:"mt-n7",attrs:{color:"primary",fab:""},on:{click:function(t){e.viewPhoto=!e.viewPhoto}}},[n(d.a,[e._v("mdi-close")])],1)],1)],1)]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},758:function(e,t,n){"use strict";n.r(t);var r=n(165),o=n(265),c=n(103),l=n(5),d=Object(l.b)({name:"UserListitem",props:{user:{type:Object,default:function(){return{}}},urlBase:{type:String,default:function(){return"/users/user/"}}},setup:function(e){var t=Object(l.q)().state,n=Object(l.i)(!1),r=Object(l.i)(!1),o=Object(l.i)(),dialog=Object(l.i)(!1),c=Object(l.a)((function(){return t.user.data})),d=Object(l.i)(!1),f=Object(l.i)();return Object(l.f)((function(){c.value.uid===e.user.id&&(d.value=!0,f.value="/profile")})),{loading:n,chat:o,showBottomSheet:r,dialog:dialog,isMe:d,goTo:f}}}),f=(n(764),n(37)),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(r.a,[n("NuxtLink",{attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id}},[n("UserAvatar",{staticClass:"mr-5",attrs:{user:e.user}})],1),e._v(" "),n("NuxtLink",{staticStyle:{width:"100%"},attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id,color:"myshoutDarkGrey"}},[n(c.a,[n(c.c,{staticClass:"username myshoutDarkGrey--text",domProps:{innerHTML:e._s(e.user&&e.user.username?"@"+e.user.username:e.user.first_name)}})],1)],1),e._v(" "),n(o.a,{staticClass:"mr-3"},[e._t("action")],2)],1)}),[],!1,null,"83a04722",null);t.default=component.exports;installComponents(component,{UserAvatar:n(755).default})},764:function(e,t,n){"use strict";n(750)},765:function(e,t,n){var r=n(38)(!1);r.push([e.i,".username[data-v-83a04722]{font-size:19px;font-weight:600}",""]),e.exports=r},805:function(e,t,n){"use strict";n.r(t);var r=n(800),o=n(809),c=n(164),l=n(264),d=n(790),f=n(0),v=(n(19),n(4),n(46),n(58),n(14),n(5)),h=n(56),m=n.n(h),w=Object(v.b)({name:"ChatViewsearchmembers",setup:function(e,t){var n=t.emit,r=Object(v.l)(),o=r.$system,c=r.$helper,l=Object(v.q)(),d=l.dispatch,h=l.state,w=Object(v.i)(!1),O=Object(v.a)((function(){return h.user.data})),x=Object(v.i)(!1),_=Object(v.i)([]),j=Object(v.i)([]),y=Object(v.i)(),C=Object(v.i)([]),k=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w.value=!0,e.prev=1,e.next=4,d("user/friends/getAll",{uid:O.value.uid}).then((function(e){!1!==e&&(_.value=e,j.value=e)}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),o.log({comp:"Newchat",msg:"getFriends",val:e.t0});case 9:return e.prev=9,w.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[1,6,9,12]])})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.value=c.arrToggle(C.value,t),n("friendsSelected",C.value);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.value&&y.value.length>=3?(t=y.value.toLowerCase(),_.value=m.a.filter(j.value,(function(e){return!(!e.first_name||!e.first_name.toLowerCase().includes(t))||(!(!e.last_name||!e.last_name.toLowerCase().includes(t))||(!(!e.username||!e.username.toLowerCase().includes(t))||(!(!e.phone||!e.phone.toLowerCase().includes(t))||void 0)))}))):_.value=j.value;case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.f)(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w.value=!0,e.prev=1,e.next=4,k();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),o.log({comp:"ChatViewsearchmembers",msg:"getFriends",val:e.t0});case 9:return e.prev=9,w.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[1,6,9,12]])})))),{loading:w,showBottomSheet:x,friends:_,searchFriendInput:y,toggleFriend:S,searchFriends:L}}}),O=w,x=n(37),component=Object(x.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mb-12 pb-12"},[e.friends&&0!==e.friends.length?n(d.a,{attrs:{label:e.$t("contacts.search_friends"),placeholder:e.$t("contacts.search_friends"),"append-icon":"mdi-magnify",filled:"",rounded:""},nativeOn:{keyup:function(t){return e.searchFriends.apply(null,arguments)}},model:{value:e.searchFriendInput,callback:function(t){e.searchFriendInput=t},expression:"searchFriendInput"}}):n("div",[e.loading?e._e():n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("contacts.no_contacts")}})],1),e._v(" "),n(l.a,[e._l(e.friends,(function(u,t){return[n("UserListitem",{key:t,staticClass:"mb-2",attrs:{user:u,urlBase:"/users/user/"},scopedSlots:e._u([{key:"action",fn:function(){return["approved"===u.status?n(r.a,{on:{click:function(t){return e.toggleFriend(u.id)}}}):n(o.a,{attrs:{color:"myshoutOrange",title:u.status}},[n(c.a,{staticClass:"pr-3"},[e._v("mdi-update")])],1)]},proxy:!0}],null,!0)})]}))],2)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:n(399).default,UserListitem:n(758).default})},939:function(e,t,n){"use strict";n.r(t);var r=n(1033),o=n(719),c=n(692),l=n(164),d=n(76),f=n(280),v=n(0),h=(n(14),n(5)),m=Object(h.b)({name:"ChatNewchatbtn",directives:{Touch:f.a},setup:function(){var e=Object(h.l)(),t=e.$system,n=e.$notify,r=e.i18n,o=Object(h.q)(),c=o.dispatch,l=o.state,d=Object(h.p)(),f=Object(h.i)(!1),m=Object(h.a)((function(){return l.user.data})),w=Object(h.i)(!1),O=Object(h.i)([]),x=function(){var e=Object(v.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{f.value=!0,w.value=!0}catch(e){t.log({comp:"ChatNewchatbtn",msg:"getChats",val:e})}finally{f.value=!1}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(v.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==O.value.length){e.next=3;break}return n.show({text:r.t("chats.select_friend_first"),color:"error"}),e.abrupt("return");case 3:return e.prev=3,f.value=!0,O.value.push(m.value.uid),e.next=8,c("chats/add",{owner:m.value.uid,participants:O.value}).then(function(){var e=Object(v.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===t){e.next=4;break}return O.value=[],e.next=4,d.push("/chats/chat/".concat(t.id));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t.log({comp:"ChatNewchatbtn",msg:"startChat",val:e.t0});case 13:return e.prev=13,f.value=!1,e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[3,10,13,16]])})));return function(){return e.apply(this,arguments)}}();return{loading:f,showBottomSheet:w,newChat:x,startChat:_,swipe:function(e){"Down"===e&&(w.value=!1)},friendsSelected:function(e){O.value=e}}}}),w=m,O=n(37),component=Object(O.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(l.a,{staticClass:"grey lighten-2 pa-3 rounded-lg",attrs:{color:"myshoutDarkGrey"},on:{click:e.newChat}},[e._v("\n    mdi-message-outline\n  ")]),e._v(" "),n(o.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:e.showBottomSheet,callback:function(t){e.showBottomSheet=t},expression:"showBottomSheet"}},[n(d.a,{staticClass:"rounded-t-xl pb-14",attrs:{height:"80vh"}},[n("div",{staticClass:"ma-3  mb-12",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:f.b,name:"touch",rawName:"v-touch",value:{down:function(){return e.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(t){return e.swipe("Down")}}}),e._v(" "),e.loading?n("ElementH3",{attrs:{align:"center",text:e.$t("is_loading")}}):e._e(),e._v(" "),n("ElementH1",{attrs:{align:"center",text:e.$t("chats.new_chat")}}),e._v(" "),n("ElementP",{attrs:{text:e.$t("chats.select_friends")}}),e._v(" "),n("ChatViewsearchmembers",{on:{friendsSelected:e.friendsSelected}}),e._v(" "),n(r.a,{staticClass:"mb-16",staticStyle:{top:"90%","margin-bottom":"20px"},attrs:{color:"rgba(0,0,0,0)",flat:"",bottom:"",fixed:""}},[n("div",{staticClass:"text-center",staticStyle:{width:"100%"}},[n(c.a,{staticClass:"primary elevation-0",attrs:{rounded:"",large:""},on:{click:e.startChat}},[e._v(e._s(e.$t("chats.start_chat")))])],1)])],1)])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{GlobalSlidebar:n(398).default,ElementH3:n(394).default,ElementH1:n(726).default,ElementP:n(744).default,ChatViewsearchmembers:n(805).default})}}]);