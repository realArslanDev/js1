const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
    "Elon Musk",
    "Bernard Arnault",
    "Jeff Bezos",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Bill Gates",
    "Warren Buffett",
    "Larry Page",
    "Sergey Brin",
    "Steve Ballmer"
];


const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-index", index);

            listItem.innerHTML = `
        <div class="draggable" draggable="true">
            <span class="number">${index + 1}</span>
            <p class="person-name">${person}</p>
            <i class="fa-solid fa-grip-lines"></i>
        </div>
      `;

            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {

    dragStartIndex = +this.closest("li").getAttribute('data-index');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}


function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");


    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);


    listItems[fromIndex].className = '';
    listItems[toIndex].className = '';
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".person-name").innerText.trim();

        if (personName !== richestPeople[index]) {
            listItem.classList.add("wrong");
            listItem.classList.remove("right");
        } else {
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll("#draggable-list li");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

check.addEventListener("click", checkOrder);