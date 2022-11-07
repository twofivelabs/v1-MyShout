(window.webpackJsonp=window.webpackJsonp||[]).push([[20,45],{728:function(t,e,n){"use strict";n.r(e);var r=n(163),l={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},o=n(37),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},783:function(t,e,n){"use strict";n.r(e);var r=n(750),l=n(5),o=Object(l.b)({name:"IconsAccident",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(37),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutOrange-base)",border:"solid 0.5rem var(--v-myshoutOrange-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Accident.svg"}})}),[],!1,null,null,null);e.default=component.exports},784:function(t,e,n){"use strict";n.r(e);var r=n(750),l=n(5),o=Object(l.b)({name:"IconsKidnapping",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(37),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutRed-base)",border:"solid 0.5rem var(--v-myshoutRed-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Kidnapping.svg"}})}),[],!1,null,null,null);e.default=component.exports},785:function(t,e,n){"use strict";n.r(e);var r=n(750),l=n(5),o=Object(l.b)({name:"IconsRobbery",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(37),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutGreen-base)",border:"solid 0.5rem var(--v-myshoutGreen-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Robbery.svg"}})}),[],!1,null,null,null);e.default=component.exports},786:function(t,e,n){"use strict";n.r(e);var r=n(750),l=n(5),o=Object(l.b)({name:"IconsShout",props:{styling:{type:Boolean,default:!0},width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=n(37),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",style:t.styling?"background-color:var(--v-myshoutBlue-base); border:solid 0.5rem var(--v-myshoutBlue-base); margin:0 auto;":"",attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Shout.svg"}})}),[],!1,null,null,null);e.default=component.exports},794:function(t,e,n){"use strict";n.r(e);var r=n(750),l=(n(55),n(5)),o=Object(l.b)({name:"MapGmbasic",props:{lat:{type:Number,default:function(){return null}},lng:{type:Number,default:function(){return null}},user:{type:Object,default:function(){return{}}}},setup:function(){return{loading:Object(l.i)(!1)}}}),c=n(37),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.lat&&t.lng?n("div",[n("a",{attrs:{target:"_blank",href:"https://www.google.com/maps/search/?api=1&query="+t.lat+","+t.lng}},[n(r.a,{staticClass:"mx-auto",attrs:{width:"600",src:"https://maps.googleapis.com/maps/api/staticmap?center="+t.lat+","+t.lng+"&zoom=16&scale=1&size=600x500&maptype=hybrid&key="+t.$config.google.mapsApiKey+"&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C"+t.lat+","+t.lng,alt:"Google Map of "+t.lat+","+t.lng}})],1)]):n("div",[n("ElementH4",{staticClass:"my-5",attrs:{align:"center",text:t.$t("gps.user_no_location")}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ElementH4:n(399).default})},866:function(t,e,n){"use strict";n.r(e);var r=n(720),l=n(717),o=n(752),c=n(163),d=n(716),v=n(75),m=n(281),_=n(5),f=Object(_.b)({name:"AdminDashboard",middleware:"admin",directives:{Touch:m.a},props:{alert:{type:Object,default:function(){return{}}},loadedUsers:{type:Object,default:function(){return{}}}},setup:function(){var t=Object(_.q)().state,e=Object(_.l)().$system,n=Object(_.i)(!0),r=Object(_.a)((function(){return t.user})),l=Object(_.i)(r.value.data.role.isAdmin),o=Object(_.i)(r.value.data.role.isVendor),c=Object(_.i)(r.value.data.role.isDriver),d=Object(_.i)(),v=Object(_.i)(!1);return{isAdmin:l,isVendor:o,isDriver:c,loading:n,showBottomSheet:v,formatDate:function(t){try{return t.created_at.toDate().toDateString()}catch(e){return"string"==typeof t?t:new Date(1e3*t.seconds).toDateString()}},rowClick:function(t){try{n.value=!0,d.value=t,v.value=!0}catch(t){e.log({comp:"AdminDashboard",msg:"viewAlertDetails",val:t})}finally{n.value=!1}},swipe:function(t){"Down"===t&&(v.value=!1)}}}}),h=n(37),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(o.a,[t.alert?n("div",[n(d.a,{staticClass:"elevation-1 rounded-lg white align-center mb-1 mx-1",on:{click:function(e){return t.rowClick(t.alert)}}},[n(l.a,{attrs:{cols:"3"}},["accident"===t.alert.type?n("div",{},[n("IconsAccident",{attrs:{width:"45px"}})],1):t._e(),t._v(" "),"kidnapping"===t.alert.type?n("div",{},[n("IconsKidnapping",{attrs:{width:"45px"}})],1):t._e(),t._v(" "),"robbery"===t.alert.type?n("div",{},[n("IconsRobbery",{attrs:{width:"45px"}})],1):t._e(),t._v(" "),"shout"===t.alert.type?n("div",{},[n("IconsShout",{attrs:{width:"45px"}})],1):t._e()]),t._v(" "),n(l.a,[n("div",{staticClass:"d-flex align-center justify-space-between"},[t.loadedUsers[t.alert.userId]?n("div",{staticClass:"user"},[t._v("@"+t._s(t.loadedUsers[t.alert.userId].username))]):t._e(),t._v(" "),t.alert.created_at?n("div",{staticClass:"caption grey--text created_at"},[t._v(t._s(t.formatDate(t.alert.created_at)))]):t._e()]),t._v(" "),n("div",{staticClass:"d-flex align-center justify-space-between"},[t.alert.location?n("div",{staticStyle:{"font-size":"12px"}},[t._v("\n              "+t._s(t.alert.location.city)+"\n              "+t._s(t.alert.location.province)+"\n              "+t._s(t.alert.location.country)+"\n            ")]):t._e(),t._v(" "),n("a",{attrs:{target:"_blank",href:"https://www.google.com/maps/search/?api=1&query="+t.alert.gps.lat+","+t.alert.gps.lng}},[n(c.a,{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)])])],1),t._v(" "),t.alert?n(r.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:t.showBottomSheet,callback:function(e){t.showBottomSheet=e},expression:"showBottomSheet"}},[n(v.a,{staticClass:"rounded-t-xl pb-14",attrs:{height:"80vh"}},[n("div",{staticClass:"ma-3"},[n("GlobalSlidebar",{directives:[{def:m.b,name:"touch",rawName:"v-touch",value:{down:function(){return t.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(e){return t.swipe("Down")}}}),t._v(" "),t.loading?n("ElementH3",{attrs:{align:"center",text:t.$t("is_loading")}}):t._e(),t._v(" "),n("ElementH1",{attrs:{align:"center",text:t.$t("alert_details")}}),t._v(" "),"accident"===t.alert.type?n("IconsAccident",{attrs:{width:"60"}}):t._e(),t._v(" "),"kidnapping"===t.alert.type?n("IconsKidnapping",{attrs:{width:"60"}}):t._e(),t._v(" "),"robbery"===t.alert.type?n("IconsRobbery",{attrs:{width:"60"}}):t._e(),t._v(" "),"shout"===t.alert.type?n("IconsShout",{attrs:{width:"60"}}):t._e(),t._v(" "),n("div",{staticClass:"text-center my-3"},[t.alert.created_at?n("span",{staticClass:"caption"},[n(c.a,[t._v("mdi-calendar")]),t._v("\n              "+t._s(t.formatDate(t.alert.created_at))+"\n            ")],1):t._e(),t._v(" "),n("span",{staticClass:"caption"},[n(c.a,[t._v("mdi-map")]),t._v("\n              "+t._s(t.alert.gps.lat)+", "+t._s(t.alert.gps.lng)+"\n            ")],1),t._v(" "),t.loadedUsers[t.alert.userId]?n("span",{staticClass:"caption"},[n("nuxt-link",{attrs:{to:"/admin/users/view/"+t.alert.userId}},[n(c.a,[t._v("mdi-account")]),t._v(" "),t.loadedUsers[t.alert.userId]?n("span",{staticClass:"user"},[t._v("@"+t._s(t.loadedUsers[t.alert.userId].username))]):t._e()],1)],1):t._e()]),t._v(" "),t.alert.location?n("div",{staticClass:"text-center mb-3"},[t._v("\n            "+t._s(t.alert.location.city)+",\n            "+t._s(t.alert.location.province)+",\n            "+t._s(t.alert.location.country)+"\n          ")]):t._e(),t._v(" "),t.alert.audioUrl?n("div",{staticClass:"my-7 text-center"},[n("audio",{staticStyle:{"min-width":"220px"},attrs:{src:t.alert.audioUrl,controls:""}})]):t._e(),t._v(" "),n("MapGmbasic",{attrs:{lat:t.alert.gps.lat,lng:t.alert.gps.lng}})],1)])],1):t._e()],1):t._e()])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsAccident:n(783).default,IconsKidnapping:n(784).default,IconsRobbery:n(785).default,IconsShout:n(786).default,GlobalSlidebar:n(400).default,ElementH3:n(395).default,ElementH1:n(728).default,MapGmbasic:n(794).default})}}]);