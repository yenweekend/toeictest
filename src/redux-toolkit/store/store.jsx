import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import authSlice from "../slices/auth.slice";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
  ...persistConfig,
  key: "auth",
  storage: storage,
};
const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
const store = configureStore({
  reducer: {
    account: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});
const persistor = persistStore(store);
export { store, persistor };
