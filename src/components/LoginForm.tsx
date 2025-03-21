import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Definierar typen för props som skickas till LoginForm-komponenten
interface LoginFormProps {
  username: string; // Användarnamn för autentisering
  password: string; // Lösenord för autentisering
}

const LoginForm: React.FC<LoginFormProps> = ({ username, password }) => {
  const [inputUsername, setInputUsername] = useState(""); 
  const [inputPassword, setInputPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  // Funktion som hanterar inloggning
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra standardformulärsändning

    // Kontrollera om användarnamn och lösenord är korrekta
    if (inputUsername === username && inputPassword === password) {
      const token = "fake-jwt-token";
      localStorage.setItem("token", token); // Spara JWT-token i localStorage
      navigate("/admin"); // Navigera till admin-sidan efter inloggning
    } else {
      setError("Ogiltigt användarnamn eller lösenord"); // Om autentisering misslyckas, visa felmeddelande
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}> {/* Skicka formuläret vid inloggning */}
        <div>
          <label>Användarnamn</label>
          <input
            type="text"
            value={inputUsername} // Kopplar användarens inmatade värde till inputUsername
            onChange={(e) => setInputUsername(e.target.value)} // Uppdaterar inputUsername vid förändring
          />
        </div>
        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={inputPassword} 
            onChange={(e) => setInputPassword(e.target.value)} 
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Visar felmeddelande om det finns ett */}
        <button type="submit">Logga in</button> {/* Skickar inloggningsformuläret */}
      </form>
    </div>
  );
};

export default LoginForm;
