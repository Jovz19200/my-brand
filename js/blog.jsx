function SingleBlog() {
    const urlParams = new URLSearchParams(window.location.search)
    let  blogId = urlParams.get('id')
    const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const SERVER_SINGLE_BLOG = `https://my-brand-be-sor4.onrender.com/api/v1/blogs/${blogId}`


const blog_image = document.querySelector('.blog_image img')
const  blog_title = document.querySelector('.blog_title h1')
const blog_description = document.querySelector('.blog_description')

let post_comment = document.querySelector('.post_comment')
let all_comments = document.querySelector('.all_comments')



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


const [likes, setLikes] = React.useState([ ])
const [comments, setComments] = React.useState([ ])
const [blog, setBlog] = React.useState([ ])

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
    
    myModalInfo.style.display = 'block'
    setTimeout(() => {
        myModalInfo.style.display = 'none'
    }, 5000);
}
    



    React.useEffect( () =>{
        const fetchSingleBlog = async() =>{
        
            load_image.style.display = 'block'
            const response = await fetch(SERVER_SINGLE_BLOG)
            const data = await response.json()
            console.log(data)
            objectData = data.data
            blog_image.src = objectData.image
            blog_title.textContent = objectData.title
            blog_description.innerHTML = objectData.description
            load_image.style.display = 'none'
            n_likes.textContent = objectData.likes.length
            n_comments.textContent = objectData.comments.length
            all_comments.innerHTML = ''
            objectData.comments.forEach( comment =>{
                let comment_div = document.createElement('div')
                comment_div.className = 'comment'
                comment_div.innerHTML = `
                <h6>${comment.name}</h6>
                <p>${comment.comment}</p>
                `
                all_comments.appendChild(comment_div)
            })
        
        fetchSingleBlog();
    }},[]
    
    )


    
  return(<div>
    <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close"> &times; </span>
                        <p id="modelMessage">Please sign in to post a comment</p>
                        <button id="signInButton">Sign In</button>
                    </div>
                </div>
               
                <div id="myModal_info" class="modal">
                    <div class="modal-content">
                        <span class="close_btn close"> &times; </span>
                        <p id="info_modelMessage"></p>
                        
                    </div>
                </div>
                <div class="article_head">
                  
                    <div class="blog_image">
                        <img src="" alt="Blog Image" />
                        <div id="loader-element-img" class="container-loader">
                            <p>Image Loading ...</p>
                            <div id="loader" class="loader"></div>
                        </div>
                    </div>
                </div>
                <div class="blog_title">
                    <h1></h1>
                   
                </div>
                <div class="blog_description">

                </div>
                
               

            <div class="reaction_section">
                <div class="reaction_status">
                    <ul>
                        
                        <li>1.1k Views</li>
                        <li><span class="n_comments"></span> comments</li>
                        <li><span class="n_likes"></span> likes</li> 
                        <li class="like_icon"><i class="fa-regular fa-heart" id="likeButton" aria-hidden="true" onclick="pushLikes()"></i></li>
                    </ul>
                </div>


                <div class="comments">
                    <h6><i class="fa fa-comment-o" aria-hidden="true"></i>
                        <button type="submit">Add your comment</button>
                    </h6>
                    <div class="add_comment">
                        <textarea class="comment_area" rows="4" cols="30" name="message" placeholder="Enter your Comment here..."></textarea>
                        
                    </div>
                   
                    <button class="post_comment" type="submit" onclick="pushComment()" style = "border: 1px white solid; border-radius: 5px;">Post Comment</button>

                    <div class="all_comments">
                        <div id="loader-element-cmt" class="container-loader">
                            <p>Waiting 🧐 ...</p>
                            <div id="loader" class="loader"></div>
                        </div>
                    </div>
                    </div>
                </div>
           

                </div>
  );
}

ReactDOM.render(<SingleBlog />, document.getElementById('article'))