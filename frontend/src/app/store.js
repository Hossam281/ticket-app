import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketsReducer from '../features/tickets/ticketsSlice'
import clientReducer from '../features/client/clientSlice';

 const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets:ticketsReducer,
        client:clientReducer
    },
});

export default store;
