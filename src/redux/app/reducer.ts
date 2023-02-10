import { Action } from './actions';

export type Spot = {
  index: number;
  id: number;
  key: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  reviews: Review[];
}

export type Review = {
  id: number;
  review: string;
  spot_id: number;
}

export interface AppState {
  spots: Spot[];
}

export const initialState: AppState = {
  spots: []
};

export const appReducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case Action.SET_SPOTS: {
      return { ...state, spots: action.payload };
    }

    default:
      return state;
  }
};