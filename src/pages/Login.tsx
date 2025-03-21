import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LoginProps {
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>; // Funktion för att sätta användarroll
}

const Login: React.FC<LoginProps> = ({ setUserRole }) => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const role = new URLSearchParams(location.search).get('role'); 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError("Användarnamn och lösenord krävs.");
      return;
    }
  
    if (role === "admin") {
      if (username === "admin" && password === "admin") {
        setUserRole("admin");
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", "some-auth-token");
        navigate("/admin"); // Navigera till admin-sidan
      } else {
        setError("Ogiltigt användarnamn eller lösenord för Admin");
      }
    } else {
      setError("Endast admin behöver logga in.");
    }
  };
  

  return (
    <div>
      <h1>Logga in som admin</h1> {/* Visa vilken roll användaren försöker logga in som */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Användarnamn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Uppdatera användarnamn vid inmatning
          />
        </div>
        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Uppdatera lösenord vid inmatning
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Visa felmeddelande om det finns */}
        <button type="submit">Logga in</button> {/* Logga in-knapp */}
      </form>
    </div>
  );
};

export default Login; 
