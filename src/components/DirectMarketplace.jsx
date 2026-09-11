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
  Scale,
  Calendar,
  Layers,
  ArrowUpDown,
  User,
  Zap,
  Phone,
  MessageCircle,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Wrench,
  Clock,
  FileText
} from "lucide-react";

export default function DirectMarketplace() {
  const {
    listings,
    currentUser,
    setSelectedCropForOffer,
    setSelectedCropForDetails,
    totalMiddlemanCutSaved,
    setActiveTab,
    deleteListing,
    directInstantBuy,
    switchUser
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFarmer, setSelectedFarmer] = useState("All");
  const [maxDistanceKm, setMaxDistanceKm] = useState(1500); // Default radius
  const [sortBy, setSortBy] = useState("nearest"); // nearest, price_low, price_high, quantity, savings
  const [showComparison, setShowComparison] = useState(false);

  const categories = [
    { id: "All", label: "All Items", icon: "🌾" },
    { id: "Secondhand Tractors", label: "Used Tractors", icon: "🚜" },
    { id: "Machinery & Implements", label: "Machinery", icon: "⚙️" },
    { id: "Spare Parts & Components", label: "Spare Parts", icon: "🛞" },
    { id: "Irrigation & Solar Pumps", label: "Pumps & Solar", icon: "💧" },
    { id: "Dairy & Livestock", label: "Cattle & Livestock", icon: "🐄" },
    { id: "Vegetables", label: "Vegetables", icon: "🥬" },
    { id: "Fruits", label: "Fruits", icon: "🍎" },
    { id: "Grains", label: "Grains", icon: "🌾" },
    { id: "Pulses", label: "Pulses", icon: "🫘" },
    { id: "Spices", label: "Spices", icon: "🌶️" },
    { id: "Dairy & Poultry", label: "Dairy & Ghee", icon: "🥛" },
    { id: "Oils & Honey", label: "Oils & Honey", icon: "🍯" },
    { id: "Seeds & Bio-Inputs", label: "Seeds & Bio", icon: "🌿" }
  ];

  // Unique list of farmers present in listings
  const farmerOptions = useMemo(() => {
    const map = new Map();
    listings.forEach((item) => {
      if (!map.has(item.farmerId)) {
        map.set(item.farmerId, item.farmerName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [listings]);

  // Compute listings with distance and filter
  const filteredListings = useMemo(() => {
    return listings
      .map((item) => {
        const userLat = currentUser?.coordinates?.lat || 19.9975;
        const userLng = currentUser?.coordinates?.lng || 73.7898;
        const itemLat = item.coordinates?.lat || 19.9975;
        const itemLng = item.coordinates?.lng || 73.7898;

        const distance = calculateDistanceKm(userLat, userLng, itemLat, itemLng);
        const extraFarmerGain = (item.expectedPrice || 0) - (item.mandiReferencePrice || 0);
        return { ...item, distanceKm: distance, extraFarmerGain };
      })
      .filter((item) => {
        // Search filter
        const matchesSearch =
          item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.condition && item.condition.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.modelYear && item.modelYear.toLowerCase().includes(searchQuery.toLowerCase()));

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
        if (sortBy === "savings") return b.extraFarmerGain - a.extraFarmerGain;
        return 0;
      });
  }, [listings, currentUser, searchQuery, selectedCategory, selectedFarmer, maxDistanceKm, sortBy]);

  const handleSellClick = () => {
    if (currentUser.role !== "farmer") {
      switchUser("farmer_ramesh");
    }
    setActiveTab("sell");
  };

  return (
    <div className="direct-marketplace-page">
      {/* 1. Hero Showcase Banner */}
      <div
        className="hero-direct-banner"
        style={{
          background: "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
          borderRadius: "20px",
          padding: "26px 24px",
          color: "#ffffff",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 25px -5px rgba(20, 83, 45, 0.25)"
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: "780px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "10px", backdropFilter: "blur(4px)" }}>
            <Sparkles size={13} color="#fde047" /> DIRECT FARMER-TO-BUYER MARKETPLACE
          </div>

          <h1 style={{ fontSize: "1.75rem", fontFamily: "var(--font-heading)", fontWeight: 800, margin: "0 0 8px 0", lineHeight: "1.2" }}>
            Sell <span style={{ color: "#86efac" }}>Tractors, Spares, Machinery</span> & Farm Produce Directly.
          </h1>

          <p style={{ fontSize: "0.88rem", opacity: 0.92, margin: "0 0 16px 0", lineHeight: "1.5" }}>
            Zero mediators, zero middleman cuts. Farmers can sell <strong>secondhand tractors, rotary tillers, spare parts, irrigation pumps, cattle, honey, and fresh crops</strong> directly to buyers with 100% payout security and direct phone/WhatsApp connect.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={handleSellClick}
              className="btn-primary"
              style={{
                background: "#facc15",
                color: "#14532d",
                fontWeight: 800,
                fontSize: "0.85rem",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(250, 204, 21, 0.4)"
              }}
            >
              <PlusCircle size={17} /> + Sell Any Farm Item / Tractor
            </button>

            <button
              onClick={() => setShowComparison(!showComparison)}
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "10px",
                padding: "9px 14px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backdropFilter: "blur(4px)"
              }}
            >
              <span>Why Direct Selling?</span>
              {showComparison ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        </div>

        {/* Floating Impact Stats Card */}
        <div
          style={{
            position: "absolute",
            right: "24px",
            bottom: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            color: "#0f172a",
            borderRadius: "14px",
            padding: "14px 18px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            backdropFilter: "blur(8px)",
            textAlign: "right",
            display: "none"
          }}
          className="desktop-stat-badge"
        >
          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
            Total Dealer / Broker Cut Saved
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#15803d" }}>
            {formatINR(totalMiddlemanCutSaved)}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#166534", fontWeight: 600 }}>
            100% kept in local farmers' bank accounts
          </div>
        </div>
      </div>

      {/* 2. Expandable Zero-Middleman vs Traditional Mandi / Tractor Broker Comparison Table */}
      {showComparison && (
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #86efac",
            borderRadius: "16px",
            padding: "18px 22px",
            marginBottom: "20px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#14532d", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              ⚖️ The Direct Advantage: Traditional Brokers vs KisanDirect
            </h3>
            <button
              onClick={() => setShowComparison(false)}
              style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b", fontSize: "0.8rem" }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Traditional Middleman / Dealer */}
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "12px 14px" }}>
              <h4 style={{ color: "#991b1b", fontSize: "0.85rem", fontWeight: 800, margin: "0 0 8px 0" }}>
                ❌ Traditional Used Tractor Dealers & Mandi Dalals
              </h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.78rem", color: "#7f1d1d", lineHeight: "1.6" }}>
                <li><strong>₹20,000 - ₹50,000 Broker Fee:</strong> Dealers add huge margins on secondhand machinery.</li>
                <li><strong>Delayed Payouts:</strong> Intermediaries hold payments until final buyers pay.</li>
                <li><strong>Heavy Commission on Spare Parts:</strong> Unfair markups on used implements & spares.</li>
                <li><strong>Zero Transparency:</strong> Seller farmer and buyer farmer never talk directly.</li>
              </ul>
            </div>

            {/* KisanDirect Direct Model */}
            <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "12px", padding: "12px 14px" }}>
              <h4 style={{ color: "#14532d", fontSize: "0.85rem", fontWeight: 800, margin: "0 0 8px 0" }}>
                ✅ KisanDirect Peer-to-Peer Direct Marketplace
              </h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.78rem", color: "#166534", lineHeight: "1.6" }}>
                <li><strong>0% Platform Commission:</strong> Farmers sell directly at their own price with zero broker cut.</li>
                <li><strong>Direct Phone & WhatsApp:</strong> Schedule farm visits, inspections, and test drives.</li>
                <li><strong>Verified RC & Papers:</strong> Direct verification of single-owner tractors & equipment.</li>
                <li><strong>Full Agricultural Ecosystem:</strong> Tractors, Rotavators, Tyres, Batteries, Cattle, & Crops!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. Platform Impact Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "18px"
        }}
      >
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803d", flexShrink: 0 }}>
            <TrendingUp size={18} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>BROKER COMMISSIONS SAVED</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#15803d" }}>
              {formatINR(totalMiddlemanCutSaved)}
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#0369a1", flexShrink: 0 }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>BROKER FEE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0369a1" }}>
              0% (Direct Farmer Payout)
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#b45309", flexShrink: 0 }}>
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>DIRECT TRADE MODES</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#b45309" }}>
              Test Drive • Call • WhatsApp • Buy
            </div>
          </div>
        </div>
      </div>

      {/* 4. Search & Filters Container */}
      <div className="search-filter-box" style={{ marginBottom: "18px", padding: "16px" }}>
        {/* Search Bar */}
        <div className="search-input-group" style={{ marginBottom: "12px" }}>
          <Search size={18} color="#15803d" />
          <input
            type="text"
            placeholder="Search items (e.g. Mahindra Tractor, Rotavator, Tyres, Battery, Borewell Pump, Wheat, Ghee)..."
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
                fontSize: "0.9rem"
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Chips with Emojis & Counts */}
        <div className="category-chips" style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "thin" }}>
          {categories.map((cat) => {
            const count =
              cat.id === "All"
                ? listings.length
                : listings.filter((l) => l.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`chip-btn ${isSelected ? "active" : ""}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  whiteSpace: "nowrap",
                  padding: "6px 12px",
                  fontSize: "0.75rem"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    opacity: isSelected ? 0.9 : 0.65,
                    background: isSelected ? "rgba(255,255,255,0.25)" : "#f1f5f9",
                    padding: "1px 6px",
                    borderRadius: "9999px"
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Location Radius, Farmer & Sort Row */}
        <div
          className="filter-controls-row"
          style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >
          {/* Distance Slider */}
          <div className="distance-slider-box" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={15} color="#15803d" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Radius:</span>
            <input
              type="range"
              min="10"
              max="2000"
              step="50"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              style={{ width: "110px", accentColor: "#16a34a" }}
            />
            <span style={{ minWidth: "55px", fontWeight: 700, color: "#15803d", fontSize: "0.75rem" }}>
              {maxDistanceKm} km
            </span>
          </div>

          {/* Farmer & Sort Dropdowns */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <User size={13} color="#64748b" />
              <select
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
                className="form-select"
                style={{ padding: "4px 8px", fontSize: "0.72rem", width: "auto" }}
                title="Filter by Farmer"
              >
                <option value="All">All Growers & Sellers ({farmerOptions.length})</option>
                {farmerOptions.map((f) => {
                  const count = listings.filter((l) => l.farmerId === f.id).length;
                  return (
                    <option key={f.id} value={f.id}>
                      {f.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <ArrowUpDown size={13} color="#64748b" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: "4px 8px", fontSize: "0.72rem", width: "auto" }}
              >
                <option value="nearest">Nearest Distance</option>
                <option value="savings">Highest Broker Savings</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="quantity">Largest Stock Quantity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Produce Listings Grid Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <h2 style={{ fontSize: "1.1rem", fontFamily: "var(--font-heading)", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Available Farm & Machinery Items ({filteredListings.length})
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleSellClick}
            className="btn-primary"
            style={{ padding: "7px 14px", fontSize: "0.78rem", fontWeight: 700 }}
          >
            + Sell Any Item
          </button>
        </div>
      </div>

      {/* 6. Empty State */}
      {filteredListings.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "40px 20px",
            borderRadius: "18px",
            textAlign: "center",
            border: "1px dashed #cbd5e1"
          }}
        >
          <p style={{ fontSize: "2.5rem", margin: "0 0 8px 0" }}>🚜</p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 6px 0" }}>
            No items found matching your search
          </h3>
          <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 16px 0" }}>
            Expand your distance radius or search for other items like Tractors, Tyres, or Grains.
          </p>
          <button
            onClick={() => {
              setMaxDistanceKm(2000);
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedFarmer("All");
            }}
            className="btn-outline"
            style={{ margin: "0 auto", fontSize: "0.8rem", padding: "8px 16px" }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* 7. Product & Machinery Cards Grid */
        <div className="crops-grid">
          {filteredListings.map((crop) => {
            const isOwner = crop.farmerId === currentUser.id;
            const extraFarmerGain = (crop.expectedPrice || 0) - (crop.mandiReferencePrice || 0);
            const isMachinery =
              crop.category === "Secondhand Tractors" ||
              crop.category === "Machinery & Implements" ||
              crop.category === "Spare Parts & Components" ||
              crop.category === "Irrigation & Solar Pumps" ||
              crop.itemType === "machinery" ||
              crop.itemType === "sparepart";

            return (
              <div
                key={crop.id}
                className="crop-card"
                onClick={() => setSelectedCropForDetails(crop)}
                style={{ cursor: "pointer" }}
                title="Click to view full item specifications"
              >
                {/* Photo & Badges */}
                <div className="crop-card-image-wrapper">
                  <img
                    src={crop.image}
                    alt={crop.cropName}
                    className="crop-card-image"
                    loading="lazy"
                  />
                  <span className="crop-grade-tag">
                    <Sparkles size={11} color="#f59e0b" />
                    {crop.grade || "Grade A"}
                  </span>
                  <span className="crop-distance-badge">
                    <MapPin size={11} />
                    {crop.distanceKm} km away
                  </span>
                  {crop.modelYear && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(15, 23, 42, 0.8)",
                        color: "#fff",
                        fontSize: "0.68rem",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        backdropFilter: "blur(4px)"
                      }}
                    >
                      {crop.modelYear}
                    </span>
                  )}
                </div>

                <div className="crop-card-body">
                  {/* Title & Trust Rating */}
                  <div className="crop-title-row">
                    <div style={{ flex: 1, minWidth: 0, paddingRight: "6px" }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase" }}>
                        {crop.category}
                      </span>
                      <h3 className="crop-name" style={{ fontSize: "0.98rem" }}>{crop.cropName}</h3>
                      <div className="crop-location">
                        <MapPin size={11} color="#64748b" />
                        {crop.location}
                      </div>
                    </div>

                    <div className="farmer-reputation-pill" style={{ flexShrink: 0 }}>
                      ⭐ {crop.farmerRating || 4.9}
                      {crop.farmerVerified && (
                        <ShieldCheck size={13} color="#059669" title="Verified Direct Farmer" />
                      )}
                    </div>
                  </div>

                  {/* Secondhand Condition / Hours Highlight */}
                  {(crop.condition || crop.hoursRun) && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "4px 0 6px 0" }}>
                      {crop.condition && (
                        <span style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                          🛠️ {crop.condition}
                        </span>
                      )}
                      {crop.hoursRun && (
                        <span style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>
                          ⏱️ {crop.hoursRun}
                        </span>
                      )}
                    </div>
                  )}

                  <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: "1.4", margin: "4px 0 10px 0" }}>
                    {crop.description}
                  </p>

                  {/* Price Comparison Box */}
                  <div className="price-comparison-box">
                    <div className="price-col">
                      <span className="price-col-label">Direct Farmer Price</span>
                      <span className="price-col-val farmer-price">
                        ₹{Number(crop.expectedPrice).toLocaleString()}
                        <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                          {crop.unit === "Unit" || crop.unit === "Pair" ? `/${crop.unit}` : `/${crop.unit || "kg"}`}
                        </span>
                      </span>
                    </div>

                    <div className="price-col">
                      <span className="price-col-label">{isMachinery ? "Dealer Benchmark" : "Mandi Rate"}</span>
                      <span className="price-col-val mandi-ref">
                        ₹{Number(crop.mandiReferencePrice || Math.round(crop.expectedPrice * 0.8)).toLocaleString()}
                        <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                          {crop.unit === "Unit" || crop.unit === "Pair" ? `/${crop.unit}` : `/${crop.unit || "kg"}`}
                        </span>
                      </span>
                    </div>

                    <div className="middleman-savings-tag">
                      <TrendingUp size={13} />
                      {isMachinery ? (
                        <span>Dealer commission cut of <strong>₹{Math.abs(extraFarmerGain).toLocaleString()}</strong> avoided!</span>
                      ) : (
                        <span>Farmer keeps +₹{Math.abs(extraFarmerGain)}/{crop.unit || "kg"} extra (0% broker fee)</span>
                      )}
                    </div>
                  </div>

                  {/* Stock & Paperwork Metadata */}
                  <div className="crop-meta-chips">
                    <span className="crop-meta-chip">
                      <Scale size={11} style={{ display: "inline", marginRight: "3px" }} />
                      Stock: {(crop.quantity || 1).toLocaleString()} {crop.unit || "Unit"}
                    </span>
                    {crop.paperwork ? (
                      <span className="crop-meta-chip" style={{ color: "#0369a1", background: "#f0f9ff" }}>
                        📄 {crop.paperwork.split(",")[0]}
                      </span>
                    ) : (
                      <span className="crop-meta-chip">
                        <Calendar size={11} style={{ display: "inline", marginRight: "3px" }} />
                        {crop.harvestDate}
                      </span>
                    )}
                  </div>

                  {/* Direct Contact Snippet & Grower Name */}
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
                    <span>Seller: <strong style={{ color: "#0f172a" }}>{crop.farmerName}</strong></span>
                    {isOwner ? (
                      <span style={{ color: "#15803d", fontWeight: 700 }}>Your Listing</span>
                    ) : (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <a
                          href={`tel:+919823456789`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#15803d", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          <Phone size={11} /> Call
                        </a>
                        <span>•</span>
                        <a
                          href={`https://wa.me/919823456789?text=${encodeURIComponent(`Hi ${crop.farmerName}, I am interested in ${crop.cropName} on KisanDirect.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#16a34a", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          💬 WhatsApp
                        </a>
                      </div>
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
                          style={{ fontSize: "0.78rem", padding: "8px 12px", flex: 1 }}
                        >
                          Edit Details & Price
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
                          onClick={() => directInstantBuy(crop, crop.minOrderQuantity || 1)}
                          className="btn-primary"
                          style={{
                            fontSize: "0.78rem",
                            padding: "8px 10px",
                            flex: 1,
                            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                            boxShadow: "0 2px 8px rgba(22, 163, 74, 0.25)"
                          }}
                        >
                          {isMachinery ? "⚡ Direct Book" : "⚡ Direct Buy"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCropForOffer(crop)}
                          className="btn-outline"
                          style={{ fontSize: "0.78rem", padding: "8px 10px", flex: 1 }}
                        >
                          <MessageSquareShare size={13} /> {isMachinery ? "Offer / Inspect" : "Offer"}
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
