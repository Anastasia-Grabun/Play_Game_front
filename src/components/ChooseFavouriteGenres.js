import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChooseFavouriteGenres.css";

const ChooseFavouriteGenres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGenres = async () => {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/v1/genres/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data = await res.json();
        console.log("Genres fetched:", data); // Добавляем логирование

        setGenres(data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();
  }, [token]);

  const handleChange = (id) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(id)) {
        return prevSelectedGenres.filter((genreId) => genreId !== id);
      } else if (prevSelectedGenres.length < 3) {
        return [...prevSelectedGenres, id];
      } else {
        alert("You can select up to 3 genres");
        return prevSelectedGenres;
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      console.log("Submitting genres:", selectedGenres);
      await fetch("http://localhost:8080/api/v1/accounts/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedGenres),
      });

      navigate("/home");
    } catch (err) {
      console.error("Failed to submit favourite genres:", err);
    }
  };

  return (
    <div className="genre-selection-container">
      <h2 className="genre-title">Choose Your Favourite Genres (up to 3)</h2>
      <div className="genre-list">
        {genres.map((genre) => (
          <label key={genre.id} className="genre-item">
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleChange(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={selectedGenres.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default ChooseFavouriteGenres;
