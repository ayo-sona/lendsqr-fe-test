import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.scss";
import Sidebar from "../../ui/sidebar";
import Header from "../../ui/header";
import { IoFilterOutline } from "react-icons/io5";
import FilterPopup from "../../ui/filter";
import { IoIosMore } from "react-icons/io";
import ActionMenu from "../../ui/actionMenu";
import Toast from "../../ui/toast";
import { createPortal } from "react-dom";

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

interface Filters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [filterButtonRef, setFilterButtonRef] =
    useState<HTMLButtonElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [actionButtonRef, setActionButtonRef] =
    useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  const API_URL = "https://mocki.io/v1/329ae79c-40b2-4797-a87b-de96117a6f58";

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAllUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on applied filters
  const filteredUsers = allUsers.filter((user) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.organization.toLowerCase().includes(query) ||
        user.phoneNumber.includes(query);

      if (!matchesSearch) {
        return false;
      }
    }
    if (
      appliedFilters.organization &&
      user.organization.toLowerCase() !==
        appliedFilters.organization.toLowerCase()
    ) {
      return false;
    }
    if (
      appliedFilters.username &&
      !user.username
        .toLowerCase()
        .includes(appliedFilters.username.toLowerCase())
    ) {
      return false;
    }
    if (
      appliedFilters.email &&
      !user.email.toLowerCase().includes(appliedFilters.email.toLowerCase())
    ) {
      return false;
    }
    if (
      appliedFilters.phoneNumber &&
      !user.phoneNumber.includes(appliedFilters.phoneNumber)
    ) {
      return false;
    }
    if (
      appliedFilters.status &&
      user.status.toLowerCase() !== appliedFilters.status.toLowerCase()
    ) {
      return false;
    }
    if (appliedFilters.date) {
      const userDate = new Date(user.dateJoined);
      const filterDate = new Date(appliedFilters.date);
      if (userDate.toDateString() !== filterDate.toDateString()) {
        return false;
      }
    }
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, itemsPerPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

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

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterClick = (
    column: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (activeFilter === column) {
      setActiveFilter(null);
      setFilterButtonRef(null);
    } else {
      setActiveFilter(column);
      setFilterButtonRef(event.currentTarget);
    }
    setActiveActionMenu(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleBlacklistUser = (userId: number) => {
    console.log("Blacklist user:", userId);
    setActiveActionMenu(null);

    // Show toast notification
    setToast({
      message: "User blacklisted",
      type: "error",
    });
  };

  // 4. Update your handleActivateUser function:
  const handleActivateUser = (userId: number) => {
    console.log("Activate user:", userId);
    setActiveActionMenu(null);

    // Show toast notification
    setToast({
      message: "User activated",
      type: "success",
    });
  };

  const handleActionClick = (
    userId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (activeActionMenu === userId) {
      setActiveActionMenu(null);
      setActionButtonRef(null);
    } else {
      setActiveActionMenu(userId);
      setActionButtonRef(event.currentTarget);
    }
    setActiveFilter(null);
  };

  const handleMenuClick = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setActiveFilter(null);
  };

  const handleViewDetails = (userId: number) => {
    const user = allUsers.find((u) => u.id === userId);
    setActiveActionMenu(null);
    navigate(`/users/${userId}`, { state: { user } });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of table
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <Header onMenuClick={handleMenuClick} onSearch={handleSearch} />
          <section className="users-section">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                fontSize: "18px",
                color: "#545F7D",
              }}
            >
              Loading users...
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <Header onMenuClick={handleMenuClick} onSearch={handleSearch} />
          <section className="users-section">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                fontSize: "18px",
                color: "#E4033B",
              }}
            >
              <p>Error loading users: {error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#39CDCC",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Retry
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header onMenuClick={handleMenuClick} onSearch={handleSearch} />

        {/* Users Section */}
        <section className="users-section">
          <h2>Users</h2>

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

          {/* Users Table */}
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  {[
                    "ORGANIZATION",
                    "USERNAME",
                    "EMAIL",
                    "PHONE NUMBER",
                    "DATE JOINED",
                    "STATUS",
                  ].map((header) => (
                    <th key={header}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{header}</span>
                        <button
                          className="filter-button"
                          onClick={(e) => handleFilterClick(header, e)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: "4px",
                            color: "#545F7D",
                          }}
                        >
                          <IoFilterOutline />
                        </button>
                      </div>

                      {/* Filter Popup */}
                      {activeFilter === header &&
                        createPortal(
                          <FilterPopup
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            resetFilters={resetFilters}
                            applyFilters={applyFilters}
                            onClose={() => setActiveFilter(null)}
                            buttonElement={filterButtonRef}
                          />,
                          document.body
                        )}
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#545F7D",
                      }}
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.organization}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.dateJoined}</td>
                      <td>
                        <span
                          className={`status status-${user.status.toLowerCase()}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="more-btn"
                          onClick={(e) => handleActionClick(user.id, e)}
                        >
                          <IoIosMore />
                        </button>

                        {activeActionMenu === user.id &&
                          createPortal(
                            <ActionMenu
                              onViewDetails={() => handleViewDetails(user.id)}
                              onBlacklistUser={() =>
                                handleBlacklistUser(user.id)
                              }
                              onActivateUser={() => handleActivateUser(user.id)}
                              buttonElement={actionButtonRef}
                              onClose={() => setActiveActionMenu(null)}
                            />,
                            document.body
                          )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="pagination-info">
              Showing
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              out of {filteredUsers.length}
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                ←
              </button>
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span>...</span>
                  ) : (
                    <button
                      className={currentPage === page ? "active" : ""}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                →
              </button>
            </div>
          </div>
        </section>
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Users;
