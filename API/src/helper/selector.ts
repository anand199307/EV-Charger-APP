export const adminSelctor = {
  id: true,
  status: true,
  account_id: true,
  organization_id: true,
  uuid: true,
  email: true,
  is_superadmin: true,
  role: true,
  first_name: true,
  phone_number: true,
  last_name: true,
  account: {
    select: {
      id: true,
      name: true,
    },
  },
  organization: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const userSelector = {
  id: true,
  account_id: true,
  uuid: true,
  wallet_amount: true,
  location: true,
  email: true,
  phone_number: true,
  first_name: true,
  last_name: true,
  status: true,
  account: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const userVehicle = {
  user_id: true,
  vehicle_id: true,
  vin_number: true,
  vehicle: {
    select: {
      id: true,
      manufacturer: true,
      car_model: true,
      battery_capacity: true,
      variants: true,
      avatar: true,
    },
  },
};

export const countrySelector = {
  id: true,
  name: true,
  code: true,
  region: true,
  phone_code: true,
  numeric_code: true,
  currency: true,
  currency_name: true,
  currency_symbol: true,
  emoji: true,
};

export const proviceSelector = {
  id: true,
  country_id: true,
  name: true,
  code: true,
  lat: true,
  long: true,
};
export const citySelector = {
  id: true,
  province_id: true,
  name: true,
  code: true,
  lat: true,
  long: true,
};

export const AdminInfoSelector = {
  id: true,
  status: true,
  password_digest: true,
  account_id: true,
  organization_id: true,
  uuid: true,
  email: true,
  is_superadmin: true,
  role: true,
  first_name: true,
  phone_number: true,
  last_name: true
}

export const sessionSelector = {
  id: true,
  total: true,
  limit: true,
  limitType: true,
  refund: true,
  reason: true,
  updated_at: true,
  charger: {
    select: {
      name: true,
      property: {
        select: {
          location: {
            select: {
              address_line1: true,
              address_line2: true,
              postal_index_code: true,
            },
          },
        },
      },
    },
  },
}