import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/helpers";
import {
  X,
  Sparkles,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Scale,
  Calendar,
  Layers,
  Phone,
  Edit3,
  Check,
  MessageSquareShare,
  Trash2,
  DollarSign,
  Info
} from "lucide-react";

export default function ProductDetailModal() {
  const {
    selectedCropForDetails,
    setSelectedCropForDetails,
    currentUser,
    updateProduceListing,
    deleteListing,
    setSelectedCropForOffer,
    directInstantBuy
  } = useApp();

  const crop = selectedCropForDetails;
  const isOwner = crop && (currentUser.id === crop.farmerId || currentUser.role === "admin");

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    cropName: "",
    expectedPrice: "",
    mandiReferencePrice: "",
    quantity: "",
    minOrderQuantity: "",
    grade: "",
    shelfLifeDays: "",
    description: ""
  });

  useEffect(() => {
    if (crop) {
      setEditForm({
        cropName: crop.cropName,
        expectedPrice: crop.expectedPrice,
        mandiReferencePrice: crop.mandiReferencePrice,
        quantity: crop.quantity,
        minOrderQuantity: crop.minOrderQuantity,
        grade: crop.grade,
        shelfLifeDays: crop.shelfLifeDays,
        description: crop.description
      });
      setIsEditing(false);
    }
  }, [crop]);

  if (!crop) return null;

  const extraGainPerKg = Number(crop.expectedPrice) - Number(crop.mandiReferencePrice);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateProduceListing(crop.id, {
      cropName: editForm.cropName,
      expectedPrice: Number(editForm.expectedPrice),
      mandiReferencePrice: Number(editForm.mandiReferencePrice),
      quantity: Number(editForm.quantity),
      minOrderQuantity: Number(editForm.minOrderQuantity),
      grade: editForm.grade,
      shelfLifeDays: Number(editForm.shelfLifeDays),
      description: editForm.description
    });
    setIsEditing(false);
  };

  const handleStartOffer = () => {
    setSelectedCropForOffer(crop);
    setSelectedCropForDetails(null);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${crop.cropName} from marketplace?`)) {
      deleteListing(crop.id);
      setSelectedCropForDetails(null);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedCropForDetails(null)}>
      <div
        className="modal-sheet"
        style={{ maxWidth: "680px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "#15803d",
                textTransform: "uppercase",
                background: "#f0fdf4",
                padding: "3px 10px",
                borderRadius: "9999px"
              }}
            >
              {crop.category} • Complete Details
            </span>
            {isOwner && (
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  background: "#e0f2fe",
                  color: "#0369a1",
                  padding: "3px 8px",
                  borderRadius: "9999px"
                }}
              >
                Your Crop Listing
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isOwner && (
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="btn-outline"
                style={{ padding: "5px 10px", fontSize: "0.75rem" }}
              >
                <Edit3 size={13} /> {isEditing ? "View Details" : "Edit Details & Price"}
              </button>
            )}
            <button
              onClick={() => setSelectedCropForDetails(null)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* View Details Mode */}
        {!isEditing ? (
          <div>
            {/* Top Showcase Image with Badges */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "260px",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "16px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <img
                src={crop.image}
                alt={crop.cropName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="crop-grade-tag">
                <Sparkles size={12} color="#f59e0b" />
                {crop.grade}
              </span>
              <span className="crop-distance-badge">
                <MapPin size={12} />
                {crop.distanceKm ? `${crop.distanceKm} km nearby` : crop.location}
              </span>
            </div>

            {/* Title & Grower Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                  {crop.cropName}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>
                  <MapPin size={14} color="#15803d" />
                  <span>{crop.location}</span>
                </div>
              </div>

              <div className="farmer-reputation-pill" style={{ fontSize: "0.82rem", padding: "6px 12px" }}>
                ⭐ {crop.farmerRating || 4.9} Trust Score
                {crop.farmerVerified && <ShieldCheck size={16} color="#059669" />}
              </div>
            </div>

            {/* Price Comparison Matrix */}
            <div className="price-comparison-box" style={{ padding: "16px", marginBottom: "16px" }}>
              <div className="price-col">
                <span className="price-col-label">Direct Farmer Price</span>
                <span className="price-col-val farmer-price" style={{ fontSize: "1.6rem" }}>
                  ₹{crop.expectedPrice}
                  <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>/{crop.unit}</span>
                </span>
                <span style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 600 }}>
                  100% Direct Payout
                </span>
              </div>

              <div className="price-col">
                <span className="price-col-label">APMC Mandi Rate</span>
                <span className="price-col-val mandi-ref" style={{ fontSize: "1.35rem" }}>
                  ₹{crop.mandiReferencePrice}
                  <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>/{crop.unit}</span>
                </span>
                <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                  Middlemen typical baseline
                </span>
              </div>

              <div className="middleman-savings-tag" style={{ fontSize: "0.78rem", padding: "8px 12px" }}>
                <TrendingUp size={15} />
                <span>
                  Farmer earns <strong>₹{extraGainPerKg > 0 ? extraGainPerKg : 0}/{crop.unit}</strong> extra without commission cuts!
                </span>
              </div>
            </div>

            {/* Stock, Minimum Order, Harvest & Shelf-Life Matrix */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "14px",
                marginBottom: "16px",
                textAlign: "center"
              }}
            >
              <div>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>AVAILABLE STOCK</div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a", marginTop: "2px" }}>
                  {crop.quantity.toLocaleString()} {crop.unit}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>MIN ORDER</div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a", marginTop: "2px" }}>
                  {crop.minOrderQuantity} {crop.unit}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>HARVEST DATE</div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#0f172a", marginTop: "2px" }}>
                  {crop.harvestDate}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>SHELF LIFE</div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#15803d", marginTop: "2px" }}>
                  {crop.shelfLifeDays} Days
                </div>
              </div>
            </div>

            {/* Produce Description */}
            <div style={{ marginBottom: "18px" }}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                Produce Description & Quality Notes:
              </h4>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: "1.5", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px" }}>
                {crop.description || "Fresh harvest naturally cultivated and sorted directly at farm origin."}
              </p>
            </div>

            {/* Grower / Farmer Verified Identity Card */}
            <div
              style={{
                border: "1.5px solid #86efac",
                background: "#f0fdf4",
                borderRadius: "var(--radius-lg)",
                padding: "16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80"
                  alt={crop.farmerName}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #16a34a" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#14532d" }}>
                      {crop.farmerName}
                    </h4>
                    <ShieldCheck size={16} color="#15803d" title="Verified Farmer" />
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#166534" }}>
                    Direct Producer • {crop.location}
                  </p>
                </div>
              </div>

              <a
                href={`tel:+919823456789`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#ffffff",
                  color: "#15803d",
                  padding: "8px 14px",
                  borderRadius: "9999px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  border: "1px solid #86efac",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <Phone size={13} /> Call Farmer
              </a>
            </div>

            {/* Direct Zero-Middleman Transparency Box */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px dashed #94a3b8",
                borderRadius: "12px",
                padding: "12px 14px",
                marginBottom: "16px",
                fontSize: "0.78rem",
                color: "#475569",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.2rem" }}>🛡️</span>
                <div>
                  <strong style={{ color: "#0f172a", display: "block" }}>Direct Trade Guarantee: No Broker Commissions</strong>
                  <span>Direct farmer UPI escrow protection. Inspect quality before releasing funds.</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={`tel:${crop.farmerPhone || "+919823456789"}`}
                  className="btn-outline"
                  style={{ fontSize: "0.72rem", padding: "6px 10px", textDecoration: "none", color: "#15803d", borderColor: "#86efac", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <Phone size={12} /> Call Farmer
                </a>
                <a
                  href={`https://wa.me/919823456789?text=${encodeURIComponent(`Hello ${crop.farmerName}, I am interested in buying ${crop.cropName} directly via KisanDirect.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ fontSize: "0.72rem", padding: "6px 10px", textDecoration: "none", color: "#16a34a", borderColor: "#86efac", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {isOwner ? (
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    <Edit3 size={16} /> Edit Product Price & Stock
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn-outline"
                    style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        directInstantBuy(crop, crop.minOrderQuantity || 10);
                        setSelectedCropForDetails(null);
                      }}
                      className="btn-primary"
                      style={{
                        padding: "12px",
                        fontSize: "0.88rem",
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      ⚡ Buy Now (₹{crop.expectedPrice}/{crop.unit})
                    </button>

                    <button
                      type="button"
                      onClick={handleStartOffer}
                      className="btn-outline"
                      style={{
                        padding: "12px",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <MessageSquareShare size={16} /> Send Direct Offer
                    </button>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", textAlign: "center" }}>
                    Min order: {crop.minOrderQuantity} {crop.unit} • Zero middleman fee applied
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Farmer Edit Mode Form */
          <form onSubmit={handleSaveEdit}>
            <div
              style={{
                background: "#fef3c7",
                border: "1px solid #fcd34d",
                padding: "10px 14px",
                borderRadius: "10px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.78rem",
                color: "#92400e",
                fontWeight: 600
              }}
            >
              <Info size={16} />
              <span>Update your produce price and quantities anytime without middleman restrictions.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Crop Name</label>
              <input
                type="text"
                className="form-input"
                value={editForm.cropName}
                onChange={(e) => setEditForm({ ...editForm, cropName: e.target.value })}
                required
              />
            </div>

            {/* Expected Price & Mandi Benchmark */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label" style={{ color: "#15803d", fontWeight: 800 }}>
                  <DollarSign size={14} color="#15803d" /> Your Expected Price (₹/{crop.unit}) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="form-input"
                  style={{ borderColor: "#86efac", fontWeight: 800, fontSize: "1.1rem", color: "#14532d" }}
                  value={editForm.expectedPrice}
                  onChange={(e) => setEditForm({ ...editForm, expectedPrice: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mandi Reference Rate (₹/{crop.unit})</label>
                <input
                  type="number"
                  step="0.5"
                  className="form-input"
                  value={editForm.mandiReferencePrice}
                  onChange={(e) => setEditForm({ ...editForm, mandiReferencePrice: e.target.value })}
                />
              </div>
            </div>

            {/* Stock & Min Order */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label">Total Stock Available ({crop.unit}) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={editForm.quantity}
                  onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Min. Order Threshold ({crop.unit})</label>
                <input
                  type="number"
                  className="form-input"
                  value={editForm.minOrderQuantity}
                  onChange={(e) => setEditForm({ ...editForm, minOrderQuantity: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Quality Grade & Shelf Life */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label">Quality Grade</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.grade}
                  onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shelf Life (Days)</label>
                <input
                  type="number"
                  className="form-input"
                  value={editForm.shelfLifeDays}
                  onChange={(e) => setEditForm({ ...editForm, shelfLifeDays: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Produce Description & Special Notes</label>
              <textarea
                rows="3"
                className="form-textarea"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                <Check size={16} /> Save Product Updates
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
