import React from "react";
import "./TrainerCard.css";

function Trainers({ trainer, onDelete }) {
  const formattedDate = new Date(trainer.created_at).toLocaleDateString("en-US");

  return (
    <div className="trainer-card">
      <img
        src="https://placehold.co/200" // Replace with trainer.photo if available
        //src="https://icons-for-free.com/iff/png/256/boy+man+person+user+woman+icon-1320085967769585303.png"
        alt={`${trainer.first_name} ${trainer.last_name}`}
        className="trainer-photo"
      />
      <div className="trainer-details">
        <h3>{trainer.first_name} {trainer.last_name}</h3>
        <p>Joined: {formattedDate}</p>
        <button className="edit-button" >Edit</button>
        <button className="delete-button" onClick={() => onDelete(trainer.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Trainers;
