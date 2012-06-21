var docs = "Turn into Bookmarklet at http://mcdlr.com/js-inject/";

var css = ""                                                  +
"#header, #repos .meta, #revisions, #comments, #delete_link, #footer { display: none; }"                            +
"div.main { width: 80%; }"                                    +
".markdown-body p { font-size: 24px; }"                       +
".markdown-body > h1 { margin-top: 800px; font-size: 75px; }" +
".markdown-body > h1:first-child { margin-top: 0; }"          +
".markdown-body > h2 { margin-top: 800px; font-size: 30px; }" +
".markdown-body > h3 { font-size: 30px; }";

var style=document.createElement("style");
var styleContent=document.createTextNode(css);
style.appendChild(styleContent);
document.getElementsByTagName('head')[0].appendChild(style);

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