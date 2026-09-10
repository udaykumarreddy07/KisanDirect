import React from "react";
import { useApp } from "../context/AppContext";
import {
  Store,
  PlusCircle,
  MessageSquareShare,
  PackageCheck,
  ShieldAlert,
  User
} from "lucide-react";

export default function BottomNav() {
  const { activeTab, setActiveTab, currentUser, offers, orders } = useApp();

  // Pending offers for current user
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
    <nav className="bottom-nav-bar">
      <button
        onClick={() => setActiveTab("marketplace")}
        className={`nav-tab-btn ${activeTab === "marketplace" ? "active" : ""}`}
      >
        <Store size={20} />
        <span>Market</span>
      </button>

      {currentUser.role === "farmer" && (
        <button
          onClick={() => setActiveTab("sell")}
          className={`nav-tab-btn ${activeTab === "sell" ? "active" : ""}`}
        >
          <PlusCircle size={20} />
          <span>Sell Crop</span>
        </button>
      )}

      <button
        onClick={() => setActiveTab("negotiations")}
        className={`nav-tab-btn ${activeTab === "negotiations" ? "active" : ""}`}
      >
        <MessageSquareShare size={20} />
        <span>Offers</span>
        {pendingOffersCount > 0 && <span className="nav-counter-dot" />}
      </button>

      <button
        onClick={() => setActiveTab("orders")}
        className={`nav-tab-btn ${activeTab === "orders" ? "active" : ""}`}
      >
        <PackageCheck size={20} />
        <span>Orders</span>
        {activeOrdersCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: "22%",
              background: "#15803d",
              color: "#fff",
              fontSize: "0.6rem",
              fontWeight: 800,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {activeOrdersCount}
          </span>
        )}
      </button>

      {currentUser.role === "admin" && (
        <button
          onClick={() => setActiveTab("admin")}
          className={`nav-tab-btn ${activeTab === "admin" ? "active" : ""}`}
        >
          <ShieldAlert size={20} />
          <span>Admin</span>
        </button>
      )}

      <button
        onClick={() => setActiveTab("profile")}
        className={`nav-tab-btn ${activeTab === "profile" ? "active" : ""}`}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
