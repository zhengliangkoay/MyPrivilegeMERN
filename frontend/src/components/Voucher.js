import React, { useState, useEffect } from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_REDEEM_STAMP_RESET } from '../constants/userConstants'
import { updateVoucherRedemption } from '../actions/voucherActions'
import { redeemStamp,getUserDetails } from '../actions/userActions'
import Message from '../components/Message'

const Voucher = ({voucher, stamps}) => {
  console.log(stamps)
  const [noOfStampRedeem, setNoOfStampRedeem] = useState(0)
  //to get login user Id
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const {user} = userDetails
  // const [stamp, setNoOfStamp] = useState(0)
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch()

  // const userRedeemStamp = useSelector((state) => state.redeemStamp)
  // const {success} = userRedeemStamp
  
  // useEffect(() => {
  //    if (successUpdate) {
  //     return navigate('/reward')
  //   } 
  // }, [dispatch,successUpdate])
    const [message, setMessage] = useState(null)

    const redeemHandler = (e,voucherId, stampsNeeded,title) => {
      if (window.confirm(stampsNeeded + ' stamps will be deducted upon confirmation. Do you want to proceed?')) {
          e.preventDefault();
          const noOfStampRedeem = stampsNeeded
          const voucherTitle = title
          let isVoucherRedeem = true
          if(stamps<stampsNeeded){
            setMessage('Stamp is not enough to redeem')
          }else{
            dispatch(updateVoucherRedemption({_id:voucherId, isVoucherRedeem} ))
            dispatch(redeemStamp({_id:userInfo._id, noOfStampRedeem,voucherTitle} ))
            window.location.reload(false);
          }
      }
    }
    
  return (
    <>
    <Card className='my-3 p-3 rounded' >
       
      <Card.Img src={voucher.image} variant='top'/>
      <Card.Body>
          
          <Card.Title as='h5' style={{color : 'black'}} className='mt-3'>
            <strong>{voucher.title}</strong>
          </Card.Title>

        <Card.Text as='div' className='mt-3' style={{paddingTop: '10px', borderTop: 'dotted'}}>
            {voucher.subtitle}
        </Card.Text>

        <Card.Text  style={{textAlign: 'center', marginBottom: '0rem'}}>
          <h1 style={{color:'blue'}}>{voucher.stampsNeeded} stamps</h1>
        </Card.Text>
      
      <div style={{textAlign: 'center'}}>
      <Button 
            className='mt-2' 
            type='submit' 
            variant='primary'
            onClick={ (e) => 
            redeemHandler(e,voucher._id, voucher.stampsNeeded, voucher.title)}>
              Redeem Stamps
        </Button>
      
      </div>
      </Card.Body>
    </Card>
    {message && <Message variant='danger'>{message}</Message>}
    </>
  )
}

export default Voucher