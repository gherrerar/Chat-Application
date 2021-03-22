let sendBtn = document.querySelector(".send-btn")
let input = document.querySelector(".text-input")

let textForm = document.querySelector("#textForm")
let userForm = document.querySelector("#userForm")

sendBtn.addEventListener("mouseenter", function(){
    this.classList.remove("back")
})
sendBtn.addEventListener("mouseleave", function(){

    this.classList.add("back")
})

/*Input Validation*/

input.addEventListener("keyup", disableTest)

function disableTest(){
    if (input.value === "" || input.value.indexOf(" ") == 0){
        sendBtn.classList.add("disabled")
    }
    else {
        sendBtn.classList.remove("disabled")
    }
}

sendBtn.addEventListener("click", function(){
    console.log(input.value)
})