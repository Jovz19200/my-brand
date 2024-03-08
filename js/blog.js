var urlParams = new URLSearchParams(window.location.search)
var blogId = urlParams.get('id')


var blog_image = document.querySelector('.blog_image img')
var blog_title = document.querySelector('.blog_title h1')

var post_comment = document.querySelector('.post_comment')
var all_comments = document.querySelector('.all_comments')


var objectData = JSON.parse(localStorage.getItem('object')) || []

var single_blog = objectData.find(item => item.id === blogId)


blog_image.src = single_blog.blog_image
blog_title.textContent = single_blog.blog_title

function pushComment(){
    var comment_text = document.querySelector('.comment_area').value;
   
   
    single_blog.comments.push({name: 'gisubizo', comment_text, date: new Date().toLocaleString()});
    
   
    localStorage.setItem('object', JSON.stringify(objectData) )
    comment_text.value = '';

   window.location.reload()
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