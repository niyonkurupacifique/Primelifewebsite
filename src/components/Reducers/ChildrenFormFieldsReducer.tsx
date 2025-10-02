import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ChildrenFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

export interface ChildrenState {
  currentForm: ChildrenFormData;
  child: ChildrenFormData | null;
}

const initialState: ChildrenState = {
  currentForm: {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
  },
  child: null,
};

const childrenFormDataSlice = createSlice({
  name: 'ChildrenFormData',
  initialState,
  reducers: {
    // Form field setters
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

    
    // Generic setFormData to replace all at once
    setFormData(state, action: PayloadAction<Partial<ChildrenFormData>>) {
      state.currentForm = { ...state.currentForm, ...action.payload };
    },
    
    // Reset form data
    resetFormData(state) {
      state.currentForm = initialState.currentForm;
    },

    // Child management (only one child allowed)
    setChild(state, action: PayloadAction<ChildrenFormData>) {
      state.child = action.payload;
      state.currentForm = initialState.currentForm;
    },

    updateChild(state, action: PayloadAction<ChildrenFormData>) {
      state.child = action.payload;
      state.currentForm = initialState.currentForm;
    },

    removeChild(state) {
      state.child = null;
      state.currentForm = initialState.currentForm;
    },

    clearChildForm(state) {
      state.currentForm = initialState.currentForm;
    },
  },
});

export const {
  setFirstName,
  setMiddleName,
  setLastName,
  setDateOfBirth,
  setGender,
  setFormData,
  resetFormData,
  setChild,
  updateChild,
  removeChild,
  clearChildForm,
} = childrenFormDataSlice.actions;

export default childrenFormDataSlice.reducer;
