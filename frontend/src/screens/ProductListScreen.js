import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import ProductsPDF from '../components/ProductsPDF'

const ProductListScreen = (props) => {
  
  let params = useParams();
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const useSortableData = (item, config = null) => {
  //   const [sortConfig, setSortConfig] = React.useState(null);

  //   const sortedItems  = React.useMemo(() => {
  //     let sortedProducts = [...productList.products];
  //     if(sortConfig != null){
  //       sortedProducts.sort((a, b) => {
  //         if (a[sortConfig.key] < b[sortConfig.key]) {
  //           return sortConfig.direction === 'ascending' ? -1 : 1;
  //         }
  //         if (a[sortConfig.key] > b[sortConfig.key]) {
  //           return sortConfig.direction === 'ascending' ? 1 : -1;
  //         }
  //         return 0;
  //       });
  //     }
  //     return sortedProducts;
  //   }, [products, sortConfig]);
  
  
  //   const requestSort = key => {
  //     let direction = 'ascending';
  //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //       direction = 'descending';
  //     }
  //     setSortConfig({ key, direction });
  //   }
  //   return {item: sortedItems, requestSort };
  // }

  // const {item, requestSort, sortConfig } = useSortableData(products);

  // const getClassNamesFor = (name) => {
  //   if (!sortConfig) {
  //     return;
  //   }
  //   return sortConfig.key === name ? sortConfig.direction : undefined;
  // };

  // console.log(sortConfig)

  let navigate = useNavigate();

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if (!userInfo.isAdmin) {
      navigate('/login')
    }
   
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('',pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
    navigate,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
        dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
     dispatch(createProduct())
  }


  return (
    <>
    <Link to ='/' className='btn btn-light'>
      Go Back
    </Link>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right' style={{textAlign : 'right'}}>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
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
                <th>
                {/* <button
                  type="button"
                  onClick={() => requestSort('name')}
                  className={getClassNamesFor('name')}
                >
                  NAME
                </button> */}
                NAME
                </th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>STOCK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>RM {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm' style ={{margin : '0px 10px'}}>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      style ={{margin : '0px 10px'}}
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          <ProductsPDF />
        </>
      )}
    </>
  )
}

export default ProductListScreen