import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, createStamp } from '../actions/userActions'
import { USER_CREATE_STAMP_RESET } from '../constants/userConstants'

const RewardEditScreen = () => {
  
  const params = useParams();
  const userId = params.id; 

  const [name, setName] = useState('')
  const [noOfStampEarned, setNoOfStampEarned] = useState(0)
  const [currentStamps, setCurrentStamps] = useState(0)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userCreateStamp = useSelector((state) => state.createStamp)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userCreateStamp

  let navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_CREATE_STAMP_RESET })
      return navigate ('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setCurrentStamps(user.currentStamps)
      }
    }
  }, [dispatch, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createStamp({_id:userId, noOfStampEarned} ))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      
      <FormContainer>
        <h1>Manage Reward</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                disabled='true'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                disabled='true'
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='currentStamps'>
              <Form.Label>Current Stamps</Form.Label>
              <Form.Control
                type='currentStamps'
                placeholder='Current Stamps'
                value={currentStamps}
                onChange={(e) => setCurrentStamps(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='noOfStampEarned'>
              <Form.Label>Number of Stamps Earned</Form.Label>
              <Form.Control
                type='noOfStampsAdded'
                placeholder='Enter number of stamps'
                value={noOfStampEarned}
                onChange={(e) => setNoOfStampEarned(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button 
            className='mt-4' 
            type='submit' 
            variant='primary'>
              Add
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default RewardEditScreen