import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'
import { api, config } from '../utils'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const Register = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = Cookie.get('token')

    if (token) return history.push('/')
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.post(
        `${api}/users`,
        { name, email, password },
        config
      )

      setSuccess(data.message)

      history.push('/login')
    } catch (error) {
      setError(error.response.data.message)

      setTimeout(() => {
        setError('')
      }, 3000)
    }

    setLoading(false)
  }

  return (
    <div className='card' style={{ width: '20rem' }}>
      <div className='card-body'>
        <h5 className='card-title text-center fs-3 mb-3'>Silahkan Daftar</h5>
        <h6 className='card-subtitle mb-4 text-muted text-center border-bottom pb-2'>
          Untuk Membuat Akun Anda
        </h6>
        {error !== '' && <Alert message={error} error />}
        {success !== '' && <Alert message={success} success />}
        {loading && <Spinner />}
        <form className='mt-2' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Nama
            </label>
            <input
              type='text'
              className='form-control rounded-pill'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Alamat Email
            </label>
            <input
              type='email'
              className='form-control rounded-pill'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control rounded-pill'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='d-grid gap-2'>
            <button
              type='submit'
              className='btn btn-info rounded-pill text-white'
            >
              Submit
            </button>
          </div>
          <div className='mt-3'>
            <p className='text-center'>
              Sudah punya akun? <Link to='/register'>MASUK</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
