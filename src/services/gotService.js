export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api'
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not featch ${url}, status ${res.status}`)
        }
    
        return await res.json();
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharecter(id) {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllHouse() {
        return this.getResource(`/houses/`);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlords: house.overlords,
            ancestralWeapon: house.ancestralWeapon
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfpages: book.numberOfpages,
            publiser: book.publiser,
            released: book.released
        }
    }
}
