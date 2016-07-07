// Credit goes to [Underscore.js](http://underscorejs.org/)

/**
 * Returns a function, that, when invoked, will only be triggered at most
 * once during a given window of time. Normally, the throttled function will
 * run as much as it can, without ever going more than once per wait
 * duration; but if you’d like to disable the execution on the leading edge,
 * pass {leading: false}. To disable execution on the trailing edge, ditto.
 */

// throttle's dependent upon _now
_now = Date.now || function() {
  return new Date().getTime();
};

_throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : _now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};


(function($) {

	'use strict';

	var SiteApp = {



		// Initialize the functions
		init: function() {

			SiteApp.Mobiledetect();
			SiteApp.Smoothscroll();
			SiteApp.Throttle();
			SiteApp.Preloader();
			SiteApp.Slider();
			SiteApp.Lightbox();
			SiteApp.FitVids();
			SiteApp.NavtoSelectlist();

			// Call this to show all animited items
			// SiteApp.ShowAnimated();
		},


		// Mobile Device Detection
		Mobiledetect: function() {

			var ismobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

			if(ismobile == true){
				$('body').addClass('mobile');
			} else {
				$('body').addClass('no-touch');
			}

		},

		// set content videos to full width
		FitVids: function() {
   			$("#page-main").fitVids();
		},

		// turn standard UL nav to select lst for mobile by add ing class js-selectdropdown to <ul>
		NavtoSelectlist: function() {
			$('ul.js-selectdropdown').each(function() {
			    var select = $(document.createElement('select')).insertBefore($(this)).addClass('mobile-select').wrap( "<div class='select-nav-wrap'></div>" );
			    $('>li a', this).each(function() {
			        var a = $(this).click(function() {
			            if ($(this).attr('target')==='_blank') {
			                window.open(this.href);
			            }
			            else {
			                window.location.href = this.href;
			            }
			        }),
			        option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).click(function() {
			            a.click();
			        });
			    });
			});
		},

		// Smooth Scroll to Anchor Tags
		Smoothscroll: function() {

			$('a[href*=#]:not([href=#])').on('click','', function( e ) {
				e.preventDefault();

				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

					if (target.length) {
						$('html,body').animate(
							{ scrollTop: target.offset().top },
							{ duration: 600, easing:'easeOutCubic'}
						);
						return false;
					}

				}

			});
		},



		// Window Scroll Functions
		Throttle: function() {

			var throttleTimeOut = 50; //milliseconds before triggering function again

			// Window Scroll functions
			$(window).on('scroll', _throttle(function(){
				/* do your normal scroll stuff here, but it'll be
				 * more-reasonably controlled, so as to not peg
				 * the host machine's processor */
			}, throttleTimeOut));

			// Window Resize Functions
			$(window).on('resize', _throttle(function(){
				/* do your normal resize stuff here, but it'll be
				 * more-reasonably controlled, so as to not peg
				 * the host machine's processor */
			}, throttleTimeOut));

		},


		// Page Loading Progress
		Preloader: function() {

			$(window).load(function() {
				setTimeout(function() {
					$('.js-sitewrap').animate({
						opacity: 1
					}, 300);
					$('#preloader').fadeOut(300, function() {
						SiteApp.Animated();
					});
				}, 300); // delay 300 ms
			});

		},


		// Slider
		Slider: function() {

			$(document).ready(function() {
				$('.js-slider').slick({
			    dots: true
			  });

			});

		},



		// Lightbox Gallery
		Lightbox: function() {

			$('.js-popup-img').magnificPopup({
				type:'image',
				mainClass: 'tmbr-overlay -media -img',
			});

			$('.js-popup-video').magnificPopup({
				type: 'iframe',
				removalDelay: 300,
				mainClass: 'tmbr-overlay -media -video',
				fixedContentPos: true,
				closeOnBgClick: true,
				preloader: false,
				closeBtnInside: false
			});

			$('.js-o-trigger, .js-o-trigger > a').magnificPopup({
				type: 'inline',
				removalDelay: 300,
				mainClass: 'tmbr-overlay -content',
				fixedContentPos: true,
				alignTop: true,
				closeOnBgClick: true,
				preloader: false,
				midClick: true,
				closeBtnInside: false
			});

			// Flex Content image gallery with modal
			$('.js-flex-gallery-img').magnificPopup({
			  type: 'image',
			  mainClass: 'tmbr-overlay -media -img',
			  delegate: 'a',
			  fixedContentPos: true,
			  closeOnBgClick: true,
				closeBtnInside: false,
			  gallery:{
			    enabled:true
			  }
			});

		},





		// Animation Effects
		Animated: function() {

			$('.animation, .animation-visible').each(function() {

				var $element = $(this);

				$element.waypoint(function() {

					var delay = 0;

					if ($element.attr('data-delay')) delay = parseInt($element.attr('data-delay'), 0);
					if (!$element.hasClass('animated')) {
						setTimeout(function() {
							$element.addClass('animated ' + $element.attr('data-animation'));
						}, delay);
					}
					delay = 0;
				}, {
					offset: '80%'
				});

			});

		},



		// Show All Animated Items
		ShowAnimated: function() {

			$('.animation, .animation-visible').each(function() {
				$(this).addClass('animated');
			});

		}



	};



	// Run the Main Function
	$(function() {
		SiteApp.init();
	});



})(window.jQuery);