(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var userID = localStorage.getItem('id');
    //var r = confirm("Press a button");

    // function confirmButton(){
    //     var r;
    //     if (confirm("Press a button!") == true) {
    //         x = "You pressed OK!";
    //         } else {
    //         x = "You pressed Cancel!";
    //     }
    // }

    function updateUser(pwd, profile) {
        if (checkPassword(pwd) == 0) {

            console.log(profile.email);
            // console.log(typeof );
            // profileJson = JSON.parse(profile);
            // console.log(typeof profileJson);
            $.ajax({
                url: apiUrl + userID,
                type: 'PUT',
                dataType: 'JSON',
                data: {
                    "password": pwd,
                    "email": profile.email,
                    "lastName": profile.lastName,
                    "firstName": profile.firstName,
                    "intro": profile.intro
                },
                success: function (data) {
                    if (data) {
                        updateProfile(profile);

                        window.location = "./index.html";
                    } else {
                        console.log("Problem occurred while updating user info.");
                    }
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        } else {
            console.log("Update failed due to password/email format");
        }
    }

    function checkPassword(pwd) {
        if (pwd) {
            if (pwd.length < 8 || pwd.length > 20) {
                alert("Password should be between 8 and 20 characters")
                return -1;
            }
        }
        return 0;
    }

    function updateProfile(profile){
        if(profile.email) localStorage.setItem('email',profile.email);
        if(profile.firstName) localStorage.setItem('firstName',profile.firstName);
        if(profile.lastName) localStorage.setItem('lastName',profile.lastName);
        if(profile.intro) localStorage.setItem('intro',profile.intro);
        
    }
    function deleteUser() {
        $.ajax({
            url: apiUrl + userID,
            type: 'DELETE',
            success: function (data) {

                localStorage.clear();
                window.location = "./index.html";
                 


            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }
    function displayUserProfile() {
        var email = localStorage.getItem('email');
        var firstName = localStorage.getItem('firstName');
        var lastName = localStorage.getItem('lastName');
        var intro = localStorage.getItem('intro');
        if (email) {
            $('#update-email').val(email);
        }
        if (firstName) {
            $('input:text[name="fname"]').val(firstName);
        }
        if (lastName) {
            $('input:text[name="lname"]').val(lastName);
        }
        if (intro) {
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
                emailAddr = $('#update-email').val(),
                intros = $('textarea[name="intro"]').val();
            updateUser(pwd, {
                "firstName": fname, 
                "lastName": lname, 
                "email": emailAddr, 
                "intro": intros
            });

        });
        $('#delete-user-button').on('click', function (e) {
            e.preventDefault();
            var r = confirm("Do you want to delete all of the profile?");
            if (r == true) {
                deleteUser();
                window.location = "./index.html";
            }     

        });
    });

})();