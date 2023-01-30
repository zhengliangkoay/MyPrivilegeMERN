// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDFFeedbacks = feedbacks => {

  const doc = new jsPDF();

  const tableColumn = ["ID", "CATEGORY", "COMMENT", "CREATED DATE", "CREATED TIME"];

  const tableRows = [];
  console.log(feedbacks)
  
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

    tableRows.push(feedbacksData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text("Feedbacks List Report", 14, 15);

  doc.save(`FeedbacksReport_${dateStr}.pdf`);
};

export default GeneratePDFFeedbacks;