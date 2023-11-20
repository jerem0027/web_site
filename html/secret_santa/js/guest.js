jQuery(document).ready(function () {
    $(".banner_error").hide()
    $("#guest_content").hide()
    guest_check();
});

const guest_check = function() {
    $('#loader_connection').css("visibility", "visible");

    const product = new URLSearchParams(window.location.search).get('guest');

    $.ajax({
        type: 'get',
        url: '/api/v1/secret_santa/guest/' + product,
        dataType: 'json',
        success: function (data) {
            setTimeout(() => {
                $('#guest_name').html(data.content.name);
                $('#guest_email').html(data.content.email);
                $('#target_name').html(data.content.target);
                $('#target_email').html(data.content.target_email);
                $("#guest_content").show()
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
