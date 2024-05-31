const api_url = "";
// const api_url = "https://jeremiehenrion.eu";
// const api_url = "http://127.0.0.1:5000";

const test = false;
// const test = true;

const copy_clipboard = function(element) {
    navigator.clipboard.writeText($("#" + element).html());

    console.log($("#btn_copy_clipboard i").html("check"));

    $('#btn_copy_clipboard').addClass("change_color");
    setTimeout(() => {
        $('#btn_copy_clipboard').removeClass("change_color");
        console.log($("#btn_copy_clipboard i").html("content_copy"));
    }, 5000);
}