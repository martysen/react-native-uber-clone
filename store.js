import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import navReducer from "./slices/navSlice";

const store = configureStore({
  //   reducer: rootReducer,
  reducer: {
    nav: navReducer,
  },
});

export default store;
