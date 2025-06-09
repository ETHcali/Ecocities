import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.theme.colors.navBackground};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  height: 70px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
`;

const EcoIcon = styled.span`
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3));
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.navBackground};
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${props => props.theme.colors.border};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    box-shadow: ${props => props.theme.colors.shadow};
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.md};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const WatchTokenButton = styled.button`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.colors.shadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
    color: ${props => props.theme.colors.primary};
  }
`;

const LanguageSelector = styled.select`
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

interface NavbarProps {
  onWatchToken: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onWatchToken }) => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.dashboard', href: '#dashboard' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <NavContainer>
      <NavContent>
        <Logo>
          <EcoIcon>🌱</EcoIcon>
          EcoCity
        </Logo>

        <NavLinks isOpen={isMenuOpen}>
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href}>
              {t(item.key)}
            </NavLink>
          ))}
          
          <WatchTokenButton onClick={onWatchToken}>
            📊 {t('nav.watchToken')}
          </WatchTokenButton>

          <NavActions>
            <LanguageSelector
              value={i18n.language}
              onChange={handleLanguageChange}
              title={t('nav.language')}
            >
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇨🇴 ES</option>
            </LanguageSelector>

            <IconButton
              onClick={toggleTheme}
              title={t('nav.toggleTheme')}
            >
              {isDark ? '☀️' : '🌙'}
            </IconButton>
          </NavActions>
        </NavLinks>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 