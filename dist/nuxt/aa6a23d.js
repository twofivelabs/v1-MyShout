(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{788:function(e,t,r){var content=r(801);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(38).default)("53f37fa6",content,!0,{sourceMap:!1})},792:function(e,t,r){"use strict";r.r(t);var n=r(176),o=r(283),c=r(107),l=r(5),f=Object(l.b)({name:"UserListitem",props:{user:{type:Object,default:function(){return{}}},urlBase:{type:String,default:function(){return"/users/user/"}}},setup:function(e){var t=Object(l.q)().state,r=Object(l.i)(!1),n=Object(l.i)(!1),o=Object(l.i)(),dialog=Object(l.i)(!1),c=Object(l.a)((function(){return t.user.data})),f=Object(l.i)(!1),d=Object(l.i)();return Object(l.f)((function(){c.value.uid===e.user.id&&(f.value=!0,d.value="/profile")})),{loading:r,chat:o,showBottomSheet:n,dialog:dialog,isMe:f,goTo:d}}}),d=(r(800),r(35)),component=Object(d.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(n.a,[r("NuxtLink",{attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id}},[r("UserAvatar",{staticClass:"mr-5",attrs:{user:e.user}})],1),e._v(" "),r("NuxtLink",{staticStyle:{width:"100%"},attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id,color:"myshoutDarkGrey"}},[r(c.a,[r(c.c,{staticClass:"username myshoutDarkGrey--text",domProps:{innerHTML:e._s(e.user&&e.user.username?"@"+e.user.username:e.user.first_name)}})],1)],1),e._v(" "),r(o.a,{staticClass:"mr-3"},[e._t("action")],2)],1)}),[],!1,null,"83a04722",null);t.default=component.exports;installComponents(component,{UserAvatar:r(793).default})},793:function(e,t,r){"use strict";r.r(t);var n=r(285),o=r(760),c=r(757),l=r(738),f=r(175),d=r(786),v=(r(52),r(44),r(58),r(39),r(5)),m=Object(v.b)({name:"UserAvatar",props:{user:{type:Object,default:function(){return{}}},size:{type:Number,default:function(){return 50}},color:{type:String,default:function(){return"black"}}},setup:function(e){var t=Object(v.q)(),r=t.getters,n=t.state,o=Object(v.o)(),c=Object(v.a)((function(){return r["user/isLoggedIn"]})),l=Object(v.a)((function(){return n.user.profile.initial})),f=Object(v.a)((function(){return n.user.profile.photoURL})),d=Object(v.a)((function(){return n.user.profile})),m=Object(v.i)("offline"),h=Object(v.i)(!1),O=Object(v.i)("/users/user/".concat(e.user.id));n.user.profile.isOnline&&n.user.profile.isOnline.status&&(m.value=n.user.profile.isOnline.status),e.user&&(l=Object(v.a)((function(){return e.user.initial})),f=Object(v.a)((function(){return e.user.photoURL})),e.user.isOnline&&e.user.isOnline.status&&(m.value=e.user.isOnline.status)),d.value.id===e.user.id&&(O.value="/profile");return{isLoggedIn:c,initial:l,photo:f,goTo:O,onlineStatus:m,viewPhoto:h,tappedPhoto:function(){o.value.name.includes("users-user-id")&&(h.value=!0)}}}}),h=r(35),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{display:"inline-block"}},[r(o.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"8","offset-y":"8",color:"online"===e.onlineStatus?"myshoutGreen":"myshoutRed"}},[r(n.a,{staticClass:"rounded-lg",attrs:{color:e.color,size:e.size,rounded:""}},[e.isLoggedIn?e.isLoggedIn&&e.photo?r(d.a,{attrs:{src:e.photo},on:{click:e.tappedPhoto}}):e.isLoggedIn?r("span",{staticClass:"white--text headline"},[e._v(e._s(e.initial))]):e._e():r(f.a,{attrs:{dark:""}},[e._v("\n        mdi-account\n      ")])],1)],1),e._v(" "),e.viewPhoto?r(c.a,{staticClass:"elevation-0",staticStyle:{"box-shadow":"none !important"},attrs:{"hide-overlay":!0,scrollable:!1,width:"100%","max-width":"700"},model:{value:e.viewPhoto,callback:function(t){e.viewPhoto=t},expression:"viewPhoto"}},[r("div",{staticStyle:{"margin-bottom":"45%"}},[r(d.a,{staticClass:"elevation-12 rounded-lg mx-1",attrs:{src:e.photo}}),e._v(" "),r("div",{staticClass:"text-center"},[r(l.a,{staticClass:"mt-n7",attrs:{color:"primary",fab:""},on:{click:function(t){e.viewPhoto=!e.viewPhoto}}},[r(f.a,[e._v("mdi-close")])],1)],1)],1)]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},800:function(e,t,r){"use strict";r(788)},801:function(e,t,r){var n=r(37)(!1);n.push([e.i,"\n.username[data-v-83a04722] {\n  font-size:19px;\n  font-weight:600;\n}\n",""]),e.exports=n},975:function(e,t,r){"use strict";r.r(t);var n=r(282),o=r(824),c=(r(13),r(17),r(23),r(24),r(2)),l=r(0),f=(r(16),r(4),r(15),r(18),r(44),r(58),r(5)),d=r(57),v=r.n(d);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=Object(f.b)({name:"UserAccountFriends",middleware:"authenticated",setup:function(){var e=Object(f.q)(),t=e.state,r=e.dispatch,n=Object(f.l)().$system,o=Object(f.a)((function(){return t.user.data})),c=Object(f.i)(!1),d=Object(f.i)([]),m=Object(f.i)([]),O=Object(f.i)(),j=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,c.value=!0,e.next=4,r("user/friends/getAll",{uid:o.value.uid}).then((function(e){!1!==e&&e.forEach(function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(u){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r("user/getOne",u.id);case 2:(t=e.sent)&&(d.value.push(Object.assign(h({},u),t)),m.value.push(t));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),n.log({comp:"UserAccountEmergency",msg:"getFriends",val:e.t0});case 9:return e.prev=9,c.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[0,6,9,12]])})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.value&&O.value.length>=3?(t=O.value.toLowerCase(),d.value=v.a.filter(m.value,(function(e){return!(!e.first_name||!e.first_name.toLowerCase().includes(t))||(!(!e.last_name||!e.last_name.toLowerCase().includes(t))||(!(!e.username||!e.username.toLowerCase().includes(t))||(!(!e.phone||!e.phone.toLowerCase().includes(t))||void 0)))}))):d.value=m.value;case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(f.f)((function(){j()})),{loading:c,state:t,friends:d,searchFriendInput:O,searchFriends:y}}}),j=O,y=r(35),component=Object(y.a)(j,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.friends&&e.friends.length>0?r(o.a,{staticClass:"mx-6 mt-6",attrs:{label:e.$t("form.search_friends"),placeholder:e.$t("form.search_friends"),"append-icon":"mdi-magnify",filled:"",rounded:""},nativeOn:{keyup:function(t){return e.searchFriends.apply(null,arguments)}},model:{value:e.searchFriendInput,callback:function(t){e.searchFriendInput=t},expression:"searchFriendInput"}}):e._e(),e._v(" "),e.friends&&e.friends.length>0?r(n.a,{attrs:{color:"transparent",rounded:""}},[e._l(e.friends,(function(u,t){return[r("UserListitem",{key:t,attrs:{user:u,urlBase:"/users/user/"},scopedSlots:e._u([{key:"action",fn:function(){return[r("UserActionsbtn",{attrs:{user:u}})]},proxy:!0}],null,!0)})]}))],2):r("div",[e.loading?e._e():r("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("chats.no_friends")}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{UserActionsbtn:r(842).default,UserListitem:r(792).default,ElementH4:r(429).default})}}]);