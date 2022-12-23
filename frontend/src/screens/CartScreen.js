import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {

    let navigate = useNavigate();
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const params = useParams();
    const productId = params.id
    const [searchParams] = useSearchParams();
    const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1
 
    const dispatch = useDispatch()

  

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) { 
        dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => { 
    dispatch(removeFromCart(id))
  }

  const [isSubmit, setSubmit] = useState(false);
  const handleSubmit = () => setSubmit(true);
  console.log(isSubmit)

  const checkoutHandler = () => {
     if (!userInfo) {
        return navigate('/login')
     }
     else if (userInfo){
       console.log('order has been submitted')
     }
  }

  return (
    
    <Row>
    {isSubmit && <Message variant='success'>Your order is submitted. The kitchen will be processing your order immediately.</Message>}
      <Col md={8}>
        <h1>Order Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : ( 
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item  key={item.product}>
                <Row className='mt-3'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} >
                    <Link to={`/product/${item.product}`} style={{textDecorationLine: 'none'}}>
                    <div style={{color : 'black'}}>{item.name}</div>
                    </Link>
                  </Col>
                  <Col md={2}>RM {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
            {/* acc is accumulator */}
              <h2>  
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
             <h2>RM {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)} 
            </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={!isSubmit ? handleSubmit : null}
              >
              {isSubmit ? 'Order is submitted' : 'Submit order'}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      
      {/* <Alert isSubmit={isSubmit} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert> */}
     

    </Row>
  
        

  )
}

export default CartScreen