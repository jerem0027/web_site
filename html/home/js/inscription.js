jQuery(document).ready(function ($) {
    init();
});

// Masterkey api
var masterkey = "";

const init = function() {
    $('.not_same_error').hide();
    $('.pseudo_used').hide();
    $('.connection_ok').hide();
    // Enregistre elements
    $('.inscription_input_save').change(function () {
        localStorage.setItem($(this)[0].name, $('#' + $(this)[0].name).val());
    });
    
    $('.inscription_input_save').each(function () {
        $('#' + $(this)[0].name).val(localStorage.getItem($(this)[0].name));
    });
    $.ajax({
        type: 'GET',
        url: '/php/apikey.php',
        dataType: 'json',
        success: function(data) {
            masterkey = data.masterkey;
        }
    });
}

const send_inscription = function() {
    if (before_submit()) {
        var split = $('#birthdate').val().split('-')
        var date = split[2] + '-' + split[1] + '-' + split[0];
        $.ajax({
            type: 'POST',
            url: "/api/v1/home_user/user/",
            headers: {
                "APIKEY": masterkey,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": $('#name').val(),
                "first_name": $('#first_name').val(),
                "pseudo": $('#pseudo_form').val(),
                "birthdate": date,
                "email": $('#email').val(),
                "password": $('#password1').val()
            }),
            success: function (data) {
                sessionStorage.setItem("apikey", data.APIKEY);
                console.log(data)
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
}

const before_submit = function () {
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
            url: "/api/v1/home_user/user/" + $('#pseudo_form').val(),
            complete: function (data, status, xml) {
            if (data.status == 200) {
                $('.pseudo_used').css('display', 'initial');
                $('.pseudo_used').addClass('vibration');
                setTimeout(() => {
                    $('.invalid_pattern_error').removeClass('vibration');
                }, 1500);
                check_all = false;
            } else {
                $('.pseudo_used').css('display', 'none');
            }
            },
        });
    }

    regex_pattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:;"'<>,.?\\]).*$/;
    if (!regex_pattern.test($('#password1').val())) {
        $('.invalid_pattern_error').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('.invalid_pattern_error').removeClass('vibration');
        }, 1500);
        return false;
    } else {
        $('.invalid_pattern_error').css('color', 'limegreen');
    }

    if ($('#password1').val() != $('#password2').val()) {
        $('.not_same_error').css('display', 'initial').addClass('vibration');
        setTimeout(() => {
        $('.not_same_error').removeClass('vibration');
        }, 1500);
        return false;
    } else {
        $('.not_same_error').css('display', 'none');
    }
    return check_all;
}


function rien() {
    console.log("nothing happend !")
}