"user strict";

let player;
const playerSetting = {
    loop: false,
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        width: "560",
        height: "560",
        videoId: "D4_iIg-VQ6g",
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange() {
    const contanier = document.getElementById("video-container");
    const pause = document.getElementById("pause");
    const play = document.getElementById("play");
    const state = player.getPlayerState();

    if (state === 1) {
        contanier.classList.add("playing");
        pause.style.display = "inline";
        play.style.display = "none";
    } else {
        contanier.classList.remove("playing");
        pause.style.display = "none";
        play.style.display = "inline";
    }
}

document.getElementById("pause").addEventListener("click", () => {
    player.pauseVideo();
});

document.getElementById("play").addEventListener("click", () => {
    player.playVideo();
});
