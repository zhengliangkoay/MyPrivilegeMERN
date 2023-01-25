import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { USER_CREATE_STAMP_RESET } from '../constants/userConstants'
import { collectStamp } from '../actions/userActions'
import PullToRefresh from 'react-simple-pull-to-refresh';
import Stamp from '../components/Stamp'

const RewardScreen = (props) => {
  
  const dispatch = useDispatch()
  const params = useParams();


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)


  // Method to render stamps that exist
  const RenderStamps = () => {
    let stamps = [];
    let countNumber = userInfo.currentStamps;
    for (let i = 0; i < countNumber; i++) {
      stamps.push(<Stamp key={i} hasStamp={true} />);
    }
    return stamps;
  };

  // // Method to render stamps that exist
  // const addStamps = () => {
  //   let stamps = [];
  //   for (let i = 0; i < userInfo.currentStamps; i++) {
  //     stamps.push(<Stamp key={i} hasStamp={true} />);
  //   }
  //   return stamps;
  // };

  // let allStamps = [];
  // if (userInfo.currentStamps < 10) {
  //   let stamps = renderStamps();
  //   let hasStamps = addStamps();
  //   allStamps.push(hasStamps, stamps);
  // }

  const [stamp, setNoOfStamp] = useState(0)

  // const collectStamp = useSelector(state => state.collectStamp)
  //   const {
  //       loading: loadingCollectStamp,
  //       error: errorCollectStamp,
  //       success: successCollectStamp 
  //   } = collectStamp

  let navigate = useNavigate();

  // useEffect(() => {
  //   if (successCollectStamp) {
  //       alert('Stamp Collected Successfully')
  //       setNoOfStamp(0)
  //       dispatch({ type: USER_CREATE_STAMP_RESET})
  //   }
  // }, [dispatch, params, successCollectStamp])

  return (
    <><h1>Rewards</h1>
    <div className="Card">
      <div className='StampContainer'>
          <RenderStamps/>
      </div>
    </div>
    </>
  )}
export default RewardScreen
