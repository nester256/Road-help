import Header from './сomponents/header/header'
import './App.css';
import 'typeface-montserrat';
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NeedHelp from "./сomponents/need-help/need-help";
import Events from "./сomponents/events/events";
import MainPage from "./pages/main-page/main";


function App() {
  return (
      <div className="App">
          <Router>
              <Header />
              <Routes>
                  <Route exact path="/" element={<MainPage />}/>
                  <Route exact path="need_help" element={<NeedHelp/>}/>
                  <Route exact path="events" element={<Events/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;