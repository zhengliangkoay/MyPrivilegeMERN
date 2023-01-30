// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDFProducts = products => {

  const doc = new jsPDF();

  const tableColumn = ["ID", "NAME", "PRICE", "CATEGORY", "BRAND", "STOCK"];

  const tableRows = [];
  console.log(products)

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
    tableRows.push(productData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4] + date[5];

  doc.text("Product List Report", 14, 15);

  doc.save(`ProductReport_${dateStr}.pdf`);
};

export default GeneratePDFProducts;