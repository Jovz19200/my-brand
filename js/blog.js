var urlParams = new URLSearchParams(window.location.search)
var blogId = urlParams.get('id')


var blog_image = document.querySelector('.blog_image img')
var blog_title = document.querySelector('.blog_title h1')

var post_comment = document.querySelector('.post_comment')
var all_comments = document.querySelector('.all_comments')


var objectData = JSON.parse(localStorage.getItem('object')) || []
var loggedInUser = JSON.parse(sessionStorage.getItem('user')) || []







var single_blog = objectData.find(item => item.id === blogId)



blog_image.src = single_blog.blog_image
blog_title.textContent = single_blog.blog_title

function pushComment(){
    var comment_text = document.querySelector('.comment_area').value;
    // console.log(loggedInUser)
    if (loggedInUser && loggedInUser.role === 'user')
    {
    if (comment_text === ''){
        alert('invalid comment')
    }
    const user_name = loggedInUser.fullname.substring(0, loggedInUser.fullname.indexOf('@'))
    single_blog.comments.push({name: user_name, comment_text, date: new Date().toLocaleString()});
     
    localStorage.setItem('object', JSON.stringify(objectData) )
    comment_text.value = '';
    window.location.reload()
    }
    else{
        alert('Login is required')
    }
    
}

single_blog.comments.forEach(element => {
    const comment_div = document.createElement('div')
    comment_div.classList.add('comments_given')    

    var comment_item = `
    <i class="fa fa-user-circle-o" aria-hidden="true" style="margin-top: 7px" ></i>
    <div class="comment_container">
        <h4>${element.name}</h4>
        <p>${element.comment_text}</p>
        <span>${element.date}</span>
    </div>
    `
    comment_div.innerHTML  = comment_item
    all_comments.appendChild(comment_div)

});


const blog_stats = document.querySelector('reaction_status')
const n_likes = document.querySelector('.n_likes')
const n_comments = document.querySelector('.n_comments')
const fa_heart = document.querySelector('.like_icon i')
function pushLikes(){
    
    const isLiked = single_blog.isLiked
    
    if (loggedInUser && loggedInUser.role === 'user'){

        if (!isLiked){
            single_blog.likes++
            single_blog.isLiked = true
           
            // alert(like)
        }
        else{
            single_blog.likes--
            single_blog.isLiked = false
            // alert(like)
        }

        // likes  = likes + like
        
    }
    else{
        alert('login is required')
    }
    
    localStorage.setItem('object', JSON.stringify(objectData))
    window.location.reload();
}
n_likes.textContent = single_blog.likes
n_comments.textContent = single_blog.comments.length
if(single_blog.isLiked){
    fa_heart.style.color = 'red'
}


