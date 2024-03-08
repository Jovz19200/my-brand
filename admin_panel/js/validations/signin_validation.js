var email = document.forms['form']['email'];
var  password = document.forms['form']['password'];

var email_error = document.getElementById('email_error');
var pass_error = document.getElementById('pass_error')

password.addEventListener('textInput', password_Verify);
email.addEventListener('textInput', email_Verify);

function validated(){
    if(email.value.length < 9){
        email.style.border = '1px solid red';
        email_error.style.display = 'block';
        email.focus();
        return false
    }
    if(password.value.length < 6){
        password.style.border = '1px solid red';
        pass_error.style.display = 'block';
        password.focus();
        return false
    }
}
function password_Verify(){
    if(password.value.length >= 5){
        password.style.border = '1px solid #D9D9D9';
        pass_error.style.display = 'none';
        return true;
    }

}

function email_Verify(){
    if(email.value.length >= 8){
        email.style.border = '1px solid #D9D9D9';
        email_error.style.display = 'none';
        return true;
    }
}

const form = document.getElementById('login_form')
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    validated();
    validate_login();
})


function validate_login(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    
    const user = users.find(item => item.email === email && item.password === password)
    if(!user){
        alert('invalid credentials')
        return
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    email.value = '';
    password.value = '';

    if (user.role === 'admin'){
        window.location.href = '/my-brand/admin_panel/dashboard.html'
    }
    else{
        window.location.href = '/my-brand'
    }
}

