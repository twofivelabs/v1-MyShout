(window.webpackJsonp=window.webpackJsonp||[]).push([[164,68,90],{1137:function(e,t,n){"use strict";n.r(t);var r=n(174),l=n(6),o=Object(l.b)({name:"GlobalSocialMedia",setup:function(){var e=Object(l.l)().$remoteConfig,t=Object(l.i)([]);return Object(l.f)((function(){try{t.value=e.get("social_links",!0)}catch(n){t.value=e.get("social_links")}})),{socialLinks:t}}}),c=n(42),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.socialLinks&&e.socialLinks.length>0?n("div",e._l(e.socialLinks,(function(t){return n("a",{key:t.title,staticClass:"mr-1",attrs:{href:t.to}},[n(r.a,{attrs:{"aria-label":t.title,left:"",role:"img"}},[e._v("\n      "+e._s(t.icon)+"\n    ")])],1)})),0):e._e()}),[],!1,null,null,null);t.default=component.exports},1274:function(e,t,n){"use strict";n.r(t);var r=n(1175),l=n(1024),o=n(739),c=n(759),m=n(790),f=n(809),d=n(174),v=n(758),h=n(806),_=n(826),x=n(1111),j=n(824),O=n(0),y=(n(16),n(19),n(38),n(6)),k=n(771),w=Object(y.b)({name:"PageContact",middleware:"authenticated",setup:function(){var e=Object(y.q)(),t=e.state,n=e.dispatch,r=e.getters,l=Object(y.l)(),o=l.$config,c=l.$system,m=l.$notify,f=l.i18n,d=Object(y.a)((function(){return r["user/isLoggedIn"]})),v=Object(y.a)((function(){return t.user.data})),h=Object(y.a)((function(){return t.user.profile})),_=Object(y.i)(!1),x=Object(y.i)(!0),form=Object(y.i)({email:null,name:null,userId:null,phone:"",message:null}),j=Object(y.i)(null),w=k.a;Object(y.f)((function(){form.value.email=v.value.email,h.value.first_name&&(form.value.name="".concat(h.value.first_name," ").concat(h.value.last_name)),form.value.phone=h.value.phone,form.value.userId=h.value.id}));var $=function(){var e=Object(O.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _.value=!0,e.next=3,j.value.validate();case 3:if(!e.sent){e.next=7;break}return e.next=7,C();case 7:_.value=!1;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(O.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("messages/add",{subject:o.contact.subject,h1:"You were contacted",message:"\n          ".concat(form.value.name,"\n          ").concat(form.value.phone,"\n          ").concat(form.value.message,"\n        "),to_email:o.contact.email,to_name:o.contact.name}).then((function(){m.show({text:f.t("notify.success"),color:"success"}),form.value.message=null})).catch((function(e){c.log({comp:"PageContact",msg:"Form",val:e}),m.show({text:f.t("notify.error_try_again"),color:"error"})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(y.n)({title:"Contact ".concat(o.appTitle),meta:[{hid:"description",name:"description",content:"Find out more information by contacting us online."}]}),{loading:_,isLoggedIn:d,user:v,profile:h,valid:x,form:form,formEl:j,rules:w,validate:$}},head:{}}),$=w,C=n(42),component=Object(C.a)($,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(r.a,{staticClass:"mobileNotch",attrs:{color:"white",app:"",fixed:"",top:""}},[n(l.a,[n("NuxtLink",{attrs:{to:"/settings"}},[n(d.a,{staticClass:"pr-2 py-3 pl-2",attrs:{color:"myshoutDarkGrey"}},[e._v("\n          mdi-arrow-left\n        ")])],1)],1),e._v(" "),n(j.a,{staticClass:"pl-0"},[n("div",{staticClass:"d-flex align-center"},[n("ElementH2",{attrs:{align:"left",text:e.$t("btn.contact_us")}})],1)]),e._v(" "),n(h.a)],1),e._v(" "),n(m.a,{staticClass:"mt-3 mobileNotch px-3"},[n(v.a,[n(c.a,{attrs:{cols:"12",sm:"5"}},[n("div",{staticClass:"mt-8 pr-8"},[n("p",[e._v("\n          "+e._s(e.$t("page.contact_intro"))+"\n        ")]),e._v(" "),n("GlobalSocialmedia")],1)]),e._v(" "),n(c.a,[n(f.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[n(_.a,{attrs:{rules:e.rules.email,label:e.$t("form.email"),required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),n(v.a,[n(c.a,[n(_.a,{attrs:{rules:e.rules.phone,label:e.$t("form.phone"),required:""},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),e._v(" "),n(c.a,[n(_.a,{attrs:{label:e.$t("form.name")},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),n(x.a,{attrs:{rules:e.rules.message,label:e.$t("form.message"),required:""},model:{value:e.form.message,callback:function(t){e.$set(e.form,"message",t)},expression:"form.message"}}),e._v(" "),n(o.a,{staticClass:"text-center",attrs:{disabled:!e.valid,block:"",color:"primary",elevation:"0",type:"submit",loading:e.loading}},[e._v("\n          "+e._s(e.$t("btn.send"))+"\n        ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH2:n(794).default,GlobalSocialmedia:n(1137).default})},771:function(e,t,n){"use strict";n(29);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},794:function(e,t,n){"use strict";n.r(t);var r=n(174),l={name:"ElementH2",props:{text:{type:String,default:""},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},o=n(42),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h2",{class:"text-"+e.align+"  text-h4 text-md-h3 text-lg-h2",staticStyle:{"letter-spacing":"0px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports}}]);