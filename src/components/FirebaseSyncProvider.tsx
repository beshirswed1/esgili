"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateInfo, setMenuCategories } from "@/store/slices/restaurantSlice";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import type { MenuCategory, MenuItem } from "@/types";

export function FirebaseSyncProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Listen to Landing Info
    const unsubInfo = onSnapshot(doc(db, "settings", "landing"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(updateInfo({
          name: data.name,
          slogan: data.slogan,
          description: data.description,
          phone: data.phone,
          whatsapp: data.whatsapp,
          address: data.address
        }));
      }
    });

    // 2. Listen to Categories & Menu Items and integrate them seamlessly into Redux
    const unsubCats = onSnapshot(collection(db, "categories"), (catSnap) => {
      const dbCategories: {id: string, name: string}[] = [];
      catSnap.forEach(c => dbCategories.push({ id: c.id, name: c.data().name }));

      // Fetch ALL items (no isAvailable filter) so isPopular/isNew items
      // always appear on the landing page regardless of availability status.
      const unsubItems = onSnapshot(collection(db, "menuItems"), (itemSnap) => {
        const allItems: MenuItem[] = [];
        itemSnap.forEach(d => allItems.push({ id: d.id, ...d.data() } as MenuItem));

        // For menu categories, only show AVAILABLE items
        const availableItems = allItems.filter(i => i.isAvailable);

        // Let's zip them into Redux shape (Categories -> Items)
        const menuPayload: MenuCategory[] = [];
        
        dbCategories.forEach(cat => {
          const matchingItems = availableItems.filter(i => i.category === cat.name);
          // Only add category to the shop UI if it has at least one active product
          if (matchingItems.length > 0) {
            menuPayload.push({
              id: cat.id,
              label: cat.name,
              items: matchingItems
            });
          }
        });

        // Also if there are products with a deleted/unknown category, group them into an "Other" section
        const knownCatNames = dbCategories.map(c => c.name);
        const orphanItems = availableItems.filter(i => !knownCatNames.includes(i.category));
        if (orphanItems.length > 0) {
          menuPayload.push({
            id: "other",
            label: "Diğer Lezzetler",
            items: orphanItems
          });
        }

        // Inject isPopular and isNew items (from ALL items) into the menu payload
        // so the landing page sections can find them even if they're marked unavailable
        const popularAndNewItems = allItems.filter(i => i.isPopular || i.isNew);
        popularAndNewItems.forEach(item => {
          const catEntry = menuPayload.find(c => c.label === item.category);
          if (catEntry) {
            // Already included via available items - no duplicates
            const exists = catEntry.items.find(i => i.id === item.id);
            if (!exists) catEntry.items.push(item);
          } else {
            // Category not in menu (all items unavailable), create a ghost entry for landing page use
            menuPayload.push({
              id: item.category || "featured",
              label: item.category || "Özel Ürünler",
              items: [item]
            });
          }
        });

        // Always dispatch the payload, even if empty, to reflect real-time deletions properly
        dispatch(setMenuCategories(menuPayload));
      });

      return () => unsubItems();
    });

    return () => {
      unsubInfo();
      unsubCats();
    };
  }, [dispatch]);

  // This component doesn't render anything visually, it just syncs the Cloud with the Local Redux state
  return null;
}
