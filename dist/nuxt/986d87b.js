(window.webpackJsonp=window.webpackJsonp||[]).push([[170,112],{1301:function(t,e,r){"use strict";r.r(e);var n=r(675),o=r(1049),l=r(273),c=r(0),d=(r(14),r(69),r(7)),v=r(95),h=Object(d.b)({name:"OnboardingPage6",layout:"onboarding",middleware:"authenticated",setup:function(){var t=Object(d.l)(),e=t.$config,r=t.$capacitor,n=t.$services,o=Object(d.q)(),l=o.state,h=o.dispatch,m=Object(d.p)(),f=Object(d.a)((function(){return l.user.profile})),_=Object(d.i)(!1),x=Object(d.i)(!1),y=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:_.value=!0,setTimeout(Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v.a.checkPermissions().then(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"granted"===e.location&&(x.value=!0);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=3,r.positionPermissions();case 3:return t.next=5,n.getSetUserGeneralLocation();case 5:return t.next=7,h("user/updateField",{permissions:{location:!0}});case 7:_.value=!1,m.push("/onboarding/7");case 9:case"end":return t.stop()}}),t)}))),1500);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(d.n)({title:"".concat(e.appTitle),meta:[{hid:"description",name:"description",content:"Discover ".concat(e.appTitle)}]}),{loading:_,profile:f,hasPermission:x,goNext:y}},head:{}}),m=h,f=r(58),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(o.a,{staticClass:"ma-0 pa-0 lightgray",attrs:{height:"100vh",fluid:""}},[r("div",{staticClass:"d-flex flex-column justify-space-between align-center",staticStyle:{height:"100vh"}},[r("div",{staticClass:"d-flex flex-column justify-space-around align-center",staticStyle:{width:"100vw",height:"23vh"}},[r("OnboardingCardheader",{staticClass:"gray--text mx-14",attrs:{prependIcon:"mdi-google-maps",h1:t.$t("onboarding.enable_location_permissions_heading")}})],1),t._v(" "),r("div",{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[200,0],opacity:[0,1],easing:"easeInOutQuad",duration:600,delay:600},expression:"{\n                translateY: [200, 0],\n                opacity: [0, 1],\n                easing: 'easeInOutQuad',\n                duration: 600,\n                delay:600\n              }"}],staticClass:"white pa-10 rounded-t-xl rounded-b-0 elevation-13",staticStyle:{width:"100vw","max-width":"700px",height:"77vh"}},[r("div",{staticClass:"text-center"},[r("h5",{staticClass:"text-h5 text-center mb-6"},[t._v("\n            "+t._s(t.$t("onboarding.enable_location_permissions_sub"))+"\n          ")]),t._v(" "),r("h6",{staticClass:"primary--text text-h6 text-center mb-6"},[t._v("\n            "+t._s(t.$t("onboarding.location_requirements_1"))+"\n          ")]),t._v(" "),r("h6",{staticClass:"primary--text text-h6 text-center mb-6"},[t._v("\n            "+t._s(t.$t("onboarding.location_requirements_3"))+"\n          ")]),t._v(" "),t.hasPermission?r(l.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200},expression:"{\n                translateY: [100, 0],\n                duration: 1200\n              }"}],staticClass:"mt-7",attrs:{color:"green",size:"120"}},[t._v("\n            mdi-checkbox-marked-circle-outline\n          ")]):t._e(),t._v(" "),r("div",{staticClass:"text-center mt-15"},[r("OnboardingPrivacypolicy",{attrs:{showTermsText:!1}}),t._v(" "),r(n.a,{staticClass:"white--text mt-10",attrs:{loading:t.loading,color:"primary",dark:"","x-large":"",type:"submit"},on:{click:t.goNext}},[r(l.a,[t._v("mdi-check")]),t._v("\n              "+t._s(t.$t("btn.yes_i_agree"))+"\n            ")],1)],1)],1)])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OnboardingCardheader:r(804).default,OnboardingPrivacypolicy:r(780).default})},695:function(t,e,r){"use strict";r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return v}));var n=r(697),o=r(8),l=Object(o.i)("v-card__actions"),c=Object(o.i)("v-card__subtitle"),d=Object(o.i)("v-card__text"),v=Object(o.i)("v-card__title");n.a},697:function(t,e,r){"use strict";r(22),r(24),r(29),r(30),r(20),r(4),r(21);var n=r(6),o=(r(701),r(702),r(66),r(714),r(270)),l=r(698),c=r(207),d=r(48),v=r(8);function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.a=Object(d.a)(l.a,c.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return m(m({"v-card":!0},c.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},o.a.options.computed.classes.call(this))},styles:function(){var style=m({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=l.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),Object(v.r)(this)])}})},698:function(t,e,r){"use strict";r(66);var n=r(1),o=r(703),l=r(8);e.a=n.default.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:Object(l.r)(this,"progress")||this.$createElement(o.a,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},703:function(t,e,r){"use strict";var n=r(710);e.a=n.a},714:function(t,e,r){var content=r(715);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(52).default)("e23b7040",content,!0,{sourceMap:!1})},715:function(t,e,r){var n=r(51)(!1);n.push([t.i,'.input-tel__input{background:#f6f6f6 !important;border:none !important;padding:1.75rem !important}input.country-selector__input{border:none !important;background:#f6f6f6 !important;height:56px !important}.country-selector__country-flag{top:25px}.country-selector__toggle{top:calc(50% - 4px) !important}.theme--light.v-application,.theme--light.v-app-bar.v-toolbar.v-sheet{background-color:#eef3ff}.theme--light.v-tabs-items{background-color:#eef3ff}.theme--light .cart-popup-contents{background-color:#fff}.theme--light.v-stepper{background:transparent}.theme--light.v-sheet.product-card,.theme--light.v-sheet.company-card,.theme--light.v-sheet.post-card,.theme--light.v-sheet.recent-news-card,.theme--light.v-sheet.company-list-card{background-color:#fff;border:7px solid rgba(222,222,222,.2)}.theme--light.v-skeleton-loader .v-skeleton-loader__actions,.theme--light.v-skeleton-loader .v-skeleton-loader__article,.theme--light.v-skeleton-loader .v-skeleton-loader__card-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__card-text,.theme--light.v-skeleton-loader .v-skeleton-loader__date-picker,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-text,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__table-thead,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tbody,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tfoot{background:transparent !important}.theme--light.slide-up{background-color:#eef3ff}.theme--dark.v-application,.theme--dark.v-app-bar.v-toolbar.v-sheet{background-color:#242a33}.theme--dark.v-navigation-drawer{background-color:transparent}.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:transparent}.theme--dark.v-bottom-navigation{background-color:#242a33}.theme--dark.v-tabs-items{background-color:transparent}.theme--dark.v-sheet{background-color:#242a33}.v-dialog .theme--dark.v-sheet{background-color:#242a33}.theme--dark.shipping-options{background-color:#242a33}.theme--dark.v-tabs-items{background-color:#242a33}.theme--dark .cart-popup-contents{background-color:#242a33}.theme--dark.v-sheet.product-card,.theme--dark.v-sheet.company-card,.theme--dark.v-sheet.post-card,.theme--dark.v-sheet.recent-news-card,.theme--dark.v-sheet.company-list-card{background-color:#fff;border:7px solid #15191e}.theme--dark.v-card>.v-card__title{color:#000}.theme--dark.v-card>.v-card__text{color:#000}.theme--dark.slide-up{background-color:#242a33}.appBarHeight{height:calc(60px + env(safe-area-inset-top))}.mobileNotch{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) !important;height:inherit !important}header.mobileNotch{max-height:100px}.v-card__subtitle,.v-card__text{line-height:1.975rem;letter-spacing:0 !important}.v-application .body-1{letter-spacing:0 !important}.v-application .primary{background-color:#6fa7e0;border-color:#6fa7e0}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:90%}.v-dialog--scrollable>.v-sheet{overflow-y:scroll !important}@media screen and (max-width: 600px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:100%}}.admin-container{margin-top:0;margin-bottom:15px;padding-top:0;padding-left:0;padding-right:0}.avatar-elevation{border:4px solid #fff}.no-break{word-break:break-word}.v-application a{text-decoration:none;color:#6fa7e0 !important}.missing-image{opacity:.25}.post-card .name,.product-card .name,.company-card .title{word-break:break-word;line-height:1.33em;letter-spacing:-0.3px !important}.phoneNumberInput .input-tel__input{font-size:16px !important;border-top:3px solid rgba(118,118,118,.05) !important;border-right:3px solid rgba(118,118,118,.05) !important;border-bottom:3px solid rgba(118,118,118,.05) !important;padding-left:1px !important}.phoneNumberInput .country-selector__input{font-size:16px !important;border-top:3px solid rgba(118,118,118,.05) !important;border-left:3px solid rgba(118,118,118,.05) !important;border-bottom:3px solid rgba(118,118,118,.05) !important;height:62px !important}.phoneNumberInput .country-selector__toggle{top:20px !important}.phoneNumberInput .country-selector__country-flag{top:27px !important}.v-text-field--outlined fieldset{border-color:#f1f0ef !important}.country-selector.has-hint .country-selector__input,.country-selector.has-value .country-selector__input{padding-top:0 !important}.alertBtn{font-size:1.45rem;font-weight:600;letter-spacing:1px;text-transform:capitalize;color:#fff}.borderButton{border:3px solid #f1f0ef;background-color:#f8f9fa}.borderInput{border:3px solid #f1f0ef;background-color:#f8f9fa}details>summary{font-size:17px;margin:10px 0px 10px;border-bottom:1px solid #fefefe;padding:15px 0 30px}.v-list--rounded.v-list--three-line .v-list-item,.v-list--rounded.v-list--three-line .v-list-item::before,.v-list--rounded.v-list--three-line .v-list-item>.v-ripple__container{border-radius:32px !important}.v-list--rounded .v-list-item,.v-list--rounded .v-list-item::before,.v-list--rounded .v-list-item>.v-ripple__container{border-radius:15px !important}.myshout .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){border:2px solid #f0f0ef;background:#f9f9f9;margin-bottom:15px}.myshout .v-list-item__title{font-size:1rem;font-weight:600}.myshout .v-list-item__subtitle{font-size:.9rem}.myshout .v-list-item__icon{width:80px;height:80px;border-radius:20px;text-align:center}.myshout .v-list-item__icon .v-icon{font-size:33px;width:100%}.v-application--is-ltr .myshout .v-list-item__action:first-child,.v-application--is-ltr .myshout .v-list-item__icon:first-child{margin-right:10px}.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__text,.theme--light.v-card>.v-card__subtitle{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__text,.theme--dark.v-card>.v-card__subtitle{color:rgba(255,255,255,.7)}.v-sheet.v-card{border-radius:.25rem}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0px 3px 1px -2px rgba(0,0,0,.1),0px 2px 2px 0px rgba(0,0,0,.07),0px 1px 5px 0px rgba(0,0,0,.06)}.v-sheet.v-card.v-sheet--shaped{border-radius:3rem .25rem}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;overflow-wrap:break-word;position:relative;white-space:normal}.v-card>*:first-child:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>.v-card__progress+*:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>*:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1em;font-weight:500;letter-spacing:0;line-height:1.2em;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0px 0px 0px 0px rgba(0,0,0,.1),0px 0px 0px 0px rgba(0,0,0,.07),0px 0px 0px 0px rgba(0,0,0,.06) !important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(0.25, 0.8, 0.25, 1)}.v-sheet.v-card--hover:hover,.v-sheet.v-card--hover:focus{box-shadow:0px 5px 5px -3px rgba(0,0,0,.1),0px 8px 10px 1px rgba(0,0,0,.07),0px 3px 14px 2px rgba(0,0,0,.06)}.v-card--link{cursor:pointer}.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:.2s opacity}.v-card--disabled{pointer-events:none;user-select:none}.v-card--disabled>*:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0px 5px 5px -3px rgba(0,0,0,.1),0px 8px 10px 1px rgba(0,0,0,.07),0px 3px 14px 2px rgba(0,0,0,.06)}',""]),t.exports=n},746:function(t,e,r){"use strict";var n=r(6),o=(r(22),r(15),r(24),r(55),r(256),r(29),r(30),r(20),r(4),r(31),r(68),r(36),r(53),r(257),r(258),r(259),r(260),r(261),r(262),r(263),r(264),r(265),r(266),r(267),r(268),r(269),r(21),r(34),r(700),r(1)),l=r(694),c=r(8);function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var h=["sm","md","lg","xl"],m=["start","end","center"];function f(t,e){return h.reduce((function(r,n){return r[t+Object(c.E)(n)]=e(),r}),{})}var _=function(t){return[].concat(m,["baseline","stretch"]).includes(t)},x=f("align",(function(){return{type:String,default:null,validator:_}})),y=function(t){return[].concat(m,["space-between","space-around"]).includes(t)},k=f("justify",(function(){return{type:String,default:null,validator:y}})),w=function(t){return[].concat(m,["space-between","space-around","stretch"]).includes(t)},O=f("alignContent",(function(){return{type:String,default:null,validator:w}})),j={align:Object.keys(x),justify:Object.keys(k),alignContent:Object.keys(O)},C={align:"align",justify:"justify",alignContent:"align-content"};function P(t,e,r){var n=C[t];if(null!=r){if(e){var o=e.replace(t,"");n+="-".concat(o)}return(n+="-".concat(r)).toLowerCase()}}var S=new Map;e.a=o.default.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:_}},x),{},{justify:{type:String,default:null,validator:y}},k),{},{alignContent:{type:String,default:null,validator:w}},O),render:function(t,e){var r=e.props,data=e.data,o=e.children,c="";for(var d in r)c+=String(r[d]);var v=S.get(c);if(!v){var h;for(h in v=[],j)j[h].forEach((function(t){var e=r[t],n=P(h,t,e);n&&v.push(n)}));v.push(Object(n.a)(Object(n.a)(Object(n.a)({"no-gutters":r.noGutters,"row--dense":r.dense},"align-".concat(r.align),r.align),"justify-".concat(r.justify),r.justify),"align-content-".concat(r.alignContent),r.alignContent)),S.set(c,v)}return t(r.tag,Object(l.a)(data,{staticClass:"row",class:v}),o)}})},780:function(t,e,r){"use strict";r.r(e);var n=r(675),o=r(697),l=r(695),c=r(774),d=r(0),v=(r(14),r(7)),h=Object(v.b)({name:"OnboardingPrivacypolicy",props:{showTermsText:{type:Boolean,default:function(){return!0}}},setup:function(){var dialog=Object(v.i)(!1),t=Object(v.i)(!1),e=Object(v.q)().dispatch,r=Object(v.l)().error,n=Object(v.i)(),o=function(){var o=Object(d.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.value=!0,o.prev=1,o.next=4,e("pages/getOne","privacy").then((function(t){!1!==t&&(n.value=t)}));case 4:o.next=9;break;case 6:o.prev=6,o.t0=o.catch(1),r({statusCode:404});case 9:return o.prev=9,t.value=!1,o.finish(9);case 12:case"end":return o.stop()}}),o,null,[[1,6,9,12]])})));return function(){return o.apply(this,arguments)}}();return{dialog:dialog,loading:t,loadPage:o,page:n}}}),m=h,f=r(58),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(c.a,{attrs:{width:"500",scrollable:!0},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[r("div",{staticClass:"text-center grey--text caption lighten-1"},[t.showTermsText?r("div",[t._v(t._s(t.$t("onboarding.terms_text")))]):t._e(),t._v(" "),r("div",t._g(t._b({on:{click:t.loadPage}},"div",o,!1),n),[t._v(t._s(t.$t("onboarding.terms_btn"))+".")])])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),r(o.a,{staticClass:"pa-2 pt-6 rounded-xl elevation-13"},[r(l.b,[t.loading?r("div",[t._v("\n        "+t._s(t.$t("is_loading"))+"\n      ")]):t.page?r("div",[r("h4",{staticClass:"text-h4 text-center"},[t._v(t._s(t.$lang.get(t.page,"title")))]),t._v(" "),t.page.content?r("div",[t.page.isMarkdown?r("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:t.$md.render(t.$lang.get(t.page,"content")),expression:"$md.render($lang.get(page, 'content'))"}],staticClass:"mdDoc mt-5"}):r("div",{directives:[{name:"dompurify-html",rawName:"v-dompurify-html",value:t.$lang.get(t.page,"content"),expression:"$lang.get(page, 'content')"}],staticClass:"mdDoc mt-5"})]):t._e()]):t._e()]),t._v(" "),r(l.a,{staticClass:"justify-center"},[r(n.a,{attrs:{text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n        "+t._s(t.$t("btn.close"))+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},804:function(t,e,r){"use strict";r.r(e);var n=r(697),o=r(695),l=r(273),c=r(746),d=r(7),v=Object(d.b)({name:"OnboardingCardheader",props:{h1:{type:String,default:function(){return""}},h2:{type:String,default:function(){return""}},prependIcon:{type:String,default:null}},setup:function(){return{}}}),h=r(58),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(n.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:1200,opacity:[0,100],easing:"easeInOutQuad"},expression:"{\n      translateY: [100, 0],\n      duration: 1200,\n      opacity: [0, 100],\n      easing: 'easeInOutQuad'\n    }"}],staticClass:"rounded-t-xl",staticStyle:{"box-shadow":"none !important"},attrs:{color:"transparent",height:""}},[r(c.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[r(o.b,{staticClass:"text-center"},[t.h1?r("h1",{staticClass:"display-3 font-weight-bold mb-1 gray--text"},[t.prependIcon?r(l.a,[t._v("\n          "+t._s(t.prependIcon)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.h1)+"\n      ")],1):t._e(),t._v(" "),t.h2?r("h2",{staticClass:"text-h3 gray--text"},[t._v(t._s(t.h2))]):t._e()])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);