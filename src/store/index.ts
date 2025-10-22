import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import ticketsReducer from './slices/ticketsSlice';

/**
 * @description Configuração do Redux Persist
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tickets'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  tickets: ticketsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * @description Configuração da Redux Store com Persistência
 * Slices: auth, tickets (persistido)
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
