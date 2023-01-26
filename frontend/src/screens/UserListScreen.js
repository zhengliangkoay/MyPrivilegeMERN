import React, { useEffect } from 'react'
import { Table, Button, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import {Link, useNavigate} from 'react-router-dom'

const UserListScreen = () => {
  const dispatch = useDispatch()

  // with feedbacks
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

let navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      return navigate('/login')
    }
  }, [dispatch, userInfo, successDelete])

    // useEffect(() => {
    //     dispatch(listUsers())
    // }, [dispatch])


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
    console.log('delete')
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>NUMBER OF FEEDBACK</th>
              <th>STAMP COUNT</th>
              <th>MANAGE STAMP</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>{user.numFeedbacks}</td>
                <td>{user.currentStamps ? user.currentStamps : '-'}</td>
                <td>
                {!user.isAdmin ? (
                  <Link to={`/admin/user/${user._id}/reward`} > 
                    <Button
                    variant='light' 
                    className='btn-sm' 
                    style ={{margin : '0px 10px'}}>
                    <i className='fas fa-trophy'/>
                    </Button>
                  </Link> 
                ):(
                    <Button
                    variant='light'
                    className='btn-sm' 
                    style ={{margin : '0px 10px'}}
                    disabled = 'true'>
                    <i className='fas fa-trophy'/>
                    </Button>
                 )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`} > 
                    <Button variant='light' className='btn-sm' style ={{margin : '0px 10px'}}>
                    <i className='fas fa-edit'/>
                    </Button>
                  </Link> 
                  <Button
                    variant='danger'
                    className='btn-sm'
                    style ={{margin : '0px 10px'}}
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                  <Link to={{pathname: `/${user._id}/feedbackForUser`, state: user}} > 
                    <Button variant='light' className='btn-sm' style ={{margin : '0px 10px'}}>
                    <i className='fas fa-file'/>
                    </Button>
                  </Link> 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
