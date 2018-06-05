toogleMenu = function(){
	var navlist = document.getElementById("nav-menu");
	
	// Get all buttons with class="btn" inside the container
			var li = navlist.getElementsByTagName("li");
	// Loop through the buttons and add the active class to the current/clicked button
			for (var i = 0; i < li.length; i++) {
			  li[i].addEventListener("click", function() {
				var current = document.getElementsByClassName("active");
				current[0].className = current[0].className.replace("active", "");
				this.className += " active";
			  });}	  

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
    var newCell4 = newRow.insertCell(3);
    newCell2.innerHTML = "No record(s)"
    newCell2.style.textAlign = "center";
  // Append a text node to the cell
  var newText  = document.createTextNode('')
  newCell1.appendChild(newText);
}
window.onload = function(){
    document.getElementById('logOut').addEventListener('click', ()=>localStorage.clear());
    toogleMenu();
    toogleDiv();
    document.getElementById('logRequest').addEventListener('click', submitRequest)
    if(!this.localStorage.getItem('requests')){ 
        displayEmptyTable();
    }else{
        displayRequests(JSON.parse(this.localStorage.getItem('requests')));
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
        let action = document.createElement('input');
        action.setAttribute('type','button');
        action.setAttribute('value','Edit');
        let c4 = row.insertCell(5);
        c4.appendChild(action);
    });
}
function submitRequest(e){
    e.preventDefault();
    let status;
    let selectField1 = document.getElementById('requestCategory');
    let selectField2 = document.getElementById('itemCategory');
    let selectField3 = document.getElementById('item');
    let requestCategory = selectField1.options[selectField1.selectedIndex].text
    let itemCategory = selectField2.options[selectField2.selectedIndex].text;
    let item = selectField3.options[selectField3.selectedIndex].text;
    let complaints = document.getElementById('complaints').value;
    fetch(window.location.origin +'/api/v1/user/request',{
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*', 
            'content-type': 'application/json'

        },
        body: JSON.stringify({requestCategory,itemCategory,item,complaints, token :localStorage.getItem('token')}),
        //token: localStorage.getItem('token')
    })
    .then((res)=>{
        status = res.status;
        return res.json();
    })
    .then((data)=>{
        if(status === 201){
            alert(data.message);
        }else{
            alert(data.message);
        }
    })
    .catch((err)=> console.log(err));
}
toogleDiv = function(){
    hd = document.getElementsByClassName("hide");
    hd[0].style.display = "none"
    sect = document.getElementsByTagName("section");
    div = document.getElementsByClassName("toogle");
    var navlist = document.getElementById("nav-menu");
	
	// Get all buttons with class="btn" inside the container
    var li = navlist.getElementsByTagName("li");
    for(i=0;i<li.length;i++){
        li[i].addEventListener("click", function(){
            for(j=0;j<div.length;j++){
                if(this.style.display !== 'block'){
                    if(div[j].style.display === "none"){
                        div[j].style.display = "block"
                    }else{
                        div[j].style.display = "none";
                    }
                }
            }
        })
    }
}

