import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ValuesModalState {
  showValuesModal: boolean;
}

const initialState: ValuesModalState = {
  showValuesModal: false,
};

const valuesModalSlice = createSlice({
  name: 'valuesModal',
  initialState,
  reducers: {
    SetShowValuesModal(state, action: PayloadAction<boolean>) {
      state.showValuesModal = action.payload;
    },
    OpenValuesModal(state) {
      state.showValuesModal = true;
      //console.log("showValuesModal is true ")
    },
    CloseValuesModal(state) {
      state.showValuesModal = false;
    },
  },
});

export const { SetShowValuesModal, OpenValuesModal, CloseValuesModal } = valuesModalSlice.actions;
export default valuesModalSlice.reducer; 