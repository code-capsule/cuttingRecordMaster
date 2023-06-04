import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { SingleParameters } from './typeUtils';
import { AppState } from '../typings';
import { Slice } from '@reduxjs/toolkit';

const { dispatch } = window.master.stores.reduxStore;

type AppDispatch = typeof dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const createReduxFunction = <S extends Slice>(slice: S) => {
  return <T extends keyof S['actions']>(name: T) => {
    const actionCreator = (slice.actions as S['actions'])[name];
    return (payload: SingleParameters<typeof actionCreator>) => {
      dispatch(actionCreator(payload));
    };
  };
};

type ExactSetFunction<S extends Slice> = {
  [k in keyof S['actions']]: (
    payload: SingleParameters<S['actions'][k]>
  ) => void;
};

export const reduxFunctionCreator = <S extends Slice>(slice: S) => {
  const reduxFunction = createReduxFunction(slice);
  type Actions = keyof typeof slice.actions;
  const reduxFunctions: any = {};
  (Object.keys(slice.actions) as Actions[]).forEach((action) => {
    reduxFunctions[action] = reduxFunction(action);
  });
  return reduxFunctions as ExactSetFunction<typeof slice>;
};
