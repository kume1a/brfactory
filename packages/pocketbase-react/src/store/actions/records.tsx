import { Record } from '../../interfaces/record';
import { RecordAction } from '../reducers/records';
import {
  ADD_RECORD,
  ADD_RECORDS,
  DELETE_RECORD,
  DELETE_RECORDS,
  PagingMeta,
  SET_PAGING_META,
  SET_RECORDS,
  UPDATE_RECORD,
} from '../types';

export const setRecords = (key: string, payload: Record[]) =>
  ({
    type: SET_RECORDS,
    key,
    payload,
  }) as RecordAction;

export const setPagingMeta = (key: string, payload: PagingMeta) =>
  ({
    type: SET_PAGING_META,
    key,
    payload,
  }) as RecordAction;

export const addRecord = (key: string, payload: Record) =>
  ({
    type: ADD_RECORD,
    key,
    payload,
  }) as RecordAction;

export const addRecords = (key: string, payload: Record[]) =>
  ({
    type: ADD_RECORDS,
    key,
    payload,
  }) as RecordAction;

export const deleteRecord = (key: string, payload: Record) =>
  ({
    type: DELETE_RECORD,
    key,
    payload,
  }) as RecordAction;

export const deleteRecords = (key: string, payload: Record[]) =>
  ({
    type: DELETE_RECORDS,
    key,
    payload,
  }) as RecordAction;

export const updateRecord = (key: string, payload: Record) =>
  ({
    type: UPDATE_RECORD,
    key,
    payload,
  }) as RecordAction;
