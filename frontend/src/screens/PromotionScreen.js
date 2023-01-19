import React, { useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listPromotion } from '../actions/promotionActions'
import Promotion from '../components/Promotion'
import { Carousel} from 'react-bootstrap'

const PromotionScreen = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const keyword = params.keyword
 
  const promotionList = useSelector((state) => state.promotionList)
  const {loading, error, promotions} = promotionList
  console.log(promotionList)
  console.log(promotions)

  useEffect(() => {
    dispatch(listPromotion())
  
  }, [dispatch])

    
  return (
  <>
    {loading ? (<h2><Loader/></h2>) : error ? (
       <Message variant='danger'>{error}</Message>
       ): (
        <>
        <Carousel fade pause='hover' className='bg-dark'>
          {promotions.map((promotion) => (
        <Carousel.Item key={promotion._id}>
          <Link to={`/promotion/${promotion._id}`}>
            <Image src={promotion.image} alt={promotion.title} fluid/>
          </Link>
        </Carousel.Item>
      ))}
        </Carousel>
            <h1>All Promotion</h1>
            <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Offers you may like</h5>
            <Row>
                    {promotions.map((promotion) => (
                        <Col key={promotion._id} sm={6} md={6} lg={6} xl={6}>
                            <Promotion promotion= {promotion} />
                        </Col>
                    ))}
            </Row>
        </>
       )}
  </>
  )
}

export default PromotionScreen