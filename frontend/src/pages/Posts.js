import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import {
  CalendarCheck,
  PersonCircle,
  PencilSquare,
  Trash,
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import Title from '../components/Title'
import { api } from '../utils'
import moment from 'moment'
import 'moment/locale/id'
moment.locale()

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getPosts() {
      setLoading(true)

      try {
        const { data } = await axios.get(`${api}/posts`)

        setPosts(data.data)
      } catch (error) {
        console.log(error.response.data)
      }

      setLoading(false)
    }

    getPosts()
  }, [])

  return (
    <div className='container'>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <>
          <Title>Beranda ({posts.length})</Title>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            {posts.map((post) => (
              <div
                className='card me-2 mb-2'
                key={post.id}
                style={{ width: '360px' }}
              >
                <div className='card-body'>
                  <h5 className='card-title text-center border-bottom pb-2 mb-4 fs-4'>
                    {post.title}
                  </h5>
                  <p className='fw-lighter m-0 font-smaller'>
                    <CalendarCheck className='me-2' />
                    {moment(post.created_at).startOf('hour').fromNow()}
                  </p>
                  <p className='fw-lighter m-0 font-smaller'>
                    <PersonCircle className='me-2' /> Dibuat oleh{' '}
                    <Link className='link-primary' to={`/user/${post.user}`}>
                      {post.name}
                    </Link>
                  </p>
                  <p className='card-text fs-5 mt-2'>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Alert error message='Post tidak ditemukan.' />
      )}
    </div>
  )
}

export default Posts
