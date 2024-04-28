import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketsService from "./ticketsService";

const initialState = {
  data: null,
  userTickets: null,
  ticket: null,
  isLoading: false,
};

export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (page, thunkAPI) => {
    try {
      const response = await ticketsService.getAllTickets(page);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);
export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (ticketData, thunkAPI  ) => {
    const id = ticketData._id;
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await ticketsService.updateTicket(ticketData, token, id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await ticketsService.deleteTicket(id, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await ticketsService.createTicket(ticketData, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

export const getUserTickets = createAsyncThunk(
  "tickets/getUserTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await ticketsService.getUserTickets(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

export const getTicket = createAsyncThunk(
  "tickets/getTicket",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await ticketsService.getTicket(id, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllTickets.rejected, (state) => {
        state.isLoading = false;
        state.data = null;
      })
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTicket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTickets = action.payload;
      })
      .addCase(getUserTickets.rejected, (state) => {
        state.isLoading = false;
        state.userTickets = null;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state) => {
        state.isLoading = false;
        state.ticket = null;
      })
      .addCase(updateTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTicket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTicket.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ticketsSlice.reducer;
