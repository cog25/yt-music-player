let tmpPlayer: any;

export function initializeTmpPlayer() {
    tmpPlayer = new YT.Player("tmpPlayer", {
        width: "10",
        height: "10",
    });

    tmpPlayer.mute();
}

export async function getNameByUri(uri: string) {
    const getName = () => {
        return new Promise((resolve) => {
            function onVideoLoaded() {
                if (tmpPlayer.getPlayerState() === 1) {
                    const { title } = tmpPlayer.playerInfo.videoData;
                    tmpPlayer.pauseVideo();
                    tmpPlayer.removeEventListener(
                        "onStateChange",
                        onVideoLoaded
                    );
                    resolve(title);
                }
            }

            tmpPlayer.loadVideoById(getIdFromUri(uri));
            tmpPlayer.addEventListener("onStateChange", onVideoLoaded);
        });
    };

    const name = await getName();

    return `${name}`;
}

export function getIdFromUri(uri: string) {
    return uri.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/g,
        ""
    );
}

export function loadThumbnailById(id: string) {
    return `https://i.ytimg.com/vi/${id}/original.jpg`;
}
