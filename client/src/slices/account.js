import { createSlice } from '@reduxjs/toolkit';
import { axios } from 'src/utils/axiosHook';

const initialState = {
  address: "",
  loggedIn: false,
  hasAdminRole: false,
  stake: 0,
  rewards: 0,
  accumulatedRewards: 0
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login(state, action) {
      const { address = "", stake = 0, rewards = 0, hasAdminRole = false, accumulatedRewards = 0 } = action.payload;
      state.loggedIn = true;
      state.hasAdminRole = hasAdminRole;
      state.address = address;
      state.stake = stake;
      state.rewards = rewards;
      state.accumulatedRewards = accumulatedRewards;
    },
    logout(state, action) {
      state.loggedIn = false;
      state.hasAdminRole = false;
      state.address = "";
      state.stake = 0;
      state.rewards = 0;
      state.accumulatedRewards = 0;
    }
  }
});


export const reducer = slice.reducer;

export const logout = () => async (dispatch) => {
  dispatch(slice.actions.logout());
}

export const login = (address) => async (dispatch) => {
  axios.get(`/accounts/${address}`)
  .then(function (response) {
    // handle success
    dispatch(slice.actions.login(response.data));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}