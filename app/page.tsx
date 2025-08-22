import type { Metadata } from 'next'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import OurStorySection from '@/components/OurStorySection'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import WhatWeDoSection from '@/components/WhatWeDoSection'
import BeliefsSection from '@/components/BeliefsSection'
import AnniversarySection from '@/components/AnniversarySection'
import FeaturedWorkSection from '@/components/FeaturedWorkSection'
import CredibilitySection from '@/components/CredibilitySection'
import TimelineTeaserSection from '@/components/TimelineTeaserSection'
import CommunitiesSection from '@/components/HowWeHelpSection'
import NewsletterSection from '@/components/YourNeedsSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Intense Group - A decade of growth, creativity, data & AI',
  description: 'We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.',
}

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <OurStorySection />
      <GlobalPresenceSection />
      <WhatWeDoSection />
      <BeliefsSection />
      <AnniversarySection />
      <FeaturedWorkSection />
      <CredibilitySection />
      <TimelineTeaserSection />
      <CommunitiesSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
