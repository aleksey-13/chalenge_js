class Select {
  constructor({ selector, label, url }) {
    this.selector = selector;
    this.label = label;
    this.url = url;
    (this.technologyes = []),
      (this.selectWrap = document.getElementById(selector));
    this.activeTechnology = null;
  }

  renderEmptySelect() {
    this.selectWrap.innerHTML = `
        <div class="select-field" id="select-field">
            <span>${this.label}</span>
            <p id="selected-technology"></p>
        </div>
      `;
  }

  getTechnologies() {
    return this.url;
  }

  showLoader() {
    return `
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="50px" height="50px" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid">
        
        <g transform="rotate(186.151 50 50)">
            <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#1f76b0" stroke-width="7"></path>
            <path d="M49 3L49 27L61 15L49 3" fill="#1f76b0"></path>
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </g>
    </svg>
`;
  }

  createItemTechnology(technology) {
    return `<li class="select-item" data-index="${technology.id}">${technology.label}</li>`;
  }

  renderListTechnologies() {
    const list = document.createElement("ul");
    list.classList.add("select-list");
    list.innerHTML = this.showLoader();

    const technologies = this.getTechnologies();

    setTimeout(
      () =>
        (list.innerHTML = technologies.map(this.createItemTechnology).join("")),
      100
    );

    this.selectWrap.insertAdjacentElement("beforeend", list);
  }

  /*  setTechnology(id) {
    const selectedTechnology = selectEl.querySelector("#selected-technology");
    const currTechnology = this.technologyes.find(
      (technology) => technology.id === id
    );

    if (activeTechnology) {
      this.activeTechnology.classList.remove("active-item");
    }

    if (!item.classList.contains("active-item")) {
      item.classList.add("active-item");
      selectedTechnology.textContent = item.textContent;
      selectedTechnology.style.display = "block";

      selectEl.querySelector("#select-field > span").style.color = "#1f76b0";
      log.textContent = `Выбран элемент: ${item.textContent}`;
    }

    this.activeTechnology = item;
  }*/
}
