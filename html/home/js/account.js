jQuery(document).ready(function () {
    $(".banner_validated").hide();
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
                $(".mdl-card__supporting-text").addClass("volet_guest")
                $(".banner_error").addClass("volet_guest")
                $(".banner_error").show()
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

const send_user = function(field) {
    let input = $("#form_input_" + field + " input")
    if (input.val() === "" || input.val() === format_date($("#form_" + field).html())) {
        $("#btn_edit_" + field).show()
        $("#btn_save_" + field).hide()
        $("#form_" + field).show()
        $("#form_input_" + field).hide()
        $("#btn_save_" + field).html("Enregistrer")
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
}

