import { createSlice } from "@reduxjs/toolkit";

// Set the initial state
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

// Create the navSlice to be used in store.js
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducer: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

// expose your actions such that App components can use it
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

// create selectors and export it such that App components can PULL data from the data store
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

// export navSlice to import it into ./store.js
export default navSlice.reducer;
