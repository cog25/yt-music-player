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
    const firstSong = db[0];
    player = new YT.Player("player", {
        width: "560",
        height: "560",
        videoId: firstSong.id,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });

    handleButtons();

    displayVideoInfo(firstSong.title, firstSong.id);

    window.onYouTubeIframeAPIReady = null;
}

export function loadVideo(title: string, id: string) {
    player.loadVideoById(id);
    displayVideoInfo(title, id);
}

function displayVideoInfo(title: string, id: string) {
    backgroundImage(id);
    document.title = `🎵 Playing - ${title}`;
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
    let imageLayer = document.getElementById("bg");

    if (!imageLayer) {
        imageLayer = document.createElement("div");

        imageLayer.id = "bg";
        document.body.append(imageLayer);
    }

    imageLayer.style.backgroundImage = `url(${loadThumbnailById(videoId)})`;
}
