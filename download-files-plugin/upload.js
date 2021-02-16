export function upload(selector, options = {}) {
    let files = []
    const onUpload = options.onUpload || noop
    const input = document.querySelector(selector)

    const preview = createElement({ tag: 'div', className: ['preview'] })

    const open = createElement({
        tag: 'button',
        content: 'Открыть',
        className: ['btn'],
    })

    const upload = createElement({
        tag: 'button',
        content: 'Загрузить',
        className: ['btn', 'primary'],
    })
    upload.style.display = 'none'

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', upload)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()

    const changeHandler = (event) => {
        if (!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)
        preview.innerHTML = ''
        upload.style.display = 'inline'

        files.forEach((file) => {
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = (e) => {
                preview.insertAdjacentHTML(
                    'afterbegin',
                    `
                    <div class="preview-image">
                        <div class="preview-remove" data-name="${
                            file.name
                        }">&times;</div>
                        <img src="${reader.result}" alt="${file.name}" />
                        <div class="preview-info">
                            <span>${file.name}</span>
                            <span>${bytesToSize(file.size)}</span>
                        </div>
                    </div>
                    `
                )
            }

            reader.readAsDataURL(file)
        })
    }

    const removeHandler = (event) => {
        if (!event.target.dataset.name) {
            return
        }

        const { name } = event.target.dataset

        files = files.filter((file) => file.name !== name)

        const block = preview
            .querySelector(`[data-name="${name}"`)
            .closest('.preview-image')

        block.classList.add('remove')

        setTimeout(() => block.remove(), 300)

        if (!files.length) {
            upload.style.display = 'none'
        }
    }

    const clearPreview = (node) => {
        node.style.bottom = 0
        node.innerHTML = `<div class="preview-info-progress"></div>`

        return node
    }

    const uploadHandler = () => {
        preview
            .querySelectorAll('.preview-remove')
            .forEach((node) => node.remove())
        const preivewInfo = Array.from(
            preview.querySelectorAll('.preview-info')
        ).map(clearPreview)

        onUpload(files, preivewInfo)
    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandler)
    upload.addEventListener('click', uploadHandler)
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function createElement(options) {
    const { tag, content, className = [] } = options
    const el = document.createElement(tag)

    if (content) {
        el.textContent = content
    }

    if (className) {
        el.classList.add(...className)
    }

    return el
}

function noop() {}
