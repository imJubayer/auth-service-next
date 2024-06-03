import counterReducer from "@/Redux/features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";


import { UserManagerApiSlice } from "@/modules/UserManager/Store/UserManagerApiSlice";
import { UserManagerSlice } from "@/modules/UserManager/Store/UserManagerSlice";
// import { AuthorizeManagerApiSlice } from "@/services/Authorization/Store/RolePermissionApiSlice";

export const reduxStore = configureStore({
  reducer: {
    counterReducer,
    [UserManagerApiSlice.reducerPath]: UserManagerApiSlice.reducer,
    [UserManagerSlice.name]: UserManagerSlice.reducer,
    // [AuthorizeManagerApiSlice.reducerPath]: AuthorizeManagerApiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([UserManagerApiSlice.middleware]),
});

setupListeners(reduxStore.dispatch);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
