jQuery(function() {
    $('.showcreds').on("click", function() {
        const id = $(this)[0].id.replace('-', "");
        if ($('#' + id).attr("type") === "text") {
            $('#' + id).attr("type", "password");
            $(this).text("visibility")
        }
        else {
            $('#' + id).attr("type", "text");
            $(this).text("visibility_off")
        }
    });

    $('.not_same_error, .not_same_as_old').css("visibility", "hidden");
    $('.invalid_input').css("visibility", "hidden");

});


const pattern_email = function(value) {
    pattern=/^[a-zA-Z0-9][a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,15}$/;
    return pattern.test(value);
}

const pattern_min = function(value) {
    pattern = /[a-z]/;
    return pattern.test(value);
}
const pattern_maj = function(value) {
    pattern = /[A-Z]/;
    return pattern.test(value);
}
const pattern_dig = function(value) {
    pattern = /^(?=.*\d).*$/;
    return pattern.test(value);
}
const pattern_spe = function(value) {
    pattern = /^(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:;"'<>,.?\\/]).*$/;
    return pattern.test(value);
}

const check_pattern = function(value) {
    var tests = false;

    if (!pattern_min(value)) {
        $('#pattern_min').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_min').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_min').css('color', 'limegreen');
    }

    if (!pattern_maj(value)) {
        $('#pattern_maj').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_maj').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_maj').css('color', 'limegreen');
    }

    if (!pattern_dig(value)) {
        $('#pattern_dig').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_dig').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_dig').css('color', 'limegreen');
    }

    if (!pattern_spe(value)) {
        $('#pattern_spe').css('color', 'red').addClass('vibration');
        setTimeout(() => {
        $('#pattern_spe').removeClass('vibration');
        }, 1500);
        tests = true;
    } else {
        $('#pattern_spe').css('color', 'limegreen');
    }
    return tests;
}