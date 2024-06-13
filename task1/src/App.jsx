import "./App.css";

function App() {
  const fetchData = async (url) => {
    try {
      /*  const response = await fetch(url);
    const data = await response.json(); */
      const data = url; // Simulating data fetching
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tablePopulation = async (data) => {
    const table = document.getElementById("data-table");
    data.forEach((item) => {
      const { name, grades } = item;
      const row = table.insertRow();
      const cellName = row.insertCell(0);
      const cellAverage = row.insertCell(1);
      const cellPassed = row.insertCell(2);
      let sum = 0;
      cellName.innerHTML = name;
      const cellGrades = row.insertCell(3);
      cellGrades.innerHTML = grades.join(", ");
      grades.forEach((grade) => {
        sum += grade;
      });
      const average = sum / grades.length;
      cellAverage.innerHTML = average.toFixed(2);
      if (average >= 3) {
        cellPassed.innerHTML = "Passed";
        cellPassed.style.backgroundColor = "green";
      } else {
        cellPassed.innerHTML = "Not Passed";
        cellPassed.style.backgroundColor = "red";
      }
    });
  };

  const main = async () => {
    const data = [
      { name: "juan D", grades: [3, 3, 3, 3, 4] },
      { name: "juan Di", grades: [3, 3, 3, 3, 2] },
      { name: "juan Die", grades: [3, 3, 3, 3, 5] },
      { name: "juan Dieg", grades: [3, 3, 3, 3, 0] },
    ];
    const fetchData1 = await fetchData(data);
    if (fetchData1) {
      tablePopulation(fetchData1);
    }
  };

  /* const fetchData = (data) => {
    try {
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tablePopulation = (data) => {
    try {
      const table = document.getElementById("data-table");
      data.forEach((item) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = item.name;
        cell2.innerHTML = item.value;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTable = (index, name, value) => {
    try {
      const table = document.getElementById("data-table");
      const rows = table.rows;
      if (index < rows.length) {
        rows[index].cells[0].innerHTML = name;
        rows[index].cells[1].innerHTML = value;
      } else {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = name;
        cell2.innerHTML = value;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const main = async () => {
    const data = [
      { name: "juan", value: 10 },
      { name: "juan", value: 11 },
      { name: "juan", value: 12 },
      { name: "juan", value: 13 },
    ];
    const fetchData1 = fetchData(data);
    if (fetchData1) {
      tablePopulation(fetchData1);
      updateTable(0, "Updated Name", "Updated Value");
    }
  }; */

  return (
    <>
      <div>
        <table id="data-table"></table>
        <button onClick={main}>Show table</button>
      </div>
    </>
  );
}

export default App;
