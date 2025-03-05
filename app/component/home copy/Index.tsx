import React from 'react'
import HeroSection from './sections/HeroSection'
import AboutUs from './sections/AboutUs'
import StatsSection from './sections/StatsSection'
import LogoTicker from './sections/LogoTicker'
import SectorsSec from './sections/SectorsSec'
import QualitySafety from './sections/QualitySafety'
import VisionMission from './sections/VisionMission'
import OurLocation from './sections/OurLocation'
import ContactUs from './sections/ContactUs'

const Index = () => {
  return (
    <>
    <HeroSection/>
    <AboutUs/>
    <StatsSection/>
    <LogoTicker/>
    <SectorsSec/>
    <QualitySafety/>
    <VisionMission/>
    <OurLocation/>
    <ContactUs/>
    </>
  )
}

export default Index