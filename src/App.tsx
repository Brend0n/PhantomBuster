import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { PhantomLibrary } from './pages/PhantomLibrary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/phantoms?' Component={Dashboard} />
          <Route path='/phantombuster' Component={PhantomLibrary} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
