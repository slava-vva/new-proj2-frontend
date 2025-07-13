import { useState, useEffect } from "react";
import api from "../api";
import Trainers from "../components/Trainer";
import Button from "@mui/material/Button";
import "../styles/Home.css";
import Modal from "../components/Modal";
import "../index.css"

function Trainer() {
  const [trainers, setTrainers] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const handleClickOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const getTrainers = () => {
    api
      .get("/api/trainers/")
      .then((res) => res.data)
      .then((data) => {
        setTrainers(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteTrainer = (id) => {
    api
      .delete(`/api/trainers/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Trainer deleted!");
        else alert("Failed to delete Trainer.");
        getTrainers();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          alert("Error: " + JSON.stringify(err.response.data));
        } else {
          alert("Error: " + err.message);
        }
      });
  };

  var email = "email@gmail.com";
  var phone = "02123223";

  const createTrainer = (e) => {
    e.preventDefault();
    api

      .post("/api/trainers/", { first_name, last_name, email, phone })
      .then((res) => {
        if (res.status === 201) alert("Trainer created!");
        else alert("Failed to make Trainer.");
        getTrainers();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="div-bg-table div-forecolor">
      <div className="div-bg div-bg-table">
        <h2>Trainers</h2>
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
        <div className="trainer-grid">
          {trainers.map((trainer) => (
            <Trainers
              trainer={trainer}
              onDelete={deleteTrainer}
              key={trainer.id}
            />
          ))}
        </div>
      </div>
      <div className="div-madal">
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div>
            <h3>Create a Trainer</h3>
            <form onSubmit={createTrainer}>
              <label htmlFor="first_name">First Name:</label>
              <br />
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={first_name}
              />
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={last_name}
              />

              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Trainer;
