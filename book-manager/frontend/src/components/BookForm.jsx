import { useState, useEffect } from 'react'

function BookForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        year: initialData.year || '',
        genre: initialData.genre || ''
      })
    } else {
      setFormData({ title: '', author: '', year: '', genre: '' })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      year: formData.year ? parseInt(formData.year, 10) : null
    })
    if (!initialData) {
      setFormData({ title: '', author: '', year: '', genre: '' })
    }
  }

  return (
    <div className="book-form">
      <h2>{initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Autor *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Ano</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1000"
              max="2100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Gênero</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Atualizar' : 'Adicionar'}
          </button>
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default BookForm
