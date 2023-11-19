(window.webpackJsonp=window.webpackJsonp||[]).push([[152,52,54],{1015:function(t,e,n){"use strict";n(932)},1016:function(t,e,n){var r=n(38)(!1);r.push([t.i,".mdDoc h1{font-size:1.3rem!important;letter-spacing:0}.mdDoc h2{font-size:1.1rem!important;letter-spacing:0}.mdDoc h3,.mdDoc h4,.mdDoc h5,.mdDoc h6{font-size:1rem!important;letter-spacing:0}",""]),t.exports=r},1101:function(t,e,n){"use strict";n.r(e);var r=n(715),l=n(751),c=n(747),o=n(714),d=n(720),m=n(0),f=(n(14),n(31),n(61),n(1)),v=n(57),_=n.n(v),h=n(368),x=n.n(h),y=n(5);f.default.use(x.a);var O=Object(y.b)({name:"PostId",middleware:"authenticated",setup:function(){var t=Object(y.q)(),e=t.state,n=t.dispatch,r=Object(y.n)(),title=r.title,meta=r.meta,l=Object(y.l)(),c=l.error,o=l.$system,d=Object(y.o)(),f=Object(y.i)(!0),v=Object(y.i)(e.posts.one),h=Object(y.i)({});return Object(y.m)(Object(m.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return f.value=!0,t.prev=1,t.next=4,n("posts/getOne",d.value.params.id).then((function(t){!1!==t&&(v.value=t)}));case 4:v.value&&(title.value="".concat(v.value.title.rendered),_.a.isNull(v.value.excerpt.rendered)||(meta.value[0]={hid:"description",name:"description",content:v.value.excerpt.rendered.replace(/^(.{155}[^\s]*).*/,"$1")})),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),o.log({comp:"PostId",msg:"useFetch",val:t.t0}),c({statusCode:404});case 11:return t.prev=11,f.value=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[1,7,11,14]])})))),{loading:f,post:v,company:h}},head:{}}),j=(n(1015),n(37)),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(l.a,{staticClass:"pt-4 pt-md-6"},[t.loading?n("div",[n(o.a,[n(r.a,{attrs:{cols:"12",md:"4",sm:"12"}},[n(d.a,{attrs:{type:"image"}})],1),t._v(" "),n(r.a,{attrs:{cols:"12",md:"8",sm:"12"}},[n(d.a,{attrs:{type:"heading"}}),t._v(" "),n(d.a,{attrs:{type:"list-item-three-line"}})],1)],1)],1):t.post&&t.post.title&&t.post.title.rendered.length>0?n("div",[n(o.a,[n(r.a,{attrs:{cols:"12"}},[t.post.x_featured_media_large?n("div",[n(c.a,{staticClass:"mb-4 rounded-xl",attrs:{"aspect-ratio":16/9,src:t.post.x_featured_media_large}})],1):t._e(),t._v(" "),n(o.a,[n(r.a,{staticClass:"pl-8 pr-8"},[n("ElementH1",{attrs:{text:t.post.title.rendered,align:"left"}}),t._v(" "),n("ElementH5",{staticClass:"grey--text",attrs:{text:t.post.x_date,align:"left"}}),t._v(" "),t.post.content?n("div",{staticClass:"mt-6 mb-6 body-1"},[n("span",{domProps:{innerHTML:t._s(t.post.content.rendered)}})]):t._e()],1)],1)],1)],1)],1):n("div",[n("Global404")],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ElementH1:n(725).default,ElementH5:n(805).default})},725:function(t,e,n){"use strict";n.r(e);var r=n(164),l={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(37),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},805:function(t,e,n){"use strict";n.r(e);var r=n(164),l={name:"ElementH5",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(37),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h5",{class:"text-"+t.align+" text-h6 text-md-h6 text-lg-h5",staticStyle:{"letter-spacing":"0px !important"}},[t.prependIcon?n(r.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},932:function(t,e,n){var content=n(1016);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(39).default)("583e9bed",content,!0,{sourceMap:!1})}}]);