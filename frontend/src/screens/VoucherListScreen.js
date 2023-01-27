import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { VOUCHER_CREATE_RESET } from '../constants/voucherConstant'
import { createVoucher, deleteVoucher, listVouchers } from '../actions/voucherActions'
import VouchersPDF from '../components/VouchersPDF'

const VoucherListScreen = () => {
  
  let params = useParams();
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const voucherList = useSelector((state) => state.voucherList)
  const {loading, error, vouchers} = voucherList
  console.log(voucherList)

  for (let voucher of vouchers) {
    voucher.date= new Date(voucher.updatedAt).toLocaleDateString('en-US');
    voucher.time= new Date(voucher.updatedAt).toLocaleTimeString('en-US');
  }

  console.log(vouchers)

  const voucherDelete = useSelector((state) => state.voucherDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = voucherDelete

  const voucherCreate = useSelector((state) => state.voucherCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    voucher: createdVoucher,
  } = voucherCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let navigate = useNavigate();

  useEffect(() => {
    dispatch({type: VOUCHER_CREATE_RESET})

    if (!userInfo.isAdmin) {
      navigate('/login')
    }
   
    if (successCreate) {
      navigate(`/admin/voucher/${createdVoucher._id}/edit`)
    } else {
      dispatch(listVouchers('',pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdVoucher,
    pageNumber,
    navigate
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Confirm to delete?')) {
        dispatch(deleteVoucher(id))
    }
  }

  const createHandler = () => {
     dispatch(createVoucher())
  }


  return (
    <>
    <Link to ='/' className='btn btn-light'>
      Go Back
    </Link>
      <Row className='align-items-center'>
        <Col>
          <h1>Vouchers</h1>
        </Col>
        <Col className='text-right' style={{textAlign : 'right'}}>
          <Button className='my-3' onClick={createHandler}>
            <i className='fas fa-plus'></i> Create Voucher
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
                <th>SUBTITLE</th>
                <th>DESCRIPTION</th>
                <th>STAMPS REQUIRED</th>
                <th>PROMO CODE</th>
                <th>LAST UPDATED DATE</th>
                <th>LAST UPDATED TIME</th>
                <th>EDIT VOUCHER</th>
                <th>DELETE VOUCHER</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher._id}>
                  <td>{voucher._id}</td>
                  <td>{voucher.title}</td>
                  <td>{voucher.subtitle}</td>
                  <td>{voucher.description}</td>
                  <td>{voucher.stampsNeeded}</td>
                  <td>{voucher.promoCode}</td>
                  <td>{voucher.date}</td>
                  <td>{voucher.time}</td>
                  <td>
                    <Link to={`/admin/voucher/${voucher._id}/edit`}>
                      <Button variant='light' className='btn-sm' style ={{margin : '0px 10px'}}>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      style ={{margin : '0px 10px'}}
                      onClick={() => deleteHandler(voucher._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <VouchersPDF />
        </>
      )}
    </>
  )
}

export default VoucherListScreen