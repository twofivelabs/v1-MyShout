(window.webpackJsonp=window.webpackJsonp||[]).push([[174,72],{1317:function(e,t,n){"use strict";n.r(t);var l=n(880),r=n(1018),c=n(768),o=n(1049),d=n(273),m=n(733),v=n(746),f=n(808),h=n(805),_=n(831),x=n(0),y=(n(14),n(15),n(31),n(53),n(7)),w=Object(y.b)({name:"PageId",middleware:"authenticated",setup:function(){var e=Object(y.q)(),t=e.state,n=e.dispatch,l=Object(y.n)(),title=l.title,meta=l.meta,r=Object(y.l)(),c=r.$config,o=r.$system,d=r.error,m=Object(y.o)(),v=Object(y.k)(!0,"fYFJWq+XE07hW4X4PK0PKA=="),f=Object(y.k)(t.pages.one,"XEZx4+7SsuETXcq3vqrjlw==");return Object(y.m)(Object(x.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v.value=!0,e.prev=1,e.next=4,n("pages/getOne",m.value.params.id).then((function(e){!1!==e&&(f.value=e)}));case 4:f.value&&(title.value="".concat(f.value.title," by ").concat(c.appTitle),f.value.content&&(meta.value[0]={hid:"description",name:"description",content:f.value.content.replace(/^(.{155}[^\s]*).*/,"$1")})),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),o.log({comp:"PageId",msg:"getOne",val:e.t0}),d({statusCode:404});case 11:return e.prev=11,v.value=!1,e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,7,11,14]])})))),{loading:v,page:f}},head:{}}),O=n(58),component=Object(O.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(l.a,{staticClass:"mobileNotch",attrs:{color:"white",app:"",fixed:"",top:""}},[n(r.a,[n("NuxtLink",{attrs:{to:"/settings"}},[n(d.a,{staticClass:"pr-2 py-3 pl-2",attrs:{color:"myshoutDarkGrey"}},[e._v("\n          mdi-arrow-left\n        ")])],1)],1),e._v(" "),n(_.a,{staticClass:"pl-0"},[n("div",{staticClass:"d-flex align-center"},[n("ElementH2",{attrs:{align:"left",text:e.$lang.get(e.page,"title")}})],1)]),e._v(" "),n(h.a)],1),e._v(" "),n(o.a,{class:"mobileNotch "+e.page.slug+" mb-12 pb-12"},[e.loading?n("div",[n(v.a,[n(c.a,{attrs:{cols:"12"}},[n(f.a,{attrs:{type:"list-item-three-line"}}),e._v(" "),n(f.a,{attrs:{type:"list-item-three-line"}}),e._v(" "),n(f.a,{attrs:{type:"list-item-three-line"}})],1)],1)],1):n("div",[e.page?n("div",{staticStyle:{"padding-bottom":"125px !important"}},[n(v.a,[n(c.a,{attrs:{cols:"12"}},[e.page.featured_image_url?n("div",[n(m.a,{staticClass:"mb-4",attrs:{"aspect-ratio":16/9,src:e.page.featured_image_url}})],1):e._e(),e._v(" "),e.page.content?n("div",{staticClass:"ma-5 mb-15"},[e.page.isMarkdown?n("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:e.$md.render(e.$lang.get(e.page,"content")),expression:"$md.render($lang.get(page, 'content'))"}],staticClass:"mdDoc"}):n("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:e.$lang.get(e.page,"content"),expression:"$lang.get(page, 'content')"}],staticClass:"mdDoc"})]):e._e()])],1)],1):n("div",[n("Global404")],1)])])],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH2:n(783).default})},783:function(e,t,n){"use strict";n.r(t);var l=n(273),r={name:"ElementH2",props:{text:{type:String,default:""},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},c=n(58),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h2",{class:"text-"+e.align+"  text-h4 text-md-h3 text-lg-h2",staticStyle:{"letter-spacing":"0px !important"}},[e.prependIcon?n(l.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports}}]);