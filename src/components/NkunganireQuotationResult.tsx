import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NkunganireQuotationResults {
  NkunganirePolicyHolder: number;
  NkunganireSpouse: number;
  NkunganireChildren: number;
  NkunganireParent: number;
  NkunganireFuneralCash: number;
  NkunganireHospitalCash: number;
  NkunganireLegalAssistance: number;
}

const nkunganireInitialState: NkunganireQuotationResults = {
  NkunganirePolicyHolder: 0,
  NkunganireSpouse: 0,
  NkunganireChildren: 0,
  NkunganireParent: 0,
  NkunganireFuneralCash: 0,
  NkunganireHospitalCash: 0,
  NkunganireLegalAssistance: 0
};

const nkunganireQuotationResultsSlice = createSlice({
  name: 'nkunganireQuotationResults',
  initialState: nkunganireInitialState,
  reducers: {
    setNkunganirePolicyHolder(state, action: PayloadAction<number>) {
      state.NkunganirePolicyHolder = action.payload;
    },
    setNkunganireSpouse(state, action: PayloadAction<number>) {
      state.NkunganireSpouse = action.payload;
    },
    setNkunganireChildren(state, action: PayloadAction<number>) {
      state.NkunganireChildren = action.payload;
    },
    setNkunganireParent(state, action: PayloadAction<number>) {
      state.NkunganireParent = action.payload;
    },
    setNkunganireFuneralCash(state, action: PayloadAction<number>) {
      state.NkunganireFuneralCash = action.payload;
    },
    setNkunganireHospitalCash(state, action: PayloadAction<number>) {
      state.NkunganireHospitalCash = action.payload;
    },
    setNkunganireLegalAssistance(state, action: PayloadAction<number>) {
      state.NkunganireLegalAssistance = action.payload;
    }
  }
});

export const {
  setNkunganirePolicyHolder,
  setNkunganireSpouse,
  setNkunganireChildren,
  setNkunganireParent,
  setNkunganireFuneralCash,
  setNkunganireHospitalCash,
  setNkunganireLegalAssistance
} = nkunganireQuotationResultsSlice.actions;

export default nkunganireQuotationResultsSlice.reducer;