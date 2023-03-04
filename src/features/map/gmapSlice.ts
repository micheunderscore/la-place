import { RootState } from "@/redux/gmap/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export interface GmapState {
  address: string;
  recent: string[];
  coordinates?: google.maps.LatLngLiteral;
  status: "idle" | "loading" | "failed";
}

const initialState: GmapState = {
  address: "",
  recent: [],
  coordinates: undefined,
  status: "idle",
};

export const getLatLngByAddress = createAsyncThunk(
  "gmap/geocode",
  async (address: string) => {
    const geocodes = await geocodeByAddress(address);
    const coordinates = await getLatLng(geocodes[0]);
    return { coordinates, address };
  }
);

export const gmapSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    removeRecent: (state, action: PayloadAction<string>) => {
      state.recent.splice(state.recent.indexOf(action.payload), 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLatLngByAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLatLngByAddress.fulfilled, (state, action) => {
        const { coordinates, address } = action.payload;

        if (state.recent.indexOf(address) !== -1) {
          console.log(`"${address}" already exists`);
        } else {
          state.recent.push(address);
        }
        state.status = "idle";
        state.coordinates = coordinates;
      })
      .addCase(getLatLngByAddress.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { searchAddress, removeRecent } = gmapSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default gmapSlice.reducer;
