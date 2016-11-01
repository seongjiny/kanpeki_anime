(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var usersDisplayLocation;
    var Allusers;

    // make ajax call to get all the users from api
    function getUsers() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    Allusers = data;
                    displayUsers(Allusers);
                } else {
                    console.log("User not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    // dynamically display all the users from api
    function displayUsers(users) {
        usersDisplayLocation = $("table.table-bordered>tbody").empty();
        users.forEach(function (user) {
            var $userRow = $('<tr>').attr('data-userid', user._id);
            $userRow.append(
                "<td>" + (user.userName || "") + "</td>" +
                "<td>" + (user.password || "") + "</td>" 
            );
            // append row with user details to DOM tree
            usersDisplayLocation.append($userRow);

        });
    }

    $(document).ready(function () {
        // get users from api
        getUsers();
    });

})();