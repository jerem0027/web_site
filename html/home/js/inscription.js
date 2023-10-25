jQuery(document).ready(function ($) {
    init();
});

// Masterkey api
var masterkey = "";

const init = function() {
    $('.not_same_error').css('color', 'white');
    $('.pseudo_used').css('color', 'white')
    $('.connection_ok').css('color', 'white');
    $('#inscription_validated').hide();

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
            error: function (data) {
                sessionStorage.setItem("apikey", data.APIKEY);
                $('#inscription_validated').addClass("volet").show()
                timer_redirect()
                setTimeout(() => {
                    window.location.href = "/";
                }, 10000);
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
                $('.pseudo_used').css('color', 'red');
                $('.pseudo_used').addClass('vibration');
                setTimeout(() => {
                    $('.pseudo_used').removeClass('vibration');
                }, 1500);
                check_all = false;
            } else {
                $('.pseudo_used').css('color', 'white');
            }
            },
        });
    }

    if (check_pattern($('#password1').val())){
        return false
    }

    if ($('#password1').val() != $('#password2').val()) {
        $('.not_same_error').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('.not_same_error').removeClass('vibration');
        }, 1500);
        return false;
    } else {
        $('.not_same_error').css('color', 'white');
    }
    return check_all;
}

function timer_redirect() {
    var cpt = 10
    var time = setInterval(function(){
        cpt--;
        $("#timer_inscription").text(cpt.toString());
        if (cpt === 0)
            clearInterval(time)
    }, 1000)
}
function  check_pattern(value) {
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