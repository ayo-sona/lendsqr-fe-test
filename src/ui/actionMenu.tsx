import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineEye, AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai';
import './actionMenu.scss';

interface ActionMenuProps {
  onViewDetails: () => void;
  onBlacklistUser: () => void;
  onActivateUser: () => void;
  buttonElement: HTMLElement | null;
  onClose: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
  buttonElement,
  onClose,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonElement && menuRef.current) {
      const buttonRect = buttonElement.getBoundingClientRect();
      const menuWidth = 180;
      const menuHeight = menuRef.current.offsetHeight || 150;

      let top = buttonRect.top + window.scrollY;
      let left = buttonRect.left + window.scrollX - menuWidth - 10;

      // If menu goes off left edge, show on right side
      if (left < 10) {
        left = buttonRect.right + window.scrollX + 10;
      }

      // If menu still goes off right edge
      if (left + menuWidth > window.innerWidth) {
        left = buttonRect.right + window.scrollX - menuWidth;
      }

      // If menu goes off bottom
      if (buttonRect.bottom + menuHeight > window.innerHeight) {
        top = buttonRect.top + window.scrollY - menuHeight + buttonRect.height;
      }

      setPosition({ top, left });
    }
  }, [buttonElement]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonElement &&
        !buttonElement.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [buttonElement, onClose]);

  const menuContent = (
    <div 
      ref={menuRef}
      className="action-menu-portal"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <button className="action-menu-item" onClick={onViewDetails}>
        <AiOutlineEye size={16} />
        <span>View Details</span>
      </button>
      <button className="action-menu-item" onClick={onBlacklistUser}>
        <AiOutlineUserDelete size={16} />
        <span>Blacklist User</span>
      </button>
      <button className="action-menu-item" onClick={onActivateUser}>
        <AiOutlineUserAdd size={16} />
        <span>Activate User</span>
      </button>
    </div>
  );

  return createPortal(menuContent, document.body);
};

export default ActionMenu;