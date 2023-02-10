import { Spot } from "./reducer";
import axios from "axios";

export enum Action {
  SET_SPOTS = 'SET_SPOTS',
}

const API_URL = process.env.REACT_APP_API_URL;

export const setSpots = (spots: Spot[]) => ({
  type: Action.SET_SPOTS,
  payload: spots,
});

export const getSpots = () => {
  return async (dispatch: (arg0: any) => void) => {
    try {
      const res = await axios.get(`${API_URL}/spots`);      
      
      if (res.status === 200) {
        let spots: Spot[] = [];

        for (let i = 0; i < res.data.length; i++) {
          const spot: Spot = { index: i + 1, id: res.data[i].id, key: res.data[i].id.toString(), title: res.data[i].title, description: res.data[i].description, images: res.data[i].images, price: res.data[i].price, reviews: res.data[i].reviews };

          spots.push(spot);
        }
        dispatch(setSpots(spots));
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };  
};

export const addSpot = (spot: any) => {
  return async (dispatch: (arg0: any) => void) => {
    try {
      const res = await axios.post(`${API_URL}/spots`, spot);

      console.log(res)
    } catch (e) {
      console.log(e, 'error');
    }
  };  
};