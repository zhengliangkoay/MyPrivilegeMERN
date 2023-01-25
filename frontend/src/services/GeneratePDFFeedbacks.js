// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDFFeedbacks = feedbacks => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "CATEGORY", "COMMENT", "CREATED DATE", "CREATED TIME"];
  // define an empty array of rows
  const tableRows = [];
  console.log(feedbacks)
  

  // for each ticket pass all its data into an array
  feedbacks.forEach(feedback => {

    for (let feedback of feedbacks) {
      feedback.date= new Date(feedback.updatedAt).toLocaleDateString('en-US');
      feedback.time= new Date(feedback.updatedAt).toLocaleTimeString('en-US');
     }

    const feedbacksData = [
      feedback._id,
      feedback.category,
      feedback.comment,
      feedback.date,
      feedback.time,
    ];
    console.log(feedbacksData)
    // push each tickcet's info into a row
    tableRows.push(feedbacksData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Feedbacks List Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`feedbacksReport_${dateStr}.pdf`);
};

export default GeneratePDFFeedbacks;