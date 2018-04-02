const ERROR = {
  NO_TOKEN: 'No token provided.',
  FAILED:   'Failed to authenticate token.',
  LOGIN_FAILED: 'Failed authenticating.',
  NO_PERMISSION: 'Insufficient permissions.'
};

const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

const TOKEN = {
  EXPIRING_TIME: '10h'
};

const STATUSCODES = {
  NOT_FOUND: '404'
};

module.exports = { ERROR, ROLES, TOKEN, STATUSCODES };