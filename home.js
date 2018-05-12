window.onload = function(){
	toogleMenu();
}

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
function backgroundImages(){
	count = 0;
	document.getElementsByClassName('company-section')[0].style.backgroundImage = "url('../asset/work_in_progress.jpg')";
obj =	setInterval(() => {
	img = ["url('../asset/we-maintain.jpg')", "url('../asset/work_in_progress.jpg')"];
	
	backgroundDisplay = document.getElementsByClassName('company-section');
	backgroundDisplay[0].style.backgroundImage = img[count= ++count%img.length];
}, 5000);
//clearInterval(obj);
}