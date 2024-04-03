const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const myModalInfo = document.getElementById('myModal_info')
const closeButtonInfo = document.querySelector('.close_btn')

const n_comments = document.getElementById('n_comments')
const n_queries = document.getElementById('n_queries')
const n_blogs = document.getElementById('n_blogs')
const n_users = document.getElementById('n_users')
// console.log(n_comments)


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

    try{

        const response = await fetch(`${SERVER_URL}/blogs`)
        const data = await response.json()
        n_blogs.textContent = `${data.data.length} Blogs`

        
// Querries
try{
    const resp = await fetch(`${SERVER_URL}/queries`, {
        method: 'GET',
        headers: {
            'Authorization':   `Bearer  + ${token}`
    }
})
    const queryData = await resp.json()
    
    if (response.ok){
        n_queries.textContent = `${queryData.data.length} Queries`
    }
    else{
        info_showModal(queryData.status)
        n_queries.textContent = `0 Queries`
    }
}
catch(err){ 
    info_showModal(`Error: ${err}`)
    console.log(err)
}
    
    // Comments
       
        try{
            const res = await fetch(`${SERVER_URL}/blogs/comments`)
            const commentData = await res.json()
            console.log(commentData)
            n_comments.textContent = `${commentData.data.length} Comments`
    
    
            if (res.ok){
                n_comments.textContent = `${commentData.data.length} Comments`
            }
            else{
                n_queries.textContent = `0 Comments`
            }
    

        }
        catch(err){
            console.log(err)
        }

        
// Users
try{
    const resp_users = await fetch(`${SERVER_URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization':   `Bearer  + ${token}`
        }
    
        })
    const userData = await resp_users.json();
    if (resp_users.ok){
        n_users.textContent = `${userData.data.length} users`
    }
    else{
        n_queries.textContent = `0 users`
    }

    n_users.textContent = `${userData.data.length} Users`
}
catch(err){
    console.log(err)
}

       
    }
    catch(err){
        console.log(err)
    }
    
    

    
    
    // info_showModal('Dashboard is loading...')
}