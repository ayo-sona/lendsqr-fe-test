import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../ui/sidebar";
import Header from "../../ui/header";
import { IoArrowBack } from "react-icons/io5";
import "./userdetails.scss";
import { LuUserRound } from "react-icons/lu";
import Toast from "../../ui/toast";

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

interface LocationState {
  user?: User;
}

interface UserDetail {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
  education: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tier: string;
  bankBalance: string;
  bank: string;
  guarantor: {
    fullName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("General Details");
  const [user, setUser] = useState<UserDetail | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const locationState = location.state as LocationState;

    if (locationState?.user) {
      // Map the dashboard user data to UserDetail format
      const dashboardUser = locationState.user;
      const mappedUser: UserDetail = {
        id: dashboardUser.id,
        fullName: dashboardUser.username,
        username: `LSQ${dashboardUser.id}587g90`,
        email: dashboardUser.email,
        phoneNumber: dashboardUser.phoneNumber,
        bvn: dashboardUser.phoneNumber,
        gender: "Female",
        maritalStatus: "Single",
        children: "None",
        residence: "Parent's Apartment",
        education: "B.Sc",
        employmentStatus: "Employed",
        sector: "FinTech",
        duration: "2 years",
        officeEmail: dashboardUser.email,
        monthlyIncome: "N200,000.00- N400,000.00",
        loanRepayment: "40,000",
        twitter:
          "@" + dashboardUser.username.toLowerCase().replace(/\s+/g, "_"),
        facebook: dashboardUser.username,
        instagram:
          "@" + dashboardUser.username.toLowerCase().replace(/\s+/g, "_"),
        tier: "1",
        bankBalance: "N200,000.00",
        bank: "9912345678/Providus Bank",
        guarantor: {
          fullName: "Debby Ogana",
          phone: "07060780922",
          email: "debby@gmail.com",
          relationship: "Sister",
        },
      };
      setUser(mappedUser);
    } else {
      // Fallback to mock data if no state is passed
      const mockUser: UserDetail = {
        id: Number(userId),
        fullName: "Grace Effiom",
        username: "LSQF587g90",
        email: "grace@gmail.com",
        phoneNumber: "07060780922",
        bvn: "07060780922",
        gender: "Female",
        maritalStatus: "Single",
        children: "None",
        residence: "Parent's Apartment",
        education: "B.Sc",
        employmentStatus: "Employed",
        sector: "FinTech",
        duration: "2 years",
        officeEmail: "grace@lendsqr.com",
        monthlyIncome: "N200,000.00- N400,000.00",
        loanRepayment: "40,000",
        twitter: "@grace_effiom",
        facebook: "Grace Effiom",
        instagram: "@grace_effiom",
        tier: "1",
        bankBalance: "N200,000.00",
        bank: "9912345678/Providus Bank",
        guarantor: {
          fullName: "Debby Ogana",
          phone: "07060780922",
          email: "debby@gmail.com",
          relationship: "Sister",
        },
      };
      setUser(mockUser);
    }
  }, [userId, location.state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  const handleMenuClick = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  const handleActivateUser = () => {
    // Add your activation logic here
    console.log("Activating user:", user?.id);

    // Show success toast
    setToast({
      message: "User activated",
      type: "success",
    });
  };

  const handleBlacklistUser = () => {
    // Add your blacklist logic here
    console.log("Blacklisting user:", user?.id);

    // Show error toast
    setToast({
      message: "User blacklisted",
      type: "error",
    });
  };

  const sections = [
    {
      title: "Personal Information",
      items: [
        { label: "FULL NAME", value: user.fullName },
        { label: "PHONE NUMBER", value: user.phoneNumber },
        { label: "EMAIL ADDRESS", value: user.email },
        { label: "BVN", value: user.bvn },
        { label: "GENDER", value: user.gender },
        { label: "MARITAL STATUS", value: user.maritalStatus },
        { label: "CHILDREN", value: user.children },
        { label: "TYPE OF RESIDENCE", value: user.residence },
      ],
    },
    {
      title: "Education and Employment",
      items: [
        { label: "LEVEL OF EDUCATION", value: user.education },
        { label: "EMPLOYMENT STATUS", value: user.employmentStatus },
        { label: "SECTOR OF EMPLOYMENT", value: user.sector },
        { label: "DURATION OF EMPLOYMENT", value: user.duration },
        { label: "OFFICE EMAIL", value: user.officeEmail },
        { label: "MONTHLY INCOME", value: user.monthlyIncome },
        { label: "LOAN REPAYMENT", value: user.loanRepayment },
      ],
    },
    {
      title: "Socials",
      items: [
        { label: "TWITTER", value: user.twitter },
        { label: "FACEBOOK", value: user.facebook },
        { label: "INSTAGRAM", value: user.instagram },
      ],
    },
    {
      title: "Guarantor",
      items: [
        { label: "FULL NAME", value: user.guarantor.fullName },
        { label: "PHONE NUMBER", value: user.guarantor.phone },
        { label: "EMAIL ADDRESS", value: user.guarantor.email },
        { label: "RELATIONSHIP", value: user.guarantor.relationship },
      ],
    },
  ];

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Header onMenuClick={handleMenuClick} />
        <section className="user-details-section">
          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <IoArrowBack /> Back to Users
          </button>

          {/* Page Header */}
          <div className="page-header">
            <h2>User Details</h2>
            <div className="action-buttons">
              <button className="btn-blacklist" onClick={handleBlacklistUser}>
                BLACKLIST USER
              </button>
              <button className="btn-activate" onClick={handleActivateUser}>
                ACTIVATE USER
              </button>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="user-summary-card">
            <div className="user-profile-section">
              <div className="profile-info">
                <div className="avatar-circle">
                  <div className="profile-icon">
                    <LuUserRound />
                  </div>
                </div>
                <div className="user-name-section">
                  <h3>{user.fullName}</h3>
                  <p>{user.username}</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="tier-section">
                <p className="label">User's Tier</p>
                <div className="stars">
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="bank-section">
                <h3>{user.bankBalance}</h3>
                <p>{user.bank}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs-section">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* User Information Card */}
          <div className="user-info-card">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="info-section">
                <h4 className="section-title">{section.title}</h4>
                <div className="info-grid">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="info-item">
                      <p className="label">{item.label}</p>
                      <p className="value">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

export default UserDetails;
