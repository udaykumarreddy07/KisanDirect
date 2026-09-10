import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Star, Sparkles, Send, ShieldCheck } from "lucide-react";

export default function RatingsModal() {
  const {
    selectedOrderForRating,
    setSelectedOrderForRating,
    submitRating,
    currentUser
  } = useApp();

  if (!selectedOrderForRating) return null;

  const order = selectedOrderForRating;
  const isFarmer = currentUser.role === "farmer" || currentUser.id === order.farmerId;
  const targetName = isFarmer ? order.buyerName : order.farmerName;
  const currentRatingVal =
    order.ratings?.[isFarmer ? "farmerRated" : "buyerRated"] || 5;

  const [stars, setStars] = useState(currentRatingVal);
  const [hoverStars, setHoverStars] = useState(0);
  const [feedback, setFeedback] = useState(order.ratings?.feedback || "");

  const TRUST_TAGS = [
    "Accurate Quality Grade",
    "Prompt Instant Payment",
    "Farm Fresh Direct",
    "Exact Weight Verified",
    "Seamless Pickup",
    "Fair & Honest Trader"
  ];

  const handleTagClick = (tag) => {
    setFeedback((prev) => (prev ? `${prev}, ${tag}` : tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRating(order.id, {
      stars,
      feedback,
      role: isFarmer ? "farmer" : "buyer"
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedOrderForRating(null)}>
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
              Step 10: Mutual Ratings & Trust
            </span>
            <h3 className="modal-title">Rate & Review Counterparty</h3>
          </div>
          <button
            onClick={() => setSelectedOrderForRating(null)}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Counterparty Header */}
        <div
          style={{
            background: "var(--bg-subtle)",
            padding: "14px",
            borderRadius: "var(--radius-lg)",
            marginBottom: "16px",
            textAlign: "center"
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Order: {order.id}</p>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginTop: "2px" }}>
            {targetName}
          </h4>
          <span style={{ fontSize: "0.72rem", color: "#15803d", fontWeight: 600 }}>
            {order.quantity} {order.unit} of {order.cropName}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Star Selection */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <label className="form-label" style={{ justifyContent: "center", marginBottom: "8px" }}>
              How was your direct trade experience?
            </label>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
              {[1, 2, 3, 4, 5].map((num) => {
                const isFilled = num <= (hoverStars || stars);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStars(num)}
                    onMouseEnter={() => setHoverStars(num)}
                    onMouseLeave={() => setHoverStars(0)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      transition: "transform 0.1s"
                    }}
                  >
                    <Star
                      size={32}
                      color={isFilled ? "#f59e0b" : "#cbd5e1"}
                      fill={isFilled ? "#f59e0b" : "none"}
                    />
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#92400e", marginTop: "4px", display: "inline-block" }}>
              {stars === 5 ? "⭐⭐⭐⭐⭐ Outstanding Direct Deal" : `${stars} Stars`}
            </span>
          </div>

          {/* Quick Trust Tags */}
          <div className="form-group">
            <label className="form-label">
              <Sparkles size={14} color="#15803d" /> Quick Trust Tags (Click to add)
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {TRUST_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="chip-btn"
                  style={{ fontSize: "0.7rem" }}
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="form-group">
            <label className="form-label">Written Feedback</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Describe produce freshness, payment punctuality, and overall communication..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>
            <Send size={15} /> Submit Trust Rating
          </button>
        </form>
      </div>
    </div>
  );
}
