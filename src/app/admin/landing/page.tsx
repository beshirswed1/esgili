"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/store/hooks"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

export default function AdminLanding() {
  const info = useAppSelector((s) => s.restaurant.info)

  const [formData, setFormData] = useState({
    name: info.name,
    slogan: info.slogan,
    description: info.description,
    phone: info.phone || "",
    whatsapp: info.whatsapp || "",
    address: info.address || ""
  })

  // Keep form data up to date when Redux state hydrates from Firebase
  useEffect(() => {
    setFormData({
      name: info.name,
      slogan: info.slogan,
      description: info.description,
      phone: info.phone || "",
      whatsapp: info.whatsapp || "",
      address: info.address || ""
    })
  }, [info]);

  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleSave = async () => {
    setSaving(true)
    try {
      // REAL DATABASE SAVE (Garantili Kayıt)
      await setDoc(doc(db, "settings", "landing"), {
        name: formData.name,
        slogan: formData.slogan,
        description: formData.description,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: formData.address
      }, { merge: true });

      showNotification('success', "Ayarlar başarıyla kaydedildi! (Ana sayfa anında güncellendi)");
    } catch (e: any) {
      console.warn("Update error:", e);
      showNotification('error', `Hata: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Custom SweetAlert-like Notification Toast - متجاوب للجوال */}
      {notification.show && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-[60] px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 animate-fade-in-up border ${notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}>
          {notification.type === 'success' ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          )}
          <span className="font-semibold text-xs sm:text-sm">{notification.message}</span>
        </div>
      )}

      {/* Header Section - متجاوب للجوال */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Ana Sayfa Düzeni</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Ana sayfada görünen mesajları, adresleri ve ayarları canlı güncelleyin.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-75 font-medium flex items-center justify-center gap-2 shadow-sm"
        >
          {saving ? (
            <><svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Kaydediliyor...</>
          ) : "Değişiklikleri Kaydet"}
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Restoran Bilgileri */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-bold font-serif mb-4 pb-2 border-b border-gray-100 text-primary">Restoran Bilgileri</h2>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Restoran Adı</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 sm:py-2.5 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Genel Slogan</label>
              <input type="text" value={formData.slogan} onChange={e => setFormData({ ...formData, slogan: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 sm:py-2.5 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Hero Açıklaması (Giriş Yazısı)</label>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm leading-relaxed resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-bold font-serif mb-4 pb-2 border-b border-gray-100 text-primary">İletişim Bilgileri</h2>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Telefon Numarası (Arama İçin)</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 sm:py-2.5 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Numarası</label>
              <input type="tel" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="Örn: 905010001927" className="w-full border border-gray-200 rounded-lg px-4 py-3 sm:py-2.5 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Açık Adres (Footer ve Harita)</label>
              <textarea rows={3} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all font-medium text-xs sm:text-sm resize-none"></textarea>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}