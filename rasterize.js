var gistdeck = require( './gistdeck' ),
    page = require( 'webpage' ).create(),
    system = require( 'system' ),
    address, outputDir,
    viewportWidth = 1024,
    viewportHeight = 768;

if ( system.args.length < 2 || system.args.length > 5 ) {
    console.log( 'Usage: rasterize.js URL [directory width height]' );
    phantom.exit( 1 );
} else {
    address = system.args[1];
    outputDir = system.args[2];
    viewportWidth = system.args[3] || viewportWidth;
    viewportHeight = system.args[4] || viewportHeight;
    page.viewportSize = { width: viewportWidth, height: viewportHeight };

    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    page.open( address, function (status) {
        if ( status !== 'success' ) {
            console.log( 'Unable to load that gist!' );
            phantom.exit();
        } else {

            // Set timeout for page/images to load
            window.setTimeout( function() {
                console.log( 'Generating Images...' );
                page.evaluate( function( gistdeck, viewportHeight ) {
                    document.height = viewportHeight;

                    gistdeck();
                }, gistdeck, viewportHeight );

                // Set timeout again to let gistdeck styles load
                setTimeout( function() {
                    var i = 0,
                        scroll,
                        totalHeight,
                        roughCount,
                        numLen,
                        data = page.evaluate( function() {
                            return {
                                scroll: $(document).scrollTop(),
                                winHeight: $('.markdown-body').height()
                            };
                        });
    
                    scroll = data.scroll;
                    totalHeight = data.winHeight;
                    roughCount = Math.round( totalHeight / viewportHeight );
                    numLen = ( roughCount + '' ).length + 1;
    
                    // Keep advancing and taking screen shots until we reach the last slide
                    while( totalHeight - scroll > viewportHeight ) {
    
                        var data = page.evaluate( function(i) {
                            var e = $.Event( 'keydown.gistdeck', {which: 39 } ),
                                $doc = $(document);
    
                            // Programmatically hit the right arrow key
                            // to navigate slides
                            // We have to hit it i times because phantomJS doesn't save
                            // our scrollTop
                            for( var j = 0; j < i; j++ ) {
                                $doc.trigger(e);
                            }
    
                            return {
                                scroll: $(document).scrollTop(),
                                winHeight: $('.markdown-body').height()
                            };
                        }, i);
    
                        scroll = data.scroll;
                        totalHeight = data.winHeight;
    
                        // Take snapshot relative to scroll position
                        page.clipRect = { top: scroll, left: 0, width: viewportWidth, height: viewportHeight };
                        page.render( ( outputDir ? outputDir : 'slides' ) + '/slide-' + pad(i+1, numLen) + '.png' );
                        i++;
                    }
                    phantom.exit();
                }, 2000 );
            }, 2000);
        }
    });
}
