function pickBirthday(element) {

  element.pickdate({
    today: 'Hoje',
    ok: 'Selecionar',
    cancel: 'Fechar',
    closeOnCancel: true,
    closeOnSelect: true,
    container: 'body',
    containerHidden: 'body',
    firstDay: 0,
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    hiddenPrefix: 'birthday',
    labelMonthNext: 'Próximo Mês',
    labelMonthPrev: 'Mês Anterior',
    labelMonthSelect: 'Escolha um mês do menu',
    labelYearSelect: 'Escolha um ano do menu',
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    showMonthsFull: true,
    showMonthsShort: true,
    showWeekdaysFull: true,
    showWeekdaysShort: true,
    selectMonths: true,
    selectYears: 200,
  });

  element.on('mousedown', function (e) {
    e.preventDefault();
    $(this).dblclick()
  });
}