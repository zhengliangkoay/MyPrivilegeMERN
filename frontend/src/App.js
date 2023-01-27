import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import PromotionScreen from './screens/PromotionScreen';
import PromotionDetailScreen from './screens/PromotionDetailScreen';
import PromotionListScreen from './screens/PromotionListScreen';
import PromotionEditScreen from './screens/PromotionEditScreen';
import CartScreen from './screens/CartScreen';
import UserWriteFeedbackScreen from './screens/UserWriteFeedbackScreen';
import UserListFeedback from './screens/UserListFeedback';
import { Container } from 'react-bootstrap'
import RewardScreen from './screens/RewardScreen';
import StampEditScreen from './screens/StampEditScreen';
import VoucherListScreen from './screens/VoucherListScreen';
import VoucherEditScreen from './screens/VoucherEditScreen';

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
        <Routes>
          <Route path = "/login" element={<LoginScreen/>} />
          <Route path = "/register" element={<RegisterScreen/>} />
          <Route path = "/profile" element={<ProfileScreen/>} />
          <Route path = "/product/:id" element={<ProductScreen/>} />
          <Route path = "/cart/:id" element={<CartScreen/>} />
          <Route path= "/cart" element={<CartScreen/>} />
          <Route path = "/reward" element={<RewardScreen/>} />
          <Route path = "/admin/user/:id/stamp" element={<StampEditScreen/>} />
          <Route path = "/admin/voucherList" element={<VoucherListScreen/>} exact />
          <Route path = "/admin/voucher/:id/edit" element={<VoucherEditScreen/>} />
          <Route path= "/promotion" element={<PromotionScreen/>} />
          <Route path= "/promotion/:id" element={<PromotionDetailScreen/>} />
          <Route path = "/admin/userlist" element={<UserListScreen/>} />
          <Route path = "/admin/user/:id/edit" element={<UserEditScreen/>} />
          <Route path = "/admin/productlist" element={<ProductListScreen/>} exact />
          <Route path = "/admin/promotionlist" element={<PromotionListScreen/>} exact />
          <Route path = "/admin/promotion/:id/edit" element={<PromotionEditScreen/>} />
          {/* <Route path = "/admin/productlist/:pageNumber" element={<ProductListScreen/>} exact/> */}
          <Route path = "/admin/product/:id/edit" element={<ProductEditScreen/>} />
          <Route path = "/search/:keyword" element={<HomeScreen/>} exact/>
          <Route path = "/feedback" element={<UserWriteFeedbackScreen/>}></Route>
          <Route path = "/:id/feedbackForUser" element={<UserListFeedback/>}></Route>
          {/* <Route path = "/search/:keyword/page/:pageNumber" element={<HomeScreen/>} exact/> */}
          {/* <Route path = "/page/:pageNumber" element={<HomeScreen/>} exact/> */}
          <Route path = "/" element={<HomeScreen/>} />
        </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
