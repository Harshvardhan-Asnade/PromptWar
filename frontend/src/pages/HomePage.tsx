import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { HeroSection } from '../sections/HeroSection'
import { HealthStatusSection } from '../sections/HealthStatusSection'
import { PhilosophySection } from '../sections/PhilosophySection'

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090A0D] text-[#E5E7EB]">
      <Navbar />
      <main>
        <HeroSection />
        <HealthStatusSection />
        <PhilosophySection />
      </main>
      <Footer />
    </div>
  )
}
