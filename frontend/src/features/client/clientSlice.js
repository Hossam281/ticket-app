// clientSlice.js
import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientData: [],
    clientTicekt: {},
  },
  reducers: {
    setData(state, action) {
      state.clientData = action.payload;
    },
    updateObject(state, action) {
      const updatedObject = action.payload;
      const index = state.clientData.findIndex(obj => obj._id === updatedObject._id);
      if (index !== -1) {
        state.clientData[index] = updatedObject;
      }
    },
    deleteObject(state, action) {
      const objectId = action.payload;
      state.clientData = state.clientData.filter(obj => obj._id !== objectId);
    },
    setClientTicket(state, action) {
      state.clientTicket = action.payload;
    }
  },
});

export const { setData, updateObject, deleteObject ,setClientTicket} = clientSlice.actions;
export default clientSlice.reducer;
