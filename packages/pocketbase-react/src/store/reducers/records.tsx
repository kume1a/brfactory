import { Record } from '../../interfaces/record';
import * as ReduxType from '../types';

export interface ReduxRecord {
  [key: string]: Record[];
}

export type RecordAction = {
  type: ReduxType.RecordType;
  key: string;
  payload: null | Record | Record[];
};

export const records = (state: ReduxRecord = {}, action: RecordAction) => {
  const list = state[action.key] ?? [];

  switch (action.type) {
    case ReduxType.SET_RECORDS:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          [action.key]: action.payload,
        };
      }
    case ReduxType.SET_PAGING_META:
      return {
        ...state,
        [`${action.key}_pagingmeta`]: action.payload,
      };
    case ReduxType.ADD_RECORD:
      return {
        ...state,
        [action.key]: [...list, action.payload as Record],
      };
    case ReduxType.ADD_RECORDS:
      return {
        ...state,
        [action.key]: [...list, ...(action.payload as Record[])],
      };
    case ReduxType.DELETE_RECORD:
      return {
        ...state,
        [action.key]: list.filter((r) => r.id !== (action.payload as Record).id),
      };
    case ReduxType.DELETE_RECORDS:
      return {
        ...state,
        [action.key]: list.filter((r) => !(action.payload as Record[]).includes(r)),
      };
    case ReduxType.UPDATE_RECORD:
      const record = action.payload as Record;

      return {
        ...state,
        [action.key]: list.map((r) => (r.id === record.id ? record : r)),
      };
    default:
      return state;
  }
};
