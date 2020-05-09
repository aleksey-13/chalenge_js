/*
class Select {}

const select = new Select({
    selector: '#select',
    label: 'Выберите технологию',
    url: 'https://vladilen-dev.firebaseio.com/technologies.json',
    onSelect(selectedItem) {}
})
*/

const actions = document.getElementById("actions");
const select = document.getElementById("select");
const selectField = document.getElementById("select-field");
const selectedTechnology = document.getElementById("selected-technology");

const loader = `
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

function setAction(e) {
  console.log(e.target.dataset.type);

  switch (e.target.dataset.type) {
    case "open":
      showList();
      break;
    case "close":
      closeList();
      break;
    default:
      console.log("NaN");
  }
}

function showList() {
  select.classList.add("active");
}

function closeList() {
  select.classList.remove("active");
}

selectField.addEventListener("click", () => {
  if (select.classList.contains("active")) {
    closeList();
  } else {
    showList();
  }
});

actions.addEventListener("click", setAction);
