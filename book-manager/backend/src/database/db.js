const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const dbPath = path.join(dataDir, 'books.json');

class Database {
  constructor() {
    this.data = { books: [], nextId: 1 };
    this.isTest = process.env.NODE_ENV === 'test';

    if (!this.isTest) {
      this.load();
    }
  }

  load() {
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (fs.existsSync(dbPath)) {
        const content = fs.readFileSync(dbPath, 'utf-8');
        this.data = JSON.parse(content);
      } else {
        this.save();
      }
    } catch (error) {
      console.error('Erro ao carregar banco de dados:', error);
    }
  }

  save() {
    if (this.isTest) return;
    try {
      fs.writeFileSync(dbPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Erro ao salvar banco de dados:', error);
    }
  }

  reset() {
    this.data = { books: [], nextId: 1 };
  }

  getAllBooks() {
    return [...this.data.books].sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );
  }

  getBookById(id) {
    return this.data.books.find(book => book.id === parseInt(id));
  }

  createBook({ title, author, year, genre }) {
    const newBook = {
      id: this.data.nextId++,
      title,
      author,
      year: year || null,
      genre: genre || null,
      created_at: new Date().toISOString()
    };
    this.data.books.push(newBook);
    this.save();
    return newBook;
  }

  updateBook(id, { title, author, year, genre }) {
    const index = this.data.books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return null;

    const book = this.data.books[index];
    this.data.books[index] = {
      ...book,
      title: title !== undefined ? title : book.title,
      author: author !== undefined ? author : book.author,
      year: year !== undefined ? year : book.year,
      genre: genre !== undefined ? genre : book.genre
    };
    this.save();
    return this.data.books[index];
  }

  deleteBook(id) {
    const index = this.data.books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return false;

    this.data.books.splice(index, 1);
    this.save();
    return true;
  }
}

module.exports = new Database();
