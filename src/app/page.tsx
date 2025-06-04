import Countdown from "@/components/Countdown";
import CoupleSection from "@/components/CoupleSection";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MapEmbed from "@/components/MapEmbed";
import RSVPForm from "@/components/RSVPForm";
import StaticCalendar from "@/components/StaticCalendar";

export default function HomePage() {
  const weddingDateTime = '2025-08-31T17:00:00';
  return (
    <main className="bg-white text-gray-800">
      <Hero />
      <CoupleSection />
      <StaticCalendar />
      <EventDetails />
      <MapEmbed />
      <Countdown weddingDate={weddingDateTime} />
      <RSVPForm />
      <Footer />
    </main>
  );
}