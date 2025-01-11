import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readToken, readUser } from "../../services/localStorage.service";
import { httpApi } from "../../api/http.api";
import { useSelector } from "react-redux";
import axios from "axios";
import { number } from "prop-types";

const user = readUser();
// const initialTableData = [];
const initialState = {
  save: {
    account_id: user?.account_id,
    phone_number: null,
    email: null,
    password: null,
    bank_account: null,
    host_name: null,
    location_details: {
      country_id: null,
      city_id: null,
      province_id: null,
      address_line1: null,
      address_line2: null,
      postal_index_code: null,
    },
    bank_name: null,
    payee_name: null,
    ifsc_code: null,
    taxNumber: null,
    gstNumber: null,
  },

  propertySave: {
    host_id: null,
    status: user?.status,
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
  },

  // rfidSave: {
  //   userId: null,
  //   tag_value: null,

  chargerSave: {
    name: null,
    property_id: null,
    serial_number: null,
    visibility: true,
    oem_company: null,
    latitude: null,
    longitude: null,
    land_mark: null,
  },

  connectorSave: {
    charger_id: null,
    connectorId: 1,
    oem_connector_number: null,
    connector_type: null,
    status: "Preparing",
    tariff_rate: number,
    max_unit_hour: number,
    capacity: number,
    hourly_charge: true,
    unit_charge: true,
  },

  upload: {
    fileType: null,
    uuid: null,
    imageType: null,
  },

  CountryState: null,
  CityApi: null,
  image: null,
  hostList: null,
  propertyList: null,
  fetchSignedUrluploadimage: null,
  url: null,
  chargerlist: null,
  editChargerData: null,
};

export const createHost = createAsyncThunk("host/create", async (payload) => {
  const response = await httpApi.post("host/create", payload);
  return response.data;
});

export const createProperty = createAsyncThunk(
  "property/create",
  async (payload) => {
    const response = await httpApi.post("property/create", payload);
    return response.data;
  }
);

export const createRfid = createAsyncThunk("id-tags", async (payload) => {
  const response = await httpApi.post("id-tags", payload);
  return response.data;
});

export const createCharger = createAsyncThunk(
  "charger/create",
  async (payload) => {
    const response = await httpApi.post("charger/create", payload);
    return response.data;
  }
);

export const createConnector = createAsyncThunk(
  "connector/create",
  async (payload) => {
    const response = await httpApi.post("connector/create", payload);
    return response.data;
  }
);

export const editHost = createAsyncThunk(
  "host/edit",
  async ({ payload, id }) => {
    const response = await httpApi.put(`host/${id}/edit`, payload);
    return response.data;
  }
);

export const editCharger = createAsyncThunk(
  "charger/update",
  async ({ payload, id }) => {
    const response = await httpApi.put(`charger/${id}/update`, payload);
    return response.data;
  }
);

export const editConnector = createAsyncThunk(
  "connector/update",
  async ({ payload, id }) => {
    // console.log({ id, payload });
    const response = await httpApi.put(`connector/${id}/update`, payload);
    // console.log(response);
    return response.data;
  }
);

export const fetchSignedUrl = createAsyncThunk(
  "host/getSignedUrl",
  async ({ fileType, uuid, imageType }) => {
    try {
      const response = await httpApi.get(
        `host/getSignedUrl?fileType=${fileType}&uuid=${uuid}&imageType=${imageType}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const putImage = (url, fileType) => {
  return async (dispatch) => {
    if (url && fileType) {
      try {
        await axios.put(url, fileType, {
          headers: {
            "Content-Type": "text/csv",
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }
  };
};

export const uploadFile = async (file) => {
  let type = file?.name?.split(".").pop();

  const apiResponse = await fetchSignedUrl(type).then((res) => {
    if (res?.status === 200) {
      let fileType = "";
      switch (type) {
        case "mp4":
          fileType = "video/mp4";
          break;
        case "png":
          fileType = "image/png";
          break;
        case "jpg":
          fileType = "image/jpg";
          break;
        case "jpeg":
          fileType = "image/jpeg";
          break;
        case "pdf":
          fileType = "application/pdf";
          break;
        case "xlsx":
          fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          break;
        default:
          fileType = null;
      }
      return res?.data?.response && fileType && file
        ? putImage(res?.data?.response, fileType, file)
        : undefined;
    }
  });
  return apiResponse;
};

const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    updateSaveDetails: (state, action) => {
      const selectedValue = action.payload;
      state.save = {
        account_id: selectedValue.account_id,
        phone_number: selectedValue.phone_number,
        email: selectedValue.email,
        password: null,
        bank_account: selectedValue.bank_account,
        host_name: selectedValue.host_name,
        location_details: {
          id: selectedValue.location.id,
          country_id: selectedValue.location.country_id,
          city_id: selectedValue.location.city_id,
          province_id: selectedValue.location.province_id,
          address_line1: selectedValue.location.address_line1,
          address_line2: selectedValue.location.address_line2,
          postal_index_code: selectedValue.location.postal_index_code,
        },
        bank_name: selectedValue.bank_name,
        payee_name: selectedValue.payee_name,
        ifsc_code: selectedValue.ifsc_code,
        taxNumber: selectedValue.taxNumber,
        gstNumber: selectedValue.gstNumber,
      };
    },

    updateChargeSaveDetails: (state, action) => {
      const selectedValue = action.payload;
      state.chargerSave = {
        name: selectedValue?.name,
        property_id: selectedValue?.property_id,
        serial_number: selectedValue?.serial_number,
        visibility: selectedValue?.visibility,
        oem_company: selectedValue?.oem_company,
        latitude: selectedValue?.latitude,
        longitude: selectedValue.longitude,
        land_mark: selectedValue.land_mark,
      };
    },

    updateSave: (state, action) => {
      const { key, value, nestedKey } = action.payload;

      let entry = state.save;

      if (nestedKey === "location_details") {
        entry.location_details = {
          ...entry.location_details,
          [key]: value,
        };
      } else if (
        key === "country_id" ||
        key === "province_id" ||
        key === "city_id"
      ) {
        entry.location_details = {
          ...entry.location_details,
          [key]: value,
        };
      } else if (
        key === "host_name" ||
        key === "gstNumber" ||
        key === "phone_number" ||
        key === "taxNumber" ||
        key === "bank_account" ||
        key === "bank_name" ||
        key === "email" ||
        key === "ifsc_code" ||
        key === "password" ||
        key === "payee_name"
      ) {
        entry = {
          ...entry,
          [key]: value,
        };
      }
      state.save = entry;
    },

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

    // updateRfidSave: (state, action) => {
    //   const { key, value } = action.payload;

    //   state.rfidSave = {
    //     ...state.rfidSave,
    //     [key]: value,
    //   };
    // },

    updateChargerSave: (state, action) => {
      const { key, value } = action.payload;
      state.chargerSave = {
        ...state.chargerSave,
        [key]: value,
      };
    },

    updateConnectorSave: (state, action) => {
      const { key, value } = action.payload;

      state.connectorSave = {
        ...state.connectorSave,
        [key]: value,
      };
    },

    getUrl: (state, action) => {
      state.image = action.payload;
    },

    resetSave: (state) => {
      state.save = { ...initialState.save };
    },

    setEditChargerData: (state, action) => {
      state.chargerSave = action.payload;
    },

    setEditConnectorData: (state, action) => {
      state.connectorSave = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignedUrl.fulfilled, (state, action) => {
      state.fetchSignedUrluploadimage = action.payload;
    });

    builder.addCase(createHost.fulfilled, (state, action) => {
      state.createdHost = action.payload;
    });

    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.createProperty = action.payload;
    });

    // builder.addCase(createRfid.fulfilled, (state, action) => {
    //   state.createRfid = action.payload;
    // });

    builder.addCase(createCharger.fulfilled, (state, action) => {
      state.chargerSave = action.payload;
    });

    builder.addCase(editHost.fulfilled, (state, action) => {
      state.editHost = action.payload;
    });

    builder.addCase(createConnector.fulfilled, (state, action) => {
      state.connectorSave = action.payload;
    });
  },
});

export const {
  updateSave,
  getUrl,
  updatePropertySave,
  updateHostEdit,
  setTableData,
  updateSaveDetails,
  resetSave,
  // updateRfidSave
  updateChargerSave,
  updateChargeSaveDetails,
  updateConnectorSave,
  setEditChargerData,
  setEditConnectorData,
} = hostSlice.actions;
export default hostSlice.reducer;
