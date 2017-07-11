# advancedOnResize
advancedOnResize provide a simple solution to check window-x-resize, window-y-resize

## Installation

  `npm install advanced-page-resize`

## Usage

    var pageResize = require('advanced-page-resize');

    pageResize.watch({
        action: function(){
            console.log('execute this action on resizing page')
        },
        limit: 'X',
    });
