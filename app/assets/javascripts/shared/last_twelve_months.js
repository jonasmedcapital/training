function lastTwelveMonths(month, year) {
  $('#lastTwelveMonthsDiv').removeClass("d-none")
  dates = ''
  $.ajax({
    url: '/general/dates/last_twelve_months',
    method: 'POST',
    dataType: 'json',
    data: { authenticity_token: token, report: { month: month, year: year, current_date: true }, current_user: { current_user_id: currentUserId } },
    success: function (response) {
      dates = '<option>Selecione o Mês</option>';
      $.each(response.data.cln, function (i, item) {
        id = item.id;
        date = item.date;
        month = item.month;
        year = item.year;

        dates += '<option month="' + month + '" year="' + year + '">' + date + '</option>';

      });
      html = '<select class="custom-select px-0 ml-auto s-title-0p7rem" id="leadIndicatorMonth" required>';
      html += dates;
      html += '</select>';

      $('#lastTwelveMonthsDiv').html(html);
    },
    error: function (xhr) {
      processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no atendimento@medcapital.com.br", device);
    }
  });
}