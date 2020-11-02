"user strict";

let player;
const tmp = {
    id: "D4_iIg-VQ6g",
};
const playerSetting = {
    loop: false,
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        width: "560",
        height: "560",
        videoId: tmp.id,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function getIdFromUri(uri) {
    return uri.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/g,
        ""
    );
}

function loadVideoById(id) {
    player.loadVideoById(id);
}

function loadThumbnailById(id) {
    return `https://i.ytimg.com/vi/${id}/original.jpg`;
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
            player.loadVideoById(tmp.id);
        } else {
            contanier.classList.remove("playing");
            pause.style.display = "none";
            play.style.display = "inline";
        }
    }
}

document.getElementById("pause").addEventListener("click", () => {
    player.pauseVideo();
});

document.getElementById("play").addEventListener("click", () => {
    player.playVideo();
});
