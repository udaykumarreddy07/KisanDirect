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
  Wrench,
  Compass,
  FileText,
  Clock,
  Car
} from "lucide-react";

export default function FarmerListingForm() {
  const { currentUser, addProduceListing, setActiveTab, switchUser } = useApp();

  const [listingType, setListingType] = useState("all"); // produce | machinery | spares | livestock

  const [formData, setFormData] = useState({
    cropName: "",
    category: "Secondhand Tractors",
    itemType: "machinery", // produce | machinery | sparepart | livestock
    condition: "Well Maintained (Single Owner)",
    modelYear: "2022",
    hoursRun: "1,200 Engine Hours",
    paperwork: "Original RC Book & Insurance Available",
    quantity: "1",
    minOrderQuantity: "1",
    unit: "Unit",
    grade: "Grade A (Tested & Working)",
    expectedPrice: "",
    mandiReferencePrice: "",
    harvestDate: new Date().toISOString().split("T")[0],
    shelfLifeDays: "3650",
    location: currentUser.location || "Nashik Rural, Maharashtra",
    image: "/images/mahindra_tractor.jpg",
    description: "",
    deliveryOption: "farm_pickup",
    allowCalls: true,
    allowWhatsApp: true,
    instantBuyEnabled: true
  });

  const [customImageLoading, setCustomImageLoading] = useState(false);

  // Quick 1-Click Templates across Produce, Secondhand Tractors, Implements, Spares, Livestock
  const QUICK_TEMPLATES = [
    // Tractors & Machinery
    {
      label: "🚜 Mahindra 575 DI Tractor",
      cropName: "Mahindra 575 DI 45HP Tractor (Pre-Owned)",
      category: "Secondhand Tractors",
      itemType: "machinery",
      condition: "Well Maintained (Single Owner)",
      modelYear: "2022",
      hoursRun: "1,420 Engine Hours",
      paperwork: "Original RC Book, Clean Papers, Valid Insurance",
      unit: "Unit",
      grade: "Grade A+ (Engine Serviced & New Tyres)",
      expectedPrice: 465000,
      mandiPrice: 515000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/mahindra_tractor.jpg",
      description: "45HP Mahindra Sarpanch tractor in pristine working condition. Dual clutch, oil immersed brakes, new BKT 13.6-28 rear tyres. 100% genuine single owner farm tractor."
    },
    {
      label: "🚜 Swaraj 744 FE Tractor",
      cropName: "Swaraj 744 FE 48HP Tractor with Power Steering",
      category: "Secondhand Tractors",
      itemType: "machinery",
      condition: "Like New (Low Hours)",
      modelYear: "2021",
      hoursRun: "1,180 Engine Hours",
      paperwork: "Clean 1st Owner RC, Maharashtra Registered",
      unit: "Unit",
      grade: "Grade A+ (Showroom Maintained)",
      expectedPrice: 490000,
      mandiPrice: 545000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/swaraj_tractor.jpg",
      description: "48 HP Swaraj tractor with smooth power steering, multi-speed reverse PTO, and dry disc brakes. Complete battery and oil service completed last week."
    },
    {
      label: "⚙️ Shaktiman 6ft Rotavator",
      cropName: "Shaktiman 6-Foot Heavy Duty Rotavator (42 Boron Blades)",
      category: "Machinery & Implements",
      itemType: "machinery",
      condition: "Refurbished (New Blades)",
      modelYear: "2023",
      hoursRun: "450 Hours Total Usage",
      paperwork: "Bill of Purchase Available, Compatible with 40-55 HP Tractors",
      unit: "Unit",
      grade: "Grade A (Heavy Multi-Speed Gearbox)",
      expectedPrice: 64000,
      mandiPrice: 82000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/rotavator.jpg",
      description: "Original Shaktiman 6-ft rotary tiller with multi-speed oil bath gearbox. 42 brand new Boron steel L-type blades. Heavy duty PTO shaft included."
    },
    {
      label: "🚜 Hydraulic Tractor Trolley",
      cropName: "Hydraulic Tipping Tractor Trolley (10-Tonne Twin Cylinder)",
      category: "Machinery & Implements",
      itemType: "machinery",
      condition: "Well Maintained (Heavy Steel Chassis)",
      modelYear: "2022",
      hoursRun: "3 Seasons Usage",
      paperwork: "Farm Custom Fabricated (Heavy Tata Steel Channel)",
      unit: "Unit",
      grade: "Commercial Grade (10-Tonne)",
      expectedPrice: 128000,
      mandiPrice: 165000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/tractor_trolley.jpg",
      description: "12x6 ft hydraulic tipping trailer with twin heavy industrial hydraulic cylinders, heavy 9.00-20 Apollo tyres, and quick-release tail drop gate."
    },
    {
      label: "🛞 Tractor Tyres Pair",
      cropName: "Pair of BKT 13.6-28 Rear Tractor Tyres (85% Tread)",
      category: "Spare Parts & Components",
      itemType: "sparepart",
      condition: "Like New (Original BKT Factory Tube Included)",
      modelYear: "2024",
      hoursRun: "300 Hours Used",
      paperwork: "Original Invoice with Warranty Slip",
      unit: "Pair",
      grade: "Grade A+ (Zero Punctures or Cuts)",
      expectedPrice: 18500,
      mandiPrice: 26000,
      quantity: 2,
      minOrder: 2,
      shelfLife: 1825,
      image: "/images/tractor_tyres.jpg",
      description: "Pair of 13.6-28 12PR heavy nylon lugged rear tractor tyres. 85%+ tread remaining, deep lugs for high traction in mud and clay."
    },
    {
      label: "🔋 12V Tractor Battery",
      cropName: "Exide Jai Kisan 12V 88Ah Heavy Duty Tractor Battery",
      category: "Spare Parts & Components",
      itemType: "sparepart",
      condition: "Refurbished / Tested Working (18-Month Warranty)",
      modelYear: "2024",
      hoursRun: "6 Months Active Farm Use",
      paperwork: "Official Warranty Slip & Purchase Receipt",
      unit: "Unit",
      grade: "Grade A (100% Cranking Tested)",
      expectedPrice: 4200,
      mandiPrice: 6500,
      quantity: 1,
      minOrder: 1,
      shelfLife: 1095,
      image: "/images/tractor_battery.jpg",
      description: "Heavy-duty vibration resistant battery built specifically for tractors and harvesters. High cold cranking amps (CCA 680), full acid levels."
    },
    {
      label: "💧 7.5 HP Borewell Pump",
      cropName: "CRI 7.5 HP 3-Phase Submersible Borewell Water Pump",
      category: "Irrigation & Solar Pumps",
      itemType: "machinery",
      condition: "Well Maintained (Copper Winding Tested)",
      modelYear: "2023",
      hoursRun: "1 Summer Season",
      paperwork: "Resistance Test Report & Control Panel Included",
      unit: "Unit",
      grade: "Commercial Grade (SS Impeller)",
      expectedPrice: 23500,
      mandiPrice: 34000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/borewell_pump.jpg",
      description: "High head 7.5 HP pump suitable for 450-650 ft borewells. 100% pure copper winding motor with stainless steel 304 jacket. Includes 60m cable."
    },
    {
      label: "🐄 Gir Cow & Calf",
      cropName: "Pure Indigenous Gir Cow with Female Calf (2nd Lactation)",
      category: "Dairy & Livestock",
      itemType: "livestock",
      condition: "Healthy & Vaccinated (Doctor Certified)",
      modelYear: "Age: 4.5 Years",
      hoursRun: "Milk: 14-16 Litres/Day",
      paperwork: "Complete Veterinary Health & Vaccination Card",
      unit: "Cow + Calf",
      grade: "Pure Vedic Gir Breed",
      expectedPrice: 58000,
      mandiPrice: 78000,
      quantity: 1,
      minOrder: 1,
      shelfLife: 3650,
      image: "/images/gir_cow.jpg",
      description: "Pedigree certified Gir cow with 3-month-old female heifer calf. Calm temperament, high A2 fat content. Complete deworming and vaccination done."
    },
    // Traditional Produce & Agro Products
    {
      label: "🥛 A2 Desi Cow Ghee",
      cropName: "Pure Bilona Vedic A2 Desi Gir Cow Ghee",
      category: "Dairy & Poultry",
      itemType: "produce",
      condition: "Fresh Farm Harvest",
      modelYear: "2026 Batch",
      hoursRun: "Freshly Made",
      paperwork: "FSSAI Natural Certification",
      unit: "kg",
      grade: "Grade A+ (Bilona Wooden Churned)",
      expectedPrice: 1450,
      mandiPrice: 950,
      quantity: 150,
      minOrder: 2,
      shelfLife: 365,
      image: "/images/a2_ghee.jpg",
      description: "Golden Bilona ghee prepared from free-grazing indigenous Gir cows milk. Churned with bi-directional wooden bilona, rich nutty aroma."
    },
    {
      label: "🧅 Red Hybrid Onions",
      cropName: "Nashik Red Hybrid Export Onions (55mm+)",
      category: "Vegetables",
      itemType: "produce",
      condition: "Fresh Farm Harvest",
      modelYear: "Current Season",
      hoursRun: "Cured 3 Days",
      paperwork: "Farm Direct Batch",
      unit: "kg",
      grade: "Grade A (Export Grade 55mm+)",
      expectedPrice: 25,
      mandiPrice: 18,
      quantity: 1500,
      minOrder: 50,
      shelfLife: 45,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      description: "Sun-cured deep crimson onions with thick outer tunics. Machine-graded 55mm+ diameter, perfect for long transit and bulk storage."
    }
  ];

  // Photo Presets
  const PHOTO_PRESETS = [
    { name: "Mahindra Tractor", url: "/images/mahindra_tractor.jpg" },
    { name: "Swaraj Tractor", url: "/images/swaraj_tractor.jpg" },
    { name: "Tractor Trolley", url: "/images/tractor_trolley.jpg" },
    { name: "Rotavator", url: "/images/rotavator.jpg" },
    { name: "Tractor Tyres", url: "/images/tractor_tyres.jpg" },
    { name: "Battery", url: "/images/tractor_battery.jpg" },
    { name: "Water Pump", url: "/images/borewell_pump.jpg" },
    { name: "Power Weeder", url: "/images/power_weeder.jpg" },
    { name: "Gir Cow", url: "/images/gir_cow.jpg" },
    { name: "A2 Ghee", url: "/images/a2_ghee.jpg" },
    { name: "Vine Tomatoes", url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80" },
    { name: "Red Onions", url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80" }
  ];

  const ALL_CATEGORIES = [
    { label: "Secondhand Tractors", icon: "🚜", type: "machinery" },
    { label: "Machinery & Implements", icon: "⚙️", type: "machinery" },
    { label: "Spare Parts & Components", icon: "🛞", type: "sparepart" },
    { label: "Irrigation & Solar Pumps", icon: "💧", type: "machinery" },
    { label: "Dairy & Livestock", icon: "🐄", type: "livestock" },
    { label: "Vegetables", icon: "🥬", type: "produce" },
    { label: "Fruits", icon: "🍎", type: "produce" },
    { label: "Grains", icon: "🌾", type: "produce" },
    { label: "Pulses", icon: "🫘", type: "produce" },
    { label: "Spices", icon: "🌶️", type: "produce" },
    { label: "Dairy & Poultry", icon: "🥛", type: "produce" },
    { label: "Oils & Honey", icon: "🍯", type: "produce" },
    { label: "Seeds & Bio-Inputs", icon: "🌿", type: "produce" },
    { label: "Farm Tools & Equipment", icon: "🛠️", type: "machinery" }
  ];

  const handleApplyTemplate = (tpl) => {
    setFormData((prev) => ({
      ...prev,
      cropName: tpl.cropName,
      category: tpl.category,
      itemType: tpl.itemType || "machinery",
      condition: tpl.condition || "Well Maintained",
      modelYear: tpl.modelYear || "2022",
      hoursRun: tpl.hoursRun || "1000 Hours",
      paperwork: tpl.paperwork || "Available",
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
    // Suggest standard broker benchmark (15-25% lower for machinery/crops)
    const suggestedMandi = val > 0 ? Math.round(val * 0.82) : "";
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
      alert("Please fill in the item name, quantity, and your direct expected selling price.");
      return;
    }

    addProduceListing({
      ...formData,
      mandiReferencePrice: formData.mandiReferencePrice || Math.round(Number(formData.expectedPrice) * 0.82)
    });
  };

  const isMachinery =
    formData.category === "Secondhand Tractors" ||
    formData.category === "Machinery & Implements" ||
    formData.category === "Spare Parts & Components" ||
    formData.category === "Irrigation & Solar Pumps" ||
    formData.category === "Dairy & Livestock" ||
    formData.itemType === "machinery" ||
    formData.itemType === "sparepart";

  const expPriceNum = Number(formData.expectedPrice) || 0;
  const mandiPriceNum = Number(formData.mandiReferencePrice) || Math.round(expPriceNum * 0.82);
  const qtyNum = Number(formData.quantity) || 1;
  const extraPerUnit = Math.max(0, expPriceNum - mandiPriceNum);
  const totalExtraIncome = extraPerUnit * qtyNum;

  return (
    <div className="farmer-listing-page" style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* Top Banner & Title */}
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
                🚫 ZERO BROKER COMMISSIONS
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "3px 0 0 0" }}>
              Sell anything: Secondhand Tractors, Implements, Spare Parts, Cattle, Irrigation Pumps, & Fresh Crops!
            </p>
          </div>
        </div>

        {/* Persona Switch Alert if viewing as non-farmer */}
        {currentUser.role !== "farmer" && (
          <div style={{ background: "#fef3c7", border: "1px solid #fde68a", padding: "6px 12px", borderRadius: "8px", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>⚠️ Viewing as <strong>{currentUser.name}</strong>.</span>
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
            <Zap size={16} color="#16a34a" /> 1-Click Auto-Fill Templates (Tractors, Spares, Implements, Produce):
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
              <span style={{ opacity: 0.85, fontSize: "0.7rem" }}>₹{Number(tpl.expectedPrice).toLocaleString()}</span>
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
        {/* Zero Dealer Cut Guarantee Highlight */}
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
              Direct Farmer Selling: Keep 100% of Your Equipment & Crop Value
            </strong>
            <span style={{ fontSize: "0.76rem", color: "#15803d" }}>
              Tractor dealers and mandi dalals typically charge ₹15,000 to ₹50,000 in broker margins. On KisanDirect, you trade directly with verified buyers for free!
            </span>
          </div>
        </div>

        {/* 1. Category Selection */}
        <div className="form-group" style={{ marginBottom: "18px" }}>
          <label className="form-label" style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
            Select What You Are Selling *
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
            {ALL_CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      category: cat.label,
                      itemType: cat.type,
                      unit: cat.type === "machinery" || cat.type === "sparepart" ? "Unit" : formData.unit
                    })
                  }
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
                  <span style={{ fontSize: "1.15rem" }}>{cat.icon}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Item Name */}
        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label className="form-label" style={{ fontWeight: 700 }}>
            {isMachinery ? <Wrench size={15} color="#15803d" /> : <Sprout size={15} color="#15803d" />}
            {isMachinery ? " Machinery / Tractor / Spare Part Name *" : " Produce / Crop Name *"}
          </label>
          <input
            type="text"
            className="form-input"
            placeholder={
              isMachinery
                ? "e.g. Mahindra 575 DI Tractor, Shaktiman 6ft Rotavator, or 13.6-28 Tyres Pair"
                : "e.g. Nashik Red Hybrid Onions, Sharbati Wheat, or A2 Desi Cow Ghee"
            }
            value={formData.cropName}
            onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
            required
            style={{ fontSize: "0.95rem", padding: "10px 14px", fontWeight: 600 }}
          />
        </div>

        {/* 3. Machinery Specific Fields: Condition, Model Year, Hours Run, Paperwork */}
        {isMachinery && (
          <div
            style={{
              background: "#f8fafc",
              border: "1.5px solid #cbd5e1",
              borderRadius: "14px",
              padding: "16px",
              marginBottom: "18px"
            }}
          >
            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e293b", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Compass size={16} color="#0284c7" /> Secondhand Machinery & Tractor Specifications:
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "12px" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Condition / Status *</label>
                <select
                  className="form-select"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  style={{ fontWeight: 600 }}
                >
                  <option value="Like New (Low Hours)">Like New (Barely Used / Low Hours)</option>
                  <option value="Well Maintained (Single Owner)">Well Maintained (Single Owner)</option>
                  <option value="Refurbished (New Parts Installed)">Refurbished (New Parts Installed)</option>
                  <option value="Good Working Condition">Good Working Condition</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Model Year / Age *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2022 or 3 Years Old"
                  value={formData.modelYear}
                  onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                  style={{ fontWeight: 600 }}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Engine Hours / Usage *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 1,420 Hours or 400 Kms"
                  value={formData.hoursRun}
                  onChange={(e) => setFormData({ ...formData, hoursRun: e.target.value })}
                  style={{ fontWeight: 600 }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: "0.78rem" }}>RC Book & Documentation Status</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Original RC Book, Punjab State Transfer, Valid Insurance, NOC Ready"
                value={formData.paperwork}
                onChange={(e) => setFormData({ ...formData, paperwork: e.target.value })}
                style={{ fontWeight: 600 }}
              />
            </div>
          </div>
        )}

        {/* 4. Unit & Quality Grade */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Selling Unit *</label>
            <select
              className="form-select"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              style={{ fontWeight: 600 }}
            >
              {isMachinery ? (
                <>
                  <option value="Unit">Unit / Piece</option>
                  <option value="Pair">Pair (e.g. Tyres)</option>
                  <option value="Set">Complete Set</option>
                  <option value="Cow + Calf">Cow + Calf</option>
                </>
              ) : (
                <>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="Quintal">Quintal (100 kg)</option>
                  <option value="Litre">Litre (L)</option>
                  <option value="Box">Box / Crate</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Kit">Kit</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Quality Grade / Certification</label>
            <select
              className="form-select"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              style={{ fontWeight: 600 }}
            >
              {isMachinery ? (
                <>
                  <option value="Grade A+ (Engine Serviced & Tested)">Grade A+ (Engine Serviced & Tested)</option>
                  <option value="Grade A (Fully Functional Working)">Grade A (Fully Functional Working)</option>
                  <option value="Commercial Heavy Duty">Commercial Heavy Duty</option>
                  <option value="OEM Genuine Original Part">OEM Genuine Original Part</option>
                </>
              ) : (
                <>
                  <option value="Grade A+ (Export Quality)">Grade A+ (Export Quality)</option>
                  <option value="Grade A (Standard High Quality)">Grade A (Standard High Quality)</option>
                  <option value="Certified Organic">Certified Organic / Vedic Natural</option>
                  <option value="Grade B (Processing Grade)">Grade B (Processing Grade)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* 5. Stock Quantity & Min Order */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <Scale size={15} color="#15803d" /> Total Stock Available ({formData.unit}) *
            </label>
            <input
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 1"
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
              placeholder="e.g. 1"
              value={formData.minOrderQuantity}
              onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
              required
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* 6. Pricing & Broker Benchmark Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "14px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: "#15803d" }}>
              <DollarSign size={15} color="#15803d" /> Your Direct Selling Price (₹/{formData.unit}) *
            </label>
            <input
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 465000"
              value={formData.expectedPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              required
              style={{ fontSize: "1.15rem", fontWeight: 800, borderColor: "#16a34a", color: "#15803d" }}
            />
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Direct price buyer pays to you (0% broker fee)</span>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: "#64748b" }}>
              Dealer / Mandi Broker Price (₹/{formData.unit})
            </label>
            <input
              type="number"
              min="0"
              className="form-input"
              placeholder="e.g. 515000"
              value={formData.mandiReferencePrice}
              onChange={(e) => setFormData({ ...formData, mandiReferencePrice: e.target.value })}
              style={{ fontWeight: 600 }}
            />
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>What dealers or mandi brokers charge</span>
          </div>
        </div>

        {/* Realtime Broker Cut Saved Banner */}
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
                <TrendingUp size={18} color="#16a34a" /> Zero Middleman Brokerage Advantage:
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#15803d" }}>
                By selling directly, you avoid broker fees of <strong>₹{extraPerUnit.toLocaleString("en-IN")}/{formData.unit}</strong>!
              </p>
              <div style={{ marginTop: "4px", fontSize: "0.82rem", color: "#065f46" }}>
                Total Direct Revenue to Your Bank: <strong>₹{(expPriceNum * qtyNum).toLocaleString("en-IN")}</strong>
              </div>
            </div>
            <div style={{ textAlign: "right", background: "#ffffff", padding: "8px 14px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Direct Settlement</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#15803d" }}>
                ₹{(expPriceNum * qtyNum).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}

        {/* 7. Location & Delivery Option */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "16px" }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>
              <MapPin size={15} color="#15803d" /> Farm / Inspection Location *
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
              <option value="farm_pickup">🚜 Farm Gate Inspection & Pickup (Buyer Collects)</option>
              <option value="farmer_delivery">🚚 Direct Farmer Drop-off (Local Transit)</option>
              <option value="courier">📦 Parcel / Transport Delivery</option>
            </select>
          </div>
        </div>

        {/* 8. Direct Buyer Contact & Instant Buy Switches */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "18px" }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#334155", marginBottom: "8px" }}>
            Direct Buyer Connect & Inspection Permissions:
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
              <MessageCircle size={14} color="#16a34a" /> Allow WhatsApp Inquiries & Video Calls
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#475569", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.instantBuyEnabled}
                onChange={(e) => setFormData({ ...formData, instantBuyEnabled: e.target.checked })}
              />
              <Zap size={14} color="#f59e0b" /> Enable Instant Direct Purchase / Booking
            </label>
          </div>
        </div>

        {/* 9. Product Photo Selector (Presets + Upload) */}
        <div className="form-group" style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <label className="form-label" style={{ fontWeight: 700, margin: 0 }}>
              <Camera size={15} color="#15803d" /> Photo (Preset or Upload from Your Phone/PC) *
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
              <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>Selected Photo Preview:</span>
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

        {/* 10. Description & Detailed Notes */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" style={{ fontWeight: 700 }}>
            Item Description, Condition Details & Included Accessories
          </label>
          <textarea
            className="form-textarea"
            rows="3"
            placeholder={
              isMachinery
                ? "Mention engine condition, tyre tread %, hydraulic functioning, service history, included attachments (trolley hook, rotavator shaft, weights)..."
                : "Mention harvesting date, sorting status, moisture %, crate packaging, organic certification..."
            }
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
          <Sparkles size={18} /> Publish Directly to Marketplace (0% Broker Fee)
        </button>
      </form>
    </div>
  );
}
