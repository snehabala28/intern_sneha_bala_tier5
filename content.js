const runTimePort = chrome.runtime.connect({
  name: "extNotify"
});
let html='<div class="container" style="position: absolute;top: 0;background:linear-gradient(#e66465, #9198e5);;width: 256px;">'+
  '<form name="notyForm" method="POST">'+
    '<div class="row">'+
        '<input type="text" id="title" name="title" placeholder="Enter notification title..">'+
    '</div>'+
    '<div class="row">'+
        '<textarea name="description" id="description" placeholder="Write something.." row="5"></textarea>'+
    '</div>'+
    '<div class="row">'+
      '<input type="submit" id="notiSubmit" value="Send">'+
    '</div>'+
  '</form>'+
'</div>';


const myName='Sneha Bala';
document.title = myName;
document.querySelector("body").insertAdjacentHTML("beforeend", html);

const notiSend = document.getElementById("notiSubmit");
notiSend.addEventListener("click",(event)=>{
  event.preventDefault();
   runTimePort.postMessage({
    action: "notify",
    data: {
      title:document.getElementById("title").value,
      description:document.getElementById("description").value
    }

  });    
});
