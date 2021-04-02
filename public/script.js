/** Planos:
 *   - Informar quem está digitando;
 *   - Permitir o envio de imagens/GIFs e hyperlinks;
 *   - Janela com a lista de usuários online;
 *   - Filtrar usernames iguais;
 */

let sendBtn = document.querySelector(".send-btn")
let input = document.querySelector(".text-input")
let inputName = document.querySelector(".name-input")
let inputFile = document.querySelector("#input-file")

let textForm = document.querySelector("#textForm")
let userForm = document.querySelector("#userForm")

sendBtn.addEventListener("mouseenter", function(){
    this.classList.remove("back")
})
sendBtn.addEventListener("mouseleave", function(){
    this.classList.add("back")
})




let icon = document.querySelector("#mascot")
icon.addEventListener("mousedown", function(){
    icon.classList.add("clicked")
    setTimeout(function(){
        icon.classList.remove("clicked")
    }, 120)
})




/*Input Validation*/

input.addEventListener("keyup", disableTest)
//input.addEventListener("keypress", nextLine)
inputName.addEventListener("invalid", unableUser)

function disableTest(){
    if (input.value === "" || input.value.indexOf(" ") == 0){
        sendBtn.classList.add("disabled")
    }
    else {
        sendBtn.classList.remove("disabled")
    }
}
// function nextLine(event){
//     if (event.keyCode == 13 && !event.shiftKey){
//         textForm.submit()
//         return false
//     }
// }

function unableUser(){
    this.setCustomValidity("")
    if (!this.validity.valid){
        this.setCustomValidity("Você deve inserir um nome de usuário")
    }
    if (this.validity.patternMismatch){
        this.setCustomValidity("Insira um nome não vazio e sem espaçamento")
    }
}
inputName.oninput = (e) => {
    e.target.setCustomValidity("")
}

sendBtn.addEventListener("click", function(){
    console.log(input.value)
})






/*URL Checking Regex*/

// let splitText = []
// let link = ''
// function checkURL(textToCheck){
    
//     let expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi

//     let regex = new RegExp(expression)
//     let match = ''
//     let startIndex = 0

//     while ((match = regex.exec(textToCheck)) != null){

//         splitText.push({text: textToCheck.substr(startIndex, (match.index - startIndex)),
//                         type: 'text'})
        
//         let cleanedLink = textToCheck.substr(match.index, match[0].length)
//         cleanedLink = cleanedLink.replace(/^https?:\/\//, '')
//         link = cleanedLink
//         splitText.push({text: cleanedLink, type: 'link'})

//         startIndex = match.index + (match[0].length)
//     }
//     if (startIndex < textToCheck.length){
//         splitText.push({text: textToCheck.substr(startIndex), type: 'text'})
//     }

//     console.log(splitText)
//     return splitText
//     //liItem.innerHTML = "<a href=" + textToCheck + ">" + link + "</a>";
// }

function checkURL(textCheck) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    //var imgDomains = [".jpg", ".png", ".gif"]

    return textCheck.replace(urlRegex, (url) => {

        var urlText = url.replace("https://", '')
        
        if (url.lastIndexOf("?") == (url.lenght - 1)){
            url = url.substring(0, url.lenght)
        }
        if ((url.indexOf(".jpg") > 0) || (url.indexOf(".png") > 0) || (url.indexOf(".gif") > 0)){
            return "<img src='" + url + "'>";
        }
        else {
            return "<a class='link' href=" + url + " target='_blank'>" + urlText + "</a>";
        }
    })
}

function showFiles(img, updTest) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        //if (img.lenght > 1) {
            for (let i = 0; i < img.length; i++){
                console.log((i + 1) + " imagem/ns selecionada(s)")
                var reader = new FileReader();
                
                reader.onload = function(readerEvent){
                    var item = document.createElement('li')
                    if (updTest) {
                        item.classList.add("self")
                    }
                    else {
                        item.classList.remove("self")
                    }
                    item.innerHTML = "<span class='name'>" + inputName.value + "</span>" + "    <p>" + "<img src='" + readerEvent.target.result + "'>" + "</p>";
                    messages.appendChild(item)
                }
                reader.readAsDataURL(img[i]);
            }
        /*}
        else {
            console.log("Uma imagem selecionada")
            var reader = new FileReader();
            
            reader.onload = function(readerEvent){
                var item = document.createElement('li')
                item.classList.add("self")
                item.innerHTML = "<span class='name'>" + inputName.value + "</span>" + "    <p>" + "<img src='" + readerEvent.target.result + "'>" + "</p>";
                messages.appendChild(item)
            }
            reader.readAsDataURL(img[0])
        }*/
        
    }
    else {
        return alert('Que pena! -.-\nSeu navegador não possui suporte para essa funcionalidade');
    }
}