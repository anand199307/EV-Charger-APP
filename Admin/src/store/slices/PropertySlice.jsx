import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertySave: {
    host_id: null,
    status: null,
    name: null,
    eb_number: null,
    eb_bill_copy: null,
    location_details: {
      country_id: null,
      city_id: null,
      province_id: null,
      address_line1: null,
      address_line2: null,
      postal_index_code: null,
    },
    phone_number: null,
    property_photo: null
  },
};

const PropertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    updatePropertySave: (state, action) => {
      const { key, value, nestedKey } = action.payload;
      if (nestedKey) {
        if (nestedKey === "location_details") {
          state.propertySave.location_details = {
            ...state.propertySave.location_details,
            [key]: value,
          };
        } else {
          state.propertySave[key] = {
            ...state.propertySave[key],
            [nestedKey]: value,
          };
        }
      } else {
        state.propertySave = {
          ...state.propertySave,
          [key]: value,
        };
      }
    },
  },
});

export const { updatePropertySave } = PropertySlice.actions;
export default PropertySlice.reducer;
