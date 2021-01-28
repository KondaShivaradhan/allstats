const express = require('express');
const battlefieldStats = require('battlefield-stats-express');
const app = express();

// Get or use your key from https://battlefieldtracker.com/site-api`
const bfs = battlefieldStats('917d0574-21b0-47cf-9939-aed14f96fe06');

app.use('/api', bfs)
app.listen(3000);