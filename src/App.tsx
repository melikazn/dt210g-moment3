import React, { useState, useEffect } from 'react'; 
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'; 
import Admin from './pages/Admin'; 
import Login from './pages/Login'; 
import Layout from './components/Layout'; 
import AddMovie from './components/AddMovie'; 
import MovieDetails from './pages/MovieDetails';
import EditMovie from './components/EditMovie'; 
import User from './pages/User'; 
import './App.css'; 

// Funktion för att autentisera användaren genom att kolla om det finns en token i localStorage
const authenticateUser = () => {
  const token = localStorage.getItem('token'); // Hämta token från localStorage
  if (!token) {
    return redirect('/login?role=admin'); // Omdirigera till login-sidan om ingen token finns
  }
  return null; // Om token finns, fortsätt
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null); // State för användarens roll

  useEffect(() => {
    const role = localStorage.getItem('role'); // Hämta användarens roll från localStorage
    setUserRole(role); // Sätt användarens roll i state
  }, []); // Kör bara en gång när komponenten laddas

  // Funktion för att logga ut användaren
  const handleLogout = () => {
    localStorage.removeItem('token'); // Ta bort token från localStorage
    localStorage.removeItem('role'); // Ta bort roll från localStorage
    setUserRole(null); // Sätt användarens roll till null
    
  };

  // Skapa router med vägar och komponenter
  const router = createBrowserRouter([
    {
      path: '/', // Huvudvägen
      element: <Layout userRole={userRole} onLogout={handleLogout} />, // Layout-komponent som används för alla sidor
      children: [
        {
          path: '/login', // Login-sidan
          element: <Login setUserRole={setUserRole} />, // Skicka setUserRole för att hantera inloggning
        },
        {
          path: '/admin', // Admin-sidan
          element: <Admin />, // Visa Admin-komponenten
          loader: authenticateUser, // Skydda admin-sidan med loader
        },
        {
          path: '/user', // User-sidan
          element: <User />, // Visa User-komponenten
        },
        {
          path: '/movie/:id', // Sida för filmdetaljer
          element: <MovieDetails />, // Visa MovieDetails-komponenten
        },
        {
          path: '/movie/:id/edit', // Sida för att redigera film
          element: <EditMovie />, // Visa EditMovie-komponenten
          loader: authenticateUser, // Skydda edit-sidan med loader
        },
        {
          path: '/admin/add', // Sida för att lägga till en film 
          element: <AddMovie />, // Visa AddMovie-komponenten
          loader: authenticateUser, // Skydda add-movie-sidan med loader
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />; // Använd routerProvider för att ge routern till appen
};

export default App;
