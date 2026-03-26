const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign({ admin: { id: 'test', username: 'admin' } }, process.env.JWT_SECRET || 'super_secret_fallback_key', { expiresIn: '1d' });

fetch('http://localhost:3000/api/banquet/69c2ecc921c5cb5590fbabf0', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    categories: []
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
