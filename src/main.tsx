import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import Chart from "./components/chart";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* <App /> */}
        <Chart numGraphs={42} />
    </React.StrictMode>
);
