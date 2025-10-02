import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface FamilyFormState {
  maritalStatus: string;
  category: string;
  directParent: number;
  directParentInLaw: number;
  premiumFrequency: string;
  numberOfChildren: number;
  contributionYears: number;
  savingPremium: number;
}

const initialState: FamilyFormState = {
  maritalStatus: '',
  category: '',
  directParent:0,
  directParentInLaw:0,
  premiumFrequency: 'Monthly',
  numberOfChildren: 0,
  contributionYears:0,
  savingPremium: 0,
};

const FamilyFormSlice = createSlice({
  name: 'FamilyForm',
  initialState,
  reducers: {
    setMaritalStatus: (state, action: PayloadAction<string>) => {
      state.maritalStatus = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDirectParent: (state, action: PayloadAction<number>) => {
      state.directParent = action.payload;
    },
    setDirectParentInLaw: (state, action: PayloadAction<number>) => {
      state.directParentInLaw = action.payload;
    },
    setPremiumFrequency: (state, action: PayloadAction<string>) => {
      state.premiumFrequency = action.payload;
    },
    setNumberOfChildren: (state, action: PayloadAction<number>) => {
      state.numberOfChildren = action.payload;
    },
    setContributionYears: (state, action: PayloadAction<number>) => {
      state.contributionYears = action.payload;
    },
    setSavingPremium: (state, action: PayloadAction<number>) => {
      state.savingPremium = action.payload;
    },
    increaseSavingPremium: (state, action: PayloadAction<number>) => {
      state.savingPremium += action.payload;
    },
    decreaseSavingPremium: (state, action: PayloadAction<number>) => {
      state.savingPremium = Math.max(0, state.savingPremium - action.payload);
    },
    setFormData: (state, action: PayloadAction<Partial<FamilyFormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState
  },
});

export const {
  setMaritalStatus,
  setCategory,
  setDirectParent,
  setDirectParentInLaw,
  setPremiumFrequency,
  setNumberOfChildren,
  setContributionYears,
  setSavingPremium,
  increaseSavingPremium,
  decreaseSavingPremium,
  setFormData,
  resetForm,
} = FamilyFormSlice.actions;

export default FamilyFormSlice.reducer;
