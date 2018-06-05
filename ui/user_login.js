window.onload = function(){
    btn = document.querySelectorAll("button");
    btn[0].addEventListener("click",loginUser)
}

function loginUser(e){
    e.preventDefault();
    let status;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd').value;
    console.log('email', email, 'pwd', password);
    fetch(window.location.origin+'/api/v1/auth/login', {
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*', 
            'content-type': 'application/json'

        },
        body: JSON.stringify({email,password})
    })
    .then((res)=>{
        status = res.status;
        return res.json();
    })
    .then((data)=>{
        if(status === 201){
            localStorage.setItem('token', data.token);
            alert(data.message);
            getRequests();
            
        }
        else if(status === 404){
            alert(data.message);
        }
    })
    .catch((err)=>console.log(err));
}
function getRequests(){
    fetch(window.location.origin + '/api/v1/users/requests',{
        method: 'GET',
        headers:{
            'Accept': 'application/json, text/plain, */*', 
            'content-type': 'application/json',
            'authorization': localStorage.getItem('token') 
        },
        //body: JSON.stringify({token: localStorage.getItem('token')})
    })
    .then((res)=>res.json())
    .then((data)=>{localStorage.setItem('requests', JSON.stringify(data)),location.href = window.location.origin + '/user_page.html';})
    .catch((err)=> console.log(err));
}