const BattlefieldStats = require('battlefield-stats');
const API_KEY = '16b5b870-f507-4e4d-b522-fa2818a03137' // from https://battlefieldtracker.com/site-api
const bf = new BattlefieldStats(API_KEY);

// All params mirror params listed at http://docs.trnbattlefield.apiary.io/#
const params = {
    platform: bf.Platforms.PC, // also you can use XBOX or PS4
    displayName: 'BlazingBane' // Or you can use personaId
}

// Proxies to all api routes found http://docs.trnbattlefield.apiary.io/#
const route = '/Stats/BasicStats';

bf.Api.request(route, params, (error, response) => {
    // response callback
    if (!error && response) {
        console.log(response);
    } else {
        console.log(error);
    }
})