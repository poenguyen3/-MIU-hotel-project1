// Scripts for about-page
(function($, window){
  var contentContainer = $('#content-container.accom'),
      content = contentContainer.find('.content'),
      headerMobileH = 80,
      sliderMobileH = 200,
      footerMobileH = 110;
  var setScrollContent = function(){
    var winH = $(window).height(),
        winW = $(window).width(),
        contentH = 0,
        contentContainerH = '100%';
    
    $('.photo-list').mCustomScrollbar({
      theme:"minimal"
    });

    var hideRoomDetail = function(){
      $('.room-detail')
        .stop()
        .removeClass('show')
        .delay(300)
        .queue(function(){
          $(this).css({
            'visibility': 'hidden'
          });
        });
    };

    var showRoomDetail = function(id){      
      console.log($('.room-detail.r-' + id).length);
      $('.room-detail.r-' + id)
        .stop()
        .css({
          'visibility': 'visible'
        }).addClass('show');
    };

    $('.room-list .photo-list .photo-wrap').on('click',function(){
      console.log($(this).data('id'));
      showRoomDetail($(this).data('id'));
    });
    $('.room-detail .close-btn').on('click', function(){
      hideRoomDetail();
    });
  };

  $(window).on('resize', function(){
    setScrollContent();
  });
  setScrollContent();
})(jQuery, window);