export class Site {
    constructor(selector) {
        this.$el = document.querySelector(selector)
    }

    render(model) {
        this.clear()

        model.forEach((block) =>
            this.$el.insertAdjacentHTML('beforeend', block.toHTML())
        )
    }

    clear() {
        this.$el.innerHTML = ''
    }
}
