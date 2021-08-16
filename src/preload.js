const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const adapter = new FileSync(`db.json`)
const db = low(adapter)
const { nanoid } = require('nanoid')
window.nanoid = nanoid;
window.db = db;