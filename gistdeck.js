(function() {

  // Cache window and slides jQuery selectors
  var $window = $(window);
  var $slides = $(".pagehead, .markdown-body h1, .markdown-body h2");

  function initialize() {
    var GISTDECK_CSS_URL= window.GISTDECK_CSS_URL || "https://gistdeck.herokuapp.com/gistdeck.css";

    $('<link rel="stylesheet" href="' + GISTDECK_CSS_URL + '" type="text/css" />')
      .addClass('gistdeck-css')
      .appendTo('head');

    // Set gap before all slides but first, and after slides container, equal to the window height
    $slides.not($slides.first()).css('margin-top', $window.height());
    $('.markdown-body').css('margin-bottom', $window.height());
    // so the gist description also looks like a slide
    $('.gist-description').css('margin-bottom', $window.height());

    $(document).on('keydown.gistdeck', function(e) {
      if (e.which == 37)      displaySlide(getCurrentSlideIdx()-1);
      else if (e.which == 39) displaySlide(getCurrentSlideIdx()+1);
      else if (e.which == 27) resetGist();
    });

    displaySlide(0);
  }

  function resetGist() {
    // Reset margins
    $slides.not($slides.first()).css('margin-top', '');
    $('.markdown-body').css('margin-bottom', '');

    $(document).scrollTop(0);
    $('.gistdeck-css').remove();

    // Unbind every gistdeck event handler
    $(document).off('.gistdeck');
  }

  function getCurrentSlideIdx() {
    var idx = 0;
    var viewportBottom = $window.scrollTop() + $window.height();

    for (var i=0; i < $slides.length; i++) {
      if ($slides.eq(i).offset().top > viewportBottom) break;
      idx = i;
    }

    return idx;
  }

  function displaySlide(n) {
    n = Math.min(n, $slides.length-1);
    n = Math.max(n, 0);

    var s = $slides.eq(n);
    var top = s.offset().top;

    // To vertically center the H1 slides, we must calculate the height of the
    // slide content. To do this, get the difference between the bottom of the
    // last and top of the first slide element. We should only do this if there
    // is a next slide.
    var lastSlideELement = $slides.eq(n+1).prev();
    var titleTop = 150;
    var contentHeight = 0;
    if (lastSlideELement.length === 0) {
      // lastSlideELement will be empty if we are at the last slide. In that case
      // find the last element. .nextAll().andSelf() ensures we don't end up with
      // an empty set since nextAll() will return empty if at the last element.
      lastSlideELement = s.nextAll().andSelf().last();
    }
    contentHeight = (lastSlideELement.offset().top + lastSlideELement.height()) - top;
    // The top line is half the window plus half the content height.
    titleTop = ($window.height()/2) - (contentHeight/2);

    var padding = {
      "DIV": top,
      "H1":  titleTop,
      "H2":  20
    }[$slides[n].tagName];

    $(document).scrollTop(top - padding);
  }

  if ($('.gistdeck-css').length) {
    resetGist();
  } else {
    initialize();
  }

})();
