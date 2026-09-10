import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  KeyRound,
  Star,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";

export default function OrderManagement() {
  const {
    orders,
    currentUser,
    setSelectedOrderForPayment,
    setSelectedOrderForRating,
    markProduceReady,
    completeOrderWithOtp,
    setActiveTab
  } = useApp();

  const [otpInputs, setOtpInputs] = useState({}); // { [orderId]: otpString }

  const relevantOrders = orders.filter((o) => {
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "farmer") return o.farmerId === currentUser.id;
    return o.buyerId === currentUser.id;
  });

  const handleVerifyOtp = (orderId) => {
    const inputVal = otpInputs[orderId];
    if (!inputVal || inputVal.length < 4) {
      alert("Please enter the 4-digit pickup verification code.");
      return;
    }
    const success = completeOrderWithOtp(orderId, inputVal);
    if (success) {
      setOtpInputs({ ...otpInputs, [orderId]: "" });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          Order & Delivery Tracking
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
          Step 5 & 9: Full lifecycle tracking from payment escrow to farm gate handover
        </p>
      </div>

      {relevantOrders.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "32px 16px",
            borderRadius: "18px",
            textAlign: "center",
            border: "1px dashed #cbd5e1"
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "8px" }}>📦</p>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>
            No Active Orders Found
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "12px" }}>
            Orders are automatically created when both parties agree on a fair price in negotiations.
          </p>
          <button
            onClick={() => setActiveTab("negotiations")}
            className="btn-primary"
            style={{ margin: "0 auto", fontSize: "0.8rem", padding: "8px 16px" }}
          >
            Check Negotiations
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {relevantOrders.map((order) => {
            const isFarmer = currentUser.role === "farmer" || currentUser.id === order.farmerId;
            const isBuyer = currentUser.role !== "farmer" && currentUser.id === order.buyerId;

            // Order status steps
            const steps = [
              { key: "confirmed", label: "Confirmed" },
              { key: "ready_for_pickup", label: "Ready / Out" },
              { key: "completed", label: "Completed" }
            ];

            const currentStepIdx =
              order.orderStatus === "completed"
                ? 2
                : order.orderStatus === "ready_for_pickup"
                ? 1
                : 0;

            const isPaidOrEscrowed =
              order.paymentStatus === "escrowed" || order.paymentStatus === "paid";

            return (
              <div
                key={order.id}
                style={{
                  background: "#ffffff",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "16px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "#15803d",
                        background: "#ecfdf5",
                        padding: "2px 8px",
                        borderRadius: "9999px"
                      }}
                    >
                      {order.id}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginTop: "4px" }}>
                      {order.quantity} {order.unit} • {order.cropName}
                    </h3>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "#14532d"
                      }}
                    >
                      {formatINR(order.totalAmount)}
                    </div>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color:
                          order.paymentStatus === "paid"
                            ? "#059669"
                            : order.paymentStatus === "escrowed"
                            ? "#0284c7"
                            : "#d97706"
                      }}
                    >
                      ● {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Progress Tracker Bar */}
                <div className="order-tracker">
                  {steps.map((s, idx) => {
                    const isCompleted = idx < currentStepIdx || order.orderStatus === "completed";
                    const isActive = idx === currentStepIdx;

                    return (
                      <div
                        key={s.key}
                        className={`tracker-node ${
                          isCompleted ? "completed" : isActive ? "active" : ""
                        }`}
                      >
                        <div className="tracker-bubble">
                          {isCompleted ? "✓" : idx + 1}
                        </div>
                        <span className="tracker-label">{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Logistics & Delivery Details */}
                <div
                  style={{
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "12px",
                    margin: "12px 0",
                    fontSize: "0.78rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Delivery Method:</span>
                    <strong style={{ textTransform: "capitalize" }}>
                      {order.deliveryType === "buyer_pickup" ? (
                        <>🚜 Farm Gate Buyer Pickup</>
                      ) : (
                        <>🚚 Local Agri-Logistics Dispatch</>
                      )}
                    </strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Handover Hub:</span>
                    <span>{order.deliveryAddress}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>
                      {isFarmer ? "Buyer Contact:" : "Farmer Contact:"}
                    </span>
                    <span>
                      {isFarmer ? order.buyerPhone : order.farmerPhone} (
                      {isFarmer ? order.buyerName : order.farmerName})
                    </span>
                  </div>
                </div>

                {/* Verification Code / OTP Section */}
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px dashed #94a3b8",
                    borderRadius: "var(--radius-md)",
                    padding: "12px",
                    marginBottom: "14px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "6px"
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#334155",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <KeyRound size={13} color="#15803d" /> Secure Handover Verification
                    </span>

                    {/* Buyer sees the OTP to present */}
                    {isBuyer && (
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#166534",
                          fontFamily: "monospace",
                          fontWeight: 800,
                          fontSize: "0.95rem",
                          padding: "2px 8px",
                          borderRadius: "6px"
                        }}
                      >
                        OTP: {order.pickupOtp}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: "1.3" }}>
                    {isBuyer
                      ? "Share this 4-digit code with the farmer upon physically receiving and checking the produce quality."
                      : "Ask buyer for the 4-digit OTP upon dispatch to immediately disburse escrow funds into your bank account."}
                  </p>

                  {/* Farmer OTP Entry Form */}
                  {isFarmer && order.orderStatus !== "completed" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "10px",
                        alignItems: "center"
                      }}
                    >
                      <input
                        type="text"
                        maxLength="4"
                        placeholder="Enter 4-digit OTP"
                        className="form-input"
                        style={{ width: "140px", textAlign: "center", letterSpacing: "2px" }}
                        value={otpInputs[order.id] || ""}
                        onChange={(e) =>
                          setOtpInputs({ ...otpInputs, [order.id]: e.target.value })
                        }
                      />
                      <button
                        onClick={() => handleVerifyOtp(order.id)}
                        className="btn-primary"
                        style={{ fontSize: "0.75rem", padding: "8px 12px" }}
                      >
                        Verify & Complete
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Action Buttons depending on status & role */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {/* Buyer Payment Button if unpaid */}
                  {order.paymentStatus === "unpaid" && isBuyer && (
                    <button
                      onClick={() => setSelectedOrderForPayment(order)}
                      className="btn-primary"
                      style={{ flex: 1 }}
                    >
                      <CreditCard size={15} /> Pay {formatINR(order.totalAmount)} via UPI
                    </button>
                  )}

                  {/* Farmer marks ready for collection */}
                  {order.orderStatus === "confirmed" && isFarmer && (
                    <button
                      onClick={() => markProduceReady(order.id)}
                      className="btn-primary"
                      style={{ flex: 1 }}
                    >
                      <Truck size={15} /> Mark Produce Ready for Collection
                    </button>
                  )}

                  {/* Buyer also has a direct release button if they verified on site */}
                  {isBuyer && order.orderStatus !== "completed" && (
                    <button
                      onClick={() => completeOrderWithOtp(order.id, order.pickupOtp)}
                      className="btn-outline"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <CheckCircle size={14} /> Confirm Receipt & Release Escrow
                    </button>
                  )}

                  {/* Step 10: Ratings modal trigger once completed */}
                  {order.orderStatus === "completed" && (
                    <button
                      onClick={() => setSelectedOrderForRating(order)}
                      className="btn-outline"
                      style={{
                        flex: 1,
                        background: "#fffbeb",
                        borderColor: "#fde68a",
                        color: "#92400e"
                      }}
                    >
                      <Star size={15} color="#f59e0b" fill="#f59e0b" />
                      {order.ratings?.[isFarmer ? "farmerRated" : "buyerRated"]
                        ? "Update Trust Rating"
                        : "Rate & Review Counterparty"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
