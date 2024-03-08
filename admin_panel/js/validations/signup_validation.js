var fullname = document.forms['form']['fullname'];
var email = document.forms['form']['email'];
var  password = document.forms['form']['password'];
var  password2 = document.forms['form']['password2'];

var fullname_error = document.getElementById('fullname_error');
var email_error = document.getElementById('email_error')
var password_error = document.getElementById('password_error')
var confirm_error = document.getElementById('confirm_error_error')


password.addEventListener('textInput', password_Verify);
email.addEventListener('textInput', email_Verify);
fullname.addEventListener('textInput', fullname_Verify)
password2.addEventListener('textInput',confirm_Verify)

function validated(){
    if(fullname.value.trim() === ""){
        if(fullname.value.split(" ").length < 2){
            fullname.style.border = '1px solid red';
            fullname_error.style.display = 'block';
            fullname.focus();
            return false 
        }
    }

    if(email.value.length < 9){
        email.style.border = '1px solid red';
        email_error.style.display = 'block';
        email_error.textContent = 'Your email is invalid'
        email.focus();
        return false
    }
    if(password.value.length < 6){
        password.style.border = '1px solid red';
        password_error.style.display = 'block';
        password.focus();
        return false
    }
    if (password2.value !== password.value) {
        confirm_error.textContent = "Passwords do not match."; // New error message
        confirmPassword.style.border = '1px solid red';
        confirmPassword.focus(); // Focus on confirm password field
        return false;
      } 
    
 return isValid
}

function email_Verify(){
    if(email.value.length >= 8){
        email.style.border = '1px solid #D9D9D9';
        email_error.style.display = 'none';
       
        return true;
    }
}
function password_Verify(){
    if(password.value.length >= 5){
        password.style.border = '1px solid #D9D9D9';
        password_error.style.display = 'none';
        return true;
    }

}
function fullname_Verify(){
    if(fullname.value.length > 10){
        fullname.style.border = '1px solid #D9D9D9';
        fullname_error.style.display = 'none';
        return true;
    }

}

function confirm_Verify(){
    if (password2.value !== password.value) {
        confirm_error.textContent = "Passwords do not match."; // New error message
        confirmPassword.style.border = '1px solid red';
        confirmPassword.focus(); // Focus on confirm password field
        return false;
      } else {
        confirm_error.textContent = ""; // Clear error message when passwords match
        confirmPassword.style.border = ''; // Reset border style
        
        return true;
    }
    
      
    }


