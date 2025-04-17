
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className="md:hidden flex items-center">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default MobileMenuButton;
