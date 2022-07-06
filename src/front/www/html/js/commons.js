
nElement.fromElement(document.body)
  .setStyle('margin', '0')
  .setStyle('padding', '0')
  .setStyle('font-family', 'sans-serif')
  .setStyle('font-size', '16px')

class nWrapper extends nElement {
  constructor() {
    super({
      component: { name: 'wrapper' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('margin', '0 auto')
    this.conditionalStyle('width', [
      { whenWindow: { width: 1366, }, value: '60rem' },
      { whenWindow: { width: 683, }, value: '40rem' },
    ])
  }
}

class nModal extends nElement {

  header = new nElement()
  body = new nElement()

  constructor() {
    super({
      component: { name: 'modal' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.setStyleContainer('position', 'fixed')
    self.setStyleContainer('background-color', 'rgba(0, 0, 0, .25)')
    self.setStyleContainer('top', '0')
    self.setStyleContainer('bottom', '0')
    self.setStyleContainer('left', '0')
    self.setStyleContainer('right', '0')

    self.onContainer('click', ({ target: { classList } }) => {
      const bgClicked = Array.from(classList).find((cl) => cl === 'ct-modal')
      if (bgClicked) self.close()
    })

    self.setStyle('background-color', 'rgb(255, 255, 255)')
    self.setStyle('margin', '2rem auto')
    self.setStyle('width', '40rem')

    self.header.setStyle('padding', '1rem')
    self.header.setStyle('background-color', '#33ccff')
    self.header.setStyle('color', '#ffffff')
    self.append(self.header)

    self.body.setStyle('padding', '1rem')
    self.append(self.body)

    self.close()
  }

  open() {
    this.setStyleContainer('display', 'inline-block')
  }

  close() {
    this.setStyleContainer('display', 'none')
  }
}

class nTextInputComponent extends nElement {
  label = new nLabel()
  input = new nTextInput()
  error = new nError()

  constructor() {
    super({
      component: { name: 'text-input-component' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.append(self.label)

    self.input.on('keyup', () => self.error.setText(''))
    self.append(self.input)

    self.append(self.error)
  }
}

class nPasswordInputComponent extends nElement {
  label = new nLabel()
  input = new nPasswordInput()
  error = new nError()

  constructor() {
    super({
      component: { name: 'password-input-component' },
    })

    this.build()
  }

  build() {
    const self = this

    self.append(self.label)

    self.input.on('keyup', () => self.error.setText(''))
    self.append(self.input)

    self.append(self.error)
  }
}

class nPageHeaderLinks extends nElement {
  wrapper = new nWrapper()

  register_link = new nLink()
  login_link = new nLink()

  register_modal = new nModal()
  login_modal = new nModal()

  constructor() {
    super({
      component: { name: 'page-header-links' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.setStyle('background-color', '#33ccff')

    self.register_modal.header.setText('Cadastre-se')

    const register_email = new nTextInputComponent()
    register_email.label.setText('E-mail')
    register_email.input.placeholder('E-mail')
    self.register_modal.body.append(register_email)

    const register_password = new nPasswordInputComponent()
    register_password.label.setText('Senha')
    register_password.input.placeholder('Senha')
    self.register_modal.body.append(register_password)

    const register_error = new nError()
    self.register_modal.body.append(register_error)

    const register_save_button = new nButton()
    register_save_button.setStyle('background-color', '#33ccff')
    register_save_button.setStyle('color', '#ffffff')
    register_save_button.setText('Salvar')
    register_save_button.on('click', () => {
      const email = register_email.input.getValue()
      const password = register_password.input.getValue()

      Api.usersRegister({ email, password })
        .then((response) => {
          console.log({ response })
        })
        .catch((error) => {
          switch (error.type) {
            case 'validation': {
              register_email.error.setText(error.get('email'))
              register_password.error.setText(error.get('password'))
            }; break;

            case 'response': {
              register_error.setText(error.getMessage())
            }; break;
          }
        })
    })
    self.register_modal.body.append(register_save_button)

    self.register_link.setText('Cadastre-se')
    self.register_link.href('#')
    self.register_link.on('click', () => self.register_modal.open())
    self.appendLink(self.register_link)
    super.append(self.register_modal)

    self.login_link.setText('Login')
    self.login_link.href('#')
    self.login_link.on('click', () => self.login_modal.open())
    self.appendLink(self.login_link)
    super.append(self.login_modal)

    self.wrapper.setStyle('text-align', 'right')
    super.append(self.wrapper)
  }

  append() {
    throw new Error('Can not do this.')
  }

  appendLink(link = new nElement()) {
    if (!(link instanceof nLink)) {
      throw new Error('Can not do this.')
    }

    link.setStyleContainer('display', 'inline')

    link.setStyle('margin', '0rem')
    link.setStyle('padding', '0.25rem')
    link.setStyle('color', '#ffffff')

    return this.wrapper.append(link)
  }
}

class nPageHeader extends nElement {
  wrapper = new nWrapper()

  constructor() {
    super({
      component: { name: 'page-header' },
    })

    this.build()
  }

  build() {
    super.build()

    const flex = new nFlex

    const logo = new nElement()
    logo.setStyle('padding', '1rem 0')
    const logo_link = new nLink()
    logo_link.href('/')
    const logo_image = new nImage()
    logo_image.src(Front.url('images', 'logo.jpg'))
    logo_link.append(logo_image)
    logo.append(logo_link)
    flex.append(logo)

    const menu = new nFlex()
    const links = [
      { href: '/', text: 'Início' },
      { href: '/venda.html', text: 'Venda' },
      { href: '/locacao.html', text: 'Locação' },
      { href: '/lancamentos.html', text: 'Lançamentos' },
      { href: '/mapa.html', text: 'Mapa' }
    ]

    links.map(({ href, text }) => {
      const link = new nLink()
      link.setStyleContainer('padding', '5rem 1rem')
      link.setStyle('color')
      link.setText(text)
      link.href(href)
      menu.append(link)
    })

    flex.append(menu)

    this.wrapper.append(flex)
    super.append(this.wrapper)
  }
}

