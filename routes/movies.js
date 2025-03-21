import express from "express";
import db from "../db.js"; 

const router = express.Router();

// GET - Hämta alla filmer
router.get("/", async (req, res) => {
  try {
    const [movies] = await db.query("SELECT * FROM movies");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// GET - Hämta en film via ID
router.get("/:id", async (req, res) => {
    try {
      const [movie] = await db.query("SELECT * FROM movies WHERE id = ?", [
        req.params.id,
      ]);
      if (movie.length === 0) return res.status(404).json({ error: "Not found" });

      res.json({
        id: movie[0].id,
        title: movie[0].title, 
        year: movie[0].year,
        watched: movie[0].watched === 1 ? true : false,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  });
  
//  POST - Lägg till en ny film
router.post("/", async (req, res) => {
  const { title, year, watched } = req.body;

  // Validering på servern
  if (!title || year < 1800 || year > 2025) {
    return res.status(400).json({ error: "Titel och ett giltigt år krävs." });
  }

  try {
    const result = await db.query(
      "INSERT INTO movies (title, year, watched) VALUES (?, ?, ?)",
      [title, year, watched ? 1 : 0] // Konvertera watched till 1/0
    );
    res.status(201).json({ id: result[0].insertId, title, year, watched });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: "Database error" });
  }
});


// PUT - Uppdatera en film
router.put("/:id", async (req, res) => {
    const { title, year, watched } = req.body; 
    console.log("Mottagen data i backend:", { title, year, watched }); 
  
    try {
      // Uppdatera alla tre fält (title, year och watched)
      const result = await db.query(
        "UPDATE movies SET title=?, year=?, watched=? WHERE id=?",
        [title, year, watched ? 1 : 0, req.params.id] // Konvertera watched till 1/0
      );
  
      if (result[0].affectedRows === 0) {
        console.error("Film hittades inte i databasen");
        return res.status(404).json({ error: "Not found" });
      }
  
      // Skicka tillbaka uppdaterad data inklusive titel, år och sedd-status
      res.json({ id: req.params.id, title, year, watched });
    } catch (error) {
      console.error("Database error:", error); 
      res.status(500).json({ error: "Database error", details: error.message });
    }
});


//  DELETE - Ta bort en film
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM movies WHERE id = ?", [
      req.params.id,
    ]);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
