(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{1302:function(e,t,n){"use strict";n.r(t);var c=n(0),r=(n(16),n(6)),o=Object(r.b)({name:"NotificationsLastcheckedin",directives:{Touch:Touch},props:{publicUser:{type:Object,default:function(){}}},setup:function(e){var t=Object(r.q)().dispatch,n=Object(r.l)().$system,o=Object(r.i)(!1),l=Object(r.i)(!1),d=function(){var r=Object(c.a)(regeneratorRuntime.mark((function c(){var r,d,v;return regeneratorRuntime.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return o.value=!0,c.prev=1,c.next=4,t("user/checkins/getAll",null==e||null===(r=e.publicUser)||void 0===r?void 0:r.id);case 4:(d=c.sent)&&(l.value=null===(v=d[0])||void 0===v?void 0:v.updated_at),c.next=11;break;case 8:c.prev=8,c.t0=c.catch(1),n.log({comp:"NotificationsLastcheckedin",msg:"Not able to get checkins",val:c.t0});case 11:return c.prev=11,o.value=!1,c.finish(11);case 14:case"end":return c.stop()}}),c,null,[[1,8,11,14]])})));return function(){return r.apply(this,arguments)}}();return Object(r.f)((function(){d()})),{loading:o,getLatestCheckin:d,checkedInDate:l}}}),l=o,d=n(42),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.checkedInDate?n("div",{staticClass:"caption"},[e._v("\n  "+e._s(e.$t("notifications.checked_in_title"))+", "+e._s(e.checkedInDate)+"\n")]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);