(window.webpackJsonp=window.webpackJsonp||[]).push([[106,69],{1106:function(e,t,n){"use strict";var o=n(1083),r=n(186),c=n(27);t.a=Object(c.a)(o.a,Object(r.a)("slideGroup")).extend({name:"v-slide-item"})},1107:function(e,t,n){"use strict";var o=n(303),r=n(67),c=n(27),l=n(28);t.a=Object(c.a)(o.a,r.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(l.c)("v-hover should only contain a single element",this),element)):(Object(l.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},1306:function(e,t,n){"use strict";n.r(t);var o=n(763),r=n(762),c=n(759),l=n(1107),d=n(758),v=n(757),f=n(1042),h=n(1106),m=n(0),_=(n(16),n(52),n(57)),y=n.n(_),x=n(6),w=Object(x.b)({name:"PostRecent",props:{companyId:{type:String,default:function(){return null}},limit:{type:Number,default:function(){return 5}}},setup:function(e){var t=Object(x.q)().dispatch,n=Object(x.l)(),o=n.$system,r=n.$vuetify,c=Object(x.i)(!1),l=Object(x.a)((function(){return r.breakpoint.smAndDown?2:3})),d=Object(x.i)([]);return Object(x.m)(Object(m.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,c.value=!0,!e.companyId){n.next=7;break}return n.next=5,t("posts/getAll",{where:{field:"company.id",op:"==",value:e.companyId},limit:e.limit}).then((function(e){!1!==e&&(d.value=y.a.cloneDeep(e))}));case 5:n.next=9;break;case 7:return n.next=9,t("posts/getAll",{where:{field:"published",op:"==",value:!0},limit:e.limit}).then((function(e){!1!==e&&(d.value=y.a.cloneDeep(e))}));case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),o.log({comp:"PostRecent",msg:"useFetch",val:n.t0});case 14:return n.prev=14,c.value=!1,n.finish(14);case 17:case"end":return n.stop()}}),n,null,[[0,11,14,17]])})))),{loading:c,howManyPlaceholders:l,posts:d}}}),j=n(42),component=Object(j.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loading?n("div",[n(d.a,{staticClass:"mt-4"},e._l(e.howManyPlaceholders,(function(e){return n(c.a,{key:e,attrs:{cols:"6",sm:"4"}},[n(v.a,{attrs:{"max-width":"200",type:"card"}})],1)})),1)],1):e.posts&&e.posts.length>0?n("div",[n(f.b,{staticClass:"pa-0 ",attrs:{"show-arrows":e.$vuetify.breakpoint.mdAndUp,"active-class":"success","center-active":""}},e._l(e.posts,(function(t,c){return n(h.a,{key:c},[n(l.a,{scopedSlots:e._u([{key:"default",fn:function(c){var l=c.hover;return[n(o.a,{staticClass:"ma-2 rounded-xl post-card recent-news-card",attrs:{elevation:l?4:0,to:"/post/"+t.id,width:e.$vuetify.breakpoint.xs||e.$vuetify.breakpoint.sm?"200":"250",nuxt:""}},[n(r.c,{staticClass:"title"},[n("ElementH5",{attrs:{text:""+t.title,align:"left"}})],1)],1)]}}],null,!0)})],1)})),1)],1):n("div",[n("p",{staticClass:"pl-4"},[e._v("\n      No news found\n    ")])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH5:n(859).default})},762:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return v}));var o=n(763),r=n(3),c=Object(r.i)("v-card__actions"),l=Object(r.i)("v-card__subtitle"),d=Object(r.i)("v-card__text"),v=Object(r.i)("v-card__title");o.a},821:function(e,t,n){"use strict";var o={inserted:function(e,t,n){var o=t.value,r=t.options||{passive:!0};window.addEventListener("resize",o,r),e._onResize=Object(e._onResize),e._onResize[n.context._uid]={callback:o,options:r},t.modifiers&&t.modifiers.quiet||o()},unbind:function(e,t,n){var o;if(null===(o=e._onResize)||void 0===o?void 0:o[n.context._uid]){var r=e._onResize[n.context._uid],c=r.callback,l=r.options;window.removeEventListener("resize",c,l),delete e._onResize[n.context._uid]}}};t.a=o},859:function(e,t,n){"use strict";n.r(t);var o=n(174),r={name:"ElementH5",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(42),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h5",{class:"text-"+e.align+" text-h6 text-md-h6 text-lg-h5",staticStyle:{"letter-spacing":"0px !important"}},[e.prependIcon?n(o.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports}}]);