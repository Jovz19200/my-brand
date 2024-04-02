const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const myModalInfo = document.getElementById('myModal_info')
const closeButtonInfo = document.querySelector('.close_btn')


closeButtonInfo.addEventListener('click', ()=>{
    myModalInfo.style.display = 'none'
});

const info_showModal = async (message) =>{
    document.getElementById('info_modelMessage').textContent = message
    
    myModalInfo.style.display = 'block'
    setTimeout(() => {
        myModalInfo.style.display = 'none'
    }, 3000);
    
}

const ReadDashboard = async () => {
    info_showModal('Welcome to Dashboard...')
    const token = localStorage.getItem('token')
    
    try{
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
        
        document.getElementById('user_name').textContent = `Welcome, ${user.name}`
        document.getElementById('user_email').textContent = `${user.email}`
    }
    catch(err){
        console.log(err)
    }
    
    

    
    
    // info_showModal('Dashboard is loading...')
}