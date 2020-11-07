// will update to IndexedDB
export let db: any[];
const initializedDB = [
    {
        title: "어떤 오후",
        id: "D4_iIg-VQ6g",
    },
];

function saveDB() {
    localStorage.setItem("yt-music", JSON.stringify(db));
}

export function loadDB() {
    const storage = localStorage.getItem("yt-music");

    if (storage) {
        parseDB(storage);
    } else {
        db = initializedDB;
    }
}

function parseDB(storage: any) {
    try {
        db = JSON.parse(storage);

        if (!db.length) {
            db = initializedDB;
        }
    } catch (error) {
        console.error(error);
        db = initializedDB;
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
