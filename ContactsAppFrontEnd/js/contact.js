(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/contacts/";
    var contact;
    var editForm = false;
    // FormsFields will be used when creating the forms
    var formFields = [
        { name: "firstName", des: "First Name *", type: "text", required: true },
        { name: "lastName", des: "Last Name *", type: "text", required: true },
        { name: "email", des: "Email", type: "email", required: false },
        { name: "homePhone", des: "Home Phone", type: "tel", required: false },
        { name: "cellPhone", des: "Cell Phone", type: "tel", required: false },
        { name: "birthDay", des: "Birth Day", type: "date", required: false },
        { name: "website", des: "wWbsite", type: "url", required: false },
        { name: "address", des: "Address", type: "text", required: false }
    ];

    // Load contact from browser session storage
    function loadContact() {
        var error = false;
        var contactToUpdateString;
        try {
            contactToUpdateString = sessionStorage.getItem("contactToUpdate");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            contact = JSON.parse(contactToUpdateString);
            $('#contactName').text(contact.firstName + " " + contact.lastName);
        }
    }

    // Update contact and display name on input change
    function inputHandler(property, value) {
        console.log(value);
        contact[property] = value;
        $('#contactName').text((contact.firstName || " ") + " " + (contact.lastName || " "));
    }

    // Add update button and delete button
    function addUpdateAndDeleteButtons(formElement) {
        formElement.append('<button type="submit" id="update-contact-button"> Update Contact </button>');
        $('#update-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            saveContact();
        });

        formElement.append('<button type="submit" id="delete-contact-button"> Delete Contact </button>');
        $('#delete-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            deleteContact();
        });
    }

    // Add create new contact button
    function addNewButton(formElement) {
        formElement.append('<button type="submit" id="new-contact-button"> Create New Contact </button>');
        $('#new-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            createContact();
        });
    }

    // populate the contact form with the necessary fields
    function createForm() {
        var formElement = $("[name='contactForm']").empty();
        // Add form elements and their event listeners
        formFields.forEach(function (formField) {
            var labelElement = $("<label>")
                .attr("for", formField.name)
                .text(formField.des);
            formElement.append(labelElement);
            var inputElement = $("<input>")
                .attr("type", formField.type)
                .attr("name", formField.name)
                .attr("value", (contact[formField.name] || ""));
            if (formField.required) {
                inputElement.prop("required", true).attr("aria-required", "true");
            }
            if (formField.type == "date"){
                inputElement.get(0).valueAsDate = new Date(contact[formField.name]);
            }
            formElement.append(inputElement);
            inputElement.on('input', function () {
                var thisField = $(this);
                inputHandler(formField.name, thisField.val());
            });
            // clear the horizontal and vertical space next to the 
            // previous element
            formElement.append('<div style="clear:both"></div>');
        });
        if (editForm) {
            addUpdateAndDeleteButtons(formElement);
        } else {
            addNewButton(formElement);
        }

    }

    // make ajax call to update this contact
    function saveContact() {
        $.ajax({
            url: apiUrl+contact._id+"/",
            type: 'PUT',
            dataType: 'JSON',
            data: contact,
            success: function (data) {
                if (data) {
                    window.location.href = "./index.html";
                } else {
                    console.log("Could not update the contact");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            },
            complete: function(){return;}
        });
        return;
    }

    // make ajax call to add new contact to db
    function createContact() {
        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'JSON',
            data: contact,
            success: function (data) {
                if (data) {
                    window.location.href = "./index.html";
                } else {
                    console.log("Could not create new contact");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return;
    }

    // make ajax call to delete this contact
    function deleteContact() {
        $.ajax({
            url: apiUrl+contact._id+"/",
            type: 'DELETE',
            success: function (data) {
                window.location.href = "./index.html";
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            },
            complete: function(){return;}
        });
        return;
    }

    $(document).ready(function () {
        //load contact data from browser storage if editing contact
        if (window.location.pathname.indexOf('update.html') > -1) {
            editForm = true;
            loadContact();
        } else {
            contact = {};
        }
        createForm();
    });

})();