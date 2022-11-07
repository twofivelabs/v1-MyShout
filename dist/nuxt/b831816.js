(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{1074:function(t,e,r){"use strict";r.r(e);var n=r(693),o=r(717),l=r(752),c=r(789),d=r(737),m=r(716),f=r(75),v=r(826),_=r(795),h=r(0),x=(r(14),r(76)),y=r.n(x),O=r(5),k=r(739),j=Object(O.b)({name:"AdminPagesEdit",middleware:"admin",watch:{"$route.query":"$fetch"},setup:function(){var t=Object(O.q)(),e=t.state,r=t.dispatch,n=Object(O.l)(),o=n.$notify,l=n.$system,c=n.i18n,d=Object(O.p)(),m=Object(O.o)(),f=Object(O.i)(!0),v=Object(O.i)(e.user.data.role.isVendor),_=Object(O.i)(!0),x=k.a,j=Object(O.i)(null),form=Object(O.i)(y.a.cloneDeep(e.user.default));Object(O.m)(Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(f.value=!0,t.prev=1,!v.value){t.next=5;break}return d.push("/admin"),t.abrupt("return");case 5:if(!m.value.params.id){t.next=8;break}return t.next=8,r("user/getOne",m.value.params.id).then((function(t){!1!==t&&(form.value=y.a.cloneDeep(t))}));case 8:t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),l.log({comp:"AdminUserEdit",msg:"useFetch",val:t.t0});case 13:return t.prev=13,f.value=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[1,10,13,16]])}))));var $=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!j.value.validate()){t.next=4;break}return t.next=4,w();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!form.value.username){t.next=17;break}return f.value=!0,t.prev=2,t.next=5,r("user/update",form.value);case 5:o.show({text:c.t("notify.success")}),d.push("/admin/users"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),o.show({text:c.t("notify.error_try_again"),color:"error"});case 12:return t.prev=12,f.value=!1,t.finish(12);case 15:t.next=18;break;case 17:o.show({text:c.t("notify.error_try_again"),color:"error"});case 18:case"end":return t.stop()}}),t,null,[[2,9,12,15]])})));return function(){return t.apply(this,arguments)}}();return{loading:f,valid:_,rules:x,form:form,formEl:j,validate:$}}}),$=j,w=r(37),component=Object(w.a)($,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(l.a,{staticClass:"admin-container"},[r("AdminTitle"),t._v(" "),t.loading?r("div",[r(d.a,{staticClass:"mb-0",attrs:{indeterminate:""}})],1):r(c.a,{ref:"formEl",staticClass:"px-3 mt-3",on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}}},[r(m.a,[r(o.a,{attrs:{cols:"12",sm:"7"}},[r(_.a,{attrs:{label:t.$t("form.username"),required:""},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}}),t._v(" "),r(_.a,{attrs:{label:t.$t("form.first_name")},model:{value:t.form.first_name,callback:function(e){t.$set(t.form,"first_name",e)},expression:"form.first_name"}}),t._v(" "),r(_.a,{attrs:{label:t.$t("form.last_name")},model:{value:t.form.last_name,callback:function(e){t.$set(t.form,"last_name",e)},expression:"form.last_name"}}),t._v(" "),r(m.a,[r(o.a,[r(_.a,{attrs:{label:t.$t("form.city")},model:{value:t.form.location.city,callback:function(e){t.$set(t.form.location,"city",e)},expression:"form.location.city"}})],1),t._v(" "),r(o.a,[r(_.a,{attrs:{label:t.$t("form.country")},model:{value:t.form.location.country,callback:function(e){t.$set(t.form.location,"country",e)},expression:"form.location.country"}})],1)],1)],1),t._v(" "),r(o.a,{staticClass:"pa-6 rounded-lg",staticStyle:{"background-color":"rgba(0, 0, 0, 0.03)"},attrs:{cols:"12",sm:"5"}},[r(f.a,{staticClass:"pa-4 mb-6 caption",attrs:{elevation:"0",outlined:"",rounded:""}},[r(v.a,{scopedSlots:t._u([{key:"default",fn:function(){return[r("tbody",[r("tr",[r("td",[t._v("Is Admin")]),r("td",[t._v(t._s(t.form.role.isAdmin?t.form.role.isAdmin:"false"))])]),t._v(" "),t.form.created_at?r("tr",[r("td",[t._v("Created")]),r("td",[t._v(t._s(t.form.created_at))])]):t._e(),t._v(" "),r("tr",[r("td",[t._v("PIN")]),r("td",[t._v(t._s(t.form.securityPin))])]),t._v(" "),r("tr",[r("td",[t._v("Location Enabled")]),r("td",[t._v(t._s(t.form.permissions.location))])]),t._v(" "),r("tr",[r("td",[t._v("Share Location With Friends")]),r("td",[t._v(t._s(t.form.permissions.shareLocationWithFriends))])])])]},proxy:!0}])})],1)],1)],1),t._v(" "),r(m.a,[r(o.a,{staticClass:"text-center"},[r(n.a,{staticClass:"text-center",attrs:{disabled:!t.valid,loading:t.loading,color:"success",elevation:"0"},on:{click:t.validate}},[t._v("\n          "+t._s(t.$t("btn.save"))+"\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AdminTitle:r(769).default})},739:function(t,e,r){"use strict";r(32);e.a={email:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],password:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=6||"Password must be at least 6 characters"}],phone:[function(t){return!!t||"Phone is required"},function(t){return t&&t.length>=10||"Phone must be valid"}],message:[function(t){return!!t||"Message is required"}],username:[function(t){return!!t||"Username is required"},function(t){return t&&t.length>2||"Username must be a least 3 characters"}],name:[function(t){return!!t||"Is required"}],title:[function(t){return!!t||"Is required"}]}},753:function(t,e,r){var content=r(762);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(39).default)("d52aac8c",content,!0,{sourceMap:!1})},760:function(t,e,r){"use strict";r.r(e);var n=r(693),o=r(163),l=r(263),c=r(164),d=r(103),m=r(941),f=r(0),v=(r(47),r(59),r(32),r(62),r(14),r(5)),_=Object(v.b)({name:"AdminNavComp",setup:function(){var t=Object(v.q)().state,e=Object(v.o)(),r=Object(v.a)((function(){return t.user})),n=Object(v.i)(r.value.data.role.isAdmin),o=Object(v.i)(r.value.data.role.isVendor),l=Object(v.i)(r.value.data.role.isDriver),c=Object(v.i)([{to:"/admin/users",label:"Users"},{to:"/admin/pages",label:"Pages"},{to:"/admin/posts",label:"Posts"}]),d=function(){var t=Object(f.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.value||(o.value?c.value=[{to:"/admin/products",label:"Products"},{to:"/admin/posts",label:"Posts"},{to:"/admin/shipping",label:"Shipping"},{to:"/admin/feedback",label:"Feedback"}]:l.value&&(c.value=[]));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),m=function(){var p=e.value.path;return"/admin"!==p&&"/admin/"!==p&&(!p.includes("/edit")&&!p.includes("/users"))};return Object(v.f)((function(){m(),d()})),{canAdd:m,navOptions:c,getRoute:function(){return e.value.fullPath.includes("edit")?e.value.fullPath.replace(e.value.params.id,""):"".concat(e.value.fullPath,"/edit")}}}}),h=_,x=r(37),component=Object(x.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.canAdd()?r(n.a,{staticClass:"mr-1 elevation-0",attrs:{to:t.getRoute(),color:"secondary",small:""}},[t._v("\n    + "+t._s(t.$t("btn.add"))+"\n  ")]):t._e(),t._v(" "),r(m.a,{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,l=e.attrs;return[r(n.a,t._g(t._b({attrs:{color:"primary",dark:"",elevation:"0",small:""}},"v-btn",l,!1),o),[t._v("\n        "+t._s(t.$t("btn.content"))+"\n      ")])]}}])},[t._v(" "),r(l.a,[r(c.a,{attrs:{to:"/admin",nuxt:"",color:"primary"}},[r(d.a,[r(d.c,[t._v("\n            Dashboard\n          ")])],1)],1),t._v(" "),t._l(t.navOptions,(function(e,n){return r(c.a,{key:n,attrs:{to:e.to,nuxt:""}},[r(d.a,[r(d.c,[t._v("\n            "+t._s(e.label)+"\n          ")])],1)],1)}))],2)],1),t._v(" "),r(n.a,{staticClass:"elevation-0",attrs:{small:""},on:{click:function(e){return t.$nuxt.refresh()}}},[r(o.a,[t._v("mdi-refresh")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},761:function(t,e,r){"use strict";r(753)},762:function(t,e,r){var n=r(38)(!1);n.push([t.i,".v-breadcrumbs li{padding:0}",""]),t.exports=n},769:function(t,e,r){"use strict";r.r(e);var n=r(693),o=r(163),l=r(773),c=(r(32),r(62),r(67),{name:"AdminTitleComp",props:{title:{type:String,default:function(){return""}}},methods:{crumbs:function(){var t=this.$nuxt.$route.path.replace(/^\/|\/$/g,"").split("/");return 4===t.length&&t.splice(2,2),t},logout:function(){this.$store.dispatch("user/signOut")}}}),d=(r(761),r(37)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"px-2 pt-1 elevation-3 primary lighten-5"},[r("div",{staticClass:"d-flex align-center mb-5"},[r(n.a,{staticClass:"px-1",attrs:{text:"",to:"/",color:"gray",small:""}},[r(o.a,[t._v("mdi-arrow-left")]),t._v(" To App\n    ")],1),t._v(" "),r(l.a),t._v(" "),r(n.a,{staticClass:"px-1",attrs:{text:"",color:"gray",small:""},on:{click:function(e){return t.$store.dispatch("users/signOut")}}},[t._v("\n      Logout "),r(o.a,[t._v("mdi-exit-to-app")])],1)],1),t._v(" "),r("div",{staticClass:"d-flex align-center"},[1===t.crumbs().length?r(n.a,{staticClass:"font-weight-black gray--text",attrs:{to:"/admin",text:"",plain:""}},[t._v("Admin")]):t._e(),t._v(" "),t.crumbs()[1]?r(n.a,{staticClass:"font-weight-black gray--text",attrs:{to:"/admin/"+t.crumbs()[1],text:"",plain:""}},[t._v(t._s(t.crumbs()[1]))]):t._e(),t._v(" "),r(l.a),t._v(" "),r("AdminNav")],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AdminNav:r(760).default})}}]);