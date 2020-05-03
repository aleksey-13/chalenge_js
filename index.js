const modalOptions = {
  title: "This is test",
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, fugiat!</p>",
  width: 500,
  footerButtons: [
    {
      text: "OK",
      type: "outline-success",
      size: "sm",
      handler() {
        modal.close();
      },
    },
    {
      text: "Cancel",
      type: "outline-danger",
      size: "sm",
      handler() {
        modal.close();
      },
    },
  ],
  onClose: () => {
    this.close();
  },
};

const modal = $.modal(modalOptions);

modal.open();
