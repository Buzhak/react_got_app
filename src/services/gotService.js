const NO_DATA = 'unknown';
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
        return res.map((char) => this._transformCharacter(char));
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

    _fixEmpyData(obj) {
        for (let key in obj) {
            if (!obj[key]) {
                obj[key] = NO_DATA;
            }
        }
        return obj;        
    }

    _transformCharacter(char) {
        const {name, gender, born, died, culture} = this._fixEmpyData(char);
        return {
            name: name,
            gender: gender,
            born: born,
            died: died,
            culture: culture
        }
    }

    _transformHouse(house) {
        const {name, region, words, titles, overlords, ancestralWeapon} = this._fixEmpyData(house);
        return {
            name: name,
            region: region,
            words: words,
            titles: titles,
            overlords: overlords,
            ancestralWeapon: ancestralWeapon
        }
    }

    _transformBook(book) {
        const {name, numberOfpages, publiser, released} = this._fixEmpyData(book);
        return {
            name: name,
            numberOfpages: numberOfpages,
            publiser: publiser,
            released: released
        }
    }
}
