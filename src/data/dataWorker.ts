const storage: Storage = window.localStorage;
const _key: string = "data";

export function ReadData() {
    const dataFromStorage: string | null = storage.getItem(_key)
    
    if (dataFromStorage !== null) {
        const arrayOfNames: string[] = JSON.parse(dataFromStorage!);
        const columns = []

        for(let i = 0; i < arrayOfNames.length; i++) {
            const item: string | null = storage.getItem(_key + arrayOfNames[i])
            
            if(item !== null)
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

export function WriteData(objectToWrite: any, key: string) {
    storage.setItem(_key + key, JSON.stringify(objectToWrite));
}

export function WriteNewKey(key: string) {
    const dataFromStorage: string | null = storage.getItem(_key);

    var itemToSet = [key];

    if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage!);

        parsedData.push(key);

        itemToSet = parsedData;
    }
    
    storage.setItem(_key, JSON.stringify(itemToSet))
}

export function DeleteKey(keyToDelete: string) {
    const dataFromStorage: string | null = storage.getItem(_key)

    const parsedData = JSON.parse(dataFromStorage!)

    parsedData.splice(parsedData.findIndex((key: string) => key === keyToDelete), 1)

    storage.removeItem(_key + keyToDelete)
    
    storage.setItem(_key, JSON.stringify(parsedData))
}

export function WriteColumn(column: any) {
    if (storage.getItem(_key + column.name) === null) {
        WriteNewKey(column.name)
    }
    
    WriteData(column, column.name)
}

export function ChangeColumnName(column: any, oldName: string) {
    DeleteKey(oldName)
    
    WriteColumn(column)
}