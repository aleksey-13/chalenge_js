const modalOptions = {
    title: 'This is test',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, fugiat!</p>',
    width: 500,
    onClose: () => {console.log('test')}
}

const modal = $.modal(modalOptions);

modal.open()


