const blog_container = [...document.querySelectorAll('.flex_blog')];
const next_btn = [...document.querySelectorAll('.nxt_button')];
const pre_btn = [...document.querySelectorAll('.pre_button')];

blog_container.forEach((item, i)=> {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;


    next_btn[i].addEventListener('click', ()=>{
        item.scrollLeft += containerWidth
    })

    pre_btn[i].addEventListener('click', ()=>{
        item.scrollLeft -= containerWidth
    })
})




// displaying blogs from server

const loader  = document.getElementById('loader-element')

const SERVER_BLOGS = 'https://my-brand-be-sor4.onrender.com/api/v1/blogs';

async function readAll(){

const flex_blog = document.querySelector('.flex_blog');
flex_blog.innerHTML = ''
loader.style.display = 'block'

try{
    
    const response = await fetch(SERVER_BLOGS)
    const data = await response.json()
    
    objectData = data.data
    objectData.forEach(item =>{
    const blog_div = document.createElement('div')
          blog_div.classList.add('blog_1') 

    const blog_link = document.createElement('a')
          blog_link.href = `/my-brand/blog.html?id=${item._id}`

    const blog_image = document.createElement('img')
          blog_image.src = item.image

    const blog_title = document.createElement('p')
          blog_title.textContent = item.title

    blog_link.appendChild(blog_image)
    blog_link.appendChild(blog_title)

    blog_div.appendChild(blog_link)

    flex_blog.appendChild(blog_div)
    loader.style.display = 'none'
})
}
catch(error){
    console.log(error)
    loader.style.display = 'none'
}
}
window.onload = readAll()