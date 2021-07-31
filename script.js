var form = document.getElementById("form");
var txt = document.getElementById("text");
var btnDelete = document.getElementById("delete");
var list = document.getElementById("list");

form.addEventListener("submit", addList);
list.addEventListener("click", deleteItem);
btnDelete.addEventListener("click", deleteAll);
window.onload = loadItems;

function loadItems() {
    var items = localStorage.getItem("item");
    if (items) {
        items = JSON.parse(items);
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-secondary";
            li.appendChild(document.createTextNode(items[i]));
            const a = document.createElement("a");
            a.classList = "delete-item float-right";
            a.setAttribute("href", "#");
            a.innerHTML = "x";
            li.appendChild(a);
            list.appendChild(li);
        }
    }
}

function addList(e) {

    var li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(txt.value));
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = "x";
    li.appendChild(a);
    list.appendChild(li);
    e.preventDefault();

    var items = localStorage.getItem("item");
    if (!items) {
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    items.push(txt.value);
    console.log(items);
    items = localStorage.setItem("item", JSON.stringify(items));

    txt.value = "";

}

function deleteItem(e) {
    var items = JSON.parse(localStorage.getItem("item"));
    var dizi = [];

    if (items) {
        if (e.target.innerHTML == "x") {
            e.target.parentElement.remove();
        }

        for (var i = 0; i < items.length; i++) {
            dizi[i] = items[i];
            dizi[i] = dizi[i] + "x";
            if (e.target.parentElement.textContent == dizi[i]) {
                items.splice(i, 1);
            }
        }

        localStorage.setItem("item", JSON.stringify(items));
    }
    e.preventDefault();
}

function deleteAll(e) {
    list.innerHTML = "";
    localStorage.removeItem("item");
    e.preventDefault();
}