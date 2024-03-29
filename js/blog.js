
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
let n_likes = document.querySelector('.n_likes')
const load_image = document.getElementById('loader-element-img')
const load_comment = document.getElementById('loader-element-cmt')
const fetchSingleBlog = async() =>{
try{
    load_image.style.display = 'block'
    const response = await fetch(SERVER_SINGLE_BLOG)
    const data = await response.json()
    objectData = data.data
    
    blog_image.src = objectData.image
    blog_title.textContent = objectData.title
   

// Retrieve comments()
    
    const n_comments = document.querySelector('.n_comments')
    try{
        load_comment.style.display = 'block'
        const response = await fetch(`${SERVER_SINGLE_BLOG}/comments`)
        const data = await response.json()
        objectData.comments = data.data

        if(objectData.comments == 0){
            n_comments.textContent = 0
            console.log('no comments')
        }else{
            n_comments.textContent = objectData.comments.length
        }

        objectData.comments.forEach(element => {
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
    let n_likes = document.querySelector('.n_likes')
    try{
        const response = await fetch(`${SERVER_SINGLE_BLOG}/likes`)
        const data = await response.json()
        objectData = data.data
       
        n_likes.textContent = objectData.length
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


 // push comments
let comment_text = document.querySelector('.comment_area')

console.log(comment_text)

const token = localStorage.getItem('token')
async function pushComment(){  
    
    console.log(comment_text)
    if(!token){
        alert('login is required')
    }
    else{
    try{
       
        const response = await fetch(`${SERVER_SINGLE_BLOG}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: comment_text.value})
        })
        const data = await response.json()
       
        console.log(data)
        alert('processing...')
        
    }
    catch(error){
        console.log('error' + error)
    }  

}
    // console.log(loggedInUser)
    // if (loggedInUser && loggedInUser.role === 'user')
    // {
    // if (comment_text === ''){
    //     alert('invalid comment')
    // }
    // const user_name = loggedInUser.fullname.substring(0, loggedInUser.fullname.indexOf('@'))
    // single_blog.comments.push({name: user_name, comment_text, date: new Date().toLocaleString()});
     
    // localStorage.setItem('object', JSON.stringify(objectData) )
    // comment_text.value = '';
    // window.location.reload()
    // }
    // else{
    //     alert('Login is required')
    // }
    
}

// post_comment.addEventListener('click', () =>{
//     pushComment()
// })


// const blog_stats = document.querySelector('reaction_status')


const fa_heart = document.querySelector('.like_icon i')
let isLiked = false
async  function pushLikes(){
    let n_likes = document.querySelector('.n_likes')
    try{
        // retrieve likes
        const response = await fetch(`${SERVER_SINGLE_BLOG}/likes`)
        const data = await response.json()
        objectData = data.data
        n_likes.textContent = objectData.length
    }
    catch(error){
        console.log(error)
    }
    if(!token){
        alert('login is required')
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
            const data = await response.json()
        
            n_likes.textContent = objectData.length
            if (data.message === 'your like was added'){
                isLiked = true
            }
            if(isLiked){
                fa_heart.style.color = '#85C249'
                console.log('liked')
            }else{
                fa_heart.style.color = 'white'
            }
            console.log(data)
        }
        catch{
            console.log(error)
        }
        
    }

    
    
    // if (loggedInUser && loggedInUser.role === 'user'){

    //     if (!isLiked){
    //         single_blog.likes++
    //         single_blog.isLiked = true
           
    //         // alert(like)
    //     }
    //     else{
    //         single_blog.likes--
    //         single_blog.isLiked = false
    //         // alert(like)
    //     }

    //     // likes  = likes + like
        
    // }
    // else{
    //     alert('login is required')
    // }
    
    // localStorage.setItem('object', JSON.stringify(objectData))
    // window.location.reload();
}





