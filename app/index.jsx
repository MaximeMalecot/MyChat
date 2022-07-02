import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./src/app";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const Main = () => {
  return (
    <StrictMode>
    <App/>
    </StrictMode>
  );
};

root.render(<Main/>);