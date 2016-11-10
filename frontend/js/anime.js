(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/animes/";
    var animeidList;
    var anime = [];

    function getAnimeByID(animeID) {
        $.ajax({
            url: apiUrl +"anime/"+ animeID,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    displayAnime(data[0]);
                } else {
                    console.log("Anime not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    function displayAnime(anime) {
        var animeElement = $('<div id="bodyWrapper">'+
                "<div class=\"leftBlock\">"+
                '<img src="'+anime.poster +'" alt="'+anime.title +'" height="300" width="200">'+
                "<h2>"+ anime.title +"</h2>"+
                "<p>"+ "Episodes : "+anime.episodes +"&nbsp;&nbsp;&nbsp;"+"</p>"+
                "<p>"+ "Starts at : "+anime.startDate +"&nbsp;&nbsp;&nbsp;"+"</p>"+
                "<p>"+ "Ends at : "+anime.endDate +"&nbsp;&nbsp;&nbsp;"+"</p>"+
                "</div>"+
            '</div>');
        $('#body_container').empty().append(animeElement);
    }


    
    $(document).ready(function () {
        getAnimeByID(localStorage.getItem("anime"));
    });

})();