const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const email = document.forms['form']['email'];
const  password = document.forms['form']['password'];

const email_error = document.getElementById('email_error');
const pass_error = document.getElementById('pass_error')

const login_button = document.getElementById('login_btn')
const myModalInfo = document.getElementById('myModal_info')
const closeButtonInfo = document.querySelector('.close_btn')


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

closeButtonInfo.addEventListener('click', ()=>{
    myModalInfo.style.display = 'none'
});

const info_showModal = async (message) =>{
    document.getElementById('info_modelMessage').textContent = message
   
    myModalInfo.style.display = 'block'
    setTimeout(() => {
        myModalInfo.style.display = 'none'
    }, 5000);
    // window.location.reload()
}
const load_logging = (message) =>{
    setTimeout(() => {
        login_button.textContent = message
    }, 1000)
}

async function validate_login(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try{
        login_button.textContent = load_logging('Logging ...')
        const response = await fetch(`${SERVER_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })
        const data = await response.json()
        
        if(data.status === 'success'){
           
            const token = data.token
            localStorage.setItem('token', token)
            const  decodeJWT = (token) => {
                const parts = token.split('.');
                const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

                return { payload };
            }
            const userId = decodeJWT(token).payload.userId
            const getUserById = async (userId) =>{
                
                const response = await fetch(`${SERVER_URL}/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                return  {role : data.data.role, name: data.data.name, email: data.data.email};   
            }
            const user = await  getUserById(userId)
            
            const {user_role, user_name, user_email} = {user_role: user.role, user_name: user.name, user_email: user.email}
            
            info_showModal(data.message + ' Successfully as ' + user_name.toUpperCase())
            setTimeout(() =>{
                
                if(user_role === 'admin'){
                    window.location.href = './dashboard.html'
                }
                else{
                    window.location.href = '../index.html'
                }
            }, 5000)
            
        }
        else{
            info_showModal(data.message)  
            login_button.textContent = 'Login Here'
        }
        login_button.textContent = 'Login Here'
    }
    catch(error){
        console.log(error)
        login_button.textContent = 'Login Here'
    }

}

