import Typography from "@mui/material/Typography";
import "../Styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import IconButton from "@mui/material/IconButton";
// Delete Moddal Imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// Update Moddal Imports
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Todo({ todo, handleCheck, handleDelete, handleEdite }) {
  const [open, setOpen] = useState(false);
  const [ShowUpdate, setShowUpdate] = useState(false);
  const [UpdateTodo, setUpdateTodo] = useState({
    title: todo.title,
    detailes: todo.detailes,
  });

  function handleCheckClick() {
    handleCheck(todo.id);
  }
  function handleClose() {
    setOpen(false);
    setShowUpdate(false);
  }
  function handleDeleteClick() {
    handleDelete(todo.id);
  }

  function handleUpdateClick() {
    handleEdite(todo.id, UpdateTodo);
    setShowUpdate(false);
  }

  function DeleteDialogClick() {
    setOpen(true);
  }
  return (
    <>
      {/*Delete Modal */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you confirm to delete this task, it will be removed from your
            tasks list !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal*/}
      {/* Update Modal*/}

      <Dialog open={ShowUpdate} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to Update this task ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name1"
            name="email"
            label="Task Title"
            fullWidth
            variant="standard"
            value={UpdateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...UpdateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name2"
            name="email"
            label="Task Detailes"
            fullWidth
            variant="standard"
            value={UpdateTodo.detailes}
            onChange={(e) => {
              setUpdateTodo({ ...UpdateTodo, detailes: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleUpdateClick}>
            Update
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Update Modal*/}

      <Card
        className="Cardy"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: "40px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Delete icon button */}
              <IconButton
                className="IconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={DeleteDialogClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              {/* Delete icon button */}

              {/* Update icon button */}
              <IconButton
                className="IconButton"
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={() => setShowUpdate(true)}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* Update icon button */}

              {/* check icon button */}
              <IconButton
                onClick={() => handleCheckClick()}
                className="IconButton"
                aria-label="delete"
                sx={{
                  color: todo.iscompleted ? "white" : "#8bc34a",
                  background: todo.iscompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* check icon button */}
            </Grid>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.iscompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.detailes}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
