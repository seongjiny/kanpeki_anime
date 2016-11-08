(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    // var user;
    // make ajax call to get all the users from api
    function cacheAnime() {
        $.ajax({
            url: apiUrl+"animes",
            type: 'POST',
            dataType: 'JSON',
            data:animeList,
            success: function (data) {
                if (data) {
                    console.log(data);
                } else {
                    console.log("User not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    $(document).ready(function () {
        // get users from api
        cacheAnime();
    });

})();