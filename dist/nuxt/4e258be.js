(window.webpackJsonp=window.webpackJsonp||[]).push([[148,67],{1249:function(e,t,n){"use strict";n.r(t);var r=n(739),o=n(759),l=n(790),c=n(809),d=n(758),f=n(826),m=n(0),v=(n(16),n(6)),h=n(771),x=Object(v.b)({name:"ForgotPasswordPage",middleware:"guest",setup:function(){var e=Object(v.p)(),t=Object(v.l)(),n=t.$config,r=t.$notify,o=t.$fire,l=t.$system,c=t.i18n,d=Object(v.i)(!1),f=Object(v.i)(!0),form=Object(v.i)({email:""}),x=Object(v.i)(null),_=h.a,w=Object(v.i)(null),y=function(){var e=Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.value=!0,e.next=3,x.value.validate();case 3:if(!e.sent){e.next=7;break}return e.next=7,k();case 7:d.value=!1;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.email){t.next=15;break}return t.prev=1,t.next=4,o.auth.sendPasswordResetEmail(form.value.email);case 4:return r.show({text:c.t("notify.check_your_email")}),t.next=7,e.push("/login");case 7:t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),l.log({comp:"ForgotPasswordPage",msg:"Reset Password",val:t.t0}),r.show({text:c.t("notify.error_try_again"),color:"error"});case 13:t.next=16;break;case 15:r.show({text:c.t("notify.error_try_again"),color:"error"});case 16:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(){return t.apply(this,arguments)}}();return Object(v.n)({title:"Forgot Password to ".concat(n.appTitle),meta:[{hid:"description",name:"description",content:"Recover your password to ".concat(n.appTitle)}]}),{loading:d,valid:f,form:form,formEl:x,rules:_,provider:w,validate:y,forgotPassword:k}},head:{}}),_=x,w=n(42),component=Object(w.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(l.a,{staticClass:"pa-8 mt-12"},[n("ElementH1",{attrs:{text:e.$t("forgot_password"),align:"left"}}),e._v(" "),n(d.a,[n(o.a,{attrs:{cols:"12",md:"5",order:e.$vuetify.breakpoint.mdAndUp?"":"last"}},[n("div",{staticClass:"mt-8"},[n("p",[n("nuxt-link",{attrs:{to:"/login"}},[e._v("\n            "+e._s(e.$t("btn.back_to_login"))+"\n          ")])],1)])]),e._v(" "),n(o.a,[n(c.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[n(f.a,{attrs:{rules:e.rules.email,label:e.$t("form.email"),required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),n("div",{staticClass:"text-center"},[n(r.a,{staticClass:"text-center",attrs:{disabled:!e.valid,loading:e.loading,color:"success",elevation:"0",type:"submit"},on:{click:e.validate}},[e._v("\n            "+e._s(e.$t("btn.send_password_reset"))+"\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:n(775).default})},771:function(e,t,n){"use strict";n(29);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},775:function(e,t,n){"use strict";n.r(t);var r=n(174),o={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},l=n(42),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?n(r.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports}}]);