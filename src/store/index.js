import {configureStore} from '@reduxjs/toolkit';
import groupsReducer from './slice/groupsSlice';
import contactsReducer from './slice/contactsSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    contacts: contactsReducer,
  },
});
