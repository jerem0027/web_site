jQuery(document).ready(function ($) {
    $('.connection_on').hide();
    connection();
    $.ajax({
        type: 'GET',
        url: '/php/apikey.php',
        dataType: 'json',
        success: function(data) {
            masterkey = data.masterkey;
        }
    });
});

var masterkey = ""

const connection = function () {
    if (sessionStorage.getItem('apikey')) {
        connected_func()
    } else {
        $.ajax({
            type: 'PUT',
            url: "/api/v1/home_user/user/connection",
            headers: {
                "APIKEY": masterkey,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "pseudo": $('#pseudo').val().toLowerCase(),
                "password": $('#password').val()
            }),
            success: function (data) {
                sessionStorage.setItem("apikey", data.APIKEY);
                sessionStorage.setItem('pseudo', data.pseudo);
                connected_func()
            }
        });
    }
}

const connected_func = function(){
    $('.connection_off').hide();
    $('.connection_on').show();
    $('#display_username span').html(
        sessionStorage.getItem('pseudo')
    );
}

const disconnected_func = function() {
    localStorage.clear();
    sessionStorage.clear();
    $('.connection_input').show().val('');
    $('.connection_button').show();
    $('.connection_off').show();
    $('.connection_ok').hide();
    $('#affiche_name').hide();
}
