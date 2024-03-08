var urlParams = new URLSearchParams(window.location.search)
var blogId = urlParams.get('id')


var blog_image = document.querySelector('.blog_image img')
var blog_title = document.querySelector('.blog_title h1')

var post_comment = document.querySelector('.post_comment')
var comments_given = document.querySelector('.comments_given')


var objectData = JSON.parse(localStorage.getItem('object')) || []

var single_blog = objectData.find(item => item.id === blogId)


blog_image.src = single_blog.blog_image
blog_title.textContent = single_blog.blog_title

function pushComment(){
    var comment_here = document.querySelector('.comment_area').value;
   
     var newObj = {
            id: blogId, 
            blog_image: e.target.result, 
            blog_title: blog_title,
            blog_content: blog_content,
            comments: [comment_here],
            likes: [] 
     }

     objectData.push(newObj)

}