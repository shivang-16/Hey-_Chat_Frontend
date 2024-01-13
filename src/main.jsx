import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(23, 25, 26)",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
