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
    objectData.forEach(async item =>{
            const blog_stats = async (item) =>{
                    try{
                            const resp = await fetch(`${SERVER_BLOGS}/${item._id}/comments`)
                            .then(resp => resp.json())
                            const comments = resp.comments
                            
                            const resp_likes = await fetch(`${SERVER_BLOGS}/${item._id}/likes`)
                            .then(likes => likes.json())
                            const likes = resp_likes.likes

                            return{comments: comments, likes: likes}
            }
            catch(err){
                console.log(err)
            }
            }
        const {comments, likes } = await blog_stats(item)

        const blog_div = document.createElement('div')
            blog_div.style.backgroundColor = '#4E3F3F'
            blog_div.style.marginRight = '10px'
          blog_div.classList.add('blog_1') 

    const blog_link = document.createElement('a')
          blog_link.href = `/my-brand/blog.html?id=${item._id}`

    const blog_image = document.createElement('img')
          blog_image.src = item.image

    const blog_title = document.createElement('p')
          blog_title.textContent = item.title

    const blog_data = document.createElement('p')
          blog_data.textContent = `${likes} likes, ${comments} comments`
          blog_data.style.fontSize = '15px'

    blog_link.appendChild(blog_image)
    blog_link.appendChild(blog_title)

    blog_div.appendChild(blog_link)
    blog_div.appendChild(blog_data)

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