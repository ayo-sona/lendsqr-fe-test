import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <div className="logo">
            <img src="/images/logo.svg" alt="Logo" />
            <img src="/images/lendsqr.svg" alt="Lendsqr Logo" />
          </div>

          <div className="illustration desktop-only">
            <img src="/images/auth-image.svg" alt="Login illustration" />
          </div>
        </div>

        <div className="login-right">
          {/* Mobile illustration - shows only on mobile */}
          <div className="illustration mobile-only">
            <img src="/images/auth-image.svg" alt="Login illustration" />
          </div>

          <div className="login-form-wrapper">
            <h1>Welcome!</h1>
            <p className="subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>

              <button type="submit" className="login-button">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;