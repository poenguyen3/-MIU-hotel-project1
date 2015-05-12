// Scripts for about-page
(function($, window){
  var contentContainer = $('#content-container.about'),
      content = contentContainer.find('.content'),
      headerMobileH = 80,
      sliderMobileH = 200,
      footerMobileH = 110;
  var setScrollContent = function(){
    var winH = $(window).height(),
        winW = $(window).width(),
        contentH = 0,
        contentContainerH = '100%';
    if (winW <= 480) {
      contentContainerH = winH - headerMobileH - sliderMobileH - footerMobileH;
      contentH = contentContainerH - 16;
    } else {
      contentH = winH - 250;
    }
    contentContainer.css({
      'height': contentContainerH
    });
    content.css({
      'height': contentH
    });
  };

  $(window).on('resize', function(){
    setScrollContent();
  });
  setScrollContent();
})(jQuery, window);