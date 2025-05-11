import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login'; 
import ChooseFavouriteGenres from "./components/ChooseFavouriteGenres";
import RecommendedGames from "./components/RecommendedGames";
import GamePage from "./components/GamePage";
import '../src/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<ChooseFavouriteGenres />} />
        <Route path="/recommended-games" element={<RecommendedGames />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;


