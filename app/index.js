import App from "./app";
import React from "react";
import ReactDOM from "react-dom";

const Props = window.__PROPS;

ReactDOM.render(React.createElement(App, Props), document.getElementById('root'));
