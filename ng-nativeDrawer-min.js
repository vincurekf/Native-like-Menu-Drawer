var nlDrawer,swipe,swipeH,body,bodyH,drawer,drawerH,drawerDimm,drawerDimmH,navToggle,deviceW,viewContent,burger,burgerTop,burgerBottom,settings={};angular.module("nlFramework",[]).factory("$nlBurger",["$nlHelpers",function(e){return{animate:function(r){var n=nlDrawer.options.maxWidth,t=n-Math.abs(r),o=Math.floor(100/n*t);if(o>0){var i=nlDrawer.options.burger.startScale-Math.abs((1-nlDrawer.options.burger.endScale)/100*o).toFixed(2),a=Math.floor(.45*o),l=Math.floor(nlDrawer.options.burger.endY/100*o);l=y_pos_bottom=l<nlDrawer.options.burger.endY?l:nlDrawer.options.burger.endY;var s=Math.floor(1.8*o);nlDrawer.options.reverse&&(s=180+(180-s)),burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",e.translate(burger,0,"",0,"",s,"",!1),e.translate(burgerTop,0,"",l,"",a,"","",i),e.translate(burgerBottom,0,"",y_pos_bottom,"-",a,"-","",i)}},toggle:function(r){burger.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,burgerTop.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,burgerBottom.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,r?(e.translate(burgerTop,0,"",nlDrawer.options.burger.endY,"",45,"","",nlDrawer.options.burger.endScale),e.translate(burgerBottom,0,"",nlDrawer.options.burger.endY,"-",45,"-","",nlDrawer.options.burger.endScale),e.translate(burger,0,"",0,"-",180,"")):(e.translate(burgerTop,0,"",0,"",0,"","",nlDrawer.options.burger.startScale),e.translate(burgerBottom,0,"",0,"",0,"","",nlDrawer.options.burger.startScale),nlDrawer.options.reverse?e.translate(burger,0,"",0,"-",360,""):e.translate(burger,0,"",0,"-",0,""));var n=1e3*nlDrawer.options.speed;setTimeout(function(){burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",console.log(r),r?nlDrawer.options.reverse=!0:(e.translate(burger,0,"",0,"-",0,""),nlDrawer.options.reverse=!1)},n)}}}]).factory("$nlHelpers",function(){return{translate:function(e,r,n,t,o,i,a,l,s,d){var r=r||0,t=t||0,n=n||"",o=o||"",a=a||"",l=l||!1,s=s?"scale3d("+s+",1,1)":"",w=e;"burger-top"===w.id?w.style.transformOrigin="100% 100%":"burger-bottom"===w.id&&(w.style.transformOrigin="100% 0%"),w.style.transform="translate3d("+n+r+"px, "+o+t+"px, 0) rotate3d( 0, 0, 1, "+a+i+"deg ) "+s,w.style.webkitTransform="translate("+n+r+"px, "+o+t+"px) translateZ(0) rotate("+a+i+"deg) "+s,l&&(w.style.width=l+"px"),d&&(w.style.msTransform=w.style.MozTransform=w.style.OTransform="translateX("+n+r+"px) translateY("+o+t+"px) rotate("+a+i+"deg)")},merge:function(e,r){var n={};for(var t in e)n[t]=e[t];for(var t in r)n[t]=r[t];return n}}}).factory("$nlDrawer",["$nlBurger","$nlHelpers",function(e,r){return console.log(r),nlDrawer={open:!1,plusActive:!1,holdPos:null,reverse:!1,options:{maxWidth:300,topBarHeight:0,speed:.2,animation:"ease-out",modifyViewContent:!1,useActionButton:!1,burger:{endY:6,startScale:1,endScale:.7}},show:function(){drawer.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,nlDrawer.options.maxWidth=nlDrawer.options.maxWidth>deviceW-56?deviceW-56:nlDrawer.options.maxWidth,r.translate(drawer,0,"",0,"",0,"",nlDrawer.options.maxWidth),drawerDimm.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,drawerDimm.style.visibility="visible",drawerDimm.style.opacity="1",nlDrawer.options.open=!0,nlDrawer.options.reverse=!0,e.toggle(!0)},hide:function(){drawer.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,r.translate(drawer,nlDrawer.options.maxWidth,"-",0,"",0,""),drawerDimm.style.transition="all "+nlDrawer.options.speed+"s "+nlDrawer.options.animation,drawerDimm.style.visibility="hidden",drawerDimm.style.opacity="0",nlDrawer.options.open&&e.toggle(!1),nlDrawer.options.open=!1},toggle:function(){nlDrawer.options.open?nlDrawer.hide():nlDrawer.show()},move:function(n,t){nlDrawer.options.direction="panleft"===n.type?"left":"right";var o=n.center.x-nlDrawer.options.maxWidth;t&&(nlDrawer.options.holdPos=nlDrawer.options.holdPos?nlDrawer.options.holdPos:o,o+=Math.abs(nlDrawer.options.holdPos)),o=0>o?o:0;var i=nlDrawer.options.maxWidth-Math.abs(o),a=(i/(nlDrawer.options.maxWidth/100)/100).toFixed(2);a=1>a?a:1,e.animate(o),drawerDimm.style.visibility="visible",drawerDimm.style.opacity=a,drawerDimm.style.webkitTransform="translate(0,0) translateZ(0)",drawer.style.transition="none",nlDrawer.options.maxWidth=nlDrawer.options.maxWidth>deviceW-56?deviceW-56:nlDrawer.options.maxWidth,r.translate(drawer,o,"",0,"",0,"",nlDrawer.options.maxWidth),nlDrawer.options.open=!0,n.isFinal?("left"===nlDrawer.options.direction?nlDrawer.hide():nlDrawer.show(),nlDrawer.options.holdPos=null,nlDrawer.options.endTrue=!1):nlDrawer.options.endTrue=!0},touchEnd:function(e){e.addEventListener("mouseup",function(e){r(e,!1)},!1),e.addEventListener("touchend",function(e){r(e,!0)},!1);var r=function(e,r){var n=r?e.changedTouches[0]:e,t=n.clientX>nlDrawer.options.maxWidth/2,o="left"===nlDrawer.options.direction,i="right"===nlDrawer.options.direction,a=nlDrawer.options.endTrue;t&&o&&a||t&&i&&a?nlDrawer.show():(!t&&o&&a||!t&&i&&a)&&nlDrawer.hide(),nlDrawer.options.direction=!1,nlDrawer.options.endTrue=!1,nlDrawer.options.holdPos=null,e.preventDefault()}},init:function(e){nlDrawer.options=r.merge(nlDrawer.options,e),console.log("init drawer"),swipe=document.getElementById("swipe-stripe"),swipeH=new Hammer(swipe),body=document.getElementById("cont"),bodyH=new Hammer(body),drawer=document.getElementById("drawer"),drawerH=new Hammer(drawer),drawerDimm=document.getElementById("drawer-dimm"),drawerDimmH=new Hammer(drawerDimm),burger=document.getElementById("burger"),burgerTop=document.getElementById("burger-top"),burgerBottom=document.getElementById("burger-bottom"),deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),nlDrawer.options.modifyViewContent&&(viewContent=document.getElementById("view-content"),viewContent.style.position="fixed",viewContent.style.width=deviceW+"px",viewContent.style.height=deviceH-nlDrawer.options.topBarHeight+"px",viewContent.style.top=nlDrawer.options.topBarHeight+"px"),nlDrawer.options.maxWidth=nlDrawer.options.maxWidth>deviceW-56?deviceW-56:nlDrawer.options.maxWidth,r.translate(drawer,nlDrawer.options.maxWidth,"-",0,"","0","",nlDrawer.options.maxWidth),window.onresize=function(e){deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),nlDrawer.options.modifyViewContent&&(viewContent.style.position="fixed",viewContent.style.width=deviceW+"px",viewContent.style.height=deviceH-nlDrawer.options.topBarHeight+"px"),nlDrawer.options.maxWidth=nlDrawer.options.maxWidth>deviceW-56?deviceW-56:nlDrawer.options.maxWidth,drawer.style.width=nlDrawer.options.maxWidth+"px",nlDrawer.options.open||r.translate(drawer,nlDrawer.options.maxWidth,"-",0,"","0","","")},drawerH.on("panleft panright",function(e){nlDrawer.options.open&&nlDrawer.move(e,!0)}),drawerDimmH.on("panleft panright",function(e){nlDrawer.options.open&&nlDrawer.move(e)}),swipeH.on("panright panleft",function(e){nlDrawer.move(e)}),nlDrawer.touchEnd(swipe),nlDrawer.touchEnd(drawer),nlDrawer.touchEnd(drawerDimm)},set:function(e){var n=r.merge(nlDrawer.options,e);nlDrawer.options=n},togglePlus:function(e){if(nlDrawer.options.useActionButton){var r=document.getElementById("add-panel-switch"),n=document.getElementById("drawer-dimm");nlDrawer.plusActive||e?(nlDrawer.options.open||(n.style.visibility="hidden",n.style.opacity="0"),nlDrawer.plusActive=!1,r.classList.remove("active")):(nlDrawer.plusActive=!0,r.classList.add("active"),n.style.visibility="visible",n.style.opacity="1")}}}}]);