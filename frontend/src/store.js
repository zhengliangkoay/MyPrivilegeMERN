import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducer' 
import { 
  productDetailsReducer, 
  productListReducer,
  productReviewCreateReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productTopRatedReducer
} from './reducers/productReducers'

import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer, 
  userListReducer, 
  userDeleteReducer,
  userUpdateReducer,
  userFeedbackCreateReducer,
  userCreateStampReducer,
  userRedeemStampReducer,
} from './reducers/userReducers'

import { 
  promotionDetailsReducer, 
  promotionListReducer,
  promotionDeleteReducer,
  promotionCreateReducer,
  promotionUpdateReducer,
} from './reducers/promotionReducers'

import { 
  voucherCreateReducer, 
  voucherDeleteReducer, 
  voucherDetailsReducer, 
  voucherListReducer, 
  voucherUpdateReducer } from './reducers/voucherReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userFeedbackCreate: userFeedbackCreateReducer,
  cart: cartReducer,
  promotionList: promotionListReducer,
  promotionDetails: promotionDetailsReducer,
  promotionCreate: promotionCreateReducer,
  promotionDelete: promotionDeleteReducer,
  promotionUpdate: promotionUpdateReducer,
  createStamp: userCreateStampReducer,
  redeemStamp: userRedeemStampReducer,
  voucherList: voucherListReducer,
  voucherDetails: voucherDetailsReducer,
  voucherCreate: voucherCreateReducer,
  voucherUpdate: voucherUpdateReducer,
  voucherDelete: voucherDeleteReducer
})

const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    // shippingAddress: shippingAddressFromStorage,
  },
  userLogin : {userInfo: userInfoFromStorage}
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store