jQuery(document).ready(function ($) {
    $('#loader_connection').css("visibility", "hidden");
    $('.connection_on').hide();
    if (sessionStorage.getItem('apikey'))
        connected_func()
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
    $('#loader_connection').css("visibility", "visible");
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
            },
            error: function(data) {
                $('#loader_connection').css("visibility", "hidden");
                $('.connection_input').addClass("vibration_input");
            }

        });
    }
}

const connected_func = function(){
    $('.connection_off').hide();
    $('.connection_on').show();
    $('#display_username').html(
        sessionStorage.getItem('pseudo')
    );
    $('#loader_connection').css("visibility", "hidden");
}

const disconnected_func = function() {
    $('#loader_connection').css("visibility", "visible");
    setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        $('.connection_input').show().val('');
        $('.connection_button').show();
        $('.connection_off').show();
        $('.connection_on').hide();
        $('.connection_input').removeClass("vibration_input")
        $('#loader_connection').css("visibility", "hidden");
    }, 1500);
}
