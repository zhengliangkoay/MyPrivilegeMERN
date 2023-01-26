import axios from 'axios'
import { 
    VOUCHER_CREATE_FAIL,
    VOUCHER_CREATE_REQUEST,
    VOUCHER_CREATE_SUCCESS,
    VOUCHER_DELETE_FAIL,
    VOUCHER_DELETE_REQUEST,
    VOUCHER_DELETE_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_LIST_FAIL, 
    VOUCHER_LIST_REQUEST, 
    VOUCHER_LIST_SUCCESS, 
    VOUCHER_UPDATE_FAIL, 
    VOUCHER_UPDATE_REQUEST, 
    VOUCHER_UPDATE_SUCCESS} from '../constants/voucherConstant'

// import { logout } from './userActions'

export const listVouchers = () => async (dispatch) => {
  try {
    dispatch({ type: VOUCHER_LIST_REQUEST })

    const { data } = await axios.get(`/api/voucher`)

    dispatch({
      type: VOUCHER_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: VOUCHER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVoucherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VOUCHER_DETAILS_REQUEST})

    const { data } = await axios.get(`/api/voucher/${id}`)

    dispatch({
      type: VOUCHER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VOUCHER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteVoucher = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/voucher/${id}`, config)

    dispatch({
      type: VOUCHER_DELETE_SUCCESS,
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
      type: VOUCHER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createVoucher = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/voucher`, {}, config)

    dispatch({
      type: VOUCHER_CREATE_SUCCESS,
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
      type: VOUCHER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateVoucher = (voucher) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/voucher/${voucher._id}`,voucher,config)

    dispatch({
      type: VOUCHER_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //dispatch(logout())
    }
    dispatch({
      type: VOUCHER_UPDATE_FAIL,
      payload: message,
    })
  }
}