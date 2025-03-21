import express from 'express';
import moviesRouter from './routes/movies.js';
import cors from 'cors'; 

const app = express();  

// Lägg till CORS middleware direkt efter att appen är skapad
app.use(cors());  // Tillåter alla domäner att göra förfrågningar

app.use(express.json());  // Middleware för att hantera JSON-begärningar

// Lägg till din route för movies
app.use("/movies", moviesRouter);

// Starta servern
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
