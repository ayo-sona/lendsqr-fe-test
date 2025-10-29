import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import './header.scss';

interface HeaderProps {
  onMenuClick: () => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
    
    // Close mobile search after submitting
    setMobileSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Real-time search as user types
    if (onSearch) {
      onSearch(value.trim());
    }
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileSearchOpen) {
      setSearchQuery("");
      if (onSearch) {
        onSearch("");
      }
    }
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/images/logo.svg" alt="Logo" />
        <img src="/images/lendsqr.svg" alt="Lendsqr" />
      </div>
      
      <div className="header-right">
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for anything" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn">
            <IoSearch />
          </button>
        </form>
        
        <button 
          className="search-icon-mobile" 
          onClick={toggleMobileSearch}
          aria-label="Search"
        >
          {mobileSearchOpen ? <IoClose /> : <IoSearch />}
        </button>
        
        <a href="#" className="docs-link">
          Docs
        </a>
        
        <button 
          className="notification-icon" 
          onClick={() => console.log("Notifications clicked")}
          aria-label="Notifications"
        >
          <FaRegBell />
        </button>
        
        <div className="user-profile">
          <img src="/images/profile.svg" alt="User" />
          <span className="user-name">Adedeji</span>
          <button 
            className="dropdown-icon"
            onClick={() => console.log("Profile dropdown clicked")}
            aria-label="User menu"
          >
            <FaCaretDown />
          </button>
        </div>
        
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          <IoIosMenu />
        </button>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <>
          <div className="mobile-search-backdrop" onClick={closeMobileSearch} />
          <div className="mobile-search-overlay">
            <form className="mobile-search-bar" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search for anything" 
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <button type="submit" className="mobile-search-btn">
                <IoSearch />
              </button>
            </form>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;