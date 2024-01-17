import React, {useMemo} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { io } from "socket.io-client";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(23, 25, 26)",
    },
  },
});

export const Hey_Server =
  import.meta.env.VITE_HEY_SERVER || "http://localhost:4502";

 export const socket = io(Hey_Server);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
