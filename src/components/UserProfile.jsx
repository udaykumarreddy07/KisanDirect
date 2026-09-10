import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  User,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Edit3,
  Check,
  Sparkles,
  RotateCcw
} from "lucide-react";

export default function UserProfile() {
  const { currentUser, switchUser, users, showToast, resetToDemoData } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    phone: currentUser.phone,
    location: currentUser.location,
    bio: currentUser.bio || ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    currentUser.name = profileData.name;
    currentUser.phone = profileData.phone;
    currentUser.location = profileData.location;
    currentUser.bio = profileData.bio;
    setIsEditing(false);
    showToast("Profile details updated successfully!");
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          User Profile & Credentials
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
          Step 1: Verified agricultural profiles & local market presence
        </p>
      </div>

      {/* Main Profile Card */}
      <div
        style={{
          background: "#ffffff",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "20px",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #86efac",
              boxShadow: "var(--shadow-md)"
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>{currentUser.name}</h3>
              {currentUser.isVerified && (
                <ShieldCheck size={18} color="#15803d" title="Verified Member" />
              )}
            </div>
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: "9999px",
                background: "#f0fdf4",
                color: "#166534",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                marginTop: "4px"
              }}
            >
              {currentUser.role} Account
            </span>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
              ⭐ {currentUser.rating} ({currentUser.totalReviews || 24} verified trades)
            </div>
          </div>
        </div>

        {/* Credentials / Badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            background: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            marginBottom: "16px",
            fontSize: "0.75rem"
          }}
        >
          <div>
            <span style={{ color: "#64748b" }}>Registered Location:</span>
            <div style={{ fontWeight: 700, marginTop: "2px" }}>{currentUser.location}</div>
          </div>

          <div>
            <span style={{ color: "#64748b" }}>
              {currentUser.role === "farmer" ? "Kisan ID / Farm Size:" : "Trade Registration:"}
            </span>
            <div style={{ fontWeight: 700, marginTop: "2px" }}>
              {currentUser.kisanCardNumber || currentUser.businessLicense || "Aadhaar e-KYC"}
              {currentUser.farmSize ? ` (${currentUser.farmSize})` : ""}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: "1.4", marginBottom: "16px" }}>
          "{currentUser.bio || "Active member on KisanDirect direct agricultural network."}"
        </p>

        {/* Edit Form Toggle */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-outline"
            style={{ width: "100%", fontSize: "0.8rem" }}
          >
            <Edit3 size={14} /> Edit Profile Information
          </button>
        ) : (
          <form onSubmit={handleSave} style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location / Mandi Zone</label>
              <input
                type="text"
                className="form-input"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">About Your Farm / Business</label>
              <textarea
                rows="2"
                className="form-textarea"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                <Check size={14} /> Save Profile
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Available Accounts Quick Switcher */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "16px"
        }}
      >
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "12px" }}>
          Simulate Other Roles & Accounts:
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {users.map((u) => {
            const isCurrent = u.id === currentUser.id;
            return (
              <div
                key={u.id}
                onClick={() => switchUser(u.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  border: isCurrent ? "2px solid #16a34a" : "1px solid #e2e8f0",
                  background: isCurrent ? "#f0fdf4" : "#ffffff",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={u.avatar}
                    alt=""
                    style={{ width: "34px", height: "34px", borderRadius: "50%" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>{u.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                      {u.role.toUpperCase()} • {u.location}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: isCurrent ? "#16a34a" : "#64748b"
                  }}
                >
                  {isCurrent ? "Active" : "Switch ➔"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
