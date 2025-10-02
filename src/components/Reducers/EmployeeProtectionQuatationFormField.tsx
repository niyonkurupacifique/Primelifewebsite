import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface EmployeeFormDataState {
  EmployeeMaritalStatus: string;
  EmployeeMonthlySalary: string;
  EmployeeNumberOfChildren: number;
  EmployeeNumberOfDirectParent: number;
  EmployeeNumberOfDirectParentInLaw: number;
  EmployeeFuneral: string;
  EmployeeSavings: string;
  EmployeeSumInsuredSharedToSpouse: string;
  EmployeePremiumFrequency: string;
  EmployeeContributionYears: number;
}

const initialEmployeeFormDataState: EmployeeFormDataState = {
  EmployeeMaritalStatus: 'Select Marital Status',
  EmployeeMonthlySalary:"0",
  EmployeeNumberOfChildren: 0,
  EmployeeNumberOfDirectParent: 0,
  EmployeeNumberOfDirectParentInLaw: 0,
  EmployeeFuneral: "Yes",
  EmployeeSavings: "Yes",
  EmployeeSumInsuredSharedToSpouse: "No",
  EmployeePremiumFrequency: 'Monthly',
  EmployeeContributionYears: 1,
};

const employeeFormDataSlice = createSlice({
  name: 'EmployeeNkunganireFormData',
  initialState: initialEmployeeFormDataState,
  reducers: {
    setEmployeeMaritalStatus(state, action: PayloadAction<string>) {
      state.EmployeeMaritalStatus = action.payload;
    },
    setEmployeeMonthlySalary(state, action: PayloadAction<string>) {
      state.EmployeeMonthlySalary = action.payload;
    },
    setEmployeeNumberOfChildren(state, action: PayloadAction<number>) {
      state.EmployeeNumberOfChildren = action.payload;
    },
    setEmployeeNumberOfDirectParent(state, action: PayloadAction<number>) {
      state.EmployeeNumberOfDirectParent = action.payload;
    },
    setEmployeeNumberOfDirectParentInLaw(state, action: PayloadAction<number>) {
      state.EmployeeNumberOfDirectParentInLaw = action.payload;
    },
    setEmployeeFuneral(state, action: PayloadAction<string>) {
      state.EmployeeFuneral = action.payload;
    },
    setEmployeeSavings(state, action: PayloadAction<string>) {
      state.EmployeeSavings = action.payload;
    },
    setEmployeeSumInsuredSharedToSpouse(state, action: PayloadAction<string>) {
      state.EmployeeSumInsuredSharedToSpouse = action.payload;
    },
    setEmployeePremiumFrequency(state, action: PayloadAction<string>) {
      state.EmployeePremiumFrequency = action.payload;
    },
    setEmployeeContributionYears(state, action: PayloadAction<number>) {
      state.EmployeeContributionYears = action.payload;
    },
    setEmployeeFormData(state, action: PayloadAction<Partial<EmployeeFormDataState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setEmployeeMaritalStatus,
  setEmployeeMonthlySalary,
  setEmployeeNumberOfChildren,
  setEmployeeNumberOfDirectParent,
  setEmployeeNumberOfDirectParentInLaw,
  setEmployeeFuneral,
  setEmployeeSavings,
  setEmployeeSumInsuredSharedToSpouse,
  setEmployeePremiumFrequency,
  setEmployeeContributionYears,
  setEmployeeFormData,
} = employeeFormDataSlice.actions;

export default employeeFormDataSlice.reducer;
