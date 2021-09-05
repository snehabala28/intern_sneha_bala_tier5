let runTimePort = chrome.runtime.connect({
  name: "extPopup"
});

const form = document.forms.myform;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let keyword = form.task.value;
  if(keyword == ""){
      alert("Please enter your query!");
      return false;
  }
  runTimePort.postMessage({
    action: "openNewTab",
    data: keyword
  });

});
const printTab = document.getElementById("print");
printTab.addEventListener("click",(event)=>{
   runTimePort.postMessage({
    action: "printTab"
  });    
});

  