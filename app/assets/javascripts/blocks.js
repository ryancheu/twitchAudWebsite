//http://labs.benholland.me/pinterest/
//This arranges blocks in a nice order
//I took it mostly from the website above,
//but had to modify it a lot to fix various bugs
function BlockMover() {
    var colCount = 0;
    var colWidth = 0;
    var margin = 20;
    var windowWidth = 0;
    var blocks = [];

    $(function(){
        $(window).resize(setupBlocks);
    });

    // Function to get the Min value in Array
    //private function
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };
    
    //public function
    var setupBlocks = function() {
        windowWidth = $("#main_content").width();
        colWidth = $('.block').outerWidth();
        blocks = [];
        colCount = Math.floor(windowWidth/(colWidth+margin*2));
        for(var i=0;i<colCount;i++){
	    blocks.push(margin);
        }
        positionBlocks();
    }

    //private function
    var positionBlocks = function () {
        $('.block').each(function(){
	    var min = Array.min(blocks);
	    var index = $.inArray(min, blocks);
	    var leftPos = margin+(index*(colWidth+margin));
            if (leftPos > 0 && min > 0) {
	        $(this).css({
	            'left':leftPos+'px',
	            'top':min+'px'
	        });
            }
	    blocks[index] = min+$(this).outerHeight()+margin;
        });	
    }

    return {
        setupBlocks: setupBlocks
    }
}

//When the page loaded in, setup the blocks
$(window).ready(BlockMover().setupBlocks);