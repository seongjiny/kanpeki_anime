(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/animes/";
    var animeidList;
    var anime = [];
    var editForm = false;
    // FormsFields will be used when creating the forms
    var formFields = [
        {name: "userName", des: "User Name *", type: "text", required: true},
        {name:"password",des:"Password *",type:"text",required:true}
    ];
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
        var animeElement = $("<div class=\"list-element\">"+
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

    $(document).ready(function () {
        getLists(localStorage.getItem("genre"));
    });

})();