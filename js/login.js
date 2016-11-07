//frontend login
(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var usersDisplayLocation;
    var users;

    // make ajax call to get all the users from api
    function verification(username, pwd) {
        //console.log("hit");
        console.log(username);

        $.ajax({
            url: apiUrl + "login",
            type: 'POST',
           // dataType: 'JSON',
            data:{
                "username": username,
                "password": pwd
            },      
            success: function (data) {
                if (data) {
                    //users = data;
                    //displayUsers(users);
                    console.log("hit login data");
                    console.log(data[0]);
                    //window.location.href = './index.html';
                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }


    // dynamically display all the users from api
    // function displayUsers(users) {
    //     usersDisplayLocation = $("table.table-bordered>tbody").empty();
    //     users.forEach(function (user) {
    //         var $userRow = $('<tr>').attr('data-userid', user._id);
    //         $userRow.append(
    //             "<td>" + (user.userName || "") + "</td>" +
    //             "<td>" + (user.password || "") + "</td>"
    //         );
    //         // append row with user details to DOM tree
    //         usersDisplayLocation.append($userRow);

    //         // Save user to update in local storage
    //     });
    // }
    //user verification
    // function checkUser(userName,password){
    //     var found= false;
    //     for(var i=0;i<users.length;i++){
    //         if(users[i].userName==userName){//check for user name
    //             found=true;
    //             if(users[i].password==password){
    //                 // window.location.replace("index.html");
    //                 alert("login success");
    //                 console.log("login success");//**TODO refresh page as logged in
    //             }else{
    //                 alert("incorrect password");
    //                 console.log("incorrect password");
    //             }
    //             i=users.length; //break once user name matches
    //         }
    //     }
    //     if(!found){//no match in username
    //         console.log("invalid username");
    //         alert("invalid username");
    //     }
    // }

    $(document).ready(function () {
        

        $('button:submit[name="login"]').on('click',function(){
            var uname = $('input:text[name="uname"]').val();
            var password = $('input:password[name="psw"]').val();
            console.log(verification(uname,password));
        });
    });

})();