import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded' >
        <a href ={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'/>
        </a>
      {/* <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link> */}

      <Card.Body>
          
        <Link to={`/product/${product._id}`} style={{textDecorationLine: 'none'}}>
          <Card.Title as='h5' style={{color : 'black'}} className='mt-3'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='mt-3'>
        {/* <div className = 'my-3'>
            {product.rating} from {product.numReviews} reviews
        </div> */}
          <Rating
            value={product.rating}
            text=<i>{` ${product.numReviews} reviews`}</i>
          />
        </Card.Text>

        <Card.Text as='h4' className='mt-3'>RM {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product