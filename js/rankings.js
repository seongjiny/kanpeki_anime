(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/animes/";
    var anime;
    var editForm = false;
    // FormsFields will be used when creating the forms
    var formFields = [
        {name: "userName", des: "User Name *", type: "text", required: true},
        {name:"password",des:"Password *",type:"text",required:true}
    ];
    function getAnimes() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    var Allusers;
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


    $(document).ready(function () {
        
        
    });

})();