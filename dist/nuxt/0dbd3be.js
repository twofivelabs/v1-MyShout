(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{1104:function(e,t,r){"use strict";r.r(t);var n=r(720),o=r(693),c=r(786),l=r(792),d=r(0),f=(r(95),r(14),r(5)),h=r(739),m=Object(f.b)({name:"FormsRecoverbyemail",setup:function(){var e=Object(f.l)(),t=e.$fire,r=e.$helper,n=e.$fireModule,o=e.$ttlStorage,c=e.$notify,l=e.$system,m=e.i18n,v=Object(f.p)(),w=Object(f.i)(!1),dialog=Object(f.i)(!1),y=Object(f.i)(!0),x=h.a,O=Object(f.i)(!1),_=Object(f.i)(null),form=Object(f.i)({email:"",password:""}),j=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w.value=!0,e.next=3,_.value.validate();case 3:if(y.value=e.sent,!y.value){e.next=7;break}return e.next=7,k();case 7:w.value=!1;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){var f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!form.value.email||!form.value.password){e.next=32;break}return e.prev=1,e.next=4,t.auth.signOut();case 4:if(null!==t.auth.currentUser){e.next=17;break}return e.next=7,t.auth.createUserWithEmailAndPassword(form.value.email.trim().toLowerCase(),form.value.password);case 7:return t.analytics.logEvent("sign_up"),c.show({text:m.t("notify.success"),color:"green"}),o.set("onboardingComplete",!0),e.next=12,r.sleep(500);case 12:return w.value=!1,e.next=15,v.push("/");case 15:e.next=23;break;case 17:return e.next=19,n.auth.EmailAuthProvider.credential(form.value.email.trim().toLowerCase(),form.value.password);case 19:return f=e.sent,e.next=22,t.auth.currentUser.linkWithCredential(f).then(Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.analytics.logEvent("sign_up"),c.show({text:m.t("notify.success"),color:"green"}),o.set("onboardingComplete",!0),e.next=5,r.sleep(500);case 5:return w.value=!1,e.next=8,v.push("/");case 8:case"end":return e.stop()}}),e)})))).catch((function(e){w.value=!1,c.show({text:m.t("notify.error_try_again"),color:"error"}),l.log({comp:"FormsRecoverbyemail",msg:"Error trying to link account",val:e})}));case 22:w.value=!1;case 23:e.next=30;break;case 25:e.prev=25,e.t0=e.catch(1),w.value=!1,l.log({comp:"FormsRecoverbyemail",msg:"Error trying to register",val:e.t0}),c.show({text:m.t("notify.error_try_again"),color:"error"});case 30:e.next=34;break;case 32:w.value=!1,c.show({text:m.t("notify.error_try_again"),color:"error"});case 34:case"end":return e.stop()}}),e,null,[[1,25]])})));return function(){return e.apply(this,arguments)}}();return{loading:w,valid:y,form:form,formEl:_,rules:x,validate:j,register:k,dialog:dialog,showPassword:O}}}),v=m,w=r(37),component=Object(w.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(n.a,{attrs:{width:"500","max-width":"700"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("div",e._g(e._b({staticClass:"mt-9 text-center grey--text caption lighten-1"},"div",o,!1),n),[e._v("\n      "+e._s(e.$t("heading.cant_receive_sms_code"))+"\n    ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),r("div",{staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{height:"67vh"}},[r(c.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r(l.a,{attrs:{rules:e.rules.email,label:e.$t("form.email"),autocomplete:"off",counter:"","prepend-inner-icon":"mdi-email",outlined:"","background-color":"#f8f9fa"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),r(l.a,{attrs:{rules:e.rules.password,label:e.$t("form.password"),autocomplete:"off","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password","prepend-inner-icon":"mdi-lock",counter:"",required:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r("div",{staticClass:"text-center"},[r(o.a,{staticClass:"text-center",attrs:{disabled:!e.valid,loading:e.loading,color:"success",elevation:"0",type:"submit"}},[e._v("\n          "+e._s(e.$t("btn.login"))+"\n        ")])],1)],1)],1)])}),[],!1,null,null,null);t.default=component.exports},739:function(e,t,r){"use strict";r(31);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},786:function(e,t,r){"use strict";var n=r(2),o=(r(46),r(58),r(174),r(19),r(4),r(16),r(64),r(97),r(15),r(17),r(23),r(24),r(28)),c=r(128),l=r(173);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(input._uid)||(r.valid=t(input)))})):r.valid=t(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})}}]);