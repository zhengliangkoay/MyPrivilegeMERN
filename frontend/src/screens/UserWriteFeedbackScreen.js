import React, { useState, useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createUserFeedback } from '../actions/userActions'
import { USER_CREATE_FEEDBACK_RESET } from '../constants/userConstants'

const UserWriteFeedbackScreen = () => {
  
    const dispatch = useDispatch()
  
    const [category, setCategory] = useState(0)
    const [comment, setComment] = useState('')
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const userFeedbackCreate = useSelector((state) => state.userFeedbackCreate)
    const {
      success: successUserFeedback,
      loading: loadingUserFeedback,
      error: errorUserFeedback,
    } = userFeedbackCreate
  
    let navigate = useNavigate();
    console.log('userInfo', userInfo)
  
    useEffect(() => {
  
      if (successUserFeedback) {
        alert('Feedback Submitted')
        setCategory(0)
        setComment('')
        dispatch({ type: USER_CREATE_FEEDBACK_RESET})
      }
  
    }, [dispatch, successUserFeedback])
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
        createUserFeedback(userInfo._id, {
          category,
          comment,
        })
      )
    }
  
    return (
      <>
  <FormContainer>
  <h1>Write Feedback</h1>
  {successUserFeedback && (
          <Message variant='success'>
            Feedback submitted successfully
          </Message>
        )}
  {loadingUserFeedback && <Loader />}
          {errorUserFeedback && (
            <Message variant='danger'>{errorUserFeedback}</Message>
          )}
  {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (<Form onSubmit={submitHandler}>
            <Form.Group className='mt-3' controlId='category'>
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='' >Select...</option>
                <option value='Account'>1 - Account</option>
                <option value='Website'>2 - Website</option>
                <option value='Product'>3 - Product </option>
                <option value='Other'>4 - Other</option>
              </Form.Control>
              </Form.Group>
              <Form.Group className='mt-3' controlId='comment'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  row='3'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Button
                  className='mt-4'
                  disabled={loadingUserFeedback}
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
              )}
    </FormContainer>
      </>
    )
  }
  
  export default UserWriteFeedbackScreen  

