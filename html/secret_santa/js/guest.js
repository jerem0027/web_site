jQuery(function () {
    $(".banner").hide();
    $("#guest_content").hide();
    $("#div_button_save_gift").hide();
    guest_check();
    $("#div_button_edit_gift").on("click", edit_gift_list);
    $("#div_button_save_gift").on("click", save_gift_list);
});

const guest_check = function() {
    $('#loader_connection').css("visibility", "visible");

    const product = new URLSearchParams(window.location.search).get('guest');
    try {
        $.ajax({
            type: 'get',
            url: '/api/v1/secret_santa/guest/' + product,
            dataType: 'json',
            success: function (data) {
                setTimeout(() => {
                    set_gift_list(data.content.gift_list, data.content.target_gift_list);
                    $('#sesa_title').html(data.content.secret_santa);
                    $('#sesa_creator_name').html(data.content.creator_name);
                    $('#sesa_creator_email').html(data.content.creator_email);
                    $('#sesa_date_end').html(format_date(data.content.date_end));
                    $('#sesa_ng_guest').html(data.content.nb_guest);
                    $('#guest_name').html(data.content.name);
                    $('#guest_email').html(data.content.email);
                    $('#target_name').html(data.content.target_name);
                    $('#target_email').html(data.content.target_email);
                    $("#guest_content").addClass("fade_guest").show();
                    $('#loader_connection').css("visibility", "hidden");
                }, '1000');
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

const set_gift_list = function (gift_list, target_gift_list) {
    $('#loader_connection').css("visibility", "visible");
    content_block = $("#guest_gifts")
    content_block.html("")
    for (var i=0; i < 5; i++) {
        $("#gift_list" + i).remove()
        value = 
        sessionStorage.setItem("gift" + i, (gift_list[i] != "") ? gift_list[i]:"");
        if (i < gift_list.length) {
            content_block.append(`
                <li id="gift_list${i}">${gift_list[i]}</li>
            `)
        } else {
            content_block.append(`
            <li id="gift_list${i}"></li>
        `)
        }
    }

    content_block = $("#target_gifts")
    content_block.html("")
    for (var i=0; i < 5; i++) {
        if (i < target_gift_list.length) {
            content_block.append(`
                <li id="gift_list${i}">${(target_gift_list[i] != "") ? target_gift_list[i]:""}</li>
            `)
        } else {
            content_block.append(`
            <li id="gift_list${i}"></li>
        `)
        }
    }
    $('#loader_connection').css("visibility", "hidden");
}

const edit_gift_list = function () {
    $('#loader_connection').css("visibility", "visible");
    $("#div_button_edit_gift").hide()
    $("#div_button_save_gift").show()

    content_block = $("#guest_gifts")
    content_block.html("")
    for(var i=0; i < 5; i++) {
        content_block.append(`
            <li id="gift_list${i}">
                <input
                    class="mdl-textfield__input"
                    type="text"
                    id="input_guest_gift${i}"
                    name="input_guest_gift${i}"
                    value="${sessionStorage.getItem("gift" + i)}"
                />
            </li>
        `)
    }
    $('#loader_connection').css("visibility", "hidden");
}

const save_gift_list = async function () {
    $('#loader_connection').css("visibility", "visible");
    $("#div_button_edit_gift").show()
    $("#div_button_save_gift").hide()

    data_send = {"gift_list": []}
    for (var i=0; i < 5; i++) {
        value = $("#input_guest_gift" + i).val()
        value = (value != "") ? value:""
        $("#gift_list" + i).remove()
        sessionStorage.setItem("gift" + i, value);
        data_send.gift_list.push(value)
        if (value != "") {
            content_block.append(`
                <li id="gift_list${i}">${value}</li>
            `)
        } else {
            content_block.append(`
            <li id="gift_list${i}"></li>
        `)
        }
    }
    const product = new URLSearchParams(window.location.search).get('guest');
    try {
        await $.ajax({
            type: 'put',
            url: '/api/v1/secret_santa/guest/' + product,
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data_send),
            success: function (data) {
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