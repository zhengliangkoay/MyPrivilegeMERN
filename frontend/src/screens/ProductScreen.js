import React, { useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { Row, Col, Image, ListGroup} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
    const dispatch = useDispatch()
    const params = useParams();
    //const product = products.find((p) => p._id === params.id)

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    useEffect(() => {
      dispatch(listProductDetails(params.id))
    }, [dispatch, params])

    
  return (
    <>
      <Link to = '/' className='btn btn-light my-3'>Go Back</Link>

      {loading ? <Loader/> : error ? ( <Message variant='danger'>{error}</Message>): (
      <Row>
      <Col md={7}>
        <Image src = {product.image} alt={product.name} fluid /> 
      </Col>
      <Col md={4}>
            <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Rating
                            value={product.rating}
                            text={` ${product.numReviews} reviews`}
                        />
                        </ListGroup.Item>
                        <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
                        <ListGroup.Item>
                        Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </ListGroup.Item>
                    </ListGroup>
      </Col>
      </Row>
    ) }


     
    </>
  )
}

export default ProductScreen