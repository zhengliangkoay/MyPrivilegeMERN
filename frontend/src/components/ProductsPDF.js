import React, { useEffect } from "react";
import GeneratePDFProducts from "../services/GeneratePDFProducts";
import { useSelector } from 'react-redux'

const ProductsPDF = () => {

  const productList = useSelector((state) => state.productList)
  const { products } = productList
  
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        console.log(products)
      } catch (err) {
        console.log("error");
      }
    };
    getAllProducts();
  }, [products]);

const reportProducts = products;

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => GeneratePDFProducts(reportProducts)}
            >
              Generate Product Report
            </button>
       
        </div>
      </div>
    </div>
  );
};

export default ProductsPDF;