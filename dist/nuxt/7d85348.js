(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{1012:function(e,t,r){"use strict";r(948)},1013:function(e,t,r){var l=r(38)(!1);l.push([e.i,"#map-wrap[data-v-14796375]{margin-top:10px;height:100%;width:100%;height:calc(100vh - 160px)}#leafletEl[data-v-14796375],.vue2leaflet-map[data-v-14796375]{z-index:0}.map-actions[data-v-14796375]{bottom:40vh;right:12px}.map-actions[data-v-14796375],.map-search[data-v-14796375]{position:absolute;z-index:5}.map-search[data-v-14796375]{left:12px;top:12px;margin-right:12px}.map-slider[data-v-14796375]{position:absolute;z-index:1;width:100%;bottom:7vh}",""]),e.exports=l},1119:function(e,t,r){"use strict";r.r(t);var l=r(0),n=(r(5),r(18),r(30),r(17),r(3)),o=Object(n.b)({name:"MapPage",middleware:"authenticated",transition:function(e,t){return t&&+e.query.page<+t.query.page?"slide-right":"slide-left"},setup:function(){var e=Object(n.r)(),t=e.state,r=e.dispatch,o=Object(n.m)(),c=o.$config,y=o.$capacitor,d=o.$system,f=o.$vuetify,m=o.$helper,v=Object(n.i)(!0),T=Object(n.i)(null),w=Object(n.i)([]),h=Object(n.a)((function(){return t.user.gps})),x=Object(n.a)((function(){return t.user})),O=Object(n.i)([]),j=Object(n.i)([]),k=Object(n.i)(!1),M=Object(n.i)(!1),R=Object(n.i)(null),I=Object(n.i)(!1),F=Object(n.i)(!1),P=Object(n.i)(!1),_=Object(n.i)({});y.positionPermissions(),Object(n.n)(Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A();case 2:case"end":return e.stop()}}),e)}))));var L=function(e){var t=e.title,title=void 0===t?"Marker":t,r=e.label,label=void 0===r?null:r,l=e.lat,n=void 0===l?null:l,o=e.lng,c=void 0===o?null:o,y=e.content,content=void 0===y?null:y,d=e.iconUrl,f=void 0===d?"MapIconScaled.svg":d,m=e.iconX,v=void 0===m?30:m,T=e.iconY,w=void 0===T?30:T,h=e.id,x=void 0===h?null:h;_.value[x]=new window.google.maps.Marker({map:R.value,position:new window.google.maps.LatLng(n,c),title:title,label:label,icon:{url:"map/".concat(f),scaledSize:new window.google.maps.Size(v,w),origin:new window.google.maps.Point(0,0),anchor:new window.google.maps.Point(v/2,w/2)}});var O='<div id="content">'.concat(content,"</div>"),j=new window.google.maps.InfoWindow({content:O,maxWidth:200});_.value[x].addListener("click",(function(){j.open({anchor:_.value[x],map:R.value,shouldFocus:!1})}))},A=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v.value=!0,e.next=4,r("user/friends/getAll",{uid:x.value.uid}).then((function(e){!1!==e&&(w.value=e)}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),d.log({comp:"MapPage",msg:"Not able to get friends for map",val:e.t0});case 9:return e.prev=9,v.value=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[0,6,9,12]])})));return function(){return e.apply(this,arguments)}}(),C=function(e){var t,r=e.lat,l=void 0===r?null:r,n=e.lng,o=void 0===n?null:n;l&&o&&(t=new window.google.maps.LatLng(l,o),R.value.panTo(t))},S=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.value&&R.value.addListener("dragend",Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.value=[R.value.getCenter().lat(),R.value.getCenter().lng()],console.log("STICKY: Your dragging the map around, new center is",O.value);case 2:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.sleep(1500);case 2:R.value=new window.google.maps.Map(document.getElementById("map"),{zoom:13,mapTypeId:window.google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0}),window.currentMap=R.value,x.value.gps.lat?(console.log("Init map with a center of",x.value.gps.lat),C({lat:x.value.gps.lat,lng:x.value.gps.lng})):console.log("STICKY: not able to center map with empty coords"),f.theme.dark?R.value.setOptions({styles:[{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"geometry",stylers:[{color:"#242A33"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242A33"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#666666"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#666666"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#abc6b4"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#abc6b4"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#666666"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#666666"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#999999"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#b5b5b5"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#b5b5b5"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b5b5b5"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}]}):R.value.setOptions({styles:[{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"geometry",stylers:[{color:"#F6F8FA"}]},{elementType:"labels.text.stroke",stylers:[{color:"#F6F8FA"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#666666"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#666666"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#abc6b4"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#abc6b4"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#dddddd"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#dddddd"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#999999"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#b5b5b5"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#b5b5b5"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b5b5b5"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#d4e7f9"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#d4e7f9"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#d4e7f9"}]}]}),k.value=!0,M.value=!0;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.f)(Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P.value=!0;try{h.value&&h.value.lat||y.watchPosition()}catch(e){d.log({comp:"MapPage",msg:"Not able to get position",val:e})}finally{v.value=!1}case 2:case"end":return e.stop()}}),e)})))),Object(n.g)((function(){y.clearWatchPosition()})),Object(n.t)(Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!P.value){e.next=13;break}if(!window.google||!0===k.value||R.value){e.next=13;break}return e.next=4,E();case 4:return e.next=6,S();case 6:if(!x.value.gps||!x.value.gps.lat){e.next=9;break}return e.next=9,L({id:x.value.data.uid,lat:x.value.gps.lat,lng:x.value.gps.lng,title:"You",content:"You"});case 9:if(console.log("STICKY: INIT MAP DONE"),!(!F.value&&w.value&&w.value.length>0)){e.next=13;break}return e.next=13,void((t=w.value)&&(F.value=!0,t.forEach((function(e){e.gps&&e.gps.lat&&e.permissions.shareLocationWithFriends&&L({id:e.id,lat:e.gps.lat,lng:e.gps.lng,iconUrl:"FriendIcon.svg",title:"".concat(e.first_name?e.first_name:e.username),content:'<div class="d-flex align-center"><v-img src="'.concat(e.photoURL,'" /><h4>').concat(e.first_name?e.first_name:e.username,"</h4></div>")})}))));case 13:case"end":return e.stop()}var t}),e)})))),Object(n.s)(h,(function(e,t){var marker,r,l;console.log("STICKY: WATCH GPS",h.value,t),parseFloat(e.lat)!==t.lat&&h.value&&!0===k.value&&(marker=_[x.value.data.uid],r=h.value.lat,l=h.value.lng,marker&&marker.setPosition(new window.google.maps.LatLng(r,l)))})),Object(n.o)({title:"".concat(c.appTitle," on Map view"),meta:[{hid:"description",name:"description",content:"".concat(c.appTitle," on Map view")}]}),{loading:v,friends:w,googleMapEl:T,gps:h,slider:j,mapError:I,user:x,centerOn:C}},head:{}}),c=o,y=(r(1012),r(43)),d=r(45),f=r.n(d),m=r(688),v=r(159),component=Object(y.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"map-actions"},[r("div",[r("v-btn",{attrs:{elevation:"0",fab:"",small:"",color:"primary"},on:{click:function(t){return e.centerOn({lat:e.user.gps.lat,lng:e.user.gps.lng})}}},[r("v-icon",[e._v("\n          mdi-crosshairs-gps\n        ")])],1)],1)]),e._v(" "),r("div",{ref:"googleMapEl",staticStyle:{width:"calc(100vw)",height:"calc(100vh - 75px)"},attrs:{id:"map"}}),e._v(" "),r("div",{staticClass:"map-slider"},[r("FriendsMapslider",{attrs:{friends:e.friends}})],1)])}),[],!1,null,"14796375",null);t.default=component.exports;f()(component,{FriendsMapslider:r(1079).default}),f()(component,{VBtn:m.a,VIcon:v.a})},948:function(e,t,r){var content=r(1013);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(39).default)("87535ca8",content,!0,{sourceMap:!1})}}]);