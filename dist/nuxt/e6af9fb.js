(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{859:function(t,e,o){"use strict";var n=o(2),r=(o(55),o(4),o(15),o(17),o(19),o(23),o(16),o(24),o(291)),c=o(106),l=o(286),h=o(290),d=o(28),f=o(3);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=Object(d.a)(r.a,Object(c.b)(["top","right","bottom","left","absolute"]),l.a,h.a);e.a=_.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var a=this.dimensions.activator,t=this.dimensions.content,e=(!1!==this.attach?a.offsetLeft:a.left)||0,o=Math.max(a.width,t.width),n=0;if(n+=e,(this.left||this.$vuetify.rtl&&!this.right)&&(n-=o-a.width),this.offsetX){var r=isNaN(Number(this.maxWidth))?a.width:Math.min(a.width,Number(this.maxWidth));n+=this.left?-r:a.width}return this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),n},computedTop:function(){var a=this.dimensions.activator,t=this.dimensions.content,e=0;return this.top&&(e+=a.height-t.height),!1!==this.attach?e+=a.offsetTop:e+=a.top+this.pageYOffset,this.offsetY&&(e+=this.top?-a.height:a.height),this.nudgeTop&&(e-=parseInt(this.nudgeTop)),this.nudgeBottom&&(e+=parseInt(this.nudgeBottom)),e},hasActivator:function(){return!!(this.$slots.activator||this.$scopedSlots.activator||this.activator||this.inputActivator)},absoluteYOffset:function(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!=typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy:function(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition:function(){return{offsetTop:this.positionY||this.absoluteY,offsetLeft:this.positionX||this.absoluteX,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return Object(f.h)(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return Object(f.h)(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var o=t+e-this.pageWidth+12;return(t=(!this.left||this.right)&&o>0?Math.max(t-o,0):Math.max(t,12))+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),o=this.absoluteYOffset+e,n=this.dimensions.activator,r=this.dimensions.content.height,c=o<t+r;return c&&this.offsetOverflow&&n.top>r?t=this.pageYOffset+(n.top-r):c&&!this.allowOverflow?t=o-r-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){for(var t=this.getActivator();t;){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}else this.activatorFixed=!1},deactivate:function(){},genActivatorListeners:function(){var t=this,e=l.a.options.methods.genActivatorListeners.call(this),o=e.click;return o&&(e.click=function(e){t.openOnClick&&o&&o(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY}),e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var rect=t.getBoundingClientRect();return{top:Math.round(rect.top),left:Math.round(rect.left),bottom:Math.round(rect.bottom),right:Math.round(rect.right),width:Math.round(rect.width),height:Math.round(rect.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var rect=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var style=window.getComputedStyle(t);rect.left=parseInt(style.marginLeft),rect.top=parseInt(style.marginTop)}return rect},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var o=e.$refs.content;o&&"none"===o.style.display?(o.style.display="inline-block",t(),o.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!=typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={activator:m({},this.dimensions.activator),content:m({},this.dimensions.content)};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var o=this.getActivator();if(!o)return;e.activator=this.measure(o),e.activator.offsetLeft=o.offsetLeft,!1!==this.attach?e.activator.offsetTop=o.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){if(t.$refs.content){if(t.$refs.content.offsetParent){var o=t.getRoundedBoundedClientRect(t.$refs.content.offsetParent);t.relativeYOffset=window.pageYOffset+o.top,e.activator.top-=t.relativeYOffset,e.activator.left-=window.pageXOffset+o.left}e.content=t.measure(t.$refs.content)}t.dimensions=e}))}}})},878:function(t,e,o){var content=o(911);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(39).default)("ddd67898",content,!0,{sourceMap:!1})},908:function(t,e,o){var content=o(909);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(39).default)("dc0628f2",content,!0,{sourceMap:!1})},909:function(t,e,o){var n=o(38)(!1);n.push([t.i,".input-tel__input{padding:1.75rem!important}.input-tel__input,input.country-selector__input{background:#f6f6f6!important;border:none!important}input.country-selector__input{height:56px!important}.country-selector__country-flag{top:25px}.country-selector__toggle{top:calc(50% - 4px)!important}.theme--light.v-app-bar.v-toolbar.v-sheet,.theme--light.v-application,.theme--light.v-tabs-items{background-color:#eef3ff}.theme--light .cart-popup-contents{background-color:#fff}.theme--light.v-stepper{background:transparent}.theme--light.v-sheet.company-card,.theme--light.v-sheet.company-list-card,.theme--light.v-sheet.post-card,.theme--light.v-sheet.product-card,.theme--light.v-sheet.recent-news-card{background-color:#fff;border:7px solid hsla(0,0%,87.1%,.2)}.theme--light.v-skeleton-loader .v-skeleton-loader__actions,.theme--light.v-skeleton-loader .v-skeleton-loader__article,.theme--light.v-skeleton-loader .v-skeleton-loader__card-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__card-text,.theme--light.v-skeleton-loader .v-skeleton-loader__date-picker,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-text,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-three-line,.theme--light.v-skeleton-loader .v-skeleton-loader__list-item-two-line,.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tbody,.theme--light.v-skeleton-loader .v-skeleton-loader__table-tfoot,.theme--light.v-skeleton-loader .v-skeleton-loader__table-thead{background:transparent!important}.theme--light.slide-up{background-color:#eef3ff}.theme--dark.v-app-bar.v-toolbar.v-sheet,.theme--dark.v-application{background-color:#242a33}.theme--dark.v-navigation-drawer,.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:transparent}.theme--dark.v-bottom-navigation{background-color:#242a33}.theme--dark.v-tabs-items{background-color:transparent}.theme--dark .cart-popup-contents,.theme--dark.shipping-options,.theme--dark.v-sheet,.theme--dark.v-tabs-items,.v-dialog .theme--dark.v-sheet{background-color:#242a33}.theme--dark.v-sheet.company-card,.theme--dark.v-sheet.company-list-card,.theme--dark.v-sheet.post-card,.theme--dark.v-sheet.product-card,.theme--dark.v-sheet.recent-news-card{background-color:#fff;border:7px solid #15191e}.theme--dark.v-card>.v-card__text,.theme--dark.v-card>.v-card__title{color:#000}.theme--dark.slide-up{background-color:#242a33}.appBarHeight{height:calc(60px + env(safe-area-inset-top))}.mobileNotch{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)!important;height:inherit!important}header.mobileNotch{max-height:100px}.v-card__subtitle,.v-card__text{line-height:1.975rem;letter-spacing:0!important}.v-application .body-1{letter-spacing:0!important}.v-application .primary{background-color:#6fa7e0;border-color:#6fa7e0}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:90%}.v-dialog--scrollable>.v-sheet{overflow-y:scroll!important}@media screen and (max-width:600px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:100%}}.admin-container{margin-top:0;margin-bottom:15px;padding-top:0;padding-left:0;padding-right:0}.avatar-elevation{border:4px solid #fff}.no-break{word-break:break-word}.v-application a{text-decoration:none;color:#6fa7e0!important}.missing-image{opacity:.25}.company-card .title,.post-card .name,.product-card .name{word-break:break-word;line-height:1.33em;letter-spacing:-.3px!important}.slide-left-enter-active,.slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{transition-duration:.5s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.55,0,.1,1);overflow:hidden}.slide-left-enter,.slide-right-leave-active{opacity:0;transform:translate(2em)}.slide-left-leave-active,.slide-right-enter{opacity:0;transform:translate(-2em)}.phoneNumberInput .input-tel__input{border-right:3px solid hsla(0,0%,46.3%,.05)!important;padding-left:1px!important}.phoneNumberInput .country-selector__input,.phoneNumberInput .input-tel__input{font-size:16px!important;border-top:3px solid hsla(0,0%,46.3%,.05)!important;border-bottom:3px solid hsla(0,0%,46.3%,.05)!important}.phoneNumberInput .country-selector__input{border-left:3px solid hsla(0,0%,46.3%,.05)!important;height:62px!important}.phoneNumberInput .country-selector__toggle{top:20px!important}.phoneNumberInput .country-selector__country-flag{top:27px!important}.v-text-field--outlined fieldset{border-color:#f1f0ef!important}.country-selector.has-hint .country-selector__input,.country-selector.has-value .country-selector__input{padding-top:0!important}.alertBtn{font-size:1.45rem;font-weight:600;letter-spacing:1px;text-transform:capitalize;color:#fff}.borderButton,.borderInput{border:3px solid #f1f0ef;background-color:#f8f9fa}details>summary{font-size:17px;margin:10px 0;border-bottom:1px solid #fefefe;padding:15px 0 30px}.v-list--rounded.v-list--three-line .v-list-item,.v-list--rounded.v-list--three-line .v-list-item:before,.v-list--rounded.v-list--three-line .v-list-item>.v-ripple__container{border-radius:32px!important}.v-list--rounded .v-list-item,.v-list--rounded .v-list-item:before,.v-list--rounded .v-list-item>.v-ripple__container{border-radius:15px!important}.myshout .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){border:2px solid #f0f0ef;background:#f9f9f9;margin-bottom:15px}.myshout .v-list-item__title{font-size:1rem;font-weight:600}.myshout .v-list-item__subtitle{font-size:.9rem}.myshout .v-list-item__icon{width:80px;height:80px;border-radius:20px;text-align:center}.myshout .v-list-item__icon .v-icon{font-size:33px;width:100%}.v-application--is-ltr .myshout .v-list-item__action:first-child,.v-application--is-ltr .myshout .v-list-item__icon:first-child{margin-right:10px}.v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:.25rem;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:0;pointer-events:none}.v-tooltip__content.menuable__content__active{opacity:.9}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=n},910:function(t,e,o){"use strict";o(878)},911:function(t,e,o){var n=o(38)(!1);n.push([t.i,".isRecording{color:red!important}",""]),t.exports=n},939:function(t,e,o){"use strict";o.r(e);var n=o(693),r=o(163),c=o(2),l=(o(55),o(908),o(286)),h=o(52),d=o(287),f=o(289),v=o(859),m=o(3),_=o(29),y=o(28),w=Object(y.a)(h.a,d.a,f.a,v.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,o=!(this.bottom||this.left||this.top||this.right),n=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||o?r=n+e.width/2-content.width/2:(this.left||this.right)&&(r=n+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,o=!1!==this.attach?e.offsetTop:e.top,n=0;return this.top||this.bottom?n=o+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(n=o+e.height/2-content.height/2),this.nudgeTop&&(n-=parseInt(this.nudgeTop)),this.nudgeBottom&&(n+=parseInt(this.nudgeBottom)),!1===this.attach&&(n+=this.pageYOffset),"".concat(this.calcYOverflow(n),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(m.h)(this.maxWidth),minWidth:Object(m.h)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(m.s)(this,"activator",!0)&&Object(_.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=l.a.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")}),e.keydown=function(e){e.keyCode===m.x.esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(c.a)(t,this.contentClass,!0),Object(c.a)(t,"menuable__content__active",this.isActive),Object(c.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}}),k=(o(53),o(43),o(61),o(31),o(17),o(65),o(68),o(0)),x=(o(14),o(4),o(402),o(33),o(403),o(404),o(405),o(406),o(407),o(408),o(409),o(410),o(411),o(412),o(413),o(414),o(415),o(416),o(417),o(418),o(35),o(64),o(25),o(5));function O(t,e){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=function(t,e){if(!t)return;if("string"==typeof t)return A(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return A(t,e)}(t))||e&&t&&"number"==typeof t.length){o&&(t=o);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,l=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return c=t.done,t},e:function(t){l=!0,r=t},f:function(){try{c||null==o.return||o.return()}finally{if(l)throw r}}}}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,o=new Array(e);i<e;i++)o[i]=t[i];return o}var j=Object(x.b)({name:"ChatRecordaudio",props:{chat:{type:Object,default:function(){return{}}}},setup:function(t){var e=Object(x.l)(),o=e.$capacitor,n=e.$db,r=e.$vuetify,c=Object(x.a)((function(){return d.user})),l=Object(x.q)(),h=l.dispatch,d=l.state,f=Object(x.i)("Press to record"),v=Object(x.i)(f.value),m=Object(x.i)(!1),_=Object(x.i)(null),y=Object(x.i)(120),w=new Set,A=function(){var t=Object(k.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!m.value){t.next=2;break}return t.abrupt("return");case 2:return m.value=!0,t.prev=3,v.value="120",w.add(setInterval((function(){y.value--,v.value="".concat(y.value),y.value<=0&&j()}),1e3)),t.next=8,o.microphoneStart();case 8:t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),console.log("Error starting ",t.t0);case 13:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(){return t.apply(this,arguments)}}(),j=function(){var e=Object(k.a)(regeneratorRuntime.mark((function e(){var l,d,k,audio;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m.value=!1,v.value=f.value,y.value=120,l=O(w);try{for(l.s();!(d=l.n()).done;)k=d.value,w.delete(k),clearInterval(k)}catch(t){l.e(t)}finally{l.f()}return e.prev=5,e.next=8,o.microphoneStop();case 8:if(!(audio=e.sent)){e.next=22;break}return e.next=12,n.upload({path:"/CHATS/".concat(t.chat.id,"/").concat(c.value.data.uid,"-").concat(Date.now(),".wav"),data:audio.recordDataBase64,base64:!0});case 12:return _.value=e.sent,e.next=15,h("chats/messages/add",{chatId:t.chat.id,message:{message:"",owner:c.value.data.uid,audioUrl:_.value}});case 15:return e.prev=15,e.next=18,r.goTo("#bottomOfChat");case 18:e.next=22;break;case 20:e.prev=20,e.t0=e.catch(15);case 22:e.next=27;break;case 24:e.prev=24,e.t1=e.catch(5),console.log("ERROR STOPPING",e.t1);case 27:case"end":return e.stop()}}),e,null,[[5,24],[15,20]])})));return function(){return e.apply(this,arguments)}}();return{buttonText:v,isRecording:m,timerCount:y,startRecording:A,stopRecording:j}}}),T=j,Y=(o(910),o(37)),component=Object(Y.a)(T,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",[o(w,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var c=e.on,l=e.attrs;return[o(n.a,t._g(t._b({staticClass:"pa-0",attrs:{color:"transparent",elevation:"0",small:"",fab:""},on:{mousedown:t.startRecording,mouseleave:t.stopRecording,mouseup:t.stopRecording,touchstart:t.startRecording,touchend:t.stopRecording,touchcancel:t.stopRecording}},"v-btn",l,!1),c),[o(r.a,{class:{isRecording:t.isRecording}},[t._v("mdi-microphone")])],1)]}}])},[t._v(" "),o("span",[t._v(t._s(t.buttonText))])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);