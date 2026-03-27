"use client";

import { useAppSelector } from "@/store/hooks";
import { MenuCategory } from "./MenuCategory";

/**
 * Client Component (Real-Time).
 * Uses Redux to get the universal realtime menu synced from Firebase
 */
export function MenuSection() {
  const menu = useAppSelector((state) => state.restaurant.menu);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="firebase-menu">
      {/* تأثير خلفية بسيط لزيادة الجمالية (اختياري) */}
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none dark:bg-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* قسم العنوان (Header) */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          {/* شارة التحديث المباشر */}
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Canlı Menü
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight">
            Lezzet <span className="text-primary">Menümüz</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Özenle hazırladığımız eşsiz lezzetleri keşfedin. Siparişiniz saniyeler içinde mutfağımıza iletilir.
          </p>
        </div>

        {/* قسم عرض المنيو */}
        <div className="menu-container w-full">
          {menu.length === 0 ? (
            /* حالة التحميل (Loading State) */
            <div className="flex flex-col items-center justify-center py-24 px-4 bg-card/60 backdrop-blur-md rounded-3xl border border-border shadow-sm animate-pulse">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="text-7xl relative drop-shadow-xl transform transition-transform hover:scale-105">🍽️</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                Menü Yükleniyor...
              </h3>
              <p className="text-muted-foreground text-center max-w-md md:text-lg">
                Lütfen bekleyin, en taze lezzetler sizin için özenle hazırlanıyor.
              </p>
            </div>
          ) : (
            /* قائمة الأصناف مرتبة بمسافات ممتازة */
            <div className="flex flex-col gap-16 md:gap-24 w-full">
              {menu.map((category) => (
                <MenuCategory
                  key={category.id}
                  title={category.label}
                  items={category.items}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}