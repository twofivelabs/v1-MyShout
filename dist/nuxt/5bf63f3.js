(window.webpackJsonp=window.webpackJsonp||[]).push([[163,61,89,92,114],{1113:function(t,e,r){"use strict";r.r(e);var l=r(1072),o=r(881),n=r(738),f=r(754),c=r(790),x=r(175),d=r(282),m=r(176),h=r(283),v=r(107),w=r(286),_=r(154),k=r(753),y=r(759),O=r(817),j=r(821),$=r(5),P=Object($.b)({name:"SettingsPage",middleware:"authenticated",setup:function(){return{loading:Object($.i)(!1),users:Object($.i)([])}}}),C=r(35),component=Object(C.a)(P,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r(l.a,{staticClass:"mobileNotch appBarHeight",attrs:{color:"white",app:"",fixed:"",top:""}},[r(o.a,[r(n.a,{attrs:{to:"/profile",text:"",color:"transparent"}},[r(x.a,{staticClass:"pr-2 py-3 pl-2",attrs:{color:"myshoutDarkGrey"}},[t._v("\n          mdi-arrow-left\n        ")])],1)],1),t._v(" "),r(j.b,{staticClass:"pl-0"},[r("div",{staticClass:"d-flex align-center"},[r("ElementH2",{attrs:{align:"left",text:t.$t("settings")}})],1)]),t._v(" "),r(O.a)],1),t._v(" "),r(c.a,{staticClass:"px-0 pt-4 mt-8 mb-12 pb-12 mobileNotch"},[t.loading?r(k.a,[r(f.a,[r(y.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"50",type:"text"}}),t._v(" "),r(y.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"50",type:"text"}}),t._v(" "),r(y.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"50",type:"text"}}),t._v(" "),r(y.a,{staticClass:"mb-6",attrs:{width:"100%","max-height":"50",type:"text"}})],1)],1):t._e(),t._v(" "),r("div",{staticClass:"d-flex justify-center"},[r("UserDarkmode",{staticClass:"mx-2"})],1),t._v(" "),r(d.a,{staticClass:"myshout",attrs:{"three-line":"",rounded:"",color:"transparent"}},[r(w.a,[r(m.a,[r(_.a,{staticStyle:{"background-color":"var(--v-myshoutOrange-base)"}},[r(x.a,[t._v("mdi-google-maps")])],1),t._v(" "),r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.location_permissions")))]),t._v(" "),r(v.b,[t._v(t._s(t.$t("sharing_your_location_sub")))])],1),t._v(" "),r(h.a,[r("MapLocationtoggle",{staticClass:"mx-2",attrs:{label:""}})],1)],1),t._v(" "),r(m.a,[r(_.a,{staticStyle:{"background-color":"var(--v-myshoutGreen-base)"}},[r(x.a,[t._v("mdi-message-outline")])],1),t._v(" "),r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.notification_permissions")))]),t._v(" "),r(v.b,[t._v(t._s(t.$t("receive_notifications_sub")))])],1),t._v(" "),r(h.a,[r("NotificationsToggle",{staticClass:"mx-2",attrs:{label:""}})],1)],1)],1)],1),t._v(" "),r(d.a,{staticClass:"myshout",attrs:{rounded:"",color:"transparent"}},[r(w.a,[r(m.a,{on:{click:function(e){return t.$router.push("/page/account-settings")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.account_settings")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/about-us")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.about_us")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/language")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.language")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/help-center")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.help_center")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/faq")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.frequent_questions")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/contact")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.feedback")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1),t._v(" "),r(m.a,{on:{click:function(e){return t.$router.push("/page/privacy")}}},[r(v.a,[r(v.c,[t._v(t._s(t.$t("btn.privacy_terms")))])],1),t._v(" "),r(h.a,[r(n.a,{attrs:{icon:""}},[r(x.a,{attrs:{color:"grey lighten-1"}},[t._v("mdi-chevron-right")])],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ElementH2:r(800).default,UserDarkmode:r(981).default,MapLocationtoggle:r(982).default,NotificationsToggle:r(983).default})},765:function(t,e,r){var content=r(773);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(38).default)("744bab4a",content,!0,{sourceMap:!1})},773:function(t,e,r){var l=r(37)(!1);l.push([t.i,".input-tel__input{background:#f6f6f6 !important;border:none !important;padding:1.75rem !important}input.country-selector__input{border:none !important;background:#f6f6f6 !important;height:56px !important}.country-selector__country-flag{top:25px}.country-selector__toggle{top:calc(50% - 4px) !important}.theme--light.v-application,.theme--light.v-app-bar.v-toolbar.v-sheet{background-color:#eef3ff}.theme--light.v-tabs-items{background-color:#eef3ff}.theme--light .cart-popup-contents{background-color:#fff}.theme--light.v-stepper{background:transparent}.theme--light.v-sheet.product-card,.theme--light.v-sheet.company-card,.theme--light.v-sheet.post-card,.theme--light.v-sheet.recent-news-card,.theme--light.v-sheet.company-list-card{background-color:#fff;border:7px solid rgba(222,222,222,.2)}.theme--light.v-skeleton-loader .v-skeleton-loader__actions,.theme--light.v-skeleton-loader .v-skeleton-loader__article,.theme--light.v-skeleton-loader .v-skeleton-loader__card-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__card-text,.theme--light.v-skeleton-loader .v-skeleton-loader__date-picker,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-text,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__table-thead,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tbody,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tfoot{background:transparent !important}.theme--light.slide-up{background-color:#eef3ff}.theme--dark.v-application,.theme--dark.v-app-bar.v-toolbar.v-sheet{background-color:#242a33}.theme--dark.v-navigation-drawer{background-color:transparent}.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:transparent}.theme--dark.v-bottom-navigation{background-color:#242a33}.theme--dark.v-tabs-items{background-color:transparent}.theme--dark.v-sheet{background-color:#242a33}.v-dialog .theme--dark.v-sheet{background-color:#242a33}.theme--dark.shipping-options{background-color:#242a33}.theme--dark.v-tabs-items{background-color:#242a33}.theme--dark .cart-popup-contents{background-color:#242a33}.theme--dark.v-sheet.product-card,.theme--dark.v-sheet.company-card,.theme--dark.v-sheet.post-card,.theme--dark.v-sheet.recent-news-card,.theme--dark.v-sheet.company-list-card{background-color:#fff;border:7px solid #15191e}.theme--dark.v-card>.v-card__title{color:#000}.theme--dark.v-card>.v-card__text{color:#000}.theme--dark.slide-up{background-color:#242a33}.appBarHeight{height:calc(60px + env(safe-area-inset-top))}.mobileNotch{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) !important;height:inherit !important}header.mobileNotch{max-height:100px}.v-card__subtitle,.v-card__text{line-height:1.975rem;letter-spacing:0 !important}.v-application .body-1{letter-spacing:0 !important}.v-application .primary{background-color:#6fa7e0;border-color:#6fa7e0}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:90%}.v-dialog--scrollable>.v-sheet{overflow-y:scroll !important}@media screen and (max-width: 600px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:100%}}.admin-container{margin-top:0;margin-bottom:15px;padding-top:0;padding-left:0;padding-right:0}.avatar-elevation{border:4px solid #fff}.no-break{word-break:break-word}.v-application a{text-decoration:none;color:#6fa7e0 !important}.missing-image{opacity:.25}.post-card .name,.product-card .name,.company-card .title{word-break:break-word;line-height:1.33em;letter-spacing:-0.3px !important}.phoneNumberInput .input-tel__input{font-size:16px !important;border-top:3px solid rgba(118,118,118,.05) !important;border-right:3px solid rgba(118,118,118,.05) !important;border-bottom:3px solid rgba(118,118,118,.05) !important;padding-left:1px !important}.phoneNumberInput .country-selector__input{font-size:16px !important;border-top:3px solid rgba(118,118,118,.05) !important;border-left:3px solid rgba(118,118,118,.05) !important;border-bottom:3px solid rgba(118,118,118,.05) !important;height:62px !important}.phoneNumberInput .country-selector__toggle{top:20px !important}.phoneNumberInput .country-selector__country-flag{top:27px !important}.v-text-field--outlined fieldset{border-color:#f1f0ef !important}.country-selector.has-hint .country-selector__input,.country-selector.has-value .country-selector__input{padding-top:0 !important}.alertBtn{font-size:1.45rem;font-weight:600;letter-spacing:1px;text-transform:capitalize;color:#fff}.borderButton{border:3px solid #f1f0ef;background-color:#f8f9fa}.borderInput{border:3px solid #f1f0ef;background-color:#f8f9fa}details>summary{font-size:17px;margin:10px 0px 10px;border-bottom:1px solid #fefefe;padding:15px 0 30px}.v-list--rounded.v-list--three-line .v-list-item,.v-list--rounded.v-list--three-line .v-list-item::before,.v-list--rounded.v-list--three-line .v-list-item>.v-ripple__container{border-radius:32px !important}.v-list--rounded .v-list-item,.v-list--rounded .v-list-item::before,.v-list--rounded .v-list-item>.v-ripple__container{border-radius:15px !important}.myshout .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){border:2px solid #f0f0ef;background:#f9f9f9;margin-bottom:15px}.myshout .v-list-item__title{font-size:1rem;font-weight:600}.myshout .v-list-item__subtitle{font-size:.9rem}.myshout .v-list-item__icon{width:80px;height:80px;border-radius:20px;text-align:center}.myshout .v-list-item__icon .v-icon{font-size:33px;width:100%}.v-application--is-ltr .myshout .v-list-item__action:first-child,.v-application--is-ltr .myshout .v-list-item__icon:first-child{margin-right:10px}.container.grow-shrink-0{flex-grow:0;flex-shrink:0}.container.fill-height{align-items:center;display:flex;flex-wrap:wrap}.container.fill-height>.row{flex:1 1 100%;max-width:calc(100% + 24px)}.container.fill-height>.layout{height:100%;flex:1 1 auto}.container.fill-height>.layout.grow-shrink-0{flex-grow:0;flex-shrink:0}.container.grid-list-xs .layout .flex{padding:1px}.container.grid-list-xs .layout:only-child{margin:-1px}.container.grid-list-xs .layout:not(:only-child){margin:auto -1px}.container.grid-list-xs *:not(:only-child) .layout:first-child{margin-top:-1px}.container.grid-list-xs *:not(:only-child) .layout:last-child{margin-bottom:-1px}.container.grid-list-sm .layout .flex{padding:2px}.container.grid-list-sm .layout:only-child{margin:-2px}.container.grid-list-sm .layout:not(:only-child){margin:auto -2px}.container.grid-list-sm *:not(:only-child) .layout:first-child{margin-top:-2px}.container.grid-list-sm *:not(:only-child) .layout:last-child{margin-bottom:-2px}.container.grid-list-md .layout .flex{padding:4px}.container.grid-list-md .layout:only-child{margin:-4px}.container.grid-list-md .layout:not(:only-child){margin:auto -4px}.container.grid-list-md *:not(:only-child) .layout:first-child{margin-top:-4px}.container.grid-list-md *:not(:only-child) .layout:last-child{margin-bottom:-4px}.container.grid-list-lg .layout .flex{padding:8px}.container.grid-list-lg .layout:only-child{margin:-8px}.container.grid-list-lg .layout:not(:only-child){margin:auto -8px}.container.grid-list-lg *:not(:only-child) .layout:first-child{margin-top:-8px}.container.grid-list-lg *:not(:only-child) .layout:last-child{margin-bottom:-8px}.container.grid-list-xl .layout .flex{padding:12px}.container.grid-list-xl .layout:only-child{margin:-12px}.container.grid-list-xl .layout:not(:only-child){margin:auto -12px}.container.grid-list-xl *:not(:only-child) .layout:first-child{margin-top:-12px}.container.grid-list-xl *:not(:only-child) .layout:last-child{margin-bottom:-12px}.layout{display:flex;flex:1 1 auto;flex-wrap:nowrap;min-width:0}.layout.reverse{flex-direction:row-reverse}.layout.column{flex-direction:column}.layout.column.reverse{flex-direction:column-reverse}.layout.column>.flex{max-width:100%}.layout.wrap{flex-wrap:wrap}.layout.grow-shrink-0{flex-grow:0;flex-shrink:0}@media all and (min-width: 0){.flex.xs12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-xs12{order:12}.flex.xs11{flex-basis:91.6666666667%;flex-grow:0;max-width:91.6666666667%}.flex.order-xs11{order:11}.flex.xs10{flex-basis:83.3333333333%;flex-grow:0;max-width:83.3333333333%}.flex.order-xs10{order:10}.flex.xs9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-xs9{order:9}.flex.xs8{flex-basis:66.6666666667%;flex-grow:0;max-width:66.6666666667%}.flex.order-xs8{order:8}.flex.xs7{flex-basis:58.3333333333%;flex-grow:0;max-width:58.3333333333%}.flex.order-xs7{order:7}.flex.xs6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-xs6{order:6}.flex.xs5{flex-basis:41.6666666667%;flex-grow:0;max-width:41.6666666667%}.flex.order-xs5{order:5}.flex.xs4{flex-basis:33.3333333333%;flex-grow:0;max-width:33.3333333333%}.flex.order-xs4{order:4}.flex.xs3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-xs3{order:3}.flex.xs2{flex-basis:16.6666666667%;flex-grow:0;max-width:16.6666666667%}.flex.order-xs2{order:2}.flex.xs1{flex-basis:8.3333333333%;flex-grow:0;max-width:8.3333333333%}.flex.order-xs1{order:1}.v-application--is-ltr .flex.offset-xs12{margin-left:100%}.v-application--is-rtl .flex.offset-xs12{margin-right:100%}.v-application--is-ltr .flex.offset-xs11{margin-left:91.6666666667%}.v-application--is-rtl .flex.offset-xs11{margin-right:91.6666666667%}.v-application--is-ltr .flex.offset-xs10{margin-left:83.3333333333%}.v-application--is-rtl .flex.offset-xs10{margin-right:83.3333333333%}.v-application--is-ltr .flex.offset-xs9{margin-left:75%}.v-application--is-rtl .flex.offset-xs9{margin-right:75%}.v-application--is-ltr .flex.offset-xs8{margin-left:66.6666666667%}.v-application--is-rtl .flex.offset-xs8{margin-right:66.6666666667%}.v-application--is-ltr .flex.offset-xs7{margin-left:58.3333333333%}.v-application--is-rtl .flex.offset-xs7{margin-right:58.3333333333%}.v-application--is-ltr .flex.offset-xs6{margin-left:50%}.v-application--is-rtl .flex.offset-xs6{margin-right:50%}.v-application--is-ltr .flex.offset-xs5{margin-left:41.6666666667%}.v-application--is-rtl .flex.offset-xs5{margin-right:41.6666666667%}.v-application--is-ltr .flex.offset-xs4{margin-left:33.3333333333%}.v-application--is-rtl .flex.offset-xs4{margin-right:33.3333333333%}.v-application--is-ltr .flex.offset-xs3{margin-left:25%}.v-application--is-rtl .flex.offset-xs3{margin-right:25%}.v-application--is-ltr .flex.offset-xs2{margin-left:16.6666666667%}.v-application--is-rtl .flex.offset-xs2{margin-right:16.6666666667%}.v-application--is-ltr .flex.offset-xs1{margin-left:8.3333333333%}.v-application--is-rtl .flex.offset-xs1{margin-right:8.3333333333%}.v-application--is-ltr .flex.offset-xs0{margin-left:0%}.v-application--is-rtl .flex.offset-xs0{margin-right:0%}}@media all and (min-width: 600px){.flex.sm12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-sm12{order:12}.flex.sm11{flex-basis:91.6666666667%;flex-grow:0;max-width:91.6666666667%}.flex.order-sm11{order:11}.flex.sm10{flex-basis:83.3333333333%;flex-grow:0;max-width:83.3333333333%}.flex.order-sm10{order:10}.flex.sm9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-sm9{order:9}.flex.sm8{flex-basis:66.6666666667%;flex-grow:0;max-width:66.6666666667%}.flex.order-sm8{order:8}.flex.sm7{flex-basis:58.3333333333%;flex-grow:0;max-width:58.3333333333%}.flex.order-sm7{order:7}.flex.sm6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-sm6{order:6}.flex.sm5{flex-basis:41.6666666667%;flex-grow:0;max-width:41.6666666667%}.flex.order-sm5{order:5}.flex.sm4{flex-basis:33.3333333333%;flex-grow:0;max-width:33.3333333333%}.flex.order-sm4{order:4}.flex.sm3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-sm3{order:3}.flex.sm2{flex-basis:16.6666666667%;flex-grow:0;max-width:16.6666666667%}.flex.order-sm2{order:2}.flex.sm1{flex-basis:8.3333333333%;flex-grow:0;max-width:8.3333333333%}.flex.order-sm1{order:1}.v-application--is-ltr .flex.offset-sm12{margin-left:100%}.v-application--is-rtl .flex.offset-sm12{margin-right:100%}.v-application--is-ltr .flex.offset-sm11{margin-left:91.6666666667%}.v-application--is-rtl .flex.offset-sm11{margin-right:91.6666666667%}.v-application--is-ltr .flex.offset-sm10{margin-left:83.3333333333%}.v-application--is-rtl .flex.offset-sm10{margin-right:83.3333333333%}.v-application--is-ltr .flex.offset-sm9{margin-left:75%}.v-application--is-rtl .flex.offset-sm9{margin-right:75%}.v-application--is-ltr .flex.offset-sm8{margin-left:66.6666666667%}.v-application--is-rtl .flex.offset-sm8{margin-right:66.6666666667%}.v-application--is-ltr .flex.offset-sm7{margin-left:58.3333333333%}.v-application--is-rtl .flex.offset-sm7{margin-right:58.3333333333%}.v-application--is-ltr .flex.offset-sm6{margin-left:50%}.v-application--is-rtl .flex.offset-sm6{margin-right:50%}.v-application--is-ltr .flex.offset-sm5{margin-left:41.6666666667%}.v-application--is-rtl .flex.offset-sm5{margin-right:41.6666666667%}.v-application--is-ltr .flex.offset-sm4{margin-left:33.3333333333%}.v-application--is-rtl .flex.offset-sm4{margin-right:33.3333333333%}.v-application--is-ltr .flex.offset-sm3{margin-left:25%}.v-application--is-rtl .flex.offset-sm3{margin-right:25%}.v-application--is-ltr .flex.offset-sm2{margin-left:16.6666666667%}.v-application--is-rtl .flex.offset-sm2{margin-right:16.6666666667%}.v-application--is-ltr .flex.offset-sm1{margin-left:8.3333333333%}.v-application--is-rtl .flex.offset-sm1{margin-right:8.3333333333%}.v-application--is-ltr .flex.offset-sm0{margin-left:0%}.v-application--is-rtl .flex.offset-sm0{margin-right:0%}}@media all and (min-width: 960px){.flex.md12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-md12{order:12}.flex.md11{flex-basis:91.6666666667%;flex-grow:0;max-width:91.6666666667%}.flex.order-md11{order:11}.flex.md10{flex-basis:83.3333333333%;flex-grow:0;max-width:83.3333333333%}.flex.order-md10{order:10}.flex.md9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-md9{order:9}.flex.md8{flex-basis:66.6666666667%;flex-grow:0;max-width:66.6666666667%}.flex.order-md8{order:8}.flex.md7{flex-basis:58.3333333333%;flex-grow:0;max-width:58.3333333333%}.flex.order-md7{order:7}.flex.md6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-md6{order:6}.flex.md5{flex-basis:41.6666666667%;flex-grow:0;max-width:41.6666666667%}.flex.order-md5{order:5}.flex.md4{flex-basis:33.3333333333%;flex-grow:0;max-width:33.3333333333%}.flex.order-md4{order:4}.flex.md3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-md3{order:3}.flex.md2{flex-basis:16.6666666667%;flex-grow:0;max-width:16.6666666667%}.flex.order-md2{order:2}.flex.md1{flex-basis:8.3333333333%;flex-grow:0;max-width:8.3333333333%}.flex.order-md1{order:1}.v-application--is-ltr .flex.offset-md12{margin-left:100%}.v-application--is-rtl .flex.offset-md12{margin-right:100%}.v-application--is-ltr .flex.offset-md11{margin-left:91.6666666667%}.v-application--is-rtl .flex.offset-md11{margin-right:91.6666666667%}.v-application--is-ltr .flex.offset-md10{margin-left:83.3333333333%}.v-application--is-rtl .flex.offset-md10{margin-right:83.3333333333%}.v-application--is-ltr .flex.offset-md9{margin-left:75%}.v-application--is-rtl .flex.offset-md9{margin-right:75%}.v-application--is-ltr .flex.offset-md8{margin-left:66.6666666667%}.v-application--is-rtl .flex.offset-md8{margin-right:66.6666666667%}.v-application--is-ltr .flex.offset-md7{margin-left:58.3333333333%}.v-application--is-rtl .flex.offset-md7{margin-right:58.3333333333%}.v-application--is-ltr .flex.offset-md6{margin-left:50%}.v-application--is-rtl .flex.offset-md6{margin-right:50%}.v-application--is-ltr .flex.offset-md5{margin-left:41.6666666667%}.v-application--is-rtl .flex.offset-md5{margin-right:41.6666666667%}.v-application--is-ltr .flex.offset-md4{margin-left:33.3333333333%}.v-application--is-rtl .flex.offset-md4{margin-right:33.3333333333%}.v-application--is-ltr .flex.offset-md3{margin-left:25%}.v-application--is-rtl .flex.offset-md3{margin-right:25%}.v-application--is-ltr .flex.offset-md2{margin-left:16.6666666667%}.v-application--is-rtl .flex.offset-md2{margin-right:16.6666666667%}.v-application--is-ltr .flex.offset-md1{margin-left:8.3333333333%}.v-application--is-rtl .flex.offset-md1{margin-right:8.3333333333%}.v-application--is-ltr .flex.offset-md0{margin-left:0%}.v-application--is-rtl .flex.offset-md0{margin-right:0%}}@media all and (min-width: 1264px){.flex.lg12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-lg12{order:12}.flex.lg11{flex-basis:91.6666666667%;flex-grow:0;max-width:91.6666666667%}.flex.order-lg11{order:11}.flex.lg10{flex-basis:83.3333333333%;flex-grow:0;max-width:83.3333333333%}.flex.order-lg10{order:10}.flex.lg9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-lg9{order:9}.flex.lg8{flex-basis:66.6666666667%;flex-grow:0;max-width:66.6666666667%}.flex.order-lg8{order:8}.flex.lg7{flex-basis:58.3333333333%;flex-grow:0;max-width:58.3333333333%}.flex.order-lg7{order:7}.flex.lg6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-lg6{order:6}.flex.lg5{flex-basis:41.6666666667%;flex-grow:0;max-width:41.6666666667%}.flex.order-lg5{order:5}.flex.lg4{flex-basis:33.3333333333%;flex-grow:0;max-width:33.3333333333%}.flex.order-lg4{order:4}.flex.lg3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-lg3{order:3}.flex.lg2{flex-basis:16.6666666667%;flex-grow:0;max-width:16.6666666667%}.flex.order-lg2{order:2}.flex.lg1{flex-basis:8.3333333333%;flex-grow:0;max-width:8.3333333333%}.flex.order-lg1{order:1}.v-application--is-ltr .flex.offset-lg12{margin-left:100%}.v-application--is-rtl .flex.offset-lg12{margin-right:100%}.v-application--is-ltr .flex.offset-lg11{margin-left:91.6666666667%}.v-application--is-rtl .flex.offset-lg11{margin-right:91.6666666667%}.v-application--is-ltr .flex.offset-lg10{margin-left:83.3333333333%}.v-application--is-rtl .flex.offset-lg10{margin-right:83.3333333333%}.v-application--is-ltr .flex.offset-lg9{margin-left:75%}.v-application--is-rtl .flex.offset-lg9{margin-right:75%}.v-application--is-ltr .flex.offset-lg8{margin-left:66.6666666667%}.v-application--is-rtl .flex.offset-lg8{margin-right:66.6666666667%}.v-application--is-ltr .flex.offset-lg7{margin-left:58.3333333333%}.v-application--is-rtl .flex.offset-lg7{margin-right:58.3333333333%}.v-application--is-ltr .flex.offset-lg6{margin-left:50%}.v-application--is-rtl .flex.offset-lg6{margin-right:50%}.v-application--is-ltr .flex.offset-lg5{margin-left:41.6666666667%}.v-application--is-rtl .flex.offset-lg5{margin-right:41.6666666667%}.v-application--is-ltr .flex.offset-lg4{margin-left:33.3333333333%}.v-application--is-rtl .flex.offset-lg4{margin-right:33.3333333333%}.v-application--is-ltr .flex.offset-lg3{margin-left:25%}.v-application--is-rtl .flex.offset-lg3{margin-right:25%}.v-application--is-ltr .flex.offset-lg2{margin-left:16.6666666667%}.v-application--is-rtl .flex.offset-lg2{margin-right:16.6666666667%}.v-application--is-ltr .flex.offset-lg1{margin-left:8.3333333333%}.v-application--is-rtl .flex.offset-lg1{margin-right:8.3333333333%}.v-application--is-ltr .flex.offset-lg0{margin-left:0%}.v-application--is-rtl .flex.offset-lg0{margin-right:0%}}@media all and (min-width: 1904px){.flex.xl12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-xl12{order:12}.flex.xl11{flex-basis:91.6666666667%;flex-grow:0;max-width:91.6666666667%}.flex.order-xl11{order:11}.flex.xl10{flex-basis:83.3333333333%;flex-grow:0;max-width:83.3333333333%}.flex.order-xl10{order:10}.flex.xl9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-xl9{order:9}.flex.xl8{flex-basis:66.6666666667%;flex-grow:0;max-width:66.6666666667%}.flex.order-xl8{order:8}.flex.xl7{flex-basis:58.3333333333%;flex-grow:0;max-width:58.3333333333%}.flex.order-xl7{order:7}.flex.xl6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-xl6{order:6}.flex.xl5{flex-basis:41.6666666667%;flex-grow:0;max-width:41.6666666667%}.flex.order-xl5{order:5}.flex.xl4{flex-basis:33.3333333333%;flex-grow:0;max-width:33.3333333333%}.flex.order-xl4{order:4}.flex.xl3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-xl3{order:3}.flex.xl2{flex-basis:16.6666666667%;flex-grow:0;max-width:16.6666666667%}.flex.order-xl2{order:2}.flex.xl1{flex-basis:8.3333333333%;flex-grow:0;max-width:8.3333333333%}.flex.order-xl1{order:1}.v-application--is-ltr .flex.offset-xl12{margin-left:100%}.v-application--is-rtl .flex.offset-xl12{margin-right:100%}.v-application--is-ltr .flex.offset-xl11{margin-left:91.6666666667%}.v-application--is-rtl .flex.offset-xl11{margin-right:91.6666666667%}.v-application--is-ltr .flex.offset-xl10{margin-left:83.3333333333%}.v-application--is-rtl .flex.offset-xl10{margin-right:83.3333333333%}.v-application--is-ltr .flex.offset-xl9{margin-left:75%}.v-application--is-rtl .flex.offset-xl9{margin-right:75%}.v-application--is-ltr .flex.offset-xl8{margin-left:66.6666666667%}.v-application--is-rtl .flex.offset-xl8{margin-right:66.6666666667%}.v-application--is-ltr .flex.offset-xl7{margin-left:58.3333333333%}.v-application--is-rtl .flex.offset-xl7{margin-right:58.3333333333%}.v-application--is-ltr .flex.offset-xl6{margin-left:50%}.v-application--is-rtl .flex.offset-xl6{margin-right:50%}.v-application--is-ltr .flex.offset-xl5{margin-left:41.6666666667%}.v-application--is-rtl .flex.offset-xl5{margin-right:41.6666666667%}.v-application--is-ltr .flex.offset-xl4{margin-left:33.3333333333%}.v-application--is-rtl .flex.offset-xl4{margin-right:33.3333333333%}.v-application--is-ltr .flex.offset-xl3{margin-left:25%}.v-application--is-rtl .flex.offset-xl3{margin-right:25%}.v-application--is-ltr .flex.offset-xl2{margin-left:16.6666666667%}.v-application--is-rtl .flex.offset-xl2{margin-right:16.6666666667%}.v-application--is-ltr .flex.offset-xl1{margin-left:8.3333333333%}.v-application--is-rtl .flex.offset-xl1{margin-right:8.3333333333%}.v-application--is-ltr .flex.offset-xl0{margin-left:0%}.v-application--is-rtl .flex.offset-xl0{margin-right:0%}}.flex,.child-flex>*{flex:1 1 auto;max-width:100%}.flex.grow-shrink-0,.child-flex>*.grow-shrink-0{flex-grow:0;flex-shrink:0}.spacer{flex-grow:1 !important}.grow{flex-grow:1 !important;flex-shrink:0 !important}.shrink{flex-grow:0 !important;flex-shrink:1 !important}.fill-height{height:100%}",""]),t.exports=l},790:function(t,e,r){"use strict";r(18),r(4),r(13),r(96),r(19),r(765),r(300),r(102),r(90);var l=r(1);var o,n=r(119);e.a=(o="container",l.default.extend({name:"v-".concat(o),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,e){var r=e.props,data=e.data,l=e.children;data.staticClass="".concat(o," ").concat(data.staticClass||"").trim();var n=data.attrs;if(n){data.attrs={};var f=Object.keys(n).filter((function(t){if("slot"===t)return!1;var e=n[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}));f.length&&(data.staticClass+=" ".concat(f.join(" ")))}return r.id&&(data.domProps=data.domProps||{},data.domProps.id=r.id),t(r.tag,data,l)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,l=e.props,data=e.data,o=e.children,f=data.attrs;return f&&(data.attrs={},r=Object.keys(f).filter((function(t){if("slot"===t)return!1;var e=f[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}))),l.id&&(data.domProps=data.domProps||{},data.domProps.id=l.id),t(l.tag,Object(n.a)(data,{staticClass:"container",class:Array({"container--fluid":l.fluid}).concat(r||[])}),o)}})},800:function(t,e,r){"use strict";r.r(e);var l=r(175),o={name:"ElementH2",props:{text:{type:String,default:""},align:{type:String,default:"center"},prependIcon:{type:String,default:null}}},n=r(35),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h2",{class:"text-"+t.align+"  text-h4 text-md-h3 text-lg-h2",staticStyle:{"letter-spacing":"0px !important"}},[t.prependIcon?r(l.a,[t._v("\n    "+t._s(t.prependIcon)+"\n  ")]):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},817:function(t,e,r){"use strict";r(765);var l=r(3);e.a=Object(l.i)("spacer","div","v-spacer")},821:function(t,e,r){"use strict";r.d(e,"a",(function(){return f})),r.d(e,"b",(function(){return n}));var l=r(815),o=r(3),n=Object(o.i)("v-toolbar__title"),f=Object(o.i)("v-toolbar__items");l.a},881:function(t,e,r){"use strict";r(13),r(17),r(18),r(4),r(23),r(15),r(24);var l=r(2),o=(r(102),r(101)),n=r(738),f=r(1);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,l)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(l.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.a=f.default.extend({name:"v-app-bar-nav-icon",functional:!0,render:function(t,e){var r=e.slots,l=e.listeners,f=e.props,data=e.data,c=Object.assign(data,{staticClass:"v-app-bar__nav-icon ".concat(data.staticClass||"").trim(),props:x(x({},f),{},{icon:!0}),on:l}),d=r().default;return t(n.a,c,d||[t(o.a,"$menu")])}})},981:function(t,e,r){"use strict";r.r(e);var l=r(1074),o=(r(65),r(5)),n=Object(o.b)({name:"UserDarkmode",setup:function(){var t=Object(o.q)().state,e=Object(o.l)(),r=e.$vuetify,l=e.$ttlStorage,n=Object(o.a)((function(){return t.user.data})),f=Object(o.a)((function(){return t.user.profile}));return{loading:Object(o.i)(!1),user:n,profile:f,toggleDarkMode:function(){setTimeout((function(){r.theme.dark=!!r.theme.dark,l.set("darkMode",r.theme.dark)}),0)}}}}),f=r(35),component=Object(f.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.$config.useDarkMode?r(l.a,{attrs:{"hide-details":"true",label:"Dark Mode","prepend-icon":"mdi-brightness-4"},on:{click:t.toggleDarkMode},model:{value:t.$vuetify.theme.dark,callback:function(e){t.$set(t.$vuetify.theme,"dark",e)},expression:"$vuetify.theme.dark"}}):t._e()}),[],!1,null,null,null);e.default=component.exports},982:function(t,e,r){"use strict";r.r(e);var l=r(1074),o=r(0),n=(r(16),r(65),r(5)),f=Object(n.b)({name:"MapLocationtoggle",props:{label:{type:String,default:function(){return"Location"}}},setup:function(){var t=Object(n.q)(),e=t.state,r=t.dispatch,l=Object(n.l)().$capacitor,f=Object(n.a)((function(){return e.user.data})),c=Object(n.a)((function(){return e.user.profile})),x=Object(n.i)(!1),d=Object(n.i)(!1);Object(n.f)((function(){Object(n.d)((function(){setTimeout((function(){d.value=c.value.permissions.location}),1e3)}))}));var m=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("user/updateField",{permissions:{location:!1}});case 2:return t.next=4,l.clearWatchPosition();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),h=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!0!==d.value){t.next=5;break}return t.next=3,l.positionPermissions();case 3:t.next=7;break;case 5:return t.next=7,m();case 7:if(!d.value){t.next=10;break}return t.next=10,r("user/updateField",{permissions:{location:d.value}});case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{loading:x,user:f,profile:c,locationPermissionGranted:d,toggleLocation:h}}}),c=f,x=r(35),component=Object(x.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(l.a,{attrs:{"hide-details":"true",label:t.label,"prepend-icon":"mdi-map-marker-account"},on:{click:t.toggleLocation},model:{value:t.locationPermissionGranted,callback:function(e){t.locationPermissionGranted=e},expression:"locationPermissionGranted"}})}),[],!1,null,null,null);e.default=component.exports},983:function(t,e,r){"use strict";r.r(e);var l=r(1074),o=r(0),n=(r(16),r(65),r(5)),f=Object(n.b)({name:"NotificationsToggle",props:{label:{type:String,default:function(){return"Notifications"}}},setup:function(){var t=Object(n.q)(),e=t.state,r=t.dispatch,l=Object(n.l)(),f=l.$notify,c=l.$system,x=l.$capacitor,d=l.$fire,m=Object(n.a)((function(){return e.user.data})),h=Object(n.a)((function(){return e.user.profile})),v=Object(n.i)(!1),w=Object(n.i)(null),_=Object(n.i)(null),k=Object(n.i)(!1),y=Object(n.i)(!1);Object(n.f)(Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.device();case 2:_.value=t.sent,_.value&&_.value.platform&&("web"===_.value.platform||void 0===_.value.platform||null===_.value.platform)&&(k.value=!0),Object(n.d)((function(){setTimeout((function(){h.value.permissions.notifications&&(y.value=!0)}),1e3)}));case 5:case"end":return t.stop()}}),t)}))));var O=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("user/updateField",{permissions:{notifications:!1}});case 2:if(k.value){t.next=5;break}return t.next=5,x.pushNotificationsRemoveListeners();case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),j=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!0!==y.value){t.next=12;break}if(!k.value){t.next=7;break}return t.next=4,$();case 4:w.value=h.value.notificationWebToken,t.next=10;break;case 7:return t.next=9,x.pushNotificationsRequestAndRegisterPermissions();case 9:w.value=h.value.notificationDeviceToken;case 10:t.next=14;break;case 12:return t.next=14,O();case 14:if(!y.value){t.next=17;break}return t.next=17,r("user/updateField",{permissions:{notifications:y.value}});case 17:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),$=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,window.Notification){t.next=5;break}f.show({text:"Notifications not supported!",color:"error"}),t.next=14;break;case 5:return t.next=7,Notification.requestPermission();case 7:if(e=t.sent,y.value="granted"===e,!d.messaging){t.next=12;break}return t.next=12,d.messaging.getToken();case 12:return t.next=14,r("user/updateField",{permissions:{notifications:"granted"===e}});case 14:t.next=20;break;case 16:t.prev=16,t.t0=t.catch(0),f.show({text:"Error with your notifications.",color:"error"}),c.log({comp:"UserToggleSettings",msg:"requestWebPermissions",val:t.t0});case 20:case"end":return t.stop()}}),t,null,[[0,16]])})));return function(){return t.apply(this,arguments)}}();return{loading:v,user:m,token:w,profile:h,notificationPermissionGranted:y,toggleNotifications:j}}}),c=f,x=r(35),component=Object(x.a)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(l.a,{attrs:{"hide-details":"true",label:t.label,"prepend-icon":"mdi-bell"},on:{click:t.toggleNotifications},model:{value:t.notificationPermissionGranted,callback:function(e){t.notificationPermissionGranted=e},expression:"notificationPermissionGranted"}})}),[],!1,null,null,null);e.default=component.exports}}]);