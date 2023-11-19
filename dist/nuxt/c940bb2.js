(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{736:function(e,t,r){"use strict";r(31);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},783:function(e,t,r){"use strict";var n=r(2),o=(r(46),r(59),r(175),r(19),r(4),r(16),r(65),r(98),r(15),r(17),r(23),r(24),r(29)),c=r(129),l=r(174);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(input._uid)||(r.valid=t(input)))})):r.valid=t(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},955:function(e,t,r){"use strict";r.r(t);var n=r(691),o=r(783),c=r(164),l=r(789),d=r(0),f=(r(14),r(5)),h=r(736),m=r(57),w=r.n(m),v=Object(f.b)({name:"UserChangepassword",setup:function(){var e=Object(f.l)(),t=e.$notify,r=e.$system,n=e.$fire,o=e.i18n,c=Object(f.q)(),l=c.state,m=c.dispatch,v=Object(f.i)(!1),y=Object(f.a)((function(){return l.user.data})),O=Object(f.i)(!0),_=Object(f.i)(null),j=h.a,x=Object(f.i)(!1),P=Object(f.i)(!1),k=Object(f.i)(!1),form=Object(f.h)(w.a.cloneDeep(l.user.profile)),$=Object(f.h)(w.a.cloneDeep(l.user.profile)),E=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(form.email){e.next=2;break}return e.abrupt("return",!1);case 2:if($.email!==form.email.toLowerCase()){e.next=4;break}return e.abrupt("return",!0);case 4:return e.next=6,m("user/search",{field:"email",operator:"==",term:form.email.toLowerCase(),limit:3});case 6:if(!(e.sent.length>0)){e.next=10;break}return t.show({text:o.t("notify.email_in_use"),color:"error"}),e.abrupt("return",!1);case 10:return e.abrupt("return",!0);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O.value=_.value.validate(),e.next=3,E();case 3:if(e.sent){e.next=7;break}return O.value=!1,console.log("Validate email"),e.abrupt("return");case 7:if(y.value.uid){e.next=10;break}return O.value=!1,e.abrupt("return");case 10:if(!O.value){e.next=13;break}return e.next=13,C();case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(d.a)(regeneratorRuntime.mark((function e(){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v.value=!0,c=n.auth.currentUser,e.next=5,n.auth.signInWithEmailAndPassword(c.email,form.password).then(Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Success signing in"),n.auth.currentUser.updatePassword(form.newPassword).then(Object(d.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.show({text:o.t("notify.success"),color:"success"});case 1:case"end":return e.stop()}}),e)})))).catch((function(e){console.log("Error updating authentication",e),t.show({text:o.t("notify.error_try_again"),color:"red"})}));case 2:case"end":return e.stop()}}),e)})))).catch((function(e){console.log("Error signing in",e),t.show({text:o.t("notify.error_try_again"),color:"red"})}));case 5:e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),r.log({comp:"UserProfile",msg:"change password",val:e.t0}),t.show({text:o.t("notify.error_try_again"),color:"red"});case 11:return e.prev=11,v.value=!1,e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,7,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(f.s)((function(){form&&form.email&&$.email!==form.email.toLowerCase()&&(k.value=!0)})),{loading:v,formEl:_,rules:j,form:form,showPassword:x,showNewPassword:P,showSaveButton:k,validate:B}}}),y=v,O=r(37),component=Object(O.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r(o.a,{ref:"formEl",staticClass:"rounded-lg pa-3",staticStyle:{border:"2px solid #ddd"},on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r("ElementH4",{staticClass:"mb-4",attrs:{text:e.$t("heading.change_password"),align:"left"}}),e._v(" "),r(l.a,{staticClass:"py-0 my-0",attrs:{rules:e.rules.email,"prepend-inner-icon":"mdi-email",outlined:"","background-color":"#f8f9fa",label:e.$t("form.email")},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),r("span",{staticClass:"caption"},[e._v(e._s(e.$t("heading.change_password_caption")))]),e._v(" "),r(l.a,{attrs:{rules:e.rules.password,autocomplete:"off","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password",label:e.$t("form.current_password"),"prepend-inner-icon":"mdi-lock",counter:"",required:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r(l.a,{attrs:{rules:e.rules.password,autocomplete:"off","append-icon":e.showNewPassword?"mdi-eye":"mdi-eye-off",type:e.showNewPassword?"text":"password",label:e.$t("form.new_password"),"prepend-inner-icon":"mdi-lock",counter:"",required:"",outlined:"","background-color":"#f8f9fa"},on:{"click:append":function(t){e.showNewPassword=!e.showNewPassword}},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword",t)},expression:"form.newPassword"}}),e._v(" "),r(n.a,{staticClass:"text-center",attrs:{loading:e.loading,color:"primary",elevation:"0",type:"submit"}},[e._v("\n        "+e._s(e.$t("btn.save"))+"\n        "),r(c.a,{attrs:{right:""}},[e._v("\n          mdi-arrow-right\n        ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ElementH4:r(398).default})}}]);