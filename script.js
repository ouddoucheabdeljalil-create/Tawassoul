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

const data =  getFromLocalStorage() ;
function validRegex() {
    
    let x = false;
    let y = false
    const data = getFromLocalStorage() || []
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
            count.forEach(element => element.innerHTML = data.length+1)
            data.push({ nom: fullName.value, email: email.value, formation: select.value })
            setToLocalStoeage(data)
            // list.innerHTML = ''
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
    // list.innerHTML=''
    afficher(data)
  
}
function afficher(data){
     list.innerHTML=''
    return  data.forEach(element => {
        const li = document.createElement('li')
        li.className = 'lists'
        li.innerHTML = `<input type="checkbox">
                    <div>
                        <p>${element.nom}</p>
                        <p>${element.email}</p>
                    </div>
                    <p>${element.formation}</p>
                    <button>Supprimer</button>`
        list.appendChild(li)
    })
}
function rechercher(){
   
    search.addEventListener('input', (e) => {
        let word = search.value.toLowerCase()
        let filtred = data.filter(e => e.nom.toLowerCase().includes(word) || e.email.toLowerCase().includes(word))
        // list.innerHTML=''
       afficher(filtred)
       if(word === ''){
        // list.innerHTML=''
        afficher(data)}
        console.log(filtred)
    })
    
}
function filterByCategory(){
    formationFilter.addEventListener('click', (e) => {
       
        let x = data.filter(element => element.formation === e.target.id )
        afficher(x)
       
        
        if(e.target.id === 'Toutes' || e.target.id === formationFilter.id)afficher(data);
        
        
    })
}


filterByCategory()
rechercher()
validRegex()
afficherList()
