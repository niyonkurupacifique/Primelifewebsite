import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "lucide-react";

export interface LoanQuotationResults{
    NetPremium:number,
    RetrenchmentPremium:number,
    AdministrationFees:number,
    TotalPremiumJointBorrowers:number,
    TotalPremiumSingleBorrower:number,
    covers:string[]

}

const initialState:LoanQuotationResults={
    NetPremium:0,
    RetrenchmentPremium:0,
    AdministrationFees:0,
    TotalPremiumJointBorrowers:0,
    TotalPremiumSingleBorrower:0,
    covers:[]
}

const resultSlice=createSlice({
    name:'results',
    initialState,
    reducers:{
      SetNetPremium(state, action: PayloadAction<number>) {
      state.NetPremium = action.payload;
    },
    SetRetrenchmentPremium(state,action:PayloadAction<number>){
        state.RetrenchmentPremium=action.payload;
    },
    SetAdministrationFees(state,action:PayloadAction<number>){
        state.AdministrationFees=action.payload;
    },
    SetTotalPremiumJointBorrowers(state,action:PayloadAction<number>){
        state.TotalPremiumJointBorrowers=action.payload
    },
    SetTotalPremiumSingleBorrower(state,action:PayloadAction<number>){
        state.TotalPremiumSingleBorrower=action.payload
    },
    setCovers(state,action:PayloadAction<string[]>){
        state.covers=action.payload
    }


    }
})

export const {
     SetNetPremium,
     SetRetrenchmentPremium,
     SetAdministrationFees,
     SetTotalPremiumJointBorrowers,
     SetTotalPremiumSingleBorrower,
     setCovers
}=resultSlice.actions

export default resultSlice.reducer