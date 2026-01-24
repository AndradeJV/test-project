const request = require('supertest');

process.env.NODE_ENV = 'test';

const app = require('../src/app');
const db = require('../src/database/db');

describe('POST /api/books', () => {
  beforeEach(() => {
    db.reset();
  });

  it('deve criar um novo livro com sucesso', async () => {
    const newBook = {
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      year: 1954,
      genre: 'Fantasia'
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.author).toBe(newBook.author);
    expect(response.body.year).toBe(newBook.year);
    expect(response.body.genre).toBe(newBook.genre);
  });

  it('deve retornar erro 400 quando título não é fornecido', async () => {
    const newBook = {
      author: 'J.R.R. Tolkien',
      year: 1954
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook)
      .expect(400);

    expect(response.body.error).toBe('Título e autor são obrigatórios');
  });

  it('deve retornar erro 400 quando autor não é fornecido', async () => {
    const newBook = {
      title: 'O Senhor dos Anéis',
      year: 1954
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook)
      .expect(400);

    expect(response.body.error).toBe('Título e autor são obrigatórios');
  });

  it('deve criar livro apenas com título e autor', async () => {
    const newBook = {
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien'
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook)
      .expect(201);

    expect(response.body.title).toBe(newBook.title);
    expect(response.body.author).toBe(newBook.author);
    expect(response.body.year).toBeNull();
    expect(response.body.genre).toBeNull();
  });
});
