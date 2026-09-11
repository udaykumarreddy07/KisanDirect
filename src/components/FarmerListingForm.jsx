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
  ArrowLeft,
  TrendingUp,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Truck,
  PhoneCall,
  MessageCircle,
  Zap,
  HelpCircle
} from "lucide-react";

export default function FarmerListingForm() {
  const { currentUser, addProduceListing, setActiveTab, switchUser } = useApp();

  const [formData, setFormData] = useState({
    cropName: "",
    category: "Vegetables",
    quantity: "",
    minOrderQuantity: "25",
    unit: "kg",
    grade: "Grade A (Standard)",
    expectedPrice: "",
    mandiReferencePrice: "",
    harvestDate: new Date().toISOString().split("T")[0],
    shelfLifeDays: "15",
    location: currentUser.location || "Nashik Rural, Maharashtra",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: "",
    deliveryOption: "farm_pickup", // farm_pickup | farmer_delivery | courier
    allowCalls: true,
    allowWhatsApp: true,
    instantBuyEnabled: true
  });

  const [customImageLoading, setCustomImageLoading] = useState(false);

  // 1-Click Quick Templates for Selling ANY Farm Product
  const QUICK_TEMPLATES = [
    {
      label: "🥛 A2 Desi Cow Ghee",
      cropName: "Pure Bilona Vedic A2 Desi Gir Cow Ghee",
      category: "Dairy & Poultry",
      unit: "kg",
      grade: "Grade A+ (Traditional Wooden Churned Bilona)",
      expectedPrice: 1450,
      mandiPrice: 950,
      quantity: 150,
      minOrder: 2,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop&q=80",
      description: "Authentic golden Bilona ghee prepared from free-grazing indigenous Gir cows curd. Hand-churned with bi-directional wooden bilona, rich nutty aroma."
    },
    {
      label: "🍯 Raw Forest Honey",
      cropName: "Raw Wild Multi-Flora Forest Honey",
      category: "Oils & Honey",
      unit: "kg",
      grade: "Grade A+ (100% Unprocessed Cold-Extracted)",
      expectedPrice: 650,
      mandiPrice: 420,
      quantity: 300,
      minOrder: 5,
      shelfLife: 730,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
      description: "Single-origin raw multifloral forest honey harvested near medicinal mountain reserves. Unfiltered, unheated, zero synthetic sugar syrup."
    },
    {
      label: "🫒 Mustard Oil (Kolhu)",
      cropName: "Wood-Pressed Virgin Kachi Ghani Mustard Oil",
      category: "Oils & Honey",
      unit: "Litre",
      grade: "Grade A (Kolhu Cold-Pressed Below 40°C)",
      expectedPrice: 195,
      mandiPrice: 135,
      quantity: 500,
      minOrder: 10,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
      description: "Slow wooden-pressed raw mustard oil without chemical deodorizers. Rich pungent aroma and natural essential micro-nutrients intact."
    },
    {
      label: "🍬 Desi Sugarcane Gur",
      cropName: "Organic Chemical-Free Sugarcane Jaggery (Desi Gur)",
      category: "Oils & Honey",
      unit: "kg",
      grade: "Grade A (Natural Bhindi-Clarified Dark Brown)",
      expectedPrice: 75,
      mandiPrice: 48,
      quantity: 800,
      minOrder: 20,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
      description: "Natural sugarcane jaggery clarified solely with organic wild okra mucilage. Free from chemical bleaches, high iron and mineral content."
    },
    {
      label: "🧅 Red Hybrid Onions",
      cropName: "Nashik Red Hybrid Export Onions (55mm+)",
      category: "Vegetables",
      unit: "kg",
      grade: "Grade A (Export Grade 55mm+)",
      expectedPrice: 25,
      mandiPrice: 18,
      quantity: 1500,
      minOrder: 50,
      shelfLife: 45,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      description: "Sun-cured deep crimson onions with thick outer tunics. Machine-graded 55mm+ diameter, perfect for long transit and bulk storage."
    },
    {
      label: "🍅 Fresh Vine Tomatoes",
      cropName: "Fresh Hybrid Vine Red Tomatoes",
      category: "Vegetables",
      unit: "kg",
      grade: "Grade A (Firm & Glossy 4-Lobe)",
      expectedPrice: 26,
      mandiPrice: 19,
      quantity: 1000,
      minOrder: 25,
      shelfLife: 12,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      description: "Firm, thick-walled hybrid tomatoes picked at breaker stage for extended transit. High brix sweetness with vibrant red pulp."
    },
    {
      label: "🌾 Sharbati Wheat",
      cropName: "Sharbati Golden Whole Wheat Grain (Bhal)",
      category: "Grains",
      unit: "kg",
      grade: "Grade A+ (Heavy Lustrous Golden Grain)",
      expectedPrice: 44,
      mandiPrice: 32,
      quantity: 2500,
      minOrder: 100,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
      description: "Naturally sweet Sharbati wheat grown in organic black loams. Soft chapati dough consistency, high gluten quality, zero chemical polishing."
    },
    {
      label: "🌶️ Guntur Teja Chillies",
      cropName: "Export Grade Guntur S17 Teja Dry Red Chillies",
      category: "Spices",
      unit: "kg",
      grade: "Grade A+ (Extra Hot 75000+ SHU Stemless)",
      expectedPrice: 220,
      mandiPrice: 160,
      quantity: 900,
      minOrder: 20,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
      description: "Sun-dried bright scarlet stemless chillies with intense capsaicin heat. Direct farm batch with lab certified moisture below 10%."
    },
    {
      label: "🪱 Pure Vermicompost",
      cropName: "Pure Earthworm Vermicompost Bio-Fertilizer",
      category: "Seeds & Bio-Inputs",
      unit: "kg",
      grade: "Grade A (100% Granular Black Gold)",
      expectedPrice: 16,
      mandiPrice: 9,
      quantity: 3000,
      minOrder: 50,
      shelfLife: 365,
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
      description: "Odorless, highly microbial earthworm castings prepared from desi cow dung and farm crop compost. Recharges exhausted soil carbon."
    },
    {
      label: "☀️ Solar Crop Dryer",
      cropName: "Portable Solar Convection Crop & Herb Dryer",
      category: "Farm Tools & Equipment",
      unit: "Unit",
      grade: "Commercial Grade (Polycarbonate 50kg)",
      expectedPrice: 14800,
      mandiPrice: 10500,
      quantity: 10,
      minOrder: 1,
      shelfLife: 3650,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
      description: "Farmer-fabricated solar greenhouse tunnel with 12V solar exhaust. Dries chillies, turmeric, fruits, and grains 3x faster without soot or dust."
    }
  ];

  // Photo Presets
  const PHOTO_PRESETS = [
    { name: "Vine Tomatoes", url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80" },
    { name: "Red Onions", url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80" },
    { name: "A2 Desi Ghee", url: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop&q=80" },
    { name: "Raw Honey", url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80" },
    { name: "Mustard Oil", url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80" },
    { name: "Golden Wheat", url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80" },
    { name: "Basmati Paddy", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80" },
    { name: "Devgad Mangoes", url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80" },
    { name: "Desi Potatoes", url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80" },
    { name: "Green Peppers", url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80" },
    { name: "Bio Fertilizer", url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80" },
    { name: "Solar Dryer", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80" }
  ];

  const CATEGORIES = [
    { label: "Vegetables", icon: "🥬" },
    { label: "Fruits", icon: "🍎" },
    { label: "Grains", icon: "🌾" },
    { label: "Pulses", icon: "🫘" },
    { label: "Spices", icon: "🌶️" },
    { label: "Dairy & Poultry", icon: "🥛" },
    { label: "Oils & Honey", icon: "🍯" },
    { label: "Seeds & Bio-Inputs", icon: "🌿" },
    { label: "Farm Tools & Equipment", icon: "🚜" }
  ];

  const handleApplyTemplate = (tpl) => {
    setFormData((prev) => ({
      ...prev,
      cropName: tpl.cropName,
      category: tpl.category,
      unit: tpl.unit,
      grade: tpl.grade,
      expectedPrice: tpl.expectedPrice.toString(),
      mandiReferencePrice: tpl.mandiPrice.toString(),
      quantity: tpl.quantity.toString(),
      minOrderQuantity: tpl.minOrder.toString(),
      shelfLifeDays: tpl.shelfLife.toString(),
      image: tpl.image,
      description: tpl.description
    }));
  };

  const handlePriceChange = (priceVal) => {
    const val = Number(priceVal);
    // Mandi benchmark rate typically 25% lower due to broker fee
    const suggestedMandi = val > 0 ? Math.round(val * 0.74) : "";
    setFormData((prev) => ({
      ...prev,
      expectedPrice: priceVal,
      mandiReferencePrice: prev.mandiReferencePrice || suggestedMandi
    }));
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomImageLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
      }
      setCustomImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.expectedPrice) {
      alert("Please fill in the product name, available quantity, and direct expected price.");
      return;
    }

    addProduceListing({
      ...formData,
      mandiReferencePrice: formData.mandiReferencePrice || Math.round(Number(formData.expectedPrice) * 0.75)
    });
  };

  // Live Zero-Middleman Profit Calculation
  const expPriceNum = Number(formData.expectedPrice) || 0;
  const mandiPriceNum = Number(formData.mandiReferencePrice) || Math.round(expPriceNum * 0.74);
  const qtyNum = Number(formData.quantity) || 0;
  const extraPerUnit = Math.max(0, expPriceNum - mandiPriceNum);
  const totalExtraIncome = extraPerUnit * qtyNum;
  const percentageGain = mandiPriceNum > 0 ? Math.round((extraPerUnit / mandiPriceNum) * 100) : 35;

  return (
    <div className="farmer-listing-page" style={{ maxWidth: "860px", margin: "0 auto" }}>
      {/* Top Banner & Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setActiveTab("marketplace")}
            className="btn-outline"
            style={{ padding: "8px 12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            title="Return to Marketplace"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "1.35rem", fontFamily: "var(--font-heading)", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Direct Farm Seller Portal
              </h1>
              <span className="badge-pill green" style={{ fontSize: "0.68rem" }}>
                🚫 ZERO MIDDLEMEN
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "3px 0 0 0" }}>
              Sell any farm crop, dairy, oil, honey, seeds, or equipment directly to buyers without intermediaries
            </p>
          </div>
        </div>

        {/* Persona Switch Alert if viewing as non-farmer */}
        {currentUser.role !== "farmer" && (
          <div style={{ background: "#fef3c7", border: "1px solid #fde68a", padding: "6px 12px", borderRadius: "8px", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>⚠️ You are signed in as <strong>{currentUser.name} ({currentUser.role})</strong>.</span>
            <button
              type="button"
              onClick={() => switchUser("farmer_ramesh")}
              style={{ background: "#d97706", color: "#fff", border: "none", padding: "3px 8px", borderRadius: "4px", cursor: "pointer", fontWeight: 700 }}
            >
              Switch to Farmer Mode
            </button>
          </div>
        )}
      </div>

      {/* 1-Click Fast Fill Templates Bar */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: "18px", background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)", borderColor: "#86efac" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 700, color: "#166534" }}>
            <Zap size={16} color="#16a34a" /> 1-Click Auto-Fill Templates for Farmers:
          </div>
          <span style={{ fontSize: "0.72rem", color: "#15803d", fontWeight: 600 }}>Tap any item to auto-populate form</span>
        </div>

        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "thin" }}>
          {QUICK_TEMPLATES.map((tpl) => (
            <button
              key={tpl.label}
              type="button"
              onClick={() => handleApplyTemplate(tpl)}
              style={{
                flex: "0 0 auto",
                padding: "7px 12px",
                borderRadius: "20px",
                border: "1.5px solid #bbf7d0",
                background: formData.cropName === tpl.cropName ? "#16a34a" : "#ffffff",
                color: formData.cropName === tpl.cropName ? "#ffffff" : "#166534",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                transition: "all 0.15s ease"
              }}
            >
              <span>{tpl.label}</span>
              <span style={{ opacity: 0.85, fontSize: "0.7rem" }}>₹{tpl.expectedPrice}/{tpl.unit}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Listing Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
        }}
      >
        {/* Zero Middleman Guarantee Highlight */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <strong style={{ color: "#166534", fontSize: "0.9rem", display: "block" }}>
              Direct Farmer Price Autonomy: 0% Platform Commission
            </strong>
            <span style={{ fontSize: "0.76rem", color: "#15803d" }}>
              You dictate your selling price. Every single rupee paid by buyers is deposited directly into your bank or UPI account.
            </span>
          </div>
        </div>

        {/* 1. Category Selection Chips */}
        <div className="form-group" style={{ marginBottom: "18px" }}>
          <label className="form-label" style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
            Select Product Category *
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
            {CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.label })}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #16a34a" : "1px solid #e2e8f0",
                    background: isSelected ? "#f0fdf4" : "#f8fafc",
                    color: isSelected ? "#15803d" : "#475569",
                    fontWeight: isSelected ? 800 : 500,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textAlign: "left",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Product Name */}
        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label className="form-label" style={{ fontWeight: 700 }}>
            <Sprout size={15} color="#15803d" /> Product / Crop Name *
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Pure Bilona A2 Desi Cow Ghee, Sharbati Wheat, or Nashik Onions"
            value={formData.cropName}
            onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
            required
            style={{ fontSize: "0.95rem", padding: "10px 14px", fontWeight: 600 }}
          />
        </div>

        {/* 3. Unit, Grade & Quality */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Selling Unit *</label>
            <select
              className="form-select"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              style={{ fontWeight: 600 }}
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="Quintal">Quintal (100 kg)</option>
              <option value="Litre">Litre (L)</option>
              <option value="Box">Box / Crate</option>
              <option value="Dozen">Dozen</option>
              <option value="Kit">Kit / Package</option>
              <option value="Unit">Individual Unit / Piece</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Quality Standard / Grade</label>
            <select
              className="form-select"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              style={{ fontWeight: 600 }}
            >
              <option value="Grade A+ (Export Quality)">Grade A+ (Export Quality)</option>
              <option value="Grade A (Standard)">Grade A (Standard High Quality)</option>
              <option value="Certified Organic">Certified Organic / Vedic Natural</option>
              <option value="Grade B (Processing Grade)">Grade B (Processing / Bulk Grade)</option>
              <option value="Commercial Grade">Commercial / Farm Equipment Grade</option>
            </select>
          </div>
        </div>

        {/* 4. Stock Quantity & Min Order */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <Scale size={15} color="#15803d" /> Total Stock Available ({formData.unit}) *
            </label>
            <input
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 1000"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              style={{ fontWeight: 600 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              Min. Order Quantity ({formData.unit}) *
            </label>
            <input
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 20"
              value={formData.minOrderQuantity}
              onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
              required
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* 5. Pricing & Mandi Benchmark with Live Profit Visualizer */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "14px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: "#15803d" }}>
              <DollarSign size={15} color="#15803d" /> Your Direct Expected Price (₹/{formData.unit}) *
            </label>
            <input
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 25"
              value={formData.expectedPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              required
              style={{ fontSize: "1.1rem", fontWeight: 800, borderColor: "#16a34a", color: "#15803d" }}
            />
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Direct price you receive from buyer</span>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: "#64748b" }}>
              Mandi Broker Benchmark (₹/{formData.unit})
            </label>
            <input
              type="number"
              min="0"
              className="form-input"
              placeholder="e.g. 18"
              value={formData.mandiReferencePrice}
              onChange={(e) => setFormData({ ...formData, mandiReferencePrice: e.target.value })}
              style={{ fontWeight: 600 }}
            />
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>What traditional middlemen offer at mandi</span>
          </div>
        </div>

        {/* Realtime Zero-Middleman Profit Card */}
        {expPriceNum > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "2px solid #86efac",
              borderRadius: "14px",
              padding: "16px",
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#166534", fontWeight: 800, fontSize: "0.95rem" }}>
                <TrendingUp size={18} color="#16a34a" /> Your Zero-Middleman Profit Advantage:
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#15803d" }}>
                You earn <strong>+₹{extraPerUnit}/{formData.unit}</strong> ({percentageGain}% higher) compared to selling to a mandi broker!
              </p>
              {qtyNum > 0 && (
                <div style={{ marginTop: "6px", fontSize: "0.85rem", color: "#065f46" }}>
                  Total Extra Money Saved for You: <strong>₹{totalExtraIncome.toLocaleString("en-IN")}</strong> on this entire {qtyNum.toLocaleString()} {formData.unit} stock!
                </div>
              )}
            </div>
            <div style={{ textAlign: "right", background: "#ffffff", padding: "8px 14px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>100% Direct Payout</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#15803d" }}>
                ₹{(expPriceNum * (qtyNum || 1)).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}

        {/* 6. Harvest Date & Shelf Life */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <Calendar size={15} color="#15803d" /> Harvest / Production Date
            </label>
            <input
              type="date"
              className="form-input"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
              style={{ fontWeight: 600 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Shelf Life / Usability (Days)</label>
            <input
              type="number"
              min="1"
              className="form-input"
              value={formData.shelfLifeDays}
              onChange={(e) => setFormData({ ...formData, shelfLifeDays: e.target.value })}
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* 7. Location & Delivery Option */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <MapPin size={15} color="#15803d" /> Farm / Pickup Location *
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              style={{ fontWeight: 600 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <Truck size={15} color="#15803d" /> Delivery & Handover Mode
            </label>
            <select
              className="form-select"
              value={formData.deliveryOption}
              onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
              style={{ fontWeight: 600 }}
            >
              <option value="farm_pickup">🚜 Farm Gate Pickup (Buyer Collects)</option>
              <option value="farmer_delivery">🚚 Direct Farmer Delivery (Tempo / Truck)</option>
              <option value="courier">📦 Courier / Transport Parcel (Ghee, Honey, Seeds, Spices)</option>
            </select>
          </div>
        </div>

        {/* 8. Direct Buyer Contact & Fast Buy Switches */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "18px" }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#334155", marginBottom: "8px" }}>
            Direct Buyer Connect Preferences (No Middlemen Filter):
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#475569", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.allowCalls}
                onChange={(e) => setFormData({ ...formData, allowCalls: e.target.checked })}
              />
              <PhoneCall size={14} color="#15803d" /> Allow Direct Phone Calls from Buyers
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#475569", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.allowWhatsApp}
                onChange={(e) => setFormData({ ...formData, allowWhatsApp: e.target.checked })}
              />
              <MessageCircle size={14} color="#16a34a" /> Allow Direct WhatsApp Inquiries
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#475569", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.instantBuyEnabled}
                onChange={(e) => setFormData({ ...formData, instantBuyEnabled: e.target.checked })}
              />
              <Zap size={14} color="#f59e0b" /> Enable Instant Buy Now (Instant Orders)
            </label>
          </div>
        </div>

        {/* 9. Product Photo Selector (Presets + Local Upload) */}
        <div className="form-group" style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <label className="form-label" style={{ fontWeight: 700, margin: 0 }}>
              <Camera size={15} color="#15803d" /> Product Photo (Preset or Upload Your Own) *
            </label>

            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#15803d",
                background: "#f0fdf4",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #bbf7d0",
                cursor: "pointer"
              }}
            >
              <Upload size={13} /> {customImageLoading ? "Uploading..." : "Upload from Device"}
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "8px",
              marginBottom: "10px"
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
                    height: "58px",
                    transition: "transform 0.15s ease"
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
                      background: "rgba(0,0,0,0.65)",
                      color: "#fff",
                      fontSize: "0.55rem",
                      textAlign: "center",
                      padding: "2px 0",
                      fontWeight: 600
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </div>
                  {isSelected && (
                    <div style={{ position: "absolute", top: 2, right: 2, background: "#16a34a", borderRadius: "50%", padding: "1px" }}>
                      <CheckCircle2 size={12} color="#ffffff" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Selected Image Preview */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <img
              src={formData.image}
              alt="Selected Preview"
              style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: "1px solid #cbd5e1" }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>Active Photo Preview:</span>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste custom image URL..."
                style={{ width: "100%", border: "none", background: "transparent", fontSize: "0.75rem", color: "#334155", textOverflow: "ellipsis" }}
              />
            </div>
          </div>
        </div>

        {/* 10. Description & Notes */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" style={{ fontWeight: 700 }}>
            Produce Description, Quality Notes & Certifications
          </label>
          <textarea
            className="form-textarea"
            rows="3"
            placeholder="Mention processing method (e.g. Bilona wood churned, organic certification, moisture %, crate packaging, soil details)..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ fontSize: "0.85rem", lineHeight: "1.5" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "1rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
            boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)"
          }}
        >
          <Sparkles size={18} /> Publish to Direct Marketplace (Zero Middleman)
        </button>
      </form>
    </div>
  );
}
