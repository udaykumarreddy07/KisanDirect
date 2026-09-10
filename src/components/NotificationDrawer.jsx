import React from "react";
import { useApp } from "../context/AppContext";
import {
  X,
  Bell,
  Check,
  MessageSquare,
  Package,
  CreditCard,
  Truck,
  ArrowRight
} from "lucide-react";

export default function NotificationDrawer() {
  const {
    isNotifDrawerOpen,
    setIsNotifDrawerOpen,
    notifications,
    currentUser,
    markNotificationsRead,
    setActiveTab
  } = useApp();

  if (!isNotifDrawerOpen) return null;

  const userNotifications = notifications.filter(
    (n) => currentUser.role === "admin" || n.targetUserId === currentUser.id
  );

  const getIcon = (type) => {
    switch (type) {
      case "offer":
      case "counter":
        return <MessageSquare size={16} color="#0284c7" />;
      case "order":
        return <Package size={16} color="#15803d" />;
      case "payment":
      case "disbursement":
        return <CreditCard size={16} color="#d97706" />;
      case "pickup":
        return <Truck size={16} color="#7c3aed" />;
      default:
        return <Bell size={16} color="#64748b" />;
    }
  };

  const handleActionClick = (linkAction) => {
    if (linkAction) {
      setActiveTab(linkAction);
    }
    setIsNotifDrawerOpen(false);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsNotifDrawerOpen(false)}>
      <div className="notification-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="notif-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={18} color="#15803d" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Notifications</h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={markNotificationsRead}
              className="btn-outline"
              style={{ fontSize: "0.7rem", padding: "4px 8px" }}
              title="Mark all as read"
            >
              <Check size={12} /> Mark Read
            </button>
            <button
              onClick={() => setIsNotifDrawerOpen(false)}
              className="modal-close-btn"
              aria-label="Close drawer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="notif-list">
          {userNotifications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 16px", color: "#64748b" }}>
              <p style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🔔</p>
              <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>All caught up!</p>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                No unread alerts for {currentUser.name}.
              </p>
            </div>
          ) : (
            userNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`notif-item ${!notif.read ? "unread" : ""}`}
              >
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "10px",
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    {getIcon(notif.type)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "2px"
                      }}
                    >
                      <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>
                        {notif.title}
                      </h4>
                      <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>
                        {notif.timestamp}
                      </span>
                    </div>

                    <p style={{ fontSize: "0.75rem", color: "#475569", lineHeight: "1.3" }}>
                      {notif.message}
                    </p>

                    {notif.linkAction && (
                      <button
                        onClick={() => handleActionClick(notif.linkAction)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#15803d",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "6px",
                          cursor: "pointer"
                        }}
                      >
                        View in {notif.linkAction.toUpperCase()} <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
