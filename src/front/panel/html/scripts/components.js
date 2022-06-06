nElement.fromId('body')
.style('font-family', 'sans-serif')
.style('background-color', '#ddd')

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
  subtitle = new nH3()
  error = new nTextError()
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

    self.subtitle.style('text-align')
    self.append(self.subtitle)

    self.error.style('text-align')
    self.append(self.error)

    self.append(self.form)

    self.append(self.button)

    self.link.styleContainer('text-align', 'center')
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
