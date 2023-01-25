import React, { useEffect } from "react";
import GeneratePDFPromotions from "../services/GeneratePDFPromotions";
import { useSelector } from 'react-redux'

const PromotionsPDF = () => {

  const promotionList = useSelector((state) => state.promotionList)
  const {promotions} = promotionList
  
  useEffect(() => {
    const getAllPromotions = async () => {
      try {
        console.log(promotions)
      } catch (err) {
        console.log("error");
      }
    };
    getAllPromotions();
  }, [promotions]);

const reportPromotions = promotions;
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => GeneratePDFPromotions(reportPromotions)}
            >
              Generate Promotions Report
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPDF;