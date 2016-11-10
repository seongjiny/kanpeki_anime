(function () {
    

    $(document).ready(function () {
        var fname=localStorage.getItem('firstName');
        var lname=localStorage.getItem('lastName');
        if(fname&&lname){
            $('#username').html(localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')+"'s");
        }else{
            $('#username').html(localStorage.getItem('username')+"'s");
        }
        
    });

})();