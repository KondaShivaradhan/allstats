const BattlefieldStats = require('battlefield-stats');
const API_KEY = '917d0574-21b0-47cf-9939-aed14f96fe06' // from https://battlefieldtracker.com/site-api
const bf = new BattlefieldStats(API_KEY);

// All params mirror params listed at http://docs.trnbattlefield.apiary.io/#
const params = {
    platform: bf.Platforms.PC, // also you can use XBOX or PS4
    displayName: 'BlazingBane' // Or you can use personaId
}
const route = '/Stats/CareerForOwnedGames';
bf.Stats.careerForOwnedGames(params, (error, response) => {
    console.log(error);
});
// bf.Api.request(route, params, (error, response) => {
//     // response callback

//     if (!error && response) {
//         console.log(response);
//     } else {
//         console.log(error);
//     }
// })