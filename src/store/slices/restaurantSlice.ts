import { createSlice } from "@reduxjs/toolkit"
import type { RestaurantInfo, MenuCategory, Review, Offer } from "@/types"
import {
  reviews,
  offers,
} from "@/constants/restaurant-data"

interface RestaurantState {
  info: RestaurantInfo
  menu: MenuCategory[]
  reviews: Review[]
  offers: Offer[]
}

const emptyInfo: RestaurantInfo = {
  name: "",
  slogan: "",
  description: "",
  phone: "",
  whatsapp: "",
  address: "",
  city: "",
  rating: 5.0,
  reviewCount: 0,
  avgPrice: "",
  hours: "",
  googleMapsUrl: "",
  googleMapsEmbed: "",
  services: [],
  socialMedia: {}
}

const initialState: RestaurantState = {
  info: emptyInfo,
  menu: [],
  reviews: reviews, // Pending admin section
  offers: offers, // Pending admin section
}

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    setMenuCategories: (state, action) => {
      state.menu = action.payload;
    }
  },
})

export const { updateInfo, setMenuCategories } = restaurantSlice.actions;
export default restaurantSlice.reducer
