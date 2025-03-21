import React from 'react';
import { Link } from 'react-router-dom';

// Definiera typen för props som skickas till Navbar-komponenten
interface NavbarProps {
  userRole: string | null;
  onLogout: () => void; // Funktion som körs vid utloggning
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogout }) => {
  return (
    <nav>
      <ul>
        {/* Visa "Se listan" endast när användaren är inloggad */}
        {userRole && (
          <li>
            <Link to={userRole === 'admin' ? '/admin' : '/user'}>Se listan</Link>
          </li>
        )}
        {/* Visa admin-specifika länkar om användaren är admin */}
        {userRole === 'admin' && (
          <>
            <li><Link to="/admin/add">Lägg till en film</Link></li>
            <li><button onClick={onLogout}>Logga ut</button></li>
          </>
        )}

        {!userRole && (
          <>
            <li><Link to="/user">Se listan</Link></li>
            <li><Link to="/login?role=admin">Logga in som Admin</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
