const SERVER_URL = `https://my-brand-be-sor4.onrender.com/api/v1`
// const  objectData = JSON.parse(localStorage.getItem('object')) || [];
const token = localStorage.getItem('token')

async function readAll(){

    let tabledata = document.querySelector('.data_table')
    
    try{
        const response = await fetch(`${SERVER_URL}/blogs`)
        const data = await response.json()
        let objectData = data.data
       
        let elements = "";
        objectData.map(record =>(
            elements += `
                <tr style="border-radius: 2px;">
                    <td style="padding: 20px;"><img src="${record.image}" alt= "blog_Image_${record.id}" style="width: 20%; height: auto;"></td>
                    <td style="padding: 10px;">${record.title}</td>
                    <td style="padding: 10px;">
                        <button onclick = {edit(${record._id})}><i class="fa fa-pencil" aria-hidden="true"> </i></button>
                        <button onclick = {del(${record._id})}><i class="fa fa-trash" style="color: red;" aria-hidden="true"> </i></button>
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
        const response = await fetch(`${SERVER_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blog)
    })
    if (!response.ok){
        console.log(response.status)
    }else{
    const data = await response.json()
    console.log(blog)
    console.log(data)
    }
    }
    catch(err){
        console.log(err)
    }


    
    // const reader = new FileReader();
    //   reader.onload = function(e) {
       
    //     var newObj = {
    //         id: generateId(), 
    //         blog_image: e.target.result, 
    //         blog_title: blog_title,
    //         blog_content: blog_content,
    //         comments: [],
    //         likes: 0,
    //         isLiked: false

    //     }
    //     objectData.push(newObj);
    //     localStorage.setItem('object', JSON.stringify(objectData))


    // }
    // reader.readAsDataURL(blog_image);  
      
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.create_blog').style.display = 'none';
    readAll();
}

function generateId(){
    return Math.random().toString().substring(2,10)
}


function edit(id){
    
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.update_blog').style.display = 'block';
    document.querySelector('.add_blog').style.display = 'none'
    
    
    var obj = objectData.find(record => record !== record.id)
    
    document.querySelector('.ublog_title').value = obj.blog_title
    document.querySelector('.ublog_image').src = obj.blog_image
    document.querySelector('.ublog_content').value = obj.blog_content
    document.querySelector('.id').value = obj.id

}

function update(){
    var blog_image = document.querySelector('.ublog_image').value;
    var blog_title = document.querySelector('.ublog_title').value;
    var id = parseInt(document.querySelector('.id').value);
    // alert(id)
    var index  = objectData.findIndex(rec => rec.id = id)
    objectData[index] = {id, blog_title, blog_image}
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.update_blog').style.display = 'none';
    readAll()

}
function del(id){
    objectData = objectData.filter(rec => rec.id !== id);
    readAll()
}