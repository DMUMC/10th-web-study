import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import theme from "./theme";
import { store } from "./redux";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Todo from "./Todo.tsx";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Todo />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
);
