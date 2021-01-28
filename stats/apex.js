const Apex = require('apex-api');
const apex = new Apex('16b5b870-f507-4e4d-b522-fa2818a03137');

// apex.user('BlazingBane', 'PC').then(data => {
//     console.log((data.data.children[0].metadata), data.data.children[0].stats[0].value)
// });
module.exports = apex;