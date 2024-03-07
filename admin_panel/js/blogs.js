
var objectData = JSON.parse(localStorage.getItem('object')) || [];

function readAll(){
    // localStorage.setItem('object', JSON.stringify(data));
    var tabledata = document.querySelector('.data_table')
 
   
   
    var elements = "";

    objectData.map(record =>(
        elements += `
            <tr style="border-radius: 2px;">
                <td style="padding: 20px;"><img src="${record.blog_image}" alt= "blog_Image_${record.id}" style="width: 20%; height: auto;"></td>
                <td style="padding: 10px;">${record.blog_title}</td>
                <td style="padding: 10px;">
                    <button onclick = {edit(${record.id})}><i class="fa fa-pencil" aria-hidden="true"> </i></button>
                    <button onclick = {del(${record.id})}><i class="fa fa-trash" style="color: red;" aria-hidden="true"> </i></button>
                </td>

            </tr>
        `
    ))
    tabledata.innerHTML = elements

}


function create(){
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.create_blog').style.display = 'block';
}


function add(){
    var blog_image = document.querySelector('.blog_image').files[0];
    var blog_title = document.querySelector('.blog_title').value;
    var blog_content = document.querySelector('.blog_content').value

    const reader = new FileReader();
      reader.onload = function(e) {
       
        var newObj = {
            id: generateId(), 
            blog_image: e.target.result, 
            blog_title: blog_title,
            blog_content: blog_content,
            comments: [],
            likes: [] 
        }
        objectData.push(newObj);
        localStorage.setItem('object', JSON.stringify(objectData))


    }
    reader.readAsDataURL(blog_image);  
      
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.create_blog').style.display = 'none';
    readAll();
}

function generateId(){
    return Math.random().toString().substring(2,10)
}
console.log(generateId());

function edit(id){
    
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.update_blog').style.display = 'block';
    document.querySelector('.add_blog').style.display = 'none'
    console.log(objectData)
    // var obj = objectData.find(rec => rec.id === 46475561);
    var obj = objectData.find(record => record !== record.id)
    console.log(id)
    console.log(obj)
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
    objectData = objectData.filter(rec => rec.id !== id)
    console.log(id)
    console.log(objectData)
    readAll()
}