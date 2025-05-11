import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/games/${gameId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch game details");
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleBuyGame = () => {
    alert(`Purchasing game: ${game.name}`);
  };

  if (!game) return <div>Loading GamePage for ID: {gameId}</div>;

  const formattedDate = new Date(game.date).toLocaleDateString();

  return (
    <div className="game-page-container">
      <div className="game-card">
        <h1 className="game-title">{game.name}</h1>
        <div className="game-details">
          <p>
            <strong>Release Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating}
          </p>
          <p>
            <strong>Price:</strong> ${game.price}
          </p>
        </div>
        <button className="buy-button" onClick={handleBuyGame}>
          Add to bucket
        </button>
      </div>
    </div>
  );
};

export default GamePage;
