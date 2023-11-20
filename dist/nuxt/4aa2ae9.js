(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{773:function(e,t,r){"use strict";r(29);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},819:function(e,t,r){"use strict";var n=r(2),o=(r(44),r(58),r(186),r(18),r(4),r(15),r(65),r(103),r(13),r(17),r(23),r(24),r(27)),c=r(138),l=r(185);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(input._uid)||(r.valid=t(input)))})):r.valid=t(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:d({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},983:function(e,t,r){"use strict";r.r(t);var n=r(738),o=r(819),c=r(175),l=r(824),f=r(0),d=(r(16),r(5)),h=r(773),m=r(57),v=r.n(m),w=Object(d.b)({name:"UserChangeemail",setup:function(){var e=Object(d.l)(),t=e.$notify,r=e.$system,n=e.$fire,o=e.i18n,c=Object(d.q)(),l=c.state,m=c.dispatch,w=Object(d.i)(!1),O=Object(d.a)((function(){return l.user.data})),y=Object(d.i)(!0),_=Object(d.i)(null),j=h.a,x=Object(d.i)(!1),k=Object(d.i)(!1),form=Object(d.h)(v.a.cloneDeep(l.user.profile)),P=Object(d.h)(v.a.cloneDeep(l.user.profile)),E=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(form.email){e.next=2;break}return e.abrupt("return",!1);case 2:if(P.email!==form.email.toLowerCase()){e.next=4;break}return e.abrupt("return",!0);case 4:return e.next=6,m("user/search",{field:"email",operator:"==",term:form.email.toLowerCase(),limit:3});case 6:if(!(e.sent.length>0)){e.next=10;break}return t.show({text:o.t("notify.email_in_use"),color:"error"}),e.abrupt("return",!1);case 10:return e.abrupt("return",!0);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y.value=_.value.validate(),e.next=3,E();case 3:if(e.sent){e.next=7;break}return y.value=!1,console.log("Validate email"),e.abrupt("return");case 7:if(O.value.uid){e.next=10;break}return y.value=!1,e.abrupt("return");case 10:if(!y.value){e.next=13;break}return e.next=13,B();case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,w.value=!0,c=n.auth.currentUser,e.next=5,n.auth.signInWithEmailAndPassword(c.email,form.password).then(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Success signing in"),n.auth.currentUser.updateEmail(form.email).then(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("user/updateField",{email:form.email});case 2:t.show({text:o.t("notify.success"),color:"success"});case 3:case"end":return e.stop()}}),e)})))).catch((function(e){console.log("Error updating authentication",e),t.show({text:o.t("notify.error_try_again"),color:"red"})}));case 2:case"end":return e.stop()}}),e)})))).catch((function(e){console.log("Error signing in",e),t.show({text:o.t("notify.error_try_again"),color:"red"})}));case 5:e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),r.log({comp:"UserProfile",msg:"change email",val:e.t0}),t.show({text:o.t("notify.error_try_again"),color:"red"});case 11:return e.prev=11,w.value=!1,e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,7,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(d.s)((function(){form&&form.email&&P.email!==form.email.toLowerCase()&&(k.value=!0)})),{loading:w,formEl:_,rules:j,form:form,showPassword:x,showSaveButton:k,validate:$}}}),O=w,y=r(35),component=Object(y.a)(O,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r(o.a,{ref:"formEl",staticClass:"rounded-lg pa-3",staticStyle:{border:"2px solid #ddd"},on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r("ElementH4",{staticClass:"mb-4",attrs:{text:e.$t("heading.change_email_address"),align:"left"}}),e._v(" "),r(l.a,{staticClass:"py-0 my-0",attrs:{rules:e.rules.email,"prepend-inner-icon":"mdi-email",outlined:"","background-color":"#f8f9fa",label:e.$t("form.email")},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),e.showSaveButton?r("div",[r("span",{staticClass:"caption"},[e._v(e._s(e.$t("heading.change_email_address_caption")))]),e._v(" "),r(l.a,{attrs:{rules:e.rules.password,autocomplete:"off","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password",label:e.$t("form.password"),"prepend-inner-icon":"mdi-lock",counter:"",required:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r(n.a,{staticClass:"text-center",attrs:{loading:e.loading,color:"primary",elevation:"0",type:"submit"}},[e._v("\n        "+e._s(e.$t("btn.save"))+"\n        "),r(c.a,{attrs:{right:""}},[e._v("\n          mdi-arrow-right\n        ")])],1)],1):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:r(429).default})}}]);