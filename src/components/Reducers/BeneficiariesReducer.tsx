import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface BeneficiaryFormData {
  nationalId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  phoneNumber: string;
}

export interface BeneficiariesState {
  currentForm: BeneficiaryFormData;
  beneficiaries: BeneficiaryFormData[];
  editingIndex: number | null;
  numberOfBeneficiaries: number;
}

const initialState: BeneficiariesState = {
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
  numberOfBeneficiaries: 1,
};

const beneficiariesSlice = createSlice({
  name: 'BeneficiariesData',
  initialState,
  reducers: {
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
    
    setFormData(state, action: PayloadAction<Partial<BeneficiaryFormData>>) {
      state.currentForm = { ...state.currentForm, ...action.payload };
    },
    
    resetFormData(state) {
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },

    setNumberOfBeneficiaries(state, action: PayloadAction<number>) {
      state.numberOfBeneficiaries = Math.max(1, Math.min(20, action.payload));
    },

    addBeneficiary(state, action: PayloadAction<BeneficiaryFormData>) {
      state.beneficiaries.push(action.payload);
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },

    updateBeneficiary(state, action: PayloadAction<{ index: number; data: BeneficiaryFormData }>) {
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

    clearAllBeneficiaries(state) {
      state.beneficiaries = [];
      state.currentForm = initialState.currentForm;
      state.editingIndex = null;
    },

    loadBeneficiaryForEdit(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.beneficiaries.length) {
        state.currentForm = { ...state.beneficiaries[index] };
        state.editingIndex = index;
      }
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
  setNumberOfBeneficiaries,
  addBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  setEditingIndex,
  clearAllBeneficiaries,
  loadBeneficiaryForEdit,
} = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
