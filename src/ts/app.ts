import { player, loadApi, loadVideo, backgroundImage } from "./yt-player";
import { db, loadDB } from "./data";
import { renderList, handleInput } from "./list";

function init() {
    loadApi();
    loadDB();
    renderList();
    handleInput();
}

init();
