
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
    const self = new nElement()
    const element = document.getElementById(id)
    self.setElement(element)
    return self
  }

  setElement(element) {
    const self = this
    self.element = element
    return self
  }

  setText(text = '') {
    const self = this
    self.element.innerText = text
    return self
  }

  setHTML(html = '') {
    const self = this
    self.element.innerHTML = html
    return self
  }

  style(name, value = 'default') {
    const self = this

    if (value === 'default') {
      if (Styles[self.default.element.tagName] && Styles[self.default.element.tagName][name]) {
        value = Styles[self.default.element.tagName][name]
      } else {
        value = Styles['default'][name]
      }
    }

    self.element.style[name] = value

    return self
  }

  attr(name, value) {
    const self = this
    self.element[name] = value
    return self
  }

  on(name, func) {
    const self = this
    self.element.addEventListener(name, func)
    return self
  }

  append(nelement = new nElement) {
    const self = this
    self.element.append(nelement.render())
    return self
  }

  prepend(nelement = new nElement) {
    const self = this
    self.element.prepend(nelement.render())
    return self
  }

  render() {
    const self = this
    self.container.childNodes.forEach(child => child.remove())
    self.container.append(self.element)
    return self.container
  }

  styleContainer(name, value = '') {
    const self = this
    self.container.style[name] = value
    return this.component
  }

  attrContainer(name, value) {
    const self = this
    self.container[name] = value
    return this.component
  }

  eventContainer(name, func) {
    const self = this
    self.container.addEventListener(name, func)
    return this.component
  }

  appendContainer(nelement = new nElement) {
    const self = this
    self.container.append(nelement.render())
    return this.component
  }

  prependContainer(nelement = new nElement) {
    const self = this
    self.container.prepend(nelement.render())
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

  getValue(def = null) {
    const self = this
    return self.element.value || def
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
    const self = this
    self.element.href = url
    return self
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
    const self = this
    self.attr('src', src)
    return self
  }

  alt(alt = '') {
    const self = this
    self.attr('alt', alt)
    return self
  }
}

class nButtonLink extends nLink {
  constructor(){
    super({
      component: { name: 'button-link' },
    })

    this.style('background-color')
    this.style('padding')
    this.style('color')
  }
}

/// components ///

class nTextInputComponent extends nElement {
  label = new nText()
  input = new nTextInput()
  error = new nTextError()

  constructor() {
    super({
      component: { name: 'text-input-component' },
    })

    const self = this

    self.append(self.label)

    self.input.on('keyup', () => self.error.setText(''))
    self.append(self.input)

    self.append(self.error)
  }
}

class nCenterFormComponent extends nElement {
  title = new nH1()
  form = new nElement()
  button = new nButton()
  link = new nLink()

  constructor() {
    super({
      component: { name: 'center-form' },
    })

    const self = this

    self.style('padding')
    self.style('width', '25rem')
    self.style('margin', '0 auto')
    self.style('background-color', '#eee')

    self.title.style('text-align')
    self.append(self.title)

    self.append(self.form)

    self.append(self.button)

    self.link.style('text-align')
    self.append(self.link)
  }
}

class nContainerComponent extends nElement {
  top = new nElement()
  left = new nElement()
  right = new nElement()
  bottom = new nElement()

  constructor() {
    super({
      component: { name: 'container-component' },
    })

    super.append(this.top)

    const middle = new nFlex()

    this.left.styleContainer('width', '69%')
    middle.append(this.left)

    this.right.styleContainer('width', '39%')
    middle.append(this.right)

    super.append(middle)

    super.append(this.bottom)

    super.style('margin', '0 auto')
    super.style('width', '1220px') // FIXME: corrigir tamanho do container a partir da tamanho da tela 
  }

  append() {
    throw new Error('Can not do this.')
  }
}

class nPhotoGalleryComponent extends nElement {
  label = new nText()
  error = new nTextError()

  input = new nFileInput()
  button = new nButton()

  thumbs = []

  constructor() {
    super({
      component: { name: 'photo-gallery' },
    })

    this.build()
  }

  build() {
    const self = this

    super.append(self.label)

    super.append(self.error)

    self.input.on('change', ({ target: { files: [file] } }) => {
      const { name, size, type } = file

      Api.upload(file, { name, size, type })
        .then((response) => {
          const id = response.get('id')
          const url = `http://0.0.0.0/files/uploads/${id}/file`
          const file = { name, size, type, id, url }

          const event = new Event('fileloaded')
          event.file = file
          self.element.dispatchEvent(event)
        })
        .catch((error) => {
          console.error(error)
          const event = new Event('fileerror')
          event.error = error
          self.element.dispatchEvent(event)
        })
    })

    const images_area = new nElement()

    self.on('fileloaded', ({ file }) => {
      const thumb = new nElement()
      thumb.style('height', '8rem')
      thumb.style('width', '8rem')
      thumb.style('padding', '0.5rem')
      thumb.style('background-color', '#ccc')

      const image = new nImage()
      image.src(file.url)
      thumb.append(image)

      images_area.prepend(thumb)
    })

    self.button.setText('Adicionar')
    self.button.style('width', '8rem')
    self.button.style('height', '8rem')
    self.button.on('click', () => self.input.element.click())
    images_area.append(self.button)

    super.append(images_area)
  }

  append() {
    throw new Error('Can not do this.')
  }
}
