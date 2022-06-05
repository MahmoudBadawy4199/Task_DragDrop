let formBtn = document.getElementById("addBtn");
let inputTxt = document.getElementById("project_name__TB");
let subContainers = document.getElementsByClassName('subcontainer');

let data = [];
let htmlArray = Array.from(subContainers);

// get the text from input and add to Progress Section
formBtn.addEventListener('click',addToProgress);
let retreivedData = loadFromLocalStorage("data");
if(retreivedData !== null){
    updateUI(JSON.parse(retreivedData));
} 


function addToProgress(){
    let text = inputTxt.value;
    let ul = subContainers[0].children[1];
    ul.append(createNewListItem(text));
    saveElementsToDataArray();
}

function createNewListItem(text){
    let li = document.createElement('li');
    li.innerText = text;
    li.setAttribute('draggable',true);
    li.addEventListener('dragstart',handleDragStart);
    return li;
}




// set the Drag functions on containers
for (const container of subContainers) {
    container.addEventListener('dragover',handleDragOver);
    container.addEventListener('drop',handleDrop);
}

function handleDragOver(e){
    e.preventDefault();
}

function handleDragStart(ev){
    // which item
    ev.target.id = "dragid"; // Add id to the item
    ev.dataTransfer.setData('taskItem',ev.target.id);
}

function handleDrop(e){
    let data = e.dataTransfer.getData('taskItem');
    let element = document.getElementById(data);
    e.target.append(element);
    element.removeAttribute('id');
    saveElementsToDataArray();
}


// Handle Local Storage 
function saveToLocalStorage(){
    localStorage.setItem("data",JSON.stringify(data));
}

function loadFromLocalStorage(){
    return localStorage.getItem("data");;
}

// Save all data which are inside the containers in an array
function saveElementsToDataArray(){
    data = [];
    for (var i = 0; i < htmlArray.length;i++){
        let obj = {};
        let childCount = htmlArray[i].children[1].childElementCount;
        if(childCount !== 0){
            obj.parent = htmlArray[i].classList[0];
            let values = [];
            for(var j = 0;j <childCount;j++){
                values.push(htmlArray[i].children[1].children[j].innerText);
            }
            obj.values = values;
            data.push(obj);
        }
    }
    saveToLocalStorage();
    }
    

// Updating the Data
function updateUI(arr){
    let htmlParentDiv;
    for(var i = 0 ; i < arr.length;i++){
       htmlParentDiv = arr[i].parent;
       for(var j = 0 ; j < arr[i].values.length;j++){
            bindLoadedDataToHtml(htmlParentDiv,arr[i].values[j]);
       }
    }
}
function bindLoadedDataToHtml(parentDiv,listItemValue){
   let container = document.querySelector("."+parentDiv).children[1];
    container.append(createNewListItem(listItemValue));
}



