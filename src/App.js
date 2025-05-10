import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import '../src/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;


