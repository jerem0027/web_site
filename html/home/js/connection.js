function connection() {
  if (localStorage.getItem('connection')) {
    $('.connection_input').hide();
    $('.connection_button').hide();
    $('.connection_off').hide();
    $('.connection_ok').show();
    $('#affiche_name').html(
      localStorage.getItem('prenom') +
        "<span style='color:#424242' > (" +
        localStorage.getItem('pseudo') +
        ')</span> ' +
        localStorage.getItem('nom')
    );
  }
}

function deconnection() {
  localStorage.clear();
  $('.connection_input').show().val('');
  $('.connection_button').show();
  $('.connection_off').show();
  $('.connection_ok').hide();
  $('#affiche_name').hide();
}

// function check_connection() {
//     $.ajax({
//         type: 'POST',
//         url: '/php/all_validations.php',
//         data: {
//             pseudo: $('#pseudo').val(),
//             password: $('#password').val(),
//             check: 'connection'
//         },
//         dataType: 'json',
//         success: function (data, status, xml) {
//             if (data.status == 'success') {
//                 localStorage.setItem('connection', 1);
//                 localStorage.setItem('pseudo', $('#pseudo').val());
//                 localStorage.setItem('first_name', data.prenom);
//                 localStorage.setItem('name', data.nom);
//                 connection();
//             } else {
//                 $('.connection_input').css('borderColor', '#e96e27');
//             }
//         },
//     });
// }