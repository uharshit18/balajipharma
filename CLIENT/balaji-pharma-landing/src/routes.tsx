import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WholesaleRajasthan from './pages/WholesaleRajasthan';
import BrandPriceList from './pages/BrandPriceList';
import About from './pages/About';
import Contact from './pages/Contact';
import CityPage from './pages/CityPage';
import { BhilwaraCity } from './pages/BhilwaraCity';
import { JaipurCity } from './pages/JaipurCity';
import { ChittorgarhCity } from './pages/ChittorgarhCity';
import { AjmerCity } from './pages/AjmerCity';
import { UdaipurCity } from './pages/UdaipurCity';
import { JodhpurCity } from './pages/JodhpurCity';
import { KotaCity } from './pages/KotaCity';
import CustomerSegmentPage from './pages/CustomerSegmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wholesale-medicines-rajasthan" element={<WholesaleRajasthan />} />

            {/* Brand Pages */}
            <Route path="/wholesale-medicines/pharmaceutical-brands/:slug" element={<BrandPriceList />} />


            {/* City Pages */}
            <Route path="/pharma-distributor-bhilwara" element={<BhilwaraCity />} />
            <Route path="/pharma-distributor-jaipur" element={<JaipurCity />} />
            <Route path="/pharma-distributor-chittorgarh" element={<ChittorgarhCity />} />
            <Route path="/pharma-distributor-ajmer" element={<AjmerCity />} />
            <Route path="/pharma-distributor-udaipur" element={<UdaipurCity />} />
            <Route path="/pharma-distributor-jodhpur" element={<JodhpurCity />} />
            <Route path="/pharma-distributor-kota" element={<KotaCity />} />
            <Route path="/pharma-wholesaler-:city" element={<CityPage />} />

            {/* Customer Segment Pages */}
            <Route path="/customers-we-serve/:segment" element={<CustomerSegmentPage />} />

            <Route path="/about-balaji-pharma" element={<About />} />
            <Route path="/contact-wholesale-pharma" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Generic Catch-all for Brands (Low Priority) */}
            <Route path="/:slug" element={<BrandPriceList />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
