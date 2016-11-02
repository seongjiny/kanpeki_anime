(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";

    function addUser(userName, password) {
        if (checkUserName(userName) == 0) {
            $.ajax({
                url: apiUrl,
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "userName": userName,
                    "password": password,
                },
                success: function (data) {
                    if (data) {
                        console.log(data)
                        // document.location.href="/";
                    } else {
                        console.log("Problem occurred while registering.");
                    }
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        } else {
            console.log("Inappropriate UserName");
        }
    }

    function validateCode(usernameStr) {
        if (/[^a-zA-Z0-9]/.test(usernameStr)) {
            return false;
        }
        return true;
    }

    function checkUserName(username) {
        console.log("----"+username.length);
        if (username.length < 5 || username.length > 20) {
            alert("User Name should be between 5 to 20 characters");
            return -1;
        } else if (!validateCode(username)) {
            alert("Illegal character detected in User Name.");
            return -1;
        } else {
            return 0;
        }

    }

    $(document).ready(function () {

        $('button:submit[name="signup"]').on('click', function () {
            var uname = $('input:text[name="uname"]').val();
            var password = $('input:password[name="psw"]').val();
            var password2 = $('input:password[name="psw2"]').val();
            if (password != password2) {//if password and password2 does not match
                alert("password does not match!");
            } else {
                addUser(uname, password);
            }
        });
    });

})();