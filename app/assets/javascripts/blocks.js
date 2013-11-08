//This block code is taken from
//http://labs.benholland.me/pinterest/
//It actually only works on blocks of the same size now
var BlockManager = function() {
    var colCount = 0;
    var colWidth = 300;
    var margin = 10;
    var spaceLeft = 0;
    var windowWidth = 0;
    var columns = [];
    var blocks = [];
    var lefts = [];
    var rights = [];
    var lastI = 0;
    var setupBlocks = function() {
        windowWidth = $(window).width();
        columns = [];

        // Calculate the margin so the blocks are evenly spaced within the window
        colCount = Math.floor(windowWidth/(colWidth+margin*2));
        spaceLeft = (windowWidth - ((colWidth*colCount)+(margin*(colCount-1)))) / 2;
        console.log(spaceLeft);
        
        for(var i=0;i<colCount;i++){
	    columns.push(margin);
        }

        positionBlocks();
    }

    var positionBlocks = function() {
        $('.block').each(function(i){
            blocks[i] = $(this).attr('id');
	    var min = Array.min(columns);
	    var index = $.inArray(min, columns);
	    var leftPos = margin+(index*(colWidth+margin));
	    $(this).css({
	        'left':(leftPos+spaceLeft)+'px',
	        'top':min+'px'
	    });
	    columns[index] = min+$(this).outerHeight()+margin;
        });
        $('.removeBox').click(function() {removeBlock($this).parent()});
    }

    //Remove a block from the grid
    var removeBlock = function(block) {
        var index = $.inArray(block.attr('id'), blocks);
        console.log(index);
        var curLeft = block.css('left');
        var curTop = block.css('top');
        
        console.log(block);
        console.log(blocks);
        console.log(blocks[blocks.length-1]);
        

        block.remove();
        blocks.splice(index,1);
        moveBlockBack($("#" + blocks[index]), curLeft, curTop);
    }

    //Move back blocks after a remove
    var moveBlockBack = function(block, left, top) {
        var index = $.inArray(block, blocks);
        var curLeft = block.css('left');
        var curTop =block.css('top');
        
        $(this).css({
	    'left':left,
	    'top':top
	});

        if ( index < blocks.length - 1) {
            moveBlockBack(blocks[index+1], curLeft, curTop);
        }
    }

    var positionLast = function() {
        var lastBlock = $('.block').last();
        var min = Array.min(columns);
        var index = $.inArray(min, columns);
        var leftPos = margin+(index*(colWidth+margin));
        var oldLeft = lastBlock.css("left");
        var oldTop = lastBlock.css("top");
        lastBlock.css({
	    'left':(leftPos+spaceLeft)+'px',
	    'top':min+'px'
        });

        columns[index] = min+lastBlock.outerHeight()+margin;

        var lastBlockMain = $('.blockMain').last();
        lastBlockMain.css({
	    'left':oldLeft+'',
	    'top':oldTop+''
        });

        blocks[blocks.length - 1] = lastBlock.attr('id');
        blocks[blocks.length - 2] = lastBlockMain.attr('id');
        $('.removeBox').click(function() {removeBlock($(this).parent())});
    }

    

    // Function to get the Min value in Array
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };

    return {
        setupBlocks : setupBlocks,
        positionLast : positionLast
    }

}

bm = BlockManager();

$(function(){
    $(window).ready(bm.setupBlocks);
    $(window).resize(bm.setupBlocks);
});