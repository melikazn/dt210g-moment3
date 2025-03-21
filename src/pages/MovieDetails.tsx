import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 

interface MovieDetails { 
  title: string;
  year: number; 
  watched: boolean; 
}

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    // Hämta detaljer för en specifik film när komponenten laddas
    if (id) {
      axios
        .get(`http://localhost:5001/movies/${id}`) // Skicka GET-förfrågan till backend för att hämta filmens detaljer
        .then((response) => {
          setMovie(response.data); // Sätt filmens data i state
        })
        .catch((err) => {
          setError('Det gick inte att hämta filmens detaljer'); // Sätt felmeddelande vid misslyckad förfrågan
          console.error(err); 
        });
    }
  }, [id]); // Kör denna effekt varje gång id ändras

  if (error) {
    return <p>{error}</p>; // Visa felmeddelande om det finns något fel
  }

  return (
    <div>
      {movie ? (
        <div className="movie-details">
          {/* Visa filmens detaljer om filmen finns */}
          <p>{movie.title}</p> 
          <p>År: {movie.year}</p> 
          <p>{movie.watched ? 'Sedd' : 'Inte sedd'}</p> 
        </div>
      ) : (
        <p>Laddar...</p> // Visa laddningsmeddelande om filmen inte är hämtad än
      )}
    </div>
  );
};

export default MovieDetailsPage; 
