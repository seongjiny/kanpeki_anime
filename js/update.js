(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";

    function updateUser(pwd,profile) {
        // if (checkUserName(profile.email,password) == 0) {
            var userID=localStorage.getItem('id');
            console.log(profile);
            $.ajax({
                url: apiUrl+userID,
                type: 'PUT',
                dataType: 'JSON',
                data: {
                    "password": pwd,
                    "profile": profile
                },
                success: function (data) {
                    if (data) {
                        window.location="./index.html";
                    } else {
                        console.log("Problem occurred while updating user info.");
                    }
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        // } else {
        //     console.log("Inappropriate UserName");
        // }
    }

    function checkUserName(email,pwd) {
        // if(pwd!=null){

        // }
        // if (email.getIndexOf('@')===-1) {
        //     alert("User Name should be between 5 and 20 characters");
        //     return -1;
        // } else if (!validateCode(username)) {
        //     alert("Illegal character detected in User Name.");
        //     return -1;
        // } else if(pwd.length<8||pwd.length>20){
        //     alsert("Password should be between 8 and 20 characters")
        //     return -1;
        // }else{
        //     return 0;
        // }
        return 0;
    }
    function displayUserProfile(){
        var email = localStorage.getItem('email');
        var firstName = localStorage.getItem('firstName');
        var lastName = localStorage.getItem('lastName');
        var intro=localStorage.getItem('intro');
        if(email){
            $('input:text[name="email"]').val(email);
        }
        if(firstName){
             $('input:text[name="fname"]').val(firstName);
        }
        if(lastName){
             $('input:text[name="lname"]').val(lastName);
        }
        if(intro){
             $('textarea[name="intro"]').val(intro);
        }
    }

    $(document).ready(function () {
        displayUserProfile();
        $('button:submit[name="submit-change"]').on('click', function (e) {
            e.preventDefault();
            var pwd = $('input:password[name="psw"]').val(),
                fname = $('input:text[name="fname"]').val(),
                lname = $('input:text[name="lname"]').val(),
                emailAddr = $('input:text[name="email"]').val(),
                intros = $('textarea[name="intro"]').val();
            updateUser(pwd,{
                firstName: fname,
                lastName: lname,
                email:emailAddr,
                intro:intros
            });

        });
    });

})();