import React from 'react';
import Navbar from './NavBar'; 
import { Outlet } from 'react-router-dom'; 

// Definierar typen för Layout-komponentens props
interface LayoutProps {
  userRole: string | null; 
  onLogout: () => void; // Funktion för utloggning
}

const Layout: React.FC<LayoutProps> = ({ userRole, onLogout }) => {
  return (
    <div>
      <Navbar userRole={userRole} onLogout={onLogout} /> {/* Renderar Navbar med användarens roll och logout-funktion */}
      <main>
        <Outlet /> {/* Här kommer det faktiska innehållet att renderas baserat på den aktuella routen */}
      </main>
    </div>
  );
};

export default Layout;
