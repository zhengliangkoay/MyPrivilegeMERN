import React, { useEffect } from "react";
import GeneratePDFFeedbacks from "../services/GeneratePDFFeedbacks";
import { useSelector } from 'react-redux'

const ProductsPDF = () => {
  
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const feedbacks = user.feedbacks
  
  useEffect(() => {
    const getAllFeedbacks = async () => {
      try {
        console.log(feedbacks)
      } catch (err) {
        console.log("error");
      }
    };
    getAllFeedbacks();
  }, [feedbacks]);

const reportFeedbacks = feedbacks;
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => GeneratePDFFeedbacks(reportFeedbacks)}
            >
              Generate Feedback Report
            </button>
       
        </div>
      </div>
    </div>
  );
};

export default ProductsPDF;