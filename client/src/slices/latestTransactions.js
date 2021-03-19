import { createSlice } from '@reduxjs/toolkit';
import { axios } from 'src/utils/axiosHook';

const initialState = [];

const slice = createSlice({
  name: 'latestTransactions',
  initialState,
  reducers: {
    getLatestTransactions(state, action) {
      state.splice(0, state.length)
      let i = 0
      action.payload.forEach(element => {
        const { hash, from, to, value, timeStamp } = element
        var transaction = {
          txHash: hash,
          from: from,
          to: to,
          value: value,
          timeStamp: timeStamp
        }
        state[i] = transaction
        i++
      });
    },
    clearTransactions(state, action) {
      state = initialState
    }
  }
});


export const reducer = slice.reducer;

export const getLatestTransactions = (address) => async (dispatch) => {
  axios.get(`/latestTransactions/${address}`)
  .then(function (response) {
    // handle success
    dispatch(slice.actions.getLatestTransactions(response.data.transactions));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

export const clearTransactions = () => async (dispatch) => {
  dispatch(slice.actions.clearTransactions);
}