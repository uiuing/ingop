window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (let i = 0; i < ['chrome', 'node', 'electron'].length; i += 1) {
    const dependency = ['chrome', 'node', 'electron'][i]
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

const api = require('./ipc/ipcRenderer')

api.Listen()
