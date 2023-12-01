jQuery(function() {
    $("#btn_check_guest").on("click", guest_button);
    $("#btn_create").on("click", create_button);
    $("#btn_manage").on("click", manage_button);
});

const create_button = function() {
    if (sessionStorage.getItem("apikey"))
        window.location.href = "/secret_santa/create.html";
}
const manage_button = function() {
    if (sessionStorage.getItem("apikey"))
        window.location.href = "/secret_santa/manage.html";
}

const guest_button = function() {
    $('#loader_connection').css("visibility", "visible");

    const link = $("#guest_input").val();
    try {
        $.ajax({
            type: 'get',
            url: `${api_url}/api/v1/secret_santa/guest/${link}`,
            dataType: 'json',
            success: function(data) {
                setTimeout(() => {
                    window.location.href = "/secret_santa/guest.html?guest=" + link;
                }, 1000);
                $('#loader_connection').css("visibility", "hidden");
            },
            error: function(data) {
                $('#loader_connection').css("visibility", "visible");
                $('#guest_input').addClass("vibration_input");
                setTimeout(() => {
                    $('#guest_input').removeClass("vibration_input");
                    $('#loader_connection').css("visibility", "hidden");
                }, '1000');
            }
        });
    } catch (error) {
        if (400 > error.status || error.status > 499) {
            $('#loader_connection').css("visibility", "visible");
            $('#guest_input').addClass("vibration_input");
            setTimeout(() => {
                $('#guest_input').removeClass("vibration_input");
                $('#loader_connection').css("visibility", "hidden");
            }, '1000');
        }
    }
}