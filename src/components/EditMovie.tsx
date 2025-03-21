import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Definierar Movie-interfacet för att beskriva filmens struktur
interface Movie {
  id: number;
  title: string;
  year: number;
  watched: boolean;
}

const EditMovie: React.FC = () => {
  const { id } = useParams(); // Hämtar filmens ID från URL
  const navigate = useNavigate(); // För navigering till andra sidor
  const [movie, setMovie] = useState<Movie | null>(null); // Håller filmens data
  const [error, setError] = useState<string | null>(null); // Håller felmeddelanden
  const [title, setTitle] = useState<string>(''); // Håller titelvärdet
  const [year, setYear] = useState<number>(2025); // Defaultvärde för år
  const [watched, setWatched] = useState<boolean>(false); // Håller om filmen är sett eller inte

  // Lägg till en state för att hålla originalvärdena för att återställa om något går fel
  const [originalValues, setOriginalValues] = useState<{ title: string; year: number; watched: boolean } | null>(null);

  // useEffect för att hämta filmen från API när komponenten laddas
  useEffect(() => {
    if (!id) return; // Om det inte finns något ID, gör inget
    
    axios
      .get(`http://localhost:5001/movies/${id}`) // Hämtar filmen från backend
      .then((response) => {
        console.log('Fetched movie:', response.data); // Loggar filmens data från API
        setMovie(response.data);
        setTitle(response.data.title);
        setYear(response.data.year); 
        setWatched(response.data.watched); 
        setOriginalValues({
          title: response.data.title,
          year: response.data.year,
          watched: response.data.watched
        }); // Spara originalvärdena
      })
      .catch((err) => {
        setError('Det gick inte att hämta filmen'); // Sätter felmeddelande 
        console.error('Error fetching movie:', err); // Loggar fel
      });
  }, [id]); 

  // Funktion för att hantera uppdatering av filmen
  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault(); // Förhindrar att sidan laddas om

    if (!id) return; 

    // Validera att året är mindre än 2025
    if (!title || year < 1800 || year > 2025) {
      setError('Vänligen fyll i alla fält och ange ett giltigt år');
      
      // Återställ fälten till deras ursprungliga värden om valideringen misslyckas
      if (originalValues) {
        setTitle(originalValues.title);
        setYear(originalValues.year);
        setWatched(originalValues.watched);
      }
      
      return;
    } 

    // Skickar en PUT-begäran för att uppdatera filmen
    axios
      .put(`http://localhost:5001/movies/${id}`, {
        title,
        year,
        watched,
      })
      .then((response) => {
        console.log('Movie updated:', response.data); // Loggar svar från API
        alert('Ändringarna har sparats!'); // Visar alert vid framgång
        navigate(`/admin`); // Navigerar till admin-sidan efter uppdatering
      })
      .catch((err) => {
        setError('Det gick inte att uppdatera filmen'); // Sätter felmeddelande om uppdatering misslyckas
        console.error('Error updating movie:', err); // Loggar fel
      });
  };

  return (
    <div>
      <h2>Uppdatera film</h2>
      {movie ? (
        // Om filmen är hämtad, visa formuläret
        <form>
          <div>
            <label>Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Uppdatera titel
            />
          </div>
          <div>
            <label>År:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))} // Uppdatera år
            />
          </div>
          <div>
            <label>Sett:</label>
            <input
              type="checkbox"
              checked={watched}
              onChange={() => setWatched((prev) => !prev)} // Uppdatera sett-status
            />
          </div>
          <button onClick={handleUpdate}>Spara ändringar</button> {/* Skicka uppdatering */}
        </form>
      ) : (
        // Visa laddningsmeddelande om filmen inte är hämtad än
        <p>Laddar film...</p>
      )}
      
      {/* Felmeddelande */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditMovie;
