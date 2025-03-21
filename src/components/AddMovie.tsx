import React, { useState } from 'react';
import axios from 'axios';

// Komponent för att lägga till en ny film
const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number>(0);
  const [watched, setWatched] = useState(false);
  const [error, setError] = useState<string | null>(null); // För att hålla felmeddelanden

  // Funktion som hanterar formulärsändning
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validera att alla fält är ifyllda korrekt
    if (!title.trim()) {
      setError('Titel och ett giltigt år krävs.');
      return;
    }

    if (year <= 1800 || year >= 2025) {
      setError('Titel och ett giltigt år krävs.');
      return;
    }

    try {
      // Skicka en POST-begäran till backend för att lägga till en film
      await axios.post('http://localhost:5001/movies', {
        title,
        year,
        watched,
      });
      alert('Filmen har lagts till');
      // Återställ state efter att filmen lagts till
      setTitle('');
      setYear(0);
      setWatched(false);
      setError(null); // Återställ eventuellt felmeddelande
    } catch (err) {
      console.error('Det gick inte att lägga till filmen', err);
      setError('Ett fel inträffade när filmen skulle läggas till.');
    }
  };

  return (
    <div>
      <h2>Lägg till en film</h2>
      {/* Formulär för att lägga till en film */}
      <form onSubmit={handleSubmit}>
        {/* Inputfält för filmens titel */}
        <div>
          <label>Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Uppdaterar state vid ändring

          />
        </div>
        {/* Inputfält för filmens år */}
        <div>
          <label>År</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </div>
        {/* Checkbox för att indikera om filmen har setts */}
        <div>
          <label>Sett</label>
          <input
            type="checkbox"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        </div>
        {/* Submit-knapp för att skicka formuläret */}
        <button type="submit">Lägg till film</button>
      </form>

      {/* Visa felmeddelande om det finns något */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddMovie;
