jQuery(document).ready(function () {
    $(".banner_validated").hide();
    $(".banner_error").hide();
    $(".user_input").hide();
    $(".btn_save_user").hide();
    $(".invalid_input").css("visibility", "hidden");
    user_check();
});

const user_check = function() {
    $('#loader_connection').css("visibility", "visible");

    $.ajax({
        type: 'get',
        url: '/api/v1/home_user/user/',
        headers: {
            "APIKEY": sessionStorage.getItem("apikey"),
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        dataType: 'json',
        success: function (data) {
            setTimeout(() => {
                $('#form_pseudo').html(data.pseudo)
                $('#form_inscription_date').html(format_date(data.inscription_date))
                $('#form_name').html(data.name);
                $('#form_first_name').html(data.first_name);
                $('#form_email').html(data.email);
                $('#form_birthdate').html(format_date(data.birthdate));
                $('#loader_connection').css("visibility", "hidden");
            }, '1000');
        },
        error: function (data) {
            setTimeout(() => {
                $('#loader_connection').css("visibility", "hidden");
            }, '1000');
        },
    });
}

const edit_user = function(field){
    $("#btn_edit_" + field).hide()
    $("#btn_save_" + field).show()

    $("#form_" + field).hide()
    $("#form_input_" + field).show()
    let input = $("#form_input_" + field + " input")
    input.focus()
    if (input.attr("type") === "date")
        input.val(format_date($("#form_" + field).html()))
    else
        input.attr("placeholder", $("#form_" + field).html())
    check_field(field)
}

const check_field = function(field) {
    let input = $("#form_input_" + field + " input")

    if (input.val() === "" || input.val() === format_date($("#form_" + field).html())) {
        $("#btn_save_" + field).addClass("btn_cancel_user")
        $("#btn_save_" + field).removeClass("btn_save_user")
        $("#btn_save_" + field).html("Annuler")
        return
    }

    $("#btn_save_" + field).removeClass("btn_cancel_user")
    $("#btn_save_" + field).addClass("btn_save_user")
    $("#btn_save_" + field).html("Enregistrer")
}

const send_user = async function(field) {
    $('#loader_connection').css("visibility", "visible");
    let input = $("#form_input_" + field + " input")
    if (input.val() === "" || input.val() === format_date($("#form_" + field).html())) {
        $("#btn_edit_" + field).show()
        $("#btn_save_" + field).hide()
        $("#form_" + field).show()
        $("#form_input_" + field).hide()
        $("#btn_save_" + field).html("Enregistrer")
        $('#loader_connection').css("visibility", "hidden");
        return
    }

    if (field == 'email') {
        pattern = /^[a-z][-a-z_0-9.]+@[a-z-.]+$/;
        if (!pattern.test(input.val())) {
            $('.invalid_input').css("visibility", "visible").addClass('vibration');
            setTimeout(() => {
                $('.invalid_input').removeClass('vibration');
            }, 1500);
        }
    }

    data_send = {}
    data_send[field] = "" + $("#" + field + "_user").val()
    if (field == 'birthdate')
        data_send[field] = format_date(data_send[field])

    await $.ajax({
        type: 'put',
        url: '/api/v1/home_user/user/',
        headers: {
            "APIKEY": sessionStorage.getItem("apikey"),
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data_send),
        dataType: 'json',
        success: function (data) {
            user_check();
            $("#btn_edit_" + field).show();
            $("#btn_save_" + field).hide();
            $("#form_" + field).show();
            $("#form_input_" + field).hide();
            $("#btn_save_" + field).html("Enregistrer");
            $('.banner_validated').show().addClass("volet");
            $('#loader_connection').css("visibility", "hidden");
            setTimeout(() => {
                $('.banner_validated').hide().removeClass("volet");
            }, 5000);
        },
        error: function (data) {
            $('.banner_error').show().addClass("volet");
            $('#loader_connection').css("visibility", "hidden");
            setTimeout(() => {
                $('.banner_error').hide().removeClass("volet");
            }, 5000);
        },
    });
}

var before_submit_bool = false
var before_pass_bool = false

const before_pass = async function () {
    old_pass_val = $('#password0').val()
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
                "pseudo": sessionStorage.getItem("pseudo"),
                "password": old_pass_val
            }),
            success: function (data) {
                sessionStorage.removeItem("masterkey");
                $('.not_same_as_old').css("visibility", "hidden")
                before_pass_bool = true
            },
            error: function(data) {
                sessionStorage.removeItem("masterkey");
                $('.not_same_as_old').css("visibility", "visible").addClass('vibration');
                $('.not_same_as_old').removeClass('vibration');
                before_pass_bool = false
            }
        });
    } catch (erreur) {
        if (400 > error.status || error.status > 499 ) {
            sessionStorage.removeItem("masterkey");
            $('.banner_error').show().addClass("volet");
            $('#loader_connection').css("visibility", "hidden");
            setTimeout(() => {
                $('.banner_error').hide().removeClass("volet");
            }, 5000);
        }
        before_pass_bool = false
    }
}

const before_submit = async function () {
    if (check_pattern($('#password1').val())){
        $('#loader_connection').css("visibility", "hidden");
        before_submit_bool = false
    }

    if ($('#password1').val() != $('#password2').val()) {
        $('.not_same_error').css("visibility", "visible").addClass('vibration');
        setTimeout(() => {
            $('.not_same_error').removeClass('vibration');
        }, 1500);
        before_submit_bool = false
    } else {
        $('.not_same_error').css("visibility", "hidden");
    }
    $('#loader_connection').css("visibility", "hidden");
    before_submit_bool =  true;
}

const send_password = async function() {
    if (before_submit_bool && before_pass_bool) {
        $('#loader_connection').css("visibility", "visible");
        await $.ajax({
            type: 'PUT',
            url: "/api/v1/home_user/user/password/",
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "password": $('#password1').val()
            }),
            success: function (data) {
                console.log(data)
                $('#password1').val("")
                $('#password2').val("")
                $('.banner_validated').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_validated').hide().removeClass("volet");
                }, 5000);
            },
            error: function (data) {
                $('.banner_error').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_error').hide().removeClass("volet");
                }, 5000);
            }
        });
    }
}