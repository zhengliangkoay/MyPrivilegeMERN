// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDFVouchers = vouchers => {

  const doc = new jsPDF();

  const tableColumn = ["ID", "TITLE","SUBTITLE", "DESCRIPTION", "STAMPS REQUIRED","PROMO CODE", "LAST UPDATED DATE", "LAST UPDATED TIME"];

  const tableRows = [];
  
  vouchers.forEach(voucher => {

    for (let voucher of vouchers) {
      voucher.date= new Date(voucher.updatedAt).toLocaleDateString('en-US');
      voucher.time= new Date(voucher.updatedAt).toLocaleTimeString('en-US');
     }

    const vouchersData = [
        voucher._id,
        voucher.title,
        voucher.subtitle,
        voucher.description,
        voucher.stampsNeeded,
        voucher.promoCode,
        voucher.date,
        voucher.time
    ];
    tableRows.push(vouchersData);
  });

  console.log(vouchers)
  
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text("Vouchers List Report", 14, 15);

  doc.save(`vouchersReport_${dateStr}.pdf`);
};

export default GeneratePDFVouchers;