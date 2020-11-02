export function getIdFromUri(uri: string) {
    return uri.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/g,
        ""
    );
}

export function loadThumbnailById(id: string) {
    return `https://i.ytimg.com/vi/${id}/original.jpg`;
}
