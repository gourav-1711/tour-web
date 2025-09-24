import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offer: {},
  isAvalible: false,
  loading: false,
  error: null,
  showHeader: false,
};

const offerDetailsSlice = createSlice({
  name: "offerDetails",
  initialState,
  reducers: {
    addOffer(state, action) {
      state.offer = action.payload;
      state.isAvalible = true;
    },
    removeOffer(state) {
      state.offer = {};
      state.isAvalible = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    onCloseBanner(state) {
      state.showHeader = true;
    },
   
  },
});

export const { addOffer, removeOffer, setLoading ,onCloseBanner } = offerDetailsSlice.actions;
export default offerDetailsSlice.reducer;
