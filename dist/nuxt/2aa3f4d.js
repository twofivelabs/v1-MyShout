(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{869:function(e,t,n){"use strict";n.r(t);var r=n(0),o=(n(14),n(97),n(4),n(53),n(43),n(60),n(33),n(32),n(17),n(64),n(68),n(35),n(5)),c=n(76),l=n.n(c);function f(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var v=Object(o.b)({name:"ChatUsername",props:{chat:{type:Object,default:function(){return{}}},loggedInUser:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(o.q)(),n=t.state,c=t.dispatch,title=Object(o.i)(e.chat.title),d=Object(o.a)((function(){var t=l.a.find(n.chats.all,{id:e.chat.id});return t?t.title:e.chat.title})),v=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){var r,o,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.title){t.next=3;break}return title.value=n.title,t.abrupt("return");case 3:title.value="",r=f(n.participants),t.prev=5,r.s();case 7:if((o=r.n()).done){t.next=16;break}if((l=o.value)===e.loggedInUser.uid){t.next=14;break}return t.next=12,c("user/getOne",l);case 12:(d=t.sent)&&(e.loggedInUser.uid?e.loggedInUser.uid:e.loggedInUser.data.uid?e.loggedInUser.data.uid:void 0)!==d.id&&(title.value=title.value+"@".concat(d.username," "));case 14:t.next=7;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(5),r.e(t.t0);case 21:return t.prev=21,r.f(),t.finish(21);case 24:case"end":return t.stop()}}),t,null,[[5,18,21,24]])})));return function(e){return t.apply(this,arguments)}}();return Object(o.f)(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(title.value){t.next=3;break}return t.next=3,v(e.chat);case 3:case"end":return t.stop()}}),t)})))),{title:title,titleN:d}}}),h=v,m=n(37),component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{},[e.titleN?n("span",[e._v(e._s(e.titleN))]):n("span",[e._v(e._s(e.title))])])}),[],!1,null,null,null);t.default=component.exports}}]);