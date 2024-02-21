(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{1138:function(t,e,n){"use strict";n.r(e);var r=n(741),o=n(757),l=n(793),c=n(822),d=n(778),m=n(756),f=n(78),v=n(866),_=n(827),h=n(0),x=(n(16),n(57)),y=n.n(x),O=n(5),k=n(776),j=Object(O.b)({name:"AdminPagesEdit",middleware:"admin",watch:{"$route.query":"$fetch"},setup:function(){var t=Object(O.q)(),e=t.state,n=t.dispatch,r=Object(O.l)(),o=r.$notify,l=r.$system,c=r.i18n,d=Object(O.p)(),m=Object(O.o)(),f=Object(O.i)(!0),v=Object(O.i)(e.user.data.role.isVendor),_=Object(O.i)(!0),x=k.a,j=Object(O.i)(null),form=Object(O.i)(y.a.cloneDeep(e.user.default));Object(O.m)(Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(f.value=!0,t.prev=1,!v.value){t.next=5;break}return d.push("/admin"),t.abrupt("return");case 5:if(!m.value.params.id){t.next=8;break}return t.next=8,n("user/getOne",m.value.params.id).then((function(t){!1!==t&&(form.value=y.a.cloneDeep(t))}));case 8:t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),l.log({comp:"AdminUserEdit",msg:"useFetch",val:t.t0});case 13:return t.prev=13,f.value=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[1,10,13,16]])}))));var $=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!j.value.validate()){t.next=4;break}return t.next=4,w();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.username){t.next=17;break}return f.value=!0,t.prev=2,t.next=5,n("user/update",form.value);case 5:o.show({text:c.t("notify.success")}),d.push("/admin/users"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),o.show({text:c.t("notify.error_try_again"),color:"error"});case 12:return t.prev=12,f.value=!1,t.finish(12);case 15:t.next=18;break;case 17:o.show({text:c.t("notify.error_try_again"),color:"error"});case 18:case"end":return t.stop()}}),t,null,[[2,9,12,15]])})));return function(){return t.apply(this,arguments)}}();return{loading:f,valid:_,rules:x,form:form,formEl:j,validate:$}}}),$=j,w=n(36),component=Object(w.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(l.a,{staticClass:"admin-container"},[n("AdminTitle"),t._v(" "),t.loading?n("div",[n(d.a,{staticClass:"mb-0",attrs:{indeterminate:""}})],1):n(c.a,{ref:"formEl",staticClass:"px-3 mt-3",on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}}},[n(m.a,[n(o.a,{attrs:{cols:"12",sm:"7"}},[n(_.a,{attrs:{label:t.$t("form.username"),required:""},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}}),t._v(" "),n(_.a,{attrs:{label:t.$t("form.first_name")},model:{value:t.form.first_name,callback:function(e){t.$set(t.form,"first_name",e)},expression:"form.first_name"}}),t._v(" "),n(_.a,{attrs:{label:t.$t("form.last_name")},model:{value:t.form.last_name,callback:function(e){t.$set(t.form,"last_name",e)},expression:"form.last_name"}}),t._v(" "),n(m.a,[n(o.a,[n(_.a,{attrs:{label:t.$t("form.city")},model:{value:t.form.location.city,callback:function(e){t.$set(t.form.location,"city",e)},expression:"form.location.city"}})],1),t._v(" "),n(o.a,[n(_.a,{attrs:{label:t.$t("form.country")},model:{value:t.form.location.country,callback:function(e){t.$set(t.form.location,"country",e)},expression:"form.location.country"}})],1)],1)],1),t._v(" "),n(o.a,{staticClass:"pa-6 rounded-lg",staticStyle:{"background-color":"rgba(0, 0, 0, 0.03)"},attrs:{cols:"12",sm:"5"}},[n(f.a,{staticClass:"pa-4 mb-6 caption",attrs:{elevation:"0",outlined:"",rounded:""}},[n(v.a,{scopedSlots:t._u([{key:"default",fn:function(){return[n("tbody",[n("tr",[n("td",[t._v("Is Admin")]),n("td",[t._v(t._s(t.form.role.isAdmin?t.form.role.isAdmin:"false"))])]),t._v(" "),t.form.created_at?n("tr",[n("td",[t._v("Created")]),n("td",[t._v(t._s(t.form.created_at))])]):t._e(),t._v(" "),n("tr",[n("td",[t._v("PIN")]),n("td",[t._v(t._s(t.form.securityPin))])]),t._v(" "),n("tr",[n("td",[t._v("Location Enabled")]),n("td",[t._v(t._s(t.form.permissions.location))])]),t._v(" "),n("tr",[n("td",[t._v("Share Location With Friends")]),n("td",[t._v(t._s(t.form.permissions.shareLocationWithFriends))])])])]},proxy:!0}])})],1)],1)],1),t._v(" "),n(m.a,[n(o.a,{staticClass:"text-center"},[n(r.a,{staticClass:"text-center",attrs:{disabled:!t.valid,loading:t.loading,color:"success",elevation:"0"},on:{click:t.validate}},[t._v("\n          "+t._s(t.$t("btn.save"))+"\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AdminTitle:n(814).default})},776:function(t,e,n){"use strict";n(29);e.a={email:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],password:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=6||"Password must be at least 6 characters"}],phone:[function(t){return!!t||"Phone is required"},function(t){return t&&t.length>=10||"Phone must be valid"}],message:[function(t){return!!t||"Message is required"}],username:[function(t){return!!t||"Username is required"},function(t){return t&&t.length>2||"Username must be a least 3 characters"}],name:[function(t){return!!t||"Is required"}],title:[function(t){return!!t||"Is required"}]}},794:function(t,e,n){var content=n(809);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(38).default)("fb13411c",content,!0,{sourceMap:!1})},806:function(t,e,n){"use strict";n.r(e);var r=n(741),o=n(174),l=n(281),c=n(175),d=n(107),m=n(951),f=n(0),v=(n(46),n(29),n(58),n(55),n(16),n(5)),_=Object(v.b)({name:"AdminNavComp",setup:function(){var t=Object(v.q)().state,e=Object(v.o)(),n=Object(v.a)((function(){return t.user})),r=Object(v.i)(n.value.data.role.isAdmin),o=Object(v.i)(n.value.data.role.isVendor),l=Object(v.i)(n.value.data.role.isDriver),c=Object(v.i)([{to:"/admin/users",label:"Users"},{to:"/admin/pages",label:"Pages"},{to:"/admin/posts",label:"Posts"}]),d=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.value||(o.value?c.value=[{to:"/admin/products",label:"Products"},{to:"/admin/posts",label:"Posts"},{to:"/admin/shipping",label:"Shipping"},{to:"/admin/feedback",label:"Feedback"}]:l.value&&(c.value=[]));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),m=function(){var p=e.value.path;return"/admin"!==p&&"/admin/"!==p&&(!p.includes("/edit")&&!p.includes("/users"))};return Object(v.f)((function(){m(),d()})),{canAdd:m,navOptions:c,getRoute:function(){return e.value.fullPath.includes("edit")?e.value.fullPath.replace(e.value.params.id,""):"".concat(e.value.fullPath,"/edit")}}}}),h=_,x=n(36),component=Object(x.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.canAdd()?n(r.a,{staticClass:"mr-1 elevation-0",attrs:{to:t.getRoute(),color:"secondary",small:""}},[t._v("\n    + "+t._s(t.$t("btn.add"))+"\n  ")]):t._e(),t._v(" "),n(m.a,{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,l=e.attrs;return[n(r.a,t._g(t._b({attrs:{color:"primary",dark:"",elevation:"0",small:""}},"v-btn",l,!1),o),[t._v("\n        "+t._s(t.$t("btn.content"))+"\n      ")])]}}])},[t._v(" "),n(l.a,[n(c.a,{attrs:{to:"/admin",nuxt:"",color:"primary"}},[n(d.a,[n(d.c,[t._v("\n            Dashboard\n          ")])],1)],1),t._v(" "),t._l(t.navOptions,(function(e,r){return n(c.a,{key:r,attrs:{to:e.to,nuxt:""}},[n(d.a,[n(d.c,[t._v("\n            "+t._s(e.label)+"\n          ")])],1)],1)}))],2)],1),t._v(" "),n(r.a,{staticClass:"elevation-0",attrs:{small:""},on:{click:function(e){return t.$nuxt.refresh()}}},[n(o.a,[t._v("mdi-refresh")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},808:function(t,e,n){"use strict";n(794)},809:function(t,e,n){var r=n(37)(!1);r.push([t.i,"\n.v-breadcrumbs li {\n  padding: 0;\n}\n",""]),t.exports=r},814:function(t,e,n){"use strict";n.r(e);var r=n(741),o=n(174),l=n(816),c=(n(62),n(29),n(55),{name:"AdminTitleComp",props:{title:{type:String,default:function(){return""}}},methods:{crumbs:function(){var t=this.$nuxt.$route.path.replace(/^\/|\/$/g,"").split("/");return 4===t.length&&t.splice(2,2),t},logout:function(){this.$store.dispatch("user/signOut")}}}),d=(n(808),n(36)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"px-2 pt-1 elevation-3 primary lighten-5"},[n("div",{staticClass:"d-flex align-center mb-5"},[n(r.a,{staticClass:"px-1",attrs:{text:"",to:"/",color:"gray",small:""}},[n(o.a,[t._v("mdi-arrow-left")]),t._v(" To App\n    ")],1),t._v(" "),n(l.a),t._v(" "),n(r.a,{staticClass:"px-1",attrs:{text:"",color:"gray",small:""},on:{click:function(e){return t.$store.dispatch("users/signOut")}}},[t._v("\n      Logout "),n(o.a,[t._v("mdi-exit-to-app")])],1)],1),t._v(" "),n("div",{staticClass:"d-flex align-center"},[1===t.crumbs().length?n(r.a,{staticClass:"font-weight-black gray--text",attrs:{to:"/admin",text:"",plain:""}},[t._v("Admin")]):t._e(),t._v(" "),t.crumbs()[1]?n(r.a,{staticClass:"font-weight-black gray--text",attrs:{to:"/admin/"+t.crumbs()[1],text:"",plain:""}},[t._v(t._s(t.crumbs()[1]))]):t._e(),t._v(" "),n(l.a),t._v(" "),n("AdminNav")],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AdminNav:n(806).default})}}]);