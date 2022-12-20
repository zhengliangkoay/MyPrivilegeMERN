import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer,productDeleteReducer,productCreateReducer,productUpdateReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer,userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin : {userInfo: userInfoFromStorage}
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store