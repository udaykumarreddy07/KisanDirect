import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  CornerDownRight,
  Send,
  Clock,
  ArrowRight,
  ShieldCheck,
  Scale
} from "lucide-react";

export default function NegotiationsTab() {
  const {
    offers,
    currentUser,
    acceptOfferAndCreateOrder,
    counterOffer,
    rejectOffer,
    setActiveTab
  } = useApp();

  const [counterInputs, setCounterInputs] = useState({}); // { [offerId]: { price: '', note: '' } }
  const [activeCounterOfferId, setActiveCounterOfferId] = useState(null);

  // Filter offers relevant to current user
  const relevantOffers = offers.filter((o) => {
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "farmer") return o.farmerId === currentUser.id;
    return o.buyerId === currentUser.id;
  });

  const handleCounterSubmit = (offerId) => {
    const data = counterInputs[offerId];
    if (!data?.price || Number(data.price) <= 0) {
      alert("Please enter a valid counter price.");
      return;
    }
    counterOffer(offerId, Number(data.price), data.note || "");
    setActiveCounterOfferId(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          Direct Price Negotiations
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
          Step 4: Real-time offers and counter-offers between farmers and buyers
        </p>
      </div>

      {relevantOffers.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "32px 16px",
            borderRadius: "18px",
            textAlign: "center",
            border: "1px dashed #cbd5e1"
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "8px" }}>💬</p>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>
            No Active Negotiations
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "12px" }}>
            {currentUser.role === "farmer"
              ? "You will see offers here as wholesale buyers and consumers bid on your crops."
              : "Browse the marketplace and submit an offer to negotiate direct prices."}
          </p>
          <button
            onClick={() => setActiveTab("marketplace")}
            className="btn-primary"
            style={{ margin: "0 auto", fontSize: "0.8rem", padding: "8px 16px" }}
          >
            Explore Marketplace
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {relevantOffers.map((offer) => {
            const isFarmer = currentUser.role === "farmer" || currentUser.id === offer.farmerId;
            const currentEffectivePrice = offer.counterPrice || offer.offeredPrice;
            const totalDealValue = currentEffectivePrice * offer.quantity;
            const isCounteringThis = activeCounterOfferId === offer.id;

            // Status chip
            let statusClass = "status-pending";
            let statusLabel = "Offer Pending";
            if (offer.status === "countered") {
              statusClass = "status-countered";
              statusLabel = "Countered";
            } else if (offer.status === "accepted") {
              statusClass = "status-accepted";
              statusLabel = "Accepted & Ordered";
            } else if (offer.status === "rejected") {
              statusClass = "status-rejected";
              statusLabel = "Declined";
            }

            return (
              <div key={offer.id} className="negotiation-card">
                {/* Header info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "10px"
                  }}
                >
                  <div>
                    <span className={`negotiation-status-badge ${statusClass}`}>
                      {statusLabel}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "6px" }}>
                      {offer.cropName}
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {isFarmer ? (
                        <>From Buyer: <strong>{offer.buyerName}</strong> ({offer.buyerType})</>
                      ) : (
                        <>Farmer: <strong>{offer.farmerName}</strong></>
                      )}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>
                      DEAL VALUE
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: "#15803d"
                      }}
                    >
                      {formatINR(totalDealValue)}
                    </div>
                  </div>
                </div>

                {/* Offer Numbers Matrix */}
                <div
                  style={{
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 12px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    textAlign: "center"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Quantity</div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                      {offer.quantity.toLocaleString()} kg
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Farmer Asking</div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#475569" }}>
                      ₹{offer.expectedPrice}/kg
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#15803d", fontWeight: 700 }}>
                      Latest Rate
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: "#14532d"
                      }}
                    >
                      ₹{currentEffectivePrice}/kg
                    </div>
                  </div>
                </div>

                {/* Timeline History */}
                <div className="timeline-flow">
                  {offer.history.map((step, idx) => (
                    <div key={idx} className="timeline-step">
                      <span className="timeline-dot" />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong style={{ color: "#0f172a" }}>{step.sender}</strong>
                        <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
                          ₹{step.price}/kg
                        </span>
                      </div>
                      <div style={{ color: "#475569", marginTop: "2px" }}>{step.note}</div>
                    </div>
                  ))}
                </div>

                {/* Counter input expander */}
                {isCounteringThis && (
                  <div
                    style={{
                      background: "#fefce8",
                      border: "1px solid #fef08a",
                      borderRadius: "var(--radius-md)",
                      padding: "12px",
                      marginTop: "12px"
                    }}
                  >
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, marginBottom: "6px" }}>
                      Submit Counter Proposal:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "8px" }}>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="₹/kg"
                        className="form-input"
                        value={counterInputs[offer.id]?.price || ""}
                        onChange={(e) =>
                          setCounterInputs({
                            ...counterInputs,
                            [offer.id]: {
                              ...counterInputs[offer.id],
                              price: e.target.value
                            }
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Note (e.g., Includes crates, delivery tomorrow)"
                        className="form-input"
                        value={counterInputs[offer.id]?.note || ""}
                        onChange={(e) =>
                          setCounterInputs({
                            ...counterInputs,
                            [offer.id]: {
                              ...counterInputs[offer.id],
                              note: e.target.value
                            }
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button
                        onClick={() => handleCounterSubmit(offer.id)}
                        className="btn-primary"
                        style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      >
                        <Send size={13} /> Send Counter
                      </button>
                      <button
                        onClick={() => setActiveCounterOfferId(null)}
                        className="btn-outline"
                        style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons for Pending or Countered Offers */}
                {offer.status !== "accepted" && offer.status !== "rejected" && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                    <button
                      onClick={() => acceptOfferAndCreateOrder(offer.id)}
                      className="btn-primary"
                      style={{ fontSize: "0.8rem", padding: "8px 12px" }}
                    >
                      <CheckCircle2 size={16} /> Accept & Create Order
                    </button>

                    <button
                      onClick={() =>
                        setActiveCounterOfferId(
                          isCounteringThis ? null : offer.id
                        )
                      }
                      className="btn-outline"
                      style={{ fontSize: "0.8rem", padding: "8px 12px" }}
                    >
                      <CornerDownRight size={15} /> Counter
                    </button>

                    <button
                      onClick={() => rejectOffer(offer.id)}
                      className="btn-outline"
                      style={{
                        color: "#ef4444",
                        borderColor: "#fca5a5",
                        fontSize: "0.8rem",
                        padding: "8px 10px"
                      }}
                    >
                      <XCircle size={15} /> Decline
                    </button>
                  </div>
                )}

                {offer.status === "accepted" && (
                  <div
                    style={{
                      marginTop: "12px",
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      borderRadius: "var(--radius-md)",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#065f46", fontWeight: 600 }}>
                      ✓ Deal closed! Track pickup, payment & delivery in Orders.
                    </span>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="btn-primary"
                      style={{ padding: "4px 8px", fontSize: "0.72rem", flex: "none" }}
                    >
                      View Order <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
