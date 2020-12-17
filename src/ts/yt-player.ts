import { queue, updateQueue } from "./list";
import { loadThumbnailById, initializeTmpPlayer } from "./yt-functions";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: Function;
    }
}

export let player: YT.Player;
let duration = 0;
let handlingDuration = false;

export function loadApi() {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = initializePlayer;
    document.body.append(script);
}

function initializePlayer() {
    const firstSong = queue[0];
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
    initializeTmpPlayer();
    window.onYouTubeIframeAPIReady = null;
}

export function loadVideo({ title, id }: { title: string; id: string }) {
    function onVideoLoaded() {
        if (player.getPlayerState() === 1) {
            displayVideoInfo(title, id);
            player.removeEventListener("onStateChange", onVideoLoaded);
        }
    }

    duration = 0;
    player.loadVideoById(id);
    player.addEventListener("onStateChange", onVideoLoaded);
}

function renderDuration() {
    if (!duration || handlingDuration) return;
    const durationElem = <HTMLInputElement>document.getElementById("duration");

    durationElem.value = `${player.getCurrentTime()}`;
    requestAnimationFrame(renderDuration);
}

function changeDuration() {
    handlingDuration = true;
}

function changeDurationEnd() {
    if (!duration) return;

    handlingDuration = false;

    const durationElem = <HTMLInputElement>document.getElementById("duration");

    player.seekTo(+durationElem.value, true);
    player.playVideo();
    renderDuration();
}

function displayVideoInfo(title: string, id: string) {
    const durationElem = <HTMLInputElement>document.getElementById("duration");
    duration = player.getDuration();
    durationElem.max = `${duration}`;
    renderDuration();
    backgroundImage(id);
    document.title = `🎵 Playing - ${title}`;
    document.getElementById("title").innerText = title;
}

function onPlayerReady(event: YT.PlayerEvent) {
    const firstSong = queue[0];

    event.target.playVideo();
    displayVideoInfo(firstSong.title, firstSong.id);
}

function onPlayerStateChange() {
    const container = document.getElementById("video-container");
    const pause = document.getElementById("pause");
    const play = document.getElementById("play");
    const state = player.getPlayerState();

    if (state === 1) {
        // playing
        container.classList.add("playing");
        pause.style.display = "inline";
        play.style.display = "none";
    } else {
        if (state === 0) {
            // ended
            updateQueue("next");
            loadVideo(queue[0]);
        } else {
            container.classList.remove("playing");
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

    document.getElementById("previous").addEventListener("click", () => {
        updateQueue("prev");
        loadVideo(queue[0]);
    });

    document.getElementById("next").addEventListener("click", () => {
        updateQueue("next");
        loadVideo(queue[0]);
    });

    document
        .getElementById("duration")
        .addEventListener("mousedown", changeDuration, { passive: true });

    document
        .getElementById("duration")
        .addEventListener("touchStart", changeDuration, { passive: true });

    document
        .getElementById("duration")
        .addEventListener("mouseup", changeDurationEnd, { passive: true });

    document
        .getElementById("duration")
        .addEventListener("touchEnd", changeDurationEnd, { passive: true });
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
