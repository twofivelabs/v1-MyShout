(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{993:function(e,t,n){"use strict";n.r(t);var r=n(763),c=n(741),l=n(174),o=n(0),d=(n(16),n(19),n(5)),m=Object(d.b)({name:"ChatUploadimage",props:{chat:{type:Object,default:function(){return{}}},currentUrl:{type:String,default:function(){return null}}},emits:["url"],setup:function(e,t){var n=t.emit,r=Object(d.l)(),c=r.$capacitor,l=r.$db,m=Object(d.i)(!1),v=Object(d.i)(!1),f=Object(d.i)(),h=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return m.value=!0,v.value=!1,t.prev=2,t.next=5,c.cameraTakePicture(!1);case 5:return r=t.sent,t.next=8,l.upload({path:"/CHATS/".concat(e.chat.id,"/").concat((new Date).getTime(),".jpg"),data:r,base64:!0});case 8:(o=t.sent)&&(v.value=!0,f.value=o,n("url",f.value)),t.next=14;break;case 12:t.prev=12,t.t0=t.catch(2);case 14:return t.prev=14,m.value=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[2,12,14,17]])})));return function(){return t.apply(this,arguments)}}();return Object(d.s)((function(){v.value=!!e.currentUrl})),{loadImageHandler:h,imageButtonLoading:m,imageAddedToMessage:v,imageMessageUrl:f}}}),v=m,f=n(36),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(c.a,{staticClass:"pa-0",attrs:{loading:e.imageButtonLoading,color:"transparent",elevation:"0",small:"",fab:""},on:{click:e.loadImageHandler}},[n(r.a,{attrs:{content:1,value:e.imageAddedToMessage,color:"green",overlap:""}},[n(l.a,[e._v("\n      mdi-image\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);