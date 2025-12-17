import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy Load Pages to reduce initial bundle size
const Home = React.lazy(() => import('./pages/Home'));
const WholesaleRajasthan = React.lazy(() => import('./pages/WholesaleRajasthan'));
const BrandPriceList = React.lazy(() => import('./pages/BrandPriceList'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const CityPage = React.lazy(() => import('./pages/CityPage'));

// Lazy Load City & Segment Pages
const BhilwaraCity = React.lazy(() => import('./pages/BhilwaraCity').then(module => ({ default: module.BhilwaraCity })));
const JaipurCity = React.lazy(() => import('./pages/JaipurCity').then(module => ({ default: module.JaipurCity })));
const ChittorgarhCity = React.lazy(() => import('./pages/ChittorgarhCity').then(module => ({ default: module.ChittorgarhCity })));
const AjmerCity = React.lazy(() => import('./pages/AjmerCity').then(module => ({ default: module.AjmerCity })));
const UdaipurCity = React.lazy(() => import('./pages/UdaipurCity').then(module => ({ default: module.UdaipurCity })));
const JodhpurCity = React.lazy(() => import('./pages/JodhpurCity').then(module => ({ default: module.JodhpurCity })));
const KotaCity = React.lazy(() => import('./pages/KotaCity').then(module => ({ default: module.KotaCity })));
const KishangarhCity = React.lazy(() => import('./pages/KishangarhCity').then(module => ({ default: module.KishangarhCity })));
const BeawarCity = React.lazy(() => import('./pages/BeawarCity').then(module => ({ default: module.BeawarCity })));
const BundiCity = React.lazy(() => import('./pages/BundiCity').then(module => ({ default: module.BundiCity })));

const CustomerSegmentPage = React.lazy(() => import('./pages/CustomerSegmentPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const Compliance = React.lazy(() => import('./pages/Compliance'));

const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
    );
};

export default AppRoutes;
