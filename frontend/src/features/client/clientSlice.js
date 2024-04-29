// clientSlice.js
import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientData: { data: [] },
    clientTicket: {},
  },
  reducers: {
    setData(state, action) {
      state.clientData = action.payload;
    },
    updateObject(state, action) {
      const updatedObject = action.payload;
      const index = state.clientData.data.findIndex(
        (obj) => obj._id === updatedObject._id
      );
      if (index !== -1) {
        state.clientData.data[index] = updatedObject;
      }
    },
    deleteObject(state, action) {
      const objectId = action.payload;
      state.clientData.data = state.clientData.data.filter(
        (obj) => obj._id !== objectId
      );
    },
    addObject(state, action) {
      state.clientData.data?.push(action.payload);
    },
    setClientTicket(state, action) {
      state.clientTicket = action.payload;
    },
  },
});

export const {
  setData,
  updateObject,
  deleteObject,
  setClientTicket,
  addObject,
} = clientSlice.actions;
export default clientSlice.reducer;
