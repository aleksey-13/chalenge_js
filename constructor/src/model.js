import image from './assets/img.png'

import {
    TitleBlock,
    TextBlock,
    ColumnsBlock,
    ImageBlock
} from './classes/bloks'

export const model = [
    new TitleBlock('Test h2', {
        tag: 'h2',
        styles: {
            color: 'red',
            'text-align': 'center',
            background: '#dedede',
            padding: '1rem'
        }
    }),
    new TextBlock('Hello world', {
        styles: { color: 'blue', 'font-size': '16px', 'font-weight': 'bold' }
    }),
    new ColumnsBlock(['1111111111', '2222222222', '333333333', '44444444444'], {
        styles: { color: 'yellow', 'font-size': '16px' }
    }),
    new ImageBlock(image, {
        styles: { background: 'rgba(0,0,0,.3)' },
        imageStyles: { width: '500px', height: 'auto', margin: '0 auto' },
        alt: 'img'
    })
]
