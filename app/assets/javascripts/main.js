var JPlayerManager = function() {
    var handleJsonResponse = function(serverURL,id) {
        return function(data) {
            var a = $("#"+id).find('.jp-jplayer').first();
            a.jPlayer("setMedia", {
                mp3: "http://" + serverURL +":"+ data.port
            });
            
            $("#" + id).find('.jp-jplayer').first().jPlayer('play');
        }

    }

    var getPortFromServer = function(serverURL, username, id) {
        $.ajax({
            dataType: "json",
            url: "http://" + serverURL + ":8080/view/" + username,
            success: handleJsonResponse(serverURL, id)
        });
    }

    
    //Public function
    //Assign Ids and setup properties of the jplayers
    var setupJplayers = function () {
        console.log("trying to setup jplayers");
        $('.jp-container').each(function(i) {
            console.log("found player");
            var id = "jquery_jplayer_" + i;
            $(this).attr("id",id);
            $(this).find('.jp-jplayer').jPlayer({
                swfPath: "/js",
                supplied: "mp3",
                cssSelectorAncestor: id,
                cssSelector: {
                    stop: ".stop",
                },
            });
            
            var usernameInput = $(this).find('.tusername').first();
            var urlInput = $(this).find('.serverurl').first();
            $(this).find('.play').click( function() {
                getPortFromServer(urlInput.val(), usernameInput.val(), id);
            });

            $(this).find('.stop').click( function() {
                $("#" + id).find('.jp-jplayer').first().jPlayer('stop');
            });
        });
    }

    return {
        setupJplayers : setupJplayers
    }
}

$(document).ready(function(){
    JPlayerManager().setupJplayers();
});