(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1104:function(e,n,t){"use strict";t.r(n);var r=t(723),o=t(1035),l=t(1036),c=t(747),h=t(5),d=Object(h.b)({name:"BannerGeneralComp",setup:function(){var e=Object(h.l)(),n=e.$remoteConfig,t=e.$vuetify,r=Object(h.i)([]),o=Object(h.a)((function(){return t.breakpoint.lgAndUp?"300px":t.breakpoint.mdAndUp?"270px":t.breakpoint.smAndUp?"190px":"135px"}));return Object(h.f)((function(){try{r.value=n.get("banners",!0)}catch(e){}})),{banners:r,bannerHeight:o}}}),w=t(37),component=Object(w.a)(d,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.banners&&e.banners.length>0?t("div",{staticClass:"banners"},[t(o.a,{attrs:{continuous:!0,cycle:!0,height:e.bannerHeight,"show-arrows":e.banners.length>1,"show-arrows-on-hover":e.banners.length>1,"hide-delimiter-background":"","hide-delimiters":"",interval:"8000"}},e._l(e.banners,(function(n,o){return t(l.a,{key:o},[t(r.a,{attrs:{to:""+(n.to?n.to:"/"),elevation:"0",nuxt:"",rounded:"0",width:"100%"}},[t(c.a,{attrs:{height:e.bannerHeight,src:""+(e.$vuetify.breakpoint.xs?n.image_url_mobile:n.image_url),width:"100vw"}})],1)],1)})),1)],1):e._e()}),[],!1,null,null,null);n.default=component.exports}}]);