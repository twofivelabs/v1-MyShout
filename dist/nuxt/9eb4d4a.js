(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{773:function(t,e,n){"use strict";n(29);e.a={email:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],password:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=6||"Password must be at least 6 characters"}],phone:[function(t){return!!t||"Phone is required"},function(t){return t&&t.length>=10||"Phone must be valid"}],message:[function(t){return!!t||"Message is required"}],username:[function(t){return!!t||"Username is required"},function(t){return t&&t.length>2||"Username must be a least 3 characters"}],name:[function(t){return!!t||"Is required"}],title:[function(t){return!!t||"Is required"}]}},819:function(t,e,n){"use strict";var r=n(2),o=(n(44),n(58),n(186),n(18),n(4),n(15),n(65),n(103),n(13),n(17),n(23),n(24),n(27)),c=n(138),l=n(185);function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},862:function(t,e,n){var content=n(898);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(38).default)("75bbe81d",content,!0,{sourceMap:!1})},897:function(t,e,n){"use strict";n(862)},898:function(t,e,n){var r=n(37)(!1);r.push([t.i,"\n.theme--light.v-list-item[data-v-07322154]:not(.v-list-item--active):not(.v-list-item--disabled) {\n  border: 2px solid #f0f0ef;\n  background: #f9f9f9;\n  margin-bottom: 15px;\n}\n.v-list-item__title[data-v-07322154] {\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.v-list-item__subtitle[data-v-07322154] {\n  font-size:0.9rem;\n}\n.v-list-item__icon[data-v-07322154] {\n  width: 80px;\n  height: 80px;\n  border-radius: 20px;\n  text-align: center;\n}\n.v-list-item__icon .v-icon[data-v-07322154] {\n  font-size:33px;\n  width:100%;\n}\n.v-application--is-ltr .v-list-item__action[data-v-07322154]:first-child, .v-application--is-ltr .v-list-item__icon[data-v-07322154]:first-child {\n  margin-right:10px;\n}\n",""]),t.exports=r},917:function(t,e,n){"use strict";n.r(e);var r=n(757),o=n(738),c=n(819),l=n(78),d=n(824),f=n(298),h=n(0),m=(n(16),n(5)),v=n(773),w=Object(m.b)({name:"FormsForgotpasswordbtn",directives:{Touch:f.a},setup:function(){var t=Object(m.l)(),e=t.$system,n=t.$fire,r=t.i18n,o=t.$notify,c=Object(m.i)(!1),l=Object(m.i)(!1),form=Object(m.i)({email:""}),d=Object(m.i)(null),f=v.a,w=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.value=!0,t.next=3,d.value.validate();case 3:if(!t.sent){t.next=7;break}return t.next=7,_();case 7:c.value=!1;case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),_=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.email){t.next=13;break}return t.prev=1,t.next=4,n.auth.sendPasswordResetEmail(form.value.email);case 4:o.show({text:r.t("notify.check_your_email")}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),e.log({comp:"ForgotPasswordPop",msg:"Reset Password",val:t.t0}),o.show({text:r.t("notify.error_try_again"),color:"error"});case 11:t.next=14;break;case 13:o.show({text:r.t("notify.error_try_again"),color:"error"});case 14:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return{loading:c,showBottomSheet:l,swipe:function(t){"Down"===t&&(l.value=!1)},rules:f,form:form,formEl:d,validate:w,forgotPassword:_}}}),_=w,x=(n(897),n(35)),component=Object(x.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{on:{click:function(e){t.showBottomSheet=!0}}},[t._t("default",(function(){return[t._v("\n    "+t._s(t.$t("btn.forgot_password"))+"\n  ")]})),t._v(" "),n(r.a,{attrs:{scrollable:!0,"max-width":"700"},model:{value:t.showBottomSheet,callback:function(e){t.showBottomSheet=e},expression:"showBottomSheet"}},[n(l.a,{staticClass:"rounded-t-xl",attrs:{height:"50vh"}},[n("div",{staticClass:"ma-3",staticStyle:{"padding-bottom":"180px"}},[n("GlobalSlidebar",{directives:[{def:f.b,name:"touch",rawName:"v-touch",value:{down:function(){return t.swipe("Down")}},expression:"{ down: () => swipe('Down') }"}],nativeOn:{click:function(e){return t.swipe("Down")}}}),t._v(" "),n(c.a,{ref:"formEl",on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}}},[n(d.a,{staticClass:"mx-3 my-3",attrs:{rules:t.rules.email,label:t.$t("form.email"),required:""},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),n("div",{staticClass:"text-center"},[n(o.a,{staticClass:"text-center",attrs:{loading:t.loading,color:"primary",elevation:"0",type:"submit"}},[t._v("\n              "+t._s(t.$t("btn.send_password_reset"))+"\n            ")])],1)],1)],1)])],1)],2)}),[],!1,null,"07322154",null);e.default=component.exports;installComponents(component,{GlobalSlidebar:n(430).default})}}]);