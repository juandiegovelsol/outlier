import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "./App.css";

const timeSlots = [
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
];

function Reservations() {
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [persons, setPersons] = useState(0);
  const [reservations, setReservations] = useState({
    "2024-06-19": {
      "11:00": 0,
      "12:00": 0,
      "13:00": 0,
      "14:00": 0,
      "15:00": 0,
      "16:00": 0,
    },
  });

  const handleTimeSlotChange = (option) => {
    setTimeSlot(option.value);
  };

  const handlePersonsChange = (event) => {
    setPersons(event.target.value);
  };

  const handleMakeReservation = () => {
    const date = startDate.toISOString().split("T")[0];
    if (!reservations[date]) {
      setReservations((prevReservations) => ({
        ...prevReservations,
        [date]: {
          "11:00": 0,
          "12:00": 0,
          "13:00": 0,
          "14:00": 0,
          "15:00": 0,
          "16:00": 0,
        },
      }));
    }

    setReservations((prevReservations) => {
      const newReservations = { ...prevReservations };
      newReservations[date][timeSlot] += parseInt(persons);
      return newReservations;
    });

    setPersons(0);
  };

  const availableTimeSlots = timeSlots.filter((slot) => {
    const date = startDate.toISOString().split("T")[0];
    return !reservations[date] || reservations[date][slot.value] < 95;
  });

  return (
    <div className="App">
      <h1>Make a Reservation</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
      />
      <Select
        options={availableTimeSlots}
        value={availableTimeSlots.find((slot) => slot.value === timeSlot)}
        onChange={handleTimeSlotChange}
      />
      <input
        type="number"
        value={persons}
        onChange={handlePersonsChange}
        placeholder="Number of persons"
      />
      <button onClick={handleMakeReservation}>Make Reservation</button>
      <pre>{JSON.stringify(reservations, null, 2)}</pre>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Reservations />
    </div>
  );
}

export default App;
