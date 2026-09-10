import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { calculateDistanceKm, formatINR } from "../utils/helpers";
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MessageSquareShare,
  SlidersHorizontal,
  Scale,
  Calendar,
  Layers,
  ArrowUpDown,
  User
} from "lucide-react";

export default function DirectMarketplace() {
  const {
    listings,
    currentUser,
    setSelectedCropForOffer,
    setSelectedCropForDetails,
    totalMiddlemanCutSaved,
    setActiveTab,
    deleteListing
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFarmer, setSelectedFarmer] = useState("All");
  const [maxDistanceKm, setMaxDistanceKm] = useState(250); // Default radius
  const [sortBy, setSortBy] = useState("nearest"); // nearest, price_low, price_high, quantity

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Pulses", "Spices"];

  // Unique list of farmers present in listings for quick filtering
  const farmerOptions = useMemo(() => {
    const map = new Map();
    listings.forEach((item) => {
      if (!map.has(item.farmerId)) {
        map.set(item.farmerId, item.farmerName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [listings]);

  // Compute listings with real distance from current user's location
  const filteredListings = useMemo(() => {
    return listings
      .map((item) => {
        const userLat = currentUser?.coordinates?.lat || 19.9975;
        const userLng = currentUser?.coordinates?.lng || 73.7898;
        const itemLat = item.coordinates?.lat || 19.9975;
        const itemLng = item.coordinates?.lng || 73.7898;

        const distance = calculateDistanceKm(userLat, userLng, itemLat, itemLng);
        return { ...item, distanceKm: distance };
      })
      .filter((item) => {
        // Search filter
        const matchesSearch =
          item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.farmerName.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        // Farmer filter
        const matchesFarmer =
          selectedFarmer === "All" || item.farmerId === selectedFarmer;

        // Distance filter
        const matchesDistance = item.distanceKm <= maxDistanceKm;

        return matchesSearch && matchesCategory && matchesFarmer && matchesDistance;
      })
      .sort((a, b) => {
        if (sortBy === "nearest") return a.distanceKm - b.distanceKm;
        if (sortBy === "price_low") return a.expectedPrice - b.expectedPrice;
        if (sortBy === "price_high") return b.expectedPrice - a.expectedPrice;
        if (sortBy === "quantity") return b.quantity - a.quantity;
        return 0;
      });
  }, [listings, currentUser, searchQuery, selectedCategory, selectedFarmer, maxDistanceKm, sortBy]);

  return (
    <div>
      {/* Platform Impact Card */}
      <div className="savings-metric-card">
        <div>
          <div className="savings-metric-title">
            <TrendingUp size={15} /> Direct Market Access Impact
          </div>
          <div className="savings-metric-val">{formatINR(totalMiddlemanCutSaved)}</div>
          <div className="savings-metric-sub">
            Extra income kept by local farmers instead of middleman broker fees
          </div>
        </div>
        <div style={{ fontSize: "2rem" }}>🌾</div>
      </div>

      {/* Search & Location Filter Section */}
      <div className="search-filter-box">
        <div className="search-input-group">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search crops (e.g., Onions, Tomatoes, Wheat, Basmati)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "transparent",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Location Radius & Sort Row */}
        <div className="filter-controls-row" style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
          <div className="distance-slider-box">
            <MapPin size={15} color="#15803d" />
            <span>Radius:</span>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
            />
            <span style={{ minWidth: "48px", fontWeight: 700, color: "#15803d" }}>
              {maxDistanceKm} km
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={13} color="#64748b" />
              <select
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
                className="form-select"
                style={{ padding: "4px 8px", fontSize: "0.72rem", width: "auto" }}
                title="Filter by Farmer"
              >
                <option value="All">All Farmers ({listings.length} crops)</option>
                {farmerOptions.map((f) => {
                  const count = listings.filter((l) => l.farmerId === f.id).length;
                  return (
                    <option key={f.id} value={f.id}>
                      {f.name} ({count} crops)
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ArrowUpDown size={13} color="#64748b" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: "4px 8px", fontSize: "0.72rem", width: "auto" }}
              >
                <option value="nearest">Nearest Distance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="quantity">Max Quantity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Produce Listings Grid */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>
          Available Produce ({filteredListings.length})
        </h2>
        {currentUser.role === "farmer" && (
          <button
            onClick={() => setActiveTab("sell")}
            className="btn-primary"
            style={{ padding: "6px 12px", fontSize: "0.75rem", flex: "none" }}
          >
            + List Produce
          </button>
        )}
      </div>

      {filteredListings.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "32px 16px",
            borderRadius: "18px",
            textAlign: "center",
            border: "1px dashed #cbd5e1"
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "8px" }}>🚜</p>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>
            No crops found in this radius
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "12px" }}>
            Try expanding your distance radius slider or searching for another crop.
          </p>
          <button
            onClick={() => {
              setMaxDistanceKm(500);
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="btn-outline"
            style={{ margin: "0 auto", fontSize: "0.75rem" }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="crops-grid">
          {filteredListings.map((crop) => {
            const isOwner = crop.farmerId === currentUser.id;
            const extraFarmerGain = crop.expectedPrice - crop.mandiReferencePrice;

            return (
              <div
                key={crop.id}
                className="crop-card"
                onClick={() => setSelectedCropForDetails(crop)}
                style={{ cursor: "pointer" }}
                title="Click to view total produce information & edit details"
              >
                <div className="crop-card-image-wrapper">
                  <img
                    src={crop.image}
                    alt={crop.cropName}
                    className="crop-card-image"
                    loading="lazy"
                  />
                  <span className="crop-grade-tag">
                    <Sparkles size={11} color="#f59e0b" />
                    {crop.grade}
                  </span>
                  <span className="crop-distance-badge">
                    <MapPin size={11} />
                    {crop.distanceKm} km away
                  </span>
                </div>

                <div className="crop-card-body">
                  <div className="crop-title-row">
                    <div>
                      <h3 className="crop-name">{crop.cropName}</h3>
                      <div className="crop-location">
                        <MapPin size={12} color="#64748b" />
                        {crop.location}
                      </div>
                    </div>

                    <div className="farmer-reputation-pill">
                      ⭐ {crop.farmerRating}
                      {crop.farmerVerified && (
                        <ShieldCheck size={13} color="#059669" title="Verified Farmer" />
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: "1.4" }}>
                    {crop.description}
                  </p>

                  {/* Mandi Benchmark Price Comparison */}
                  <div className="price-comparison-box">
                    <div className="price-col">
                      <span className="price-col-label">Direct Farmer Price</span>
                      <span className="price-col-val farmer-price">
                        ₹{crop.expectedPrice}
                        <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>/{crop.unit}</span>
                      </span>
                    </div>

                    <div className="price-col">
                      <span className="price-col-label">Middleman Mandi Rate</span>
                      <span className="price-col-val mandi-ref">
                        ₹{crop.mandiReferencePrice}
                        <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>/{crop.unit}</span>
                      </span>
                    </div>

                    <div className="middleman-savings-tag">
                      <TrendingUp size={13} />
                      Farmer earns ₹{extraFarmerGain}/kg extra (Zero middleman broker fee!)
                    </div>
                  </div>

                  {/* Quantity & Harvest Metadata */}
                  <div className="crop-meta-chips">
                    <span className="crop-meta-chip">
                      <Scale size={11} style={{ display: "inline", marginRight: "3px" }} />
                      Total Stock: {crop.quantity.toLocaleString()} {crop.unit}
                    </span>
                    <span className="crop-meta-chip">
                      <Layers size={11} style={{ display: "inline", marginRight: "3px" }} />
                      Min Order: {crop.minOrderQuantity} {crop.unit}
                    </span>
                    <span className="crop-meta-chip">
                      <Calendar size={11} style={{ display: "inline", marginRight: "3px" }} />
                      Harvested: {crop.harvestDate}
                    </span>
                  </div>

                  {/* Farmer profile snippet */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                      color: "#64748b",
                      paddingTop: "6px",
                      borderTop: "1px solid #f1f5f9"
                    }}
                  >
                    <span>Grower: <strong style={{ color: "#0f172a" }}>{crop.farmerName}</strong></span>
                    {isOwner ? (
                      <span style={{ color: "#15803d", fontWeight: 700 }}>Your Listing (Click to Edit)</span>
                    ) : (
                      <span style={{ color: "#0369a1", fontWeight: 600 }}>Click for Total Info ➔</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="crop-action-row" onClick={(e) => e.stopPropagation()}>
                    {isOwner ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedCropForDetails(crop)}
                          className="btn-primary"
                          style={{ fontSize: "0.78rem", padding: "8px 12px" }}
                        >
                          Edit Price & Details
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteListing(crop.id)}
                          className="btn-outline"
                          style={{ color: "#b91c1c", borderColor: "#fca5a5", fontSize: "0.78rem", padding: "8px 10px" }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedCropForDetails(crop)}
                          className="btn-outline"
                          style={{ fontSize: "0.78rem", padding: "8px 10px" }}
                        >
                          View Info
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCropForOffer(crop)}
                          className="btn-primary"
                          style={{ fontSize: "0.78rem", padding: "8px 12px" }}
                        >
                          <MessageSquareShare size={14} />
                          Send Offer
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
