// will update to IndexedDB
export let db: any[];

function saveDB() {
    localStorage.setItem("yt-music", JSON.stringify(db));
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

export function addItemFromDB({ title, id }: { title: string; id: string }) {
    db.push({
        title,
        id,
    });

    saveDB();
}

export function removeItemFromDB(id: string) {
    const targetIndex = db.findIndex((item) => item.id === id);

    db.splice(targetIndex, 1);

    saveDB();
}
