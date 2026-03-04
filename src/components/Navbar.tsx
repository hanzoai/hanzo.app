import { useState, useEffect } from "react";
import { MobileMenu } from "./navigation/MobileMenu";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import AuthButtons from "./navigation/AuthButtons";
import NavbarContainer from "./navigation/NavbarContainer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <div className="flex items-center w-full">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-1 flex justify-center">
          <DesktopNav />
        </div>
        <div className="flex-shrink-0">
          <AuthButtons user={null} onOpenCommandPalette={() => {}} />
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenSearch={() => {}}
        />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
