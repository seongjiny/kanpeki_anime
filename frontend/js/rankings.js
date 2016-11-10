(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/animes/";
    var anime;
    var editForm = false;
    // FormsFields will be used when creating the forms

    $(window).on("load",function () {
        $(".list-element").click(
            function (event){
                localStorage.setItem("genre",$(this).attr("id"));
                window.location.href = "rankingslist.html";
        }
    );
        
    });

})();