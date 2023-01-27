import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPromotionDetails, updatePromotion } from '../actions/promotionActions'
import { PROMOTION_UPDATE_RESET } from '../constants/promotionConstant'
import { VOUCHER_UPDATE_RESET } from '../constants/voucherConstant'
import { listVoucherDetails, updateVoucher } from '../actions/voucherActions'

const VoucherEditScreen = () => {
  
  const params = useParams();
  const voucherId = params.id

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [stampsNeeded, setStampsNeeded] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const voucherDetails = useSelector((state) => state.voucherDetails)
  const { loading, error, voucher } = voucherDetails

  const voucherUpdate = useSelector((state) => state.voucherUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = voucherUpdate

  let navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VOUCHER_UPDATE_RESET })
      navigate('/admin/voucherList')
    } else {
      if (!voucher.title || voucher._id !== voucherId) {
        dispatch(listVoucherDetails(voucherId))
      } else {
        setTitle(voucher.title)
        setSubtitle(voucher.subtitle)
        setDescription(voucher.description)
        setImage(voucher.image)
        setStampsNeeded(voucher.stampsNeeded)
        setPromoCode(voucher.promoCode)
      }
    }
  }, [dispatch, voucherId, voucher,successUpdate])

  const uploadFileHandler = async (e) => {
    
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      //make a request
      const { data } = await axios.post('/api/upload', formData, config)
 
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVoucher({
        _id: voucherId,
        title,
        subtitle,
        description,
        image,
        stampsNeeded,
        promoCode
      })
    )
  }

  return (
    <>
      <Link to='/admin/voucherList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Voucher</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='subtitle'>
              <Form.Label>Subtitle</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='subtitle'
                placeholder='Enter subtitle'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                className='mt-3'
                type="file"
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='mt-3' controlId='stampsNeeded'>
              <Form.Label>Stamps Needed</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='stampsNeeded'
                placeholder='Enter stamps Needed'
                value={stampsNeeded}
                onChange={(e) => setStampsNeeded(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='promoCode'>
              <Form.Label>Promo Code</Form.Label>
              <Form.Label style = {{color: 'red'}}>*</Form.Label>
              <Form.Control
                type='promoCode'
                placeholder='Enter promo code'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Button className='mt-4' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default VoucherEditScreen