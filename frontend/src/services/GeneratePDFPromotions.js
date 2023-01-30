// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDFPromotions = promotions => {

  const doc = new jsPDF();

  const tableColumn = ["ID", "TITLE", "DESCRIPTION", "LAST UPDATED DATE", "LAST UPDATED TIME"];

  const tableRows = [];
  console.log(promotions)
  
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
    tableRows.push(promotionsData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text("Promotions List Report", 14, 15);

  doc.save(`PromotionsReport_${dateStr}.pdf`);
};

export default GeneratePDFPromotions;