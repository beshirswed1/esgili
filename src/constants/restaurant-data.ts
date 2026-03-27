// ==========================================
// EŞGİLİ QR MENU SYSTEM - Restaurant Data (Turkish)
// ==========================================

import type { RestaurantInfo, MenuCategory, Review, Offer } from "@/types"

// ─── Reviews ────────────────────────────────────────────
export const reviews: Review[] = [
  {
    id: "1",
    name: "Hakkı Kalpak",
    rating: 5,
    text: "Ev yemekleri sunan bir restoran arıyorduk ve yerel biri burayı tavsiye etti. Hepsini denemek istedik ve garsonumuz harikaydı. Kesinlikle tavsiye ederim!",
    date: "6 ay önce",
    reviewCount: "5 yorum",
  },
  {
    id: "2",
    name: "Daniel Yavetz",
    rating: 5,
    text: "Sonunda ev yemeklerinde uzmanlaşmış bir restoran buldum. Sipariş ettiğim her şeyi çok beğendim. Birçok yöresel yemeği denemek istedim. Kesinlikle tavsiye ederim!",
    date: "5 ay önce",
    reviewCount: "55 yorum",
  },
  {
    id: "3",
    name: "Arghavan Abdolmalaki",
    rating: 5,
    text: "Bu restoran, Gaziantep'in zengin mutfak geleneğine sadık kalarak otantik yöresel yemekler sunuyor. Personel son derece güler yüzlü ve ilgiliydi, fiyatlar da oldukça makuldü.",
    date: "6 ay önce",
    reviewCount: "44 yorum",
  },
  {
    id: "4",
    name: "Mehmet Yılmaz",
    rating: 5,
    text: "Gaziantep'te yediğim en iyi beyran çorbası burada! Etler günlük ve taze. Ailece geliyoruz her hafta sonu. Fiyat performans açısından mükemmel.",
    date: "3 ay önce",
    reviewCount: "12 yorum",
  },
  {
    id: "5",
    name: "Fatma Demir",
    rating: 4,
    text: "Çiğ köfte ve içli köfte muhteşemdi. Ortam sıcak ve samimi. Tek eleştirim bekleme süresi biraz uzundu ama lezzet buna değer.",
    date: "2 ay önce",
    reviewCount: "8 yorum",
  },
  {
    id: "6",
    name: "Ali Karadağ",
    rating: 5,
    text: "Soğan kebabı ve alinazik için tekrar tekrar geliyorum. Gerçek Antep lezzeti arayanlar için birebir. Paket servis de çok hızlı.",
    date: "1 ay önce",
    reviewCount: "23 yorum",
  },
]

// ─── Offers ─────────────────────────────────────────────
export const offers: Offer[] = [
  {
    id: "1",
    title: "Aile Paketi",
    description: "4 kişilik ana yemek + çorba + içecek",
    discount: "%15 İndirim",
  },
  {
    id: "2",
    title: "Öğle Menüsü",
    description: "Çorba + Ana yemek + İçecek",
    discount: "299 ₺",
  },
  {
    id: "3",
    title: "İlk Sipariş",
    description: "İlk QR menü siparişinize özel",
    discount: "%10 İndirim",
  },
]

// ─── About Features ─────────────────────────────────────
export const aboutFeatures = [
  "Günlük taze hazırlanan yemekler",
  "Yöresel Gaziantep tarifleri",
  "Kaliteli kuzu eti ve yerel malzemeler",
  "Kadın girişimci işletmesi",
  "Sıcak ve samimi ortam",
  "Paket servis ve teslimat",
]

// ─── Navigation Links ───────────────────────────────────
export const navLinks = [
  { href: "/menu", label: "Menü" },
  { href: "/", label: "Ana Sayfa" },
]
