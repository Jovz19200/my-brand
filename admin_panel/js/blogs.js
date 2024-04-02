const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const token = localStorage.getItem('token')
const myModalInfo = document.getElementById('myModal_info')
const closeButtonInfo = document.querySelector('.close_btn')
const loader  = document.getElementById('loader-element')

closeButtonInfo.addEventListener('click', ()=>{
    myModalInfo.style.display = 'none'
});

const info_showModal = async (message) =>{
    document.getElementById('info_modelMessage').textContent = message
    
    myModalInfo.style.display = 'block'
    setTimeout(() => {
        myModalInfo.style.display = 'none'
    }, 3000);
    
}

async function readAll(){

    let tabledata = document.querySelector('.data_table')
    
    try{
        info_showModal('Loading Blogs...')
        loader.style.display = 'block'
        const response = await fetch(`${SERVER_URL}/blogs`)
        const data = await response.json()
        objectData = data.data
    
        let elements = "";
        objectData.map(record =>(
            
            elements += `
                <tr id="${record._id}" style="border-radius: 2px;">
                    <td style="padding: 20px;"><img src="${record.image}" alt= "blog_Image_${record.id}" style="width: 20%; height: auto;"></td>
                    <td style="padding: 10px;">${record.title}</td>
                    <td style="padding: 10px;">
                        <button id="${record._id}" onclick = {editBlog(this)}><i class="fa fa-pencil" aria-hidden="true" onclick = {edit(${record._id})}> </i></button>
                        <button id="${record._id}" onclick = {deleteBlog(this)}><i class="fa fa-trash" style="color: red;" aria-hidden="true"> </i></button>
                    </td>
    
                </tr>
            `
        ))

        tabledata.innerHTML = elements
            
        info_showModal('Blogs Retrieved Successfully')
        loader.style.display = 'none'
    
        
        

    }
    catch(err){
        console.log(err)
    }
  

   
    

}


function create(){
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.create_blog').style.display = 'block';
    info_showModal('Setting you up...')
        // loader.style.display = 'block'
}


async function add(){
    info_showModal('Creating a Blog...')
    loader.style.display = 'block'
    try{
        let blog = {
         image : document.querySelector('.blog_image').files[0],
         title : document.querySelector('.blog_title').value,
         description : document.querySelector('.blog_content').value
        }
        let newBlog = new FormData()
        newBlog.append('image', blog.image)
        newBlog.append('title', blog.title)
        newBlog.append('description', blog.description)

      
        console.log(blog)
        const response = await fetch(`${SERVER_URL}/blogs`, {
            method: 'POST',
            headers: {
               
                'Authorization': `Bearer ${token}`
        },
        body: newBlog
    })
    if (!response.ok){
        info_showModal(`${response.status}`)
        loader.style.display = 'none'
        // console.log(response.status)
        
    }else{
    const data = await response.json()
    loader.style.display = 'none'
    info_showModal('Blog Created Successfully')
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.create_blog').style.display = 'none';
    readAll();
    }
    }
    catch(err){
        console.log(err)
        info_showModal(`${err}`)
    loader.style.display = 'none'
    }

  
    
}






async function editBlog(button){
    info_showModal('Setting you up...')
    loader.style.display = 'block'
    const blogId = button.id
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.update_blog').style.display = 'block';
    document.querySelector('.add_blog').style.display = 'none'
    try{
        const response = await fetch(`${SERVER_URL}/blogs/${blogId}`, {
            method: 'GET', 
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        objectData = data.data
        if(response.ok){
            loader.style.display = 'none'
            info_showModal('Successfully set')
        }
        // console.log(objectData)
    document.querySelector('.ublog_title').value = objectData.title
    document.querySelector('.ublog_image').src = objectData.image
    document.querySelector('.ublog_content').value = objectData.description
    document.querySelector('.id').value = blogId
    }
    catch(err){
        console.log(err)
        info_showModal(`${err}`)
        loader.style.display = 'none'
    }
    

}

async function update(){
    info_showModal('Updating a Blog...')
    loader.style.display = 'block'
    const id = document.querySelector('.id').value;

    let blog = {
        title: document.querySelector('.ublog_title').value,
        image: document.querySelector('.ublog_image').src,
        description: document.querySelector('.ublog_content').value
    }

   
    let updatedBlog = new FormData()
        updatedBlog.append('image', blog.image)
        updatedBlog.append('title', blog.title)
        updatedBlog.append('description', blog.description)
    
       
        
    try{
        const response = await fetch(`${SERVER_URL}/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedBlog),
        }
        )
        const data = await response.json()
        if (response.ok){
        info_showModal('Blog Updated Successfully')
        loader.style.display = 'none'
        document.querySelector('.list_of_blogs').style.display = 'block'
        document.querySelector('.update_blog').style.display = 'none';
        readAll()}
        else{
            console.log(response.status)
            info_showModal(`${response.status}`)
            loader.style.display = 'none'
        }
       
    }
    catch{
        console.log(err)
        info_showModal(`${err}`)
        loader.style.display = 'none'
    }

    

}
async function deleteBlog(button){
    info_showModal('Deleting a Blog...')
    
    const id = button.id
    if(token){
        try{
        const response = await fetch(`${SERVER_URL}/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
    }
})
if(response.ok){
    info_showModal('Blog Deleted Successfully')
    readAll()    
}

    }
    catch(err){ 
        console.log(err)
    }
}else{
    info_showModal('Please Login to Delete a Blog')
}
    // objectData = objectData.filter(rec => rec.id !== id);
    // readAll()
}