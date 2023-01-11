const os = require('os')
const path = require('path')
const {contextBridge} = require ('electron')


contextBridge.exposeInIsolatedWorld('os', {
    homedir: ()=> os.homedir()
})
contextBridge.exposeInIsolatedWorld('path', {
    join: (...args)=> path.join(...args)
})
contextBridge.exposeInMainWorld('versions', {
node: ()=> process.versions.node,
chrome: ()=> process.versions.chrome,
electron: ()=> process.versions.electron
})