import React from 'react';
import './Sidebar.css';
import { FaTimes } from 'react-icons/fa';

export const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen, isMobile }) => {
  
  const handleItemClick = (view) => {
    setActiveView(view);
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  // Conditionally apply mobile-specific classes
  const sidebarClasses = `sidebar ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`;

  return (
    <>
        {isMobile && isOpen && <div className="sidebar-overlay show" onClick={() => setIsOpen(false)}></div>}
        <div className={sidebarClasses}>
            <div className="sidebar-header">
                <h3>Dashboard</h3>
                <div className="close-icon" onClick={() => setIsOpen && setIsOpen(false)}>
                    <FaTimes />
                </div>
            </div>
            <ul className="sidebar-menu">
                <li className={activeView === 'projects' ? 'active' : ''} onClick={() => handleItemClick('projects')}>
                  All Projects
                </li>
                <li className={activeView === 'proposals' ? 'active' : ''} onClick={() => handleItemClick('proposals')}>
                  Investor Proposals
                </li>
                <li className={activeView === 'loans' ? 'active' : ''} onClick={() => handleItemClick('loans')}>
                  Available Loans
                </li>
                <li className={activeView === 'advice' ? 'active' : ''} onClick={() => handleItemClick('advice')}>
                  Business Advice
                </li>
            </ul>
        </div>
    </>
  );
};