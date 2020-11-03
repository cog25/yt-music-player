import { player, loadApi, loadVideoById } from "./yt-player";
import { loadThumbnailById } from "./yt-functions";
import { db, loadDB } from "./data";
import { renderList, handleInput } from "./list";

function backgroundImage() {
    const imageLayer = document.createElement("div");

    imageLayer.id = "bg";
    imageLayer.style.backgroundImage = `url(${loadThumbnailById(db[0].id)})`;

    document.body.append(imageLayer);
}

function init() {
    loadApi();
    loadDB();
    renderList();
    handleInput();
    backgroundImage();
}

init();
