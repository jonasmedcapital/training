function preLoaderTable(rows, columns, bodyTable) {

  columnPreloaderHtml = ''
  for (var i = 0; i < columns; i++) {
    columnPreloaderHtml += `<td class='animated-background animated-background-td'></td>`
  }
  tablePreloaderHtml = ''
  for (var i = 0; i < rows; i++) {
    tablePreloaderHtml += `<tr class='timeline-item'>` + columnPreloaderHtml + `</tr>`
  }

  bodyTable.html(tablePreloaderHtml);

}