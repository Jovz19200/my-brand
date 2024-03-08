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

