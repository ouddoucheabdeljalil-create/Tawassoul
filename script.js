 const fullName = document.getElementById('fullName')
 const email = document.getElementById('email-input')
 const form = document.getElementById('inputs-form')
 const btnSubmit  = document.getElementById('btn-submit')
 const nameError = document.getElementById('error-name')
 const emailrror = document.getElementById('error-email')

 function validName(){
    const NameRegex = /^[^ ][a-zA-Z]{3,}$/
    form.addEventListener('submit' ,(e) =>{
        e.preventDefault()
         if(!NameRegex.test(fullName.value)){
        nameError.textContent = 'Le nom doit contenir au moins 3 lettres, sans chiffres ni caractères spéciaux.'
        console.log(fullName.value)  
     
    }
    else{
        nameError.textContent = ''
      
    }
    })
   
   
 }

 function validEmail(){
    const emailRegex = /^[^ ][a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    form.addEventListener('submit' ,(e) =>{
        e.preventDefault()
         if(!emailRegex.test(email.value)){
        emailrror.textContent = 'Saisissez un email valide, avec un @ et un point après.'
        console.log(email.value) 
       
    }
    else{
        emailrror.textContent = ''
        
    }
    })

 }
btnSubmit.addEventListener('submit' , (e) =>{
    e.preventDefault()
    console.log('eeee')
})

validEmail()
 validName()


//  let caractr = "absd1.2345678"
//  let car = /\./g;
//  console.log(caractr.match(car));