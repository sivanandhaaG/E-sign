import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFolder: null, // Store clicked folder data
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

export const { setSelectedFolder } = folderSlice.actions;
export default folderSlice.reducer;
