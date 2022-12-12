(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{739:function(e,t,r){"use strict";r(31);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},786:function(e,t,r){"use strict";var n=r(2),o=(r(46),r(58),r(174),r(19),r(4),r(16),r(64),r(97),r(15),r(17),r(23),r(24),r(28)),c=r(128),l=r(173);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(input._uid)||(r.valid=t(input)))})):r.valid=t(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},951:function(e,t,r){"use strict";r.r(t);var n=r(693),o=r(786),c=r(792),l=r(0),d=(r(95),r(14),r(5)),f=r(739),h=Object(d.b)({name:"FormsAuthemaillogin",setup:function(){var e=Object(d.l)(),t=e.$fire,r=e.$notify,n=e.i18n,o=Object(d.p)(),c=Object(d.i)(!1),h=Object(d.i)(!0),m=f.a,w=Object(d.i)(!1),v=Object(d.i)(null),form=Object(d.i)({email:"",password:""}),y=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.value=!0,e.next=3,v.value.validate();case 3:if(h.value=e.sent,!h.value){e.next=7;break}return e.next=7,O();case 7:c.value=!1;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!form.value.email||!form.value.password){e.next=33;break}if(e.prev=1,null!==t.auth.currentUser){e.next=17;break}return e.next=5,t.auth.signInWithEmailAndPassword(form.value.email.trim().toLowerCase(),form.value.password);case 5:if(c=e.sent,console.log("Authentication results",c),!c.user){e.next=14;break}return t.analytics.logEvent("login"),r.show({text:"Successfully logged in",color:"green"}),e.next=12,o.push("/");case 12:e.next=15;break;case 14:r.show({text:n.t("notify.error_try_again"),color:"error"});case 15:e.next=19;break;case 17:return e.next=19,o.push("/");case 19:e.next=31;break;case 21:e.prev=21,e.t0=e.catch(1),console.log("Error",e.t0),e.t1=e.t0.code,e.next="auth/wrong-password"===e.t1?27:"auth/user-not-found"===e.t1?29:31;break;case 27:return r.show({text:n.t("onboarding.error_wrong_password"),color:"error"}),e.abrupt("break",31);case 29:return r.show({text:n.t("onboarding.error_user_not_found"),color:"error"}),e.abrupt("break",31);case 31:e.next=34;break;case 33:r.show({text:n.t("notify.error_try_again"),color:"error"});case 34:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(){return e.apply(this,arguments)}}();return{loading:c,valid:h,form:form,formEl:v,rules:m,validate:y,showPassword:w}}}),m=h,w=r(37),component=Object(w.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(o.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r(c.a,{staticClass:"py-0 my-0",attrs:{rules:e.rules.email,label:e.$t("form.email"),required:"","prepend-inner-icon":"mdi-email",outlined:"","background-color":"#f8f9fa"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),r(c.a,{attrs:{rules:e.rules.password,autocomplete:"off","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password",label:e.$t("form.password"),required:"","prepend-inner-icon":"mdi-lock",counter:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r("div",{staticClass:"text-center"},[r(n.a,{staticClass:"text-center",attrs:{disabled:!e.valid,loading:e.loading,color:"primary",elevation:"0",type:"submit"}},[e._v("\n      "+e._s(e.$t("btn.login"))+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);