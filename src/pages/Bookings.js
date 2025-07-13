import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import api from "../api";
import "../index";
import Modal from "../components/Modal";

export default function GolfLocations() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState("");
  const [class_date, setClassDate] = useState("");
  const [location, setLocation] = useState("");
  const [trainer, setTrainer] = useState("");
  const [training_type, setTrainingType] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const handleClickOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    api
      .get("/api/bookings2/")
      .then((res) => res.data)
      .then((data) => {
        setBookings(data);
        //console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createBooking = (e) => {
    console.log("class_date=", class_date, "!!!");

    e.preventDefault();
    api
      .post("/api/bookings2/", {
        user,
        class_date,
        location,
        trainer,
        training_type,
      })
      .then((res) => {
        if (res.status === 201) alert("Booking created!");
        else alert("Failed to make Booking.");
        getBookings();
      })
      .catch((err) => {
        console.error("Booking Error:", err.response?.data || err.message);
        alert("Error creating booking. Check console.");
      });
    setModalOpen(false);
  };

  const deleteBooking = (id) => {
    api
      .delete(`/api/bookings2/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Location deleted!");
        else alert("Failed to delete Location.");
        getBookings();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="div-bg-table div-forecolor">
      <div className="div-bg div-bg-table">
        <h1>Bookings</h1>
        <Button
          sx={{
            "background-color": "azure",
            mb: "1.5rem",
            borderColor: "green",
            color: "green",
          }}
          className="btn-bg"
          variant="outlined"
          onClick={handleClickOpenModal}
        >
          Create
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Class Date</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Trainer</TableCell>
                <TableCell align="right">Training Type</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book.user}
                  </TableCell>
                  <TableCell align="right">{new Date(book.class_date).toLocaleString()}</TableCell>
                  <TableCell align="right">{book.location}</TableCell>
                  <TableCell align="right">{book.trainer}</TableCell>
                  <TableCell align="right">{book.training_type}</TableCell>
                  <TableCell align="right">
                    <button
                      className="delete-button"
                      onClick={() => deleteBooking(book.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div>
              <h2 style={{ color: "black" }}>Add Booking</h2>
              <form onSubmit={createBooking}>
                <label htmlFor="user">User:</label>
                <br />
                <input
                  id="user"
                  name="user"
                  required
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
                <label htmlFor="class_date">Class Date:</label>
                <br />
                <input
                  type="datetime-local"
                  id="class_date"
                  name="class_date"
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    const padded = value.length === 16 ? value + ":00" : value;
                    setClassDate(padded);
                  }}
                  value={class_date}
                ></input>
                <br />
                <label htmlFor="location">Location:</label>
                <br />
                <input
                  id="location"
                  name="location"
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  list="datalistPlaceOfTraining"
                ></input>
                <datalist id="datalistPlaceOfTraining">
                  <option value="Chamberlain Park Golf Cource" />
                  <option value="Gulf Harbour Country Club" />
                  <option value="Omaha Beach Golf Club" />
                  <option value="Wainui Golf Course" />
                  <option value="Titirangi Golf Club" />
                  <option value="Remuera Golf Club" />
                </datalist>
                <br />
                <label htmlFor="trainer">Trainer:</label>
                <br />
                <input
                  id="trainer"
                  name="trainer"
                  required
                  onChange={(e) => setTrainer(e.target.value)}
                  value={trainer}
                ></input>
                <br />
                <label htmlFor="training_type">Training Type:</label>
                <br />
                <input
                  id="training_type"
                  name="training_type"
                  required
                  onChange={(e) => setTrainingType(e.target.value)}
                  value={training_type}
                  list="datalistTrainingType"
                ></input>
                <datalist id="datalistTrainingType">
                  <option value="Beginner" />
                  <option value="Lite training" />
                  <option value="Middle exersise" />
                  <option value="Hard training" />
                  <option value="Profession sparring" />
                </datalist>
                <br />
                <input type="submit" value="Submit"></input>
              </form>
            </div>
          </Modal>
        </div>
        {/* <div>
          <h2>Add Location</h2>
          <form onSubmit={createLocation}>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="address">Address:</label>
            <br />
            <input
              id="address"
              name="address"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></input>
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <br />
            <label htmlFor="phone">Phone:</label>
            <br />
            <input
              id="phone"
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            ></input>
            <br />
            <input type="submit" value="Submit"></input>
          </form>
        </div> */}
      </div>
    </div>
  );
}
