# advancedPageResize
advancedPageResize is a native js library that provide a simple solution to check window-x-resize, window-y-resize or common window-resize.

## Installation

  `npm install advancedpageresize`

## Usage

    var pageResize = require('advancedpageresize');

    pageResize.watch({
        action: function(){
            console.log('execute this action on resizing page')
        },
        limit: 'X'
    });

## Options
    all options aren't mandatory.

    #### limit: 
        limit can be:
         - 'Y' to check and execute operations during window-y-resize only, 
         - 'X' to check and execute operations during window-x-resize only,
         - default limit option check and execute operations during window-resize
    #### throttle:
        throttle can be:
            - true
            - false (default)