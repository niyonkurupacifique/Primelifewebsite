import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RegistrationData {
  id: number;
  names: string;
  customerCodee: string;
  email: string;
  username: string;
  phoneNumber: string;
  recordedDate: string;
  applicationNumber: string;
  cell: string;
  civilStatus: string;
  countryOfBirth: string;
  dateOfBirth: string;
  dateOfExpiry: string;
  dateOfIssue: string;
  district: string;
  documentNumber: string;
  documentType: number;
  fatherNames: string;
  foreName: string;
  issueNumber: number;
  motherNames: string;
  nationality: string;
  placeOfBirth: string;
  placeOfIssue: string;
  province: string;
  sector: string;
  sex: string;
  signature: string;
  spouse: string;
  status: number;
  surnames: string;
  timeSubmitted: string;
  village: string;
  villageID: string;
}

export interface RegistrationState {
  registrationData: RegistrationData | null;
  isLoading: boolean;
  error: string | null;
  isRegistered: boolean;
  successMessage: string | null;
}

const initialState: RegistrationState = {
  registrationData: null,
  isLoading: false,
  error: null,
  isRegistered: false,
  successMessage: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRegistrationLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setRegistrationError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    registrationSuccess(state, action: PayloadAction<{ data: RegistrationData; successMessage: string }>) {
      state.registrationData = action.payload.data;
      state.successMessage = action.payload.successMessage;
      state.isRegistered = true;
      state.isLoading = false;
      state.error = null;
    },
    clearRegistrationData(state) {
      state.registrationData = null;
      state.isRegistered = false;
      state.successMessage = null;
      state.error = null;
      state.isLoading = false;
    },
    clearRegistrationError(state) {
      state.error = null;
    }
  }
});

export const {
  setRegistrationLoading,
  setRegistrationError,
  registrationSuccess,
  clearRegistrationData,
  clearRegistrationError
} = registrationSlice.actions;

export default registrationSlice.reducer; 