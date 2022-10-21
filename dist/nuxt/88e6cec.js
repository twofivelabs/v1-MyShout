(window.webpackJsonp=window.webpackJsonp||[]).push([[160,70],{1127:function(e,t,r){"use strict";r.r(t);var n=r(695),o=r(718),l=r(753),c=r(784),d=r(717),m=r(807),f=r(0),v=(r(16),r(3)),h=r(738),x=Object(v.b)({name:"ForgotPasswordPage",middleware:"guest",setup:function(){var e=Object(v.q)(),t=Object(v.m)(),r=t.$config,n=t.$notify,o=t.$fire,l=t.$system,c=Object(v.i)(!1),d=Object(v.i)(!0),form=Object(v.i)({email:""}),m=Object(v.i)(null),x=h.a,w=Object(v.i)(null),k=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.value=!0,e.next=3,m.value.validate();case 3:if(!e.sent){e.next=7;break}return e.next=7,y();case 7:c.value=!1;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.email){t.next=15;break}return t.prev=1,t.next=4,o.auth.sendPasswordResetEmail(form.value.email);case 4:return n.show({text:"Please check your email"}),t.next=7,e.push("/login");case 7:t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),l.log({comp:"ForgotPasswordPage",msg:"Reset Password",val:t.t0}),n.show({text:"Error, try again",color:"error"});case 13:t.next=16;break;case 15:n.show({text:"Error, try again",color:"error"});case 16:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(){return t.apply(this,arguments)}}();return Object(v.o)({title:"Forgot Password to ".concat(r.appTitle),meta:[{hid:"description",name:"description",content:"Recover your password to ".concat(r.appTitle)}]}),{loading:c,valid:d,form:form,formEl:m,rules:x,provider:w,validate:k,forgotPassword:y}},head:{}}),w=x,k=r(43),component=Object(k.a)(w,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(l.a,{staticClass:"pa-8 mt-12"},[r("ElementH1",{attrs:{text:"Forgot Password",align:"left"}}),e._v(" "),r(d.a,[r(o.a,{attrs:{cols:"12",md:"5",order:e.$vuetify.breakpoint.mdAndUp?"":"last"}},[r("div",{staticClass:"mt-8"},[r("p",[e._v("\n          Back to\n          "),r("nuxt-link",{attrs:{to:"/login"}},[e._v("\n            Login\n          ")])],1)])]),e._v(" "),r(o.a,[r(c.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r(m.a,{attrs:{rules:e.rules.email,label:"Email",required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),r("div",{staticClass:"text-center"},[r(n.a,{staticClass:"text-center",attrs:{disabled:!e.valid,loading:e.loading,color:"success",elevation:"0",type:"submit"},on:{click:e.validate}},[e._v("\n            Email me a reset link\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH1:r(731).default})},731:function(e,t,r){"use strict";r.r(t);var n=r(158),o={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},l=r(43),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h1",{class:"text-"+e.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[e.prependIcon?r(n.a,[e._v("\n    "+e._s(e.prependIcon)+"\n  ")]):e._e(),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports},738:function(e,t,r){"use strict";r(34);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}}}]);