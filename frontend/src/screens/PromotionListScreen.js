import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PROMOTION_CREATE_RESET } from '../constants/promotionConstant'
import { listPromotion, deletePromotion, createPromotion} from '../actions/promotionActions'
import PromotionsPDF from '../components/PromotionsPDF'

const PromotionListScreen = () => {
  
  let params = useParams();
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const promotionList = useSelector((state) => state.promotionList)
  const {loading, error, promotions} = promotionList
  console.log(promotionList)

  for (let promotion of promotions) {
   promotion.date= new Date(promotion.updatedAt).toLocaleDateString('en-US');
   promotion.time= new Date(promotion.updatedAt).toLocaleTimeString('en-US');
  }

  console.log(promotions)

  const promotionDelete = useSelector((state) => state.promotionDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = promotionDelete

  const promotionCreate = useSelector((state) => state.promotionCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    promotion: createdPromotion,
  } = promotionCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let navigate = useNavigate();

  useEffect(() => {
    dispatch({type: PROMOTION_CREATE_RESET})

    if (!userInfo.isAdmin) {
      navigate('/login')
    }
   
    if (successCreate) {
      navigate(`/admin/promotion/${createdPromotion._id}/edit`)
    } else {
      dispatch(listPromotion('',pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdPromotion,
    pageNumber,
    navigate
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
        dispatch(deletePromotion(id))
    }
  }

  const createHandler = () => {
     dispatch(createPromotion())
  }


  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Promotional News</h1>
        </Col>
        <Col className='text-right' style={{textAlign : 'right'}}>
          <Button className='my-3' onClick={createHandler}>
            <i className='fas fa-plus'></i> Create Promotional News
          </Button>
        </Col>
      </Row>
      

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>LAST UPDATED DATE</th>
                <th>LAST UPDATED TIME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion._id}>
                  <td>{promotion._id}</td>
                  <td>{promotion.title}</td>
                  <td>{promotion.description}</td>
                  <td>{promotion.date}</td>
                  <td>{promotion.time}</td>
                  <td>
                    <Link to={`/admin/promotion/${promotion._id}/edit`}>
                      <Button variant='light' className='btn-sm' style ={{margin : '0px 10px'}}>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      style ={{margin : '0px 10px'}}
                      onClick={() => deleteHandler(promotion._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PromotionsPDF />
        </>
      )}
    </>
  )
}

export default PromotionListScreen