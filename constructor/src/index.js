import { model } from './model'
const $site = document.getElementById('site')

model.forEach((block) => {
    let html = ''

    if (block.type === 'title') {
        html = createBlock(block.value, 'h1')
    } else if (block.type === 'text') {
        html = createBlock(block.value)
    } else if (block.type === 'columns') {
        html = createBlock(block.value)
    } else if (block.type === 'image') {
        html = createImg(block.value)
    }

    $site.insertAdjacentHTML('beforeend', html)
})

function createBlock(value, tag) {
    let columns

    if (Array.isArray(value)) {
        columns = value.map((v) => createCol(v, tag)).join(' ')
    } else {
        columns = createCol(value, tag)
    }

    return createRow(columns)
}

function createImg(src) {
    const image = `<img src="${src}" />`
    return createRow(image)
}

function createRow(el) {
    return `<div class="row">${el}</div>`
}

function createCol(value, tag = 'p') {
    return `
        <div class="col-sm">
            <${tag}>${value}</${tag}>
        </div>
    `
}
