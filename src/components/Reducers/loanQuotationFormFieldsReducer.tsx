import { createSlice, type PayloadAction } from '@reduxjs/toolkit';



export interface FormData {
  yearOfBirth: string;
  loanType: string;
  loanPeriod: number;
  loanAmount: number;
  premiumFrequency: string;
  isJoint: string;
  coverRetrenchment: string;
  interestRate: number;
}

const initialState: FormData = {
  yearOfBirth:"",
  loanType: 'Decreasing',
  loanPeriod:0,
  loanAmount:0,
  premiumFrequency: 'Single',
  isJoint: 'False',
  coverRetrenchment: 'False',
  interestRate: 12,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setYearOfBirth(state, action: PayloadAction<string>) {
      state.yearOfBirth = action.payload;
    },
    setLoanType(state, action: PayloadAction<string>) {
      state.loanType = action.payload;
    },
    setLoanPeriod(state, action: PayloadAction<number>) {
      state.loanPeriod = action.payload;
    },
    setLoanAmount(state, action: PayloadAction<number>) {
      state.loanAmount = action.payload;
    },
    setPremiumFrequency(state, action: PayloadAction<string>) {
      state.premiumFrequency = action.payload;
    },
    setIsJoint(state, action: PayloadAction<string>) {
      state.isJoint = action.payload;
    },
    setCoverRetrenchment(state, action: PayloadAction<string>) {
      state.coverRetrenchment = action.payload;
    },
    
    // Optional: you can add a generic setFormData to replace all at once
    setFormData(state, action: PayloadAction<Partial<FormData>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setYearOfBirth,
  setLoanType,
  setLoanPeriod,
  setLoanAmount,
  setPremiumFrequency,
  setIsJoint,
  setCoverRetrenchment,
  setFormData,
} = formDataSlice.actions;

export default formDataSlice.reducer;
