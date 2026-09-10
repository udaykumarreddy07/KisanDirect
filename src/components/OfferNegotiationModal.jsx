import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  X,
  Sparkles,
  TrendingDown,
  Truck,
  ShieldCheck,
  Send,
  HelpCircle
} from "lucide-react";

export default function OfferNegotiationModal() {
  const { selectedCropForOffer, setSelectedCropForOffer, sendBuyerOffer, currentUser } = useApp();

  if (!selectedCropForOffer) return null;

  const crop = selectedCropForOffer;
  const [quantity, setQuantity] = useState(
    Math.min(crop.quantity, Math.max(crop.minOrderQuantity, 100))
  );
  const [offeredPrice, setOfferedPrice] = useState(crop.expectedPrice);
  const [notes, setNotes] = useState("");

  const totalOfferAmount = Number(quantity) * Number(offeredPrice);
  const totalAtFarmerPrice = Number(quantity) * Number(crop.expectedPrice);
  const estimatedMiddlemanAvoidedCut = Math.round(totalOfferAmount * 0.30);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0 || !offeredPrice || offeredPrice <= 0) {
      alert("Please enter a valid quantity and offered price.");
      return;
    }
    if (quantity < crop.minOrderQuantity) {
      alert(`Minimum order quantity for this produce is ${crop.minOrderQuantity} ${crop.unit}`);
      return;
    }

    sendBuyerOffer({
      crop,
      quantity,
      offeredPrice,
      notes
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedCropForOffer(null)}>
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
              Step 4: Fair Price Negotiation
            </span>
            <h3 className="modal-title">Make a Direct Offer</h3>
          </div>
          <button
            onClick={() => setSelectedCropForOffer(null)}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Selected Crop Snippet */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            background: "var(--bg-subtle)",
            padding: "10px",
            borderRadius: "var(--radius-lg)",
            marginBottom: "14px",
            alignItems: "center"
          }}
        >
          <img
            src={crop.image}
            alt={crop.cropName}
            style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }}
          />
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{crop.cropName}</h4>
            <p style={{ fontSize: "0.72rem", color: "#64748b" }}>
              Farmer: <strong>{crop.farmerName}</strong> • {crop.location}
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px", fontSize: "0.72rem" }}>
              <span style={{ color: "#15803d", fontWeight: 700 }}>
                Asking: ₹{crop.expectedPrice}/{crop.unit}
              </span>
              <span style={{ color: "#64748b" }}>
                Mandi Ref: ₹{crop.mandiReferencePrice}/{crop.unit}
              </span>
            </div>
          </div>
        </div>

        {/* Negotiation Form */}
        <form onSubmit={handleSubmit}>
          {/* Quantity required */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label className="form-label">Quantity Needed ({crop.unit})</label>
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Min: {crop.minOrderQuantity} | Available: {crop.quantity}
              </span>
            </div>
            <input
              type="number"
              className="form-input"
              value={quantity}
              min={crop.minOrderQuantity}
              max={crop.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Offer Price per kg */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label className="form-label">Your Proposed Price (₹/{crop.unit})</label>
              <span style={{ fontSize: "0.7rem", color: "#15803d", fontWeight: 600 }}>
                Farmer asking ₹{crop.expectedPrice}
              </span>
            </div>
            <input
              type="number"
              step="0.5"
              className="form-input"
              value={offeredPrice}
              onChange={(e) => setOfferedPrice(e.target.value)}
              required
            />
          </div>

          {/* Deal Value & Savings Overview */}
          <div
            style={{
              background: "#f0fdf4",
              border: "1.5px dashed #86efac",
              borderRadius: "var(--radius-md)",
              padding: "12px",
              margin: "12px 0"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px"
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#166534", fontWeight: 600 }}>
                Total Offer Value:
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "#14532d" }}>
                {formatINR(totalOfferAmount)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.72rem",
                color: "#15803d"
              }}
            >
              <Sparkles size={13} />
              <span>
                Zero Broker Cut: Both you and farmer save ~{formatINR(estimatedMiddlemanAvoidedCut)}!
              </span>
            </div>
          </div>

          {/* Delivery & Logistics notes */}
          <div className="form-group">
            <label className="form-label">
              <Truck size={14} color="#15803d" /> Logistics or Packing Note
            </label>
            <textarea
              className="form-textarea"
              rows="2"
              placeholder="e.g. Can collect tomorrow at 10 AM with our own vehicle / Require packing crates..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "6px" }}>
            <Send size={15} /> Send Direct Offer to Farmer
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              color: "#94a3b8",
              marginTop: "10px"
            }}
          >
            The farmer can Accept, Counter-offer, or Decline. No middleman charges apply.
          </p>
        </form>
      </div>
    </div>
  );
}
