import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import {Route, Link, NavLink, useNavigate} from 'react-router-dom' 
import { Nav } from 'react-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <Nav.Link as={Link} 
            key={x + 1}
            to={
              !isAdmin
                ? keyword? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item 
                key={x + 1} 
                active={x + 1 === page}>
                {x + 1}
            </Pagination.Item>
          </Nav.Link>
        ))}
      </Pagination>
    )
  )
}

export default Paginate