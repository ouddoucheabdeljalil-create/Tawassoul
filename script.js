const fullName = document.getElementById('fullName')
const email = document.getElementById('email-input')
const form = document.getElementById('inputs-form')
const btnSubmit = document.getElementById('btn-submit')
const nameError = document.getElementById('error-name')
const emailrror = document.getElementById('error-email')
const select = document.getElementById("select")
const list = document.getElementById("list")
const search = document.getElementById('search')
const count = document.querySelectorAll('.count')
const formationFilter = document.getElementById('Formation')
const card = document.querySelectorAll('.lists')
const checkBox = document.querySelectorAll(".check")

const data = getFromLocalStorage();
function validRegex() {

    let x = false;
    let y = false
    // const data = getFromLocalStorage() || []
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
            count.forEach(element => element.innerHTML = data.length + 1)
            data.push({ id: data.length + 1, nom: fullName.value, email: email.value, formation: select.value })
            setToLocalStoeage(data)
            //
            afficher(data)
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
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('list')) || []
}

function afficherList() {

    afficher(getFromLocalStorage())

}
function afficher(data) {
    list.innerHTML = ''
    return data.forEach(element => {
        const li = document.createElement('li')
        li.className = 'lists'
        li.dataset.id = element.id
        li.innerHTML = `<input type="checkbox" class="check">
                    <div>
                        <p>${element.nom}</p>
                        <p>${element.email}</p>
                    </div>
                    <p>${element.formation}</p>
                    <button id="btn-sup"><img src="assest/delete.svg"></button>`
        list.appendChild(li)
        afficherNumbreCategory()
    })
}
function rechercher() {

    search.addEventListener('input', () => {
        let word = search.value.toLowerCase()
        let filtred = getFromLocalStorage().filter(e => e.nom.toLowerCase().includes(word) || e.email.toLowerCase().includes(word))
        afficher(filtred)
        if (word === '') {
            afficher(getFromLocalStorage())
        }
        console.log(filtred)
    })

}
function filterByCategory() {

    formationFilter.addEventListener('click', (e) => {

        let x = data.filter(element => element.formation === e.target.id)


        afficher(x)


        if (e.target.id === 'Toutes' || e.target.id === formationFilter.id) afficher(data);


    })
}
function afficherNumbreCategory() {
    const bure = document.getElementById('bure')
    const web1 = document.getElementById('web')
    const lang = document.getElementById('lang')
    const Toutes = document.getElementById('Tout')
    let web = data.filter(element => element.formation === "Web").length
    let Bureautique = data.filter(element => element.formation === "Bureautique").length
    let Langues = data.filter(element => element.formation === "Langues").length
    web1.innerHTML = web
    bure.innerHTML = Bureautique
    lang.innerHTML = Langues
    Toutes.innerHTML = data.length

}
function Supprimer() {

    list.addEventListener('click', (e) => {

        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') {
            console.log(e.target.closest('.lists').dataset.id)
            const sup = getFromLocalStorage().filter(element => element.id !== Number(e.target.closest('.lists').dataset.id))
            setToLocalStoeage(sup)
            afficher(sup)
            afficherNumbreCategory()
        }
    })
}


Supprimer()
filterByCategory()
rechercher()
validRegex()
afficherList()
