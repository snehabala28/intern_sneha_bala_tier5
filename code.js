var list = [];
var inpstd = document.getElementById("std_ips");
var stdname = document.getElementById("stdlistname");

function getInputValue() {
    if (inpstd.value === "") {
        alert("Please Enter student name before you submit");
    }
    else {if (inpstd.value.length>=20){
            alert("please enter Name within 20 characters!!")
            inpstd.focus()
            return false
        }
        
        if (checkDuplicate(inpstd.value) === "present") {
            alert("Name is already present here,please enter another name!!")
        }
        
        else {
            var val=capitalizeFirstLetter(inpstd.value);
            list.push(val);
            inpstd.value = "";
            showList();
        }
    }
}

function capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

function checkDuplicate(inpVal) {
    for (var i = 0; i < list.length; i++) {
        if (inpVal.toLowerCase() === list[i].toLowerCase()) {
            return "present";
        }
    }
}

function showList() {
    stdname.innerHTML = "";
    list.forEach(function (n, i) {
        stdname.innerHTML += `<li> ${n} <span ><button class="btn1" onclick='deleteItem("${i}")'; type="submit">Remove</button></span></li>`;
    })
}

function deleteItem(i) {
    list.splice(i, 1);
    showList();
}