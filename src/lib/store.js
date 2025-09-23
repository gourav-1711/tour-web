import { configureStore } from "@reduxjs/toolkit";
import fleetDetailsReducer from "./feautures/fleetDetails";

export const store = configureStore({
  reducer: {
    fleetDetails: fleetDetailsReducer,
  },
});
