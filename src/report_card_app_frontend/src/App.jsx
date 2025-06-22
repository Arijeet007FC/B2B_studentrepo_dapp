import React, { useState } from "react";
import "./index.scss";

function App() {
  const [studentName, setStudentName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [numSubjects, setNumSubjects] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowReport(true);
  };

  const handlePrint = () => {
    const content = document.getElementById("report-card").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Student Report Card</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f1f8e9; }
            .report-card { background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ccc; }
            h2 { color: #2e7d32; }
            p { font-size: 16px; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="report-card">
            ${content}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const average = totalMarks && numSubjects ? (parseFloat(totalMarks) / parseFloat(numSubjects)).toFixed(2) : 0;
  const grade =
    average >= 90
      ? "A"
      : average >= 80
      ? "B"
      : average >= 70
      ? "C"
      : average >= 60
      ? "D"
      : "F";

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Student Report Card DApp</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Student Name:</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="form-row">
            <label>Total Marks:</label>
            <input
              type="number"
              required
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="e.g. 270"
            />
          </div>

          <div className="form-row">
            <label>Number of Subjects:</label>
            <input
              type="number"
              required
              value={numSubjects}
              onChange={(e) => setNumSubjects(e.target.value)}
              placeholder="e.g. 3"
            />
          </div>

          <button type="submit">Show Report Card</button>
        </form>

        {showReport && (
          <>
            <div id="report-card" className="report-card">
              <h2>Report Card</h2>
              <p><strong>Student Name:</strong> {studentName}</p>
              <p><strong>Average Marks:</strong> {average}</p>
              <p><strong>Grade:</strong> {grade}</p>
            </div>
            <button className="print-btn" onClick={handlePrint}>
              Print Report Card
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
