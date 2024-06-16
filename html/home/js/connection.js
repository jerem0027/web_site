jQuery(function() {
    $('#loader_connection').css("visibility", "hidden");
    $('.connection_on').hide();
    $('#btn_connection_page').on("click", connection_page);

    $("#pseudo").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection").trigger("click");
        }
    });

    $("#password").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection").trigger("click");
        }
    });

    $("#pseudo_form_connection").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection_page").trigger("click");
        }
    });

    $("#password_form_connection").on("keydown", function(event) {
        if (event.key === "Enter" || event.key === 13) {
            $("#btn_connection_page").trigger("click");
        }
    });

    if (test)
        return;
    if (sessionStorage.getItem('apikey'))
        connected_func();
    else
        disconnected_func();
});

const set_masterkey = async function () {
    try {
        const data = await new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/php/apikey.php',
                dataType: 'json',
                success: function(data) {
                    if (data.MASTERKEY != null) {
                        sessionStorage.setItem("masterkey", data.MASTERKEY);
                        resolve(data);
                    } else {
                        reject({ message: "ERROR: API is not responding", status: 400 });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject({ message: "ERROR: API request failed", status: jqXHR.status });
                }
            });
        });
    } catch (error) {
        const myerror = new Error(error.message);
        myerror.status = error.status;
        throw myerror;
    }
}

const connection = async function(pseudo, pass) {
    var from_page = true;
    if (pseudo == null && pass == null) {
        pseudo=$('#pseudo').val().toLowerCase();
        pass=$('#password').val();
        from_page = false;
    }
    $('#loader_connection').css("visibility", "visible");
    if (sessionStorage.getItem('apikey')) {
        connected_func();
    } else {
        try {
            await set_masterkey();
            await $.ajax({
                type: 'PUT',
                url: `${api_url}/api/v1/identity/connection/`,
                headers: {
                    "APIKEY": sessionStorage.getItem("masterkey"),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "pseudo": pseudo,
                    "password": pass
                }),
                success: function(data) {
                    sessionStorage.clear();
                    sessionStorage.setItem("apikey", data.APIKEY);
                    sessionStorage.setItem('pseudo', data.pseudo);
                    connected_func();
                    $('#loader_connection').css("visibility", "hidden");
                },
                error: function(data) {
                    sessionStorage.clear();
                    $('#loader_connection').css("visibility", "hidden");
                    if (from_page == true)
                        $('.input_connection_page').addClass("vibration_input");
                    else
                        $('.connection_input').addClass("vibration_input");
                    setTimeout(() => {
                        $('.input_connection_page').removeClass("vibration_input");
                        $('.connection_input').removeClass("vibration_input");
                    }, 3000);
                }
            });
        } catch (error) {
            if (400 >= error.status || error.status > 499) {
                sessionStorage.clear();
                $('#loader_connection').css("visibility", "hidden");
                if (from_page)
                    $('.input_connection_page').addClass("vibration_input");
                else
                    $('.connection_input').addClass("vibration_input");
                setTimeout(() => {
                    $('.input_connection_page, .connection_input').removeClass("vibration_input");
                }, 3000);
            }
        }
    }
}

const disconnected_pages = ["inscription", "connection"];
const connected_pages = ["account", "manage", "create"];

const connected_func = function(){
    for(var i=0; i < disconnected_pages.length; i++) {
        if (window.location.pathname.endsWith(disconnected_pages[i]+".html"))
            window.location.href = "./index.html";
    }
    $('.connection_off').hide();
    $('.connection_on').show();
    $(".connection_on_keep").removeClass("sesa_hatched");
    $('#display_username').html(sessionStorage.getItem('pseudo'));
    $('#loader_connection').css("visibility", "hidden");
}

const disconnected_func = function() {
    localStorage.clear();
    sessionStorage.clear();
    return new Promise((resolve, reject) => {
        $('#loader_connection').css("visibility", "visible");
        for(var i=0; i < connected_pages.length; i++) {
            if (window.location.pathname.endsWith(connected_pages[i]+".html")) {
                window.location.href = "./index.html";
            }
        }
        $('.connection_input').removeAttr("style").val('');
        $('.connection_button').removeAttr("style");
        $('.connection_off').removeAttr("style");
        $('.connection_on').hide();
        $('.connection_input').removeClass("vibration_input");
        $('#loader_connection').css("visibility", "hidden");
        $(".connection_on_keep").addClass("sesa_hatched");
    });
}

const format_date = function(date){
    date = date.split('-');
    return date[2] + '-' + date[1] + '-' + date[0];
}

const connection_page = function() {
    let pseudo = $('#pseudo_form_connection').val().toLowerCase();
    let pass = $('#password_form_connection').val();
    connection(pseudo, pass);
}

const timer_redirect = function(cpt) {
    var time = setInterval(function(){
        cpt--;
        $("#timer_inscription").text(cpt.toString());
        if (cpt === 0)
            clearInterval(time);
    }, 1000);
}