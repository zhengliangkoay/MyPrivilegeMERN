import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, topProducts} = productTopRated
  console.log(productTopRated)
  console.log(topProducts)
  
  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {topProducts.map((topProduct) => (
        <Carousel.Item key={topProduct._id}>
          <Link to={`/product/${topProduct._id}`}>
            <Image src={topProduct.image} alt={topProduct.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h1>
                {topProduct.name} (RM {topProduct.price})
              </h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel