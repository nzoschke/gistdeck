var docs = "Turn into Bookmarklet at http://mcdlr.com/js-inject/";

$("head").append('<link rel="stylesheet" href="https://gistdeck.herokuapp.com/gistdeck.css" type="text/css" />');

var slideNum = 0;

function setSlide(idx) {
  var slides = $(".markdown-body h1, .markdown-body h2");

  idx = Math.min(idx, slides.length-1);
  idx = Math.max(idx, 0);
  console.log(idx);

  var s = $(slides[idx]);
  $("body").animate({scrollTop: s.offset().top}, 50);
  slideNum = idx;
}

$(document).keydown(function(e) {
  if (e.which == 37)      setSlide(slideNum-1);
  else if (e.which == 39) setSlide(slideNum+1);
});

setSlide(0);