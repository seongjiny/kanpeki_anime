(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var users;

    // make ajax call to get all the users from api
    function getUsers() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    users = data;
                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    function addUser(userName,password){
        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'JSON',
            data:{
                "userName":userName,
                "password":password,
                
            },
            success: function (data) {
                if (data) {
                    console.log("User added")
                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    //Check for duplicate username
    function checkUser(userName,password){
        var found= false;
        var size=users.length;
        //loop through users
        for(var i=0;i<size;i++){
            if(users[i].userName==userName){
                alert("Username Already Exist");
                i=size;
                found=true;
            }
        }
        if(!found){
            addUser(userName,password);
        }
    }

    $(document).ready(function () {
        // get users from api
        getUsers();

        $('button:submit[name="signup"]').on('click',function(){
            var uname = $('input:text[name="uname"]').val();
            var password = $('input:password[name="psw"]').val();
            var password2 = $('input:password[name="psw2"]').val();
            if(password!=password2){//if password and password2 does not match
                alert("password does not match!");
            }else{
                checkUser(uname,password);
            }
        });
    });

})();