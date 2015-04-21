/**
 *  @name homeSlider
 *  @description Homepage main slider
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
  'use strict';

  var pluginName = 'home-slider';

  var readyForBlurEffect = function() {
    var overlay = $('<div class="overlay"></div>'),
        self = this,
        slideInd = 0;

    this.element.find('.slide').css({
      'z-index': '1'
    }).each(function(){
      var _this = $(this),
          imgUrl = _this.data('url');
      _this.css({
        'background-image': 'url(' + imgUrl + ')',
        'background-position': 'center center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      });
      _this.addClass('sl-' + slideInd);
      self.blahs.slideCls.push('sl-' + slideInd);
      slideInd++;
    });

    this.blahs.maxSlide = this.element.find('.slide').length;

    overlay.css({
      'width': '100%',
      'height': '100%',
      'position': 'absolute',
      'z-index': 3,
      'top': '0px',
      'left': '0px',
      'background': '#ffffff',
      'opacity': '0',
    });

    this.element.append(overlay);
  };

  var initEffectRequiredElement = function() {
    var elem = this.element,
        blahs = this.blahs;
    switch (this.options.effect.type) {
      case 'blur':  readyForBlurEffect.call(this);break;      
      default:
    }
    elem.find('.slide').hide();
    elem.find('.slide:first').show();
    blahs.curSlideCls = blahs.slideCls[blahs.curSlide];
  };

  // go-to-slide functions for each effect
  var blurToSlide = function(ind) {
    var elem = this.element,
        blahs = this.blahs,
        duration = this.options.effect.duration,
        overlay = elem.find('.overlay'),
        targetSlide = null, curSlideElem = null;

    curSlideElem = elem.find('.slide.' + blahs.curSlideCls);
    blahs.curSlide = ind;
    blahs.curSlideCls = blahs.slideCls[blahs.curSlide];
    targetSlide = elem.find('.slide.' + blahs.curSlideCls);

    overlay
      .animate({
        'opacity': 0.9
      }, duration, function() {
        curSlideElem.fadeOut('fast');
        targetSlide.fadeIn('fast');
      })
      .animate({
        'opacity': 0
      }, duration);

  };

  var gotoSlide = function(ind) {
    switch (this.options.effect.type) {
      case 'blur':
        blurToSlide.call(this, ind);
        break;
      default:
    }
  };

  var nextSlide = function() {
    var curSlide = this.blahs.curSlide,
        maxSlide = this.blahs.maxSlide;
    if (curSlide < maxSlide - 1) {
      gotoSlide.call(this, curSlide + 1);
    } else {
      this.blahs.directForward = false;
    }
  };

  var prevSlide = function() {
    var curSlide = this.blahs.curSlide;
    if (curSlide > 0) {
      gotoSlide.call(this, curSlide - 1);
    } else {
      this.blahs.directForward = true;
    }
  };

  var autoPlayProcess = function() {
    var forward = this.blahs.directForward;
    if (forward) {
      nextSlide.call(this);
    } else {
      prevSlide.call(this);
    }
  };

  var clearAutoplay = function() {
    clearInterval(this.blahs.autoPlayTimer);
    this.blahs.autoPlayTimer = null;
  };

  var startAutoplay = function() {
    var self = this;
    this.blahs.autoPlayTimer = setInterval(function(){
      autoPlayProcess.call(self);
    }, this.options.autoPlayPeriod);
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.blahs = {
        maxSlide: 0,
        curSlide: 0,
        curSlideCls: '',
        slideCls: [],
        directForward: true,
        autoPlayTimer: null
      };
      // initialize
      initEffectRequiredElement.call(this);
      if (this.options.autoPlay) {
        startAutoplay.call(this);
      }
      // add events
    },
    destroy: function() {
      // deinitialize
      // remove events
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    effect: {
      type: 'blur',
      duration: 500
    },
    autoPlay: true,
    autoPlayPeriod: 2500,
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
