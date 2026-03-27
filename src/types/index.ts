// ==========================================
// EŞGİLİ QR MENU SYSTEM - Type Definitions
// ==========================================

export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  category: string
  image?: string
  isPopular?: boolean
  isNew?: boolean
  isAvailable?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  icon?: string
  items: MenuItem[]
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  reviewCount: string
  avatar?: string
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: string
  validUntil?: string
  image?: string
}

export interface RestaurantInfo {
  name: string
  slogan: string
  description: string
  phone: string
  whatsapp: string
  address: string
  city: string
  rating: number
  reviewCount: number
  avgPrice: string
  hours: string
  googleMapsUrl: string
  googleMapsEmbed: string
  services: string[]
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
}
