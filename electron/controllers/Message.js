const lodash = require('lodash')

const MESSAGES_BODY = {
  install: {
    safe: {
      flag: false,
      state: 'safe'
    }
  },
  update: {},
  reload: {},
  uninstall: {},
  version: {
    exist: {
      flag: true
    },
    notExist: {
      flag: false
    }
  }
}

function Message(stateMessages, moduleType) {
  this.send = (msgType, state = null) => {
    if (state === null) {
      stateMessages(MESSAGES_BODY[moduleType][msgType])
    } else {
      const msg = lodash.cloneDeep(MESSAGES_BODY[moduleType][msgType])
      msg.state = state
      stateMessages(msg)
    }
  }
  return this
}

module.exports = {
  Message
}
