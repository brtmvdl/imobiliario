
const OBJECT_TYPES = {
  VALIDATION: 'validation',
  RESPONSE_SUCCESS: 'response-success',
  RESPONSE_ERROR: 'response-error',
}

const Validations = {

  required: (errorMessage = 'Informação inválida.') =>
    (value) => value ? null : errorMessage,

  email: (errorMessage = 'E-mail inválido.') =>
    (value) => (!(typeof value === 'string') || !value.match(/@/)) ? errorMessage : null

}

const Validator = {
  response: function (errors = {}) {
    const self = this

    self.type = OBJECT_TYPES.VALIDATION

    self.toJSON = () => errors

    self.get = (name) => {
      const json = self.toJSON()
      return json[name] || null
    }
  },
  with: (params = {}) => ({
    validate: (fields) => new Promise((resolve, reject) => {
      const errors = {}

      Object.keys(fields)
        .map((field_key) => {
          const param = params[field_key]
          const validations = fields[field_key]
          const error = validations?.map((validation) => validation(param)).find(error => error)

          if (error) errors[field_key] = error
        })


      if (Object.keys(errors).length > 0) reject(new Validator.response(errors))
      else resolve()
    })
  })
}

const Ajax = {}

Ajax.BASE_URL = '/api/v1'

Ajax.responseSuccess = function ({ responseText }) {
  const self = this

  self.type = OBJECT_TYPES.RESPONSE_SUCCESS

  self.toJSON = () => JSON.parse(responseText)

  self.getData = () => self.toJSON()['data']

  self.get = (name) => self.getData()[name]
}

Ajax.responseError = function ({ responseText }) {
  const self = this

  self.type = OBJECT_TYPES.RESPONSE_ERROR

  self.toJSON = () => JSON.parse(responseText)

  self.getMessage = () => {
    const json = self.toJSON()
    const message = json['message'] || 'Server error'
    return Translator.in('pt-br').translate(message)
  }
}

Ajax.send = (url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)

    const oncomplete = (xhr) => {
      if ([200, '200'].indexOf(xhr.status) !== -1) {
        resolve(new Ajax.responseSuccess(xhr))
      } else {
        reject(new Ajax.responseError(xhr))
      }
    }

    xhr.onload = () => oncomplete(xhr)
    xhr.onerror = () => oncomplete(xhr)

    xhr.send(data)
  })
}

Ajax.post = (paths, data = {}) =>
  Ajax.send([Ajax.BASE_URL, ...paths].join('/'), JSON.stringify(data))

Ajax.upload = (file, data = {}) => {
  const fd = new FormData()
  fd.append('file', file)
  Object.keys(data).map(key => fd.append(key, data[key]))
  return Ajax.send([Ajax.BASE_URL, 'upload'].join('/'), fd)
}

const Api = {}

Api.login = ({ email }) =>
  Validator.with({ email })
    .validate({
      email: [Validations.email()],
    })
    .then(() => Ajax.post(['users', 'login'], { email }))
    .then(() => Flow.goTo('dashboard.html'))

Api.usersRegister = ({ email, password }) =>
  Validator.with({ email, password })
    .validate({
      email: [Validations.email()],
      password: [Validations.required()],
    })
    .then(() => Ajax.post(['users', 'register'], { email, password }))

Api.upload = (file, { name, size, type }) =>
  Ajax.upload(file, { name, size, type })
