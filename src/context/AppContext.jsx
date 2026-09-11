import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_USERS,
  INITIAL_LISTINGS,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from "../data/initialData";
import { generateId, generateOTP } from "../utils/helpers";
import confetti from "canvas-confetti";

const AppContext = createContext();

const STORAGE_KEYS = {
  USERS: "kisandirect_users",
  CURRENT_USER_ID: "kisandirect_current_user_id",
  LISTINGS: "kisandirect_listings",
  OFFERS: "kisandirect_offers",
  ORDERS: "kisandirect_orders",
  NOTIFICATIONS: "kisandirect_notifications",
  VIEW_MODE: "kisandirect_view_mode",
  IS_AUTHENTICATED: "kisandirect_is_authenticated"
};

export function AppProvider({ children }) {
  // 1. Users & Current Profile State
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!saved) return INITIAL_USERS;
    try {
      const parsed = JSON.parse(saved);
      const missingUsers = INITIAL_USERS.filter((u) => !parsed.some((p) => p.id === u.id));
      return [...parsed, ...missingUsers];
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved || "farmer_ramesh";
  });

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  // 2. Active Tab / Screen
  const [activeTab, setActiveTab] = useState("marketplace"); // marketplace, sell, negotiations, orders, admin, profile
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || "fluid_full";
  });

  // 3. Listings State (Step 2 & 3)
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LISTINGS);
    if (!saved) return INITIAL_LISTINGS;
    try {
      const parsed = JSON.parse(saved);
      const missingListings = INITIAL_LISTINGS.filter((item) => !parsed.some((p) => p.id === item.id));
      return [...parsed, ...missingListings];
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  // 4. Offers & Negotiation State (Step 4)
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  // 5. Orders State (Step 5 & 9)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 6. Notifications State (Step 8)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast message state for quick feedback
  const [toastMessage, setToastMessage] = useState(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
    // If not set yet, default to false so user sees the login page first
    return saved === "true";
  });

  // Active negotiation & detail modal targets
  const [selectedCropForOffer, setSelectedCropForOffer] = useState(null);
  const [selectedCropForDetails, setSelectedCropForDetails] = useState(null);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [selectedOrderForRating, setSelectedOrderForRating] = useState(null);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  // Authentication Handlers
  const login = (userId) => {
    setCurrentUserId(userId);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "true");
    const user = users.find((u) => u.id === userId);
    showToast(`Welcome back, ${user?.name || "User"}! 👋`);
    setActiveTab("marketplace");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "false");
    showToast("Signed out successfully. See you soon!", "info");
  };

  const registerUser = ({ name, role, phone, location, kisanCardNumber, businessLicense, farmSize, bio }) => {
    const newId = `${role}_${Date.now().toString(36)}`;
    const newUser = {
      id: newId,
      role: role || "farmer",
      name,
      phone: phone || "+91 98000 12345",
      location: location || "Maharashtra, India",
      coordinates: { lat: 19.9975, lng: 73.7898 },
      rating: 5.0,
      totalReviews: 1,
      isVerified: true,
      kisanCardNumber: kisanCardNumber || (role === "farmer" ? `MH-KISAN-${Math.floor(1000 + Math.random() * 9000)}` : null),
      businessLicense: businessLicense || (role === "buyer" ? `APMC-WHL-${Math.floor(1000 + Math.random() * 9000)}` : null),
      farmSize: farmSize || (role === "farmer" ? "5 Acres" : null),
      avatar:
        role === "farmer"
          ? "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80"
          : role === "buyer"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: bio || `Registered ${role} on KisanDirect transparent direct marketplace.`
    };
    setUsers((prev) => [newUser, ...prev]);
    login(newId);
    showToast(`Welcome to KisanDirect, ${name}! Your account is active. 🌾`);
  };

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
  }, [viewMode]);

  // Helper to show flash toasts
  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch role / profile
  const switchUser = (userId) => {
    setCurrentUserId(userId);
    const target = users.find((u) => u.id === userId);
    if (target) {
      showToast(`Switched perspective to ${target.name} (${target.role.toUpperCase()})`);
      if (target.role === "farmer" && activeTab === "admin") {
        setActiveTab("marketplace");
      }
    }
  };

  // Add in-app notification
  const addNotification = ({ targetUserId, title, message, type = "info", linkAction = null }) => {
    const newNotif = {
      id: generateId("notif"),
      targetUserId,
      title,
      message,
      type,
      read: false,
      timestamp: "Just now",
      linkAction
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Mark all notifications as read for current user
  const markNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.targetUserId === currentUserId ? { ...n, read: true } : n))
    );
  };

  // ============================================
  // STEP 2: FARMER PRODUCT LISTING
  // ============================================
  const addProduceListing = (newProduce) => {
    const listingId = generateId("crop");
    const item = {
      id: listingId,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerRating: currentUser.rating || 5.0,
      farmerVerified: currentUser.isVerified,
      cropName: newProduce.cropName,
      category: newProduce.category || "Vegetables",
      quantity: Number(newProduce.quantity),
      minOrderQuantity: Number(newProduce.minOrderQuantity || 10),
      unit: newProduce.unit || "kg",
      grade: newProduce.grade || "Grade A (Standard)",
      expectedPrice: Number(newProduce.expectedPrice),
      mandiReferencePrice: Number(newProduce.mandiReferencePrice || Math.round(newProduce.expectedPrice * 0.78)),
      middlemanCutEstimated: "Approx 28-35% Middleman Cut Avoided",
      harvestDate: newProduce.harvestDate || new Date().toISOString().split("T")[0],
      shelfLifeDays: Number(newProduce.shelfLifeDays || 14),
      location: newProduce.location || currentUser.location,
      coordinates: currentUser.coordinates || { lat: 19.9975, lng: 73.7898 },
      image:
        newProduce.image ||
        "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      description: newProduce.description || "Freshly harvested produce directly available for trade.",
      status: "active",
      createdAt: new Date().toISOString()
    };

    setListings((prev) => [item, ...prev]);
    showToast(`"${item.cropName}" listed on Direct Marketplace! 🚜`);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setActiveTab("marketplace");
  };

  const deleteListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    showToast("Listing removed successfully.", "info");
  };

  const updateProduceListing = (cropId, updatedFields) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === cropId) {
          const expectedPrice = Number(updatedFields.expectedPrice ?? l.expectedPrice);
          const mandiReferencePrice = Number(updatedFields.mandiReferencePrice ?? l.mandiReferencePrice);
          const marginCutSaved =
            expectedPrice > mandiReferencePrice
              ? `Approx ${Math.round(((expectedPrice - mandiReferencePrice) / mandiReferencePrice) * 100)}% Margin Kept Directly`
              : l.middlemanCutEstimated;

          const updated = {
            ...l,
            ...updatedFields,
            expectedPrice,
            mandiReferencePrice,
            quantity: Number(updatedFields.quantity ?? l.quantity),
            minOrderQuantity: Number(updatedFields.minOrderQuantity ?? l.minOrderQuantity),
            middlemanCutEstimated: marginCutSaved,
            updatedAt: new Date().toISOString()
          };

          // Also keep selectedCropForDetails in sync if open
          setSelectedCropForDetails((curr) => (curr && curr.id === cropId ? updated : curr));
          return updated;
        }
        return l;
      })
    );
    showToast("Produce details & price updated successfully! 🚜");
  };

  // ============================================
  // STEP 4: DIRECT FAIR PRICE & OFFER SYSTEM
  // ============================================
  const sendBuyerOffer = ({ crop, quantity, offeredPrice, notes }) => {
    const offerId = generateId("offer");
    const newOffer = {
      id: offerId,
      cropId: crop.id,
      cropName: crop.cropName,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerType: currentUser.role === "buyer" ? "Wholesale Buyer" : "Consumer",
      quantity: Number(quantity),
      expectedPrice: crop.expectedPrice,
      offeredPrice: Number(offeredPrice),
      counterPrice: null,
      status: "pending", // pending, countered, accepted, rejected
      notes: notes || "Ready for direct farm pickup / dispatch.",
      farmerReply: "",
      history: [
        {
          sender: currentUser.name,
          role: currentUser.role,
          price: Number(offeredPrice),
          time: new Date().toISOString(),
          note: `Initial Offer: ₹${offeredPrice}/kg for ${quantity} kg`
        }
      ],
      updatedAt: new Date().toISOString()
    };

    setOffers((prev) => [newOffer, ...prev]);

    // Send notification to farmer
    addNotification({
      targetUserId: crop.farmerId,
      title: `New Offer for ${crop.cropName}! 🌾`,
      message: `${currentUser.name} offered ₹${offeredPrice}/kg for ${quantity} kg.`,
      type: "offer",
      linkAction: "negotiations"
    });

    showToast(`Offer of ₹${offeredPrice}/kg sent directly to Farmer ${crop.farmerName}!`);
    setSelectedCropForOffer(null);
    setActiveTab("negotiations");
  };

  const counterOffer = (offerId, counterPrice, counterNote) => {
    setOffers((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          const updatedHistory = [
            ...off.history,
            {
              sender: currentUser.name,
              role: currentUser.role,
              price: Number(counterPrice),
              time: new Date().toISOString(),
              note: counterNote || `Counter-offer: ₹${counterPrice}/kg`
            }
          ];

          // Notify buyer
          addNotification({
            targetUserId: off.buyerId,
            title: `Farmer Counter-Offer for ${off.cropName} 🤝`,
            message: `${currentUser.name} counter-offered ₹${counterPrice}/kg. Review and confirm!`,
            type: "counter",
            linkAction: "negotiations"
          });

          return {
            ...off,
            counterPrice: Number(counterPrice),
            farmerReply: counterNote,
            status: "countered",
            history: updatedHistory,
            updatedAt: new Date().toISOString()
          };
        }
        return off;
      })
    );
    showToast(`Counter-offer of ₹${counterPrice}/kg submitted!`);
  };

  const rejectOffer = (offerId) => {
    setOffers((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          addNotification({
            targetUserId: currentUser.role === "farmer" ? off.buyerId : off.farmerId,
            title: `Offer Declined for ${off.cropName}`,
            message: `The price negotiation of ₹${off.offeredPrice}/kg was declined.`,
            type: "rejected",
            linkAction: "negotiations"
          });
          return { ...off, status: "rejected", updatedAt: new Date().toISOString() };
        }
        return off;
      })
    );
    showToast("Offer declined.", "info");
  };

  // Accept offer and generate Order Confirmation
  const acceptOfferAndCreateOrder = (offerId, deliveryType = "buyer_pickup", deliveryAddress = "") => {
    const targetOffer = offers.find((o) => o.id === offerId);
    if (!targetOffer) return;

    const agreedPrice = targetOffer.counterPrice || targetOffer.offeredPrice;
    const totalAmount = agreedPrice * targetOffer.quantity;
    // Estimated middleman commission saved is 30% of standard mandi transaction
    const middlemanSavedAmount = Math.round(totalAmount * 0.30);
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: orderId,
      cropId: targetOffer.cropId,
      cropName: targetOffer.cropName,
      farmerId: targetOffer.farmerId,
      farmerName: targetOffer.farmerName,
      farmerPhone: "+91 98234 56789",
      buyerId: targetOffer.buyerId,
      buyerName: targetOffer.buyerName,
      buyerPhone: "+91 91234 56780",
      quantity: targetOffer.quantity,
      unit: "kg",
      pricePerKg: agreedPrice,
      totalAmount,
      middlemanSavedAmount,
      deliveryType,
      deliveryAddress: deliveryAddress || "Farm Gate Hub, Nashik Rural",
      pickupOtp: generateOTP(),
      paymentStatus: "unpaid", // unpaid -> escrowed -> paid
      paymentRef: null,
      orderStatus: "confirmed", // offer_accepted -> confirmed -> ready_for_pickup -> completed
      createdAt: new Date().toISOString(),
      ratings: {
        farmerRated: null,
        buyerRated: null,
        feedback: null
      }
    };

    // Update offer status
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "accepted" } : o))
    );

    // Add order
    setOrders((prev) => [newOrder, ...prev]);

    // Notify both parties
    addNotification({
      targetUserId: targetOffer.buyerId,
      title: `Agreement Finalized! Order ${orderId} Created 🎉`,
      message: `Price agreed at ₹${agreedPrice}/kg. Total amount: ₹${totalAmount}. Please complete simulated payment.`,
      type: "order",
      linkAction: "orders"
    });

    addNotification({
      targetUserId: targetOffer.farmerId,
      title: `Offer Accepted for ${targetOffer.cropName}! 🎉`,
      message: `Direct sale agreed at ₹${agreedPrice}/kg for ${targetOffer.quantity} kg with ${targetOffer.buyerName}.`,
      type: "order",
      linkAction: "orders"
    });

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    showToast(`Fair Price Agreed at ₹${agreedPrice}/kg! Order created.`);
    setActiveTab("orders");
  };

  // Instant direct purchase at farmer's listed price without any mediator
  const directInstantBuy = (crop, orderQty = null, deliveryType = "delivery", deliveryAddress = "") => {
    const qty = Number(orderQty) || Number(crop.minOrderQuantity) || 10;
    const agreedPrice = Number(crop.expectedPrice);
    const totalAmount = agreedPrice * qty;
    const middlemanSavedAmount = Math.round(totalAmount * 0.32);
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: orderId,
      cropId: crop.id,
      cropName: crop.cropName,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      farmerPhone: "+91 98234 56789",
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerPhone: currentUser.phone || "+91 91234 56780",
      quantity: qty,
      unit: crop.unit || "kg",
      pricePerKg: agreedPrice,
      totalAmount,
      middlemanSavedAmount,
      deliveryType,
      deliveryAddress: deliveryAddress || `${currentUser.location || "Direct Customer Address"}`,
      pickupOtp: generateOTP(),
      paymentStatus: "unpaid",
      paymentRef: null,
      orderStatus: "confirmed",
      createdAt: new Date().toISOString(),
      ratings: {
        farmerRated: null,
        buyerRated: null,
        feedback: null
      }
    };

    setOrders((prev) => [newOrder, ...prev]);

    addNotification({
      targetUserId: crop.farmerId,
      title: `⚡ Direct Order: ${crop.cropName}!`,
      message: `${currentUser.name} purchased ${qty} ${crop.unit} at your direct listed price of ₹${agreedPrice}/${crop.unit} with 0% broker fee!`,
      type: "order",
      linkAction: "orders"
    });

    confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
    showToast(`Direct order created at ₹${agreedPrice}/${crop.unit}! Zero middleman fee.`);
    setActiveTab("orders");
    setSelectedOrderForPayment(newOrder);
    return newOrder;
  };

  // ============================================
  // STEP 7: PAYMENT SYSTEM (SIMULATED ESCROW & UPI)
  // ============================================
  const processSimulatedPayment = (orderId, paymentMethod = "UPI") => {
    const txnRef = `UPI-${paymentMethod.toUpperCase()}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          // Notify farmer of escrow protection
          addNotification({
            targetUserId: ord.farmerId,
            title: `Payment Escrowed: ₹${ord.totalAmount} Secured! 🛡️`,
            message: `Buyer ${ord.buyerName} paid via ${paymentMethod}. Funds held safely in direct escrow until pickup.`,
            type: "payment",
            linkAction: "orders"
          });

          return {
            ...ord,
            paymentStatus: "escrowed",
            paymentRef: txnRef,
            orderStatus: "ready_for_pickup"
          };
        }
        return ord;
      })
    );

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
    showToast(`Payment of ₹${orders.find((o) => o.id === orderId)?.totalAmount} secured in Escrow!`);
    setSelectedOrderForPayment(null);
  };

  // ============================================
  // STEP 5 & 9: ORDER PROGRESSION & PICKUP VERIFICATION
  // ============================================
  const markProduceReady = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          addNotification({
            targetUserId: ord.buyerId,
            title: `Produce Ready for Collection! 📦`,
            message: `${ord.cropName} is weighed and staged at farm gate. Share OTP ${ord.pickupOtp} on handover.`,
            type: "pickup",
            linkAction: "orders"
          });
          return { ...ord, orderStatus: "ready_for_pickup" };
        }
        return ord;
      })
    );
    showToast("Marked ready for buyer pickup / dispatch.");
  };

  const completeOrderWithOtp = (orderId, inputOtp) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return false;

    if (inputOtp && inputOtp.trim() !== targetOrder.pickupOtp.trim()) {
      showToast("Invalid Verification OTP. Please check with buyer.", "error");
      return false;
    }

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          // Escrow releases directly to farmer's account
          addNotification({
            targetUserId: ord.farmerId,
            title: `₹${ord.totalAmount} Disbursed to Bank Account! 💸`,
            message: `Delivery confirmed. 100% payout credited directly with ZERO middleman deduction.`,
            type: "disbursement",
            linkAction: "orders"
          });

          addNotification({
            targetUserId: ord.buyerId,
            title: `Order ${ord.id} Completed! 🌟`,
            message: `You successfully received ${ord.cropName}. Please leave a trust rating for Farmer ${ord.farmerName}.`,
            type: "complete",
            linkAction: "orders"
          });

          return {
            ...ord,
            orderStatus: "completed",
            paymentStatus: "paid"
          };
        }
        return ord;
      })
    );

    confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
    showToast(`Order Completed! ₹${targetOrder.totalAmount} disbursed directly to Farmer.`);
    return true;
  };

  // ============================================
  // STEP 10: RATINGS & FEEDBACK
  // ============================================
  const submitRating = (orderId, { stars, feedback, role }) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedRatings = {
            ...ord.ratings,
            [role === "farmer" ? "farmerRated" : "buyerRated"]: stars,
            feedback: feedback || "Smooth direct transaction with fair pricing!"
          };
          return { ...ord, ratings: updatedRatings };
        }
        return ord;
      })
    );

    showToast("Feedback submitted! Trust badges updated. ⭐");
    setSelectedOrderForRating(null);
  };

  // ============================================
  // STEP 11: ADMIN ACTIONS & IMPACT STATS
  // ============================================
  const toggleUserVerification = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isVerified: !u.isVerified } : u))
    );
    showToast("User verification status updated by Admin.");
  };

  const adminRemoveListing = (cropId) => {
    setListings((prev) => prev.filter((l) => l.id !== cropId));
    showToast("Listing removed by Platform Administrator.", "info");
  };

  // Reset all data to factory demo state
  const resetToDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUserId("farmer_ramesh");
    setListings(INITIAL_LISTINGS);
    setOffers(INITIAL_OFFERS);
    setOrders(INITIAL_ORDERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveTab("marketplace");
    showToast("Demo data successfully refreshed!");
  };

  // Calculate platform middleman savings metric
  const totalMiddlemanCutSaved = orders
    .filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "escrowed")
    .reduce((acc, curr) => acc + (curr.middlemanSavedAmount || 0), 0) + 48500; // Baseline cumulative savings

  const totalKgsTraded = orders.reduce((acc, curr) => acc + (curr.quantity || 0), 0) + 12400;

  const unreadNotifsCount = notifications.filter(
    (n) => n.targetUserId === currentUserId && !n.read
  ).length;

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        registerUser,
        users,
        currentUserId,
        currentUser,
        switchUser,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        listings,
        addProduceListing,
        updateProduceListing,
        deleteListing,
        selectedCropForDetails,
        setSelectedCropForDetails,
        offers,
        sendBuyerOffer,
        counterOffer,
        rejectOffer,
        acceptOfferAndCreateOrder,
        directInstantBuy,
        orders,
        processSimulatedPayment,
        markProduceReady,
        completeOrderWithOtp,
        submitRating,
        notifications,
        addNotification,
        markNotificationsRead,
        unreadNotifsCount,
        isNotifDrawerOpen,
        setIsNotifDrawerOpen,
        selectedCropForOffer,
        setSelectedCropForOffer,
        selectedOrderForPayment,
        setSelectedOrderForPayment,
        selectedOrderForRating,
        setSelectedOrderForRating,
        toastMessage,
        showToast,
        toggleUserVerification,
        adminRemoveListing,
        totalMiddlemanCutSaved,
        totalKgsTraded,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
