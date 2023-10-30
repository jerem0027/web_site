jQuery(document).ready(function () {
    $('.showcreds').click(function () {
        const id = $(this)[0].id.replace('-', "")
        if ($('#' + id).attr("type") === "text")
            $('#' + id).attr("type", "password");
        else
            $('#' + id).attr("type", "text");
    });

    $('.not_same_error, .not_same_as_old').css("visibility", "hidden");
    $('.invalid_input').css("visibility", "hidden");

});

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