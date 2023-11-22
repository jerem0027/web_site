jQuery(document).ready(function ($) {
    init();
});

const init = function() {
    $('#loader_connection').css("visibility", "hidden");
    $('.banner').hide();

    // Enregistre elements
    $('.inscription_input_save').change(function () {
        localStorage.setItem($(this)[0].name, $('#' + $(this)[0].name).val());
    });
    
    $('.inscription_input_save').each(function () {
        $('#' + $(this)[0].name).val(localStorage.getItem($(this)[0].name));
    });
    before_pseudo()
}

const send_inscription = async function() {
    if (before_submit_bool && before_pseudo_bool) {
        $('#loader_connection').css("visibility", "visible");
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
                type: 'POST',
                url: "/api/v1/home_user/user/",
                headers: {
                    "APIKEY": sessionStorage.getItem("masterkey"),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "name": $('#name').val(),
                    "first_name": $('#first_name').val(),
                    "pseudo": $('#pseudo_form').val().toLowerCase(),
                    "birthdate": format_date($('#birthdate').val()),
                    "email": $('#email').val(),
                    "password": $('#password1').val()
                }),
                success: function (data) {
                    timer_redirect(10);
                    $('#loader_connection').css("visibility", "hidden");
                    sessionStorage.clear();
                    sessionStorage.setItem("apikey", data.APIKEY);
                    sessionStorage.setItem("pseudo", $('#pseudo_form').val().toLowerCase());
                    $('.banner_validated').addClass("volet-10s").show();
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 10000);
                },
                error: function (data) {
                    $('.banner_error').show().addClass("volet");
                    $('#loader_connection').css("visibility", "hidden");
                    setTimeout(() => {
                        $('.banner_error').hide().removeClass("volet");
                    }, 5000);
                }
            });
        } catch (error) {
            if (400 > error.status || error.status > 499 ) {
                $('.banner_error').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_error').hide().removeClass("volet");
                }, 5000);
            }
        }
    }
}

var before_submit_bool = false
var before_pseudo_bool = false

const before_submit = function () {
    $('#loader_connection').css("visibility", "visible");
    $('.inscription_input').each(function () {
        if (!$(this).val()) {
            $(this).css('borderColor', 'red');
            before_submit_bool = false;
        } else {
            $(this).css('borderColor', 'grey');
        }
    });

    if (check_pattern($('#password1').val())){
        $('#loader_connection').css("visibility", "hidden");
        before_submit_bool = false
        return
    }

    if ($('#password1').val() != $('#password2').val()) {
        $('.not_same_error').css("visibility", "visible").addClass('vibration');
        setTimeout(() => {
            $('.not_same_error').removeClass('vibration');
        }, 1500);
        before_submit_bool =  false;
    } else {
        $('.not_same_error').css("visibility", "hidden");
    }
    $('#loader_connection').css("visibility", "hidden");
    before_submit_bool = true
}

const before_pseudo = async function () {
    if ($('#pseudo_form').val() != "") {
        try {
            await $.ajax({
                type: 'get',
                url: "/api/v1/home_user/user/" + $('#pseudo_form').val(),
                success: function(data) {
                    $('.invalid_input').css("visibility", "visible");
                    $('.invalid_input').addClass('vibration');
                    setTimeout(() => {
                        $('.invalid_input').removeClass('vibration');
                    }, 1500);
                    before_pseudo_bool = false;
                },
                error: function (data, status, xml) {
                    $('.invalid_input').css("visibility", "hidden");
                    before_pseudo_bool = true
                }
            })
            $('#loader_connection').css("visibility", "hidden");
        } catch (error) {
            if (400 > error.status || error.status > 499) {
                $('.banner_error').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_error').hide().removeClass("volet");
                }, 5000);
                before_pseudo_bool = false;
            } else {
                before_pseudo_bool = true;
            }
        }
    }
}
