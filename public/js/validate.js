const btn = document.getElementById("btn-up");
const file_up = document.getElementById("file-up");


btn.addEventListener("click",(e)=>{
if(file_up.value == 0) e.preventDefault()
})