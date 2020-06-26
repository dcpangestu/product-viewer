import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import ProductSheet from "./components/prodsheet.component"

function App() {
    return (
      <Router>
        <div className="container">
        <Route path="/" exact component={ProductSheet} />
        </div>
      </Router>
    );
  }

export default App;
