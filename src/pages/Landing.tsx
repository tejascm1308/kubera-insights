import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/public/Hero';
import { Features } from '@/components/public/Features';
import { HowItWorks } from '@/components/public/HowItWorks';
import { Pricing } from '@/components/public/Pricing';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
