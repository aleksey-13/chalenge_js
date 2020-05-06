$.confirm = function (options) {
    const { title, content } = options;
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title,
            width: 400,
            closable: false,
            content,
            onClose: () => modal.destroy(),
            footerButtons: [
                {
                    text: "Отмена",
                    type: "outline-success",
                    size: "sm",
                    handler() {
                        modal.close();
                        reject()
                    },
                },
                {
                    text: "Удалить",
                    type: "outline-danger",
                    size: "sm",
                    handler() {
                        modal.close();
                        resolve()
                    }
                }
            ]
        })

        setTimeout(modal.open, 100)
    })
}