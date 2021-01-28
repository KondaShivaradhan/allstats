// const BattlefieldStats = require('battlefield-stats');
// const API_KEY = '917d0574-21b0-47cf-9939-aed14f96fe06' // from https://battlefieldtracker.com/site-api
// const bf = new BattlefieldStats(API_KEY);

// // All params mirror params listed at http://docs.trnbattlefield.apiary.io/#
// const params = {
//     platform: bf.Platforms.PC, // also you can use XBOX or PS4
//     displayName: 'BlazingBane' // Or you can use personaId
// }

// // Proxies to all api routes found http://docs.trnbattlefield.apiary.io/#
// const route = '/Stats/BasicStats';

// // bf.Api.request(route, params, (error, response) => {
// //     // response callback
// //     if (!error && response) {

// //         console.log(response);
// //     } else {
// //         console.log(error);
// //         console.log(response);
// //     }
// // })
// bf.Stats.careerForOwnedGames(params, (error, response) => {
//     if (!error && response) {
//         console.log(response);
//     } else {
//         console.log(error);
//         console.log(response);
//     }
// })
// const BattlefieldStats = require('battlefield-stats');
// const API_KEY = '16b5b870-f507-4e4d-b522-fa2818a03137' // from https://battlefieldtracker.com/site-api
// const bf = new BattlefieldStats(API_KEY);

// // All params mirror params listed at http://docs.trnbattlefield.apiary.io/#
// const params = {
//     platform: bf.Platforms.PC, // also you can use XBOX or PS4
//     displayName: 'BlazingBane' // Or you can use personaId
// }

// // Proxies to all api routes found http://docs.trnbattlefield.apiary.io/#
// const route = '/Stats/BasicStats';

// bf.Api.request(route, params, (error, response) => {
//     console.log(error);
//     // response callback
//     // if (!error && response) {
//     //     console.log(response);
//     // }
// })

const BFC = require('battlefield-companion');
const email = 'kondashivaradhan007@outlook.com';
const password = 'Rlsss@5007';

BFC(email, password, (err, bfApi) => {
    // Now you are logged in, so you can use the bfApi object to perform requests
    const personaId = 'BLazingBane';

    bfApi.getCareerForOwnedGamesByPersonaId(personaId, (error, result) => {
        if (!error) {
            // your battlefield stats will be in JSON format here.
            console.log(result);
        }
    });
});