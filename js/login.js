//frontend login
(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var usersDisplayLocation;
    var users;
    var response;
    var tokenerr;
    //var localtokendata;

    // make ajax call to get all the users from api
    function verification(username, pwd) {
        //console.log("hit");
        //console.log(username);

        $.ajax({
            url: apiUrl + "login",
            type: 'POST',
            dataType: 'JSON',
            data: {
                "userName": username,
                "password": pwd
            },
            success: function (data) {
                if (data) {
                    //users = data;
                    //displayUsers(users);
                    console.log("hit login data");
                  
                    console.log("hit token");

                    response = data.id_token;
                    function tokenSuccess(tokenerr, response) {
                        if (tokenerr) {
                            throw tokenerr;
                        }
                        console.log("store token success");
                        localStorage.setItem('token', response);
                        var localtokendata = localStorage.getItem('token');
                        console.log(localtokendata);
                        //sessionStorage.setItem('user', user);
                    }
                    tokenSuccess(tokenerr, response);
                    window.location.href = './index.html';
                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }


    // quick test for token
    // function testForToken(){
    //     $.ajax({
    //         url: apiUrl + "login/checkToken",
    //         type: 'get',
    //         dataType: 'JSON',
    //         headers: {"Authorization": sessionStorage.getItem('accessToken')},
    //         success: function(data){
    //             console.log("get data");
    //             console.log(data);
    //         },
    //          error: function (request, status, error) {
    //             console.log(error, status, request);
    //         }
    //     });
    // }
    $(document).ready(function () {
        if (localStorage.getItem('token') != null) {
            console.log("hit log test");
            // console.log(localStorage.getItem('token'));
            //console.log(response);
            alert("You are logged in");
            window.location = "./index.html";
        } else {
            $('button:submit[name="login"]').on('click', function (e) {
                e.preventDefault();
                var uname = $('input:text[name="uname"]').val();
                var password = $('input:password[name="psw"]').val();
                verification(uname, password);
                //console.log("hit testtoken");
                //testForToken();
            });
        }

    });

})();