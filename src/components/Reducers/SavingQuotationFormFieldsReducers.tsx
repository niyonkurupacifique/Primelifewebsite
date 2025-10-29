import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SavingFormData {
  Premium: number;
  ContributionYears: number;
  BenefitYears: string;
  PremiumFrequency: string;
  Names: string;
}

const initialState: SavingFormData = {
  Premium: 0,
  ContributionYears: 0,
  BenefitYears: "Lumpsum",
  PremiumFrequency: "Monthly",
  Names: ""
};

const savingQuotationFormFieldsSlice = createSlice({
  name: 'SavingQuotationformdata',
  initialState,
  reducers: {
    setPremium: (state, action: PayloadAction<number>) => {
      state.Premium = action.payload;
    },
    setContributionYears: (state, action: PayloadAction<number>) => {
      state.ContributionYears = action.payload;
    },
    setBenefitYears: (state, action: PayloadAction<string>) => {
      state.BenefitYears = action.payload;
    },
    setPremiumFrequency: (state, action: PayloadAction<string>) => {
      state.PremiumFrequency = action.payload;
    },
    setNames: (state, action: PayloadAction<string>) => {
      state.Names = action.payload;
    },
  },
});

export const {
  setPremium,
  setContributionYears,
  setBenefitYears,
  setPremiumFrequency,
  setNames,
} = savingQuotationFormFieldsSlice.actions;

export default savingQuotationFormFieldsSlice.reducer;
