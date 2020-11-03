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
        videoId: "D4_iIg-VQ6g",
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
            player.loadVideoById("D4_iIg-VQ6g");
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
