function SingleBlog() {

  const urlParams = new URLSearchParams(window.location.search);
  let blogId = urlParams.get("id");
  const SERVER_SINGLE_BLOG = `https://my-brand-be-sor4.onrender.com/api/v1/blogs/${blogId}`

  const [load_image, setLoadImage] = React.useState(false)
  const [load_comment, setLoadComment] = React.useState(false)
  const [blog, setBlog] = React.useState([])
  const [comments, setComments] = React.useState([])
  const [likes, setLikes] = React.useState([])
  const [comment, setComment] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [popup, setPopup] = React.useState(false)


  const myModal = document.getElementById('myModal')
    const myModalInfo = document.getElementById('myModal_info')
    const signInButton =  document.getElementById('signInButton')
    const closeButton = document.querySelector('.close')
    const closeButtonInfo = document.querySelector('.close_btn')
    
    const handleCommentChange = (event) => {
        setComment(event.target.value);
        console.log(comment)
    };

    const showModal = async (message) =>{
        setMessage(message)
        setPopup(true)
        setTimeout(() => {
            setPopup(false)
        }, 5000);
    }

    // const info_showModal = async (message) =>{
    //     document.getElementById('info_modelMessage').textContent = message
        
    //     myModalInfo.style.display = 'block'
    //     setTimeout(() => {
    //         myModalInfo.style.display = 'none'
    //     }, 5000);
    // }

  const token = localStorage.getItem('token')
    

  const fetchSingleBlog = async () => {
      setLoadImage(true)
      const response = await fetch(SERVER_SINGLE_BLOG);
      const data = await response.json();
   
      setBlog(data.data)
      setLoadImage(false)
    };
 

  React.useEffect(() => { 
    fetchSingleBlog();
    
  }, []);

  // Retrieve comments 
  const fetchComments = async() =>{
     setLoadComment(true)
    const resp_comments = await fetch(`${SERVER_SINGLE_BLOG}/comments`)
    const commentsData = await resp_comments.json()
    const comments = commentsData.data
   
    setComments(comments)
    
  
    setLoadComment(false)
}

  React.useEffect(() => {
    fetchComments()
  },[])

//   Retrieve likes
const fetchLikes = async () =>{
    const resp_likes = await fetch(`${SERVER_SINGLE_BLOG}/likes`)
    const likesData = await resp_likes.json()
    const likes = likesData.data
    
    setLikes(likes)
    }
React.useEffect(() => {
fetchLikes()
},[])

// Posting comments

const pushComment = async () =>{
    const comment = document.querySelector('.comment_area').value
    const postComment = await fetch(`${SERVER_SINGLE_BLOG}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({content: comment})
})

setComment('')
}

// Posting likes

const pushLikes = async () =>{
    const postLikes = await fetch(`${SERVER_SINGLE_BLOG}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}
        })
        const data = await postLikes.json()
        

}

React.useEffect(() => {
    fetchLikes()

})

  return (
    <div>
         <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close"> &times; </span>
                <p id="modelMessage">Please sign in to post a comment</p>
                <button id="signInButton">Sign In</button>
            </div>
        </div>
       
        <div id="myModal_info" className="modal">
            <div className="modal-content">
                <span className="close_btn close"> &times; </span>
                <p id="info_modelMessage"></p>
                
            </div>
        </div>

      <div className="article_head">
        <div className="blog_image">
          <img src={blog.image} alt="Blog Image" />
          {load_image? (<div id="loader-element-img" className="container-loader">
            <p>Image Loading ...</p>
            <div id="loader" className="loader"></div>
          </div>): (<div></div>)
}         
        </div>
      </div>
      <div className="blog_title">
        <h1>{blog.title}</h1>
      </div>
      <div
          className="blog_description"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>



      <div className="reaction_section">
        <div className="reaction_status">
          <ul>
            <li>1.1k Views</li>
            <li>
              <span className="n_comments">{comments.length}</span> comments
            </li>
            <li>
              <span className="n_likes">{likes.length}</span> likes
            </li>
           
            <li className="like_icon">
              <i
                className="fa-regular fa-heart"
                id="likeButton"
                aria-hidden="true"
                onClick={pushLikes}
              ></i>
            </li>
          </ul>
        </div>

        <div className="comments">
          <h6>
            <i className="fa fa-comment-o" aria-hidden="true"></i>
            <button type="submit">Add your comment</button>
          </h6>
          <div className="add_comment">
            <textarea
            value={comment}
             onChange={handleCommentChange}
              className="comment_area"
              rows="4"
              cols="30"
              name="message"
              placeholder="Enter your Comment here..."
            ></textarea>
          </div>
         
          <button
            id="post_comment"
            type="submit"
            value={comment}
            style={{border: '1px white solid', borderRadius: '5px'}}
            onClick={pushComment}
          >
            Post Comment
          </button>

          <div className="all_comments">
            {load_comment? (<div id="loader-element-cmt" className="container-loader">
              <p>Waiting 🧐 ...</p>
              <div id="loader" className="loader"></div> </div>) : (<div> 
                {
                    comments.map((comment, i) => (<div key={i} className="comments_given">
                    <i className="fa fa-user-circle-o" aria-hidden="true" style={{marginT: "7px"}} ></i>
                    <div key={i} className="comment_container">
                    
                        <div style={{borderBottom: '#FFFFFF 1px solid'}}>
                            <h4>{comment.name}</h4>
                            <p>{comment.content}</p>
                        </div>
                        </div></div>
                    ))
                }
                <i className="fa fa-user-circle-o" aria-hidden="true" style={{marginT: "7px"}} ></i>
                <div className="comment_container">
                    <div style={{borderBottom: "#FFFFFF 1px solid"}}>
                    <h4>{comments.name}</h4>
                    <p>{comments.content}</p>
                    </div>
                </div>
                </div>
                ) }
            
              
            </div>


          </div>
        </div>
      </div>
    
  );
}

ReactDOM.render(<SingleBlog />, document.getElementById("article"));
