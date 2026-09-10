import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Sprout,
  DollarSign,
  Scale,
  Calendar,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  ArrowLeft
} from "lucide-react";

export default function FarmerListingForm() {
  const { currentUser, addProduceListing, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    cropName: "",
    category: "Vegetables",
    quantity: "",
    minOrderQuantity: "50",
    unit: "kg",
    grade: "Grade A (Standard)",
    expectedPrice: "",
    mandiReferencePrice: "",
    harvestDate: new Date().toISOString().split("T")[0],
    shelfLifeDays: "15",
    location: currentUser.location || "Nashik Rural, Maharashtra",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: ""
  });

  // Pre-configured crop photo suggestions for easy one-click selection
  const PHOTO_PRESETS = [
    {
      name: "Vine Tomatoes",
      url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Red Onions",
      url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Golden Wheat",
      url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Basmati Paddy",
      url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Alphonso Mangoes",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Green Peppers",
      url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Fresh Potatoes",
      url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80"
    },
    {
      name: "Crisp Sweet Corn",
      url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80"
    }
  ];

  const handlePriceChange = (priceVal) => {
    const val = Number(priceVal);
    // Automatic Mandi benchmark estimate (middlemen typically pay 20-30% lower)
    const suggestedMandi = val > 0 ? Math.round(val * 0.75) : "";
    setFormData((prev) => ({
      ...prev,
      expectedPrice: priceVal,
      mandiReferencePrice: suggestedMandi
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.expectedPrice) {
      alert("Please fill in the crop name, quantity, and expected price.");
      return;
    }

    addProduceListing(formData);
  };

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <button
          onClick={() => setActiveTab("marketplace")}
          className="btn-outline"
          style={{ padding: "6px 10px", borderRadius: "50%" }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", fontWeight: 800 }}>
            List Your Harvest
          </h2>
          <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
            Sell directly to wholesale buyers & consumers with zero middlemen
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "18px",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        {/* Step Indicator */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "var(--radius-md)",
            padding: "10px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.75rem",
            color: "#166534",
            fontWeight: 600
          }}
        >
          <Sparkles size={16} color="#16a34a" />
          <span>
            Fair Price Guarantee: You dictate your expected selling price without broker deductions.
          </span>
        </div>

        {/* Crop Name */}
        <div className="form-group">
          <label className="form-label">
            <Sprout size={14} color="#15803d" /> Crop / Produce Name *
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Nashik Red Hybrid Onions or Sharbati Wheat"
            value={formData.cropName}
            onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
            required
          />
        </div>

        {/* Category & Grade */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains / Cereals</option>
              <option value="Pulses">Pulses / Lentils</option>
              <option value="Spices">Spices</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Quality / Grade</label>
            <select
              className="form-select"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            >
              <option value="Grade A (Export Quality)">Grade A (Export Quality)</option>
              <option value="Grade A (Standard)">Grade A (Standard)</option>
              <option value="Certified Organic">Certified Organic</option>
              <option value="Grade B (Processing Grade)">Grade B (Processing Grade)</option>
            </select>
          </div>
        </div>

        {/* Quantity & Min Order */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label">
              <Scale size={14} color="#15803d" /> Total Stock Available (kg) *
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 1000"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Min. Order Qty (kg)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 50"
              value={formData.minOrderQuantity}
              onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
            />
          </div>
        </div>

        {/* Price & Mandi Benchmark */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label">
              <DollarSign size={14} color="#15803d" /> Expected Price (₹/kg) *
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 25"
              value={formData.expectedPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mandi Ref. Rate (₹/kg)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 19"
              value={formData.mandiReferencePrice}
              onChange={(e) =>
                setFormData({ ...formData, mandiReferencePrice: e.target.value })
              }
            />
          </div>
        </div>

        {/* Harvest Date & Shelf Life */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label">
              <Calendar size={14} color="#15803d" /> Harvest Date
            </label>
            <input
              type="date"
              className="form-input"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Shelf Life (Days)</label>
            <input
              type="number"
              className="form-input"
              value={formData.shelfLifeDays}
              onChange={(e) => setFormData({ ...formData, shelfLifeDays: e.target.value })}
            />
          </div>
        </div>

        {/* Farm Location */}
        <div className="form-group">
          <label className="form-label">
            <MapPin size={14} color="#15803d" /> Farm Pickup Location
          </label>
          <input
            type="text"
            className="form-input"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        {/* Produce Photo Presets */}
        <div className="form-group">
          <label className="form-label">
            <Camera size={14} color="#15803d" /> Produce Photo
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "8px"
            }}
          >
            {PHOTO_PRESETS.map((p) => {
              const isSelected = formData.image === p.url;
              return (
                <div
                  key={p.name}
                  onClick={() => setFormData({ ...formData, image: p.url })}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: isSelected ? "3px solid #16a34a" : "1.5px solid #e2e8f0",
                    position: "relative",
                    height: "54px"
                  }}
                  title={p.name}
                >
                  <img
                    src={p.url}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontSize: "0.55rem",
                      textAlign: "center",
                      padding: "1px 0"
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Produce Description & Special Notes</label>
          <textarea
            className="form-textarea"
            rows="3"
            placeholder="Mention sorting status, moisture levels, crating availability, organic certification..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Action Button */}
        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px" }}>
          Publish to Direct Marketplace
        </button>
      </form>
    </div>
  );
}
