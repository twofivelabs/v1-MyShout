(window.webpackJsonp=window.webpackJsonp||[]).push([[13,52,80],{1032:function(t,e,r){"use strict";r.r(e);var o=r(692),n=r(724),l=r(723),c=r(276),d=r(748),h=r(721),m=r(0),v=(r(14),r(4),r(401),r(33),r(402),r(403),r(404),r(405),r(406),r(407),r(408),r(409),r(410),r(411),r(412),r(413),r(414),r(415),r(416),r(417),r(35),r(65),r(25),r(53),r(43),r(62),r(31),r(17),r(66),r(69),r(5));function f(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return _(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,l=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return l=t.done,t},e:function(t){c=!0,n=t},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw n}}}}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var k=Object(v.b)({name:"AlertShoutbutton",setup:function(){var t=Object(v.q)(),e=t.state,r=t.dispatch,o=Object(v.l)(),n=o.$services,l=o.$system,c=o.$notify,d=o.$db,h=o.$capacitor,_=o.$helper,k=o.i18n,x=Object(v.a)((function(){return e.user.data})),y=Object(v.a)((function(){return e.user.profile})),w=Object(v.i)(!1),dialog=Object(v.i)(!1),S=Object(v.a)((function(){return k.t("shout_alert")})),z=Object(v.i)(null),I=Object(v.i)(null),O=Object(v.i)(5),R=Object(v.i)(!1),j=new Set,C=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return dialog.value=!0,w.value=!0,t.next=4,h.gpsGetCurrentPosition();case 4:return t.next=6,_.sleep(500);case 6:return t.next=8,n.alertButton("shout",{user:y.value,gps:y.value.gps});case 8:return t.prev=8,t.next=11,n.reverseGeocode(y.value.gps.lat,y.value.gps.lng);case 11:return e=t.sent,t.next=14,r("user/alerts/add",{type:"shout",audioUrl:I.value,userId:x.value.uid,gps:y.value.gps,location:e});case 14:t.next=20;break;case 16:t.prev=16,t.t0=t.catch(8),l.log({comp:"AlertShoutbutton",msg:"Trying to send alert",val:t.t0}),c.show({text:k.t("notify.error_try_again"),color:"error"});case 20:return t.prev=20,w.value=!1,t.finish(20);case 23:case"end":return t.stop()}}),t,null,[[8,16,20,23]])})));return function(){return t.apply(this,arguments)}}(),N=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!R.value){t.next=2;break}return t.abrupt("return");case 2:return R.value=!0,console.log("STICKY: START RECORDING"),h.microphonePermissions(),t.prev=5,z.value="".concat(k.t("recording"),"... 5"),j.add(setInterval((function(){O.value--,z.value="".concat(k.t("recording"),"... ").concat(O.value),O.value<=0&&E()}),1e3)),t.next=10,h.microphoneStart();case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(5),console.log("Error starting ",t.t0);case 15:case"end":return t.stop()}}),t,null,[[5,12]])})));return function(){return t.apply(this,arguments)}}(),E=function(){var t=Object(m.a)(regeneratorRuntime.mark((function t(){var e,r,o,audio;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("STICKY: STOP RECORDING"),R.value=!1,O.value=5,z.value=null,e=f(j);try{for(e.s();!(r=e.n()).done;)o=r.value,j.delete(o),clearInterval(o)}catch(t){e.e(t)}finally{e.f()}return t.prev=6,t.next=9,h.microphoneStop();case 9:if(!(audio=t.sent)){t.next=19;break}return console.log("STICKY: ADD SHOUT TO","/USERS/".concat(x.value.uid,"/shouts/").concat(Date.now(),".wav")),t.next=14,d.upload({path:"/USERS/".concat(x.value.uid,"/shouts/").concat(Date.now(),".wav"),data:audio.recordDataBase64,base64:!0});case 14:return I.value=t.sent,t.next=17,C();case 17:t.next=20;break;case 19:c.show({text:k.t("notify.no_audio"),color:"error"});case 20:t.next=24;break;case 22:t.prev=22,t.t0=t.catch(6);case 24:case"end":return t.stop()}}),t,null,[[6,22]])})));return function(){return t.apply(this,arguments)}}();return{loading:w,user:x,profile:y,dialog:dialog,buttonText:S,timerCount:O,timerCountText:z,openDialog:C,startRecording:N,stopRecording:E}}}),x=k,y=r(37),component=Object(y.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r(o.a,{staticClass:"mb-6 py-7",attrs:{loading:t.loading,color:"primary rounded-lg white--text alertBtn",elevation:"0",block:"","x-large":""},on:{mousedown:t.startRecording,mouseup:t.stopRecording,touchstart:t.startRecording,touchend:t.stopRecording,touchcancel:t.stopRecording,contextmenu:function(e){return e.preventDefault(),t.startRecording.apply(null,arguments)}}},[r(d.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticStyle:{flex:"initial","margin-right":"10px"},attrs:{height:"45",width:"45",contain:"",src:"/icons/Shout.svg"}}),t._v("\n    "+t._s(t.buttonText)+" "+t._s(t.timerCountText)+"\n  ")],1),t._v(" "),r("div",{staticClass:"text-center gray--text caption mt-n4"},[t._v("\n    "+t._s(t.$t("hold_for"))+"\n  ")]),t._v(" "),r(c.a,{attrs:{"max-width":"450"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r(n.a,{staticClass:"rounded-xl pa-8"},[r("IconsShout",{staticClass:"mb-7"}),t._v(" "),r("ElementH1",{attrs:{text:t.$t("your_shout_alert")}}),t._v(" "),t.loading?r("div",[r(h.a,{attrs:{type:"actions"}})],1):r("div",{staticClass:"pa-3"},[r(l.a,{staticClass:"justify-center"},[r(o.a,{attrs:{loading:t.loading,color:"grey darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            "+t._s(t.$t("btn.close"))+"\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{IconsShout:r(793).default,ElementH1:r(726).default})},726:function(t,e,r){"use strict";r.r(e);var o=r(164),n={name:"ElementH1",props:{text:{type:String,default:function(){return""}},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},l=r(37),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h1",{class:"text-"+t.align+" text-h1 text-md-h2 text-lg-h1",staticStyle:{"letter-spacing":"-2px !important"}},[t.prependIcon?r(o.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},729:function(t,e,r){var content=r(730);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(39).default)("1cdf85c7",content,!0,{sourceMap:!1})},730:function(t,e,r){var o=r(38)(!1);o.push([t.i,".input-tel__input{padding:1.75rem!important}.input-tel__input,input.country-selector__input{background:#f6f6f6!important;border:none!important}input.country-selector__input{height:56px!important}.country-selector__country-flag{top:25px}.country-selector__toggle{top:calc(50% - 4px)!important}.theme--light.v-app-bar.v-toolbar.v-sheet,.theme--light.v-application,.theme--light.v-tabs-items{background-color:#eef3ff}.theme--light .cart-popup-contents{background-color:#fff}.theme--light.v-stepper{background:transparent}.theme--light.v-sheet.company-card,.theme--light.v-sheet.company-list-card,.theme--light.v-sheet.post-card,.theme--light.v-sheet.product-card,.theme--light.v-sheet.recent-news-card{background-color:#fff;border:7px solid hsla(0,0%,87.1%,.2)}.theme--light.v-skeleton-loader .v-skeleton-loader__actions,.theme--light.v-skeleton-loader .v-skeleton-loader__article,.theme--light.v-skeleton-loader .v-skeleton-loader__card-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__card-text,.theme--light.v-skeleton-loader .v-skeleton-loader__date-picker,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-text,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tbody,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tfoot,.theme--light.v-skeleton-loader .v-skeleton-loader__table-thead{background:transparent!important}.theme--light.slide-up{background-color:#eef3ff}.theme--dark.v-app-bar.v-toolbar.v-sheet,.theme--dark.v-application{background-color:#242a33}.theme--dark.v-navigation-drawer,.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:transparent}.theme--dark.v-bottom-navigation{background-color:#242a33}.theme--dark.v-tabs-items{background-color:transparent}.theme--dark .cart-popup-contents,.theme--dark.shipping-options,.theme--dark.v-sheet,.theme--dark.v-tabs-items,.v-dialog .theme--dark.v-sheet{background-color:#242a33}.theme--dark.v-sheet.company-card,.theme--dark.v-sheet.company-list-card,.theme--dark.v-sheet.post-card,.theme--dark.v-sheet.product-card,.theme--dark.v-sheet.recent-news-card{background-color:#fff;border:7px solid #15191e}.theme--dark.v-card>.v-card__text,.theme--dark.v-card>.v-card__title{color:#000}.theme--dark.slide-up{background-color:#242a33}.appBarHeight{height:calc(60px + env(safe-area-inset-top))}.mobileNotch{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)!important;height:inherit!important}header.mobileNotch{max-height:100px}.v-card__subtitle,.v-card__text{line-height:1.975rem;letter-spacing:0!important}.v-application .body-1{letter-spacing:0!important}.v-application .primary{background-color:#6fa7e0;border-color:#6fa7e0}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:90%}.v-dialog--scrollable>.v-sheet{overflow-y:scroll!important}@media screen and (max-width:600px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:100%}}.admin-container{margin-top:0;margin-bottom:15px;padding-top:0;padding-left:0;padding-right:0}.avatar-elevation{border:4px solid #fff}.no-break{word-break:break-word}.v-application a{text-decoration:none;color:#6fa7e0!important}.missing-image{opacity:.25}.company-card .title,.post-card .name,.product-card .name{word-break:break-word;line-height:1.33em;letter-spacing:-.3px!important}.phoneNumberInput .input-tel__input{border-right:3px solid hsla(0,0%,46.3%,.05)!important;padding-left:1px!important}.phoneNumberInput .country-selector__input,.phoneNumberInput .input-tel__input{font-size:16px!important;border-top:3px solid hsla(0,0%,46.3%,.05)!important;border-bottom:3px solid hsla(0,0%,46.3%,.05)!important}.phoneNumberInput .country-selector__input{border-left:3px solid hsla(0,0%,46.3%,.05)!important;height:62px!important}.phoneNumberInput .country-selector__toggle{top:20px!important}.phoneNumberInput .country-selector__country-flag{top:27px!important}.v-text-field--outlined fieldset{border-color:#f1f0ef!important}.country-selector.has-hint .country-selector__input,.country-selector.has-value .country-selector__input{padding-top:0!important}.alertBtn{font-size:1.45rem;font-weight:600;letter-spacing:1px;text-transform:capitalize;color:#fff}.borderButton,.borderInput{border:3px solid #f1f0ef;background-color:#f8f9fa}details>summary{font-size:17px;margin:10px 0;border-bottom:1px solid #fefefe;padding:15px 0 30px}.v-list--rounded.v-list--three-line .v-list-item,.v-list--rounded.v-list--three-line .v-list-item:before,.v-list--rounded.v-list--three-line .v-list-item>.v-ripple__container{border-radius:32px!important}.v-list--rounded .v-list-item,.v-list--rounded .v-list-item:before,.v-list--rounded .v-list-item>.v-ripple__container{border-radius:15px!important}.myshout .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){border:2px solid #f0f0ef;background:#f9f9f9;margin-bottom:15px}.myshout .v-list-item__title{font-size:1rem;font-weight:600}.myshout .v-list-item__subtitle{font-size:.9rem}.myshout .v-list-item__icon{width:80px;height:80px;border-radius:20px;text-align:center}.myshout .v-list-item__icon .v-icon{font-size:33px;width:100%}.v-application--is-ltr .myshout .v-list-item__action:first-child,.v-application--is-ltr .myshout .v-list-item__icon:first-child{margin-right:10px}.theme--light.v-image{color:rgba(0,0,0,.87)}.theme--dark.v-image{color:#fff}.v-image{z-index:0}.v-image__image,.v-image__placeholder{z-index:-1;position:absolute;top:0;left:0;width:100%;height:100%}.v-image__image{background-repeat:no-repeat}.v-image__image--preload{filter:blur(2px)}.v-image__image--contain{background-size:contain}.v-image__image--cover{background-size:cover}",""]),t.exports=o},731:function(t,e,r){var content=r(732);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(39).default)("2fba213c",content,!0,{sourceMap:!1})},732:function(t,e,r){var o=r(38)(!1);o.push([t.i,".input-tel__input{padding:1.75rem!important}.input-tel__input,input.country-selector__input{background:#f6f6f6!important;border:none!important}input.country-selector__input{height:56px!important}.country-selector__country-flag{top:25px}.country-selector__toggle{top:calc(50% - 4px)!important}.theme--light.v-app-bar.v-toolbar.v-sheet,.theme--light.v-application,.theme--light.v-tabs-items{background-color:#eef3ff}.theme--light .cart-popup-contents{background-color:#fff}.theme--light.v-stepper{background:transparent}.theme--light.v-sheet.company-card,.theme--light.v-sheet.company-list-card,.theme--light.v-sheet.post-card,.theme--light.v-sheet.product-card,.theme--light.v-sheet.recent-news-card{background-color:#fff;border:7px solid hsla(0,0%,87.1%,.2)}.theme--light.v-skeleton-loader .v-skeleton-loader__actions,.theme--light.v-skeleton-loader .v-skeleton-loader__article,.theme--light.v-skeleton-loader .v-skeleton-loader__card-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__card-text,.theme--light.v-skeleton-loader .v-skeleton-loader__date-picker,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-text,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tbody,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tfoot,.theme--light.v-skeleton-loader .v-skeleton-loader__table-thead{background:transparent!important}.theme--light.slide-up{background-color:#eef3ff}.theme--dark.v-app-bar.v-toolbar.v-sheet,.theme--dark.v-application{background-color:#242a33}.theme--dark.v-navigation-drawer,.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:transparent}.theme--dark.v-bottom-navigation{background-color:#242a33}.theme--dark.v-tabs-items{background-color:transparent}.theme--dark .cart-popup-contents,.theme--dark.shipping-options,.theme--dark.v-sheet,.theme--dark.v-tabs-items,.v-dialog .theme--dark.v-sheet{background-color:#242a33}.theme--dark.v-sheet.company-card,.theme--dark.v-sheet.company-list-card,.theme--dark.v-sheet.post-card,.theme--dark.v-sheet.product-card,.theme--dark.v-sheet.recent-news-card{background-color:#fff;border:7px solid #15191e}.theme--dark.v-card>.v-card__text,.theme--dark.v-card>.v-card__title{color:#000}.theme--dark.slide-up{background-color:#242a33}.appBarHeight{height:calc(60px + env(safe-area-inset-top))}.mobileNotch{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)!important;height:inherit!important}header.mobileNotch{max-height:100px}.v-card__subtitle,.v-card__text{line-height:1.975rem;letter-spacing:0!important}.v-application .body-1{letter-spacing:0!important}.v-application .primary{background-color:#6fa7e0;border-color:#6fa7e0}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:90%}.v-dialog--scrollable>.v-sheet{overflow-y:scroll!important}@media screen and (max-width:600px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:100%}}.admin-container{margin-top:0;margin-bottom:15px;padding-top:0;padding-left:0;padding-right:0}.avatar-elevation{border:4px solid #fff}.no-break{word-break:break-word}.v-application a{text-decoration:none;color:#6fa7e0!important}.missing-image{opacity:.25}.company-card .title,.post-card .name,.product-card .name{word-break:break-word;line-height:1.33em;letter-spacing:-.3px!important}.phoneNumberInput .input-tel__input{border-right:3px solid hsla(0,0%,46.3%,.05)!important;padding-left:1px!important}.phoneNumberInput .country-selector__input,.phoneNumberInput .input-tel__input{font-size:16px!important;border-top:3px solid hsla(0,0%,46.3%,.05)!important;border-bottom:3px solid hsla(0,0%,46.3%,.05)!important}.phoneNumberInput .country-selector__input{border-left:3px solid hsla(0,0%,46.3%,.05)!important;height:62px!important}.phoneNumberInput .country-selector__toggle{top:20px!important}.phoneNumberInput .country-selector__country-flag{top:27px!important}.v-text-field--outlined fieldset{border-color:#f1f0ef!important}.country-selector.has-hint .country-selector__input,.country-selector.has-value .country-selector__input{padding-top:0!important}.alertBtn{font-size:1.45rem;font-weight:600;letter-spacing:1px;text-transform:capitalize;color:#fff}.borderButton,.borderInput{border:3px solid #f1f0ef;background-color:#f8f9fa}details>summary{font-size:17px;margin:10px 0;border-bottom:1px solid #fefefe;padding:15px 0 30px}.v-list--rounded.v-list--three-line .v-list-item,.v-list--rounded.v-list--three-line .v-list-item:before,.v-list--rounded.v-list--three-line .v-list-item>.v-ripple__container{border-radius:32px!important}.v-list--rounded .v-list-item,.v-list--rounded .v-list-item:before,.v-list--rounded .v-list-item>.v-ripple__container{border-radius:15px!important}.myshout .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){border:2px solid #f0f0ef;background:#f9f9f9;margin-bottom:15px}.myshout .v-list-item__title{font-size:1rem;font-weight:600}.myshout .v-list-item__subtitle{font-size:.9rem}.myshout .v-list-item__icon{width:80px;height:80px;border-radius:20px;text-align:center}.myshout .v-list-item__icon .v-icon{font-size:33px;width:100%}.v-application--is-ltr .myshout .v-list-item__action:first-child,.v-application--is-ltr .myshout .v-list-item__icon:first-child{margin-right:10px}.v-responsive{position:relative;overflow:hidden;flex:1 0 auto;max-width:100%;display:flex}.v-responsive__content{flex:1 0 0px;max-width:100%}.v-application--is-ltr .v-responsive__sizer~.v-responsive__content{margin-left:-100%}.v-application--is-rtl .v-responsive__sizer~.v-responsive__content{margin-right:-100%}.v-responsive__sizer{transition:padding-bottom .2s cubic-bezier(.25,.8,.5,1);flex:1 0 0px}",""]),t.exports=o},748:function(t,e,r){"use strict";var o=r(28),n=(r(55),r(97),r(397),r(104),r(65),r(729),r(171)),l=(r(731),r(105)),c=r(29),d=r(3),h=Object(c.a)(l.a).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},Object(d.r)(this))}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),m=r(49),v=r(114),f=r(30),_="undefined"!=typeof window&&"IntersectionObserver"in window;e.a=Object(c.a)(h,m.a).extend({name:"v-img",directives:{intersect:n.b},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(o.a)(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var image=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[image]):image}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,r){if(!_||r||this.eager){if(this.normalisedSrc.lazySrc){var o=new Image;o.src=this.normalisedSrc.lazySrc,this.pollForSize(o,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,image=new Image;this.image=image,image.onload=function(){image.decode?image.decode().catch((function(e){Object(f.c)("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},image.onerror=this.onError,this.hasError=!1,this.sizes&&(image.sizes=this.sizes),this.normalisedSrc.srcset&&(image.srcset=this.normalisedSrc.srcset),image.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(image),this.getSrc()},pollForSize:function(img){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=function r(){var o=img.naturalHeight,n=img.naturalWidth;o||n?(t.naturalWidth=n,t.calculatedAspectRatio=n/o):img.complete||!t.isLoading||t.hasError||null==e||setTimeout(r,e)};r()},genContent:function(){var content=h.options.methods.genContent.call(this);return this.naturalWidth&&this._b(content.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),content},__genPlaceholder:function(){var slot=Object(d.r)(this,"placeholder");if(slot){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},slot)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=h.options.render.call(this,t),data=Object(v.a)(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:_?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,data,e.children)}})},793:function(t,e,r){"use strict";r.r(e);var o=r(748),n=r(5),l=Object(n.b)({name:"IconsShout",props:{styling:{type:Boolean,default:!0},width:{type:String,default:function(){return"6rem"}}},setup:function(){}}),c=r(37),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(o.a,{directives:[{name:"anime",rawName:"v-anime",value:{translateY:[100,0],duration:400},expression:"{\n      translateY: [100, 0],\n      duration: 400\n    }"}],staticClass:"rounded-lg",style:t.styling?"background-color:var(--v-myshoutBlue-base); border:solid 0.5rem var(--v-myshoutBlue-base); margin:0 auto;":"",attrs:{height:t.width,width:t.width,position:"center",contain:"",src:"/icons/Shout.svg"}})}),[],!1,null,null,null);e.default=component.exports}}]);