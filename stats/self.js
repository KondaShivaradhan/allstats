const https = require('https');
const axios = require('axios')
const start = async function() {
    let response = await axios.get(
        "https://public-api.tracker.gg/v2/bfvstats/standard/profile/origin/blazingbane", {
            headers: {
                "TRN-Api-Key": "16b5b870-f507-4e4d-b522-fa2818a03137"
            }
        }
    ).catch(error => {
        console.log('====================================');
        // console.log(error);
        console.log('====================================');
    });

    console.log('====================================');
    console.log(response.data.data);
    console.log('====================================');
}
start()