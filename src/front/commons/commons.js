
nElement.fromElement(document.body)
  .style('margin', '0')
  .style('padding', '0')
  .style('font-family', 'sans-serif')
  .style('font-size', '16px')

class nWrapper extends nElement {
  constructor() {
    super({
      component: { name: 'wrapper' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('margin', '0 auto')
    this.conditionalStyle('width', [
      { whenWindow: { width: 1366, }, value: '60rem' },
      { whenWindow: { width: 683, }, value: '40rem' },
    ])
  }
}

class nPageHeaderLinks extends nElement {
  wrapper = new nWrapper()

  constructor() {
    super({
      component: { name: 'page-header' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('background-color', '#33ccff')
    this.style('text-align', 'right')

    super.append(this.wrapper)

    const register_link = new nLink()
    register_link.setText('Cadastre-se')
    register_link.href('register.html')
    this.append(register_link)

    const login_link = new nLink()
    login_link.setText('Login')
    login_link.href('login.html')
    this.append(login_link)
  }

  append(link = new nElement()) {
    if (!(link instanceof nLink)) {
      throw new Error('Can not do this.')
    }

    link.styleContainer('display', 'inline')

    link.style('margin', '0rem')
    link.style('padding', '0.25rem')
    link.style('color', '#ffffff')

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
    logo.style('padding', '1rem 0')
    const logo_link = new nLink()
    logo_link.href('/')
    const logo_image = new nImage()
    logo_image.src(Front.url('static', 'images', 'logo.jpg'))
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
      link.styleContainer('padding', '5rem 1rem')
      link.style('color')
      link.setText(text)
      link.href(href)
      menu.append(link)
    })

    flex.append(menu)

    this.wrapper.append(flex)
    super.append(this.wrapper)
  }
}

