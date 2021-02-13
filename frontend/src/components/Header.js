import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Link, useLocation } from 'react-router-dom'
import {
  PersonCircle,
  BoxArrowInLeft,
  BoxArrowInRight,
  JournalBookmark,
  JournalBookmarkFill,
  FileEarmarkPlusFill,
  BookmarksFill,
} from 'react-bootstrap-icons'
import axios from 'axios'
import { api } from '../utils'

const Header = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState()

  const { pathname } = useLocation()

  useEffect(() => {
    const token = Cookie.get('token')

    setToken(token)

    if (token) {
      async function getUser() {
        const { data } = await axios.get(`${api}/users/auth`, {
          headers: { Authorization: 'Bearer ' + token },
        })

        setUser(data.data)
      }

      getUser()
    }
  }, [token])

  const handleLogout = () => {
    Cookie.remove('token')

    window.location.href = '/login'
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-info fixed-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <h3>
            <JournalBookmark /> MyPosty
          </h3>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ms-auto'>
            {user && (
              <Link
                to={`/me`}
                className='nav-link active me-4 w3-animate-top'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
              >
                <PersonCircle /> {user.name}
              </Link>
            )}
            <Link
              to='/posts'
              className={pathname === '/posts' ? 'nav-link active' : 'nav-link'}
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <JournalBookmarkFill /> Lihat Beranda
            </Link>
            <Link
              to='/posts/add'
              className={
                pathname === '/posts/add' ? 'nav-link active' : 'nav-link'
              }
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <FileEarmarkPlusFill /> Tambah Post
            </Link>
            <Link
              to='/about'
              className={pathname === '/about' ? 'nav-link active' : 'nav-link'}
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <BookmarksFill /> Tentang MyPosty
            </Link>
            {pathname !== '/login' && !token && (
              <Link
                to='/login'
                className='btn btn-warning text-white'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
              >
                <BoxArrowInRight /> Masuk
              </Link>
            )}
            {pathname !== '/login' && token && (
              <Link
                to='#'
                className='btn btn-danger text-white'
                data-toggle='collapse'
                data-target='.navbar-collapse.show'
                onClick={() => handleLogout()}
              >
                <BoxArrowInLeft /> Keluar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
