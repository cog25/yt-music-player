import { db, saveDB } from "./data";
import { loadVideo } from "./yt-player";
import { getIdFromUri } from "./yt-functions";

const container = document.getElementById("playlist");
export let queue: any[] = [];

function createItem(title: string, id: string): HTMLLIElement {
    const item = document.createElement("li");
    const nameElem = document.createElement("span");
    const removeButton = document.createElement("button");

    nameElem.innerText = title;
    nameElem.addEventListener("click", () => {
        loadVideo({ title, id });
    });

    removeButton.innerText = "❌";
    removeButton.addEventListener(
        "click",
        (event) => {
            removeItem(event, id);
        },
        { capture: true }
    );

    item.append(nameElem);
    item.append(removeButton);

    return item;
}

export function initializeList() {
    queue = [...db];

    queue.forEach((item) => {
        container.append(createItem(item.title, item.id));
    });
}

function addItem(title: string, uri: string) {
    const id = getIdFromUri(uri);
    const newItem = createItem(title, id);

    queue.push({
        title,
        id,
    });

    container.append(newItem);

    saveDB(queue);
}

function removeItem(event: MouseEvent, id: string) {
    const target = <HTMLLIElement>(<HTMLButtonElement>event.target).parentNode;
    const targetIndex = queue.findIndex((item) => item.id === id);

    queue.splice(targetIndex, 1);

    target.remove();

    saveDB(queue);
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

export function updateQuene(method: "next" | "prev" | "shuffle") {
    if (method === "next") {
        queue.push(queue[0]);
        queue.shift();
    } else if (method === "prev") {
        queue.unshift(queue[queue.length - 1]);
        queue.pop();
    } else if (method === "shuffle") {
        if (queue.length < 3) return;
        const firstItem = queue[0];
        queue.shift();

        for (let i = queue.length; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
        queue.unshift(firstItem);
    }
}
