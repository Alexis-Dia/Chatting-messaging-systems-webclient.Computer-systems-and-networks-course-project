export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PUT = 'PUT';

//export const HOSTNAME = '172.16.1.129'
//export const HOSTNAME = '172.16.1.42';
export const HOSTNAME = 'localhost'
//export const PORT = 8881;
export const PORT = 8080

export const PATH_METHOD_AUTH_AUTHENTICATE = '/auth/authenticate';
export const PATH_METHOD_GET_ALL_DRIVERS = '/user/allDrivers';
export const PATH_METHOD_SIGN_UP = '/user/signUp';

export const PATH_METHOD_GET_ALL_CHANNELS = '/channels/getAllChannels';
export const PATH_METHOD_CREATE_NEW_CHANNEL = '/channels/createNewChannel';
export const PATH_METHOD_GET_ADD_NEW_MESSAGE = '/channels/addNewMessage';
export const PATH_METHOD_GET_DELETE_CHANNEL = '/channels/deleteChannel';
export const PATH_METHOD_CHANGE_NICK_NAME = '/user/changeNickName';

export const HTTPS = 'HTTPS://';
export const HTTP = 'HTTP://';
export const WS = '/ws';
export const DELIMITER = ':';
export const ALARM_MAIN_TOPIC = '/alarm/new';

export const PAGE_STATUS_200 = 200;
export const PAGE_STATUS_500 = 500;
export const PAGE_STATUS_UNDEFINED = 'undefined';

export const APPLICATION_JSON = 'application/json';
export const JSON = 'json';
export const BEARER = 'Bearer ';

export const ENCODING_UTF8 = 'utf8';

export const JWT_TOKEN = 'jwtToken';
export const LANGUAGE_DEFAULT = 'EN';
export const RU = 'RU';
export const EN = 'EN';
export const I18 = 'i18';
export const EMPTY_STRING = '';
export const EMPTY_STRING_OBJECT = '{}';
export const STRING_DASH = '-';

export const EMPTY_PAGE_PATH = '/';
export const REGISTARATION_PAGE_PATH = '/signUp';
export const VIEW_ALL_DRIVERS_PAGE_PATH = '/viewDrivers';
export const VIEW_CHANNELS_MANAGING_PAGE_PATH = '/channelsManaging';
export const VIEW_CHANNELS_PAGE_PATH = '/viewChannels';
export const VIEW_REPORTS_PAGE_PATH = '/reportsView';
export const REPORTS_PAGE_PATH = '/reports';
export const ADD_REPORT_PAGE_PATH = '/addReport';

export const INFORMATION = 'MyInformation';
export const VIEW_ALL_DRIVERS = 'ViewAllDrivers';
export const CHANNELS_MANAGING = 'ChannelsManaging';
export const VIEW_HISTORY_REPORTS = 'ViewHistoryReports';
export const REPORTS = 'Reports';
export const ADD_REPORT = 'Add report';

export const ROLE_DRIVER = 'DRIVER';
export const ROLE_ADMIN = 'ADMIN';

export const DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 10,
    'orders' : [
        {
            'property' : 'resolved',
            'priority' : 1,
            'direction' : 'ASC'
        },
        {
            'property' : 'alarmDate',
            'priority' : 2,
            'direction' : 'DESC'
        }
    ]
};

export const DEFAULT_COORDINATES = {
    latitude: 39,
    longitude: -100
};

export const DEFAULT_FILTERING_PARAMETERS = {
    page: 0,
    size: 5,

    iso8601FromFilter: '',
    dateFromFilter: null,
    timeFromFilter: '00:00:00',
    iso8601ToFilter: '',
    dateToFilter: null,
    timeToFilter: '00:00:00',
    patientNameFilter: '',
    deviceIdFilter: null,
    alarmTypeFilter: null,
    batteryVoltageFromFilter: '',
    batteryVoltageToFilter: '',
    speedFromFilter: '',
    speedToFilter: '',
    resolvedFilter: null
};

export const FILTERS_OF_NAME = {
    PatientName:'PatientName',
    DeviceId:'DeviceId',
    AlarmType:'AlarmType',
    DateTimeAll:'DateTimeAll',
    BatterryVoltageAll:'BatterryVoltageAll',
    SpeedAll:'SpeedAll',
    ResolveAlarm:'ResolveAlarm',
};

export const DEVICE_DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 10,
    'orders' : [
        {
            'property' : 'deviceId',
            'priority' : 1,
            'direction' : 'ASC'
        },

    ]
};

export const PATIENT_DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 2,
    'orders' : [
        {
            'property' : 'city',
            'priority' : 1,
            'direction' : 'ASC'
        },

    ]
};

export const DATE_TIME_FORMAT_DEFAULT = "YYYY/MM/DD HH:mm";
export const DATE_FORMAT_DEFAULT = "YYYY/MM/DD";

export const UTC_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const DATE_TIME_MASK = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    ":",
    /\d/,
    /\d/,
];

export const DATE_MASK = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
];