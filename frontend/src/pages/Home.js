import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import {
  CalendarCheck,
  PersonCircle,
  PencilSquare,
  Trash,
  Alarm,
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import Title from '../components/Title'
import { api } from '../utils'
import moment from 'moment'
import 'moment/locale/id'
import Modal from '../components/Modal'
moment.locale()

const Home = ({ history }) => {
  const [token, setToken] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [postId, setPostId] = useState('')

  useEffect(() => {
    const token = Cookie.get('token')

    if (!token) return history.push('/login')

    setToken(token)

    async function getMyPosts() {
      setLoading(true)

      try {
        const { data } = await axios.get(`${api}/posts/me`, {
          headers: { Authorization: 'Bearer ' + token },
        })

        setPosts(data.data)
      } catch (error) {
        console.log(error.response.data)
      }

      setLoading(false)
    }

    getMyPosts()
  }, [])

  const handleDelete = async () => {
    setLoading(true)

    try {
      const { data } = await axios.delete(`${api}/posts/${postId}`, {
        headers: { Authorization: 'Bearer ' + token },
      })

      setSuccess(data.message)

      const { data: dataPosts } = await axios.get(`${api}/posts/me`, {
        headers: { Authorization: 'Bearer ' + token },
      })

      setPosts(dataPosts.data)

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

    setTimeout(() => {
      setShowModal(false)
    }, 1000)
  }

  return (
    <div className='container'>
      {showModal && (
        <Modal
          handleSubmit={handleDelete}
          loading={loading}
          error={error}
          success={success}
          hideModal={() => setShowModal(false)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <>
          <Title>My Posts ({posts.length})</Title>
          <div className='d-flex flex-wrap justify-content-center align-items-center'>
            {posts.map((post) => (
              <div className='card me-2 mb-2 responsive-width' key={post.id}>
                <div className='card-body'>
                  <h5 className='card-title text-center border-bottom pb-2 mb-4 fs-4'>
                    {post.title}
                  </h5>
                  <p className='fw-lighter m-0 font-smaller'>
                    <CalendarCheck className='me-2' />
                    {moment(post.created_at).startOf('hour').fromNow()}
                  </p>
                  <p className='fw-lighter m-0 font-smaller'>
                    <Alarm className='me-2' />
                    {moment(post.date).format('L')}
                  </p>
                  <p className='fw-lighter m-0 font-smaller'>
                    <PersonCircle className='me-2' /> Dibuat oleh{' '}
                    <Link className='link-primary' to={`/me`}>
                      saya
                    </Link>
                  </p>
                  <p className='card-text fs-5 mt-2'>{post.content}</p>
                </div>
                <div className='card-body'>
                  <Link
                    to={`/posts/${post.id}`}
                    className='btn btn-success rounded-pill me-2'
                  >
                    <PencilSquare /> Edit
                  </Link>
                  <button
                    className='btn btn-danger rounded-pill'
                    onClick={() => {
                      setShowModal(true)
                      setPostId(post.id)
                    }}
                  >
                    <Trash /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Alert error message='Kamu belum memiliki post.' />
      )}
    </div>
  )
}

export default Home
