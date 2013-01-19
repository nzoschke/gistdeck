if (typeof(GISTDECK_CSS_URL) == "undefined")
    var GISTDECK_CSS_URL="https://gistdeck.herokuapp.com/gistdeck.css"
$("head").append('<link rel="stylesheet" href="' + GISTDECK_CSS_URL + '" type="text/css" />');

var slides = $("#owner, .markdown-body h1, .markdown-body h2");
// Cache the window jQuery object.
$window = $(window);
// Set a gap between each slide equal to the window height to stop slides
// intruding on each other. But don't do it for the first slide.
slides.not(slides.first()).css('margin-top', $window.height());
// Also set this gap between the last slide element and the slides container.
// This stops the end slide always being at the bottom of the window.
$('.markdown-body').css('margin-bottom', $window.height());

function getCurrentSlideIdx() {
  var idx = 0;
  var viewportBottom = $window.scrollTop() + $window.height();

  for (var i=0; i < slides.length; i++) {
    if (slides.eq(i).offset().top > viewportBottom) break;
    idx = i;
  }

  return idx;
}

function displaySlide(n) {
  n = Math.min(n, slides.length-1);
  n = Math.max(n, 0);

  var s = slides.eq(n);
  var top = s.offset().top;

  var padding = {
    "DIV": s.offset().top,
    "H1":  150,
    "H2":  20
  }[slides[n].tagName];

  $(document).scrollTop(top - padding);
}

$(document).keydown(function(e) {
  if (e.which == 37)      displaySlide(getCurrentSlideIdx()-1);
  else if (e.which == 39) displaySlide(getCurrentSlideIdx()+1);
});

displaySlide(0);
