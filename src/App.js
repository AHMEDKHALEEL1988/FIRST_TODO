import ToDoList from "./components/ToDoList";
import "./App.css";
import "./Styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Serif_4"],
  },
  palette: {
    primary: {
      main: '#e64a19',
    }}
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App flexy" style={{ backgroundColor: "#191b1f" }}>
        <ToDoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
