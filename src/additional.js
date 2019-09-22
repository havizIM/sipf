const PROTOCOL = window.location.protocol
const HOST = window.location.host
const PATH = HOST === 'localhost' ? 'sipf/' : ''
const BASE_URL = `${PROTOCOL}//${HOST}/${PATH}`
const TOKEN = sessionStorage.getItem('SIPF-KEY')
const USERNAME = 'sipf-codemaniac'
const PASSWORD = 'codemaniac123'