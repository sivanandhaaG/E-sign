import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import folderReducer from "./reducers/myFolders/folderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    folder: folderReducer,
  },
})