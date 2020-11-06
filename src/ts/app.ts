import { loadApi } from "./yt-player";
import { loadDB } from "./data";
import { initializeList, handleInput } from "./list";

function init() {
    loadApi();
    loadDB();
    initializeList();
    handleInput();
}

init();
