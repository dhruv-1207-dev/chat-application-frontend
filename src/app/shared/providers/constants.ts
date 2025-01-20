export const ROUTE_PATH = {
  LOGIN: 'login',
  R_LOGIN: '/login', // R stands for relative path
  FORGOT_PASS: 'forgot-password',
  RESET_PASS: 'reset-password/:token',
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  CATEGORY: 'categories',
  PROFILE: 'profile',
  CHANGE_PASS: 'change-password',
  CONTENT: 'content',
  USERS: 'users',
  AGENTS: 'agents',
  MERCHANTS: 'merchants',
  SYSTEM_SETTING: 'system-setting',
  SLASH: '/',
  EDIT: 'edit/:id',
  ABSOLUTE: '',
  VIEW: 'view/:id',
  TRANSACTIONS: 'transactions',
  ID: ':id',
  SUB_ADMIN: 'sub-admin',
  SUPPORT_TICKET: 'support-ticket',
  CHAT: 'chat',
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports',
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
  PROFILE: 'profile',
  FEATURES: 'features',
  ID: 'id',
  USER_PROFILE: 'userProfile',
  BACK: 'back',
  QUERY_PARAMS: 'queryParams',
  MENUS: 'menus',
  DEVICE_ID: 'deviceId',
  DEVICE_TOKEN: 'deviceToken',
  PARAMS_FOR: 'paramsFor',
};

export class Constants {
  static readonly PAGE_LIMIT = 10;
  static readonly NOTIFICATION_PAGE_LIMIT = 20;
  static readonly OLD_MESSAGES_PAGE_LIMIT = 20;
  static readonly OLD_MESSAGES_STARTING_PAGE = 0;
  static readonly STARTING_PAGE = 1;
  static readonly APP_LOGO = '../../../assets/images/black_logo.svg';
  static readonly APP_MINI_LOGO = '../../../assets/images/paymish_mini.svg';
  static readonly DATE_FORMAT = 'mm-yyyy-dd';
  static readonly LOCAL_TIME_STANDARD_FORMAT = 'DD/MM/YYYY hh:mm A';
  static readonly TWELEVE_HOUR_TIME_FORMAT = 'hh:mm A';
  static readonly HOURS_MIN_FORMAT = 'HH:mm';
  static readonly DATE_FORMAT_DD_MM_YYY = 'DD-MM-YYYY';
  static readonly REQUEST_DATE_FORMAT = 'YYYY-MM-DD';
  static readonly DOCUMENT_UPLOAD_FILE_EXTENSION = '.pdf,.jpg,.jpeg, .png';
  static readonly UTC_DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss a';
  static readonly MAX_CELL_CONTENT_LENGTH = 35;
  static readonly DATE_RANGE = 'Date Range';
  static readonly GRAPH_REVENUE_LABEL = 'Revenue';
  static readonly DATE_RANGE_FORMAT = 'MM-YYYY';
}

export const API_PATH = {
  PROFILE: 'users/profile',
  USERS: 'users',
  LOGIN: 'api/users/sign-in',
  FORGOT_PASS: 'users/forgot-password',
  CHANGE_PASS: 'users/change-password',
  RESET_PASS: 'users/reset-password',
  
};

export const ERROR_CODE = {
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NO_RESPONSE: 0,
};

export const ERROR_MSG = {
  ERROR: 'Error',
  INTERNAL_SERVER: 'Internal server error!',
  NO_RESPONSE:
    'There is no network connection right now. Please try again later.',
};
