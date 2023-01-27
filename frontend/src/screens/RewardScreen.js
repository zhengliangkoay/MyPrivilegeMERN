import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'
import { USER_CREATE_STAMP_RESET, USER_REDEEM_STAMP_RESET } from '../constants/userConstants'
import Stamp from '../components/Stamp.js'
import { ListGroup} from 'react-bootstrap'
import { listVouchers } from '../actions/voucherActions'
import Voucher from '../components/Voucher'
import MyVoucher from '../components/MyVouchers'


const RewardScreen = () => {
  
  const dispatch = useDispatch()
  let stampsHistory = [];

  const userDetails = useSelector((state) => state.userDetails)
  const {user} = userDetails
  //console.log('User',user)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //console.log('Userinfo' ,userInfo)

  const voucherList = useSelector(state => state.voucherList)
  const {loading, error, vouchers} = voucherList
  console.log(vouchers)

  useEffect(() => {
        dispatch(getUserDetails('profile'))
        dispatch(listVouchers())
  }, [dispatch ])

  // Method to render stamps that exist
  const RenderStamps = () => {
    let stamps = [];
    const countNumber = user.currentStamps;
    for (let i = 0; i < countNumber; i++) {
      stamps.push(<Stamp key={i} hasStamp={true} />);
    }
    return stamps;
  };

  //to show stamps history, change UTC to local date time
  if(user.stampsCollectHistory){  
  stampsHistory = user.stampsCollectHistory;
    for (let stampHistory of stampsHistory) {
      stampHistory.date= new Date(stampHistory.updatedAt).toLocaleDateString('en-US');
      stampHistory.time= new Date(stampHistory.updatedAt).toLocaleTimeString('en-US');
    }
  }

  return (
    <><h1>Rewards</h1>
    <h5 style={{color: 'lightseagreen', padding:'0 0 1.5rem 0', fontWeight: 'normal'}}>Spend more to collect more stamps. Stamps can be used to redeem vouchers!</h5>
    <div className="Card">
    {user.currentStamps !=0 ? (
        <>
        <div className='StampContainer'>
            <RenderStamps/>
        </div>
        <h1 style={{color: '#3808F7'}}>{user.currentStamps} stamps</h1> 
        </>
     ) : 
      (<h3 style={{color: '#3808F7'}}> Empty stamp. Spend more to earn stamps.</h3> )}
    </div>

  
    <h1>Popular Vouchers</h1>
    {(vouchers.length > 0) ? (
      <>
    <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Redeen popular vouchers now! Terms & Condition apply.</h5>
      <Row>
            {vouchers.map((voucher) => (
              !voucher.isVoucherRedeem && 
                <Col key={voucher._id} sm={12} md={6} lg={4} xl={3}>
                    <Voucher voucher= {voucher} stamps ={user.currentStamps}/>
                </Col>
            ))}
      </Row>
      </>
    ) : (
      <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Something is wrong</h5>
    ) 
    }

    <h1>My Vouchers</h1>
    {(vouchers.length > 0) ? (
      <>
    <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Claim your vouchers before expired! Terms & Condition apply.</h5>
      <Row>
            {vouchers.map((voucher) => (
              voucher.isVoucherRedeem && 
                <Col key={voucher._id} sm={12} md={6} lg={4} xl={3}>
                    <MyVoucher voucher= {voucher}/>
                </Col>
              
            ))}
      </Row>
      </>
    ) : (
      <h5 style={{fontWeight: 'normal', color: 'lightseagreen'}}>Something is wrong</h5>
    ) 
    }

    <h3>Stamps History</h3>
    
    {stampsHistory.length != 0 ? (
      <>
      {stampsHistory.map((stamp) => (
        <>
        {stamp.stampsAdded ? (
            <ListGroup variant="flush" className='listGroupStampsHistory'>
                <ListGroup.Item variant="primary">
                  Stamps added: {stamp.stampsAdded} stamps
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  Date Time: {stamp.date}, {stamp.time} 
                </ListGroup.Item>
            </ListGroup>
        ):(
        <ListGroup variant="flush" className='listGroupStampsHistory'>
              <ListGroup.Item variant="secondary" >
                Stamps redeem: {stamp.stampsRedeem} stamps
              </ListGroup.Item>
              <ListGroup.Item variant="secondary" >
                Date Time: {stamp.date}, {stamp.time} 
              </ListGroup.Item>
              <ListGroup.Item  variant="secondary" >
                Voucher: {stamp.voucherTitle} 
              </ListGroup.Item>
        </ListGroup> )
        }
        </>))}
        </>
        ) : <h5 style={{color: 'red', fontStyle: 'italic'}}>Sorry, there is no any record found</h5>
        }

    
    </>
  )}
export default RewardScreen