const technologies = [
  { label: "JavaScript", id: 0 },
  { label: "JQuery", id: 1 },
  { label: "ReactJS", id: 2 },
  { label: "React Native", id: 3 },
  { label: "Angular", id: 4 },
  { label: "VueJS", id: 5 },
  { label: "NodeJS", id: 6 },
  { label: "TypeScript", id: 7 },
];

const actions = document.getElementById("actions");
const selectEl = document.getElementById("select");
const log = document.getElementById("log");

let isLoading = false;
let activeTechnology;

const select = new Select({
  selector: "select",
  label: "Выберите технологию",
  url: technologies,
});

function init() {
  select.renderEmptySelect();
}

init();

function open() {
  selectEl.classList.add("active");

  if (!activeTechnology) {
    selectEl.querySelector("#select-field").classList.add("active");
  }
}

function close() {
  selectEl.classList.remove("active");

  if (!activeTechnology) {
    selectEl.querySelector("#select-field").classList.remove("active");
  }
}

function showListHandler(e) {
  const element = e.target;

  if (!isLoading) {
    select.renderListTechnologies();
    isLoading = true;
  }

  if (element.classList.contains("select-item")) {
    setActiveTechnology(element);
  }

  if (!element.classList.contains("select-list")) {
    selectEl.classList.contains("active") ? close() : open();
  }
}

selectEl.addEventListener("click", showListHandler);

function setActiveTechnology(item) {
  const selectedTechnology = selectEl.querySelector("#selected-technology");

  if (activeTechnology) {
    activeTechnology.classList.remove("active-item");
  }

  if (!item.classList.contains("active-item")) {
    item.classList.add("active-item");
    selectedTechnology.textContent = item.textContent;
    selectedTechnology.style.display = "block";

    selectEl.querySelector("#select-field > span").style.color = "#1f76b0";
    log.textContent = `Выбран элемент: ${item.textContent}`;
  }

  activeTechnology = item;
}

function clearActiveTechnology() {
  if (activeTechnology) {
    activeTechnology.classList.remove("active-item");
    selectEl.querySelector("#select-field").classList.remove("active");
    selectEl.querySelector("#select-field > span").style.color = "#000";
    selectEl.querySelector("#selected-technology").textContent = "";
    log.textContent = "";
    activeTechnology = null;
  }
}

function destroySelect() {
  actions.removeEventListener("click", setAction);
  selectEl.removeEventListener("click", showListHandler);
  selectEl.remove();
}

function getActiveTechnology() {
  if (activeTechnology) {
    const label = activeTechnology.textContent;
    const idx = activeTechnology.getAttribute("data-index");

    alert(JSON.stringify({ label, idx }));
  } else {
    alert("Ничего не выбрано!");
  }
}

function setAction(e) {
  switch (e.target.dataset.type) {
    case "open":
      showListHandler(e);
      break;
    case "close":
      close();
      break;
    case "set":
      close();
      break;
    case "get":
      getActiveTechnology();
      break;
    case "clear":
      clearActiveTechnology();
      break;
    case "destroy":
      destroySelect();
      break;
    default:
      console.log("NaN");
  }
}

actions.addEventListener("click", setAction);
