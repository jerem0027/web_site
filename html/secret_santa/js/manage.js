jQuery(function() {
    $('.banner').hide();
    $("#banner_manage_sesa").on("click", update_button_down);
    $("#banner_manage_guest").on("click", update_button_down);
    get_secret_santa();
    get_guests();
});

const update_button_down = function() {
    e = $(this)[0].id.split("_")[2];
    if ($(`#button_down_${e}`).css("rotate") == "-90deg") {
        $(`#button_down_${e}`).animate({ rotate: '-=90deg' }, 800);
        $(`#${e}_content`).animate({ "max-height": 211*nb_sesa}, 800);
    } else {
        $(`#button_down_${e}`).animate({ rotate: '+=90deg' }, 600);
        $(`#${e}_content`).animate({ "max-height": 0}, 600);
    }
}

const click_edit_sesa = function() {
    id = $(this).attr("id").split("_")[3];
    $(`#div_button_edit_${id}`).hide();
    $(`#div_button_save_${id}`).show();

    const link = $(`#title_sesa${id} a`).attr("href");
    const placeholder_title = $(`#title_sesa${id} a`).html();
    $(`#title_sesa${id}`).html(
        `<div class="mdl-cell--2-col">Title: </div>
        <div class="mdl-cell--10-col">
            <input
                class="mdl-textfield__input sesa_manage_title_input"
                type="text"
                id="sesa_title${id}"
                name="${link}"
                placeholder="${placeholder_title}"
            />
        </div>
    `);
    const placeholder_date = format_date($(`#date_sesa${id} span`).html());
    $(`#date_sesa${id}`).html(
        `<div class="mdl-cell--2-col">Fin: </div>
        <div class="mdl-cell--10-col">
        <input
                class="mdl-textfield__input sesa_manage_date_input"
                type="date"
                id="sesa_date${id}"
                name="sesa_date${id}"
                value="${placeholder_date}"
        />
        </div>
    `);
}

const click_save_sesa = async function() {
    id = $(this).attr("id").split("_")[3];
    input_title = $(`#sesa_title${id}`);
    const content_title = input_title.val().charAt(0).toUpperCase() + input_title.val().slice(1);
    const content_date = format_date($(`#sesa_date${id}`).val());
    const link = input_title.attr("name");
    try {
        await $.ajax({
            type: 'put',
            url: `${api_url}/api/v1/secret_santa/${$(this).attr("name")}`,
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "title": content_title,
                "date_end": content_date
            }),
            success: function(data) {
                $(`#title_sesa${id}`).html(`<a href="${link}">${(content_title === "") ? input_title.attr("placeholder"):content_title}</a>`);
                $(`#date_sesa${id}`).html(`Fin:&nbsp;<span class="value_date">${content_date}</span>`);
                $(`#div_button_edit_${id}`).show();
                $(`#div_button_save_${id}`).hide();
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function(data) {
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

const click_remove_sesa = async function() {
    const id = $(this).attr("id").split("_")[3];
    try {
        await $.ajax({
            type: 'delete',
            url: `${api_url}/api/v1/secret_santa/${$(this).attr("name")}`,
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function(data) {
                $(`.sesa${id}`).remove();
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function(data) {
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

const click_see_sesa = function(link) {
    window.location.href = "./guest.html?guest=" + link;
}

var nb_sesa = 0;
const add_secret_santa = function(data) {
    content = data.content;
    for(var i=0; i<content.length; i++) {
        $(`#sesa_content`).append(`
            <div class="mdl-cell--1-col sesa${i}">&nbsp;</div>
            <div class="sesa_info mdl-cell mdl-cell--10-col mdl-grid sesa${i}">
                <div class="mdl-grid mdl-cell--12-col sesa_title sesa${i}" id="title_sesa${i}">
                    <a href="./guest.html?guest=${content[i].link}">${content[i].name}</a>
                </div>
                <div class="mdl-grid mdl-cell--12-col sesa_date" id="date_sesa${i}">Fin:&nbsp;<span class="value_date">${format_date(content[i].date_end)}</span></div>
                <div class="mdl-cell--12-col">
                    <div class="flex_space">
                        <div class="div_custom_button div_button_see" id="div_button_see_${i}" onclick="click_see_sesa('${content[i].link}')">
                            <i class="i_custom_button material-icons" id="see_button_${i}">info</i>Plus d'informations
                        </div>
                        <div class="flex_space">
                            <div class="div_custom_button div_button_edit" id="div_button_edit_${i}">
                                <i class="i_custom_button material-icons" id="edit_button_${i}">edit</i>Modifier
                            </div>
                            <div class="div_custom_button div_button_save" id="div_button_save_${i}" name="${content[i].id}">
                                <i class="i_custom_button material-icons" id="save_button_${i}">done</i>Enregistrer
                            </div>
                            <div class="div_custom_button div_button_remove" id="div_button_remove_${i}" name="${content[i].id}">
                                <i class="i_custom_button material-icons" id="remove_button_${i}">delete</i>Supprimer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mdl-cell--1-col sesa${i}">&nbsp;</div>
        `);
    }
    $(".div_button_save").hide();
    nb_sesa = content.length;
    $(".div_button_edit").on("click", click_edit_sesa);
    $(".div_button_save").on("click", click_save_sesa);
    $(".div_button_remove").on("click", click_remove_sesa);
}

var nb_guests = 0;
const add_guests = function(data) {
    content = data.content;
    for(var i=0; i<content.length; i++) {
        $(`#guest_content`).append(`
            <div class="mdl-cell--1-col guest${i}">&nbsp;</div>
            <div class="sesa_info mdl-cell mdl-cell--10-col mdl-grid guest${i}">
                <div class="mdl-grid mdl-cell--12-col sesa_title guest${i}" id="title_guest${i}">
                    <a href="./guest.html?guest=${content[i].link}">${content[i].name}</a>
                </div>
                <div class="mdl-grid mdl-cell--12-col sesa_date" id="date_guest${i}">Fin:&nbsp;<span class="value_date">${format_date(content[i].date_end)}</span></div>
                <div class="mdl-cell--12-col">
                    <div class="flex_space">
                        <div class="div_custom_button div_button_see" id="div_button_see_${i}" onclick="click_see_sesa('${content[i].link}')">
                            <i class="i_custom_button material-icons" id="see_button_${i}">info</i>Plus d'informations
                        </div>
                    </div>
                </div>
            </div>
            <div class="mdl-cell--1-col guest${i}">&nbsp;</div>
        `);
    }
    $(".div_button_save").hide();
    nb_guests = content.length;
}

const get_secret_santa = async function() {
    $('#loader_connection').css("visibility", "visible");
    try {
        await $.ajax({
            type: 'get',
            url: `${api_url}/api/v1/secret_santa/list/`,
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function(data) {
                add_secret_santa(data);
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function(data) {
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

const get_guests = async function() {
    $('#loader_connection').css("visibility", "visible");
    try {
        await $.ajax({
            type: 'get',
            url: `${api_url}/api/v1/secret_santa/guest/list/`,
            headers: {
                "APIKEY": sessionStorage.getItem("apikey"),
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function(data) {
                add_guests(data);
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function(data) {
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