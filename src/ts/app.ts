import { player, loadApi, loadVideo, backgroundImage } from "./yt-player";
import { db, loadDB } from "./data";
import { initializeList, handleInput } from "./list";

function init() {
    loadApi();
    loadDB();
    initializeList();
    handleInput();
}

init();
