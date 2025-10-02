// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import formDataReducers from './components/Reducers/loanQuotationFormFieldsReducer'
import LoanQuotationResult from './components/Reducers/loanQuotationResults'
import EducationQuotationFormData from './components/Reducers/EducationQuotationFormFieldsReducers'
import EducationQuotationResult from './components/Reducers/EducationQuotationResults'
import FamilyQuotationFormData from './components/Reducers/FamilyQuotationFormFieldsReducer'
import FamilyQuotationResult from './components/Reducers/FamilyQuotationResult'
import NkunganireQuotationFormData from './components/Reducers/NkunganireQuotationFormFieldsReducer'
import NkunganireQuotationResult from './components/NkunganireQuotationResult'
import EmployeeQuotationFormData from './components/Reducers/EmployeeProtectionQuatationFormField'
import EmployeeQuotationResult from './components/Reducers/EmployeeProtectionQuatationResults'
import AuthenticationChoice from './components/Reducers/AuthenticationChoiceReducer'
import AuthenticationReducer from './components/Reducers/LogInResultsReducers'
import RegistrationReducer from './components/Reducers/RegistrationReducer'
import UmusigireFormData from './components/Reducers/UmusigireFormFieldsReducer'
import ChildrenFormData from './components/Reducers/ChildrenFormFieldsReducer'
import ValuesModalReducer from './components/Reducers/ValuesModalReducer'
import BeneficiariesReducer from './components/Reducers/BeneficiariesReducer'
import InsuranceNmeReducer from './components/Reducers/GetInsuranceNameReducer'


export const store = configureStore({
  reducer: {
    formdata:formDataReducers,
    Results:LoanQuotationResult,
    EducationQuotationformdata:EducationQuotationFormData,
    EducationQuotationResult:EducationQuotationResult,
    familyForm:FamilyQuotationFormData,
    FamilyQuotationResult:FamilyQuotationResult,
    NkunganireForm:NkunganireQuotationFormData,
    NkunganireQuotationResult:NkunganireQuotationResult,
    EmployeeQuotationFormData:EmployeeQuotationFormData,
    EmployeeQuotationResult:EmployeeQuotationResult,
    AuthenticationChoice:AuthenticationChoice,
    authentication: AuthenticationReducer,
    registration: RegistrationReducer,
    umusigireForm: UmusigireFormData,
    childrenForm: ChildrenFormData,
    valuesModal: ValuesModalReducer,
    beneficiariesForm: BeneficiariesReducer,
    insuranceName:InsuranceNmeReducer
    
  },
});

// Types for use throughout app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
