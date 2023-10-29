import { Metadata } from 'next'
import FAQs from './components/FAQs'
import PrivacyPolicy from './components/PrivacyPolicy'
import ExchangesAndReturns from './components/ExchangesAndReturns'
import AboutUs from './components/AboutUs'

export const metadata: Metadata = {
  title: 'TERMS & F.A.Q | UrbanAvenue®',
  description: 'Contact Page',
}

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div className="max-w-[76.875rem] mx-auto xs:px-6 px-8 flex justify-center items-center flex-col">
        <FAQs />
        <PrivacyPolicy />
        <ExchangesAndReturns />
        <AboutUs />
      </div>
    </div>
  )
}

export default About
