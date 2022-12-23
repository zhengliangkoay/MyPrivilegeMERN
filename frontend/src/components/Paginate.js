import React from 'react'
import { Pagination } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { Table, Button, Nav } from 'react-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  console.log('pages', pages)
  console.log('page', page)
  return pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => (
        //   <LinkContainer
        //     key={x + 1}
        //     to={
        //       !isAdmin
        //         ? keyword
        //           ? `/search/${keyword}/page/${x + 1}`
        //           : `/page/${x + 1}`
        //         : `/admin/productlist/${x + 1}`
        //     }
        //   >
        //     <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        //   </LinkContainer>

        <Nav.Link 
          key={x+1} 
          to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          > 
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Nav.Link> 
        ))}
      </Pagination>
    )
}

export default Paginate
