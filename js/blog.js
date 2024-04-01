
var urlParams = new URLSearchParams(window.location.search)
var blogId = urlParams.get('id')

var SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
var SERVER_SINGLE_BLOG = `https://my-brand-be-sor4.onrender.com/api/v1/blogs/${blogId}`

// const  decodeJWT = (token) => {
//     const parts = token.split('.');
//     const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
//     return { payload };
// }

var blog_image = document.querySelector('.blog_image img')
var blog_title = document.querySelector('.blog_title h1')

var post_comment = document.querySelector('.post_comment')
var all_comments = document.querySelector('.all_comments')



let objectData = []
const n_likes = document.querySelector('.n_likes')
const load_image = document.getElementById('loader-element-img')
const load_comment = document.getElementById('loader-element-cmt')
const n_comments = document.querySelector('.n_comments')
const myModal = document.getElementById('myModal')
const myModalInfo = document.getElementById('myModal_info')
const signInButton =  document.getElementById('signInButton')
const closeButton = document.querySelector('.close')
const closeButtonInfo = document.querySelector('.close_btn')
const modalMessage = document.getElementById('modalMessage')


signInButton.addEventListener('click', ()=>{
    window.location.href = '/my-brand/admin_panel/login.html'
});
closeButton.addEventListener('click', ()=>{
    myModal.style.display = 'none'
});

closeButtonInfo.addEventListener('click', ()=>{
    myModalInfo.style.display = 'none'
});

const showModal = async (message) =>{
    document.getElementById('modelMessage').textContent = message
    myModal.style.display = 'block'
    setTimeout(() => {
        myModal.style.display = 'none'
    }, 5000);
}

const info_showModal = async (message) =>{
    document.getElementById('info_modelMessage').textContent = message
    console.log(message)
    myModalInfo.style.display = 'block'
    setTimeout(() => {
        myModalInfo.style.display = 'none'
    }, 5000);
}

const fetchSingleBlog = async() =>{
try{
    load_image.style.display = 'block'
    
    // popupalert.textContent = 'Loading...'
    const response = await fetch(SERVER_SINGLE_BLOG)
    const data = await response.json()
    objectData = data.data
    
    blog_image.src = objectData.image
    blog_title.textContent = objectData.title
    

// Retrieve comments()
    
    
    try{
        load_comment.style.display = 'block'
        const response = await fetch(`${SERVER_SINGLE_BLOG}/comments`)
        const data = await response.json()
        objectData.comments = data.data

        // console.log(objectData.comments)
        
        if(objectData.comments == 0){
            n_comments.textContent = 0

        }else{
            n_comments.textContent = objectData.comments.length
        }

        var comments_reversed = objectData.comments.reverse()
       

        comments_reversed.forEach(element => {
        const comment_div = document.createElement('div')
        comment_div.classList.add('comments_given')    
    
        var comment_item = `
        <i class="fa fa-user-circle-o" aria-hidden="true" style="margin-top: 7px" ></i>
        <div class="comment_container">
            <div style="border-bottom: #FFFFFF 1px solid">
            <h4>${element.name}</h4>
            <p>${element.content}</p>
            </div>
        </div>
        `
        comment_div.innerHTML  = comment_item
        all_comments.appendChild(comment_div)
        
        });
        load_image.style.display = 'none'
        load_comment.style.display = 'none'
    }
catch(error){
    console.log(error)
    load_comment.style.display = 'none'
    load_image.style.display = 'none'
}   


   


    // retrieve likes
  
    try{
        const response = await fetch(`${SERVER_SINGLE_BLOG}/likes`)
        const data = await response.json()
        likesData = data.data
       
        n_likes.textContent = likesData.length
    }
    catch(error){
        console.log(error)
    }



}
catch(error){
    console.log(error)
    load_comment.style.display = 'none'
    load_image.style.display = 'none'
}

//  closing function
}




fetchSingleBlog();


const token = localStorage.getItem('token')
async function pushComment(){  
    
    const comment_text = document.querySelector('.comment_area')
    const comment = comment_text.value

    
    if(!token){
        showModal('Please Login to post a comment')
    }
    else{
    try{
        post_comment.textContent = 'Sending...'
        const response = await fetch(`${SERVER_SINGLE_BLOG}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: comment})
        })

        if(response.ok)
        {
        const resp = await fetch(`${SERVER_SINGLE_BLOG}/comments`)
        const comments = await resp.json()
        n_comments.textContent = comments.comments
        const len  = comments.data.length
        post_comment.textContent = 'Post Comment'
        comment_text.value = ''

        const comment_div = document.createElement('div')
        comment_div.classList.add('comments_given')    
        // console.log(comments)
        let comments_reversed = await comments.data.reverse()
        
        console.log(comments_reversed)
        let comment_item = `
        <i class="fa fa-user-circle-o" aria-hidden="true" style="margin-top: 7px" ></i>
        <div class="comment_container">
            <div style="border-bottom: #FFFFFF 1px solid">
            <h4>${comments_reversed[len - 1].name}</h4>
            <p>${comments_reversed[len - 1].content}</p>
            </div>
        </div>
        `
        comment_div.innerHTML  = comment_item
        all_comments.appendChild(comment_div)
        }
        else{
            post_comment.textContent = 'Post Comment'
            info_showModal('An error occured while posting comment perhaps check your inputs')
        }
    }
    catch(error){
        info_showModal(`An error occured while posting comment: ${error}`)
        load_comment.style.display = 'none'
    }  
}
}

// Posting a Like

const fa_heart = document.querySelector('.like_icon i')
let isLiked = false
async  function pushLikes(){
    
    if(!token){
        showModal('Please Login to add a Like')
    }
    else{
        try{
            const response = await fetch(`${SERVER_SINGLE_BLOG}/likes`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            const resp = await fetch(`${SERVER_SINGLE_BLOG}/likes`)
            const data = await resp.json()
            
            n_likes.textContent = data.likes
            if (data.message === 'your like was added'){
                isLiked = true
            }
            if(isLiked){
                fa_heart.style.color = '#85C249'
                
            }else{
                fa_heart.style.color = 'white'
            }
            
        }
        catch{
            console.log(error)
        }
        
    }

}










