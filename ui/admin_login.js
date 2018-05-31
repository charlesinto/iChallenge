window.onload = function(){
}
function getRequests(e){
    alert();
    e.preventDefault();
    fetch('https://maintenancetracker-charles.herokuapp.com/iMaintenace/api/v1/auth/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({email:"onuorahchibuike1@gmail.com", password: "3450"})

    })
    .then((res)=>console.log('<<<<<',res.json()))
    .then((data)=>console.log('>>>>',data));
}