import React, { useState, useEffect } from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_REDEEM_STAMP_RESET } from '../constants/userConstants'
import { updateVoucherRedemption } from '../actions/voucherActions'
import { redeemStamp,getUserDetails } from '../actions/userActions'

const MyVoucher = ({voucher}) => {

  const [noOfStampRedeem, setNoOfStampRedeem] = useState(0)
  //to get login user Id
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)

  return (
    <Card className='my-3 p-3 rounded' >
       
      <Card.Img src={voucher.image} variant='top'/>
      <Card.Body>
          
          <Card.Title as='h5' style={{color : 'black'}} className='mt-3'>
            <strong>{voucher.title}</strong>
          </Card.Title>
       

        <Card.Text as='div' className='mt-3' style={{paddingTop: '10px', borderTop: 'dotted'}}> 
            {voucher.subtitle}
        </Card.Text>

        <Card.Text as='div' className='mt-3' style={{paddingTop: '10px', borderTop: 'dotted'}}>
            Voucher valid for 1 month.
          </Card.Text>

          <Card.Text as='div' className='mt-3' style={{paddingTop: '10px', borderTop: 'dotted'}}>
          Voucher valid to be used for in-store purchase.
          </Card.Text>

          <Card.Text as='div' className='mt-3' style={{paddingTop: '10px', borderTop: 'dotted'}}>
          Item available is dependent on the in-store availability.
          </Card.Text>
      
      <div className='mt-3' 
      style={{textAlign: 'center', paddingTop: '10px', border: 'ridge'}}>
        <h1 style={{color:'blue'}}>{voucher.promoCode}</h1>
      </div>
      </Card.Body>
    </Card>
  )
}

export default MyVoucher