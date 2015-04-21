/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var desktopSizes = {
        bannerHeight: 220,
        footerHeight: 62,
        booknowButtonHeight: 58
      };
  var mobileSizes = {
        bannerHeight: 80,
        footerHeight: 58,
        booknowButtonHeight: 52
      };

  var resizeNav = function() {
    var win = $(window),
        mainNav = $('nav.main-nav'),
        minusHeightTotal = 0,
        mainSlider = $('#home-slider');
    if (win.width() > 480) {
      minusHeightTotal = desktopSizes.bannerHeight + desktopSizes.footerHeight + desktopSizes.booknowButtonHeight;
      mainNav.css({display: 'block'});
      mainNav.css({
        height: win.height() - minusHeightTotal
      });
    } else {
      mainNav.css({display: 'none'});  
      minusHeightTotal = mobileSizes.bannerHeight + mobileSizes.footerHeight + mobileSizes.booknowButtonHeight;
      // nav with content
      mainNav.css({
        height: mainSlider.height() + 'px'
      });      
    }
  };

  $(window).load(function(){
    $("nav.main-nav").mCustomScrollbar();
  });
  $(window).resize(function(){
    resizeNav();
    setTimeout(resizeNav, 500);
  });

  $(document).ready(function(){
    resizeNav();
  });

  // mobile swithc menu
  $('.menu-switch').on('click', function(){
    if ($(this).attr('class') === 'open menu-switch inline-svg') {
      $(this).attr('class', 'menu-switch inline-svg');
    } else {
      $(this).attr('class', 'open menu-switch inline-svg');      
    }
    $('nav.main-nav').stop().slideToggle('normal', function(){
      $(this).mCustomScrollbar();
    });
  });
}(jQuery, window));
