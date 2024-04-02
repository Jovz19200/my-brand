const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
const token = localStorage.getItem('token')


async function readAll(){

    let tabledata = document.querySelector('.data_table')
    
    try{
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
            
    
    
        
        

    }
    catch(err){
        console.log(err)
    }
  

   
    

}


function create(){
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.create_blog').style.display = 'block';
}


async function add(){
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

      

        const response = await fetch(`${SERVER_URL}/blogs`, {
            method: 'POST',
            headers: {
               
                'Authorization': `Bearer ${token}`
        },
        body: newBlog
    })
    if (!response.ok){
        console.log(response.status)
    }else{
    const data = await response.json()
   
    }
    }
    catch(err){
        console.log(err)
    }

  
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.create_blog').style.display = 'none';
    readAll();
}






async function editBlog(button){
    console.log('clicked')
    const blogId = button.id
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.update_blog').style.display = 'block';
    document.querySelector('.add_blog').style.display = 'none'
    // console.log(objectData)
    console.log(blogId)
    try{
        const response = await fetch(`${SERVER_URL}/blogs/${blogId}`, {
            method: 'GET', 
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        objectData = data.data
        // console.log(objectData)
    document.querySelector('.ublog_title').value = objectData.title
    document.querySelector('.ublog_image').src = objectData.image
    document.querySelector('.ublog_content').value = objectData.description
    document.querySelector('.id').value = blogId
    }
    catch(err){
        console.log(err)
    }
    

}

async function update(){

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
        document.querySelector('.list_of_blogs').style.display = 'block'
        document.querySelector('.update_blog').style.display = 'none';
        readAll()}
        else{
            console.log(response.status)
        }
        // try{
        //     const response = await fetch(`${SERVER_URL}/blogs/${id}`, {
        //         method: 'GET',
        //         headers:{
        //             'Authorization': `Bearer ${token}`
        //         }
        //     }).then(data => data.json()).then(data => console.log(data))
            
        // }catch(err){
        //     console.log(err)
        // }
    }
    catch{
        console.log(err)
    }

    

}
async function deleteBlog(button){
    
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
    readAll()
    console.log('Deleted')}
}
catch(err){ 
    console.log(err)
}
    }
    // objectData = objectData.filter(rec => rec.id !== id);
    // readAll()
}