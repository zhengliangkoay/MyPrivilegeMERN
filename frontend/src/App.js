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
import { Container } from 'react-bootstrap'


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
          <Route path = "/admin/userlist" element={<UserListScreen/>} />
          <Route path = "/admin/user/:id/edit" element={<UserEditScreen/>} />
          <Route path = "/" element={<HomeScreen/>} />
        </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
