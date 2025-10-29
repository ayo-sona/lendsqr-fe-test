import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './filter.scss';

interface Filters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

interface FilterPopupProps {
  filters: Filters;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  filterRef?: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  buttonElement?: HTMLElement | null;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  filters,
  handleFilterChange,
  resetFilters,
  applyFilters,
  onClose,
  buttonElement,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);


  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        popupRef.current && 
        !popupRef.current.contains(target) &&
        buttonElement &&
        !buttonElement.contains(target)
      ) {
        onClose();
      }
    };

    // Add a small delay to prevent immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [buttonElement, onClose]);

  useEffect(() => {
    if (buttonElement && popupRef.current) {
      const buttonRect = buttonElement.getBoundingClientRect();
      const popupWidth = 270;
      const popupHeight = popupRef.current.offsetHeight || 400;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
  
      let top = buttonRect.bottom + window.scrollY + 5;
      let left = buttonRect.left + window.scrollX;
  
      // Mobile adjustments
      if (viewportWidth < 768) {
        // Center the popup horizontally on mobile
        left = (viewportWidth - popupWidth) / 2;
        
        // Ensure minimum margins (16px on each side)
        left = Math.max(16, left);
        left = Math.min(left, viewportWidth - popupWidth - 16);
      } else {
        // Desktop: If popup goes off right edge
        if (left + popupWidth > viewportWidth - 10) {
          left = viewportWidth - popupWidth - 10;
        }
  
        // If popup goes off left edge
        if (left < 10) {
          left = 10;
        }
      }
  
      // If popup goes off bottom (works for both mobile and desktop)
      if (buttonRect.bottom + popupHeight > viewportHeight) {
        top = buttonRect.top + window.scrollY - popupHeight - 5;
      }
  
      setPosition({ top, left });
    }
  }, [buttonElement]);

  const popupContent = (
    <>
      <div 
        ref={popupRef}   
        className="filter-popup"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000,
        }}
      >
      <div className="form-group">
        <label>Organization</label>
        <select
          name="organization"
          value={filters.organization}
          onChange={handleFilterChange}
        >
          <option value="">Select</option>
          <option value="lendsqr">Lendsqr</option>
          <option value="irorun">Irorun</option>
          <option value="lendstar">Lendstar</option>
        </select>
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="User"
          value={filters.username}
          onChange={handleFilterChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleFilterChange}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={handleFilterChange}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className="filter-actions">
        <button 
          className="reset-btn" 
          onClick={() => {
            resetFilters();
            onClose();
          }}
        >
          Reset
        </button>
        <button 
          className="filter-btn" 
          onClick={() => {
            applyFilters();
            onClose();
          }}
        >
          Filter
        </button>
      </div>
    </div>
    </>
  );

  return createPortal(popupContent, document.body);
};

export default FilterPopup;