(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var usersDisplayLocation;
    var users;
    // make ajax call to get all the users from api
    function getUsers(userName, password) {
        $.ajax({
            url: apiUrl+"login",
            type: 'POST',
            dataType: 'JSON',
            data:{
                "userName": userName,
                "password": password
            },
            success: function (data) {
                if (data) {
                    console.log(data);
                    users = data.user;
                    window.location="./index.html"

                    //send user information to other js files

                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    $(document).ready(function () {
        $('button:submit[name="login"]').on('click',function(e){
            e.preventDefault();
            var uname = $('input:text[name="uname"]').val();
            var password = $('input:password[name="psw"]').val();
            getUsers(uname,password);
        });
    });

})();