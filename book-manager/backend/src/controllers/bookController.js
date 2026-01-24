const db = require('../database/db');

const bookController = {
  getAll: (req, res) => {
    try {
      const books = db.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livros' });
    }
  },

  getById: (req, res) => {
    try {
      const { id } = req.params;
      const book = db.getBookById(id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livro' });
    }
  },

  create: (req, res) => {
    try {
      const { title, author, year, genre } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: 'Título e autor são obrigatórios' });
      }

      const newBook = db.createBook({ title, author, year, genre });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar livro' });
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, year, genre } = req.body;

      const existingBook = db.getBookById(id);
      if (!existingBook) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      const updatedBook = db.updateBook(id, { title, author, year, genre });
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
  },

  delete: (req, res) => {
    try {
      const { id } = req.params;

      const existingBook = db.getBookById(id);
      if (!existingBook) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      db.deleteBook(id);
      res.json({ message: 'Livro removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover livro' });
    }
  }
};

module.exports = bookController;
