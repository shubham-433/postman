console.log("welcome");
let parametersBox = document.getElementById('parametersBox');
// function to get DOM Element form string 
function getElementFromString(string){
    let div =document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}


// initialize number of parameter 
let addedParamCount=0;



// hide parameters box 
parametersBox.style.display = 'none'
//  if user click on params box then hide json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'

})
//  if user click on json box then hide params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block'
    document.getElementById('parametersBox').style.display = 'none'
})

// if user click on  + button then add parameter 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = `<div class="form-row my-2">
                    <label for="parameterKey1" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
             <div class=col-md-4">
                <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
             </div>
             <div class=" col-md-4">
     
                <input type="text" class="form-control" id="parameterValue${addedParamCount+2}" placeholder="Enter parameter ${addedParamCount+2} value">
             </div>
             <button class="btn btn-primary deleteParam" >-</button>
</div>`
let paramElement=getElementFromString(string);
console.log(paramElement);
params.appendChild(paramElement);


// add an addEventListener to remove the parameters on clicking - sign 
let deleteParam=document.getElementsByClassName('deleteParam');
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();

    })
}
addedParamCount++;
})


// if user click on submit button 
let submit =document.getElementById('submit');
submit.addEventListener('click',()=>{
    // please wait
   
    document.getElementById('responseJsonText').innerHTML ="please wait .... feaching Response"
 
    // feach all teh value user enter 
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let ContentType=document.querySelector("input[name='ContentType']:checked").value;

    // print all value in console 
// console.log('url is',url)
// console.log('requestType is',requestType)
// console.log('ContentType is',ContentType)
// if user param option then collect all the parameter in the object 
if(ContentType=='params'){
    data={};
    for(let i=0; i<addedParamCount+1;i++){
        if(document.getElementById('parameterKey' +(i+1)) != undefined){

            let key=document.getElementById('parameterKey' +(i+1)).value;
            let value=document.getElementById('parameterValue' +(i+1)).value;
            data[key]= value;
        }
        // console.log(data)
    }
    data = JSON.stringify(data);
}else{
   data= document.getElementById('requestJsonText').value;
}
console.log('url is',url)
console.log('requestType is',requestType)
console.log('ContentType is',ContentType)
console.log('data is', data);

// if requestType is get 
if(requestType=='GET'){
    fetch(url,{
        method: 'GET',
    })
    .then(response =>response.text())
    .then((text)=>{
        document.getElementById('responseJsonText').value = text;
        
    })
}
else{
    fetch(url,{
        method: 'POST',
        body :data,
        headers:{
            "Content-type":"application/json ; charset=UTF-8"
        }
    })
    .then(response =>response.text())
    .then((text)=>{
        document.getElementById('responseJsonText').value = text;
    })
}
});
