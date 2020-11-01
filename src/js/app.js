"user strict";

let player;

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

function onPlayerStateChange() {}
