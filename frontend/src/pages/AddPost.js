import { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import { api } from '../utils'
import axios from 'axios'
import Cookie from 'js-cookie'

const AddPost = ({ history }) => {
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = Cookie.get('token')
    setToken(token)

    if (!token) return history.push('/login')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.post(
        `${api}/posts`,
        { title, content, date },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )

      setSuccess(data.message)

      setTitle('')
      setContent('')

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (error) {
      setError(error.response.data.message)

      setTimeout(() => {
        setError('')
      }, 3000)
    }

    setLoading(false)
  }

  return (
    <div className='card me-2' style={{ width: '340px' }}>
      <div className='card-body'>
        {loading && <Spinner />}
        {success !== '' && <Alert message={success} success />}
        {error !== '' && <Alert message={error} error />}
        {!loading && success === '' && (
          <p className='text-center fs-3'>Tambah Post</p>
        )}
        <form className='mt-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input
              required
              type='text'
              placeholder='Judul Post'
              className='form-control rounded-pill'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <textarea
              required
              placeholder='Konten Post'
              className='form-control rounded-pill'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='form-label text-muted'>Tanggal Post</label>
            <input
              required
              type='date'
              placeholder='Tanggal Post'
              className='form-control rounded-pill'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='d-grid gap-2'>
            <button
              type='submit'
              className='btn btn-warning rounded-pill text-white'
            >
              Simpan Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost
