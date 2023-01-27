import React, { useEffect } from "react";
import GeneratePDFPromotions from "../services/GeneratePDFPromotions";
import { useSelector } from 'react-redux'
import GeneratePDFVouchers from "../services/GeneratePDFVouchers";

const VouchersPDF = () => {

  const voucherList = useSelector(state => state.voucherList)
  const {vouchers} = voucherList
  
  useEffect(() => {
    const getAllVouchers = async () => {
      try {
        console.log(vouchers)
      } catch (err) {
        console.log("error");
      }
    };
    getAllVouchers();
  }, [vouchers]);

const reportVouchers = vouchers;
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => GeneratePDFVouchers(reportVouchers)}
            >
              Generate Vouchers Report
            </button>
        </div>
      </div>
    </div>
  );
};

export default VouchersPDF;