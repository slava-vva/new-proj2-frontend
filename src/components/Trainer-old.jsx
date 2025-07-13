import React from "react";
import "../styles/Note.css"

function Trainer({ trainer, onDelete }) {
    const formattedDate = new Date(trainer.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title">{trainer.first_name}</p>
            <p className="note-content">{trainer.last_name}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(trainer.id)}>
                Delete
            </button>
        </div>
    );
}

export default Trainer