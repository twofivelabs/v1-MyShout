(window.webpackJsonp=window.webpackJsonp||[]).push([[71,73],{776:function(t,e,r){"use strict";r(29);e.a={email:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],password:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=6||"Password must be at least 6 characters"}],phone:[function(t){return!!t||"Phone is required"},function(t){return t&&t.length>=10||"Phone must be valid"}],message:[function(t){return!!t||"Message is required"}],username:[function(t){return!!t||"Username is required"},function(t){return t&&t.length>2||"Username must be a least 3 characters"}],name:[function(t){return!!t||"Is required"}],title:[function(t){return!!t||"Is required"}]}},822:function(t,e,r){"use strict";var n=r(3),o=(r(17),r(18),r(102),r(46),r(23),r(24),r(13),r(4),r(185),r(58),r(15),r(65),r(27)),l=r(138),c=r(184),d=r(2);function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.a=Object(o.a)(l.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:m({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},Object(d.r)(this))}})},867:function(t,e,r){var content=r(903);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(38).default)("75bbe81d",content,!0,{sourceMap:!1})},902:function(t,e,r){"use strict";r(867)},903:function(t,e,r){var n=r(37)(!1);n.push([t.i,"\n.theme--light.v-list-item[data-v-07322154]:not(.v-list-item--active):not(.v-list-item--disabled) {\n  border: 2px solid #f0f0ef;\n  background: #f9f9f9;\n  margin-bottom: 15px;\n}\n.v-list-item__title[data-v-07322154] {\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.v-list-item__subtitle[data-v-07322154] {\n  font-size:0.9rem;\n}\n.v-list-item__icon[data-v-07322154] {\n  width: 80px;\n  height: 80px;\n  border-radius: 20px;\n  text-align: center;\n}\n.v-list-item__icon .v-icon[data-v-07322154] {\n  font-size:33px;\n  width:100%;\n}\n.v-application--is-ltr .v-list-item__action[data-v-07322154]:first-child, .v-application--is-ltr .v-list-item__icon[data-v-07322154]:first-child {\n  margin-right:10px;\n}\n",""]),t.exports=n},923:function(t,e,r){"use strict";r.r(e);var n=r(760),o=r(741),l=r(822),c=r(78),d=r(827),f=r(298),m=r(0),h=(r(16),r(5)),v=r(776),w=Object(h.b)({name:"FormsForgotpasswordbtn",directives:{Touch:f.a},setup:function(){var t=Object(h.l)(),e=t.$system,r=t.$fire,n=t.i18n,o=t.$notify,l=Object(h.i)(!1),c=Object(h.i)(!1),form=Object(h.i)({email:""}),d=Object(h.i)(null),f=v.a,w=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l.value=!0,t.next=3,d.value.validate();case 3:if(!t.sent){t.next=7;break}return t.next=7,x();case 7:l.value=!1;case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.email){t.next=13;break}return t.prev=1,t.next=4,r.auth.sendPasswordResetEmail(form.value.email);case 4:o.show({text:n.t("notify.check_your_email")}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),e.log({comp:"ForgotPasswordPop",msg:"Reset Password",val:t.t0}),o.show({text:n.t("notify.error_try_again"),color:"error"});case 11:t.next=14;break;case 13:o.show({text:n.t("notify.error_try_again"),color:"error"});case 14:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return{loading:l,showBottomSheet:c,swipe:function(t){"Down"===t&&(c.value=!1)},rules:f,form:form,formEl:d,validate:w,forgotPassword:x}}}),x=w,_=(r(902),r(36)),component=Object(_.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:function(e){t.showBottomSheet=!0}}},[t._t("default",(function(){return[t._v("\n    "+t._s(t.$t("btn.forgot_password"))+"\n  ")]})),t._v(" "),r(n.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:t.showBottomSheet,callback:function(e){t.showBottomSheet=e},expression:"showBottomSheet"}},[r(c.a,{staticClass:"rounded-t-xl",attrs:{height:"50vh"}},[r("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[r("GlobalSlidebar",{directives:[{def:f.b,name:"touch",rawName:"v-touch",value:{down:function(){return t.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(e){return t.swipe("Down")}}}),t._v(" "),r(l.a,{ref:"formEl",on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}}},[r(d.a,{staticClass:"mx-3 my-3",attrs:{rules:t.rules.email,label:t.$t("form.email"),required:""},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),r("div",{staticClass:"text-center"},[r(o.a,{staticClass:"text-center",attrs:{loading:t.loading,color:"primary",elevation:"0",type:"submit"}},[t._v("\n              "+t._s(t.$t("btn.send_password_reset"))+"\n            ")])],1)],1)],1)])],1)],2)}),[],!1,null,"07322154",null);e.default=component.exports;installComponents(component,{GlobalSlidebar:r(432).default})},987:function(t,e,r){"use strict";r.r(e);var n=r(741),o=r(822),l=r(827),c=r(0),d=(r(101),r(16),r(5)),f=r(776),m=Object(d.b)({name:"FormsAuthemaillogin",setup:function(){var t=Object(d.l)(),e=t.$fire,r=t.$notify,n=t.i18n,o=Object(d.p)(),l=Object(d.i)(!1),m=Object(d.i)(!0),h=f.a,v=Object(d.i)(!1),w=Object(d.i)(null),form=Object(d.i)({email:"",password:""}),x=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l.value=!0,t.next=3,w.value.validate();case 3:if(m.value=t.sent,!m.value){t.next=7;break}return t.next=7,_();case 7:l.value=!1;case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),_=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(){var l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.email||!form.value.password){t.next=33;break}if(t.prev=1,null!==e.auth.currentUser){t.next=17;break}return t.next=5,e.auth.signInWithEmailAndPassword(form.value.email.trim().toLowerCase(),form.value.password);case 5:if(l=t.sent,console.log("Authentication results",l),!l.user){t.next=14;break}return e.analytics.logEvent("login"),r.show({text:"Successfully logged in",color:"green"}),t.next=12,o.push("/");case 12:t.next=15;break;case 14:r.show({text:n.t("notify.error_try_again"),color:"error"});case 15:t.next=19;break;case 17:return t.next=19,o.push("/");case 19:t.next=31;break;case 21:t.prev=21,t.t0=t.catch(1),console.log("Error",t.t0),t.t1=t.t0.code,t.next="auth/wrong-password"===t.t1?27:"auth/user-not-found"===t.t1?29:31;break;case 27:return r.show({text:n.t("onboarding.error_wrong_password"),color:"error"}),t.abrupt("break",31);case 29:return r.show({text:n.t("onboarding.error_user_not_found"),color:"error"}),t.abrupt("break",31);case 31:t.next=34;break;case 33:r.show({text:n.t("notify.error_try_again"),color:"error"});case 34:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(){return t.apply(this,arguments)}}();return{loading:l,valid:m,form:form,formEl:w,rules:h,validate:x,showPassword:v}}}),h=m,v=r(36),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(o.a,{ref:"formEl",on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}}},[r(l.a,{staticClass:"py-0 my-0",attrs:{rules:t.rules.email,label:t.$t("form.email"),required:"","prepend-inner-icon":"mdi-email",outlined:"","background-color":"#f8f9fa"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),r(l.a,{attrs:{rules:t.rules.password,autocomplete:"off","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off",type:t.showPassword?"text":"password",label:t.$t("form.password"),required:"","prepend-inner-icon":"mdi-lock",counter:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),t._v(" "),r("div",{staticClass:"text-center"},[r(n.a,{staticClass:"text-center",attrs:{disabled:!t.valid,loading:t.loading,color:"primary",elevation:"0",type:"submit"}},[t._v("\n      "+t._s(t.$t("btn.login"))+"\n    ")])],1),t._v(" "),r("div",{staticClass:"text-center py-5"},[r("FormsForgotpasswordbtn",{staticClass:"mx-auto"})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{FormsForgotpasswordbtn:r(923).default})}}]);