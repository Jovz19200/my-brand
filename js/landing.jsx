

function TestREACT(){
    const blog_container = [...document.querySelectorAll('.flex_blog')];
    const next_btn = [...document.querySelectorAll('.nxt_button')];
    const pre_btn = [...document.querySelectorAll('.pre_button')];
    const SendQuery = document.getElementById('send_query')
    const myModalInfo = document.getElementById('myModal_info')
    const closeButtonInfo = document.querySelector('.close_btn')
    const MyModelInfo = document.getElementById('myModal_info')
    const loader  = document.getElementById('loader-element')
    const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
    const SERVER_BLOGS = 'https://my-brand-be-sor4.onrender.com/api/v1/blogs';
    const SERVER_QUERIES = 'https://my-brand-be-sor4.onrender.com/api/v1/queries';

   
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

    const Info_showModal =(message) =>{
        document.getElementById('info_modelMessage').textContent = message
        myModalInfo.style.display = 'block'
        setTimeout(() =>{
            myModalInfo.style.display = 'none'
        }, 5000)
    }


    const [blogs, setBlogs] = React.useState([ ])
    const [likes, setLikes] = React.useState([ ])
    const [comments, setComments] = React.useState([ ])


    React.useEffect( () =>{
        const fetchBlog = async( ) =>{
            const response = await fetch(`${SERVER_URL}/blogs`)
            const data = await response.json()
            // console.log(data)
            // setBlogs(data.data)
            const blogData = await Promise.all(data.data.map( async (blog) => {

                const resp_comments = await fetch(`${SERVER_URL}/blogs/${blog._id}/comments`)
                const commentsData = await resp_comments.json()

                const comments = commentsData.data

                const resp_likes = await fetch(`${SERVER_URL}/blogs/${blog._id}/likes`)
                const likesData = await resp_likes.json()
                const likes = await likesData.data

                return { ...blog, comments, likes }
            }))

            setBlogs(blogData)
        };
        fetchBlog()
    },[])

    console.log(blogs)
    


    
    // React.useEffect( () =>{
    //     const fetchLikes = async( ) =>{
    //         const response = await fetch(`${SERVER_URL}/blogs/${blogs._id}/likes`)
    //         const data = await response.json()
    //         setLikes(data.likes)
    //     };
    //     fetchLikes()
    // },[])
    
    // React.useEffect( () =>{
    //     const fetchComments = async( ) =>{
    //         const response = await fetch(`${SERVER_URL}/blogs/${blogs._id}/comments`)
    //         const data = await response.json()
    //         setComments(data.comments)
    //     };
    //     fetchComments()
    // },[])
    
    return(
        <div>
            <div className='flex_blog'>
                {blogs.map((blog, i) => (
                    <div key={i} className='blog_1'>
                        <a href={`/my-brand/blog.html?id=${blog._id}`}>
                            <img src={blog.image} alt='blog_image'/>
                            <p>{blog.title}</p>
                        </a>
                        <p>{blog.likes.length} likes, {blog.comments.length} comments</p>
                    </div>
                ))}
            </div>
            <div className='nxt_button'></div>
            <div className='pre_button'></div>
            <div id='myModal_info' className='modal'>
                <div className='modal-content'>
                    <span className='close_btn'>&times;</span>
                    <p id='info_modelMessage'></p>
                </div>
            </div>
            <div id='loader-element'></div>
            
        </div>
    )
    
}
ReactDOM.render(<TestREACT />, document.getElementById('react-root'))