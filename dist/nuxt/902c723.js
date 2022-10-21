(window.webpackJsonp=window.webpackJsonp||[]).push([[161,70,74],{1043:function(t,e,n){"use strict";n(964)},1044:function(t,e,n){var r=n(38)(!1);r.push([t.i,".vue-google-map[data-v-e4c46ff4],.vue-google-map .map-view[data-v-e4c46ff4]{height:100vh}",""]),t.exports=r},1164:function(t,e,n){"use strict";n.r(e);var r=n(718),o=n(753),l=n(717),c=n(724),d=n(0),v=(n(66),n(16),n(3)),f=Object(v.b)({name:"HomePage",middleware:"authenticated",transition:function(t,e){return e&&+t.query.page<+e.query.page?"slide-right":"slide-left"},setup:function(){var t=Object(v.r)(),e=t.state,n=t.dispatch,r=Object(v.m)(),o=r.$config,l=r.$capacitor,c=Object(v.i)(!1),f=Object(v.a)((function(){return e.user})),m=Object(v.a)((function(){return e.user.location})),h=Object(v.i)([]);return l.gpsCheckPermissions().then(function(){var t=Object(d.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=4;break}return console.log("STICKY: GPS > HAS PERMISSIONS"),t.next=4,l.gpsGetCurrentPosition((function(t){console.log("STICKY: GPS > ",t)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object(v.f)((function(){setTimeout((function(){n("user/checkUserData")}),2500)})),l.microphonePermissions(),l.pushNotificationsRequestAndRegisterPermissions()&&console.log("STICKY: Notifications > Granted"),Object(v.o)({title:"".concat(o.appTitle),meta:[{hid:"description",name:"description",content:""}]}),{loading:c,user:f,location:m,posts:h}},head:{}}),m=f,h=(n(1043),n(43)),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(o.a,{staticClass:"mobileNotch",staticStyle:{height:"calc(100vh - 75px)"}},[t.loading?n(l.a,{staticClass:"pa-6"},[n(r.a,[n(c.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"90",type:"image"}}),t._v(" "),n(c.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"90",type:"image"}}),t._v(" "),n(c.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"90",type:"image"}}),t._v(" "),n(c.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"90",type:"image"}})],1)],1):n("div",{staticClass:"mx-5 pt-2"},[n("div",{staticClass:"d-flex flex-column justify-space-between",staticStyle:{height:"75vh"}},[n("div",[n("div",{staticClass:"d-flex d-inline-flex align-center"},[n("IconsMinishout",{staticClass:"mr-2"}),t._v(" "),n("ElementH1",{attrs:{align:"left",text:"Emergency Alerts"}})],1),t._v(" "),n("ElementP",{attrs:{align:"left",text:"By pressing any of the following alerts, you'll be notifying all your emergency contacts your last known location."}})],1),t._v(" "),n("div",[n("AlertAccidentbutton"),t._v(" "),n("AlertKidnappingbutton"),t._v(" "),n("AlertRobberybutton")],1),t._v(" "),n("AlertShoutbutton")],1)])],1)}),[],!1,null,"e4c46ff4",null);e.default=component.exports;installComponents(component,{IconsMinishout:n(992).default,ElementH1:n(731).default,ElementP:n(741).default,AlertAccidentbutton:n(993).default,AlertKidnappingbutton:n(994).default,AlertRobberybutton:n(995).default,AlertShoutbutton:n(996).default})},731:function(t,e,n){"use strict";n.r(e);var r=n(158),o={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},l=n(43),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},741:function(t,e,n){"use strict";n.r(e);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},o=n(43),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("p",{class:"text-"+t.align+" text-xl-body-1"},[t._v("\n  "+t._s(t.text)+"\n")])}),[],!1,null,null,null);e.default=component.exports},794:function(t,e,n){"use strict";n.r(e);var r=n(740),o=n(3),l=Object(o.b)({name:"IconsAccident",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(43),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutOrange-base)",border:"solid 0.5rem var(--v-myshoutOrange-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Accident.svg"}})}),[],!1,null,null,null);e.default=component.exports},795:function(t,e,n){"use strict";n.r(e);var r=n(740),o=n(3),l=Object(o.b)({name:"IconsKidnapping",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(43),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutRed-base)",border:"solid 0.5rem var(--v-myshoutRed-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Kidnapping.svg"}})}),[],!1,null,null,null);e.default=component.exports},796:function(t,e,n){"use strict";n.r(e);var r=n(740),o=n(3),l=Object(o.b)({name:"IconsRobbery",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(43),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutGreen-base)",border:"solid 0.5rem var(--v-myshoutGreen-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Robbery.svg"}})}),[],!1,null,null,null);e.default=component.exports},797:function(t,e,n){"use strict";n.r(e);var r=n(740),o=n(3),l=Object(o.b)({name:"IconsShout",props:{styling:{type:Boolean,default:!0},width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(43),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",style:t.styling?"background-color:var(--v-myshoutBlue-base); border:solid 0.5rem var(--v-myshoutBlue-base); margin:0 auto;":"",attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Shout.svg"}})}),[],!1,null,null,null);e.default=component.exports},964:function(t,e,n){var content=n(1044);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(39).default)("3821460f",content,!0,{sourceMap:!1})},992:function(t,e,n){"use strict";n.r(e);var r=n(740),o=n(3),l=Object(o.b)({name:"IconsMinishout",props:{width:{type:String,default:function(){return"3rem"}}},setup:function(){}}),c=n(43),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/logo/MyShout-Logo.svg"}})}),[],!1,null,null,null);e.default=component.exports},993:function(t,e,n){"use strict";n.r(e);var r=n(695),o=n(732),l=n(725),c=n(267),d=n(740),v=n(724),f=n(0),m=(n(16),n(3)),h=Object(m.b)({name:"AlertAccidentbutton",setup:function(){var t=Object(m.r)(),e=t.state,n=t.dispatch,r=Object(m.m)(),o=r.$services,l=r.$system,c=r.$notify,d=Object(m.a)((function(){return e.user.data})),v=Object(m.a)((function(){return e.user.profile})),h=Object(m.i)(!1),dialog=Object(m.i)(!1),y=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,h.value=!0,t.next=4,o.alertButton("accident",{user:v.value,gps:v.value.gps});case 4:return t.prev=4,t.next=7,o.reverseGeocode(v.value.gps.lat,v.value.gps.lng);case 7:return e=t.sent,t.next=10,n("user/alerts/add",{type:"accident",userId:d.value.uid,gps:v.value.gps,location:e});case 10:t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),l.log({comp:"AlertAccidentbutton",msg:"Trying to send alert",val:t.t0}),c.show({text:"Error, try again",color:"error"});case 16:return t.prev=16,h.value=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[4,12,16,19]])})));return function(){return t.apply(this,arguments)}}();return{loading:h,user:d,profile:v,dialog:dialog,openDialog:y}}}),y=h,x=n(43),component=Object(x.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"myshoutOrange rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{click:function(e){return e.stopPropagation(),t.openDialog.apply(null,arguments)}}},[n(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Accident.svg"}}),t._v("\n    Accident Alert\n  ")],1),t._v(" "),n(c.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n(o.a,{staticClass:"rounded-xl pa-8"},[n("IconsAccident",{staticClass:"mb-7"}),t._v(" "),n("ElementH1",{attrs:{text:"Alert sent"}}),t._v(" "),n("ElementP",{attrs:{text:"We have notified your emergency contacts of your accident. Please call them as soon as you have the opportunity."}}),t._v(" "),(t.loading=!1)?n("div",[n(v.a,{attrs:{type:"actions"}})],1):n("div",{staticClass:"pa-3"},[n(l.a,{staticClass:"justify-center"},[n(r.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsAccident:n(794).default,ElementH1:n(731).default,ElementP:n(741).default})},994:function(t,e,n){"use strict";n.r(e);var r=n(695),o=n(732),l=n(725),c=n(267),d=n(740),v=n(724),f=n(0),m=(n(16),n(3)),h=Object(m.b)({name:"AlertKidnappingbutton",setup:function(){var t=Object(m.r)(),e=t.state,n=t.dispatch,r=Object(m.m)(),o=r.$services,l=r.$system,c=r.$notify,d=Object(m.a)((function(){return e.user.data})),v=Object(m.a)((function(){return e.user.profile})),h=Object(m.i)(!1),dialog=Object(m.i)(!1),y=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,h.value=!0,t.next=4,o.alertButton("kidnapping",{user:v.value,gps:v.value.gps});case 4:return t.prev=4,t.next=7,o.reverseGeocode(v.value.gps.lat,v.value.gps.lng);case 7:return e=t.sent,t.next=10,n("user/alerts/add",{type:"kidnapping",userId:d.value.uid,gps:v.value.gps,location:e});case 10:t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),l.log({comp:"AlertKidnappingbutton",msg:"Trying to send alert",val:t.t0}),c.show({text:"Error, try again",color:"error"});case 16:return t.prev=16,h.value=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[4,12,16,19]])})));return function(){return t.apply(this,arguments)}}();return{loading:h,user:d,profile:v,dialog:dialog,openDialog:y}}}),y=h,x=n(43),component=Object(x.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"myshoutRed rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{click:function(e){return e.stopPropagation(),t.openDialog.apply(null,arguments)}}},[n(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Kidnapping.svg"}}),t._v("\n    Kidnapping Alert\n  ")],1),t._v(" "),n(c.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n(o.a,{staticClass:"rounded-xl pa-8"},[n("IconsKidnapping",{staticClass:"mb-7"}),t._v(" "),n("ElementH1",{attrs:{text:"Alert sent"}}),t._v(" "),n("ElementP",{attrs:{text:"We have notified your emergency contacts of your kidnapping. Please call them as soon as you have the opportunity."}}),t._v(" "),t.loading?n("div",[n(v.a,{attrs:{type:"actions"}})],1):n("div",{staticClass:"pt-4 pa-2"},[n(l.a,{staticClass:"justify-center"},[n(r.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsKidnapping:n(795).default,ElementH1:n(731).default,ElementP:n(741).default})},995:function(t,e,n){"use strict";n.r(e);var r=n(695),o=n(732),l=n(725),c=n(267),d=n(740),v=n(724),f=n(0),m=(n(16),n(3)),h=Object(m.b)({name:"AlertRobberybutton",setup:function(){var t=Object(m.r)(),e=t.state,n=t.dispatch,r=Object(m.m)(),o=r.$services,l=r.$system,c=r.$notify,d=Object(m.a)((function(){return e.user.data})),v=Object(m.a)((function(){return e.user.profile})),h=Object(m.i)(!1),dialog=Object(m.i)(!1),y=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,h.value=!0,t.next=4,o.alertButton("robbery",{user:v.value,gps:v.value.gps});case 4:return t.prev=4,t.next=7,o.reverseGeocode(v.value.gps.lat,v.value.gps.lng);case 7:return e=t.sent,t.next=10,n("user/alerts/add",{type:"robbery",userId:d.value.uid,gps:v.value.gps,location:e});case 10:t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),l.log({comp:"AlertRobberybutton",msg:"Trying to send alert",val:t.t0}),c.show({text:"Error, try again",color:"error"});case 16:return t.prev=16,h.value=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[4,12,16,19]])})));return function(){return t.apply(this,arguments)}}();return{loading:h,user:d,profile:v,dialog:dialog,openDialog:y}}}),y=h,x=n(43),component=Object(x.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"myshoutGreen rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{click:function(e){return e.stopPropagation(),t.openDialog.apply(null,arguments)}}},[n(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Robbery.svg"}}),t._v("\n    Robbery Alert\n  ")],1),t._v(" "),n(c.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n(o.a,{staticClass:"rounded-xl pa-8"},[n("IconsRobbery",{staticClass:"mb-7"}),t._v(" "),n("ElementH1",{attrs:{text:"Alert sent"}}),t._v(" "),n("ElementP",{attrs:{text:"We have notified your emergency contacts of your robbery. Please call them as soon as you have the opportunity."}}),t._v(" "),t.loading?n("div",[n(v.a,{attrs:{type:"actions"}})],1):n("div",{staticClass:"pa-3"},[n(l.a,{staticClass:"justify-center"},[n(r.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsRobbery:n(796).default,ElementH1:n(731).default,ElementP:n(741).default})},996:function(t,e,n){"use strict";n.r(e);var r=n(695),o=n(732),l=n(725),c=n(267),d=n(740),v=n(724),f=n(0),m=(n(66),n(29),n(16),n(3)),h=Object(m.b)({name:"AlertShoutbutton",setup:function(){var t=Object(m.r)(),e=t.state,n=t.dispatch,r=Object(m.m)(),o=r.$services,l=r.$system,c=r.$notify,d=r.$db,v=r.$capacitor,h=Object(m.a)((function(){return e.user.data})),y=Object(m.a)((function(){return e.user.profile})),x=Object(m.i)(!1),dialog=Object(m.i)(!1),w=Object(m.i)("Shout Alert"),O=Object(m.i)(null),j=Object(m.i)(5),_=Object(m.i)(),S=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,x.value=!0,t.next=4,o.alertButton("shout",{user:y.value,gps:y.value.gps});case 4:return t.prev=4,t.next=7,o.reverseGeocode(y.value.gps.lat,y.value.gps.lng);case 7:return e=t.sent,t.next=10,n("user/alerts/add",{type:"shout",audioUrl:O.value,userId:h.value.uid,gps:y.value.gps,location:e});case 10:t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),l.log({comp:"AlertShoutbutton",msg:"Trying to send alert",val:t.t0}),c.show({text:"Error, try again",color:"error"});case 16:return t.prev=16,x.value=!1,w.value="Shout Alert",t.finish(16);case 20:case"end":return t.stop()}}),t,null,[[4,12,16,20]])})));return function(){return t.apply(this,arguments)}}(),C=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("STICKY: START RECORDING"),w.value="Recording... 5 sec.",t.next=4,v.microphoneStart();case 4:_.value=setInterval((function(){j.value--,w.value="Recording... ".concat(j.value," sec."),0===j.value&&k()}),1e3);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),k=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var audio;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("STICKY: STOP RECORDING",_.value),clearInterval(_.value),j.value=5,w.value="Shout Alert",t.prev=4,t.next=7,v.microphoneStop();case 7:if(!(audio=t.sent)){t.next=17;break}return console.log("STICKY: ADD SHOUT TO","/USERS/".concat(h.value.uid,"/shouts/").concat(Date.now(),".wav")),t.next=12,d.upload({path:"/USERS/".concat(h.value.uid,"/shouts/").concat(Date.now(),".wav"),data:audio.recordDataBase64,base64:!0});case 12:return O.value=t.sent,t.next=15,S();case 15:t.next=18;break;case 17:c.show({text:"No audio",color:"error"});case 18:t.next=22;break;case 20:t.prev=20,t.t0=t.catch(4);case 22:case"end":return t.stop()}}),t,null,[[4,20]])})));return function(){return t.apply(this,arguments)}}();return{loading:x,user:h,profile:y,dialog:dialog,openDialog:S,startRecording:C,stopRecording:k,buttonText:w,timerCount:j}}}),y=h,x=n(43),component=Object(x.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"primary rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{mousedown:t.startRecording,mouseup:t.stopRecording,touchstart:t.startRecording,touchend:t.stopRecording}},[n(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Shout.svg"}}),t._v("\n    "+t._s(t.buttonText)+"\n  ")],1),t._v(" "),n("div",{staticClass:"text-center gray--text caption mt-n4"},[t._v("\n    Hold To Send A 5 Second Audio Record\n  ")]),t._v(" "),n(c.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n(o.a,{staticClass:"rounded-xl pa-8"},[n("IconsShout",{staticClass:"mb-7"}),t._v(" "),n("ElementH1",{attrs:{text:"Your Shout alert has been sent"}}),t._v(" "),t.loading?n("div",[n(v.a,{attrs:{type:"actions"}})],1):n("div",{staticClass:"pa-3"},[n(l.a,{staticClass:"justify-center"},[n(r.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsShout:n(797).default,ElementH1:n(731).default})}}]);