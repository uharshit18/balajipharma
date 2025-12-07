import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WholesaleRajasthan from './pages/WholesaleRajasthan';
import BrandPriceList from './pages/BrandPriceList';
import About from './pages/About';
import Contact from './pages/Contact';
import CityPage from './pages/CityPage';
import CustomerSegmentPage from './pages/CustomerSegmentPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wholesale-medicines-rajasthan" element={<WholesaleRajasthan />} />

            {/* Brand Pages - New Silo Structure */}
            <Route path="/wholesale-medicines/pharmaceutical-brands/:slug" element={<BrandPriceList />} />
            {/* Legacy Redirect for old brand URLs if needed, or just keep both for now/redirect logic in component */}
            <Route path="/:slug" element={<BrandPriceList />} />

            {/* City Pages */}
            <Route path="/pharma-wholesaler-:city" element={<CityPage />} />

            {/* Customer Segment Pages */}
            <Route path="/customers-we-serve/:segment" element={<CustomerSegmentPage />} />

            <Route path="/about-balaji-pharma" element={<About />} />
            <Route path="/contact-wholesale-pharma" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
