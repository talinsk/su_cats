async function renderCatInfo(catId) {
    const cat = await getCatInfo(catId);
    document.querySelector(".catName").innerText = cat.name;
    const fields = getFields();
    fields.forEach(f => {
        const elVal = f.querySelector(".catValue");
        elVal.innerText = cat[f.getAttribute("data-field")];
    });

    document.getElementById("photoContainer").innerHTML = `<img class="photoWrap" alt="cat" src="${cat["img_link"]}">`;
    renderButtonsNormalMode(catId);
}

function editCat(catId) {
    const container = document.getElementsByClassName("infoWrap")[0];
    const cloneContainer = container.cloneNode(true);
    
    const fields = getFields();

    fields.forEach(f => {
        const elVal = f.querySelector(".catValue");
        const input = f.getAttribute("data-field") === "description" ? document.createElement("textarea") : document.createElement("input");
        input.type = "text";
        input.value = elVal.innerText;
        f.appendChild(input);
        elVal.remove();
    });

    renderButtonsEditMode(catId, cloneContainer, container);
}

function getBody() {
    const fields = getFields();

    const body = {};
    fields.forEach(f => {
        const elInp = f.getAttribute("data-field") === "description" ? f.querySelector("textarea") : f.querySelector("input");
        body[f.getAttribute("data-field")] = elInp.value;
    });

    return body;
}

function getFields() {
    const container = document.getElementsByClassName("infoWrap")[0];
    return container.querySelectorAll("[data-field]");
}

function addElementClickListener(id, listener) {
    const el = document.getElementById(id);
    el.addEventListener("click", listener);
}

function renderButtonsNormalMode(catId) {
    const btnContainer = document.querySelector(".buttonWrap");

    btnContainer.innerHTML = `<i class="fas fa-pencil-alt" id="btnEdit" title="Редактировать информацию о котике"></i>
        <i class="fas fa-trash-alt" id="btnDelete" title="Удалить котика"></i>`;

    addElementClickListener("btnEdit", () => { 
        editCat(catId);
    });

    addElementClickListener("btnDelete", () => { 
        deleteCat(catId);
    });
}

function renderButtonsEditMode(catId, cloneContainer, container) {
    const btnContainer = document.querySelector(".buttonWrap");
    
    btnContainer.innerHTML = `<i class="fas fa-save" id="btnSave" title="Сохранить изменения"></i>
        <i class="fas fa-window-close" id="btnCancel" title="Отменить изменения"></i>`;

    addElementClickListener("btnCancel", () => { 
        container.parentElement.replaceChild(cloneContainer, container);
        renderButtonsNormalMode(catId);
    });

    addElementClickListener("btnSave", async () => {
        const body = getBody();
        const res = await saveCat(catId, body);
        if (res) {
            container.parentElement.replaceChild(cloneContainer, container);
            renderCatInfo(catId);
        }
    });
    
}


async function getCatInfo(catId) {    
    let res = await fetch(`http://sb-cats.herokuapp.com/api/2/elementalia/show/${catId}`);
    let cat = await res.json();
    return cat.data;
}

async function saveCat(catId, body) {
    console.log(body);

    let res = await fetch(`http://sb-cats.herokuapp.com/api/2/elementalia/update/${catId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    });
    let ans = await res.json(); 
    return ans.message === "ok";
}

async function deleteCat(catId) {
    let res = await fetch(`http://sb-cats.herokuapp.com/api/2/elementalia/delete/${catId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    let ans = await res.json();
    if (ans.message === "ok") {
        window.location = "index.html";
    }
}


const catId = +location.hash.substring(1);
renderCatInfo(catId)