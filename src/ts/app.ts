import { loadApi } from "./yt-player";
import { loadDB } from "./data";
import { initializeList, handleInput } from "./list";

function toggleListVisibility() {
    const list = document.querySelector(".list");
    const button = document.getElementById("toggleList");
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        list.classList.toggle("active");
    });
}

function init() {
    loadApi();
    loadDB();
    initializeList();
    handleInput();
    toggleListVisibility();
}

init();
