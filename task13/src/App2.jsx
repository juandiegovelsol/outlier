import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Reservations() {
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs("2024-06-19T11:00:00.000Z"));
  const [persons, setPersons] = useState("");
  const [reservations, setReservations] = useState({
    "2024-06-19": {
      "11:00": 0,
      "12:00": 0,
      "13:00": 0,
      "14:00": 0,
      "15:00": 0,
      "16:00": 0,
      "17:00": 0,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateStr = date.format("YYYY-MM-DD");
    const timeStr = time.format("HH:mm");
    if (!reservations[dateStr]) {
      reservations[dateStr] = {
        "11:00": 0,
        "12:00": 0,
        "13:00": 0,
        "14:00": 0,
        "15:00": 0,
        "16:00": 0,
        "17:00": 0,
      };
    }
    if (reservations[dateStr][timeStr] >= 95) {
      alert("Time slot is full.");
      return;
    }
    reservations[dateStr][timeStr] += parseInt(persons);
    setReservations({ ...reservations });
    alert("Reservation made successfully.");
  };

  const isTimeSlotAvailable = (time) => {
    const dateStr = date.format("YYYY-MM-DD");
    const timeStr = time.format("HH:mm");
    if (reservations[dateStr] && reservations[dateStr][timeStr] >= 95) {
      return false;
    }
    return true;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          minDate={dayjs()}
        />
        <TimePicker
          label="Time"
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          minTime={dayjs("2024-06-19T11:00:00.000Z")}
          maxTime={dayjs("2024-06-19T17:00:00.000Z")}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === "hours" && (timeValue < 11 || timeValue > 17)) {
              return true;
            }
            if (clockType === "minutes" && timeValue !== 0) {
              return true;
            }
            return !isTimeSlotAvailable(timeValue);
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="persons-label">Number of Persons</InputLabel>
          <Select
            labelId="persons-label"
            id="persons-select"
            value={persons}
            label="Number of Persons"
            onChange={(e) => setPersons(e.target.value)}
          >
            {[...Array(101).keys()].slice(1).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button type="submit">Make Reservation</button>
      </form>
    </LocalizationProvider>
  );
}

function App() {
  return (
    <div>
      <Reservations />
    </div>
  );
}

export default App;
