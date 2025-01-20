export const constants = {
    ENGLISH_LANGUAGE_CODE: 'en',
    ADMIN_LOGIN_LOGO: '../../../../assets/images/logo.png',
    ADMIN_LOGIN_BLACK_LOGO: '../../../../assets/images/Black Logo.png',
    DASHBOARD_LOGO: '../../assets/images/OtoLink 400x190.png',
    DEFAULT_USERS: '../../assets/images/defaultuser.png',
    HEADER_TEXT: 'TGF',
    FOOTER_TEXT: 'OTOLINK',
    DEALER_LOGO: '../../assets/images/dealer-logo.png',
    PASSWORD_MAX: 15,
    NO_INTERNET_CONNECTION_MSG: 'No Internet Connection',
    LOCAL_TIME_FORMAT: 'YYYY-MM-DD hh:mm A',
    DATE_FORMAT: 'DD/MM/YYYY',
    DATE_FORMAT_DD_MM_YYY: 'DD-MM-YYYY',
    LIMIT: 10,
    DEFAULT_PAGE: 1,
    DEFAULT_LANGUAGE: 'en',
    FILE_UPLOAD_SIZE_LIMIT: 4000000,
    PROFILE_IMAGE_EXTENSIONS: 'image/*',
    VEHICLE_TYPE: 'vehicleType',
    VEHICLE: 'vehicle',
    REQUEST_DATE_FORMAT: 'YYYY-MM-DD',
    SELECT_ALL: 'Select All',
    FEATURE_DEFAULT_IMAGE: '../../../assets/images/user-placeholder@2x copy.png',
    STAFF_DEFAULT_IMAGE: '../../../../assets/images/user-placeholder@2x copy.png',
    VEHICLES_TYPE: {
      NEW: 'new',
      PRE_OWNED: 'preOwned'
    }
  };
  
  export const MASTER_ROUTES = {
    GET_DEALERSHIP_LOCATION: '/masters/dealershipLocations',
    GET_DESIGNATION: '/masters/designation',
    GET_ACCESSMODULE: '/masters/modules',
    GET_COUNTRY: '/masters/countries',
    GET_STATES: '/masters/states/',
    GET_CITY: '/masters/cities/',
    UPLOAD_FILE: '/common/upload-file',
    GET_MODULES: '/masters/modules',
    GET_SUBMODULES: '/masters/subModules',
    GET_DOMINS: '/masters/domain',
    GET_CATEGORY: '/masters/featureTypes',
    UPLOAD_DELAER_FILE: '/common/admin/upload-file'
  };
  
  export const LOCAL_STORAGE_KEYS = {
    IS_PRE_OWNED: 'isPreOwned',
    BROCHURE_FILE: 'اختر ملف للعربية',
    TOKEN: 'token',
    NAME:'name',
    PROFILE: 'profile',
    COLOURS: 'colours',
    SPECIFICATIONS: 'specifications',
    FEATURES: 'features',
    DEALERSHIP_LOCATION_TYPES: 'dealershipLocationTypes',
    API_END_POINT: 'apiEndPoint'
  };
  
  export enum INPUTTYPES {
    CHECKBOX = 'checkbox',
    DROPBOX = 'dropbox',
    DROPDOWN = 'dropdown',
    DATE = 'date'
  }
  
  export const CLIENT_ROUTES = {
    CREATE_CLIENTS: '/clients',
    GET_DETAILS: '/clients/',
    GET_ALL_CLIENTS: '/clients',
    UPDATE_CLIENTS: '/clients/'
  };
  
  export const CONTACT_ROUTES = {
    CREATE_CONTACT: '/clients/contacts',
    GET_DETAILS: '/clients/contacts/',
    GET_ALL_CONTACTS: '/clients/contacts?',
    UPDATE_CONTACT: '/clients/contacts/',
    DELETE_CONTACT: '/clients/contacts/'
  };
  
  export const STAFF_ROUTES = {
    CREATE_STAFF: '/staffs',
    GET_DETAILS: '/staffs/',
    GET_ALL_STAFF: '/staffs',
    UPDATE_STAFF: '/staffs/',
    DELETE_STAFF: '/staffs/',
    UPDATE_STAFF_STATUS: '/staffs/change-status/'
  };
  
  export const DEALER_PANEL_ROUTES = {
    DASHBOARD: 'dashboard'
  }
  
  export const VEHICLE_ROUTES = {
    GET_BRANDS: '/brands',
    GET_FEATURES: '/features',
    ADD_BRANDS: '/brands',
    ADD_FEATURES: '/features',
    UPDATE_FEATURES: '/features/',
    DELETE_BRANDS: '/brands/',
    CHANGE_BRAND_STATUS: '/brands/change-status/',
    DELETE_FEATURES: '/features/',
    CHANGE_FEATURE_STATUS: '/features/change-status/',
    GET_FEATURES_DETAILS: '/features/'
  }
  
  export const CONFIGURATION_ROUTES = {
    GET_CONFIGURATIONS: '/settings/feature-config?module=',
    UPDATE_CONFIGURATIONS: '/settings/feature-config',
    GET_CLIENT_SETUP: 'settings/client-setup',
    UPDATE_CLIENT_SETUP: 'settings/client-setup/',
    GET_MODULE_DATA: '/module?name=',
    UPDATE_MODULE_STATUS: '/module/',
    GET_MENU_LIST: '/menus/admin'
  }
  
  export const MODULE_TYPES = {
    VEHICLE: 'vehicles',
    PAYMENT: 'payment',
    LOYALTY: 'loyaltyRedeem',
    TEST_DRIVE: 'testDrive',
    SERVICE_BOOKING: 'serviceBooking',
    ROADSIDE_ASSISTANCE: 'roadsideAssistance',
  }
  
  export const MAIN_MODULE_TYPES = {
    VEHICLE: 'vehicles',
    PAYMENT: 'payment',
    LOYALTY: 'loyalty',
    TEST_DRIVE: 'test',
    SERVICE_BOOKING: 'service',
    ROADSIDE_ASSISTANCE: 'roadside',
    HOLIDAYS: 'holidays',
    SPECIAL_OFFER: 'special',
    INQUIRY: 'inquiry',
  }
  
  export const TIERS_ROUTES = {
    GET_ALL_TIERS: '/loyalty-tiers',
    DELETE_TIERS: '/loyalty-tiers/',
    CHANGE_TIER_STATUS: '/loyalty-tiers/change-status/',
    ADD_TIER: '/loyalty-tiers',
    UPDATE_TIER: '/loyalty-tiers/',
    GET_TIER_DETAILS: '/loyalty-tiers/'
  }
  
  export const MOBILE_APP_LANGUAGE = [
    { text: 'English', value: 1 },
    { text: 'Arabic', value: 2 }
  ]
  
  export const TEST_DRIVE_TIME_SLOT = [
    { text: '30', value: 30 },
    { text: '45', value: 45 },
    { text: '60', value: 60 },
    { text: '120', value: 120 }
  ]
  
  export const SERVICE_BOOKING_DATA = {
    INTERGRATIONS_PROCESS: ['KEYLOOP_SAB', 'KEYLOOP_SOL', 'OTHER_SERVICE'],
    DOOR_TO_DOOR_SERVICE: ['SERVICE_DOOR_FIXED_KM', 'SERVICE_DOOR_PER_KM', 'DOOR_TO_DOOR_SERVICE']
  }
  
  export const TEST_DRIVE_DATA = {
    HOME_SERVICE: ['HOME_TEST_DRIVE', 'TEST_DRIVE_DOOR_FIXED_KM', 'TEST_DRIVE_DOOR_PER_KM'],
    USED_VEHICLE_CONFIG: ['DOOR_TO_DOOR_TESTDRIVE', 'LINK_URL_TESTDRIVE'],
    NEW_VEHICLE_CONFIG: ['LINK_URL_TESTDRIVE']
  }