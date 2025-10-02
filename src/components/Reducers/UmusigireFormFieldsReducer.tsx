import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UmusigireFormData {
  nationalId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  phoneNumber: string;
}

export interface UmusigireState {
  currentForm: UmusigireFormData;
  beneficiaries: UmusigireFormData[];
  editingIndex: number | null;
}

const initialState: UmusigireState = {
  currentForm: {
    nationalId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    relationship: '',
    phoneNumber: '',
  },
  beneficiaries: [],
  editingIndex: null,
};

const umusigireFormDataSlice = createSlice({
  name: 'UmusigireFormData',
  initialState,
  reducers: {
    // Form field setters
    setNationalId(state, action: PayloadAction<string>) {
      state.currentForm.nationalId = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.currentForm.firstName = action.payload;
    },
    setMiddleName(state, action: PayloadAction<string>) {
      state.currentForm.middleName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.currentForm.lastName = action.payload;
    },
    setDateOfBirth(state, action: PayloadAction<string>) {
      state.currentForm.dateOfBirth = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.currentForm.gender = action.payload;
    },
    setRelationship(state, action: PayloadAction<string>) {
      state.currentForm.relationship = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.currentForm.phoneNumber = action.payload;
    },
    
    // Generic setFormData to replace all at once
    setFormData(state, action: PayloadAction<Partial<UmusigireFormData>>) {
      state.currentForm = { ...state.currentForm, ...action.payload };
    },
    
    // Reset form data
    resetFormData(state) {
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },

    // Beneficiaries management
    addBeneficiary(state, action: PayloadAction<UmusigireFormData>) {
      state.beneficiaries.push(action.payload);
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },

    updateBeneficiary(state, action: PayloadAction<{ index: number; data: UmusigireFormData }>) {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.beneficiaries.length) {
        state.beneficiaries[index] = data;
        state.currentForm = initialState.currentForm;
        state.editingIndex = null;
      }
    },

    deleteBeneficiary(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.beneficiaries.length) {
        state.beneficiaries.splice(index, 1);
      }
    },

    setEditingIndex(state, action: PayloadAction<number | null>) {
      state.editingIndex = action.payload;
      if (action.payload !== null && action.payload >= 0 && action.payload < state.beneficiaries.length) {
        state.currentForm = { ...state.beneficiaries[action.payload] };
      } else {
        state.currentForm = initialState.currentForm;
      }
    },

    clearBeneficiaries(state) {
      state.beneficiaries = [];
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },
  },
});

export const {
  setNationalId,
  setFirstName,
  setMiddleName,
  setLastName,
  setDateOfBirth,
  setGender,
  setRelationship,
  setPhoneNumber,
  setFormData,
  resetFormData,
  addBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  setEditingIndex,
  clearBeneficiaries,
} = umusigireFormDataSlice.actions;

export default umusigireFormDataSlice.reducer; 