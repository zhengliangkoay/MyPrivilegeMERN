import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import {Link, useParams, useNavigate} from 'react-router-dom'
import FeedbacksPDF from '../components/FeedbacksPDF'

const UserListFeedback = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const params = useParams();
  const userId = params.id

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const feedbacks = user.feedbacks

  for (let feedback of feedbacks) {
    feedback.date= new Date(feedback.updatedAt).toLocaleDateString('en-US');
    feedback.time= new Date(feedback.updatedAt).toLocaleTimeString('en-US');
   }

let navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserDetails(userId))
    } else {
      return navigate('/login')
    }
  }, [dispatch, userInfo, userId, navigate])

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Feedbacks From {user.name}</h1>
      <h5>Email <a href={`mailto:${user.email}`}>{user.email}</a></h5>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY</th>
              <th>COMMENT</th>
              <th>CREATED DATE</th>
              <th>CREATED TIME</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback._id}</td>
                <td>{feedback.category}</td>
                <td>{feedback.comment}</td>
                <td>{feedback.date}</td> 
                <td>{feedback.time}</td> 
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <FeedbacksPDF />
    </>
  )
}

export default UserListFeedback
