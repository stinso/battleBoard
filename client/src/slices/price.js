import { createSlice } from '@reduxjs/toolkit';
import { axios } from 'src/utils/axiosHook';

const initialState = {
  value: 0,
  usd_24h_change: 0
};

const slice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    getPrice(state, action) {      
      const { usd, usd_24h_change } = action.payload
      state.value = usd;
      state.usd_24h_change = usd_24h_change;
    }
  }
});


export const reducer = slice.reducer;

export const getPrice = () => async (dispatch) => {
  axios.get('/price')
  .then(function (response) {
    // handle success
    dispatch(slice.actions.getPrice(response.data));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}