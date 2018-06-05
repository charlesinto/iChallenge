window.onload = function(){
    document.getElementById('logOut').addEventListener('click', ()=>localStorage.clear());
    if(!localStorage.getItem('requests')){
      displayEmptyTable()
    }else{
      displayRequests(JSON.parse(this.localStorage.getItem('requests')))
    }
}
function displayRequests(requestLog){
  let table = document.getElementById('requestTable');
  requestLog.forEach(element => {
      let row = table.insertRow(-1);
      let c1 = row.insertCell(0);
      c1.innerHTML = element.id;
      let c2 = row.insertCell(1);
      c2.innerHTML = element.item;
      let c3 = row.insertCell(2);
      c3.innerHTML = element.complaints;
      let c5 = row.insertCell(3);
      c5.innerHTML = element.datecreated;
      let c6 = row.insertCell(4);
      c6.innerHTML = element.status;
      let action1 = document.createElement('input');
      action1.setAttribute('type','button');
      action1.setAttribute('value','Approve');
      let action2 = document.createElement('input');
      action2.setAttribute('type','button');
      action2.setAttribute('value','Reject');
      let action3 = document.createElement('input');
      action3.setAttribute('type','button');
      action3.setAttribute('value','Resolve');
      let c4 = row.insertCell(5);
      c4.appendChild(action1);
      c4.appendChild(action2);
      c4.appendChild(action3);
  });
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
    //var newCell4 = newRow.insertCell(3);
    newCell2.innerHTML = "No record(s)"
    newCell2.style.textAlign = "center";
  // Append a text node to the cell
  var newText  = document.createTextNode('')
  newCell1.appendChild(newText);
}