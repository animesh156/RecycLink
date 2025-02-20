import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from './pages/NotFound'
import AddWaste from './pages/AddWaste'
import MarketPlace from './pages/Marketplace'
import SellerDashboard from './pages/SellerDashBoard'
import BuyersList from './pages/BuyersList'
import ScrollToTop from './components/ScrollTotop'
import WasteImageAnalyzer from './pages/WasteAnalyzer'


import "./App.css";
import RecyclingContribution from "./pages/RecyclingContribution";
import PurchasedItems from "./pages/PurchasedItems";

const App = () => {
  return (
    <Router>
        <ScrollToTop />
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-waste" element={<AddWaste />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/recycle-insights" element={<RecyclingContribution />} />
        <Route path="/buyers-list" element={<BuyersList />} />
        <Route path="/add-waste" element={<AddWaste />} />
        <Route path="/history" element={<PurchasedItems />} />
        <Route path="/analyze" element={<WasteImageAnalyzer />} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
