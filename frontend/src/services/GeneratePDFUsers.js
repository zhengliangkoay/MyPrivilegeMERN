// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
/// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDFUsers = users => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "NAME", "EMAIL", "ADMIN", "NUMBER OF FEEDBACK"];
  // define an empty array of rows
  const tableRows = [];
  console.log(users)

  // for each ticket pass all its data into an array
  users.forEach(user => {
    const userData = [
      user._id,
      user.name,
      user.email,
      user.isAdmin,
      user.numFeedbacks,
    ];
    console.log(userData)
    // push each tickcet's info into a row
    tableRows.push(userData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("User List Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`UserReport_${dateStr}.pdf`);
};

export default GeneratePDFUsers;