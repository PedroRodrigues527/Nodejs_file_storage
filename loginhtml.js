function verifyLogin(){
    if(document.getElementById('name').value =='' || document.getElementById('password').value ==''){
        alert("Please complete the login!");
    }
    else if(document.getElementById('name').value !='admin' || document.getElementById('password').value !='123'){
        alert("Login incorrect Please try again!");
    }
}   