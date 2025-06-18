import { v4 as uuidv4 } from 'uuid';

class InMemoryStorage {
    constructor() {
        this.data = {};
    }

    create(collectionName, item) {
        const newObject = { ...item, _id: uuidv4() };
        if (this.data[collectionName]) {
            this.data[collectionName].push(newObject);
        }
        else {
            this.data[collectionName] = [newObject];
        }
        return newObject;
    }

    find(collectionName, findFunc) {
        if (this.data[collectionName]) {
            return this.data[collectionName].filter((object) => findFunc(object));
        }
        return [];
    }

    where(collectionName, where) {
        if (this.data[collectionName]) {
            return this.data[collectionName].filter((object) => JSON.stringify(object) === JSON.stringify(where));
        }
        return [];
    }

    remove(collectionName, findFunc) {
        if (this.data[collectionName]) {
            const itemsToRemove = this.data[collectionName].filter((object) => findFunc(object));
            this.data[collectionName] = this.data[collectionName].filter((object) => !findFunc(object));
            return itemsToRemove
        }
        return [];
    }
}

let data = {};
class InMemorySharedStorage {
    create(collectionName, item) {
        const newObject = { ...item, _id: uuidv4() };
        if (data[collectionName]) {
            data[collectionName].push(newObject);
        }
        else {
            data[collectionName] = [newObject];
        }
        return newObject;
    }

    find(collectionName, findFunc) {
        if (data[collectionName]) {
            return data[collectionName].filter((object) => findFunc(object));
        }
        return [];
    }

    where(collectionName, where) {
        if (data[collectionName]) {
            return data[collectionName].filter((object) => JSON.stringify(object) === JSON.stringify(where));
        }
        return [];
    }

    remove(collectionName, findFunc) {
        if (data[collectionName]) {
            const itemsToRemove = data[collectionName].filter((object) => findFunc(object));
            data[collectionName] = data[collectionName].filter((object) => !findFunc(object));
            return itemsToRemove
        }
        return [];
    }
}
export { InMemoryStorage , InMemorySharedStorage};