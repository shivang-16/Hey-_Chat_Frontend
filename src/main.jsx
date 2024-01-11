import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(51, 133, 255)",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
