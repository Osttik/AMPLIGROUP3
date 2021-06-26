const storage = window.localStorage;
const _key = "data";

export function ReadData() {
    const dataFromStorage = storage.getItem(_key)
    
    if (dataFromStorage !== null) {
        const arrayOfNames = JSON.parse(dataFromStorage);
        const columns = []

        for(let i = 0; i < arrayOfNames.length; i++) {
            const item = storage.getItem(_key + arrayOfNames[i])

            columns.push(JSON.parse(item))
        }

        return {
            columns: columns
        }
    }

    return { 
        columns: [
            { 
                name:"To do", 
                cards:[]
            }
        ]
    };
}

export function WriteData(objectToWrite, key) {
    storage.setItem(_key + key, JSON.stringify(objectToWrite));
}

export function WriteNewKey(key) {
    const dataFromStorage = storage.getItem(_key);

    var itemToSet = [key];

    if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);

        parsedData.push(key);

        itemToSet = parsedData;
    }
    
    storage.setItem(_key, JSON.stringify(itemToSet))
}

export function DeleteKey(keyToDelete) {
    const dataFromStorage = storage.getItem(_key)

    const parsedData = JSON.parse(dataFromStorage)

    parsedData.splice(parsedData.findIndex(key => key === keyToDelete), 1)

    storage.removeItem(keyToDelete)
    
    storage.setItem(_key, JSON.stringify(parsedData))
}

export function WriteColumn(column) {
    if (storage.getItem(_key + column.name) === null) {
        WriteNewKey(column.name)
    }
    
    WriteData(column, column.name)
}

export function ChangeColumnName(column, oldName) {
    DeleteKey(oldName)
    
    WriteColumn(column)
}