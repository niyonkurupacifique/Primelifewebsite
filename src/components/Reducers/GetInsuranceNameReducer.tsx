import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface insuranceName{
    InsuranceName:string
}

const initialState:insuranceName=
{
    InsuranceName:""

}

const insuranceNameReducerSlice=createSlice({
    name:"insurancename",
    initialState:initialState,
    reducers:{
    setInsuranceName(state,action:PayloadAction<string>){
        state.InsuranceName=action.payload
    }
    }

})

export const {setInsuranceName}=insuranceNameReducerSlice.actions;

export default insuranceNameReducerSlice.reducer

