import React from 'react'
import {Link,NavLink} from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
//import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
// import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

   const logoutHandler = () => {
    dispatch(logout())
   }

  return (
    <header>
      <Navbar collapseOnSelect bg="light" variant="light" expand="lg"  >
          <Container>
          <Navbar.Brand as={NavLink} to="/">
          <img
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          MyPrivilege</Navbar.Brand>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className="justify-content-end flex-grow-1">
          {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  
                  <NavDropdown.Item>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  </NavDropdown.Item> 

                  <NavDropdown.Item onClick={logoutHandler}>
                  <Nav.Link>Logout</Nav.Link>
                  </NavDropdown.Item> 
                </NavDropdown>

              ) : 
              <Nav.Link as={Link} to="/login"> 
              <i className='fas fa-user'/>
              Sign In
              </Nav.Link> }
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  
                <NavDropdown.Item>
                <Nav.Link as={Link} to="/admin/userlist">Users</Nav.Link>
                </NavDropdown.Item> 

                <NavDropdown.Item>
                <Nav.Link as={Link} to="admin/productlist">Products</Nav.Link>
                </NavDropdown.Item> 

                <NavDropdown.Item>
                <Nav.Link as={Link} to="admin/orderlist">Orders</Nav.Link>
                </NavDropdown.Item> 

                {/* <NavDropdown.Item onClick={logoutHandler}>
                <Nav.Link>Logout</Nav.Link>
                </NavDropdown.Item>  */}
              </NavDropdown>
              )}
              </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>

    </header>
  )
}

export default Header