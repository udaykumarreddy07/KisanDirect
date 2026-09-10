import React from "react";
import { Leaf, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export default function WebFooter() {
  return (
    <footer className="web-footer">
      <div className="web-container web-footer-inner">
        <div className="footer-brand-section">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div className="brand-icon-box small">
              <Leaf size={18} color="#ffffff" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "#0f172a" }}>
              Kisan<span style={{ color: "#16a34a" }}>Direct</span>
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748b", maxWidth: "420px", lineHeight: "1.5" }}>
            Direct agricultural market access web portal empowering Indian farmers to bypass exploitative middlemen, negotiate fair prices directly with wholesale buyers and consumers, and receive 100% escrow-backed payouts.
          </p>
        </div>

        <div className="footer-links-grid">
          <div>
            <h5 className="footer-heading">Platform Architecture</h5>
            <ul className="footer-list">
              <li>Direct Farm-to-Buyer Marketplace</li>
              <li>Live Offer & Counter Negotiation</li>
              <li>GPS Nearby Radius Matching</li>
              <li>Escrow & Direct UPI Protection</li>
            </ul>
          </div>

          <div>
            <h5 className="footer-heading">Key Stakeholders</h5>
            <ul className="footer-list">
              <li>Local Farmers (Producers)</li>
              <li>Wholesale APMC Traders</li>
              <li>Direct Consumers & Societies</li>
              <li>State APMC Board Administrators</li>
            </ul>
          </div>

          <div>
            <h5 className="footer-heading">Agricultural Impact</h5>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 14px", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#166534" }}>Zero Broker Commission</div>
              <div style={{ fontSize: "0.72rem", color: "#15803d", marginTop: "2px" }}>
                Preserves 25% - 40% margin directly in the hands of rural farming households.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="web-footer-bottom">
        <div className="web-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            © {new Date().getFullYear()} KisanDirect Web Portal • Agriculture & Rural Development Initiative
          </span>
          <span style={{ fontSize: "0.75rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
            Made with <Heart size={13} color="#ef4444" fill="#ef4444" /> for Indian Farmers
          </span>
        </div>
      </div>
    </footer>
  );
}
