import { player, loadApi, loadVideoById } from "./yt-player";
import { loadThumbnailById } from "./yt-functions";
import { db, loadDB } from "./data";
import { renderList, handleInput } from "./list";

function init() {
    loadApi();
    loadDB();
    renderList();
    handleInput();
}

init();
