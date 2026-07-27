export const dynamic = 'force-dynamic';

import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import TeaserSection from '@/components/sections/TeaserSection';
import MagnifySection from '@/components/sections/MagnifySection';
import JellyChartSection from '@/components/sections/JellyChartSection';
import AgendaSection from '@/components/sections/AgendaSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import GatewaySection from '@/components/sections/GatewaySection';
import ReviewSection from '@/components/sections/ReviewSection';
import MapSection from '@/components/sections/MapSection';
import PartnerSection from '@/components/sections/PartnerSection';
import MediaSection from '@/components/sections/MediaSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <main id="page-home" className="page-content active">
            <HeroSection />
            <TeaserSection />
            <MagnifySection />
            <JellyChartSection />
            <AgendaSection />
            <ComparisonSection />
            <GatewaySection />
            <ReviewSection />
            <MapSection />
            <PartnerSection />
            <MediaSection />
            <Footer style={{ scrollSnapAlign: 'end' }} />
        </main>
    );
}