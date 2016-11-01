(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var users;

    // make ajax call to get all the contacts from api
    function getUsers() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    users = data;
                    displayContacts(users);
                } else {
                    console.log("Users not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    // dynamically display all the contacts from api
    function displayContacts(contacts) {
        var location = $("table.table-bordered>tbody").empty();
        contacts.forEach(function (contact) {
            var $contactRow = $('<tr>').attr('data-contactid', contact._id);
            $contactRow.append(
                "<td>" + (contact.userName || "") + "</td>" +
                "<td>" + (contact.password || "") + "</td>" 
            );
            // append row with contact details to DOM tree
            location.append($contactRow);

            // Save contact to update in local storage
            $contactRow.click(function () {
                contactRowClickHandler(contact);
            });
        });
    }
    //user verification
    function checkUser(userName,email,password){
        var found= false;
        for(var i=0;i<users.length;i++){
            if(users[i].userName==userName){//check for user name
                found=true;
                if(users[i].password==password){
                    console.log("login success");//**TODO refresh page as logged in
                }else{
                    alert("incorrect password");
                    console.log("incorrect password"); 
                }
                i=users.length; //break once user name matches
            }
        }
        if(!found){//no match in username
            console.log("invalid username");
            alert("invalid username");
        }
    }

    $(document).ready(function () {
        // get users from api
        getUsers();

        $('button:submit[name="signup"]').on('click',function(){
            var uname = $('input:text[name="uname"]').val();
            var email = $('input:text[name="email"]').val();
            var password = $('input:password[name="psw"]').val();
            var password2 = $('input:password[name="psw2"]').val();
            // console.log(uname+" "+email+" "+password+" "+password2)
            if(password!=password2){//if password and password2 does not match
                alert("password does not match!");
            }else{
                checkUser(userName,email,password);
            }
            
        });
    });

})();