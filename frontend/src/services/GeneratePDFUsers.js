// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDFUsers = users => {

  const doc = new jsPDF();

  const tableColumn = ["ID", "NAME", "EMAIL", "ADMIN", "NUMBER OF FEEDBACK"];

  const tableRows = [];
  console.log(users)

  users.forEach(user => {
    const userData = [
      user._id,
      user.name,
      user.email,
      user.isAdmin,
      user.numFeedbacks,
    ];
    console.log(userData)
    tableRows.push(userData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
 
  doc.text("User List Report", 14, 15);
  doc.text("True = User is Admin", 14, 140);
  doc.text("False = User is Not Admin", 14, 150);
  
  doc.save(`UserReport_${dateStr}.pdf`);
};

export default GeneratePDFUsers;