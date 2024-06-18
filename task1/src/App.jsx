import "./App.css";

function App() {
  const fetchData = async () => {
    const data = [
      { name: "John", grades: [3, 3, 3, 3, 4] },
      { name: "Jane", grades: [3, 3, 3, 3, 2] },
      { name: "Peter", grades: [3, 3, 3, 3, 5] },
      { name: "Jonas", grades: [3, 3, 3, 3, 0] },
    ];

    let tableBody = document.getElementById("data-table-body");
    if (!tableBody) {
      tableBody = document.createElement("tbody");
      tableBody.id = "data-table-body";
      document.getElementById("data-table").appendChild(tableBody);
    }
    tableBody.innerHTML = ""; // clear the table body

    data.forEach((item) => {
      const { name } = item;
      const { grades } = item;
      const row = tableBody.insertRow();
      const cellName = row.insertCell(0);
      const cellAverage = row.insertCell(1);
      const cellPassed = row.insertCell(2);
      let sum = 0;
      cellName.innerHTML = name;
      grades.forEach((grade, index) => {
        const gradeCell = row.insertCell(index + 3);
        gradeCell.innerHTML = grade;
        sum = sum + grade;
      });
      const average = sum / grades.length;
      cellAverage.innerHTML = average;
      if (average >= 3) {
        cellPassed.innerHTML = "Passed";
        cellPassed.style.backgroundColor = "green";
      } else {
        cellPassed.innerHTML = "Not Passed";
        cellPassed.style.backgroundColor = "red";
      }
    });
  };

  const removeTable = () => {
    const table = document.getElementById("data-table");
    const tableBody = document.getElementById("data-table-body");
    if (tableBody) {
      table.removeChild(tableBody);
    }
  };

  const updateTable = (name, grades) => {
    const tableBody = document.getElementById("data-table-body");
    const rows = tableBody.children;
    for (const row of rows) {
      const cells = row.children;
      if (cells[0].innerHTML === name) {
        tableBody.removeChild(row);
        const newRow = document.createElement("tr");
        const cellName = newRow.insertCell(0);
        const cellAverage = newRow.insertCell(1);
        const cellPassed = newRow.insertCell(2);
        let sum = 0;
        cellName.innerHTML = name;
        grades.forEach((grade, index) => {
          const gradeCell = newRow.insertCell(index + 3);
          gradeCell.innerHTML = grade;
          sum = sum + grade;
        });
        const average = sum / grades.length;
        cellAverage.innerHTML = average;
        if (average >= 3) {
          cellPassed.innerHTML = "Passed";
          cellPassed.style.backgroundColor = "green";
        } else {
          cellPassed.innerHTML = "Not Passed";
          cellPassed.style.backgroundColor = "red";
        }
        tableBody.appendChild(newRow);
      }
    }
  };

  return (
    <>
      <div>
        <table id="data-table">
          <tbody id="data-table-body"></tbody>
        </table>
        <button onClick={fetchData}>Show table</button>
        <button onClick={removeTable}>Remove table</button>
        <button
          onClick={() => {
            updateTable("John", [3, 3, 3, 3, 1]);
          }}
        >
          Update table
        </button>
      </div>
    </>
  );
}

export default App;
