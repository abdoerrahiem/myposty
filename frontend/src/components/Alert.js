import { useState } from 'react'
import { CheckCircle, XCircle, ExclamationCircle } from 'react-bootstrap-icons'

const Alert = ({ success, error, message }) => {
  const [show, setShow] = useState(true)

  const hideAlert = () => setShow(false)

  return (
    show && (
      <div className={`alert ${success ? 'success' : 'error'}`}>
        <p>
          {success && <CheckCircle />}
          {error && <ExclamationCircle />} {message}
        </p>
        <XCircle onClick={hideAlert} className='close-alert' />
      </div>
    )
  )
}

export default Alert
