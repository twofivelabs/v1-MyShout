(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{737:function(e,t,r){"use strict";r(31);t.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},763:function(e,t,r){"use strict";r.r(t);var n=r(692),o=r(724),c=r(723),l=r(276),m=r(0),d=(r(14),r(5)),f=Object(d.b)({name:"OnboardingPrivacypolicy",props:{showTermsText:{type:Boolean,default:function(){return!0}}},setup:function(){var dialog=Object(d.i)(!1),e=Object(d.i)(!1),t=Object(d.q)().dispatch,r=Object(d.l)().error,n=Object(d.i)(),o=function(){var o=Object(m.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return e.value=!0,o.prev=1,o.next=4,t("pages/getOne","privacy").then((function(e){!1!==e&&(n.value=e)}));case 4:o.next=9;break;case 6:o.prev=6,o.t0=o.catch(1),r({statusCode:404});case 9:return o.prev=9,e.value=!1,o.finish(9);case 12:case"end":return o.stop()}}),o,null,[[1,6,9,12]])})));return function(){return o.apply(this,arguments)}}();return{dialog:dialog,loading:e,loadPage:o,page:n}}}),v=f,h=r(37),component=Object(h.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(l.a,{attrs:{width:"500",scrollable:!0},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("div",{staticClass:"text-center grey--text caption lighten-1"},[e.showTermsText?r("div",[e._v(e._s(e.$t("onboarding.terms_text")))]):e._e(),e._v(" "),r("div",e._g(e._b({on:{click:e.loadPage}},"div",o,!1),n),[e._v(e._s(e.$t("onboarding.terms_btn"))+".")])])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),r(o.a,{staticClass:"pa-2 pt-6 rounded-xl elevation-13"},[r(c.b,[e.loading?r("div",[e._v("\n        "+e._s(e.$t("is_loading"))+"\n      ")]):e.page?r("div",[r("h4",{staticClass:"text-h4 text-center"},[e._v(e._s(e.$lang.get(e.page,"title")))]),e._v(" "),e.page.content?r("div",[e.page.isMarkdown?r("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:e.$md.render(e.$lang.get(e.page,"content")),expression:"$md.render($lang.get(page, 'content'))"}],staticClass:"mdDoc mt-5"}):r("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:e.$lang.get(e.page,"content"),expression:"$lang.get(page, 'content')"}],staticClass:"mdDoc mt-5"})]):e._e()]):e._e()]),e._v(" "),r(c.a,{staticClass:"justify-center"},[r(n.a,{attrs:{text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n        "+e._s(e.$t("btn.close"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},812:function(e,t,r){"use strict";r.r(t);var n=r(692),o=r(724),c=r(800),l=r(276),m=r(784),d=r(790),f=r(0),v=(r(96),r(14),r(5)),h=r(737),x=r(795),w=r.n(x),_=(r(796),Object(v.b)({name:"FormsRegisterbyphoneweb",components:{VuePhoneNumberInput:w.a},emits:["response"],props:{goTo:{type:String,default:"/"}},setup:function(e,t){var r=t.emit,n=Object(v.l)(),o=n.$fire,c=n.$fireModule,l=n.$helper,m=n.$notify,d=n.$system,x=n.$ttlStorage,w=n.i18n,_=Object(v.q)().dispatch,y=Object(v.p)(),O=Object(v.i)(!1),k=Object(v.i)(!0),j=Object(v.i)(null),C=Object(v.i)(!1),$=h.a,R=Object(v.i)(null),form=Object(v.i)({phone:"",phoneNumber:null,phoneNumberFormatted:null,showOtpInput:!1,otpProvided:null}),P=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(O.value=!0,!C.value){e.next=10;break}return e.next=4,R.value.validate();case 4:if(k.value=e.sent,!k.value){e.next=8;break}return e.next=8,T();case 8:e.next=11;break;case 10:m.show({text:w.t("notify.agree_to_terms"),color:"error"});case 11:O.value=!1;case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!form.value.phone){e.next=15;break}return O.value=!0,form.value.showOtpInput=!0,e.prev=3,e.next=6,o.auth.signInWithPhoneNumber(form.value.phone.trim().toLowerCase(),j.value);case 6:window.confirmationResult=e.sent,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(3),e.t0&&e.t0.message?"reCAPTCHA placeholder element must be an element or id"===e.t0.message||m.show({text:e.t0.message,color:"error"}):m.show({text:w.t("notify.error_try_again"),color:"error"}),d.log({comp:"FormsRegisterbyphoneweb",msg:"Registering phone number",val:e.t0});case 13:e.next=17;break;case 15:m.show({text:w.t("notify.error_try_again"),color:"error"}),console.log("STICKY: No phone number");case 17:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return O.value=!0,t.prev=1,t.next=4,window.confirmationResult.confirm(form.value.otpProvided);case 4:if(n=t.sent,x.set("onboardingComplete",!0),n.additionalUserInfo.isNewUser){t.next=15;break}return m.show({text:w.t("notify.success"),color:"green"}),r("response",{status:"success",message:"Successfully logged in"}),t.next=11,_("user/updateField",{phone:form.value.phone.trim().toLowerCase()});case 11:e.goTo&&(console.log("PUSH USER TO ",e.goTo),y.push(e.goTo)),console.log("We are not taking the user anywhere"),t.next=20;break;case 15:return form.value.showOtpInput=!1,m.show({text:w.t("notify.success"),color:"green"}),r("response",{status:"success",message:"Successfully registered"}),t.next=20,_("user/updateField",{phone:form.value.phone.trim().toLowerCase(),created_at:new Date});case 20:t.next=27;break;case 22:t.prev=22,t.t0=t.catch(1),m.show({text:w.t("notify.error_try_again"),color:"error"}),r("response",{status:"error",message:"Error with phone code"}),d.log({comp:"FormsRegisterbyphoneweb",msg:"Registering phone code",val:t.t0});case 27:return t.prev=27,O.value=!1,form.value.showOtpInput=!1,t.finish(27);case 31:case"end":return t.stop()}}),t,null,[[1,22,27,31]])})));return function(){return t.apply(this,arguments)}}(),I=function(){var e=Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.sleep(2e3);case 3:j.value=new c.auth.RecaptchaVerifier("recaptchaContainer",{size:"invisible",callback:function(){console.log("WORKS")}}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log("initRecaptcha",e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return Object(v.f)(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(v.d)(Object(f.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I();case 2:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})))),{loading:O,valid:k,agreeToTerms:C,form:form,formEl:R,rules:$,recaptchaContainer:j,updatePhoneNumber:function(e){form.value.phoneNumberFormatted=e.formattedNumber,form.value.phone=e.formattedNumber},validate:P,register:T,registerWithOTPCode:N}}})),y=_,O=r(37),component=Object(O.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(m.a,{ref:"formEl",on:{submit:function(t){return t.preventDefault(),e.validate.apply(null,arguments)}}},[r("div",{staticClass:"text-center"},[r("VuePhoneNumberInput",{staticClass:"mt-5 mb-10 phoneNumberInput",attrs:{required:"",translations:{countrySelectorLabel:"",phoneNumberLabel:e.$t("form.phone")}},on:{update:function(t){return e.updatePhoneNumber(t)}},model:{value:e.form.phoneNumberFormatted,callback:function(t){e.$set(e.form,"phoneNumberFormatted",t)},expression:"form.phoneNumberFormatted"}}),e._v(" "),r(n.a,{attrs:{disabled:!e.valid,loading:e.loading,color:"primary",elevation:"0",id:"recaptchaContainer",type:"submit"}},[e._v("\n        "+e._s(e.$t("btn.send_code"))+"\n      ")]),e._v(" "),r("div",{staticClass:"text-center mt-5"},[r("OnboardingPrivacypolicy",{staticClass:"mt-15"}),e._v(" "),r("div",{staticClass:"d-inline-flex justify-center agreeToTerms"},[r(c.a,{attrs:{label:e.$t("onboarding.agree_to_terms"),required:""},model:{value:e.agreeToTerms,callback:function(t){e.agreeToTerms=t},expression:"agreeToTerms"}})],1)],1)],1),e._v(" "),r(l.a,{attrs:{"max-width":"500"},model:{value:e.form.showOtpInput,callback:function(t){e.$set(e.form,"showOtpInput",t)},expression:"form.showOtpInput"}},[r(o.a,{staticClass:"elevation-0 pa-12 rounded-xl"},[r("ElementH3",{attrs:{text:e.$t("heading.we_sent_you_sms_code"),align:"center"}}),e._v(" "),r(d.a,{staticClass:"mt-5 mx-8",attrs:{label:e.$t("form.code"),placeholder:e.$t("form.code"),outlined:"","background-color":"#f8f9fa",max:"6",type:"number",oninput:"if(Number(this.value.length) > Number(this.max)) this.value = this.value.substring(0, Number(this.max));"},model:{value:e.form.otpProvided,callback:function(t){e.$set(e.form,"otpProvided",t)},expression:"form.otpProvided"}}),e._v(" "),r("div",{staticClass:"text-center"},[r(n.a,{staticClass:"text-center",attrs:{loading:e.loading,color:"primary",elevation:"0",type:"submit"},on:{click:e.registerWithOTPCode}},[e._v("\n            "+e._s(e.$t("btn.verify"))+"\n          ")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{OnboardingPrivacypolicy:r(763).default,ElementH3:r(394).default})}}]);