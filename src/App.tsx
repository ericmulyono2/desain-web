import HorizonHeroSection from "@/components/ui/horizon-hero-section";

export default function App() {
  return (
    <main className="relative w-full">
      <HorizonHeroSection />

      {/*
        TODO (kamu yang desain):
        - Tambah section "About", "Features", "Pricing", "Contact" di bawah ini.
        - Hero di atas sudah memakan ~3 layar (3 section). Konten baru taruh di bawahnya
          dengan z-index lebih tinggi atau di dalam wrapper baru agar tidak tertutup canvas.
      */}
    </main>
  );
}
