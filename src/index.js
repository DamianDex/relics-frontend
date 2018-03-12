import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

//Jak chcecie poczytac o routerach to polecam:
//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

ReactDOM.render((
		  <BrowserRouter>
		    <App />
		  </BrowserRouter>
		), document.getElementById('root'))