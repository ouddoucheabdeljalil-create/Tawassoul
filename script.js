const fullName = document.getElementById('fullName')
const email = document.getElementById('email-input')
const form = document.getElementById('inputs-form')
const btnSubmit = document.getElementById('btn-submit')
const nameError = document.getElementById('error-name')
const emailrror = document.getElementById('error-email')
const select = document.getElementById("select")
const list = document.getElementById("lists")

function validRegex() {
    let x = false;
    let y = false
    const data = []
    const NameRegex = /^[a-zA-Z ]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!NameRegex.test(fullName.value)) {
            nameError.textContent = 'Le nom doit contenir au moins 3 lettres, sans chiffres ni caractères spéciaux.'
        }
        else {
            nameError.textContent = ''
            x = true
        }
        if (!emailRegex.test(email.value)) {
            emailrror.textContent = 'Saisissez un email valide, avec un @ et un point après.'
        }
        else {
            emailrror.textContent = ''
            y = true
        }
        console.log(x)
        console.log(y)
        if (x === true && y === true) {
            data.push({ nom: fullName.value, email: email.value, formation: select.value })
            setToLocalStoeage(data)
            fullName.value = ''
            email.value = ''
        }
        y = false
        x = false
    })

}

function setToLocalStoeage(data) {
    localStorage.setItem('list', JSON.stringify(data))
}
function getFromLocalStorage(){
    return JSON.parse(localStorage.getItem('list'))
}

// function afficherList(){

// }


validRegex()