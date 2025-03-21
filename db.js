import mysql from "mysql2";

// Skapar en pool av anslutningar till MySQL-databasen med nödvändiga konfigurationer
const pool = mysql.createPool({
  host: "localhost",  
  user: "root",      
  password: "",   
  database: "movieDB", 
});

// Försöker skapa en anslutning till databasen och loggar resultatet
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);  
    return;  
  }
  console.log("Connected to MySQL Database");  
  connection.release();  
});

// Exporterar poolen så att den kan användas av andra delar av applikationen
export default pool.promise(); 
