import { player, loadApi, loadVideoById, backgroundImage } from "./yt-player";
import { db, loadDB } from "./data";
import { renderList, handleInput } from "./list";

function init() {
    loadApi();
    loadDB();
    renderList();
    handleInput();
    backgroundImage(db[0].id);
}

init();
