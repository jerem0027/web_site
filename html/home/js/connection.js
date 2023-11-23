jQuery(function ($) {
    $('#loader_connection').css("visibility", "hidden");
    $('.connection_on').hide();
    $('#btn_connection_page').on("click", connection_page);
    if (sessionStorage.getItem('apikey')) {
        connected_func();
    }

    $("#pseudo").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection").click();
        }
    })

    $("#password").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection").click();
        }
    })

    $("#pseudo_form_connection").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection_page").click();
        }
    })

    $("#password_form_connection").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection_page").click();
        }
    })
});

const disconnected_pages = ["inscription", "connection"]

const connection = async function (pseudo, pass) {
    var from_page = true
    if (pseudo == null && pass == null) {
        pseudo=$('#pseudo').val().toLowerCase();
        pass=$('#password').val();
        from_page = false
    }
    $('#loader_connection').css("visibility", "visible");
    if (sessionStorage.getItem('apikey')) {
        connected_func();
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
                    "pseudo": pseudo,
                    "password": pass
                }),
                success: function (data) {
                    sessionStorage.clear();
                    sessionStorage.setItem("apikey", data.APIKEY);
                    sessionStorage.setItem('pseudo', data.pseudo);
                    connected_func();
                    setTimeout(() => {
                        $('#loader_connection').css("visibility", "hidden");
                        for(var i; i < disconnected_pages.length; i++) {
                            if (window.location.href.endsWith(disconnected_pages[i]+".html"));
                                window.location.href = "../";
                        }
                    }, 1000)
                },
                error: function(data) {
                    sessionStorage.clear();
                    $('#loader_connection').css("visibility", "hidden");
                    if (from_page == true)
                        $('.input_connection_page').addClass("vibration_input");
                    else
                        $('.connection_input').addClass("vibration_input");
                }
            });
        } catch (error) {
            if (400 > error.status || error.status > 499) {
                sessionStorage.clear();
                $('#loader_connection').css("visibility", "hidden");
                if (from_page)
                    $('.input_connection_page').addClass("vibration_input");
                else
                    $('.connection_input').addClass("vibration_input");
            }
        }
    }
}

const connected_func = function(){
    $('.connection_off').hide();
    $('.connection_on').show();
    $(".connection_on_keep").removeClass("sesa_hatched");
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

const connection_page = function() {
    let pseudo = $('#pseudo_form_connection').val().toLowerCase();
    let pass = $('#password_form_connection').val();
    connection(pseudo, pass)
}

const timer_redirect = function(cpt) {
    var time = setInterval(function(){
        cpt--;
        $("#timer_inscription").text(cpt.toString());
        if (cpt === 0)
            clearInterval(time)
    }, 1000)
}