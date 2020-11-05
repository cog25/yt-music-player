// will update to IndexedDB
export let db: any[];

export function saveDB(array: any[]) {
    localStorage.setItem("yt-music", JSON.stringify(array));
}

export function loadDB() {
    const storage = localStorage.getItem("yt-music");

    if (storage) {
        parseDB(storage);
    } else {
        db = [
            {
                title: "어떤 오후",
                id: "D4_iIg-VQ6g",
            },
        ];
    }
}

function parseDB(storage: any) {
    try {
        db = JSON.parse(storage);
    } catch (error) {
        console.error(error);
        db = [
            {
                title: "어떤 오후",
                id: "D4_iIg-VQ6g",
            },
        ];
    }
}
