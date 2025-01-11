import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  country: "",
  organization: "",
  City: "",
  tax: "",
  pincode: "",
  state: "",
  gst: "",
  file: null,
};
  
const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            state.form = action.payload
        },
        resetFormData: (state) => {
            state.form = null;
        }
    }
})

export const { updateFormData, resetFormData } = formSlice.actions;
export const selectFormData = (state) => state.form;
export default formSlice.reducer;

