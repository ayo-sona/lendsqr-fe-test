import { useState } from "react";
import "./dashboard.scss";
import Sidebar from "../../ui/sidebar";
import Header from "../../ui/header";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      icon: "users",
      iconClass: "users-icon",
      label: "USERS",
      value: "2,453",
    },
    {
      icon: "active-users",
      iconClass: "active-users-icon",
      label: "ACTIVE USERS",
      value: "2,453",
    },
    {
      icon: "loan-users",
      iconClass: "loans-icon",
      label: "USERS WITH LOANS",
      value: "12,453",
    },
    {
      icon: "savings-users",
      iconClass: "savings-icon",
      label: "USERS WITH SAVINGS",
      value: "102,453",
    },
  ];

  console.log("Dashboard - sidebarOpen:", sidebarOpen); // Add this

  const handleMenuClick = (): void => {
    console.log("Menu clicked!"); // Add this
    setSidebarOpen((prev) => {
      console.log("Previous state:", prev, "New state:", !prev); // Add this
      return !prev;
    });
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header onMenuClick={handleMenuClick} />

        {/* Users Section */}
        <section className="users-section">
          <h2>Dashboard</h2>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className={`stat-icon ${stat.iconClass}`}>
                  <img
                    src={`/images/stats/${stat.icon}.svg`}
                    alt={stat.label}
                  />
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
