//frontend login
(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var usersDisplayLocation;
    var users;
    var response;
    var tokenerr;
    //var localtokendata;

    function  logout(){
        console.log(localStorage.getItem('token'));
        localStorage.clear();
    }


    $(document).ready(function () {
        console.log("ready");
        $("#logout-button").click(function(e){
            e.preventDefault();
            console.log("clicked");
           // var uname = $('input:text[name="uname"]').val();
           // var password = $('input:password[name="psw"]').val();
            //verification(uname,password);
            //console.log("hit testtoken");
            //testForToken();
            logout();
            window.location="./login.html";
        });    
        
    });

})();