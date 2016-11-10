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
        // cacheAnime();

        if (localStorage.getItem('token') != null) {
            $('#login-link').html("<a href=\"Lists.html\">My Lists</a>");
            $('#update-link').html("<a href=\"update.html\">Settings</a>");
            console.log("");
        } else {
            $('#login-link').html("<a href=\"login.html\">Log in</a>");
            $('#update-link').html("<a href=\"register.html\">Register</a>");
        }
    });

})();