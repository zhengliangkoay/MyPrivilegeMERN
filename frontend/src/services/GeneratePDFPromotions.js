// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDFPromotions = promotions => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "TITLE", "DESCRIPTION", "LAST UPDATED DATE", "LAST UPDATED TIME"];
  // define an empty array of rows
  const tableRows = [];
  console.log(promotions)
  

  // for each ticket pass all its data into an array
  promotions.forEach(promotion => {

    for (let promotion of promotions) {
      promotion.date= new Date(promotion.updatedAt).toLocaleDateString('en-US');
      promotion.time= new Date(promotion.updatedAt).toLocaleTimeString('en-US');
     }

    const promotionsData = [
      promotion._id,
      promotion.title,
      promotion.description,
      promotion.date,
      promotion.time,
    ];
    console.log(promotionsData)
    // push each tickcet's info into a row
    tableRows.push(promotionsData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Promotions List Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`promotionsReport_${dateStr}.pdf`);
};

export default GeneratePDFPromotions;