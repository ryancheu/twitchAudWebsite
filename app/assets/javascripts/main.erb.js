$(document).ready(function(){
    $("#jquery_jplayer").jPlayer({
	swfPath: "/js",
	supplied: "mp3",
	cssSelectorAncestor: "",
	cssSelector: {
            stop: "#stop",
	},
    });
    $("#play").click(function() {
	$('#jquery_jplayer').jPlayer("setMedia", {
		mp3: "http://18.111.101.221:8080/stream"
            });

	$('#jquery_jplayer').jPlayer('play');
	
    });
});

