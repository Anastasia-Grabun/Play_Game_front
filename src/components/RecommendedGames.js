import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Для перехода на страницу игры
import "./RecommendedGames.css";

const RecommendedGames = () => {
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecommendedGames = async () => {
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/v1/accounts/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommended games");
        }

        const data = await response.json();
        setRecommendedGames(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Could not load recommendations");
      }
    };

    fetchRecommendedGames();
  }, [token]);

  return (
    <div className="recommended-container">
      <h2 className="recommended-title">Recommended Games for You</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="game-list">
        {recommendedGames.length === 0 && !error ? (
          <p className="no-results">No recommendations found</p>
        ) : (
          recommendedGames.map((game) => {
            console.log("Rendering game:", game);
            return (
              <div key={game.id} className="game-card">
                <div className="game-info">
                  <h3 className="game-name">{game.name}</h3>
                  <p className="game-rating">Rating: {game.rating}</p>
                  <p className="game-genres">
                    Genres: {Array.isArray(game.genres) ? game.genres.join(", ") : "N/A"}
                  </p>
                  <p className="game-price">Price: ${game.price}</p>
                  <Link to={`/game/${game.id}`} className="game-link">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecommendedGames;

