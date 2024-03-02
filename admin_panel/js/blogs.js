let data=[
    { id: 1, blog_image: 'path to image', blog_title: 'Tech stack for starters' },
    { id: 2, blog_image: 'path to image', blog_title: 'How to start Forex Trading 2024' }
]

function readAll(){
    localStorage.setItem('object', JSON.stringify(data));
    var tabledata = document.querySelector('.data_table')
 
    var object = localStorage.getItem('object')
    var objectData = JSON.parse(object)
    var elements = "";

    objectData.map(record =>(
        elements += `
            <tr style="border-radius: 2px;">
                <td style="padding: 20px;">${record.blog_image}</td>
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
    var blog_image = document.querySelector('.blog_image').value;
    var blog_title = document.querySelector('.blog_title').value;

    var newObj = {id: 3, blog_image: blog_image, blog_title: blog_title}
    data.push(newObj);
    console.log(data)
    
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.create_blog').style.display = 'none';
    readAll()
}

function edit(id){
    
    document.querySelector('.list_of_blogs').style.display = 'none'
    document.querySelector('.update_blog').style.display = 'block';
    document.querySelector('.add_blog').style.display = 'none'

    var obj = data.find(rec => rec.id === id);
    document.querySelector('.ublog_title').value = obj.blog_title
    document.querySelector('.ublog_image').value = obj.blog_image
    document.querySelector('.id').value = obj.id

}

function update(){
    var blog_image = document.querySelector('.ublog_image').value;
    var blog_title = document.querySelector('.ublog_title').value;
    var id = parseInt(document.querySelector('.id').value);
    // alert(id)
    var index  = data.findIndex(rec => rec.id = id)
    data[index] = {id, blog_title, blog_image}
    document.querySelector('.list_of_blogs').style.display = 'block'
    document.querySelector('.update_blog').style.display = 'none';
    readAll()

}
function del(id){
    data = data.filter(rec => rec.id !== id)
    readAll()
}