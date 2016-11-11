(function () {
    "use strict";
    var apiUrl = "https://csse280-kanpekianime-backend.herokuapp.com/animes/";
    var animeidList;
    var anime = [];
    
    function getLists(genre) {
        $.ajax({
            url: apiUrl + "rankings/" + genre,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    animeidList = data[0].anime_ids;
                    getAnimes();
                } else {
                    console.log("Rankings not found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    function getAnimeByID(animeID) {
        $.ajax({
            url: apiUrl +"anime/"+ animeID,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    anime.push(data[0]);
                    if(anime.length==animeidList.length){
                        displayAnimes();
                        finishSetup();
                    }
                } else {
                    console.log("Anime not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    function getAnimes() {
        for (var i = 0; i < animeidList.length; i++) {
            getAnimeByID(animeidList[i]);
        }
    }

    function displayAnime(container, anime) {
        var animeElement = $('<div class="list-element" id="'+anime.animedb_id+"\">"+
                "<img class=\"list-el-img\" src=\""+ anime.poster +"\" alt=\""+ anime.title +"\">"+
                "<div class=\"item-description\">"+
                "<h2>"+ anime.title +"</h2>"+
                "<span>"+ "Episodes : "+anime.episodes +"&nbsp;&nbsp;&nbsp;"+"</span>"+
                "<span>"+ "Starts at : "+anime.startDate +"&nbsp;&nbsp;&nbsp;"+"</span>"+
                "<span>"+ "Ends at : "+anime.endDate +"&nbsp;&nbsp;&nbsp;"+"</span>"+
                "</div>"+
            "</div>");
        container.append(animeElement);
    }

    function displayAnimes(){
        var animesContainer = $('.lists-container').empty();
        anime.forEach(function (anime, index) {
        displayAnime(animesContainer, anime);
    });
    }

    function finishSetup(){
        $(".list-element").click(
                function (event){
                    localStorage.setItem("anime",$(this).attr("id"));
                    window.location.href = "anime.html";
            }
        );
    }
    $(document).ready(function () {
        getLists(localStorage.getItem("genre"));
    });

})();