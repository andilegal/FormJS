class ValidateFormulario {
  constructor() {
    this.form = document.querySelector(".form")
    this.events()
  }
  events() {
    this.form.addEventListener("submit", e =>{
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const fieldsValid =  this.isAllValidField()
    const passwordValid = this.isPasswordValid()

    if(fieldsValid && passwordValid)  {
      alert("Formulario enviado")
      this.form.submit()
    }
  }
  isPasswordValid() {
    let valid = true
    const password = this.form.querySelector(".password")
    const repeatPassword = this.form.querySelector('.repeatPassword')

    if(password.value !== repeatPassword.value) {
      valid = false
      this.createError(password, "Campos senha e repetir senha precisam ser iguais")
      this.createError(repeatPassword, "Campos senha e repetir senha precisam ser iguais")
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false
      this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.')
    }
    return valid
  }

  isAllValidField() {
    let valid = true
    for (let errorText of this.form.querySelectorAll('.error-text')){
      errorText.remove()
    }
    for (let field of this.form.querySelectorAll('.valid')) {
      let label = field.previousElementSibling.innerHTML
      if(!field.value)  {
        this.createError(field, `Campo "${label}" não pode estar em branco`)
        valid = false
      }
      if(field.classList.contains('cpf')){
        if(!this.validateCPF(field)) valid = false
      }
      if(field.classList.contains('user')){
        if(!this.validateUser(field)) valid = false
      }
    }
    return valid
  }
  validateUser(field) {
    const user = field.value
    let valid = true

    if(user.length > 12 || user.length < 3) {
      this.createError(field, 'Usuario precisa ter entre 3 e 12 caracteres.')
      valid = false
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g))  {
      this.createError(field, 'Nome de usuario precisa conter apensa letras e/ou numeros')
    }

    return valid
  }

  validateCPF(field){
    let valid = true
    const cpf = new ValidateCPF(field.value)
    if(!cpf.validate())  {
      this.createError(field, 'Invalid CPF')
      valid = false
    }
    return valid
  }

  createError(field, message) {
    const div = Object.assign(document.createElement('div'),{
      innerHTML:  message,
      classList: "error-text"
    })
    field.insertAdjacentElement('afterend', div)
  }
}

const validate = new ValidateFormulario()