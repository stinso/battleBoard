import React from 'react'
import { useReducer } from 'reinspect';
import StakingContract from "./StakingContract";
import initialState from "./state";
import stakeReducer from "./reducer";

const StakingContractContext = React.createContext();
const StakingContractDispatch = React.createContext();

function StakingContractProvider({children}) {
  const [prodState, prodDispatch] = React.useReducer(stakeReducer, initialState);
  const [devState, devDispatch] = useReducer(stakeReducer, initialState);

  const state = process.env.NODE_ENV === 'development' ? devState : prodState;
  const dispatch = process.env.NODE_ENV === 'development' ? devDispatch : prodDispatch;

  const stakingContract = new StakingContract();
  return (
    <StakingContractContext.Provider value={{stakingContract, state}}>
      <StakingContractDispatch.Provider value={dispatch}>{children}</StakingContractDispatch.Provider>
    </StakingContractContext.Provider>
  )
}

function useStakingContract() {
  const context = React.useContext(StakingContractContext);
  if (context === undefined) {
    throw new Error('useStakingContract must be used within a StakingContractProvider')
  }
  return context
}

function useStakingDispatch() {
  const context = React.useContext(StakingContractDispatch);
  if (context === undefined) {
    throw new Error('useStakingDispatch must be used within a StakingContractProvider');
  }
  return context;
}


export {StakingContractProvider, useStakingContract, useStakingDispatch}
