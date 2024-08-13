const NO_DATA = 'unknown';
export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api'
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not featch ${url}, status ${res.status}`)
        }
    
        return await res.json();
    };

    getAllCharacters = async () => {
        const chars = await this.getResource('/characters?page=5&pageSize=10');
        return chars.map((char) => this._transformCharacter(char));
    }

    getCharecter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book)
    }

    getAllBooks = async () => {
        const books = await this.getResource(`/books/`);
        return books.map((book) => this._transformBook(book));
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getAllHouses = async () => {
        const houses = await this.getResource(`/houses/`);
        return houses.map((house) => this._transformHouse(house));
    }

    _fixEmpyData = (obj) => {
        for (let key in obj) {
            if (!obj[key] || obj[key].length === 0) {
                obj[key] = NO_DATA;
            }
        }
        return obj;        
    }
    _getId = (str) => {
        const regex = /(\d+)$/;
        const match = str.match(regex);
        return parseInt(match[0], 10);
    }
    _transformCharacter = (char) => {
        const {url, name, gender, born, died, culture} = this._fixEmpyData(char);
        
        return {
            id: this._getId(url),
            name: name,
            gender: gender,
            born: born,
            died: died,
            culture: culture
        }
    }

    _transformHouse = (house) => {
        const {url, name, region, words, titles, overlords, ancestralWeapon} = this._fixEmpyData(house);
        return {
            id: this._getId(url),
            name: name,
            region: region,
            words: words,
            titles: titles,
            overlords: overlords,
            ancestralWeapon: ancestralWeapon
        }
    }

    _transformBook = (book) => {
        const {url, name, numberOfpages, publiser, released} = this._fixEmpyData(book);
       
        return {
            id: this._getId(url),
            name: name,
            numberOfpages: numberOfpages,
            publiser: publiser,
            released: released
        }
    }
}
