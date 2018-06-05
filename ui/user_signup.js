window.onload = function(){
    document.getElementById('submit').addEventListener('click',createUser);
    if(!this.localStorage.getItem('requests')){
        displayEmptyTable();
    }
        
}
displayEmptyTable = function(){
    
}
createUser = function(e){
    e.preventDefault();
    let status;
    let fullName = document.getElementById('fn').value;
    let phonenumber = document.getElementById('pn').value;
    let email = document.getElementById('em').value;
    let password = document.getElementById('pd').value;
    fetch(window.location.origin + '/api/v1/auth/signup',{
        method: 'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*', 
            'content-type': 'application/json'

        },
        body: JSON.stringify( {fullName,email,phonenumber,password})
        //token: localStorage.getItem('token'
    })
    .then((res)=>{
        status = res.status;
        return res.json();
    })
    .then((data)=>{
        if(status=== 200){
            alert('account successfully created');
        }
    })
    .catch((err)=>console.log(err))
}