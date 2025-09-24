import { configureStore } from "@reduxjs/toolkit";
import fleetDetailsReducer from "./feautures/fleetDetails";
import offerDetailsReducer from "./feautures/offerDetails";

export const store = configureStore({
  reducer: {
    fleetDetails: fleetDetailsReducer,
    offerDetails: offerDetailsReducer,
  },
});
