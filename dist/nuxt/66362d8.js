(window.webpackJsonp=window.webpackJsonp||[]).push([[29,51,55],{728:function(t,e,n){"use strict";n.r(e);var r=n(163),l={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(37),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},745:function(t,e,n){"use strict";n.r(e);var r={name:"ElementP",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"}}},l=n(37),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("p",{class:"text-"+t.align+" text-xl-body-1"},[t._v("\n  "+t._s(t.text)+"\n")])}),[],!1,null,null,null);e.default=component.exports},784:function(t,e,n){"use strict";n.r(e);var r=n(749),l=n(5),c=Object(l.b)({name:"IconsAccident",props:{width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),o=n(37),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(r.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",staticStyle:{"background-color":"var(--v-myshoutOrange-base)",border:"solid 0.5rem var(--v-myshoutOrange-base)",margin:"0 auto"},attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Accident.svg"}})}),[],!1,null,null,null);e.default=component.exports},937:function(t,e,n){"use strict";n.r(e);var r=n(693),l=n(725),c=n(724),o=n(276),d=n(749),v=n(722),f=n(0),m=(n(14),n(5)),x=Object(m.b)({name:"AlertAccidentbutton",setup:function(){var t=Object(m.q)(),e=t.state,n=t.dispatch,r=Object(m.l)(),l=r.$services,c=r.$system,o=r.$notify,d=r.i18n,v=Object(m.a)((function(){return e.user.data})),x=Object(m.a)((function(){return e.user.profile})),h=Object(m.i)(!1),dialog=Object(m.i)(!1),_=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,h.value=!0,t.next=4,l.alertButton("accident",{user:x.value,gps:x.value.gps});case 4:return t.prev=4,t.next=7,l.reverseGeocode(x.value.gps.lat,x.value.gps.lng);case 7:return e=t.sent,t.next=10,n("user/alerts/add",{type:"accident",userId:v.value.uid,gps:x.value.gps,location:e});case 10:t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),c.log({comp:"AlertAccidentbutton",msg:"Trying to send alert",val:t.t0}),o.show({text:d.t("notify.error_try_again"),color:"error"});case 16:return t.prev=16,h.value=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[4,12,16,19]])})));return function(){return t.apply(this,arguments)}}();return{loading:h,user:v,profile:x,dialog:dialog,openDialog:_}}}),h=x,_=n(37),component=Object(_.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n(r.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"myshoutOrange rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{click:function(e){return e.stopPropagation(),t.openDialog.apply(null,arguments)}}},[n(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Accident.svg"}}),t._v("\n    "+t._s(t.$t("accident_alert"))+"\n  ")],1),t._v(" "),n(o.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n(l.a,{staticClass:"rounded-xl pa-8"},[n("IconsAccident",{staticClass:"mb-7"}),t._v(" "),n("ElementH1",{attrs:{text:t.$t("alert_sent")}}),t._v(" "),n("ElementP",{attrs:{text:t.$t("notified_emergency_contacts_accident")}}),t._v(" "),(t.loading=!1)?n("div",[n(v.a,{attrs:{type:"actions"}})],1):n("div",{staticClass:"pa-3"},[n(c.a,{staticClass:"justify-center"},[n(r.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            "+t._s(t.$t("btn.close"))+"\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsAccident:n(784).default,ElementH1:n(728).default,ElementP:n(745).default})}}]);