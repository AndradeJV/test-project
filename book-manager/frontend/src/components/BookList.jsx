function BookList({ books, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="book-list">
        <h2>Lista de Livros</h2>
        <div className="loading">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="book-list">
      <h2>Lista de Livros ({books.length})</h2>
      {books.length === 0 ? (
        <div className="empty-message">
          Nenhum livro cadastrado. Adicione seu primeiro livro!
        </div>
      ) : (
        books.map(book => (
          <div key={book.id} className="book-item">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>
                {book.author}
                {book.year && ` (${book.year})`}
                {book.genre && ` - ${book.genre}`}
              </p>
            </div>
            <div className="book-actions">
              <button
                className="btn btn-secondary btn-small"
                onClick={() => onEdit(book)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-small"
                onClick={() => onDelete(book.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default BookList
