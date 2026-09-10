import React from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Scale,
  Users,
  Package,
  Trash2,
  CheckCircle,
  AlertTriangle,
  BadgePercent
} from "lucide-react";

export default function AdminDashboard() {
  const {
    users,
    listings,
    orders,
    toggleUserVerification,
    adminRemoveListing,
    totalMiddlemanCutSaved,
    totalKgsTraded
  } = useApp();

  const totalFarmers = users.filter((u) => u.role === "farmer").length;
  const totalBuyers = users.filter((u) => u.role === "buyer" || u.role === "consumer").length;
  const totalOrdersCount = orders.length;

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#fee2e2",
            color: "#991b1b",
            fontSize: "0.68rem",
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: "9999px",
            marginBottom: "4px"
          }}
        >
          <ShieldAlert size={12} /> APMC Regulatory & Admin Oversight
        </div>
        <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          Marketplace Admin Console
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
          Step 11: Manage verified farmer credentials, monitor fair trade prices, and protect transactions
        </p>
      </div>

      {/* High-level Platform Statistics */}
      <div className="admin-stat-grid">
        <div className="admin-stat-box" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderColor: "#86efac" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#166534" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>MIDDLEMAN CUTS SAVED</span>
            <TrendingUp size={16} />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "#14532d", margin: "6px 0" }}>
            {formatINR(totalMiddlemanCutSaved)}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#15803d" }}>
            Direct farmer margin preservation
          </div>
        </div>

        <div className="admin-stat-box">
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>VOLUME TRADED</span>
            <Scale size={16} color="#0284c7" />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "6px 0" }}>
            {(totalKgsTraded / 1000).toFixed(1)} MT
          </div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
            Metric Tons direct farm produce
          </div>
        </div>

        <div className="admin-stat-box">
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>TOTAL PARTIES</span>
            <Users size={16} color="#7c3aed" />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "6px 0" }}>
            {totalFarmers} Farmers / {totalBuyers} Buyers
          </div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
            Direct ecosystem members
          </div>
        </div>

        <div className="admin-stat-box">
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>TOTAL ORDERS</span>
            <Package size={16} color="#d97706" />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "6px 0" }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
            Escrow-backed contracts
          </div>
        </div>
      </div>

      {/* Section 1: User KYC Verification */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>
          User Verification & KYC Badges
        </h3>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User / Organization</th>
                <th>Role</th>
                <th>Document / Kisan ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={u.avatar}
                        alt=""
                        style={{ width: "26px", height: "26px", borderRadius: "50%" }}
                      />
                      <div>
                        <strong>{u.name}</strong>
                        <div style={{ fontSize: "0.68rem", color: "#64748b" }}>{u.location}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "0.68rem" }}>
                    {u.role}
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.72rem" }}>
                    {u.kisanCardNumber || u.businessLicense || "Aadhaar e-KYC Verified"}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        background: u.isVerified ? "#dcfce7" : "#fee2e2",
                        color: u.isVerified ? "#15803d" : "#b91c1c"
                      }}
                    >
                      {u.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleUserVerification(u.id)}
                      className="btn-outline"
                      style={{ padding: "4px 8px", fontSize: "0.68rem" }}
                    >
                      {u.isVerified ? "Revoke" : "Approve KYC"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Active Produce Listings Moderation */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>
          Marketplace Moderation (Active Listings: {listings.length})
        </h3>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Grower</th>
                <th>Stock</th>
                <th>Direct Rate</th>
                <th>Mandi Benchmark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.cropName}</strong>
                    <div style={{ fontSize: "0.68rem", color: "#64748b" }}>{item.grade}</div>
                  </td>
                  <td>{item.farmerName}</td>
                  <td>{item.quantity.toLocaleString()} {item.unit}</td>
                  <td style={{ color: "#15803d", fontWeight: 700 }}>₹{item.expectedPrice}/{item.unit}</td>
                  <td style={{ color: "#64748b" }}>₹{item.mandiReferencePrice}/{item.unit}</td>
                  <td>
                    <button
                      onClick={() => adminRemoveListing(item.id)}
                      className="btn-outline"
                      style={{ color: "#ef4444", borderColor: "#fca5a5", padding: "4px 8px", fontSize: "0.68rem" }}
                      title="Remove listing from marketplace"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
