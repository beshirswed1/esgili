import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { MenuSection } from "@/components/menu/MenuSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm Menü | Eşgili Restoran',
  description: 'Eşgili Restoran tam menüsü. Yöresel Gaziantep lezzetlerini, taze malzemelerle hazırlanan eşsiz yemeklerimizi inceleyin.',
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <MenuSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
