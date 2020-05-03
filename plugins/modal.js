function _createModalFooter(buttons) {
  const footer = document.createElement("div");
  footer.classList.add("c_modal-footer");

  buttons.forEach((button) => {
    const { text, type = "primary", size = "", handler = () => {} } = button;

    const btn = document.createElement("button");

    if (size !== "") {
      btn.classList.add(`btn-${size}`);
    }

    btn.className = `btn btn-${type}`;
    btn.textContent = text;
    btn.onclick = handler;

    footer.appendChild(btn);
  });

  return footer;
}

function _createModal(options) {
  const {
    title = "",
    closable = true,
    content = "",
    width = 400,
    footerButtons = [],
    onClose = () => {},
    onOpen = () => {},
  } = options;

  const btnClose = closable
    ? '<button class="btn btn-outline-light btn-header-close" data-close>&times</button>'
    : "";

  const modal = document.createElement("div");

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
            </div>
          </div>`
  );

  if (footerButtons.length > 0) {
    const footer = _createModalFooter(footerButtons);

    modal
      .querySelector(".c_modal-window")
      .insertAdjacentElement("beforeend", footer);
  }

  document.body.appendChild(modal);

  return modal;
}

$.modal = function (options) {
  const $modal = _createModal(options);

  let isActive, isDestroyed;

  const { open, close } = {
    open() {
      if (!isActive && !isDestroyed) {
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

  const modalListener = (e) => {
    if (e.target.getAttribute("data-close") !== null) {
      close();
    }
  };

  $modal.addEventListener("click", modalListener);

  return {
    open,
    close,
    destroy() {
      $modal.removeEventListener("click", modalListener);
      $modal.remove();
      isDestroyed = true;
    },
    setContent(html) {
      $modal.querySelector(".c_modal-body").innerHTML = html;
    },
  };
};
