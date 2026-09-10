import React from "react";
import { useApp } from "../context/AppContext";
import { Bell, ShieldCheck, Smartphone, Maximize2, RotateCcw } from "lucide-react";

export default function Header() {
  const {
    currentUser,
    users,
    switchUser,
    unreadNotifsCount,
    setIsNotifDrawerOpen,
    viewMode,
    setViewMode,
    resetToDemoData
  } = useApp();

  return (
    <div>
      {/* Top Utility Bar for Device Frame / Mode & Reset */}
      <div className="top-control-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#22c55e", fontWeight: 700 }}>● Live Demo</span>
          <span style={{ color: "#64748b" }}>|</span>
          <button
            onClick={resetToDemoData}
            title="Reset to initial sample data"
            className="view-toggle-btn"
            style={{ fontSize: "0.7rem", padding: "2px 8px" }}
          >
            <RotateCcw size={12} /> Reset Data
          </button>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "mobile_phone" ? "fluid_full" : "mobile_phone")}
          className="view-toggle-btn"
        >
          {viewMode === "mobile_phone" ? (
            <>
              <Maximize2 size={13} /> Full Screen
            </>
          ) : (
            <>
              <Smartphone size={13} /> Phone View
            </>
          )}
        </button>
      </div>

      {/* Main Header / Role Switcher Banner */}
      <header className="role-banner">
        <div className="role-banner-top">
          <div className="brand-badge">
            <span style={{ fontSize: "1.6rem" }}>🌾</span>
            <div>
              <h1 className="brand-title">KisanDirect</h1>
              <p className="brand-subtitle">Fair Price Direct Market • Zero Middlemen</p>
            </div>
          </div>

          <button
            onClick={() => setIsNotifDrawerOpen(true)}
            className="notif-bell-btn"
            aria-label="View notifications"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotifsCount > 0 && (
              <span className="notif-badge-count">{unreadNotifsCount}</span>
            )}
          </button>
        </div>

        {/* Multi-Role Quick Persona Switcher */}
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#86efac", fontWeight: 700, marginBottom: "4px" }}>
            Switch Persona to Experience Workflow:
          </div>
          <div className="role-switch-pills">
            {users.map((u) => {
              const isActive = u.id === currentUser.id;
              let roleIcon = "🌾";
              if (u.role === "buyer") roleIcon = "🏢";
              if (u.role === "consumer") roleIcon = "🛒";
              if (u.role === "admin") roleIcon = "🛡️";

              return (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`role-pill ${isActive ? "active" : ""}`}
                >
                  <span>{roleIcon}</span>
                  <span>{u.name.split(" ")[0]} ({u.role.toUpperCase()})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active User Card */}
        <div className="current-user-card">
          <div className="user-info-cluster">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
            <div className="user-name-role">
              <span className="user-name">
                {currentUser.name}
                {currentUser.isVerified && (
                  <ShieldCheck size={14} color="#86efac" title="Verified Member" />
                )}
              </span>
              <span className="user-role-label">
                📍 {currentUser.location} • ⭐ {currentUser.rating || "5.0"}
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: "0.65rem",
                padding: "3px 8px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontWeight: 700,
                textTransform: "uppercase"
              }}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
