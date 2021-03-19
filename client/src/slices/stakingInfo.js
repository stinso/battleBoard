import { createSlice } from '@reduxjs/toolkit';
import { axios } from 'src/utils/axiosHook';

const initialState = {
  stakedAmount: 0,
  poolFilled: 0
};

const slice = createSlice({
  name: 'stakingInfo',
  initialState,
  reducers: {
    getStakingInfo(state, action) {
      const { stakedAmount, poolFilled } = action.payload
      state.stakedAmount = stakedAmount
      state.poolFilled = poolFilled
    }
  }
});


export const reducer = slice.reducer;

export const getStakingInfo = () => async (dispatch) => {
  axios.get('/stakinginfo')
  .then(function (response) {
    // handle success
    dispatch(slice.actions.getStakingInfo(response.data));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}