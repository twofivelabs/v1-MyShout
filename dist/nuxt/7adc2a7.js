(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{751:function(e,t,n){var content=n(765);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(39).default)("2029faa0",content,!0,{sourceMap:!1})},756:function(e,t,n){"use strict";n.r(t);var r=n(266),o=n(723),c=n(720),l=n(693),f=n(163),d=n(749),v=(n(56),n(46),n(58),n(43),n(5)),m=Object(v.b)({name:"UserAvatar",props:{user:{type:Object,default:function(){return{}}},size:{type:Number,default:function(){return 50}},color:{type:String,default:function(){return"black"}}},setup:function(e){var t=Object(v.q)(),n=t.getters,r=t.state,o=Object(v.o)(),c=Object(v.a)((function(){return n["user/isLoggedIn"]})),l=Object(v.a)((function(){return r.user.profile.initial})),f=Object(v.a)((function(){return r.user.profile.photoURL})),d=Object(v.a)((function(){return r.user.profile})),m=Object(v.i)("offline"),h=Object(v.i)(!1),O=Object(v.i)("/users/user/".concat(e.user.id));r.user.profile.isOnline&&r.user.profile.isOnline.status&&(m.value=r.user.profile.isOnline.status),e.user&&(l=Object(v.a)((function(){return e.user.initial})),f=Object(v.a)((function(){return e.user.photoURL})),e.user.isOnline&&e.user.isOnline.status&&(m.value=e.user.isOnline.status)),d.value.id===e.user.id&&(O.value="/profile");return{isLoggedIn:c,initial:l,photo:f,goTo:O,onlineStatus:m,viewPhoto:h,tappedPhoto:function(){o.value.name.includes("users-user-id")&&(h.value=!0)}}}}),h=n(37),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{display:"inline-block"}},[n(o.a,{attrs:{top:"",dot:"",overlap:"",bordered:"","offset-x":"8","offset-y":"8",color:"online"===e.onlineStatus?"myshoutGreen":"myshoutRed"}},[n(r.a,{staticClass:"rounded-lg",attrs:{color:e.color,size:e.size,rounded:""}},[e.isLoggedIn?e.isLoggedIn&&e.photo?n(d.a,{attrs:{src:e.photo},on:{click:e.tappedPhoto}}):e.isLoggedIn?n("span",{staticClass:"white--text headline"},[e._v(e._s(e.initial))]):e._e():n(f.a,{attrs:{dark:""}},[e._v("\n        mdi-account\n      ")])],1)],1),e._v(" "),e.viewPhoto?n(c.a,{staticClass:"elevation-0",staticStyle:{"box-shadow":"none !important"},attrs:{"hide-overlay":!0,scrollable:!1,width:"100%","max-width":"700"},model:{value:e.viewPhoto,callback:function(t){e.viewPhoto=t},expression:"viewPhoto"}},[n("div",{staticStyle:{"margin-bottom":"45%"}},[n(d.a,{staticClass:"elevation-12 rounded-lg mx-1",attrs:{src:e.photo}}),e._v(" "),n("div",{staticClass:"text-center"},[n(l.a,{staticClass:"mt-n7",attrs:{color:"primary",fab:""},on:{click:function(t){e.viewPhoto=!e.viewPhoto}}},[n(f.a,[e._v("mdi-close")])],1)],1)],1)]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},759:function(e,t,n){"use strict";n.r(t);var r=n(164),o=n(264),c=n(103),l=n(5),f=Object(l.b)({name:"UserListitem",props:{user:{type:Object,default:function(){return{}}},urlBase:{type:String,default:function(){return"/users/user/"}}},setup:function(e){var t=Object(l.q)().state,n=Object(l.i)(!1),r=Object(l.i)(!1),o=Object(l.i)(),dialog=Object(l.i)(!1),c=Object(l.a)((function(){return t.user.data})),f=Object(l.i)(!1),d=Object(l.i)();return Object(l.f)((function(){c.value.uid===e.user.id&&(f.value=!0,d.value="/profile")})),{loading:n,chat:o,showBottomSheet:r,dialog:dialog,isMe:f,goTo:d}}}),d=(n(764),n(37)),component=Object(d.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(r.a,[n("NuxtLink",{attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id}},[n("UserAvatar",{staticClass:"mr-5",attrs:{user:e.user}})],1),e._v(" "),n("NuxtLink",{staticStyle:{width:"100%"},attrs:{to:e.goTo?e.goTo:""+e.urlBase+e.user.id,color:"myshoutDarkGrey"}},[n(c.a,[n(c.c,{staticClass:"username myshoutDarkGrey--text",domProps:{innerHTML:e._s(e.user&&e.user.username?"@"+e.user.username:e.user.first_name)}})],1)],1),e._v(" "),n(o.a,{staticClass:"mr-3"},[e._t("action")],2)],1)}),[],!1,null,"83a04722",null);t.default=component.exports;installComponents(component,{UserAvatar:n(756).default})},764:function(e,t,n){"use strict";n(751)},765:function(e,t,n){var r=n(38)(!1);r.push([e.i,".username[data-v-83a04722]{font-size:19px;font-weight:600}",""]),e.exports=r},948:function(e,t,n){"use strict";n.r(t);var r=n(263),o=n(0),c=(n(14),n(5)),l=Object(c.b)({name:"UserAccountEmergency",middleware:"authenticated",setup:function(){var e=Object(c.q)(),t=e.state,n=e.dispatch,r=Object(c.l)().$system,l=Object(c.a)((function(){return t.user.data})),f=Object(c.i)(!1),d=Object(c.i)(),v=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,f.value=!0,e.next=4,n("user/friends/getAll",{where:[{field:"isEmergency",op:"==",value:!0}],uid:l.value.uid}).then((function(e){d.value=e}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),r.log({comp:"UserAccountEmergency",msg:"getFriends",val:e.t0});case 9:return e.prev=9,f.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[0,6,9,12]])})));return function(){return e.apply(this,arguments)}}();return Object(c.f)((function(){v()})),{loading:f,state:t,friends:d}}}),f=l,d=n(37),component=Object(d.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.friends&&Object.keys(e.friends).length>0?n(r.a,{attrs:{color:"transparent",rounded:""}},[e._l(e.friends,(function(u,t){return[n("UserListitem",{key:t,attrs:{user:u,urlBase:"/users/user/"},scopedSlots:e._u([{key:"action",fn:function(){return[n("UserActionsbtn",{attrs:{user:u}})]},proxy:!0}],null,!0)})]}))],2):n("div",[e.loading?e._e():n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:e.$t("no_emergency_friends")}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{UserActionsbtn:n(811).default,UserListitem:n(759).default,ElementH4:n(400).default})}}]);