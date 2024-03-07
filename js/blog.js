var urlParams = new URLSearchParams(window.location.search)
var blogId = urlParams.get('id')
console.log(blogId)

var blog_image = document.querySelector('.blog_image img')
var blog_title = document.querySelector('.blog_title h1')

var objectData = JSON.parse(localStorage.getItem('object')) || []
console.log(objectData)
var single_blog = objectData.find(item => item.id === blogId)

console.log(single_blog)

blog_image.src = single_blog.blog_image
blog_title.textContent = single_blog.blog_title
