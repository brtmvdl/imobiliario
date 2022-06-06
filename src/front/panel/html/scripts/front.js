
/// Translator ///

const Translations = {
  'pt-br': {
    'Server error': 'Erro no servidor.',
    'Can not duplicate this item.': 'Não podemos duplicar esse item.',
  },
}

const Translator = {
  in: (language) => ({
    translate: (message) => Translations[language][message.trim()],
  }),
}

/// Flow ///

const Flow = {}

Flow.goTo = (path) => (window.location = path)

/// Styles ///

const Styles = {
  'default': {
    'background-color': '#ccc',
    'border': 'none',
    'box-sizing': 'border-box',
    'color': '#000',
    'display': 'inline-block',
    'font': 'inherit',
    'margin': '1rem',
    'margin-bottom': '0.5rem',
    'outline': 'none',
    'padding': '1rem',
    'text-align': 'center',
    'text-decoration': 'none',
    'width': '100%',
  },
  'h1': {
    'font-size': '2.5rem',
  },
}



/// nElement ///

class nElement {
  container = document.createElement('span')
  element = document.createElement('span')

  default = {
    container: {
      tagName: 'div',
    },
    element: {
      tagName: 'div',
    },
  }

  constructor(options = {}) {
    this.default.container.tagName = options?.container?.tagName || 'div'
    this.default.element.tagName = options?.element?.tagName || 'div'

    this.container = document.createElement(this.default.container.tagName)
    this.element = document.createElement(this.default.element.tagName)

    this.container.classList.add('container')
    this.element.classList.add('element')

    const name = options?.component?.name || 'no-name'
    this.container.classList.add(`ct-${name}`)
    this.element.classList.add(`el-${name}`)

    this.style('margin-bottom', '0.5rem')
    this.style('box-sizing', 'border-box')
  }

  static fromId(id = '') {
    const self = new nElement
    const element = document.getElementById(id)
    self.setElement(element)
    return self
  }

  setElement(element) {
    this.element = element
    return this
  }

  setText(text = '') {
    this.element.innerText = text
    return this
  }

  setHTML(html = '') {
    this.element.innerHTML = html
    return this
  }

  style(name, value = 'default') {
    if (value === 'default') {
      const styles = Styles[this.default.element?.tagName]
        || Styles['default']

      value = styles[name]
    }

    this.element.style[name] = value
    return this
  }

  attr(name, value) {
    this.element[name] = value
    return this
  }

  on(name, func) {
    this.element.addEventListener(name, func)
    return this
  }

  append(nelement = new nElement) {
    this.element.append(nelement.render())
    return this
  }

  prepend(nelement = new nElement) {
    this.element.prepend(nelement.render())
    return this
  }

  render() {
    this.container.childNodes.forEach(child => child.remove())
    this.container.append(this.element)
    return this.container
  }

  styleContainer(name, value = '') {
    this.container.style[name] = value
    return this.component
  }

  attrContainer(name, value) {
    this.container[name] = value
    return this.component
  }

  eventContainer(name, func) {
    this.container.addEventListener(name, func)
    return this.component
  }

  appendContainer(nelement = new nElement) {
    this.container.append(nelement.render())
    return this.component
  }

  prependContainer(nelement = new nElement) {
    this.container.prepend(nelement.render())
    return this.component
  }
}

class nFlex extends nElement {
  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.style('display', 'flex')
  }
}

class nText extends nElement {
  constructor() {
    super({
      component: { name: 'text' },
    })

  }
}

class nTextError extends nElement {
  constructor() {
    super({
      component: { name: 'text-error' },
    })

    this.style('color', 'red')
  }
}

class nH1 extends nText {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.style('font-size', '2.5rem')
    this.style('text-align')
  }
}

class nH2 extends nText {
  constructor() {
    super({
      component: { name: 'h2' },
    })

    this.style('font-size', '2rem')
  }
}

class nH3 extends nText {
  constructor() {
    super({
      component: { name: 'h3' },
    })

    this.style('font-size', '1.5rem')
  }
}

class nTextInput extends nElement {
  constructor() {
    super({
      component: { name: 'text-input' },
      element: { tagName: 'input' },
    })

    this.attr('type', 'text')

    this.style('width')
    this.style('border')
    this.style('outline')
    this.style('font')
    this.style('padding', '0.5rem')
    this.style('display', 'inline-block')
    this.style('box-sizing', 'border-box')
    this.style('box-shadow', '0 0 0.1rem 0 #000')
  }

  getValue() {
    return this.element.value
  }
}

class nButton extends nElement {
  constructor() {
    super({
      component: { name: 'button' },
      element: { tagName: 'button' },
    })

    this.style('background-color')

    this.style('font')
    this.style('width')
    this.style('border')
    this.style('outline')
    this.style('cursor', 'pointer')
    this.style('padding', '0.5rem')
    this.style('display', 'inline-block')
  }
}

class nLink extends nElement {
  constructor() {
    super({
      component: { name: 'link' },
      element: { tagName: 'a' },
    })

    this.style('text-decoration', 'none')
    this.style('display', 'inline-block')
  }

  href(url = '') {
    this.element.href = url
    return this
  }
}

class nFileInput extends nElement {
  constructor() {
    super({
      component: { name: 'file-input' },
      element: { tagName: 'input' },
    })

    this.attr('type', 'file')
  }
}

class nImage extends nElement {
  constructor() {
    super({
      component: { name: 'image' },
      element: { tagName: 'img' }
    })

    this.style('max-width', '100%')

    this.src()
    this.alt()
  }

  src(src = '') {
    this.attr('src', src)
    return this
  }

  alt(alt = '') {
    this.attr('alt', alt)
    return this
  }
}

class nButtonLink extends nLink {
  constructor() {
    super({
      component: { name: 'button-link' },
    })

    this.style('background-color')
    this.style('padding')
    this.style('color')
  }
}

