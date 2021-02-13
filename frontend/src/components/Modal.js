import React from 'react'
import { XCircle, HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons'
import Spinner from './Spinner'
import Alert from './Alert'

const Modal = ({ hideModal, handleSubmit, loading, error, success }) => {
  return (
    <div className='modal'>
      <div className='container w3-animate-top'>
        <XCircle className='close-alert' onClick={hideModal} />
        <div>
          {success !== '' && <Alert success message={success} />}
          {error !== '' && <Alert error message={error} />}
          {loading && <Spinner className='mb-3' />}
          <p>Hapus post ini?</p>
          <div className='buttons'>
            <button onClick={handleSubmit}>
              <HandThumbsUp /> Ya
            </button>
            <button onClick={hideModal}>
              <HandThumbsDown /> Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
