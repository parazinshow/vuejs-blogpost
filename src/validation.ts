export interface Status{
  valid: boolean
  message?: string
}

// tipo Rule recebe como parametro um valor do tipo String e retorna um valor do tipo Status
type Rule = (value: string) => Status

export function length ({ min, max }: { min: number, max: number }): Rule {
  return function (value: string): Status {
    const result = Boolean(value.length >= min && value.length <= max)

    return {
      valid: result,
      message: result ? undefined : `This field must be between ${min} and ${max}`
    }
  }
}

//funçao arrow required é do tipo Rule que recebe uma string como parametro e retorna um valor do tipo Status
export const required: Rule = (value: string): Status =>{
  const result = Boolean(value)

  return {
    valid: result,
    message: result ? undefined : 'This field is required'
  }
}


//funçao principal que recebe os chamados, ela recebe dois parametros, o a variavel string que será validada, e um array do tipo Rule onde será passado as funçoes de validação a serem executadas.
//Essa função retorna um valor do tipo Status.
export function validate(value:string , rules: Rule[]): Status{
  
  for(const rule of rules){
    const result = rule(value)
    if(!result.valid){
      return result
    }
  }

  return {
    valid: true
  }

}