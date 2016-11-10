(function () {
    




    $(document).ready(function () {
        var fname=localStorage.getItem('firstName');
        var lname=localStorage.getItem('lastName');
        if(fname&&lname){
            $('#username').text(localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')+"'s");
        }else{
            $('#username').text(localStorage.getItem('username')+"'s");
        }
        getLists(localStorage.getItem("genre"));
    });

})();