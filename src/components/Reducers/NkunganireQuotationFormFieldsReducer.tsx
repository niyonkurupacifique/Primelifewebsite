import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface NkunganireFormState {
  maritalStatus: string;
  category: string;
  directParent: number;
  directParentInLaw: number;
  premiumFrequency: string;
  numberOfChildren: number;
  contributionYears: number;
  savingPremium: number;
  riskPremium: number;
  totalPremium: number;
}

const nkunganireInitialState: NkunganireFormState = {
  maritalStatus: '',
  category: '',
  directParent: 0,
  directParentInLaw: 0,
  premiumFrequency: 'Monthly',
  numberOfChildren: 0,
  contributionYears: 0,
  savingPremium: 0,
  riskPremium: 0,
  totalPremium: 0,
};

const NkunganireFormSlice = createSlice({
  name: 'nkunganireForm',
  initialState: nkunganireInitialState,
  reducers: {
    setNkunganireMaritalStatus: (state, action: PayloadAction<string>) => {
      state.maritalStatus = action.payload;
    },
    setNkunganireCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setNkunganireDirectParent: (state, action: PayloadAction<number>) => {
      state.directParent = action.payload;
    },
    setNkunganireDirectParentInLaw: (state, action: PayloadAction<number>) => {
      state.directParentInLaw = action.payload;
    },
    setNkunganirePremiumFrequency: (state, action: PayloadAction<string>) => {
      state.premiumFrequency = action.payload;
    },
    setNkunganireNumberOfChildren: (state, action: PayloadAction<number>) => {
      state.numberOfChildren = action.payload;
    },
    setNkunganireContributionYears: (state, action: PayloadAction<number>) => {
      state.contributionYears = action.payload;
    },
    setNkunganireSavingPremium: (state, action: PayloadAction<number>) => {
      //console.log('Debug - Redux: setNkunganireSavingPremium called with:', action.payload);
      state.savingPremium = action.payload;
    },
    setNkunganireRiskPremium: (state, action: PayloadAction<number>) => {
      //console.log('Debug - Redux: setNkunganireRiskPremium called with:', action.payload);
      state.riskPremium = action.payload;
    },
    setNkunganireTotalPremium: (state, action: PayloadAction<number>) => {
      //console.log('Debug - Redux: setNkunganireTotalPremium called with:', action.payload);
      state.totalPremium = action.payload;
    },
    increaseNkunganireSavingPremium: (state, action: PayloadAction<number>) => {
      state.savingPremium += action.payload;
    },
    decreaseNkunganireSavingPremium: (state, action: PayloadAction<number>) => {
      state.savingPremium = Math.max(0, state.savingPremium - action.payload);
    },
    setNkunganireFormData: (state, action: PayloadAction<Partial<NkunganireFormState>>) => {
      return { ...state, ...action.payload };
    },
    resetNkunganireForm: () => nkunganireInitialState
  },
});

export const {
  setNkunganireMaritalStatus,
  setNkunganireCategory,
  setNkunganireDirectParent,
  setNkunganireDirectParentInLaw,
  setNkunganirePremiumFrequency,
  setNkunganireNumberOfChildren,
  setNkunganireContributionYears,
  setNkunganireSavingPremium,
  setNkunganireRiskPremium,
  setNkunganireTotalPremium,
  increaseNkunganireSavingPremium,
  decreaseNkunganireSavingPremium,
  setNkunganireFormData,
  resetNkunganireForm,
} = NkunganireFormSlice.actions;

export default NkunganireFormSlice.reducer;