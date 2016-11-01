(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var contactsDisplayLocation;
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

    // save contact to update in browser storage and go to update page
    // function contactRowClickHandler(contact) {
    //     var error = false;
    //     function contactWithID(thiscontact) {
    //         return thiscontact._id === contact._id;
    //     }
    //     var contactToUpdate = users.filter(contactWithID)[0];
    //     try {
    //         var contactToUpdateString = JSON.stringify(contactToUpdate);
    //         sessionStorage.setItem("contactToUpdate", contactToUpdateString);
    //     } catch (e) {
    //         alert("Error when writing to Session Storage " + e);
    //         error = true;
    //     }
    //     if (!error) {
    //         window.location = "update.html";
    //         return false;
    //     }
    // }

    // dynamically display all the contacts from api
    function displayContacts(contacts) {
        contactsDisplayLocation = $("table.table-bordered>tbody").empty();
        contacts.forEach(function (contact) {
            var $contactRow = $('<tr>').attr('data-contactid', contact._id);
            $contactRow.append(
                "<td>" + (contact.userName || "") + "</td>" +
                "<td>" + (contact.password || "") + "</td>"
            );
            // append row with contact details to DOM tree
            contactsDisplayLocation.append($contactRow);

            // Save contact to update in local storage
            $contactRow.click(function () {
                contactRowClickHandler(contact);
            });
        });
    }
    //user verification
    function checkUser(userName,password){
        var found= false;
        for(var i=0;i<users.length;i++){
            if(users[i].userName==userName){//check for user name
                found=true;
                if(users[i].password==password){
                    // window.location.replace("index.html");
                    alert("login success");
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
        // get contacts from api
        getUsers();

        $('button:submit[name="login"]').on('click',function(){
            var uname = $('input:text[name="uname"]').val();
            var password = $('input:password[name="psw"]').val();
            checkUser(uname,password);
        });
    });

})();