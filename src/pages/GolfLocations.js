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
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClickOpenModal = () => {
    setModalOpen(true);
  };


  useEffect(() => {
    getlocations();
  }, []);

  const getlocations = () => {
    api
      .get("/api/golflocations/")
      .then((res) => res.data)
      .then((data) => {
        setLocations(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createLocation = (e) => {
    e.preventDefault();
    api
      .post("/api/golflocations/", { name, address, email, phone })
      .then((res) => {
        if (res.status === 201) alert("Location created!");
        else alert("Failed to make Location.");
        getlocations();
      })
      .catch((err) => alert(err));
      setModalOpen(false);
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/golflocations/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Location deleted!");
        else alert("Failed to delete Location.");
        getlocations();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="div-bg-table div-forecolor">
      <div className="div-bg div-bg-table">
        <h1>Golf Locations</h1>
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
                <TableCell>Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((loc) => (
                <TableRow
                  key={loc.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {loc.name}
                  </TableCell>
                  <TableCell align="right">{loc.address}</TableCell>
                  <TableCell align="right">{loc.email}</TableCell>
                  <TableCell align="right">{loc.phone}</TableCell>
                  <TableCell align="right">
                    <button
                      className="delete-button"
                      onClick={() => deleteNote(loc.id)}
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
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} >
            <div>
              <h2>Add Location</h2>
              <form onSubmit={createLocation}>
                <label htmlFor="name">Name:</label>
                <br />
                <input
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
