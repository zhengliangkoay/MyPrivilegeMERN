import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Promotion = ({promotion}) => {
    return (
      <Card className='my-3 p-3 rounded' >
          <a href ={`/promotion/${promotion._id}`}>
              <Card.Img src={promotion.image} variant='top'/>
          </a>
  
        <Card.Body>
            
          <Link to={`/promotion/${promotion._id}`} style={{textDecorationLine: 'none'}}>
            <Card.Title as='h5' style={{color : 'black'}} className='mt-3'>
              <strong>{promotion.title}</strong>
            </Card.Title>
          </Link>
  
          {/* <Card.Text as='div' className='mt-3'>
            <Rating
              value={product.rating}
              text=<i>{` ${product.numReviews} reviews`}</i>
            />
          </Card.Text>
  
          <Card.Text as='h4' className='mt-3'>RM {product.price}</Card.Text> */}
        </Card.Body>
      </Card>
    )
  }
  
  export default Promotion