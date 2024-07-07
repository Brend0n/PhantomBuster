import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Phantoms } from './Phantoms';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/phantoms?' Component={Dashboard} />
          <Route path='/phantombuster' Component={Phantoms} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
