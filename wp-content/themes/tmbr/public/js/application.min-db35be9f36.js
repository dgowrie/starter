_now=Date.now||function(){return(new Date).getTime()},_throttle=function(t,n,e){var i,a,o,l=null,r=0;e||(e={});var u=function(){r=e.leading===!1?0:_now(),l=null,o=t.apply(i,a),l||(i=a=null)};return function(){var s=_now();r||e.leading!==!1||(r=s);var c=n-(s-r);return i=this,a=arguments,0>=c||c>n?(l&&(clearTimeout(l),l=null),r=s,o=t.apply(i,a),l||(i=a=null)):l||e.trailing===!1||(l=setTimeout(u,c)),o}},function(t){"use strict";var n={init:function(){n.Mobiledetect(),n.Smoothscroll(),n.Throttle(),n.Preloader(),n.Slider(),n.Lightbox()},Mobiledetect:function(){var n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);t("body").addClass(1==n?"mobile":"no-touch")},Smoothscroll:function(){t("a[href*=#]:not([href=#])").on("click","",function(n){if(n.preventDefault(),location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")||location.hostname==this.hostname){var e=t(this.hash);if(e=e.length?e:t("[name="+this.hash.slice(1)+"]"),e.length)return t("html,body").animate({scrollTop:e.offset().top},{duration:600,easing:"easeOutCubic"}),!1}})},Throttle:function(){var n=50;t(window).on("scroll",_throttle(function(){},n)),t(window).on("resize",_throttle(function(){},n))},Preloader:function(){t(window).load(function(){setTimeout(function(){t(".js-sitewrap").animate({opacity:1},300),t("#preloader").fadeOut(300,function(){n.Animated()})},300)})},Slider:function(){t(document).ready(function(){t("#home-slider").flexslider({animation:"slide",slideshow:!1,slideshowSpeed:4e3,animationSpeed:600,pauseOnHover:!0,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next"})})},Lightbox:function(){t(".imagepop").magnificPopup({type:"image"}),t(".js-flex-gallery-img").magnificPopup({type:"image",gallery:{enabled:!0}})},Animated:function(){t(".animation, .animation-visible").each(function(){var n=t(this);n.waypoint(function(){var t=0;n.attr("data-delay")&&(t=parseInt(n.attr("data-delay"),0)),n.hasClass("animated")||setTimeout(function(){n.addClass("animated "+n.attr("data-animation"))},t),t=0},{offset:"80%"})})},ShowAnimated:function(){t(".animation, .animation-visible").each(function(){t(this).addClass("animated")})}};t(function(){n.init()})}(window.jQuery);