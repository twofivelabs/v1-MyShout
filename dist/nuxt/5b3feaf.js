(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{1063:function(e,n,o){"use strict";o.r(n);var t=o(739),r=o(759),c=o(809),d=o(174),m=o(758),l=o(817),f=o(826),h=(o(17),o(18),o(23),o(24),o(13),o(4),o(15),o(0)),y=o(2),v=(o(16),o(6)),O=o(57),S=o.n(O),M=o(771);function w(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,t)}return o}var C=Object(v.b)({name:"UserProfile",middleware:"authenticated",emits:["swipe"],setup:function(e,n){var o=n.emit,t=Object(v.q)(),r=t.state,c=t.dispatch,d=Object(v.l)(),m=d.$system,l=d.$helper,f=d.$notify,O=d.i18n,C=Object(v.a)((function(){return r.user.data})),P=Object(v.i)(!1),B=Object(v.i)(!1),A=Object(v.i)(!0),I=Object(v.i)(null),G=M.a,j=Object(v.h)(S.a.cloneDeep(r.user.profile)),form=Object(v.h)(S.a.cloneDeep(r.user.profile)),T=Object(v.i)([]),E=Object(v.i)(""),R=Object(v.i)(""),N=Object(v.a)((function(){return[{name:"Afghanistan",code:"AF"},{name:"Åland Islands",code:"AX"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"AndorrA",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia",code:"BO"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR"},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Canada",code:"CA"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Cote D'Ivoire",code:"CI"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and Mcdonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN"},{name:"Indonesia",code:"ID"},{name:"Iran, Islamic Republic Of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Korea, Democratic People'S Republic of",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kuwait",code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People'S Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libyan Arab Jamahiriya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, The Former Yugoslav Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX"},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"Netherlands Antilles",code:"AN"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Reunion",code:"RE"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"RWANDA",code:"RW"},{name:"Saint Helena",code:"SH"},{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia and Montenegro",code:"CS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan, Province of China",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"United States Minor Outlying Islands",code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela",code:"VE"},{name:"Viet Nam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"}]})),k=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j.username!==form.username){e.next=2;break}return e.abrupt("return",!0);case 2:return e.next=4,c("user/search",{field:"username",operator:"==",term:form.username,limit:3});case 4:if(!((n=e.sent).length>0)){e.next=8;break}return f.show({text:O.t("notify.username_in_use"),color:"error"}),e.abrupt("return",!1);case 8:return e.abrupt("return",n.length>0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j.email!==form.email){e.next=2;break}return e.abrupt("return",!0);case 2:return e.next=4,c("user/search",{field:"email",operator:"==",term:form.email,limit:3});case 4:if(!(e.sent.length>0)){e.next=8;break}return f.show({text:O.t("notify.email_in_use"),color:"error"}),e.abrupt("return",!1);case 8:return e.abrupt("return",!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A.value=I.value.validate(),e.next=3,k();case 3:if(e.sent){e.next=7;break}return A.value=!1,console.log("Validate username"),e.abrupt("return");case 7:return e.next=9,_();case 9:if(e.sent){e.next=13;break}return A.value=!1,console.log("Validate email"),e.abrupt("return");case 13:if(C.value.uid){e.next=16;break}return A.value=!1,e.abrupt("return");case 16:if(!A.value){e.next=19;break}return e.next=19,D();case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,P.value=!0,e.next=4,c("user/update",form);case 4:e.sent?(f.show({text:O.t("notify.success"),color:"success"}),j=form):f.show({text:O.t("notify.error_try_again"),color:"red"}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),m.log({comp:"UserProfile",msg:"Save",val:e.t0}),f.show({text:O.t("notify.error_try_again"),color:"red"});case 12:return e.prev=12,P.value=!1,o("swipe","Down"),e.finish(12);case 16:case"end":return e.stop()}}),e,null,[[0,8,12,16]])})));return function(){return e.apply(this,arguments)}}();return Object(v.s)((function(){form.phone&&(form.phone=l.formatPhone(form.phone))})),{loading:P,user:C,valid:A,form:form,formEl:I,searchResults:T,searchAddress:E,service:R,rules:G,countryItems:N,emittedAddress:function(address){form.location=function(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?w(Object(o),!0).forEach((function(n){Object(y.a)(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}({},address.value)},validate:x,validateUsername:k,showLoginAgain:B}},head:{}}),P=C,B=o(42),component=Object(B.a)(P,(function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o(c.a,{ref:"formEl",on:{submit:function(n){return n.preventDefault(),e.validate.apply(null,arguments)}}},[o("div",{staticClass:"d-flex align-center justify-space-between mb-12"},[o("ElementH3",{attrs:{align:"left",text:e.$t("profile")}}),e._v(" "),o("div",[o(t.a,{staticClass:"text-center",attrs:{loading:e.loading,color:"primary",elevation:"0",type:"submit"}},[e._v("\n            "+e._s(e.$t("btn.save"))+"\n            "),o(d.a,{attrs:{right:""}},[e._v("\n              mdi-arrow-right\n            ")])],1)],1)],1),e._v(" "),o(m.a,[o(r.a,{staticClass:"py-0 my-0",attrs:{cols:"12",sm:"6"}},[o(f.a,{staticClass:"py-0 my-0",attrs:{outlined:"","background-color":"#f8f9fa",label:e.$t("form.first_name")},model:{value:e.form.first_name,callback:function(n){e.$set(e.form,"first_name",n)},expression:"form.first_name"}})],1),e._v(" "),o(r.a,{staticClass:"py-0 my-0",attrs:{cols:"12",sm:"6"}},[o(f.a,{staticClass:"py-0 my-0",attrs:{outlined:"","background-color":"#f8f9fa",label:e.$t("form.last_name")},model:{value:e.form.last_name,callback:function(n){e.$set(e.form,"last_name",n)},expression:"form.last_name"}})],1)],1),e._v(" "),e.form.location?o(m.a,[o(r.a,{staticClass:"py-0 my-0"},[o(l.a,{staticClass:"py-0 my-0",attrs:{items:e.countryItems,"item-text":"name","item-value":"code","background-color":"#f8f9fa",outlined:"",label:e.$t("form.country"),required:""},model:{value:e.form.location.country,callback:function(n){e.$set(e.form.location,"country",n)},expression:"form.location.country"}})],1)],1):e._e(),e._v(" "),e.form.location?o(m.a,[o(r.a,{staticClass:"py-0 my-0"},[o(f.a,{staticClass:"py-0 my-0",attrs:{label:e.$t("form.hometown"),"background-color":"#f8f9fa",outlined:""},model:{value:e.form.location.city,callback:function(n){e.$set(e.form.location,"city",n)},expression:"form.location.city"}})],1)],1):e._e()],1)],1)}),[],!1,null,null,null);n.default=component.exports;installComponents(component,{ElementH3:o(429).default})},771:function(e,n,o){"use strict";o(29);n.a={email:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],password:[function(e){return!!e||"Password is required"},function(e){return e&&e.length>=6||"Password must be at least 6 characters"}],phone:[function(e){return!!e||"Phone is required"},function(e){return e&&e.length>=10||"Phone must be valid"}],message:[function(e){return!!e||"Message is required"}],username:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>2||"Username must be a least 3 characters"}],name:[function(e){return!!e||"Is required"}],title:[function(e){return!!e||"Is required"}]}},809:function(e,n,o){"use strict";var t=o(2),r=(o(17),o(18),o(102),o(45),o(23),o(24),o(13),o(4),o(185),o(58),o(15),o(62),o(27)),c=o(139),d=o(184);function m(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,t)}return o}function l(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?m(Object(o),!0).forEach((function(n){Object(t.a)(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):m(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}n.a=Object(r.a)(c.a,Object(d.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var n=Object.values(e).includes(!0);this.$emit("input",!n)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,n=function(input){return input.$watch("hasError",(function(n){e.$set(e.errorBag,input._uid,n)}),{immediate:!0})},o={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?o.shouldValidate=input.$watch("shouldValidate",(function(t){t&&(e.errorBag.hasOwnProperty(input._uid)||(o.valid=n(input)))})):o.valid=n(input),o},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var n=this.watchers.find((function(i){return i._uid===e._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var n=this;return e("form",{staticClass:"v-form",attrs:l({novalidate:!0},this.attrs$),on:{submit:function(e){return n.$emit("submit",e)}}},this.$slots.default)}})}}]);