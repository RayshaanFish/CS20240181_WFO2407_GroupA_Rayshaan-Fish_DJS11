import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Header />
          <body className="body">
            <Routes>
              {/* Routes for different pages */}
              <Route path="/" element={<Body />} />
              <Route
                path="/about"
                element={<p>Still need to add this Page [ABOUT]</p>}
              />
              <Route
                path="/search"
                element={<p>Still need to add this Page [SEARCH]</p>}
              />
            </Routes>
          </body>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
