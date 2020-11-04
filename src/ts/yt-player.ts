import { db } from "./data";
import { loadThumbnailById } from "./yt-functions";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: Function;
    }
}

export let player: YT.Player;

export function loadApi() {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = initializePlayer;
    document.body.append(script);
}

function initializePlayer() {
    player = new YT.Player("player", {
        width: "560",
        height: "560",
        videoId: db[0].id,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });

    handleButtons();
    window.onYouTubeIframeAPIReady = null;
}

export function loadVideoById(id: string) {
    player.loadVideoById(id);
    backgroundImage(id);
}

function onPlayerReady(event: YT.PlayerEvent) {
    event.target.playVideo();
}

function onPlayerStateChange() {
    const contanier = document.getElementById("video-container");
    const pause = document.getElementById("pause");
    const play = document.getElementById("play");
    const state = player.getPlayerState();

    if (state === 1) {
        // playing
        contanier.classList.add("playing");
        pause.style.display = "inline";
        play.style.display = "none";
    } else {
        if (state === 0) {
            // ended
            player.loadVideoById(db[0].id);
        } else {
            contanier.classList.remove("playing");
            pause.style.display = "none";
            play.style.display = "inline";
        }
    }
}

function handleButtons() {
    document.getElementById("pause").addEventListener("click", () => {
        player.pauseVideo();
    });

    document.getElementById("play").addEventListener("click", () => {
        player.playVideo();
    });
}

export function backgroundImage(videoId: string) {
    const imageLayer = document.createElement("div");

    imageLayer.id = "bg";
    imageLayer.style.backgroundImage = `url(${loadThumbnailById(videoId)})`;

    document.body.append(imageLayer);
}
