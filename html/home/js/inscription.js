jQuery(document).ready(function ($) {
  init();
  connection();

  $('.inscription_input').change(function () {
    localStorage.setItem($(this)[0].name, $('#' + $(this)[0].name).val());
  });

  $('.inscription_input').each(function () {
    $('#' + $(this)[0].name).val(localStorage.getItem($(this)[0].name));
  });
});

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

function check_connection() {
  $.ajax({
    type: 'post',
    url: 'php/all_validations.php',
    data: {
      pseudo: $('#pseudo').val(),
      password: $('#password').val(),
      check: 'connection',
    },
    dataType: 'json',
    success: function (data, status, xml) {
      if (data.status == 'success') {
        localStorage.setItem('connection', 1);
        localStorage.setItem('pseudo', $('#pseudo').val());
        localStorage.setItem('prenom', data.prenom);
        localStorage.setItem('nom', data.nom);
        connection();
      } else {
        $('.connection_input').css('borderColor', '#e96e27');
      }
    },
  });
}

function init() {
  $('.not_same_error').hide();
  $('.pseudo_used').hide();
  $('.connection_ok').hide();
}

function send_inscription() {
  check = before_submit();
  if (check) {
    $('#form_inscription').submit();
  }
}

function before_submit() {
  var check_all = true;
  $('.inscription_input').each(function () {
    if (!$(this).val()) {
      $(this).css('borderColor', 'red');
      check_all = false;
    } else {
      $(this).css('borderColor', 'grey');
    }
  });

    // TODO reduire call to API
    $.ajax({
        type: 'post',
        url: '/php/all_validations.php',
        data: { pseudo: $('#pseudo_form').val(), check: 'pseudo' },
        dataType: 'json',
        success: function (data, status, xml) {
          if (data.status != 'success') {
            $('.pseudo_used').css('display', 'initial');
            check_all = false;
          } else {
            $('.pseudo_used').css('display', 'none');
          }
        },
      });

  regex_pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:;"'<>,.?\\]).*$/
  if (! regex_pattern.test($('#password1').val())) {
    $('.invalid_pattern_error').css('color', 'red').addClass("vibration");
    setTimeout(() => {
        $('.invalid_pattern_error').removeClass("vibration");
    }, 1500);
    return false;
  } else {
    $('.invalid_pattern_error').css('color', 'limegreen');
  }

  if ($('#password1').val() != $('#password2').val()) {
    $('.not_same_error').css('display', 'initial').addClass("vibration");
    setTimeout(() => {
        $('.not_same_error').removeClass("vibration");
    }, 1500);
    return false;
  } else {
    $('.not_same_error').css('display', 'none');
  }

  return check_all;
}
