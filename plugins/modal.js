function _createModal(options) {
  const {
    title = "",
    closable = true,
    content = "",
    width = 400,
    onClose = () => {},
    onOpen = () => {},
  } = options;

  const modal = document.createElement("div");

  const btnClose = closable
    ? '<button class="btn btn-outline-light btn-header-close" data-close>&times</button>'
    : "";

  modal.classList.add("c_modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
          <div class="c_modal-overlay" data-close> 
            <div class="c_modal-window" style="width: ${width}px">
              <div class="c_modal-header">
                <span class="c_modal-title">${title}</span>
                ${btnClose}
              </div>
              <div class="c_modal-body">${content}</div>
              <div class="c_modal-footer">
                <button class="btn btn-outline-success btn-sm">Ok</button>
                <button class="btn btn-outline-danger btn-sm" onclick="${onClose()}">Close</button>
              </div>
            </div>
          </div>`
  );

  document.body.appendChild(modal);

  return modal;
}

$.modal = function (options) {
  const $modal = _createModal(options);

  let isActive;

  const { open, close } = {
    open() {
      if (!isActive) {
        $modal.classList.add("show");
        isActive = true;
      }
    },
    close() {
      const SPEED_ANIMATION = 200;

      $modal.classList.remove("show");
      $modal.classList.add("hide");

      setTimeout(() => {
        $modal.classList.remove("hide");
        isActive = false;
      }, SPEED_ANIMATION);
    },
  };

  const closeModal = (e) => {
    if (e.target.getAttribute("data-close") !== null) {
      close();
    }
  };

  $modal.addEventListener("click", closeModal);

  return {
    open,
    close,
    destroy() {
      $modal.removeEventListener("click", closeModal);
      $modal.remove();
    },
    setContent(html) {
      const body = $modal.querySelector(".c_modal-body");
      body.innerHTML = html;
    },
  };
};
