(function () {
    "use strict";
    var apiUrl = "https://csse280-kanpekianime-backend.herokuapp.com/";
    var animeidList;
    var anime = [];
    var username;
    var animeID;

    function getAnimeByID() {
        $.ajax({
            url: apiUrl +"animes/anime/"+ animeID,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    displayAnime(data[0]);
                } else {
                    window.location.href = "lists.html";
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
                '<button id="AddToMyList"> Add to MyList </button>'+'</div>');
        $('#body_container').append(animeElement);
        if(!username){
            $('#AddToMyList').hide();
        }
        $('#AddToMyList').on("click",function(){
            $.ajax({
                url: apiUrl +"users/"+ username + "/" + animeID,
                type: 'PUT',
                dataType: 'JSON',
                success: function (data) {
                    if (data) {
                        console.log(data);
                        window.location.href = "lists.html";
                    } else {
                        window.location.href = "lists.html";                        
                        console.log("Anime not Found");
                    }
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            })
        });
    }

    
    
    $(document).ready(function () {
        username = localStorage.getItem("username");
        animeID = localStorage.getItem("anime");
        getAnimeByID();
    });

})();