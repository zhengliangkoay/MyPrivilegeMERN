import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen =  () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {success} = userUpdateProfile

//   const orderListMy = useSelector((state) => state.orderListMy)
//   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
        return navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        //dispatch(listMyOrders())
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    }
  }, [dispatch, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      setMessage('Profile successfully updated')
    }
  }

  return (
    <Row>
    <Col md={12}>
    <FormContainer>
    {userInfo && userInfo.isAdmin ? (
        <>
          <h1>Admin Profile</h1>
          <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>You can update your profile below</h5>
        </>
        ) : (
          <>
            <h1>User Profile</h1>
            <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>You can update your profile below</h5>
          </>
        )}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='mt-4' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
          </FormContainer>
        </Col>
    </Row>
  )
}

export default ProfileScreen