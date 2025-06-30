
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import api from "../api";
import { green } from "@mui/material/colors";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ onRecordCreated }) {

  
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        
      })
      .catch((err) => alert(err));
      
      onRecordCreated();
      setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          "background-color": "azure",
          mb: "1.5rem",
          borderColor: "green",
          color: "green",
        }}
        className="btn-bg"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Create
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={createNote}>
          <label htmlFor="title">Location:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            list="title-options"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <datalist id="title-options">
            <option value="Takapuna - Golf" />
            <option value="Mount Albert - Chamberlain Park" />
            <option value="Mount Eden" />
            <option value="North Shore" />
          </datalist>
          <label htmlFor="content">Trainer:</label>
          <br />
          <input
            type="text"
            id="content"
            name="content"
            list="content-options"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <datalist id="content-options">
            <option value="Mike Tyson" />
            <option value="Arturo Gatty" />
            <option value="Roy Jons" />
            <option value="Manny Pakhiao" />
          </datalist>
          {/* <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea> */}
          <br />
          <input type="submit" value="Submit"></input>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}
