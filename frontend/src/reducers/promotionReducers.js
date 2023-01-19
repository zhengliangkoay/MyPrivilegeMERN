import { PROMOTION_CREATE_FAIL, 
         PROMOTION_CREATE_REQUEST, 
         PROMOTION_CREATE_RESET, 
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
         PROMOTION_UPDATE_RESET,
         PROMOTION_UPDATE_SUCCESS
        } from '../constants/promotionConstant'

  
  export const promotionListReducer = (state = { promotions: [] }, action) => {
    switch (action.type) {
      case PROMOTION_LIST_REQUEST:
        return { loading: true, promotions: [] }
      case PROMOTION_LIST_SUCCESS:
        return {
          loading: false,
          promotions: action.payload.promotions,
          // pages:action.payload.pages,
          // page:action.payload.page
        }
      case PROMOTION_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const promotionDetailsReducer = (
    state = { promotion: {} },
    action
  ) => {
    switch (action.type) {
      case PROMOTION_DETAILS_REQUEST:
        return { ...state, loading: true }
      case PROMOTION_DETAILS_SUCCESS:
        return { loading: false, promotion: action.payload }
      case PROMOTION_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const promotionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PROMOTION_DELETE_REQUEST:
        return { loading: true }
      case PROMOTION_DELETE_SUCCESS:
        return { loading: false, success: true }
      case PROMOTION_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const promotionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PROMOTION_CREATE_REQUEST:
        return { loading: true }
      case PROMOTION_CREATE_SUCCESS:
        return { loading: false, success: true, promotion: action.payload }
      case PROMOTION_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case PROMOTION_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const promotionUpdateReducer = (state = { promotion: {} }, action) => {
    switch (action.type) {
      case PROMOTION_UPDATE_REQUEST:
        return { loading: true }
      case PROMOTION_UPDATE_SUCCESS:
        return { loading: false, success: true, promotion: action.payload }
      case PROMOTION_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case PROMOTION_UPDATE_RESET:
        return { promotion: {} }
      default:
        return state
    }
  }
  
  // export const productReviewCreateReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case PRODUCT_CREATE_REVIEW_REQUEST:
  //       return { loading: true }
  //     case PRODUCT_CREATE_REVIEW_SUCCESS:
  //       return { loading: false, success: true }
  //     case PRODUCT_CREATE_REVIEW_FAIL:
  //       return { loading: false, error: action.payload }
  //     case PRODUCT_CREATE_REVIEW_RESET:
  //       return {}
  //     default:
  //       return state
  //   }
  // }
  
  // export const productTopRatedReducer = (state = { topProducts: [] }, action) => {
  //   switch (action.type) {
  //     case PRODUCT_TOP_REQUEST:
  //       return { loading: true, topProducts: [] }
  //     case PRODUCT_TOP_SUCCESS:
  //       return { loading: false, topProducts: action.payload }
  //     case PRODUCT_TOP_FAIL:
  //       return { loading: false, error: action.payload }
  //     default:
  //       return state
  //   }
  // }