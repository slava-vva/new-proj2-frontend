import { useState, useEffect } from "react";
import api from "../api";
import Trainers from "../components/Trainer"
import "../styles/Home.css"

function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");

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
            .delete(`/api/trainers/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Trainer deleted!");
                else alert("Failed to delete Trainer.");
                getTrainers();
            })
            .catch((error) => alert(error));
    };

    const createTrainer = (e) => {
        e.preventDefault();
        api
            .post("/api/trainers/", { first_name, last_name })
            //.post("/api/trainers/", { first_name, last_name, 'email@gmail.com', '02123223', '01-01-2025' })
            .then((res) => {
                if (res.status === 201) alert("Trainer created!");
                else alert("Failed to make Trainer.");
                getTrainers();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Trainers</h2>
                {trainers.map((trainer) => (
                    <Trainers trainer={trainer} onDelete={deleteTrainer} key={trainer.id} />
                ))}
            </div>
            <h2>Create a Trainer</h2>
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
                {/* <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={last_name}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br /> */}
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Trainer;