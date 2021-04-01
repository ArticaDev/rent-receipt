const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const adapter = new FileSync(`db.json`)
const db = low(adapter)
window.db = db;