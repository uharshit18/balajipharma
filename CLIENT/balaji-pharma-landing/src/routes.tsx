import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
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
import { KishangarhCity } from './pages/KishangarhCity';
import { BeawarCity } from './pages/BeawarCity';
import { BundiCity } from './pages/BundiCity';
import CustomerSegmentPage from './pages/CustomerSegmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Compliance from './pages/Compliance';

const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/wholesale-medicines-rajasthan" element={<PageTransition><WholesaleRajasthan /></PageTransition>} />

                {/* Brand Pages */}
                <Route path="/wholesale-medicines/pharmaceutical-brands/:slug" element={<PageTransition><BrandPriceList /></PageTransition>} />


                {/* City Pages */}
                <Route path="/pharma-distributor-bhilwara" element={<PageTransition><BhilwaraCity /></PageTransition>} />
                <Route path="/pharma-distributor-jaipur" element={<PageTransition><JaipurCity /></PageTransition>} />
                <Route path="/pharma-distributor-chittorgarh" element={<PageTransition><ChittorgarhCity /></PageTransition>} />
                <Route path="/pharma-distributor-ajmer" element={<PageTransition><AjmerCity /></PageTransition>} />
                <Route path="/pharma-distributor-udaipur" element={<PageTransition><UdaipurCity /></PageTransition>} />
                <Route path="/pharma-distributor-jodhpur" element={<PageTransition><JodhpurCity /></PageTransition>} />
                <Route path="/pharma-distributor-kota" element={<PageTransition><KotaCity /></PageTransition>} />
                <Route path="/pharma-distributor-kishangarh" element={<PageTransition><KishangarhCity /></PageTransition>} />
                <Route path="/pharma-distributor-beawar" element={<PageTransition><BeawarCity /></PageTransition>} />
                <Route path="/pharma-distributor-bundi" element={<PageTransition><BundiCity /></PageTransition>} />
                <Route path="/pharma-wholesaler-:city" element={<PageTransition><CityPage /></PageTransition>} />

                {/* Customer Segment Pages */}
                <Route path="/medical-distributor/:segment" element={<PageTransition><CustomerSegmentPage /></PageTransition>} />

                {/* Info Pages */}
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/compliance" element={<PageTransition><Compliance /></PageTransition>} />
                <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
