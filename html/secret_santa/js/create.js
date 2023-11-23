jQuery(function () {
    $('.banner').hide();
    setup_guest();
    default_content();
    $("#div_button_add_guest").on("click", add_guest)
    $("#div_button_create").on("click", send_secret_santa)
});

const default_content = async function() {
    $('#loader_connection').css("visibility", "visible");
    $("#sesa_end_date").val(new Date().getFullYear() + "-12-25")
    try {
        await $.ajax({
            type: 'get',
            url: '/api/v1/home_user/user/',
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function (data) {
                $('#guest_1_name').val(data.content.first_name + " " + data.content.name[0] + ".")
                $('#guest_1_email').val(data.content.email)
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function (data) {
                $('.banner_error').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_error').hide().removeClass("volet");
                }, 5000);
            },
        });
    } catch (error) {
        if (400 > error.status || error.status > 499) {
            $('.banner_error').show().addClass("volet");
            $('#loader_connection').css("visibility", "hidden");
            setTimeout(() => {
                $('.banner_error').hide().removeClass("volet");
            }, 5000);
        }
    }
}

var guest_cpt = 0
const setup_guest = function () {
    content_block = $("#guests_content");
    var final_block = ""
    for (guest_cpt=1; guest_cpt<=3; guest_cpt++) {
        final_block += `
        <div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--11-col element_${guest_cpt} sesa_guest_title">Guest ${guest_cpt}</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--9-col element_${guest_cpt} sesa_guest_element">Nom</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--8-col element_${guest_cpt}">
            <input
                class="mdl-textfield__input element_${guest_cpt} sesa_create_input"
                type="text"
                id="guest_${guest_cpt}_name"
                name="guest_${guest_cpt}_name"
                placeholder="Peter P."
            />
        </div><div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--9-col element_${guest_cpt} sesa_guest_element">Email</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--8-col element_${guest_cpt}">
            <input
                class="mdl-textfield__input element_${guest_cpt} sesa_create_input"
                type="text"
                id="guest_${guest_cpt}_email"
                name="guest_${guest_cpt}_email"
                placeholder="peter.parker@gmail.com"
            />
        </div><div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div>
        <div class="mdl-cell--12-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--12-col element_${guest_cpt}">&nbsp;</div>
        `;
    }
    content_block.html(final_block);
}

const add_guest = function () {
    content_block = $("#guests_content")
    content_block.append(`
        <div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--11-col element_${guest_cpt} sesa_guest_title">Guest ${guest_cpt}
            <i id="remove_guest_${guest_cpt}_button" onclick="remove_guest(${guest_cpt})" class="material-icons element_${guest_cpt} remove_guest_button">remove</i></div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--9-col element_${guest_cpt} sesa_guest_element">Nom</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--8-col element_${guest_cpt}">
            <input
                class="mdl-textfield__input element_${guest_cpt} sesa_create_input"
                type="text"
                id="guest_${guest_cpt}_name"
                name="guest_${guest_cpt}_name"
                placeholder="Peter P."
            />
        </div><div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--9-col element_${guest_cpt} sesa_guest_element">Email</div>
        <div class="mdl-cell--3-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--8-col element_${guest_cpt}">
            <input
                class="mdl-textfield__input element_${guest_cpt} sesa_create_input"
                type="text"
                id="guest_${guest_cpt}_email"
                name="guest_${guest_cpt}_email"
                placeholder="peter.parker@gmail.com"
            />
        </div><div class="mdl-cell--1-col element_${guest_cpt}">&nbsp;</div>
        <div class="mdl-cell--12-col element_${guest_cpt}">&nbsp;</div><div class="mdl-cell--12-col element_${guest_cpt}">&nbsp;</div>
    `);
    $("#remove_guest_" + (guest_cpt - 1) + "_button").hide();
    guest_cpt+=1
}

const remove_guest = function (id) {
    $(".element_" + id).remove();
    content_block = $("#guests_content");
    if (id > 4) {
        $("#remove_guest_" + (id - 1) + "_button").show();
    }
    guest_cpt-=1
}

const check_all = function () {
    let check = true;
    for(var i=1; i < guest_cpt; i++) {
        let name = $("#guest_" + i + "_name");
        let email = $("#guest_" + i + "_email");
        if (name.val() == "") {
            name.addClass("vibration_input")
            setTimeout(() => {
                name.removeClass("vibration_input")
            }, 5000);
            check = false;
        }
        if (email.val() == "") {
            email.addClass("vibration_input");
            setTimeout(() => {
                email.removeClass("vibration_input")
            }, 5000);
            check = false;
        }
    }
    return check
}

const send_secret_santa = async function() {
    $('#loader_connection').css("visibility", "visible");
    if (! check_all()) {
        return
    }

    data_send = {
        "title": ($("#sesa_new_title").val() !== "") ? $("#sesa_new_title").val():"Secret Santa " + new Date().getFullYear(),
        "date_end": format_date($("#sesa_end_date").val()),
        "guests": []
    }

    for(var i=1; i < guest_cpt; i++) {
        let name = $("#guest_" + i + "_name");
        let email = $("#guest_" + i + "_email");
        if (name.val() == "" && email.val() == "")
            break
        data_send.guests.push({"name": name.val(), "email": email.val()})
    }
    try {
        await $.ajax({
            type: 'post',
            url: '/api/v1/secret_santa/create/',
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data_send),
            dataType: 'json',
            success: function (data) {
                timer_redirect(7);
                $('.banner_validated').show().addClass("volet-10s");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    window.location.href = "./manage.html";
                }, 7000);
            },
            error: function (data) {
                $('.banner_error').show().addClass("volet");
                $('#loader_connection').css("visibility", "hidden");
                setTimeout(() => {
                    $('.banner_error').hide().removeClass("volet");
                }, 8000);
            },
        });
    } catch (error) {
        if (400 > error.status || error.status > 499) {
            $('.banner_error').show().addClass("volet");
            $('#loader_connection').css("visibility", "hidden");
            setTimeout(() => {
                $('.banner_error').hide().removeClass("volet");
            }, 5000);
        }
    }
}