const  REGISTER_USER = 'https://my-brand-be-sor4.onrender.com/api/v1/users'

let fullname = document.forms['form']['fullname'];
let email = document.forms['form']['email'];
let  password = document.forms['form']['password'];
let  password2 = document.forms['form']['password2'];

let fullname_error = document.getElementById('fullname_error');
let email_error = document.getElementById('email_error')
let password_error = document.getElementById('password_error')
let confirm_error = document.getElementById('confirm_error')


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
        password2.style.border = '1px solid red';
        confirm_error.style.display = 'block'
        password2.focus(); // Focus on confirm password field
        return false;
      } 
    
 return false
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
    if(fullname.value.length > 8){
        fullname.style.border = '1px solid #D9D9D9';
        fullname_error.style.display = 'none';
        return true;
    }

}

function confirm_Verify(){
    if (password2.value !== password.value) {
        confirm_error.textContent = "Passwords do not match."; // New error message
        password2.style.border = '1px solid red';
        password2.focus(); // Focus on confirm password field
        return false;
      } else {
        confirm_error.textContent = ""; // Clear error message when passwords match
        password2.style.border = ''; // Reset border style
        
        return true;
    }  
    }

   


    
    
    const form = document.getElementById('signUp_form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        validated()
        validateSignUp();
        
    })
    // const user = {
    //     name: document.getElementById('fullname').value,
    //     email:  document.getElementById('email').value,
    //     password: document.getElementById('password').value,
    // }

    const  validateSignUp = async () =>{
        const name= document.getElementById('fullname').value;
        const email =  document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const user = {
            name: name,
            email: email,
            password: password
        }
        try{
            const response = await fetch(REGISTER_USER,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            
        }catch(error){
            console.log(error)
        }
        name.value = ''
        email.value  = ''
        password.value  = ''
        password2.value = ''
        
        
    }






    


    


