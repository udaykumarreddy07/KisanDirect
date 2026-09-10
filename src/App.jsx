import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import WebNavbar from "./components/WebNavbar";
import WebFooter from "./components/WebFooter";
import LoginPage from "./components/LoginPage";
import DirectMarketplace from "./components/DirectMarketplace";
import FarmerListingForm from "./components/FarmerListingForm";
import NegotiationsTab from "./components/NegotiationsTab";
import OrderManagement from "./components/OrderManagement";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import OfferNegotiationModal from "./components/OfferNegotiationModal";
import ProductDetailModal from "./components/ProductDetailModal";
import PaymentModal from "./components/PaymentModal";
import RatingsModal from "./components/RatingsModal";
import NotificationDrawer from "./components/NotificationDrawer";
import { CheckCircle2, AlertCircle } from "lucide-react";

function WebPortal() {
  const { isAuthenticated, activeTab, toastMessage } = useApp();

  // If not authenticated, render dedicated Login Page
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        {toastMessage && (
          <div className="floating-toast">
            {toastMessage.type === "error" ? (
              <AlertCircle size={16} color="#ef4444" />
            ) : (
              <CheckCircle2 size={16} color="#22c55e" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="web-app-root">
      {/* Top Navigation Bar */}
      <WebNavbar />

      {/* Main Web Page Content */}
      <main className="web-main-content">
        <div className="web-container">
          {activeTab === "marketplace" && <DirectMarketplace />}
          {activeTab === "sell" && <FarmerListingForm />}
          {activeTab === "negotiations" && <NegotiationsTab />}
          {activeTab === "orders" && <OrderManagement />}
          {activeTab === "admin" && <AdminDashboard />}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </main>

      {/* Web Footer */}
      <WebFooter />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <OfferNegotiationModal />
      <PaymentModal />
      <RatingsModal />
      <NotificationDrawer />

      {/* Global Toast Feedback */}
      {toastMessage && (
        <div className="floating-toast">
          {toastMessage.type === "error" ? (
            <AlertCircle size={16} color="#ef4444" />
          ) : (
            <CheckCircle2 size={16} color="#22c55e" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <WebPortal />
    </AppProvider>
  );
}
