window.onload = function(){
    displayEmptyTable();
}
displayEmptyTable = function(){
    var tableRef = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

  // Insert a row in the table at row index 0
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0
  var newCell1  = newRow.insertCell(0);
    newCell1.align = "center";
    var newCell2  = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);
    newCell2.innerHTML = "No record(s)"
    newCell2.style.textAlign = "center";
  // Append a text node to the cell
  var newText  = document.createTextNode('')
  newCell1.appendChild(newText);
}