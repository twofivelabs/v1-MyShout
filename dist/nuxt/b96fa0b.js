(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{1090:function(e,t,r){"use strict";r.r(t);var n=r(273),c=r(0),o=(r(14),r(7)),l=Object(o.b)({name:"ChatMessageReply",props:{chat:{type:Object,default:function(){return{}}},participants:{type:Object,default:function(){return{}}},message:{type:Object,default:function(){return{}}},details:{type:Boolean,default:function(){return!1}}},setup:function(e){var t=Object(o.q)().state,r=Object(o.l)(),n=r.$encryption,l=r.$fire,d=Object(o.a)((function(){return t.user.data.uid})),f=Object(o.i)([]);return Object(o.r)((function(){return e.message}),function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(r){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r||!r.replyTo){t.next=5;break}return t.next=3,l.firestore.collection("Chats").doc(e.chat.id).collection("Messages").doc(r.replyTo).get();case 3:n=t.sent,f.value=n.data();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{immediate:!0}),Object(o.r)(f,function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r&&r.message&&r.owner&&(f.value.message=n.decrypt(f.value.message),f.value.owner=e.participants[f.value.owner]);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{immediate:!0}),{userId:d,reply:f}}}),d=l,f=r(58),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.message&&e.reply?r("div",{class:["caption pb-2",e.details||e.message.owner!==e.userId?"d-flex":"d-flex flex-row-reverse text-right"]},[r("div",[r("div",[e._v("You replied to "+e._s(e.reply.owner?e.reply.owner.username:""))]),e._v(" "),r("div",{staticClass:" pa-2 rounded-lg",staticStyle:{border:"1px solid #e3e3e3"}},[r(n.a,{attrs:{small:""}},[e._v("mdi-reply")]),e._v("        \n      "+e._s(e.reply.message?e.reply.message:"")+"\n    ")],1)])]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);