(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{827:function(e,t,n){"use strict";n.r(t);var r=n(163),c=n(164),o=n(103),l=n(143),d=n(0),f=(n(14),n(4),n(46),n(58),n(5)),h=Object(f.b)({name:"UserActionsSendamessagebtn",props:{user:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(f.l)().$system,n=Object(f.q)(),r=n.state,c=n.dispatch,o=Object(f.i)(!1),dialog=Object(f.i)(!1),l=Object(f.a)((function(){return r.user.data})),h=Object(f.p)(),v=Object(f.i)([]),m=function(){var t=Object(d.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("chats/search",{field:"owner",operator:"==",term:l.value.uid}).then((function(t){if(t){var n=!1;return t.some((function(t){if(2===t.participants.length&&t.participants.includes(l.value.uid)&&t.participants.includes(e.user.id))return n=t,t})),n}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var n=Object(d.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,o.value=!0,n.next=4,m();case 4:if(!(r=n.sent)||!r.id){n.next=9;break}return n.next=8,h.push("/chats/chat/".concat(r.id));case 8:return n.abrupt("return");case 9:return v.value.push(l.value.uid),v.value.push(e.user.id),n.next=13,c("chats/add",{owner:l.value.uid,participants:v.value}).then(function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===t){e.next=3;break}return e.next=3,h.push("/chats/chat/".concat(t.id));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:n.next=18;break;case 15:n.prev=15,n.t0=n.catch(0),t.log({comp:"UserActionsSendamessagebtn",msg:"startChat",val:n.t0});case 18:return n.prev=18,o.value=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})));return function(){return n.apply(this,arguments)}}();return{loading:o,dialog:dialog,startChat:w}}}),v=h,m=n(37),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.startChat}},[e._t("default",(function(){return[n(c.a,{staticClass:"borderButton rounded-lg mb-2"},[n(l.a,[n(r.a,[e._v("mdi-message-text")])],1),e._v(" "),n(o.a,[n(o.c,[e._v(e._s(e.$t("chats.send_message")))])],1)],1)]}))],2)}),[],!1,null,null,null);t.default=component.exports}}]);