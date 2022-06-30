import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";

const rootElement = document.getElementById('root');
const virtualElement = React.createElement('h1', null, "Hello, world! ");
const root = ReactDOM.createRoot(rootElement);

root.render(<App/>);