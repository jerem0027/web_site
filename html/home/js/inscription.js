jQuery(document).ready(function ($) {
    init();
});

const init = function() {
    $('.not_same_error').css("visibility", "hidden");
    $('.invalid_input').css("visibility", "hidden");
    $('#loader_connection').css("visibility", "hidden");
    $('.banner').hide();

    // Enregistre elements
    $('.inscription_input_save').change(function () {
        localStorage.setItem($(this)[0].name, $('#' + $(this)[0].name).val());
    });
    
    $('.inscription_input_save').each(function () {
        $('#' + $(this)[0].name).val(localStorage.getItem($(this)[0].name));
    });

    $('.showcreds').click(function () {
        const id = $(this)[0].id.replace('-', "")
        if ($('#' + id).attr("type") === "text")
            $('#' + id).attr("type", "password");
        else
            $('#' + id).attr("type", "text");
    });
}

const send_inscription = function() {
    if (before_submit()) {
        $('#loader_connection').css("visibility", "visible");
        $.ajax({
            type: 'GET',
            url: '/php/apikey.php',
            dataType: 'json',
            success: function(data) {
                sessionStorage.setItem("masterkey", data.masterkey);
            }
        });
        setTimeout(() => {
            $.ajax({
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
                    $('#loader_connection').css("visibility", "hidden");
                    sessionStorage.clear();
                    sessionStorage.setItem("apikey", data.APIKEY);
                    sessionStorage.setItem("pseudo", $('#pseudo_form').val().toLowerCase());
                    $('.banner_validated').addClass("volet_inscription").show()
                    $('#content_inscription').addClass("volet_inscription")
                    timer_redirect()
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 10000);
                },
                error: function (data) {
                    // TODO: ajouter banner error
                    $('#loader_connection').css("visibility", "hidden");
                    console.log(data)
                }
            });
        }, 1000);
    }
}

const before_submit = function () {
    $('#loader_connection').css("visibility", "visible");
    var check_all = true;
    $('.inscription_input').each(function () {
        if (!$(this).val()) {
            $(this).css('borderColor', 'red');
            check_all = false;
        } else {
            $(this).css('borderColor', 'grey');
        }
    });

    if ($('#pseudo_form').val() != "") {
        $.ajax({
            type: 'get',
            url: "https://jeremiehenrion.serveblog.net/api/v1/home_user/user/" + $('#pseudo_form').val(),
            complete: function (data, status, xml) {
                if (data.status == 200) {
                    $('.invalid_input').css("visibility", "visible");
                    $('.invalid_input').addClass('vibration');
                    setTimeout(() => {
                        $('.invalid_input').removeClass('vibration');
                    }, 1500);
                    check_all = false;
                } else {
                    $('.invalid_input').css("visibility", "hidden");
                }
            },
        });
    }

    if (check_pattern($('#password1').val())){
        $('#loader_connection').css("visibility", "hidden");
        return false
    }

    if ($('#password1').val() != $('#password2').val()) {
        $('.not_same_error').css("visibility", "visible").addClass('vibration');
        setTimeout(() => {
            $('.not_same_error').removeClass('vibration');
        }, 1500);
        check_all =  false;
    } else {
        $('.not_same_error').css("visibility", "hidden");
    }
    $('#loader_connection').css("visibility", "hidden");
    return check_all;
}

const timer_redirect = function() {
    var cpt = 10
    var time = setInterval(function(){
        cpt--;
        $("#timer_inscription").text(cpt.toString());
        if (cpt === 0)
            clearInterval(time)
    }, 1000)
}

const check_pattern = function(value) {
    var tests = false

    pattern_min = /[a-z]/;
    if (!pattern_min.test(value)) {
        $('#pattern_min').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_min').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_min').css('color', 'limegreen');
    }

    pattern_maj = /[A-Z]/;
    if (!pattern_maj.test(value)) {
        $('#pattern_maj').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_maj').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_maj').css('color', 'limegreen');
    }

    pattern_dig = /^(?=.*\d).*$/;
    if (!pattern_dig.test(value)) {
        $('#pattern_dig').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_dig').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_dig').css('color', 'limegreen');
    }

    pattern_spe = /^(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:;"'<>,.?\\/]).*$/;
    if (!pattern_spe.test(value)) {
        $('#pattern_spe').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_spe').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_spe').css('color', 'limegreen');
    }
    return tests
}