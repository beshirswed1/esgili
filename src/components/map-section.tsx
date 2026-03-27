"use client"

import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

const mockInfo = {
  address: "Yaprak, Kep Kep Sk. No:4 D:A, 27080 Şehitkamil/Gaziantep",
  googleMapsUrl: "https://maps.app.goo.gl/dDTzVo5iEiyeSN939",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d562.7808258556294!2d37.38126615822707!3d37.06775027127398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e1581e7ae335%3A0xe6e9b5229f1620b4!2sE%C5%9Fgili%20Restoran%20%7C%20Y%C3%B6resel%20Gaziantep%20Yemekleri!5e0!3m2!1sar!2str!4v1774388525769!5m2!1sar!2str",
  services: ["Paket Servis", "Gel Al", "Açık Havada Oturma", "Aileye Uygun", "Otopark"]
}

export function MapSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="konum" className="bg-secondary py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info Side */}
          <div className={`lg:col-span-2 flex flex-col justify-center ${visible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4 w-fit">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Konumumuz</span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Bizi Ziyaret Edin
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {mockInfo.address}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={mockInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 w-fit"
              >
                <Navigation className="h-4 w-4 transition-transform group-hover:rotate-45" />
                Yol Tarifi Al
              </a>
              <a
                href={mockInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Google Maps{"'"}te Aç
              </a>
            </div>

            {/* Services */}
            <div className="mt-8 flex flex-wrap gap-2">
              {mockInfo.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-card border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className={`lg:col-span-3 ${visible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl group">
              <iframe
                src={mockInfo.googleMapsEmbed}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Eşgili Restoran Konum"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
