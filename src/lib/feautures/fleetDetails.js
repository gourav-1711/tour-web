import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fleetDetails: [
    {
      name: "Sedan",
      value: "sedan",
      rate: "₹10 per KM",
      features: [
        "₹12 per KM",
        "300 running fix",
        "Night local ₹300 extra",
        "Day trip Extra",
        "Border tax extra",
      ],
      price: "For Local ₹2100/-",
      image: "/sedan.png",
      isLarge: false,
    },
    {
      name: "Ertiga",
      value: "ertiga",
      rate: "₹13 per KM",
      features: [
        "₹13 per KM",
        "300 running fix",
        "Night local ₹300 extra",
        "Day trip Extra",
        "Border tax extra",
      ],
      price: "For Local ₹2900/-",
      image: "/ertiga.png",
      isLarge: false,
    },
    {
      name: "Innova",
      value: "innova",
      rate: "₹15 per KM",
      features: [
        "₹15 per KM",
        "300 running fix",
        "Night local ₹300 extra",
        "Day trip Extra",
        "Border tax extra",
      ],
      price: "For Local ₹3500/-",
      image: "/innova.png",
      isLarge: false,
    },
    {
      name: "Innova Crysta",
      value: "innovaCrysta",
      rate: "₹17 per KM",
      features: [
        "₹18 per KM",
        "300 running fix",
        "Night local ₹300 extra",
        "Day trip Extra",
        "Border tax extra",
      ],
      price: "For Local ₹3600/-",
      image: "/innovacrysta.png",
      isLarge: false,
    },
    {
      name: "Tempo Traveller",
      value: "tempo",
      rate: "₹25 per KM",
      features: [
        "₹25 per KM",
        "300 running fix",
        "Night local extra",
        "Day trip Extra",
        "Border tax extra",
      ],
      price: "For Local ₹4500/-",
      image: "/tempo.png",
      isLarge: true,
    },
  ],
  policies : [
    "Night Extra ₹300",
    "Essential Supplies Free Like Water, Snacks",
    "Toll & Fuel Extra",
    "Border Tax Extra",
  ]
};

const fleetDetailsSlice = createSlice({
  name: "fleetDetails",
  initialState,
  reducers: {
    setFleetDetails: (state, action) => {
      state.fleetDetails = action.payload;
    },
  },
});

export default fleetDetailsSlice.reducer;
export const { setFleetDetails } = fleetDetailsSlice.actions;
