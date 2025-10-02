
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";



export interface AuthenticationChoice{
    hasAccount:boolean,
}

const initialState:AuthenticationChoice={
    hasAccount:true,
}

const resultSlice=createSlice({
    name:'AuthenticationChoice',
    initialState,
    reducers:{
      SetHasAccount(state, action: PayloadAction<boolean>) {
      state.hasAccount = action.payload;
    },
   
    }
})

export const {
      SetHasAccount,
    
}=resultSlice.actions

export default resultSlice.reducer