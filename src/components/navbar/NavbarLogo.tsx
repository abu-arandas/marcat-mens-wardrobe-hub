
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <span className="text-2xl font-bold text-marcat-navy">MARCAT</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
