import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { appReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { RecordAction } from './reducers/records';
import { StorageService } from '../service/storage';

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

const CustomStorage: Storage = {
  getItem: async (key: string, ..._args: Array<any>) => {
    return StorageService.get(key);
  },
  setItem: async (key: string, value: any, ..._args: Array<any>) => {
    return StorageService.set(key, value);
  },
  removeItem: async (key: string, ..._args: Array<any>) => {
    return StorageService.remove(key);
  },
};

export const persistConfig = {
  key: 'root',
  storage: CustomStorage,
};

const reducer = combineReducers({
  reducer: persistReducer(persistConfig, appReducer),
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

type AppDispatch = typeof store.dispatch<RecordAction>;
const useAppDispatch = store.dispatch;
type RootState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistor = persistStore(store);

export { useAppDispatch, useAppSelector, store, persistor };

export type { AppDispatch, RootState };
