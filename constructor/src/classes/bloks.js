import { row, col, css } from '../utils'

class Block {
    constructor(value, options) {
        this.value = value
        this.options = options
    }

    toHTML() {
        throw new Error('Метод toHTML должен быть реализован!')
    }
}

export class TitleBlock extends Block {
    constructor(value, options) {
        super(value, options)
    }

    toHTML() {
        const { tag = 'h1', styles } = this.options

        return row(col(`<${tag}>${this.value}</${tag}>`), css(styles))
    }
}

export class TextBlock extends Block {
    constructor(value, options) {
        super(value, options)
    }

    toHTML() {
        return row(col(`<p>${this.value}</p>`), css(this.options.styles))
    }
}
export class ColumnsBlock extends Block {
    constructor(value, options) {
        super(value, options)
    }

    toHTML() {
        const columns = this.value.map(col).join(' ')

        return row(columns, css(this.options.styles))
    }
}
export class ImageBlock extends Block {
    constructor(value, options) {
        super(value, options)
    }

    toHTML() {
        const { styles, imageStyles, alt = '' } = this.options

        const img = `<img style="${css(imageStyles)}" alt="${alt}" src="${
            this.value
        }" />`

        return row(img, css(styles))
    }
}
