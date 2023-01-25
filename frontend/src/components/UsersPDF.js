import React, { useEffect, useState } from "react";
import generatePDFUsers from "../services/GeneratePDFUsers";
// import UsersComponent from "../components/UsersComponent";
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'

const UsersPDF = () => {
  
  // const [users, setUsers] = useState([]);

//   const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin
  
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        // const response  = await axios.get(`/api/users`);
        // setUsers();

        console.log(users)
      } catch (err) {
        console.log("error");
      }
    };
    getAllUsers();
    // if (userInfo && userInfo.isAdmin) {
    //     dispatch(listUsers())
    //   } 
  }, []);

const reportUsers = users;
// users.filter(user => user.isAdmin === false);
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => generatePDFUsers(reportUsers)}
            >
              Generate User Report
            </button>
       
        </div>
      </div>
      {/* <UsersComponent users={users} /> */}
    </div>
  );
};

export default UsersPDF;