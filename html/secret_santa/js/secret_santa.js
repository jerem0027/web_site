jQuery(document).ready(function () {
});

const guest_button = function() {
    $('#loader_connection').css("visibility", "visible");

    const guest_id = $("#guest_input").val();
    $.ajax({
        type: 'get',
        url: '/api/v1/secret_santa/guest/' + guest_id,
        dataType: 'json',
        success: function (data) {
            setTimeout(() => {
                window.location.href = "/secret_santa/guest.html?guest=" + guest_id;
            }, 1000);
            $('#loader_connection').css("visibility", "hidden");
        },
        error: function (data) {
            $('#loader_connection').css("visibility", "visible");
            $('#guest_input').addClass("vibration_input");
            setTimeout(() => {
                $('#guest_input').removeClass("vibration_input")
                $('#loader_connection').css("visibility", "hidden");
            }, '1000');
        }
    });
}