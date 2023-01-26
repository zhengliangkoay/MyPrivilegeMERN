import React, { useState, useEffect } from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_REDEEM_STAMP_RESET } from '../constants/userConstants'
import { updateVoucher } from '../actions/voucherActions'
import { redeemStamp,getUserDetails } from '../actions/userActions'

const Voucher = ({voucher}) => {

  const [noOfStampRedeem, setNoOfStampRedeem] = useState(0)

  //to get login user Id
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const {user} = userDetails

  const [stamp, setNoOfStamp] = useState(0)

  const params = useParams();
  let navigate = useNavigate();
 
  const dispatch = useDispatch()

  const userRedeemStamp = useSelector((state) => state.redeemStamp)
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = userRedeemStamp

  // const userRedeemStamp = useSelector((state) => state.redeemStamp)
  // const {success} = userRedeemStamp
  
  useEffect(() => {
     if (successUpdate) {
      return navigate('/reward')
    } 
  }, [dispatch,successUpdate])
    

    const redeemHandler = (e,id, stampsNeeded) => {
      if (window.confirm(stampsNeeded + ' stamps will be deducted upon confirmation. Do you want to proceed?')) {
          e.preventDefault()  
          console.log('voucherID' + id)
          console.log('userId' +userInfo._id)
          const noOfStampRedeem = stampsNeeded
          console.log(noOfStampRedeem)
          //dispatch(updateVoucher({_id:userId, noOfStampEarned} ))
          dispatch(redeemStamp({_id:userInfo._id, noOfStampRedeem} ))

      }
    }
    
  return (
    <Card className='my-3 p-3 rounded' >
        <a href ={`/voucher/${voucher._id}`}>
            <Card.Img src={voucher.image} variant='top'/>
        </a>

      <Card.Body>
          
          <Card.Title as='h5' style={{color : 'black'}} className='mt-3'>
            <strong>{voucher.title}</strong>
          </Card.Title>
       

        <Card.Text as='div' className='mt-3'>
            {voucher.subtitle}
        </Card.Text>

        <Card.Text as='h4' className='mt-3' style={{textAlign: 'center', color:'blue'}}>
          {voucher.stampsNeeded} stamps
        </Card.Text>
      
      <div style={{textAlign: 'center'}}>
        <Button 
            className='mt-2' 
            type='submit' 
            variant='primary'
            onClick={(e) => redeemHandler(e,voucher._id, voucher.stampsNeeded)}>
              Redeem Stamps
        </Button>
      </div>
      </Card.Body>
    </Card>
  )
}

export default Voucher