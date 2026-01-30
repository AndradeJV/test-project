import { useState, useEffect } from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const API_URL = '/api/books'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingBook, setEditingBook] = useState(null)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Erro ao carregar livros')
      const data = await response.json()
      setBooks(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleCreate = async (bookData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      })
      if (!response.ok) throw new Error('Erro ao criar livros - Revise seu payload')
      await fetchBooks()
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdate = async (id, bookData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      })
      if (!response.ok) throw new Error('Erro ao atualizar livro')
      await fetchBooks()
      setEditingBook(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Erro ao excluir livro')
      await fetchBooks()
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
  }

  const handleCancelEdit = () => {
    setEditingBook(null)
  }

  return (
    <div className="container">
      <h1>Gerenciador de Livros</h1>

      {error && <div className="error">{error}</div>}

      <BookForm
        onSubmit={editingBook ? (data) => handleUpdate(editingBook.id, data) : handleCreate}
        initialData={editingBook}
        onCancel={editingBook ? handleCancelEdit : null}
      />

      <BookList
        books={books}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
