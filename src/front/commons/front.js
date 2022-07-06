
const Translations = {
  'pt-br': {
    'request entity too large': 'Essa solicitação está além do esperado.',
    'Can not duplicate this item.': 'Não podemos duplicar esse cadastro.',
    'User not found.': 'Não encontramos esse e-mail. Verifique seu cadastro.',
  }
}

const Translator = ({
  in: (language) => ({
    speak: (phrase) => {
      const phrases = Translations[language]

      if (phrases) {
        return phrases[phrase] || 'no translation'
      }
    }
  })
})

const Styles = {
  'default': {
    'background-color': '#cccccc',
    'padding-bottom': '0.5rem',
    'margin-bottom': '0.5rem',
    'text-align': 'center',
    'padding': '0.5rem',
    'margin': '0.5rem',
    'width': '100%',
    'color': '#000',
  }
}

const Front = {
  url: (...path) => `http://0.0.0.0/${path.join('/')}`,

  apiUrl: (...path) => `http://0.0.0.0/api/v1/${path.join('/')}`,
  apiUrlPath: (...path) => path.join('/'),

  setData: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  getData: (name) => JSON.parse(localStorage.getItem(name)),

  dateDiff: (date = new Date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    switch (true) {
      case diff < 60: return 'Agora mesmo'
      case diff < 60 * 60: return 'Há poucos minutos'
      case diff < 60 * 60 * 48: return `Há ${Math.floor(diff / (60 * 60))} horas`
    }

    return `Há ${Math.floor(diff / (60 * 60 * 24))} dias`
  }
}

const Str = {
  normalizeSpecialChar: (letter) => {
    switch (letter) {
      case ' ':
      case '!':
      case '@':
      case '#':
      case '%':
      case '&':
      case '*':
      case '<':
      case '>':
      case '(':
      case ')':
      case '{':
      case '}':
      case '[':
      case ']':
      case '+':
      case '-':
      case '_':
      case '=':
      case ',':
      case '.':
      case ':':
      case ';':
      case '?':
      case '|':
      case '|':
      case '/':
      case '"':
      case '\'':
      case '\\':
        letter = '-';
        break;

      case '$':
        letter = 's'
        break;

      case 'á':
      case 'à':
      case 'â':
      case 'ã':
        letter = 'a';
        break;

      case 'é':
      case 'ê':
        letter = 'e';
        break;

      case 'í':
        letter = 'i';
        break;

      case 'ó':
      case 'ô':
      case 'ò':
      case 'õ':
        letter = 'o';
        break;

      case 'ú':
      case 'ü':
        letter = 'u';
        break;

      case 'ç':
        letter = 'c';
        break;
    }

    return letter
  },

  toURL: (str) => {
    return str.toString()
      .split('').map(letter => Str.normalizeSpecialChar(letter))
      .join('').replace(/[-]+/ig, '-').replace(/^-|-$/ig, '')
      .trim().toLowerCase()
  }
}

const Flow = {}

Flow.page = (pathname, { search = '' }) => {
  const url = new URL(window.location)
  url.pathname = pathname
  url.search = new URLSearchParams(search)

  window.location = url
}

Flow.goTo = (address) => (window.location = address)

class nElement {

  id = null

  container = document.createElement('div')
  element = document.createElement('div')

  options = {}
  logs = {
    element: [],
    container: [],
  }

  constructor(options = {}) {
    this.options = options
  }

  build() {
    if (this.options?.element?.tagName) {
      this.element = document.createElement(this.options.element.tagName)
    }

    if (this.options?.container?.tagName) {
      this.container = document.createElement(this.options?.container?.tagName)
    }

    const name = this.options?.component?.name || undefined
    this.container.classList.add(`ct-${name}`)
    this.element.classList.add(`el-${name}`)

    this.setStyle('outline', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  static fromElement(el, options = {}) {
    const component = new nElement(options)
    component.loadElement(el)
    return component
  }

  static fromId(id, options) {
    return nElement.fromElement(document.getElementById(id), options)
  }

  loadElement(element) {
    this.logs.element.push(['loadElement', element])
    this.element = element
    return this
  }

  focus() {
    this.logs.element.push(['focus'])
    this.element.focus()
    return this
  }

  placeholder(text = '') {
    this.attr('placeholder', text)
    return this
  }

  attr(name, value) {
    this.logs.element.push(['attr', name, value])
    if (value !== null) {
      this.element.setAttribute(name, value)
      return this
    } else {
      return this.element.getAttribute(name)
    }
  }

  data(name, value) {
    this.logs.element.push(['data', name, value])
    if (value !== undefined) {
      this.element.dataset[name] = value
      return this
    } else {
      return this.element.dataset[name]
    }
  }

  setStyle(name, value = 'default') {
    this.logs.element.push(['style', name, value])

    if (value === 'default') {
      const style = Styles[this.options?.element?.tagName] || Styles['default']
      value = style[name]
    }

    this.element.style[name] = value
    return this
  }

  conditionalStyle(name, conditions = []) {
    const self = this

    conditions.map(({ whenWindow, value }) => {
      let isset = false

      if (whenWindow.width) {
        if (whenWindow.width === window.innerWidth) {
          isset = true
        }
      }

      if (isset === true) {
        self.setStyle(name, value)
      }
    })
  }

  setStyleContainer(name, value) {
    this.logs.container.push(['style', name, value])

    if (value === 'default') {
      const style = Styles[this.options?.container?.tagName] || Styles['default']
      value = style[name]
    }

    this.container.style[name] = value
    return this
  }

  id(id) {
    this.logs.element.push(['id', id])
    return this.data(id)
  }

  setText(text) {
    this.logs.element.push(['setText', text])
    this.element.innerText = text || ''
    return this
  }

  getText() {
    this.logs.element.push(['getText'])
    return this.element.innerText
  }

  clear() {
    this.logs.element.push(['clear'])
    this.element.childNodes.forEach(node => node.remove())
    return this
  }

  erase() {
    this.logs.element.push(['erase'])
    this.element.value = ''
    return this
  }

  append(nelement = new nElement) {
    this.logs.element.push(['append', nelement])
    this.element.append(nelement.render())
    return this
  }

  set(nelement = new nElement) {
    this.logs.element.push(['set', nelement])
    this.element.childNodes.forEach(c => c.remove())
    this.element.append(nelement.render())
    return this
  }

  on(name, func) {
    this.logs.element.push(['on', name])
    this.element.addEventListener(name, func)
    return this
  }

  onContainer(name, func) {
    this.logs.container.push(['onContainer', name])
    this.container.addEventListener(name, func)
    return this
  }

  render() {
    this.logs.element.push(['render'])
    this.container.append(this.element)
    return this.container
  }
}

class nValuable extends nElement {

  disable() {
    this.attr('disabled', true)
    return this
  }

  enable() {
    this.attr('disabled', '')
    return this
  }

  setValue(value) {
    this.element.value = value
    return this
  }

  getValue() {
    return this.element.value
  }

}

class nTextInput extends nValuable {
  constructor() {
    super({
      component: { name: 'text-input' },
      element: { tagName: 'input' },
    })

    this.build()
  }

  build() {
    super.build()

    this.attr('type', 'text')

    this.setStyle('box-shadow', '0 0 0.1rem 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5rem 0')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
    this.setStyle('padding')
  }
}

class nPasswordInput extends nValuable {
  constructor() {
    super({
      component: { name: 'password-input' },
      element: { tagName: 'input' }
    })

    this.build()
  }

  build() {
    super.build()

    this.attr('type', 'password')

    this.setStyle('box-shadow', '0 0 0.1rem 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5rem 0')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
    this.setStyle('padding')
  }
}

class nTextarea extends nValuable {
  constructor() {
    super({
      component: { name: 'textarea' },
      element: { tagName: 'textarea' }
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('box-shadow', '0 0 0.1rem 0 black')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5rem 0')
    this.setStyle('padding')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('resize', 'none')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }

  setRows(rows) {
    this.element.rows = rows
    return this
  }
}

class nFileInput extends nValuable {
  constructor() {
    super({
      component: { name: 'file-input' },
      element: { tagName: 'input' }
    })

    this.build()
  }

  build() {
    super.build()

    this.attr('type', 'file')

    const self = this

    self.on('change', ({ target: { files } }) => {
      Array.from(files).forEach((file) => {
        const { name, size, type } = file

        Api.upload(file, { name, size, type })
          .then((response) => {
            const event = new Event('fileloaded')
            event.file = { name, size, type, id: response.get('id') }
            self.element.dispatchEvent(event)
          })
          .catch((error) => {
            const event = new Event('fileerror')
            event.error = error
            self.element.dispatchEvent(event)
          })
          .finally(() => self.element.dispatchEvent(new Event('uploadend')))

        self.element.dispatchEvent(new Event('uploadstart'))
      })
    })
  }

  multiple() {
    this.attr('multiple', true)
    return this
  }

  accept(accept = '*/*') {
    this.attr('accept', accept)
    return this
  }
}

class nTextError extends nElement {
  constructor() {
    super({
      component: { name: 'text-error' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('margin-bottom', '0.5rem')
    this.setStyle('color', 'red')
  }
}

class nLabel extends nElement {
  constructor() {
    super({
      component: { name: 'label' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('margin-bottom', '0.5rem')
  }
}

class nH1 extends nElement {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyleContainer('display', 'inline-block')
    this.setStyleContainer('width', '100%')

    this.setStyle('font-size', '3rem')
    this.setStyle('margin-bottom')
    this.setStyle('text-align')
  }
}

class nH2 extends nH1 {
  constructor() {
    super({
      component: { name: 'h2' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('font-size', '1.5rem')
  }
}

class nH3 extends nH2 {
  constructor() {
    super({
      component: { name: 'h3' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('font-size', '1.25rem')
  }
}

class nButton extends nElement {
  constructor() {
    super({
      component: { name: 'button' },
      element: { tagName: 'button' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('display', 'inline-block')
    this.setStyle('margin', '0 0 0.5rem 0')
    this.setStyle('padding')
    this.setStyle('cursor', 'pointer')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('background-color', '#dddddd')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }
}

class nLink extends nElement {
  constructor() {
    super({
      component: { name: 'link' },
      element: { tagName: 'a' }
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyleContainer('text-align')

    this.setStyle('text-decoration', 'none')
    this.setStyle('display', 'inline-block')
  }

  href(url) {
    this.element.href = url
    return this
  }
}

class nButtonLink extends nLink {
  constructor() {
    super({
      component: { name: 'button-link' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyleContainer('width', '100%')

    this.setStyle('background-color', '#cccccc')
    this.setStyle('cursor', 'pointer')
    this.setStyle('padding')
    this.setStyle('color', '#000')
    this.setStyle('width', '100%')
  }
}

class nFlex extends nElement {
  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('display', 'flex')
    this.setStyle('justify-content', 'space-between')
  }
}

class nImage extends nElement {
  constructor() {
    super({
      component: { name: 'image' },
      element: { tagName: 'img' }
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('max-width', '100%')
  }

  src(src) {
    return this.attr('src', src)
  }

  alt(alt) {
    this.attr('alt', alt)
    return this
  }
}

class nSelect extends nValuable {
  optionElements = []

  constructor() {
    super({
      component: { name: 'select' },
      element: { tagName: 'select' }
    })

    this.build()
  }

  build() {
    super.build()

    this.setStyle('box-shadow', '0 0 0.1rem 0 black')
    this.setStyle('background-color', '#ffffff')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 0 0.5rem 0')
    this.setStyle('outline', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('border', 'none')
    this.setStyle('padding')
    this.setStyle('width')
  }

  appendOption({ key = '', value }) {
    this.optionElements.push({ key, value })
    const option = document.createElement('option')
    option.value = key
    option.innerText = value
    this.element.append(option)

    return this
  }

  loadFromURL(url) {
    const self = this

    Ajax.post([url])
      .then((response) => response.get('list').map((item) => self.appendOption(item)))
      .catch((error) => {
        const event = new Event('error')
        event.error = error
        self.element.dispatchEvent(event)
      })

    return self
  }
}

class nNotation extends nElement {
  collection = new nElement()
  input = new nTextInput()

  phrases = []

  constructor() {
    super({
      component: { name: 'notation' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.input.on('keyup', (ev) => {
      ev.preventDefault()

      switch (ev.keyCode.toString()) {
        case '188':
        case '13':
          self.addPhrase(self.input.getValue())
          break;
      }
    })
    self.append(self.input)

    self.collection.setStyle('clear', 'both')
    self.append(self.collection)
  }

  addPhrase(phrase) {
    this.phrases.push(phrase)

    const el = new nElement()

    el.setStyle('margin', '0.5rem 0.5rem 0.5rem 0')
    el.setStyle('background-color', '#dddddd')
    el.setStyle('border-radius', '0.1rem')
    el.setStyle('display', 'inline')
    el.setStyle('padding', '0.5rem')
    el.setStyle('float', 'left')

    el.setText(phrase.replace(',', ''))

    this.collection.append(el)
    this.input.erase()
  }

  getValue() {
    return this.phrases
  }
}

class nError extends nElement {
  constructor() {
    super({
      component: { name: 'error' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.setStyle('margin-bottom', '0.5rem')
    self.setStyle('color', 'red')
  }
}
