import React, {useEffect} from 'react'
import { useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {Helmet} from 'react-helmet'
import { listProducts, listTopProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
    
  const params = useParams();

  const keyword = params.keyword

  const dispatch = useDispatch()

//   const keyword = match.params.keyword

//   const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  console.log(products)

  const productTopRatedAtHome = useSelector((state) => state.productTopRated)
  const {topProducts} = productTopRatedAtHome
  console.log(productTopRatedAtHome)
  console.log(topProducts)
  


  useEffect(() => {
    dispatch(listProducts(keyword),listTopProducts())
  
  }, [dispatch,keyword])

  return (
    <>
    <Meta/>
    {!keyword ? <ProductCarousel /> : (
    <>
    <Link to ='/' className='btn btn-light'>
      Go Back
    </Link>
    </>
    )}
    
    {loading ? ( 
    <h2><Loader/></h2>)
     : error ? (
     <Message variant='danger'>{error}</Message>
     ): (
      <>
      {(products.length > 0)? 
        (
          <>
            <h1>All Products</h1>
            <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Jom! Get your cravings fixed now.</h5>
              <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product= {product} />
                        </Col>
                    ))}
              </Row>
          </>
        ) : (
          <>
          <h1>Woah, you got to the end. Let's try narrowing down your search. </h1>
          <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Try our best-selling products below</h5>
          <Row>
              {topProducts.map((topProduct) => (
                  <Col key={topProduct._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product= {topProduct} />
                  </Col>
              ))}
          </Row>
        </>
        )}
      </>
    )}
    </>
  )
}

export default HomeScreen