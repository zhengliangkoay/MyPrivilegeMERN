// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDFProducts = products => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "NAME", "PRICE", "CATEGORY", "BRAND", "STOCK"];
  // define an empty array of rows
  const tableRows = [];
  console.log(products)

  // for each ticket pass all its data into an array
  products.forEach(product => {
    const productData = [
      product._id,
      product.name,
      product.price,
      product.category,
      product.brand,
      product.countInStock,
    ];
    console.log(productData)
    // push each tickcet's info into a row
    tableRows.push(productData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4] + date[5];
  // ticket title. and margin-top + margin-left
  doc.text("Product List Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`UserReport_${dateStr}.pdf`);
};

export default GeneratePDFProducts;