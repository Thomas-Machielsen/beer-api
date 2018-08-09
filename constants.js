const ERROR = {
  NO_TOKEN: 'No token provided.',
  FAILED:   'Failed to authenticate token.',
  LOGIN_FAILED: 'Failed authenticating.',
  NO_PERMISSION: 'Insufficient permissions.',
  NO_BEERS: 'Sadly we did not find this beer',
  ERR: 'Something went wrong, the api is probably down',
  UNDEFINED: 'Name or password should not be empty'
};

const SUCCESS = {
  REGISTERED: 'Successfully registered, you may use your credentials to log in now!'
};

const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

const TOKEN = {
  EXPIRING_TIME: '10h'
};

const STATUSCODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  DB_DOWN: 503
};

module.exports = { ERROR, ROLES, TOKEN, STATUSCODES, SUCCESS };