import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Definiera en Movie-typ för att beskriva filmobjektet
interface Movie {
  id: number;
  title: string;
  year: number;
  watched: boolean;
}

const Admin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate(); 

  // Hämta filmer från backend när komponenten laddas
  useEffect(() => {
    axios
      .get('http://localhost:5001/movies') // Hämtar filmer från backend
      .then((response) => {
        setMovies(response.data); // Uppdatera state med de hämtade filmerna
      })
      .catch((err) => {
        setError('Det gick inte att hämta filmerna'); // Hantera fel vid hämtning
        console.error('Error fetching movies:', err);
      });
  }, []); // Tom array för att köra useEffect bara en gång när komponenten laddas

  // Funktion för att ta bort en film
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5001/movies/${id}`) // Skicka DELETE-begäran till backend
      .then(() => {
        setMovies(movies.filter((movie) => movie.id !== id)); // Uppdatera state och ta bort filmen från listan
      })
      .catch((err) => {
        setError('Det gick inte att ta bort filmen'); // Hantera fel vid borttagning
        console.error('Error deleting movie:', err);
      });
  };

  // Hantera uppdatering av film
  const handleUpdate = (id: number) => {
    // Navigera till en uppdateringssida där filmens detaljer kan redigeras
    navigate(`/movie/${id}/edit`);
  };
 
  return (
    <div id="filmer">
      <h2>Filmer (Admin)</h2>
      {error && <p>{error}</p>} {/* Visa felmeddelande om det finns ett */}
      <ul>
        {/* Mappa över alla filmer och visa dem som listobjekt */}
        {movies.map((movie) => (
          <li  id="film" key={movie.id}>
            <li> {movie.title} </li>
            <Link to={`/movie/${movie.id}`}>
              <button>Se detaljer</button> {/* Länk för att se filmens detaljer */}
            </Link>
            <button onClick={() => handleUpdate(movie.id)}>Uppdatera</button> {/* Knapp för att uppdatera filmen */}
            <button onClick={() => handleDelete(movie.id)}>Ta bort</button> {/* Knapp för att ta bort filmen */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
