import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='container card'>
      <div className='card-body'>
        <h3 className='text-center mb-5 fs-2 border-bottom pb-3'>
          Tentang MyPosty
        </h3>
        <p>
          MyPosty adalah aplikasi yang bisa kamu gunakan untuk mengupdate
          kegiatan kamu setiap hari. Disini kamu juga bisa melihat kegiatan apa
          saja yang dilakukan orang lain setiap harinya.
        </p>
        <Link className='btn btn-warning rounded-pill text-white' to='/posts'>
          Lihat apa yang mereka bagikan disini &rarr;
        </Link>
      </div>
    </div>
  )
}

export default About
