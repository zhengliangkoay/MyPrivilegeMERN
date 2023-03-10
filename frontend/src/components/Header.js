import React from 'react'
import {Route, Link, NavLink, useNavigate} from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  let navigate = useNavigate(); 
  const logoutHandler = () => {
    if (window.confirm('Confirm to log out?')) {
    dispatch(logout())
    return navigate('/login')
   }
  }

  return (
    <header>
     {/* User Side */}
    {(userInfo == null || !userInfo.isAdmin) ? (
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
          <b>MyPrivilege</b></Navbar.Brand>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          
          <SearchBox/>
          
          <Nav className="justify-content-end flex-grow-1">

          <Nav.Link as={Link} to='/'>
                  <i className='fas fa-utensils'/> 
                  <b> Product </b>
          </Nav.Link>

          <Nav.Link as={Link} to='/promotion'>
                  <i className='fas fa-bullhorn'/> 
                  <b> Promotion </b>
          </Nav.Link>

          <Nav.Link as={Link} to='/cart'>
                  <i className='fas fa-shopping-cart'/> 
                  <b> Cart </b>
          </Nav.Link>

         
          {userInfo ? (
                <NavDropdown title=<b>{userInfo.name}</b> id='username'>
                        <NavDropdown.Item>
                          <Nav.Link as={Link} to="/profile">
                            <b>Profile</b>
                          </Nav.Link>
                        </NavDropdown.Item> 
                        <NavDropdown.Item>
                          <Nav.Link as={Link} to="/reward">
                            <b>Rewards</b>
                          </Nav.Link>
                        </NavDropdown.Item> 
                        {userInfo && !userInfo.isAdmin && (
                            <NavDropdown.Item>
                            <Nav.Link as={Link} to="/feedback">
                              <b>Write Feedback</b>
                            </Nav.Link>
                          </NavDropdown.Item> 
                        )} 
                        <NavDropdown.Item onClick={logoutHandler}>
                          <Nav.Link><b>Logout</b></Nav.Link>
                        </NavDropdown.Item> 
                </NavDropdown>
              ) : 
              <Nav.Link as={Link} to="/login"> 
              <i className='fas fa-user'/>
              <b> Sign In </b>
              </Nav.Link> }

              </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
    ): (
      <Navbar collapseOnSelect bg="warning" variant="light" expand="lg"  >
          <Container>
          <Navbar.Brand as={NavLink} to="/">
          <img
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          <b>MyPrivilege</b></Navbar.Brand>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          
          <SearchBox/>
          
          <Nav className="justify-content-end flex-grow-1">

          <Nav.Link as={Link} to='/'>
                  <i className='fas fa-utensils'/> 
                  <b> Product </b>
          </Nav.Link>

          <Nav.Link as={Link} to='/promotion'>
                  <i className='fas fa-bullhorn'/> 
                  <b> Promotion </b>
          </Nav.Link>
          
          {/* <Nav.Link as={Link} to='/cart'>
                  <i className='fas fa-shopping-cart'/> 
                  <b> Cart </b>
          </Nav.Link> */}

         
          {userInfo ? (
                <NavDropdown title=<b>{userInfo.name}</b> id='username'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/profile">
                      <b>Profile</b>
                    </Nav.Link>
                  </NavDropdown.Item> 
                  <NavDropdown.Item onClick={logoutHandler}>
                    <Nav.Link><b>Logout</b></Nav.Link>
                  </NavDropdown.Item> 
                </NavDropdown>
              ) : 
              <Nav.Link as={Link} to="/login"> 
              <i className='fas fa-user'/>
              <b> Sign In </b>
              </Nav.Link> }

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title=<b>Admin</b> id='adminMenu'>
                  
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/admin/userlist">
                    <b>Users</b>
                  </Nav.Link>
                </NavDropdown.Item> 

                <NavDropdown.Item>
                  <Nav.Link as={Link} to="admin/productlist">
                    <b>Products</b>
                  </Nav.Link>
                </NavDropdown.Item> 

                <NavDropdown.Item>
                  <Nav.Link as={Link} to="admin/promotionlist">
                    <b>Promotional News</b>
                  </Nav.Link>
                </NavDropdown.Item> 

                <NavDropdown.Item>
                    <Nav.Link as={Link} to="admin/voucherList">
                      <b>Vouchers</b>
                    </Nav.Link>
                </NavDropdown.Item> 

              </NavDropdown>
              )}
              </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
    )
    }
    </header>
  )
}

export default Header