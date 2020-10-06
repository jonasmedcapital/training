function processingCsv(response, fileName) {
  
  rows = response.data.cln;
  csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    row = rowArray.join(";");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".csv");
  document.body.appendChild(link);

  link.click();

  link.remove();

}