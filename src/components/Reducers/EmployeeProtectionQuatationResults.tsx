import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface EmployeeBenefitsState {
  EmployeeRiskPremium: number;
  EmployeeSavingPremium: number;
  EmployeeTotalPremium: number;

  EmployeePolicyHolderDeath: number;
  EmployeePolicyHolderPermanentDisability: number;
  EmployeePolicyHolderLossOfRevenue: number;
  EmployeePolicyHolderFuneralFees: number;

  EmployeeSpouseDeath: number;
  EmployeeSpousePermanentDisability: number;
  EmployeeSpouseLossOfRevenue: number;
  EmployeeSpouseFuneralFees: number;

  EmployeeChildrenDeath: number;
  EmployeeChildrenPermanentDisability: number;
  EmployeeChildrenLossOfRevenue: number;
  EmployeeChildrenFuneralFees: number;
}

const initialEmployeeBenefitsState: EmployeeBenefitsState = {
  EmployeeRiskPremium: 0,
  EmployeeSavingPremium: 0,
  EmployeeTotalPremium: 0,

  EmployeePolicyHolderDeath: 0,
  EmployeePolicyHolderPermanentDisability: 0,
  EmployeePolicyHolderLossOfRevenue: 0,
  EmployeePolicyHolderFuneralFees: 0,

  EmployeeSpouseDeath: 0,
  EmployeeSpousePermanentDisability: 0,
  EmployeeSpouseLossOfRevenue: 0,
  EmployeeSpouseFuneralFees: 0,

  EmployeeChildrenDeath: 0,
  EmployeeChildrenPermanentDisability: 0,
  EmployeeChildrenLossOfRevenue: 0,
  EmployeeChildrenFuneralFees: 0,
};

const employeeBenefitsSlice = createSlice({
  name: 'EmployeeQuotationResults',
  initialState: initialEmployeeBenefitsState,
  reducers: {
    setEmployeeRiskPremium(state, action: PayloadAction<number>) {
      state.EmployeeRiskPremium = action.payload;
    },
    setEmployeeSavingPremium(state, action: PayloadAction<number>) {
      state.EmployeeSavingPremium = action.payload;
    },
    setEmployeeTotalPremium(state, action: PayloadAction<number>) {
      state.EmployeeTotalPremium = action.payload;
    },

    setEmployeePolicyHolderDeath(state, action: PayloadAction<number>) {
      state.EmployeePolicyHolderDeath = action.payload;
    },
    setEmployeePolicyHolderPermanentDisability(state, action: PayloadAction<number>) {
      state.EmployeePolicyHolderPermanentDisability = action.payload;
    },
    setEmployeePolicyHolderLossOfRevenue(state, action: PayloadAction<number>) {
      state.EmployeePolicyHolderLossOfRevenue = action.payload;
    },
    setEmployeePolicyHolderFuneralFees(state, action: PayloadAction<number>) {
      state.EmployeePolicyHolderFuneralFees = action.payload;
    },

    setEmployeeSpouseDeath(state, action: PayloadAction<number>) {
      state.EmployeeSpouseDeath = action.payload;
    },
    setEmployeeSpousePermanentDisability(state, action: PayloadAction<number>) {
      state.EmployeeSpousePermanentDisability = action.payload;
    },
    setEmployeeSpouseLossOfRevenue(state, action: PayloadAction<number>) {
      state.EmployeeSpouseLossOfRevenue = action.payload;
    },
    setEmployeeSpouseFuneralFees(state, action: PayloadAction<number>) {
      state.EmployeeSpouseFuneralFees = action.payload;
    },

    setEmployeeChildrenDeath(state, action: PayloadAction<number>) {
      state.EmployeeChildrenDeath = action.payload;
    },
    setEmployeeChildrenPermanentDisability(state, action: PayloadAction<number>) {
      state.EmployeeChildrenPermanentDisability = action.payload;
    },
    setEmployeeChildrenLossOfRevenue(state, action: PayloadAction<number>) {
      state.EmployeeChildrenLossOfRevenue = action.payload;
    },
    setEmployeeChildrenFuneralFees(state, action: PayloadAction<number>) {
      state.EmployeeChildrenFuneralFees = action.payload;
    },

    setEmployeeBenefits(state, action: PayloadAction<Partial<EmployeeBenefitsState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setEmployeeRiskPremium,
  setEmployeeSavingPremium,
  setEmployeeTotalPremium,

  setEmployeePolicyHolderDeath,
  setEmployeePolicyHolderPermanentDisability,
  setEmployeePolicyHolderLossOfRevenue,
  setEmployeePolicyHolderFuneralFees,

  setEmployeeSpouseDeath,
  setEmployeeSpousePermanentDisability,
  setEmployeeSpouseLossOfRevenue,
  setEmployeeSpouseFuneralFees,

  setEmployeeChildrenDeath,
  setEmployeeChildrenPermanentDisability,
  setEmployeeChildrenLossOfRevenue,
  setEmployeeChildrenFuneralFees,

  setEmployeeBenefits,
} = employeeBenefitsSlice.actions;

export default employeeBenefitsSlice.reducer;
