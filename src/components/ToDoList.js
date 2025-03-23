import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// cards
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../Styles.css";
import { Divider } from "@mui/material";

// Icons
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Components
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";

const initial_todos = [
  {
    id: uuidv4(),
    title: "Read A Book1",
    detailes: "xxxxxxx Book1",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    title: "Read A Book2",
    detailes: "xxxxxxx Book2",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    title: "Read A Book3",
    detailes: "xxxxxxx Book3",
    iscompleted: false,
  },
];

export default function ToDoList() {
  const [todos, setTodos] = useState(initial_todos);
  const [txtInput, SetTxtInput] = useState({ title: "", detailes: "" });
  const [displayType, setDisplayType] = useState("All");

  function ChangTaskType(e) {
    setDisplayType(e.target.value);
  }
  //console.log(TaskType);
  const completed = todos.filter((t) => {
    return t.iscompleted;
  });
  const uncompleted = todos.filter((t) => {
    return !t.iscompleted;
  });
  let renderdTodo = [];
  switch (displayType) {
    case "Completed":
      renderdTodo = completed;
      break;
    case "Remain":
      renderdTodo = uncompleted;
      break;
    default:
      renderdTodo = todos;
  }

  function handleCheckClick(TodoId) {
    const updatedTodo = todos.map((t) => {
      if (t.id === TodoId) {
        t.iscompleted = !t.iscompleted;
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("storagetodos", JSON.stringify(updatedTodo));
  }
  function handleDelete(TodoId) {
    // eslint-disable-next-line array-callback-return
    const update = todos.filter((t) => {
      return t.id !== TodoId;
    });
    setTodos(update);
    localStorage.setItem("storagetodos", JSON.stringify(update));
  }
  function UpdateTodo(TodoId, updatedTodos) {
    const updatedTodo = todos.map((t) => {
      if (t.id === TodoId) {
        //alert("Id from Todo : " + TodoId);
        return {
          ...t,
          title: updatedTodos.title,
          detailes: updatedTodos.detailes,
        };
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("storagetodos", JSON.stringify(updatedTodo));
  }

  const todosjx = renderdTodo.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        handleCheck={handleCheckClick}
        handleDelete={handleDelete}
        handleEdite={UpdateTodo}
      />
    );
  });

  useEffect(() => {
    // console.log("useEffect worked");
    const storedTodos = JSON.parse(localStorage.getItem("storagetodos")) ?? [];
    setTodos(storedTodos);
  }, []);

  function HandleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: txtInput.title,
      detailes: txtInput.detailes,
      iscompleted: false,
    };
    const AddTodo = [...todos, newTodo];
    setTodos(AddTodo);
    localStorage.setItem("storagetodos", JSON.stringify(AddTodo));
    SetTxtInput({ title: "", detailes: "" });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography variant="h2" sx={{ fontWeight: "400" }}>
              Tasks
            </Typography>

            <Divider />
            <ToggleButtonGroup
              value={displayType}
              exclusive
              onChange={ChangTaskType}
              aria-label="text alignment"
              style={{ marginTop: "10px" }}
              color="primary"
            >
              <ToggleButton value="All">All Tasks</ToggleButton>
              <ToggleButton value="Completed">Completed Tasks</ToggleButton>
              <ToggleButton value="Remain">Remain Tasks</ToggleButton>
            </ToggleButtonGroup>
            {todosjx}

            <Grid container spacing={1} sx={{ marginTop: "15px" }}>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-aroundc",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    HandleAddClick();
                  }}
                  disabled={txtInput.title === "" || txtInput.detailes === ""}
                  //disabled={txtInput.length === 0}
                >
                  Adding Task..
                </Button>
              </Grid>
              <Grid
                direction="column"
                container
                size={8}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  size="small"
                  id="outlined-basic1"
                  label="Task Title"
                  variant="outlined"
                  value={txtInput.title}
                  onChange={(e) =>
                    SetTxtInput({ ...txtInput, title: e.target.value })
                  }
                />
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  size="small"
                  id="outlined-basic2"
                  label="Task Detailes"
                  variant="outlined"
                  value={txtInput.detailes}
                  onChange={(e) =>
                    SetTxtInput({ ...txtInput, detailes: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
