const form = document.getElementById('form')
const input = document.querySelectorAll('#form input')  
const validated = {
    user:      false, 
    name:      false,
    pass1:     false,
    pass2:     false,
    email:     false,
    phone:     false,
    password1: null,
    password2: null
}
// Expresiones regulares para validar 
const regularExpressions = {
    user:/^[a-zA-Z0-9\_\-]{4,10}$/, //letras, numeros, guiones, rango de caracteres
    name:/^[a-zA-ZÁ-ÿ\s]{4,100}$/,
    pass:/^.{8,}$/,
    mail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone:/^[0-9\+]{9,12}$/,
}
// Comparador de valores (compara las expresiones regulares con los datos ingresados)
const comparator = (value1, value2, idDiv, idSmall) =>{
    if (value1.test(value2)) {
        // valido
        document.getElementById(idDiv).classList.remove('given-not-valid')
        document.getElementById(idDiv).classList.add('given-valid')   
        document.getElementById(idSmall).classList.remove('visible')
        document.getElementById(idSmall).classList.add('invisible')
        return true
    } else {
        // invalido
        document.getElementById(idDiv).classList.add('given-not-valid')
        document.getElementById(idDiv).classList.remove('given-valid')
        document.getElementById(idSmall).classList.remove('invisible') 
        document.getElementById(idSmall).classList.add('visible')
        return false
    }
}
// Valida el input que se está utilizando y luego llama a la funcion de comparacion
const validateForm = (e) => {
    let correctValue = null
    switch (e.target.name) {
        case "user":
           correctValue = comparator(regularExpressions.user, e.target.value, 'divUser','helpUser' )
           validated.user = correctValue? true:false
        break
        case "name":
            correctValue = comparator(regularExpressions.name, e.target.value, 'divName', 'helpName')
            validated.name = correctValue? true:false
        break
        case "phone":
            correctValue = comparator(regularExpressions.phone, e.target.value, 'divPhone', 'helpPhone')
            validated.phone = correctValue? true:false
        break
        case "email":
            correctValue = comparator(regularExpressions.mail, e.target.value, 'divEmail', 'helpEmail')
            validated.email = correctValue? true:false
        break
        case "pass1":
            correctValue = comparator(regularExpressions.pass, e.target.value, 'divPass1', 'helpPass1')
            validated.password1 = e.target.value
            validated.pass1 = correctValue? true:false
        break
        case "pass2":
            validated.password1 = document.getElementById("inputPassword1").value
            validated.password2 = e.target.value    
            if (validated.password1 === validated.password2) {
                correctValue = comparator(regularExpressions.pass, e.target.value, 'divPass2', 'helpPass2')
                validated.pass2 = correctValue? true:false
            } else{
                document.getElementById('divPass2').classList.add('given-not-valid')
                document.getElementById('divPass2').classList.remove('given-valid')
                validated.pass2 = false
            }
        break
    }
}
// Recorre los input y captura el evento al soltar una tecla o presionar fuera de este
input.forEach((input)=>{
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})
// captura el boton de envio
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    if (validated.password1 === validated.password2) {
        if (validated.user & validated.name & validated.pass1 & validated.pass2 & validated.email & validated.phone) {
            alert('Datos llenado correctamente')
        } else { alert('Datos mal llenados, favor revisa la informacion') }
    } else { comparator(regularExpressions.pass, null, 'divPass2', 'helpPass2') }
}) 