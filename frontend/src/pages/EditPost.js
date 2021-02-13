import { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import { api } from '../utils'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useParams } from 'react-router-dom'

const EditPost = ({ history }) => {
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const token = Cookie.get('token')
    setToken(token)

    async function getPost() {
      setLoading(true)

      try {
        const { data } = await axios.get(`${api}/posts/${id}`)

        setTitle(data.data.title)
        setContent(data.data.content)
      } catch (error) {
        console.log(error.response.data)
      }

      setLoading(false)
    }

    getPost()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.put(
        `${api}/posts/${id}`,
        { title, content },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )

      setSuccess(data.message)

      setTimeout(() => {
        setSuccess('')
        history.push('/')
      }, 2000)
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
          <p className='text-center fs-3'>Edit Post</p>
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
          <div className='d-grid gap-2'>
            <button
              type='submit'
              className='btn btn-warning rounded-pill text-white'
            >
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost
