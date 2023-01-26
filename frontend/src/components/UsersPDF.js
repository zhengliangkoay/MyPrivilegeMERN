import React, { useEffect } from "react";
import generatePDFUsers from "../services/GeneratePDFUsers";
import { useSelector } from 'react-redux'

const UsersPDF = () => {

  const userList = useSelector((state) => state.userList)
  const { users } = userList
  
  useEffect(() => {
    const getAllUsers = async () => {
      try {

        console.log(users)
      } catch (err) {
        console.log("error");
      }
    };
    getAllUsers();
  }, []);

const reportUsers = users;
  
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
    </div>
  );
};

export default UsersPDF;