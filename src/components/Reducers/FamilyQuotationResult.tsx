import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FamilyQuotationResults {
  FamilyPolicyHolder: number;
  FamilySpouse: number;
  FamilyChildren: number;
  FamilyParent: number;
  FamilyFuneralCash: number;
  FamilyHospitalCash: number;
  FamilyLegalAssistance: number;
  RiskPremium: number;
  TotalPremium: number;
}

const initialState: FamilyQuotationResults = {
  FamilyPolicyHolder: 0,
  FamilySpouse: 0,
  FamilyChildren: 0,
  FamilyParent: 0,
  FamilyFuneralCash: 0,
  FamilyHospitalCash: 0,
  FamilyLegalAssistance: 0,
  RiskPremium: 0,
  TotalPremium: 0
};

const familyQuotationResultsSlice = createSlice({
  name: 'FamilyQuotationResults',
  initialState,
  reducers: {
    setFamilyPolicyHolder(state, action: PayloadAction<number>) {
      state.FamilyPolicyHolder = action.payload;
    },
    setFamilySpouse(state, action: PayloadAction<number>) {
      state.FamilySpouse = action.payload;
    },
    setFamilyChildren(state, action: PayloadAction<number>) {
      state.FamilyChildren = action.payload;
    },
    setFamilyParent(state, action: PayloadAction<number>) {
      state.FamilyParent = action.payload;
    },
    setFamilyFuneralCash(state, action: PayloadAction<number>) {
      state.FamilyFuneralCash = action.payload;
    },
    setFamilyHospitalCash(state, action: PayloadAction<number>) {
      state.FamilyHospitalCash = action.payload;
    },
    setFamilyLegalAssistance(state, action: PayloadAction<number>) {
      state.FamilyLegalAssistance = action.payload;
    },
    setRiskPremium(state, action: PayloadAction<number>) {
      state.RiskPremium = action.payload;
    },
    setTotalPremium(state, action: PayloadAction<number>) {
      state.TotalPremium = action.payload;
    }
  }
});

export const {
  setFamilyPolicyHolder,
  setFamilySpouse,
  setFamilyChildren,
  setFamilyParent,
  setFamilyFuneralCash,
  setFamilyHospitalCash,
  setFamilyLegalAssistance,
  setRiskPremium,
  setTotalPremium
} = familyQuotationResultsSlice.actions;

export default familyQuotationResultsSlice.reducer;
