(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/";
    var contactsDisplayLocation;
    var users;

    // make ajax call to get all the contacts from api
    function getContacts() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    users = data;
                    displayContacts(users);
                } else {
                    console.log("Contact not Found");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    // save contact to update in browser storage and go to update page
    function contactRowClickHandler(contact) {
        var error = false;
        function contactWithID(thiscontact) {
            return thiscontact._id === contact._id;
        }
        var contactToUpdate = users.filter(contactWithID)[0];
        try {
            var contactToUpdateString = JSON.stringify(contactToUpdate);
            sessionStorage.setItem("contactToUpdate", contactToUpdateString);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        }
        if (!error) {
            window.location = "update.html";
            return false;
        }
    }

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

    $(document).ready(function () {
        // get contacts from api
        getContacts();
    });

})();