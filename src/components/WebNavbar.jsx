import React from "react";
import { useApp } from "../context/AppContext";
import {
  Store,
  PlusCircle,
  MessageSquareShare,
  PackageCheck,
  ShieldAlert,
  User,
  Bell,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Leaf,
  LogOut
} from "lucide-react";

export default function WebNavbar() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    users,
    switchUser,
    unreadNotifsCount,
    setIsNotifDrawerOpen,
    resetToDemoData,
    offers,
    orders,
    totalMiddlemanCutSaved,
    logout
  } = useApp();

  const pendingOffersCount = offers.filter((o) => {
    if (currentUser.role === "farmer") {
      return o.farmerId === currentUser.id && (o.status === "pending" || o.status === "countered");
    }
    return o.buyerId === currentUser.id && o.status === "countered";
  }).length;

  const activeOrdersCount = orders.filter((o) => {
    const isParty = o.farmerId === currentUser.id || o.buyerId === currentUser.id;
    return isParty && o.orderStatus !== "completed";
  }).length;

  return (
    <header className="web-navbar-container">
      {/* Top Banner: Platform Impact & Quick Persona Switcher */}
      <div className="web-top-announcement">
        <div className="web-container web-top-inner">
          <div className="web-impact-pill">
            <TrendingUp size={14} color="#f59e0b" />
            <span>Farmers have saved over <strong>₹{(totalMiddlemanCutSaved).toLocaleString("en-IN")}</strong> in broker fees directly through KisanDirect</span>
          </div>

          <div className="web-persona-bar">
            <span className="persona-label">Viewing as:</span>
            <div className="persona-chips">
              {users.map((u) => {
                const isActive = u.id === currentUser.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => switchUser(u.id)}
                    className={`persona-chip ${isActive ? "active" : ""}`}
                    title={`Switch perspective to ${u.name} (${u.role})`}
                  >
                    <span>{u.role === "farmer" ? "🌾" : u.role === "buyer" ? "🏢" : u.role === "consumer" ? "🛒" : "🛡️"}</span>
                    <span>{u.name.split(" ")[0]} ({u.role.toUpperCase()})</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={resetToDemoData}
              className="reset-demo-btn"
              title="Reset sample data"
            >
              <RotateCcw size={12} /> Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="web-main-nav">
        <div className="web-container web-nav-inner">
          {/* Brand Logo */}
          <div className="web-brand" onClick={() => setActiveTab("marketplace")} style={{ cursor: "pointer" }}>
            <div className="brand-icon-box">
              <Leaf size={22} color="#ffffff" />
            </div>
            <div>
              <div className="brand-name">
                Kisan<span style={{ color: "#16a34a" }}>Direct</span>
              </div>
              <div className="brand-tagline">Direct Market Access Web Portal</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="web-nav-links">
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`web-nav-link ${activeTab === "marketplace" ? "active" : ""}`}
            >
              <Store size={18} />
              <span>Direct Marketplace</span>
            </button>

            <button
              onClick={() => {
                if (currentUser.role !== "farmer") {
                  switchUser("farmer_ramesh");
                }
                setActiveTab("sell");
              }}
              className={`web-nav-link ${activeTab === "sell" ? "active" : ""}`}
              style={{
                background: activeTab === "sell" ? "#16a34a" : "#f0fdf4",
                color: activeTab === "sell" ? "#ffffff" : "#15803d",
                fontWeight: 700,
                border: "1px solid #bbf7d0"
              }}
            >
              <PlusCircle size={18} />
              <span>+ Sell Farm Products</span>
            </button>

            <button
              onClick={() => setActiveTab("negotiations")}
              className={`web-nav-link ${activeTab === "negotiations" ? "active" : ""}`}
            >
              <MessageSquareShare size={18} />
              <span>Offers & Negotiation</span>
              {pendingOffersCount > 0 && (
                <span className="badge-count">{pendingOffersCount}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`web-nav-link ${activeTab === "orders" ? "active" : ""}`}
            >
              <PackageCheck size={18} />
              <span>Orders & Logistics</span>
              {activeOrdersCount > 0 && (
                <span className="badge-count green">{activeOrdersCount}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("admin")}
              className={`web-nav-link ${activeTab === "admin" ? "active" : ""}`}
            >
              <ShieldAlert size={18} />
              <span>APMC Admin</span>
            </button>
          </nav>

          {/* User Profile & Notification Cluster */}
          <div className="web-nav-right">
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="web-notif-btn"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {unreadNotifsCount > 0 && (
                <span className="web-notif-badge">{unreadNotifsCount}</span>
              )}
            </button>

            <div
              className={`web-user-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
              title="View your verified credentials"
            >
              <img src={currentUser.avatar} alt={currentUser.name} className="web-avatar" />
              <div className="web-user-meta">
                <span className="web-user-name">
                  {currentUser.name}
                  {currentUser.isVerified && <ShieldCheck size={14} color="#16a34a" />}
                </span>
                <span className="web-user-role">{currentUser.role.toUpperCase()} • {currentUser.location.split(",")[0]}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="web-notif-btn"
              title="Sign Out to Login Page"
              style={{ color: "#ef4444" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
