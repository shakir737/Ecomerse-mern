import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import authReducer from './state/auth/authSlice'
import productReducer from './state/products/productsSlice'
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import userReducer from "./state/user/userSlice"

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    product: productReducer,
    users: userReducer,
    [api.reducerPath]: api.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
     <App />
    
    </Provider>
  </React.StrictMode>
);
