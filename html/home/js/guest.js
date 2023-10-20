jQuery(document).ready(function () {
  guest_check();
});

function guest_check() {
  const queryString = window.location.search;
  const product = new URLSearchParams(queryString).get('guest');

  //   a61712b1-a79f-497f-8e06-d708a4bf6237

  $.ajax({
    type: 'get',
    url: '/api/v1/secret_santa_guest/guest/' + product,
    dataType: 'json',
    success: function (data, status, xhr) {
      if (xhr.status == 200) {
        $('#guest_name').html(data.name);
        $('#guest_email').html(data.email);
        $('#target_name').html(data.target);
        $('#target_email').html(data.target_email);
      } else {
        setTimeout(() => {
          // TODO ajouter icon chargement
          //   Ajouter page donnée not found
          console.log('Retardée de 5 secondes.');
        }, '5000');
      }
    },
    error: function (data, status, xhr) {
      setTimeout(() => {
        // TODO ajouter icon chargement
        // Ajouter page donnée not found
        console.log('Retardée de 5 secondes.');
        // window.location.href = '/errors/404.html';
      }, '5000');
    },
  });
}
