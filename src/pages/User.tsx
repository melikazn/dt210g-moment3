import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

interface Movie { 
  id: number; 
  title: string; 
  year: number; 
}

const User: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    // Anropa backend för att hämta filmer när komponenten laddas
    axios
      .get('http://localhost:5001/movies') // Skicka GET-förfrågan till backend för att hämta alla filmer
      .then((response) => {
        setMovies(response.data); // Sätt den hämtade filmlistan i state
      })
      .catch((err) => {
        setError('Det gick inte att hämta filmerna'); // Sätt felmeddelande om förfrågan misslyckas
        console.error(err); // Logga eventuella fel i konsolen
      });
  }, []); 

  return (
    <div>
      <h2>Filmer</h2>
      {error && <p>{error}</p>} {/* Visa felmeddelande om det finns något */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} 
            <Link to={`/movie/${movie.id}`}>
              {/* Länk för att navigera till filmens detaljsida */}
              <button>Se detaljer</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
