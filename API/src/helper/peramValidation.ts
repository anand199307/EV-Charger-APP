export const accountRequiredFields = [
    'organization_id',
    'name',
    'email',
    'phone_number',
    'credit_limit',
    'bank_account',
    'bank_name',
    'payee_name',
    'ifsc_code',
    'tax_number',
    'gst_number',
    'location_details',
    'logo',
  ];

export const locationRequiredFields = [
    "country_id",
    "province_id",
    "city_id",
    "address_line1",
    "postal_index_code"
]

export const hostRequiredFields = [
  'account_id',
  'phone_number',
  'host_name',
  'email',
  'bank_name',
  'bank_account',
  'ifsc_code',
  'taxNumber',
  'gstNumber',
  'location_details',
  'payee_name',
  'password'
]

export const propertiesRequiredFields = [
  "host_id",
  "location_details",
  "status",
  "name",
  "eb_number",
  "eb_bill_copy",
]

export const chargerRequiredFields = [
  'name',
  'property_id',
  'serial_number',
  'oem_company',
  'visibility',
  'latitude',
  'longitude'
]

export const connectorRequiredFields = [
  'connectorId',
  'charger_id',
  'status',
  'oem_connector_number',
  'connector_type',
  'tariff_rate',
  'max_unit_hour',
  'capacity',
  'hourly_charge',
  'unit_charge'
]

export const startChargerRequireFields = [
  'cpid',
  'connectorId', 
  'limit', 
  'limitType'
]

export const stopChargerRequireFields = [
  "cpid", 
  "transactionId",
  "idTag"
]