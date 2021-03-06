module.exports = {
  'U_NF': {
    stat: 404,
    msg: 'User not found'
  },
  'S_NF': {
    stat: 404,
    msg: 'Session not found'
  },
  'E_UNAUTH': {
    stat: 401
  },
  'JV_INV_JTI': {
    stat: 401
  },
  'JV_INV_ARGS': {
    stat: 401
  },
  'JV_INV_OPTS': {
    stat: 401
  },
  'JV_INV_TOKEN': {
    stat: 401
  },
  'JV_UNDEF_JTI': {
    stat: 401
  },
  'JV_UNDEF_HEADER': {
    stat: 401
  },
  'REG_EMAIL': {
    stat: 409
  },
  'WRONG_PWD': {
    stat: 409
  },
  'INV_DATA': {
    stat: 409
  },
  'REG_SESS_DT': {
    stat: 409,
    msg: 'Registrated another session at specified date and time'
  }
}
