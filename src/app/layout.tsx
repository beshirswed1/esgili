import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/store/StoreProvider'
import { CartDrawer } from '@/components/CartDrawer'
import { FirebaseSyncProvider } from '@/components/FirebaseSyncProvider'

// 1. تحسين تحميل الخطوط (display: "swap") لمنع وميض النص المخفي وتسريع الأداء (Core Web Vitals)
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif',
  display: 'swap'
})

// 2. إعدادات الميتاداتا الأسطورية (SEO & Social Media)
export const metadata: Metadata = {
  metadataBase: new URL('https://esgilirestoran.com'), // 🔴 تأكد من تغييره لاحقاً إذا اختلف
  title: {
    default: 'Eşgili Restoran | Yöresel Gaziantep Lezzetleri',
    template: '%s | Eşgili Restoran'
  },
  description: "Gaziantep'in eşsiz mutfak kültürünü sofranıza taşıyoruz. Geleneksel tarifler, günlük taze malzemeler ve unutulmaz lezzetler. 4.7 yıldız, 1500+ değerlendirme.",
  keywords: ['Gaziantep restoran', 'yöresel yemekler', 'Eşgili Restoran', 'Antep mutfağı', 'kebap', 'çiğ köfte', 'ev yemekleri', 'Gaziantep yemek siparişi', 'en iyi restoran Gaziantep'],
  authors: [{ name: 'Eşgili Restoran' }],
  creator: 'Eşgili Restoran',
  publisher: 'Eşgili Restoran',

  // تحسين المظهر عند مشاركة الرابط في الواتساب، فيسبوك، انستقرام
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://esgilirestoran.com',
    siteName: 'Eşgili Restoran',
    title: 'Eşgili Restoran | Yöresel Gaziantep Lezzetleri',
    description: "Gaziantep'in eşsiz mutfak kültürünü sofranıza taşıyoruz. Geleneksel tarifler, günlük taze malzemeler.",
    images: [
      {
        url: '/yemek.png', // تم تعديله حسب طلبك
        width: 1200,
        height: 630,
        alt: 'Eşgili Restoran Gaziantep Lezzetleri',
      },
    ],
  },

  // تحسين المظهر في تويتر
  twitter: {
    card: 'summary_large_image',
    title: 'Eşgili Restoran | Yöresel Gaziantep Lezzetleri',
    description: "Gaziantep'in eşsiz mutfak kültürünü sofranıza taşıyoruz.",
    images: ['/yemek.png'], // تم تعديله حسب طلبك
  },

  // توجيه عناكب بحث جوجل
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
  }
  // 🟢 أضفت إغلاق الكائن هنا (كان مفقوداً في الكود الذي أرسلته)
}

// 3. إعدادات العرض والتجاوب للجوال (Viewport) 
// 🟢 تم فصله بالكامل ليكون صحيحاً برمجياً
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#8C2C16' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  // 4. السحر الحقيقي للـ Local SEO (Schema.org JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "EŞGİLİ RESTORAN",
    "image": "https://esgilirestoran.com/yemek.png", // تم التعديل لتطابق الصورة الجديدة
    "@id": "https://esgilirestoran.com",
    "url": "https://esgilirestoran.com",
    "telephone": "+905010001927",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gaziantep Merkez",
      "addressLocality": "Gaziantep",
      "addressRegion": "Gaziantep",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.067845003662406,
      "longitude": 37.38098456806454
    },
    "urlMap": "https://maps.google.com/maps?q=37.067845003662406,37.38098456806454&hl=tr",
    "servesCuisine": ["Gaziantep Mutfağı", "Türk Mutfağı", "Kebap"],
    "priceRange": "$$",
    "slogan": "Yöresel Gaziantep Lezzetleri",
    "description": "Gaziantep'in eşsiz mutfak kültürünü sofranıza taşıyoruz. Geleneksel tarifler, günlük taze malzemeler ve unutulmaz lezzetler."
  };

  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground flex flex-col min-h-screen">
        <StoreProvider>
          <FirebaseSyncProvider />
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  )
}