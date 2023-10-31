jQuery(document).ready(function ($) {
    $('#loader_connection').css("visibility", "hidden");
    $('.connection_on').hide();
    if (sessionStorage.getItem('apikey')) {
        connected_func()
    }

    document.getElementById("pseudo").addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            document.getElementById("btn_connection").click();
        }
    });
    document.getElementById("password").addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            document.getElementById("btn_connection").click();
        }
    });
});

const connection = async function () {
    $('#loader_connection').css("visibility", "visible");
    if (sessionStorage.getItem('apikey')) {
        connected_func()
    } else {
        try {
            await $.ajax({
                type: 'GET',
                url: '/php/apikey.php',
                dataType: 'json',
                success: function(data) {
                    sessionStorage.setItem("masterkey", data.masterkey);
                }
            });
            await $.ajax({
                type: 'PUT',
                url: "/api/v1/identity/connection/",
                headers: {
                    "APIKEY": sessionStorage.getItem("masterkey"),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "pseudo": $('#pseudo').val().toLowerCase(),
                    "password": $('#password').val()
                }),
                success: function (data) {
                    sessionStorage.clear();
                    sessionStorage.setItem("apikey", data.APIKEY);
                    sessionStorage.setItem('pseudo', data.pseudo);
                    connected_func()
                },
                error: function(data) {
                    sessionStorage.clear();
                    $('#loader_connection').css("visibility", "hidden");
                    $('.connection_input').addClass("vibration_input");
                }
            });
        } catch (error) {
            if (400 > error.status || error.status > 499) {
                sessionStorage.clear();
                $('#loader_connection').css("visibility", "hidden");
                $('.connection_input').addClass("vibration_input");
            }
        }
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
    return new Promise((resolve, reject) => {
        $('#loader_connection').css("visibility", "visible");
        setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            $('.connection_input').removeAttr("style").val('');
            $('.connection_button').removeAttr("style");
            $('.connection_off').removeAttr("style");
            $('.connection_on').hide();
            $('.connection_input').removeClass("vibration_input")
            $('#loader_connection').css("visibility", "hidden");
        }, 1000);
    });
}

const format_date = function(date){
    date = date.split('-')
    return date[2] + '-' + date[1] + '-' + date[0];
}