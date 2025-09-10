import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./feautures/counter";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});
