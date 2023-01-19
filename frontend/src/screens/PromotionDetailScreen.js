import React, { useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form, Card, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
import { listPromotionDetails } from '../actions/promotionActions'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon
} from "react-share";

const PromotionDetailScreen = () => {
    const dispatch = useDispatch()
    const params = useParams();
    //const product = products.find((p) => p._id === params.id)

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const promotionDetails = useSelector(state => state.promotionDetails)
    const {loading,error,promotion} = promotionDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
      dispatch(listPromotionDetails(params.id))
    }, [dispatch, params])

  let navigate = useNavigate();  
  const shareUrl = window.location.href;
    
  return (
    <>
      <Link to = '/promotion' className='btn btn-light my-3'>Go Back</Link>

      {loading ? <Loader/> : error ? ( <Message variant='danger'>{error}</Message>): (
      <>
      <Meta title = {promotion.title}/>
      <Row>
      <Image src = {promotion.image} alt={promotion.title} fluid style ={{paddingLeft: '200px',paddingRight: '200px'}}/> 
      </Row>
      <Col md={12}>
      
            <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h1>{promotion.title}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {promotion.description}
                  </ListGroup.Item>
                
                  <ListGroup.Item>
                  <Link to = '/' className='btn btn-outline-dark my-3'>Get it now</Link>
                  </ListGroup.Item>
                  
                  <ListGroupItem>
                  <h5>Share it</h5>
                    <FacebookShareButton
                          style ={{margin:'5px'}}
                          url={shareUrl}
                          quote="Check out this food from It's Kopi cafe!"
                          hashtag={'#itskopi...'}>
                          <FacebookIcon size={40} round={true} />
                        </FacebookShareButton> 

                    <WhatsappShareButton
                          style ={{margin:'5px'}}
                          url={shareUrl}
                          title="Check out this food from It's Kopi cafe!">
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>  

                      <TwitterShareButton
                          style ={{margin:'5px'}}
                          url={shareUrl}
                          title="Check out this food from It's Kopi cafe!"
                          hashtag={'#itskopi...'}>
                          <TwitterIcon size={40} round={true} />
                      </TwitterShareButton>

                      <TelegramShareButton
                          style ={{margin:'5px'}}
                          url={shareUrl}
                          title="Check out this food from It's Kopi cafe!"
                          hashtag={'#itskopi...'}>
                          <TelegramIcon size={40} round={true} />
                      </TelegramShareButton>       

                  </ListGroupItem>

                  
                </ListGroup>
           
        </Col>
      
      </>

    ) }
         
    
    </>
  )
}

export default PromotionDetailScreen