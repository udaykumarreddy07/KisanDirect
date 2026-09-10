import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  X,
  ShieldCheck,
  CheckCircle,
  QrCode,
  Smartphone,
  Lock,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export default function PaymentModal() {
  const {
    selectedOrderForPayment,
    setSelectedOrderForPayment,
    processSimulatedPayment
  } = useApp();

  if (!selectedOrderForPayment) return null;

  const order = selectedOrderForPayment;
  const [selectedMethod, setSelectedMethod] = useState("gpay"); // gpay, phonepe, paytm, bhim, netbanking
  const [isProcessing, setIsProcessing] = useState(false);

  const UPI_METHODS = [
    { id: "gpay", name: "Google Pay", color: "#4285F4", icon: "GPay" },
    { id: "phonepe", name: "PhonePe", color: "#5f259f", icon: "PhonePe" },
    { id: "paytm", name: "Paytm UPI", color: "#00b9f5", icon: "Paytm" },
    { id: "bhim", name: "BHIM UPI", color: "#f37021", icon: "BHIM" }
  ];

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processSimulatedPayment(order.id, selectedMethod.toUpperCase());
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedOrderForPayment(null)}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span
              style={{
                fontSize: "0.68rem",
                textTransform: "uppercase",
                color: "#15803d",
                fontWeight: 700,
                letterSpacing: "0.05em"
              }}
            >
              Step 7: Direct Payment & Escrow
            </span>
            <h3 className="modal-title">Simulated Payment</h3>
          </div>
          <button
            onClick={() => setSelectedOrderForPayment(null)}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Payment Summary Box */}
        <div
          style={{
            background: "var(--bg-subtle)",
            borderRadius: "var(--radius-lg)",
            padding: "16px",
            marginBottom: "16px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Order ID:</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{order.id}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Produce:</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
              {order.quantity} {order.unit} • {order.cropName}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Agreed Price:</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
              ₹{order.pricePerKg}/{order.unit}
            </span>
          </div>

          <div
            style={{
              borderTop: "1px dashed #cbd5e1",
              paddingTop: "10px",
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Total Payable:</span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#15803d"
              }}
            >
              {formatINR(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Escrow & Direct Guarantee Badge */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px"
          }}
        >
          <ShieldCheck size={20} color="#15803d" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#14532d" }}>
              Kisan Direct Escrow Protection
            </h4>
            <p style={{ fontSize: "0.72rem", color: "#166534", marginTop: "2px", lineHeight: "1.3" }}>
              Your funds are held securely in platform escrow and released 100% to Farmer{" "}
              <strong>{order.farmerName}</strong> upon physical inspection and pickup OTP verification.
            </p>
          </div>
        </div>

        {/* UPI Apps Grid */}
        <div style={{ marginBottom: "16px" }}>
          <label className="form-label" style={{ marginBottom: "8px" }}>
            Select Instant UPI App
          </label>
          <div className="upi-app-grid">
            {UPI_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMethod(m.id)}
                className={`upi-app-btn ${selectedMethod === m.id ? "selected" : ""}`}
              >
                <div className="upi-logo-icon" style={{ background: m.color }}>
                  {m.icon.substring(0, 2)}
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Simulation Preview */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            textAlign: "center",
            marginBottom: "16px"
          }}
        >
          <div style={{ display: "inline-block", padding: "8px", background: "#f8fafc", borderRadius: "8px" }}>
            <QrCode size={64} color="#0f172a" />
          </div>
          <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "6px" }}>
            Simulated UPI QR • Direct P2P Farmer Merchant Link
          </p>
          <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
            VPA: kisan.{order.farmerId}@upi
          </span>
        </div>

        {/* Payout Breakdown */}
        <div
          style={{
            background: "#fef3c7",
            borderRadius: "var(--radius-md)",
            padding: "10px 12px",
            fontSize: "0.72rem",
            color: "#92400e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px"
          }}
        >
          <span>Middleman Brokerage: ₹0.00 (Saved {formatINR(order.middlemanSavedAmount || 1800)})</span>
          <span style={{ fontWeight: 800 }}>100% to Farmer</span>
        </div>

        {/* Submit simulated payment */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="btn-primary"
          style={{ width: "100%", padding: "12px" }}
        >
          {isProcessing ? (
            <span>Securing Payment in Escrow...</span>
          ) : (
            <>
              <Lock size={16} /> Authorize Payment of {formatINR(order.totalAmount)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
