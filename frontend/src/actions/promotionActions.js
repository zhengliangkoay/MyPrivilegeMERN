import axios from 'axios'
import { PROMOTION_CREATE_FAIL, 
         PROMOTION_CREATE_REQUEST, 
         PROMOTION_CREATE_SUCCESS, 
         PROMOTION_DELETE_FAIL, 
         PROMOTION_DELETE_REQUEST, 
         PROMOTION_DELETE_SUCCESS,
         PROMOTION_DETAILS_FAIL, 
         PROMOTION_DETAILS_REQUEST, 
         PROMOTION_DETAILS_SUCCESS, 
         PROMOTION_LIST_FAIL, 
         PROMOTION_LIST_REQUEST, 
         PROMOTION_LIST_SUCCESS, 
         PROMOTION_UPDATE_FAIL, 
         PROMOTION_UPDATE_REQUEST,
         PROMOTION_UPDATE_SUCCESS
      
        } from '../constants/promotionConstant'

// import { logout } from './userActions'

export const listPromotion = () => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_LIST_REQUEST })

    const { data } = await axios.get(`/api/promotion`)

    dispatch({
      type: PROMOTION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMOTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPromotionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_DETAILS_REQUEST})

    const { data } = await axios.get(`/api/promotion/${id}`)

    dispatch({
      type: PROMOTION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMOTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePromotion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/promotion/${id}`, config)

    dispatch({
      type: PROMOTION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //LOGOUT
      //dispatch(logout())
    }
    dispatch({
      type: PROMOTION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createPromotion = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/promotion`, {}, config)

    dispatch({
      type: PROMOTION_CREATE_SUCCESS,
      payload: data, 
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //dispatch(logout())
    }
    dispatch({
      type: PROMOTION_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updatePromotion = (promotion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/promotion/${promotion._id}`,promotion,config)

    dispatch({
      type: PROMOTION_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({ type: PROMOTION_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //dispatch(logout())
    }
    dispatch({
      type: PROMOTION_UPDATE_FAIL,
      payload: message,
    })
  }
}

// export const createProductReview = (productId, review) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({
//       type: PRODUCT_CREATE_REVIEW_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.post(`/api/products/${productId}/reviews`, review, config)

//     dispatch({
//       type: PRODUCT_CREATE_REVIEW_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     // if (message === 'Not authorized, token failed') {
//     //   dispatch(logout())
//     // }
//     dispatch({
//       type: PRODUCT_CREATE_REVIEW_FAIL,
//       payload: message,
//     })
//   }
// }

// export const listTopProducts = () => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_TOP_REQUEST })

//     const { data } = await axios.get(`/api/products/top`)
//     dispatch({
//       type: PRODUCT_TOP_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_TOP_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }