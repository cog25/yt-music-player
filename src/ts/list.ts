import { db, addItemFromDB, removeItemFromDB } from "./data";
import { loadVideo } from "./yt-player";
import { getIdFromUri, getNameByUri } from "./yt-functions";

const container = document.getElementById("playlist");
export let queue: any[] = [];
const minusSvg = createMinusSVG();

function createMinusSVG(): SVGElement {
    const minusSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    minusSvg.setAttributeNS(null, "viewBox", "0 0 256 256");

    circle.setAttributeNS(null, "cx", "128");
    circle.setAttributeNS(null, "cy", "128");
    circle.setAttributeNS(null, "r", "96");
    circle.setAttributeNS(null, "fill", "none");
    circle.setAttributeNS(null, "stroke-linecap", "round");
    circle.setAttributeNS(null, "stroke-linejoin", "round");
    circle.setAttributeNS(null, "stroke-width", "24");

    line.setAttributeNS(null, "x1", "88");
    line.setAttributeNS(null, "y1", "128");
    line.setAttributeNS(null, "x2", "168");
    line.setAttributeNS(null, "y2", "128");
    line.setAttributeNS(null, "fill", "none");
    line.setAttributeNS(null, "stroke-linecap", "round");
    line.setAttributeNS(null, "stroke-linejoin", "round");
    line.setAttributeNS(null, "stroke-width", "24");

    minusSvg.append(circle);
    minusSvg.append(line);
    minusSvg.classList.add("icon");

    return minusSvg;
}

function createItem(title: string, id: string): HTMLLIElement {
    const item = document.createElement("li");
    const nameElem = document.createElement("span");
    const removeButton = document.createElement("button");

    nameElem.innerText = title;
    nameElem.addEventListener("click", () => {
        reArrangeQueue(id);
        loadVideo({ title, id });
    });

    removeButton.append(minusSvg.cloneNode(true));
    removeButton.addEventListener(
        "click",
        (event) => {
            removeItem(event, id);
        },
        { capture: true }
    );
    removeButton.setAttribute("aria-label", "삭제");

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

    addItemFromDB({
        title,
        id,
    });
}

function removeItem(event: MouseEvent, id: string) {
    const target = <HTMLLIElement>(<HTMLButtonElement>event.target).parentNode;
    const targetIndex = queue.findIndex((item) => item.id === id);

    queue.splice(targetIndex, 1);

    target.remove();

    removeItemFromDB(id);
}

async function handleSubmit() {
    const uri = <HTMLInputElement>document.getElementById("uri");

    if (!uri.value) {
        return;
    }

    const title = await getNameByUri(`${uri.value}`);

    addItem(title, uri.value);
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

export function updateQueue(method: "next" | "prev" | "shuffle") {
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

function reArrangeQueue(id: string) {
    const selectedItemIndex = queue.findIndex((item) => item.id === id);
    const smallerIndex = queue.filter((item, index) => {
        return index < selectedItemIndex;
    });
    const largerIndex = queue.filter((item, index) => {
        return index >= selectedItemIndex;
    });

    queue = largerIndex.concat(smallerIndex);
}
