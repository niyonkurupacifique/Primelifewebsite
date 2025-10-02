import { createSlice, type PayloadAction } from '@reduxjs/toolkit';



export interface FormData {
  Premium:number; 
  yearOfBirth: string;
  ContributionYears:number;
  BenefitYears:number;
  PremiumFrequency:string;
  Cycle:string;

}

const initialState: FormData = {
  Premium:0,  
  yearOfBirth:"",
  ContributionYears:3,
  BenefitYears:1,
  PremiumFrequency: 'Select',
  Cycle: 'Select',
 
};

const formDataSlice = createSlice({
  name: 'EducationQCalculatorformData',
  initialState,
  reducers: {
    setPremium(state, action: PayloadAction<number>) {
      state.Premium = action.payload;
    },
    setYearOfBirth(state, action: PayloadAction<string>) {
      state.yearOfBirth = action.payload;
    },
  
    setContributionYears(state, action: PayloadAction<number>) {
      state.ContributionYears = action.payload;
    },
    setBenefitYears(state, action: PayloadAction<number>) {
      state.BenefitYears = action.payload;
    },
    setPremiumFrequency(state, action: PayloadAction<string>) {
      state.PremiumFrequency = action.payload;
    },
    setCycle(state, action: PayloadAction<string>) {
      state.Cycle = action.payload;
    },
    
    
    // Optional: you can add a generic setFormData to replace all at once
    setFormData(state, action: PayloadAction<Partial<FormData>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setPremium,
  setYearOfBirth,
  setContributionYears,
  setBenefitYears,
  setPremiumFrequency,
  setCycle,
  setFormData,
} = formDataSlice.actions;

export default formDataSlice.reducer;
