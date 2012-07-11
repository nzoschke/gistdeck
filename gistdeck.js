if (typeof(GISTDECK_CSS_URL) == "undefined")
    var GISTDECK_CSS_URL="https://gistdeck.herokuapp.com/gistdeck.css"
$("head").append('<link rel="stylesheet" href="' + GISTDECK_CSS_URL + '" type="text/css" />');

var slides = $("#owner, .markdown-body h1, .markdown-body h2");

function getCurrentSlideIdx() {
  var idx = 0;
  var viewportBottom = $(window).scrollTop() + $(window).height();

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