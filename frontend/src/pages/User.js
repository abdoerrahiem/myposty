import { useEffect, useState } from 'react'
import { CalendarCheck } from 'react-bootstrap-icons'
import axios from 'axios'
import { api } from '../utils'
import profileImage from '../assets/profile.png'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/id'
moment.locale()

const User = () => {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get(`${api}/users/${id}`)

        setUser(data.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    async function getPosts() {
      try {
        const { data } = await axios.get(`${api}/posts/user/${id}`)

        setPosts(data.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    getUser()
    getPosts()
  }, [])

  console.log(posts)

  return (
    <>
      {user ? (
        <div>
          <div className='card me-2' style={{ width: '340px' }}>
            <img src={profileImage} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title fw-bold text-center'>{user.name}</h5>
              <p className='card-text text-center pb-2'>({user.email})</p>
              <div className='d-flex justify-content-center'>
                <button type='button' className='btn btn-primary'>
                  Postingan{' '}
                  <span className='badge bg-secondary'>{posts.length}</span>
                  <span className='visually-hidden'>unread messages</span>
                </button>
              </div>
            </div>
          </div>
          <p className='my-2 fs-4 border-bottom text-center'>
            Postingan {user.name}
          </p>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
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
                  <p className='card-text fs-5 mt-2'>{post.content}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default User
