import { createSlice,type PayloadAction } from "@reduxjs/toolkit";


export interface EducationQuotationResults{
    Endowmentamountafterdeferredperiod:number,
    Endowmentamountduringdeferredperiod:number,
    

}

const initialState:EducationQuotationResults={
    Endowmentamountafterdeferredperiod:0,
    Endowmentamountduringdeferredperiod:0,
   
}

const resultSlice=createSlice({
    name:'EducationQuotationresults',
    initialState,
    reducers:{
      SetEndowmentamountafterdeferredperiod(state, action: PayloadAction<number>) {
      state.Endowmentamountafterdeferredperiod = action.payload;
    },
    SetEndowmentamountduringdeferredperiod(state,action:PayloadAction<number>){
        state.Endowmentamountduringdeferredperiod=action.payload;
    },
    }
})

export const {
     SetEndowmentamountafterdeferredperiod,
     SetEndowmentamountduringdeferredperiod,
     
}=resultSlice.actions

export default resultSlice.reducer