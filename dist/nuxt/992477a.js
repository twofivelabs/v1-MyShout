(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{881:function(e,n,t){"use strict";t.r(n);var l=t(693),o=t(163),r=t(5),c=t(869),d=Object(r.b)({name:"ChatPlayaudio",props:{file:{type:String,default:function(){return null}}},setup:function(e){var n=Object(r.l)().$fire,t=Object(r.i)(!1),l=Object(r.i)();return{isPlaying:t,playAudio:function(){t.value=!0;var o=n.auth.currentUser;l.value=new c.Howl({src:[e.file],html5:!0,volume:1,xhr:{method:"POST",headers:{Authorization:"Bearer:"+o.refreshToken},withCredentials:!0},onend:function(){console.log("Finished!"),t.value=!1}}),l.value.play()},stopAudio:function(){l.value.stop(),t.value=!1}}}}),f=t(37),component=Object(f.a)(d,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("span",[t(l.a,{attrs:{fab:""},on:{click:function(n){return e.playAudio()}}},[e.isPlaying?t(o.a,[e._v("mdi-motion-play mdi-spin")]):t(o.a,[e._v("mdi-play-circle")])],1),e._v(" "),e.isPlaying?t(l.a,{attrs:{fab:"",small:"",plain:""},on:{click:function(n){return e.stopAudio()}}},[t(o.a,[e._v("mdi-close")])],1):e._e()],1)}),[],!1,null,null,null);n.default=component.exports}}]);