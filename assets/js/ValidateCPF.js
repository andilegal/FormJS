class ValidateCPF {
  constructor (sendCPF){
    Object.defineProperty(this, "cleanCPF",{
      value: sendCPF.replace(/\D+/g,''),
      writable: false,
      enumerable: true,
      configurable: false
    })
  }

  isSequence()  {
    return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF
  }

  createNewCpf() { 
    const cpfWithoutDigit = this.cleanCPF.slice(0, -2)
    const digit1 = ValidateCPF.createDigit(cpfWithoutDigit)
    const digit2 = ValidateCPF.createDigit(cpfWithoutDigit + digit1) 
    this.newCPF = cpfWithoutDigit + digit1 + digit2
  }

  static createDigit(cpfWithoutDigit) {
    let total = 0
    let reverse = cpfWithoutDigit.length + 1
    for(let stringNumeric of cpfWithoutDigit){
      total += reverse * Number(stringNumeric)
      reverse--
    }
    const digit = 11 - (total % 11)
    return digit <= 9 ? String(digit) : '0'
  }

  validate(){
    if(!this.cleanCPF) return false
    if(typeof this.cleanCPF !== "string") return false
    if(this.cleanCPF.length !== 11) return false
    if(this.isSequence()) return false
    this.createNewCpf()
    return this.newCPF === this.cleanCPF
  }
}