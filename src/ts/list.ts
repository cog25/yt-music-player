import { db, saveDB } from "./data";
import { loadVideo } from "./yt-player";
import { getIdFromUri } from "./yt-functions";

const container = document.getElementById("playlist");

function createItem(title: string, id: string): HTMLLIElement {
    const item = document.createElement("li");
    const nameElem = document.createElement("span");
    const removeButton = document.createElement("button");

    nameElem.innerText = title;
    nameElem.addEventListener("click", () => {
        loadVideo(title, id);
    });

    removeButton.innerText = "❌";
    removeButton.addEventListener("click", removeItem, { capture: true });

    item.append(nameElem);
    item.append(removeButton);

    item.dataset.id = id;

    return item;
}

export function renderList() {
    db.forEach((item) => {
        container.append(createItem(item.title, item.id));
    });
}

function addItem(title: string, uri: string) {
    const id = getIdFromUri(uri);
    const newItem = createItem(title, id);

    db.push({
        title,
        id,
    });

    container.append(newItem);

    saveDB();
}

function removeItem(event: MouseEvent) {
    const target = <HTMLLIElement>(<HTMLButtonElement>event.target).parentNode;
    const targetIndex = db.findIndex((item) => item.id === target.dataset.id);

    db.splice(targetIndex, 1);

    target.remove();

    saveDB();
}

function handleSubmit() {
    const title = <HTMLInputElement>document.getElementById("title");
    const uri = <HTMLInputElement>document.getElementById("uri");

    if (!uri.value) {
        return;
    }

    if (!title) {
        title.value = uri.value;
    }

    addItem(title.value, uri.value);
    title.value = "";
    uri.value = "";
}

export function handleInput() {
    const songForm = <HTMLFormElement>document.getElementById("song-form");
    const submit = <HTMLButtonElement>document.getElementById("submit");

    songForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleSubmit();
    });
    submit.addEventListener("click", handleSubmit);
}
