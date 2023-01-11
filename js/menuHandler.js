const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const { shell } = require('electron')



const minimizeBtn = document.getElementById('minimize')
const closeBtn = document.getElementById('close-app')

const openGit = document.getElementById('gogit')

openGit.addEventListener('click', ()=>{
    ipc.send('openGit')
})

closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')
})

minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minimize')
})