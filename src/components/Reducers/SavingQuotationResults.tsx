import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SavingQuotationResults {
  ValueAcquiredAtMaturity: number;
  SumAssured: number;
  QuotationId: string;
  StartDate: string;
  EndDate: string;
  InterestRate: number;
  Contribution: number;
  PaymentFrequency: string;
  Term: number;
  DateOfBirth: string;
}

const initialState: SavingQuotationResults = {
  ValueAcquiredAtMaturity: 0,
  SumAssured: 0,
  QuotationId: "",
  StartDate: "",
  EndDate: "",
  InterestRate: 0,
  Contribution: 0,
  PaymentFrequency: "",
  Term: 0,
  DateOfBirth: ""
};

const savingQuotationResultsSlice = createSlice({
  name: 'SavingQuotationResults',
  initialState,
  reducers: {
    SetValueAcquiredAtMaturity: (state, action: PayloadAction<number>) => {
      state.ValueAcquiredAtMaturity = action.payload;
    },
    SetSumAssured: (state, action: PayloadAction<number>) => {
      state.SumAssured = action.payload;
    },
    SetQuotationId: (state, action: PayloadAction<string>) => {
      state.QuotationId = action.payload;
    },
    SetStartDate: (state, action: PayloadAction<string>) => {
      state.StartDate = action.payload;
    },
    SetEndDate: (state, action: PayloadAction<string>) => {
      state.EndDate = action.payload;
    },
    SetInterestRate: (state, action: PayloadAction<number>) => {
      state.InterestRate = action.payload;
    },
    SetContribution: (state, action: PayloadAction<number>) => {
      state.Contribution = action.payload;
    },
    SetPaymentFrequency: (state, action: PayloadAction<string>) => {
      state.PaymentFrequency = action.payload;
    },
    SetTerm: (state, action: PayloadAction<number>) => {
      state.Term = action.payload;
    },
    SetDateOfBirth: (state, action: PayloadAction<string>) => {
      state.DateOfBirth = action.payload;
    },
    ResetSavingQuotationResults: (state) => {
      return {
        ...initialState,
        SumAssured: state.SumAssured // Keep the current SumAssured value
      };
    },
  },
});

export const {
  SetValueAcquiredAtMaturity,
  SetSumAssured,
  SetQuotationId,
  SetStartDate,
  SetEndDate,
  SetInterestRate,
  SetContribution,
  SetPaymentFrequency,
  SetTerm,
  SetDateOfBirth,
  ResetSavingQuotationResults,
} = savingQuotationResultsSlice.actions;

export default savingQuotationResultsSlice.reducer;
