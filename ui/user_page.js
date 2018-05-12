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
    newCell2.innerHTML = "No record(s)"
    newCell2.style.textAlign = "center";
  // Append a text node to the cell
  var newText  = document.createTextNode('')
  newCell1.appendChild(newText);
}
window.onload = function(){
    toogleMenu();
    toogleDiv();
    displayEmptyTable();
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
                if(div[j].style.display === "none"){
                    div[j].style.display = "block"
                }else{
                    div[j].style.display = "none";
                }
            }
        })
    }
}

