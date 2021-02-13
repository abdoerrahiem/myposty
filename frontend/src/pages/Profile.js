import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import { api } from '../utils'
import profileImage from '../assets/profile.png'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const Profile = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const token = Cookie.get('token')
    setToken(token)

    if (token) {
      async function getUser() {
        const { data } = await axios.get(`${api}/users/auth`, {
          headers: { Authorization: 'Bearer ' + token },
        })

        setUser(data.data)
        setName(data.data.name)
        setEmail(data.data.email)
      }

      getUser()
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.put(
        `${api}/users`,
        { name, email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )

      setUser(data.data)
      setName(data.data.name)
      setEmail(data.data.email)
      setSuccess(data.message)
      setLoading(false)

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user ? (
        <>
          <div className='card me-2' style={{ width: '340px' }}>
            <img src={profileImage} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center'>{user.name}</h5>
              <p className='card-text text-center border-bottom pb-2'>
                ({user.email})
              </p>
            </div>
            <div className='card-body'>
              {loading && <Spinner />}
              {success !== '' && <Alert message={success} success />}
              {!loading && success === '' && (
                <p className='text-muted text-center'>
                  Silahkan isi form untuk mengupdate profil anda.
                </p>
              )}
              <form className='mt-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <input
                    required
                    type='text'
                    className='form-control rounded-pill'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <input
                    required
                    type='email'
                    className='form-control rounded-pill'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='d-grid gap-2'>
                  <button
                    type='submit'
                    className='btn btn-warning rounded-pill text-white'
                  >
                    Edit Profil
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Profile
