var SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
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
  
    validate_login();
})


async function validate_login(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try{
        const response = await fetch(`${SERVER_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })
        const data = await response.json()
        
        if(data.status === 'success'){
            alert('login successful')
            const token = data.token
            localStorage.setItem('token', token)
        }
        else{
            alert('invalid credentials')    
        }
        
    }
    catch(error){
        console.log(error)
    }

}

//     const users = JSON.parse(localStorage.getItem('users')) || []
    
//     const user = users.find(item => item.email === email && item.password === password)
//     if(!user){
//         alert('invalid credentials')
//         return
//     }

//     sessionStorage.setItem('user', JSON.stringify(user))
//     email.value = '';
//     password.value = '';

//     if (user.role === 'admin'){
//         window.location.href = '/my-brand/admin_panel/dashboard.html'
//     }
//     else{
//         window.location.href = '/my-brand'
//     }
// }


