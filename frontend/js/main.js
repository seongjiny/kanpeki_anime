(function () {
    "use strict";
    var apiUrl = "https://csse280-kanpekianime-backend.herokuapp.com/";
    var time = 200000000000000; // 20000 about 10s
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
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
        if (setupTime == null) {
                localStorage.setItem('setupTime', now)
            } else {
                if(now-setupTime > time) {
                    localStorage.clear()
                    localStorage.setItem('setupTime', now);
                }
            }


        if (localStorage.getItem('token') != null) {
            $('#login-link').html("<a href=\"lists.html\">My Lists</a>");
            $('#update-link').html("<a href=\"update.html\">Settings</a>");
            console.log("");
        } else {
            $('#login-link').html("<a href=\"login.html\">Log in</a>");
            $('#update-link').html("<a href=\"register.html\">Register</a>");
        }
    });

})();