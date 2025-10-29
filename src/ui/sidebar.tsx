import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.clear();
    onClose();
    navigate("/login", { replace: true });
  };

  const navSections: NavSection[] = [
    {
      title: "CUSTOMERS",
      items: [
        { icon: "users", label: "Users", path: "/users" },
        { icon: "guarantors", label: "Guarantors", path: "/guarantors" },
        { icon: "loans", label: "Loans", path: "/loans" },
        {
          icon: "decision-models",
          label: "Decision Models",
          path: "/decision-models",
        },
        { icon: "savings", label: "Savings", path: "/savings" },
        {
          icon: "loan-requests",
          label: "Loan Requests",
          path: "/loan-requests",
        },
        { icon: "whitelist", label: "Whitelist", path: "/whitelist" },
        { icon: "karma", label: "Karma", path: "/karma" },
      ],
    },
    {
      title: "BUSINESSES",
      items: [
        { icon: "organisation", label: "Organization", path: "/organization" },
        {
          icon: "loan-requests",
          label: "Loan Products",
          path: "/loan-products",
        },
        {
          icon: "saving-products",
          label: "Savings Products",
          path: "/savings-products",
        },
        {
          icon: "fees-and-charges",
          label: "Fees and Charges",
          path: "/fees-charges",
        },
        { icon: "Transactions", label: "Transactions", path: "/transactions" },
        { icon: "Services", label: "Services", path: "/services" },
        {
          icon: "Service-Account",
          label: "Service Account",
          path: "/service-account",
        },
        { icon: "Settlements", label: "Settlements", path: "/settlements" },
        { icon: "Reports", label: "Reports", path: "/reports" },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { icon: "Preferences", label: "Preferences", path: "/preferences" },
        {
          icon: "Fees-and-Pricing",
          label: "Fees and Pricing",
          path: "/fees-pricing",
        },
        { icon: "Audit-Logs", label: "Audit Logs", path: "/audit-logs" },
      ],
    },
  ];

  // Console log to verify data
  console.log("Sidebar rendering with sections:", navSections);

  const sidebarStyle: React.CSSProperties = {
    width: window.innerWidth > 1024 ? "283px" : "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.04)",
    padding: "30px 0",
    overflowY: "auto",
    overflowX: "hidden",
    position: "fixed",
    left: 0,
    top: window.innerWidth > 1024 ? "108px" : "69px",
    height: window.innerWidth > 1024 ? "calc(100vh - 108px)" : "calc(100vh - 69px)",
    zIndex: 999,
    transform: window.innerWidth > 1024 ? "translateX(0)" : (isOpen ? "translateX(0)" : "translateX(-100%)"),
    transition: "transform 0.3s ease",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    display: window.innerWidth <= 1024 && isOpen ? "block" : "none",
  };

  const switchStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 30px",
    marginBottom: "40px",
    cursor: "pointer",
    color: "#213f7d",
    fontSize: "14px",
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 30px",
    color: "#213f7d",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    opacity: isActive ? 1 : 0.8,
    backgroundColor: isActive ? "rgba(57, 205, 204, 0.06)" : "transparent",
    borderLeft: isActive ? "3px solid #39cdcc" : "none",
    cursor: "pointer",
  });

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#545f7d",
    padding: "0 30px",
    margin: "20px 0 10px 0",
    letterSpacing: "0.5px",
  };

  const logoutStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 30px",
    color: "#213f7d",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    opacity: 0.8,
    backgroundColor: "transparent",
    cursor: "pointer",
    marginTop: "10px",
    borderLeft: "none",
  };

  const versionStyle: React.CSSProperties = {
    display: "block",
    padding: "12px 30px",
    color: "#213F7D",
    fontSize: "12px",
    fontWeight: 400,
    marginTop: "20px",
    opacity: 0.6,
  };

  return (
    <>
      {isOpen && window.innerWidth <= 1024 && (
        <div style={overlayStyle} onClick={onClose} />
      )}

      <aside style={sidebarStyle}>
        <div style={switchStyle}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/sidebaricons/organisation.svg"
              alt="organisation"
              style={{ width: "16px", height: "16px" }}
            />
          </span>
          <span>Switch Organization</span>
          <span style={{ marginLeft: "auto", fontSize: "12px" }}>
            <FaChevronDown />
          </span>
        </div>

        <nav style={{ paddingBottom: "60px" }}>
          <Link
            to="/dashboard"
            style={navItemStyle(location.pathname === "/dashboard")}
            onClick={onClose}
          >
            <span style={{ display: "flex", alignItems: "center", width: "20px" }}>
              <img
                src="/images/sidebaricons/dashboard.svg"
                alt="dashboard-icon"
                style={{ width: "16px", height: "16px" }}
              />
            </span>
            <span>Dashboard</span>
          </Link>

          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: "30px" }}>
              <h4 style={sectionTitleStyle}>{section.title}</h4>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  style={navItemStyle(location.pathname === item.path)}
                  onClick={onClose}
                >
                  <span style={{ display: "flex", alignItems: "center", width: "20px" }}>
                    <img
                      src={`/images/sidebaricons/${item.icon}.svg`}
                      alt={`${item.label}-icon`}
                      style={{ width: "16px", height: "16px" }}
                    />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
          
          <hr style={{ height: "1px", backgroundColor: "#e0e2eb", border: "none", margin: "20px 30px" }} />
          
          <div
            onClick={handleLogout}
            style={logoutStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fb";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.opacity = "0.8";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", width: "20px" }}>
              <img 
                src="/images/sidebaricons/Logout.svg" 
                alt="logout-icon"
                style={{ width: "16px", height: "16px" }}
                onError={() => {
                  console.log("Logout icon failed to load");
                }}
              />
            </span>
            <span>Logout</span>
          </div>
          
          <span style={versionStyle}>v1.2.0</span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;