import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Leaf,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Phone,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin,
  Building,
  Scale,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const { users, login, registerUser } = useApp();

  const [authMode, setAuthMode] = useState("signin"); // signin | register
  const [selectedRole, setSelectedRole] = useState("farmer"); // farmer | buyer | consumer
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Registration Form State
  const [regData, setRegData] = useState({
    name: "",
    phone: "",
    location: "",
    kisanCardNumber: "",
    businessLicense: "",
    farmSize: "5 Acres"
  });

  const handleManualLogin = (e) => {
    e.preventDefault();
    // Match phone or default to the first user of the selected role
    const matched = users.find(
      (u) =>
        u.phone.replace(/\D/g, "").includes(phoneInput.replace(/\D/g, "")) ||
        u.role === selectedRole
    );
    if (matched) {
      login(matched.id);
    } else {
      const fallback = users.find((u) => u.role === selectedRole) || users[0];
      login(fallback.id);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regData.name || !regData.location) {
      alert("Please enter your name and location.");
      return;
    }

    registerUser({
      name: regData.name,
      role: selectedRole,
      phone: regData.phone || "+91 98111 22233",
      location: regData.location,
      kisanCardNumber: regData.kisanCardNumber,
      businessLicense: regData.businessLicense,
      farmSize: regData.farmSize
    });
  };

  return (
    <div className="login-page-root">
      <div className="login-backdrop-glow" />

      <div className="login-content-wrapper">
        {/* Left / Top Brand Showcase */}
        <div className="login-hero-pane">
          <div className="login-brand-header">
            <div className="brand-icon-box large">
              <Leaf size={28} color="#ffffff" />
            </div>
            <div>
              <h1 className="login-brand-title">
                Kisan<span style={{ color: "#22c55e" }}>Direct</span>
              </h1>
              <span className="login-brand-sub">Direct Market Access Web Portal</span>
            </div>
          </div>

          <h2 className="login-headline">
            Empowering Farmers. Eliminating Middlemen. Ensuring Fair Price.
          </h2>

          <p className="login-description">
            Directly connects local farmers with bulk wholesale buyers and consumers with live price negotiations, GPS radius matching, and 100% escrow-protected payouts.
          </p>

          {/* Key Value Proposition Pillars */}
          <div className="login-perks-list">
            <div className="login-perk-item">
              <div className="perk-icon-circle">
                <TrendingUp size={16} color="#15803d" />
              </div>
              <div>
                <strong>Zero Middleman Cut</strong>
                <p>Keep 25% - 40% higher profits by selling directly at your expected price.</p>
              </div>
            </div>

            <div className="login-perk-item">
              <div className="perk-icon-circle">
                <ShieldCheck size={16} color="#15803d" />
              </div>
              <div>
                <strong>Escrow & Direct UPI Security</strong>
                <p>Funds are secured prior to harvest dispatch and released upon physical inspection.</p>
              </div>
            </div>

            <div className="login-perk-item">
              <div className="perk-icon-circle">
                <Sparkles size={16} color="#15803d" />
              </div>
              <div>
                <strong>Interactive Price Negotiations</strong>
                <p>Make offers, receive counters, and review Mandi reference benchmark rates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Center Auth Card */}
        <div className="login-card-pane">
          <div className="login-card">
            {/* Tabs: Sign In vs Register */}
            <div className="login-tabs">
              <button
                onClick={() => setAuthMode("signin")}
                className={`login-tab-btn ${authMode === "signin" ? "active" : ""}`}
              >
                Sign In to Portal
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`login-tab-btn ${authMode === "register" ? "active" : ""}`}
              >
                Register Account
              </button>
            </div>

            {/* Role Switcher Chips */}
            <div style={{ marginBottom: "18px" }}>
              <label className="form-label" style={{ marginBottom: "6px" }}>
                Select Your Role
              </label>
              <div className="login-role-selector">
                <button
                  type="button"
                  onClick={() => setSelectedRole("farmer")}
                  className={`role-choice-btn ${selectedRole === "farmer" ? "active" : ""}`}
                >
                  <span>🌾</span> Farmer / Producer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("buyer")}
                  className={`role-choice-btn ${selectedRole === "buyer" ? "active" : ""}`}
                >
                  <span>🏢</span> Wholesale Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("consumer")}
                  className={`role-choice-btn ${selectedRole === "consumer" ? "active" : ""}`}
                >
                  <span>🛒</span> Consumer
                </button>
              </div>
            </div>

            {/* 1-Click Quick Demo Sign In Cards (Sign In Mode) */}
            {authMode === "signin" && (
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Quick 1-Click Demo Login:
                </div>
                <div className="quick-login-grid">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      onClick={() => login(u.id)}
                      className="quick-login-card"
                      title={`Instant login as ${u.name}`}
                    >
                      <img src={u.avatar} alt={u.name} className="quick-login-avatar" />
                      <div style={{ overflow: "hidden" }}>
                        <div className="quick-login-name">{u.name.split(" ")[0]}</div>
                        <div className="quick-login-sub">
                          {u.role === "farmer" ? "🌾 Farmer" : u.role === "buyer" ? "🏢 Wholesaler" : u.role === "consumer" ? "🛒 Consumer" : "🛡️ APMC Admin"}
                        </div>
                      </div>
                      <ArrowRight size={14} color="#15803d" style={{ marginLeft: "auto" }} />
                    </div>
                  ))}
                </div>

                <div className="login-divider">
                  <span>OR SIGN IN WITH CREDENTIALS</span>
                </div>

                {/* Manual Credentials Form */}
                <form onSubmit={handleManualLogin}>
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={14} color="#15803d" /> Registered Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98234 56789"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={14} color="#15803d" /> Password or e-OTP
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px", marginTop: "6px" }}>
                    Sign In as {selectedRole.toUpperCase()} <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* Registration Form (Register Mode) */}
            {authMode === "register" && (
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name or Business Entity *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ramesh Kisan Kumar or Apex Foods"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mandi Hub / Location *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Nashik Rural"
                      value={regData.location}
                      onChange={(e) => setRegData({ ...regData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {selectedRole === "farmer" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Kisan Credit Card / ID</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MH-NSK-2024-XXXX"
                        value={regData.kisanCardNumber}
                        onChange={(e) =>
                          setRegData({ ...regData, kisanCardNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Farm Acreage</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 8.5 Acres"
                        value={regData.farmSize}
                        onChange={(e) => setRegData({ ...regData, farmSize: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {selectedRole === "buyer" && (
                  <div className="form-group">
                    <label className="form-label">APMC Trader / GST License</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. APMC-WHL-2024-9988"
                      value={regData.businessLicense}
                      onChange={(e) =>
                        setRegData({ ...regData, businessLicense: e.target.value })
                      }
                    />
                  </div>
                )}

                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "var(--radius-md)",
                    padding: "10px",
                    margin: "12px 0",
                    fontSize: "0.72rem",
                    color: "#166534",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Free registration • Zero commission on trades forever!</span>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px" }}>
                  Complete Registration & Enter Web Portal <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
