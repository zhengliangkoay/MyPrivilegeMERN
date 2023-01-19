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

const PromotionEditScreen = () => {
  
  const params = useParams();
  const promotionId = params.id

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const promotionDetails = useSelector((state) => state.promotionDetails)
  const { loading, error, promotion } = promotionDetails

  const promotionUpdate = useSelector((state) => state.promotionUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = promotionUpdate

  let navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROMOTION_UPDATE_RESET })
      navigate('/admin/promotionList')
    } else {
      if (!promotion.title || promotion._id !== promotionId) {
        dispatch(listPromotionDetails(promotionId))
      } else {
        setTitle(promotion.title)
        setImage(promotion.image)
        setDescription(promotion.description)
      }
    }
  }, [dispatch, promotionId, promotion,successUpdate])

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
      updatePromotion({
        _id: promotionId,
        title,
        image,
        description
      })
    )
  }

  return (
    <>
      <Link to='/admin/promotionlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Promotion</h1>
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
              <Form.Control
                type='title'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mt-3' controlId='image'>
              <Form.Label>Image</Form.Label>
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

            <Form.Group className='mt-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default PromotionEditScreen